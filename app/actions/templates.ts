'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { TemplateStatus } from '@prisma/client'

export async function getAllTemplates() {
  try {
    const templates = await prisma.diagnosticTemplate.findMany({
      include: {
        sections: {
          include: {
            questions: {
              where: { active: true },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            sections: true,
            assessments: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return { success: true, templates }
  } catch (error) {
    console.error('Erro ao buscar templates:', error)
    return { error: 'Erro ao buscar templates' }
  }
}

export async function getTemplateById(templateId: string) {
  try {
    const template = await prisma.diagnosticTemplate.findUnique({
      where: { id: templateId },
      include: {
        sections: {
          include: {
            questions: {
              where: { active: true },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        _count: {
          select: { assessments: true }
        }
      }
    })

    if (!template) {
      return { error: 'Template não encontrado' }
    }

    return { success: true, template }
  } catch (error) {
    console.error('Erro ao buscar template:', error)
    return { error: 'Erro ao buscar template' }
  }
}

export async function updateTemplateStatus(templateId: string, status: TemplateStatus) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores podem alterar o status de templates' }
  }

  try {
    await prisma.diagnosticTemplate.update({
      where: { id: templateId },
      data: { status }
    })

    revalidatePath('/dashboard/templates')
    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar status do template:', error)
    return { error: 'Erro ao atualizar status do template' }
  }
}

export async function deleteTemplate(templateId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores podem excluir templates' }
  }

  try {
    // Verificar se há assessments usando este template
    const assessmentCount = await prisma.assessment.count({
      where: { templateId }
    })

    if (assessmentCount > 0) {
      return { error: `Não é possível excluir. Existem ${assessmentCount} diagnósticos usando este template.` }
    }

    await prisma.diagnosticTemplate.delete({
      where: { id: templateId }
    })

    revalidatePath('/dashboard/templates')
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir template:', error)
    return { error: 'Erro ao excluir template' }
  }
}

export async function getPublishedTemplates() {
  try {
    const templates = await prisma.diagnosticTemplate.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        name: true,
        description: true,
        type: true,
        _count: {
          select: { sections: true }
        }
      },
      orderBy: { name: 'asc' }
    })

    return { success: true, templates }
  } catch (error) {
    console.error('Erro ao buscar templates publicados:', error)
    return { error: 'Erro ao buscar templates publicados' }
  }
}

export async function publishTemplate(templateId: string) {
  return updateTemplateStatus(templateId, 'PUBLISHED')
}

export async function updateTemplate(
  templateId: string,
  data: {
    name: string
    description: string
    sections: Array<{
      id?: string
      title: string
      order: number
      questions: Array<{
        id?: string
        text: string
        type: string
        weight: number
        reference?: string
        requiresJustification: boolean
      }>
    }>
  }
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores podem editar templates' }
  }

  try {
    // Verificar se template existe
    const template = await prisma.diagnosticTemplate.findUnique({
      where: { id: templateId },
      include: {
        sections: {
          include: { questions: true }
        }
      }
    })

    if (!template) {
      return { error: 'Template não encontrado' }
    }

    // Atualizar template e suas seções/perguntas
    await prisma.$transaction(async (tx) => {
      // Atualizar informações básicas do template
      await tx.diagnosticTemplate.update({
        where: { id: templateId },
        data: {
          name: data.name,
          description: data.description
        }
      })

      // IDs de seções e perguntas que devem ser mantidos
      const sectionIdsToKeep = data.sections.filter(s => s.id).map(s => s.id!)
      const questionIdsToKeep = data.sections
        .flatMap(s => s.questions.filter(q => q.id).map(q => q.id!))

      // Deletar seções que foram removidas
      await tx.diagnosticSection.deleteMany({
        where: {
          templateId,
          id: { notIn: sectionIdsToKeep }
        }
      })

      // Processar cada seção
      for (const section of data.sections) {
        if (section.id) {
          // Atualizar seção existente
          await tx.diagnosticSection.update({
            where: { id: section.id },
            data: {
              title: section.title,
              order: section.order
            }
          })

          // Deletar perguntas removidas desta seção
          await tx.diagnosticQuestion.deleteMany({
            where: {
              sectionId: section.id,
              id: { notIn: section.questions.filter(q => q.id).map(q => q.id!) }
            }
          })

          // Processar perguntas
          for (const question of section.questions) {
            if (question.id) {
              // Atualizar pergunta existente
              await tx.diagnosticQuestion.update({
                where: { id: question.id },
                data: {
                  text: question.text,
                  type: question.type,
                  weight: question.weight,
                  reference: question.reference,
                  requiresJustification: question.requiresJustification
                }
              })
            } else {
              // Criar nova pergunta
              await tx.diagnosticQuestion.create({
                data: {
                  sectionId: section.id,
                  text: question.text,
                  type: question.type,
                  weight: question.weight,
                  reference: question.reference,
                  requiresJustification: question.requiresJustification
                }
              })
            }
          }
        } else {
          // Criar nova seção com suas perguntas
          await tx.diagnosticSection.create({
            data: {
              templateId,
              title: section.title,
              order: section.order,
              questions: {
                create: section.questions.map(q => ({
                  text: q.text,
                  type: q.type,
                  weight: q.weight,
                  reference: q.reference,
                  requiresJustification: q.requiresJustification
                }))
              }
            }
          })
        }
      }
    })

    revalidatePath('/dashboard/templates')
    revalidatePath(`/dashboard/templates/${templateId}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar template:', error)
    return { error: 'Erro ao atualizar template' }
  }
}

export async function applyTemplateToAssessment(assessmentId: string, templateId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar se o assessment existe e se o usuário tem permissão
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      select: { companyId: true, status: true, templateId: true }
    })

    if (!assessment) {
      return { error: 'Diagnóstico não encontrado' }
    }

    if (assessment.status !== 'DRAFT') {
      return { error: 'Só é possível aplicar template em diagnósticos com status DRAFT' }
    }

    if (assessment.templateId) {
      return { error: 'Este diagnóstico já possui um template associado' }
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
      return { error: 'Sem permissão para modificar este diagnóstico' }
    }

    // Buscar o template com seções e perguntas para validação
    const template = await prisma.diagnosticTemplate.findUnique({
      where: { id: templateId },
      include: {
        sections: {
          include: {
            questions: {
              where: { active: true }
            }
          }
        }
      }
    })

    if (!template) {
      return { error: 'Template não encontrado' }
    }

    if (template.status !== 'PUBLISHED') {
      return { error: 'Apenas templates publicados podem ser aplicados' }
    }

    // Associar o template ao assessment
    // As seções e perguntas já existem no template e serão acessadas via relacionamento
    await prisma.assessment.update({
      where: { id: assessmentId },
      data: { templateId }
    })

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    return { 
      success: true, 
      sectionsCount: template.sections.length,
      questionsCount: template.sections.reduce((sum, s) => sum + s.questions.length, 0)
    }
  } catch (error) {
    console.error('Erro ao aplicar template:', error)
    return { error: 'Erro ao aplicar template ao diagnóstico' }
  }
}
