'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function uploadEvidence(
  assessmentId: string,
  answerId: string,
  formData: FormData
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar autorização multi-tenant
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        answers: {
          where: { id: answerId },
          select: { id: true }
        }
      }
    })

    if (!assessment) {
      return { error: 'Diagnóstico não encontrado' }
    }

    if (assessment.answers.length === 0) {
      return { error: 'Resposta não encontrada neste diagnóstico' }
    }

    // Verificar se é Platform Admin
    const isAdmin = await prisma.platformAdmin.findUnique({
      where: { userId: user.id }
    })

    // Se não for admin, verificar membership ATIVO
    if (!isAdmin) {
      const membership = await prisma.membership.findFirst({
        where: {
          userId: user.id,
          companyId: assessment.companyId,
          status: 'ACTIVE'
        }
      })

      if (!membership) {
        return { error: 'Sem permissão para fazer upload de evidências neste diagnóstico' }
      }
    }

    const file = formData.get('file') as File
    if (!file) {
      return { error: 'Nenhum arquivo fornecido' }
    }

    // Validar tamanho (máx 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { error: 'Arquivo muito grande. Máximo: 10MB' }
    }

    // Validar tipo
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return { error: 'Tipo de arquivo não permitido. Use imagens, PDF ou documentos Office.' }
    }

    // Converter para base64 (temporário - posteriormente migrar para Supabase Storage)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Salvar no banco
    const evidence = await prisma.evidence.create({
      data: {
        assessmentId,
        answerId,
        fileName: file.name,
        fileUrl: dataUrl, // Temporário: será substituído por URL do Supabase Storage
        fileSize: file.size,
        mimeType: file.type,
        uploadedBy: user.id
      }
    })

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    return { success: true, evidence }
  } catch (error) {
    console.error('Erro ao fazer upload de evidência:', error)
    return { error: 'Erro ao fazer upload do arquivo' }
  }
}

export async function deleteEvidence(evidenceId: string, assessmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar autorização multi-tenant PRIMEIRO
    const evidence = await prisma.evidence.findUnique({
      where: { id: evidenceId },
      include: {
        assessment: {
          select: { companyId: true }
        }
      }
    })

    if (!evidence) {
      return { error: 'Evidência não encontrada' }
    }

    // Verificar se é Platform Admin
    const isAdmin = await prisma.platformAdmin.findUnique({
      where: { userId: user.id }
    })

    // Se não for admin, verificar membership ATIVO
    if (!isAdmin) {
      const membership = await prisma.membership.findFirst({
        where: {
          userId: user.id,
          companyId: evidence.assessment.companyId,
          status: 'ACTIVE'
        }
      })

      if (!membership) {
        return { error: 'Sem permissão para excluir esta evidência' }
      }

      // Verificar se pode deletar (apenas o próprio uploader ou admin/engineer)
      if (evidence.uploadedBy !== user.id) {
        if (!['COMPANY_ADMIN', 'ENGINEER'].includes(membership.role)) {
          return { error: 'Apenas administradores ou engenheiros podem excluir evidências de outros usuários' }
        }
      }
    }

    // TODO: Se estiver usando Supabase Storage, deletar arquivo de lá também

    await prisma.evidence.delete({
      where: { id: evidenceId }
    })

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir evidência:', error)
    return { error: 'Erro ao excluir evidência' }
  }
}

export async function getEvidencesByAnswer(answerId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar autorização multi-tenant
    const answer = await prisma.assessmentAnswer.findUnique({
      where: { id: answerId },
      include: {
        assessment: {
          select: { companyId: true }
        }
      }
    })

    if (!answer) {
      return { error: 'Resposta não encontrada' }
    }

    // Verificar se é Platform Admin
    const isAdmin = await prisma.platformAdmin.findUnique({
      where: { userId: user.id }
    })

    // Se não for admin, verificar membership ATIVO
    if (!isAdmin) {
      const membership = await prisma.membership.findFirst({
        where: {
          userId: user.id,
          companyId: answer.assessment.companyId,
          status: 'ACTIVE'
        }
      })

      if (!membership) {
        return { error: 'Sem permissão para visualizar evidências deste diagnóstico' }
      }
    }

    const evidences = await prisma.evidence.findMany({
      where: { answerId },
      orderBy: { uploadedAt: 'desc' }
    })

    return { success: true, evidences }
  } catch (error) {
    console.error('Erro ao buscar evidências:', error)
    return { error: 'Erro ao buscar evidências' }
  }
}

export async function getEvidencesByAssessment(assessmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar autorização multi-tenant
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      select: { companyId: true }
    })

    if (!assessment) {
      return { error: 'Diagnóstico não encontrado' }
    }

    // Verificar se é Platform Admin
    const isAdmin = await prisma.platformAdmin.findUnique({
      where: { userId: user.id }
    })

    // Se não for admin, verificar membership ATIVO
    if (!isAdmin) {
      const membership = await prisma.membership.findFirst({
        where: {
          userId: user.id,
          companyId: assessment.companyId,
          status: 'ACTIVE'
        }
      })

      if (!membership) {
        return { error: 'Sem permissão para visualizar evidências deste diagnóstico' }
      }
    }

    const evidences = await prisma.evidence.findMany({
      where: { assessmentId },
      include: {
        answer: {
          include: {
            question: {
              select: {
                text: true,
                section: {
                  select: {
                    title: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: { uploadedAt: 'desc' }
    })

    // Enriquecer evidências (nome do usuário não disponível no schema atual)
    const enrichedEvidences = evidences.map(evidence => ({
      ...evidence,
      uploadedByUser: 'Usuário' // TODO: Buscar do Supabase Auth quando necessário
    }))

    return { success: true, evidences: enrichedEvidences }
  } catch (error) {
    console.error('Erro ao buscar evidências:', error)
    return { error: 'Erro ao buscar evidências' }
  }
}
