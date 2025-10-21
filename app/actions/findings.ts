'use server'

import { prisma } from '@/lib/prisma'
import { FindingSeverity } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

export async function generateFindings(assessmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        template: {
          include: {
            sections: {
              include: {
                questions: {
                  where: { active: true }
                }
              }
            }
          }
        },
        answers: {
          include: {
            question: {
              include: {
                section: true
              }
            }
          }
        }
      }
    })

    if (!assessment || !assessment.template) {
      return { error: 'Diagnóstico ou template não encontrado' }
    }

    // Verificar permissões
    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return { error: 'Sem permissão para gerar achados neste diagnóstico' }
    }

    // Limpar achados existentes deste assessment
    await prisma.finding.deleteMany({
      where: { assessmentId }
    })

    const findings = []

    // Regra: gerar achado para boolean=0 ou score≤3
    for (const answer of assessment.answers) {
      const isNonConformant = 
        (answer.question.type === 'BOOLEAN' && answer.value === 0) ||
        (answer.question.type === 'SCORE' && answer.value <= 3)

      if (isNonConformant) {
        // Determinar severidade baseada no valor
        let severity: FindingSeverity
        if (answer.question.type === 'BOOLEAN' && answer.value === 0) {
          severity = 'HIGH' // Não conformidade crítica
        } else if (answer.value <= 2) {
          severity = 'HIGH' // Muito baixo
        } else if (answer.value === 3) {
          severity = 'MEDIUM' // Oportunidade de melhoria
        } else {
          severity = 'LOW' // Observação
        }

        const finding = await prisma.finding.create({
          data: {
            assessmentId,
            sectionTitle: answer.question.section.title,
            questionText: answer.question.text,
            questionType: answer.question.type,
            value: answer.value,
            reference: answer.question.reference,
            justification: answer.justification,
            severity
          }
        })

        findings.push(finding)
      }
    }

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    
    return { success: true, findingsCount: findings.length }
  } catch (error) {
    console.error('Erro ao gerar achados:', error)
    return { error: 'Erro ao gerar achados' }
  }
}

export async function getFindings(assessmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar se o usuário tem acesso ao assessment
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      select: { companyId: true }
    })

    if (!assessment) {
      return { error: 'Diagnóstico não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return { error: 'Sem permissão para acessar este diagnóstico' }
    }

    const findings = await prisma.finding.findMany({
      where: { assessmentId },
      orderBy: [
        { severity: 'desc' },
        { createdAt: 'asc' }
      ]
    })

    return { success: true, findings }
  } catch (error) {
    console.error('Erro ao buscar achados:', error)
    return { error: 'Erro ao buscar achados' }
  }
}

export async function deleteFinding(findingId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Buscar o finding para verificar permissões
    const finding = await prisma.finding.findUnique({
      where: { id: findingId },
      include: {
        assessment: {
          select: { companyId: true }
        }
      }
    })

    if (!finding) {
      return { error: 'Achado não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: finding.assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return { error: 'Sem permissão para excluir este achado' }
    }

    await prisma.finding.delete({
      where: { id: findingId }
    })

    revalidatePath('/dashboard/diagnostics')
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir achado:', error)
    return { error: 'Erro ao excluir achado' }
  }
}
