'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, getUserRole, isPlatformAdmin } from '@/lib/auth'
import { AssessmentStatus } from '@prisma/client'

export async function createAssessment(companyId: string, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const role = await getUserRole(user.id, companyId)
  const isAdmin = await isPlatformAdmin(user.id)

  if (!isAdmin && !['COMPANY_ADMIN', 'ENGINEER'].includes(role || '')) {
    return { error: 'Sem permissão para criar diagnósticos' }
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const templateId = formData.get('templateId') as string | null

  if (!title) {
    return { error: 'Título é obrigatório' }
  }

  try {
    const assessment = await prisma.assessment.create({
      data: {
        companyId,
        createdBy: user.id,
        title,
        description,
        templateId: templateId || undefined,
        status: 'DRAFT',
      }
    })

    revalidatePath('/dashboard/diagnostics')
    return { success: true, assessmentId: assessment.id }
  } catch (error) {
    console.error('Erro ao criar diagnóstico:', error)
    return { error: 'Erro ao criar diagnóstico' }
  }
}

export async function getAssessments(companyId?: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const isAdmin = await isPlatformAdmin(user.id)
    let assessments

    if (isAdmin) {
      assessments = await prisma.assessment.findMany({
        where: companyId ? { companyId } : undefined,
        include: {
          company: true,
          scores: true,
          _count: {
            select: {
              answers: true,
              scores: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      const memberships = await prisma.membership.findMany({
        where: {
          userId: user.id,
          status: 'ACTIVE'
        },
        select: {
          companyId: true
        }
      })

      const companyIds = memberships.map(m => m.companyId)

      if (companyId && !companyIds.includes(companyId)) {
        return { error: 'Sem permissão para acessar diagnósticos desta empresa' }
      }

      assessments = await prisma.assessment.findMany({
        where: {
          companyId: companyId ? companyId : { in: companyIds }
        },
        include: {
          company: true,
          scores: true,
          _count: {
            select: {
              answers: true,
              scores: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    return { success: true, assessments }
  } catch (error) {
    console.error('Erro ao buscar diagnósticos:', error)
    return { error: 'Erro ao buscar diagnósticos' }
  }
}

export async function getAssessmentById(assessmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        company: true,
        template: {
          include: {
            sections: {
              include: {
                questions: true
              }
            }
          }
        },
        answers: {
          include: {
            question: true,
            evidences: true
          }
        },
        scores: true,
        findings: true,
        evidences: true,
        actionPlans: true,
      }
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

    // Buscar informações do usuário criador
    let createdByUser = null
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data: userData } = await supabase.auth.admin.getUserById(assessment.createdBy)
      createdByUser = userData?.user ? {
        id: userData.user.id,
        email: userData.user.email || 'Desconhecido',
        name: userData.user.user_metadata?.name || userData.user.email?.split('@')[0] || 'Usuário'
      } : null
    } catch (error) {
      console.error('Erro ao buscar dados do usuário criador:', error)
    }

    return { success: true, assessment: { ...assessment, createdByUser } }
  } catch (error) {
    console.error('Erro ao buscar diagnóstico:', error)
    return { error: 'Erro ao buscar diagnóstico' }
  }
}

export async function getTemplates() {
  try {
    const templates = await prisma.diagnosticTemplate.findMany({
      where: {
        status: 'PUBLISHED'
      },
      include: {
        sections: {
          include: {
            questions: {
              where: {
                active: true,
                approved: true
              },
              orderBy: {
                createdAt: 'asc'
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, templates }
  } catch (error) {
    console.error('Erro ao buscar templates:', error)
    return { error: 'Erro ao buscar templates' }
  }
}

export async function saveAnswer(
  assessmentId: string, 
  questionId: string, 
  value: number,
  justification?: string,
  evidenceUrls?: string[]
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId }
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

    if (assessment.status === 'COMPLETED') {
      return { error: 'Este diagnóstico já foi finalizado' }
    }

    const answer = await prisma.assessmentAnswer.upsert({
      where: {
        assessmentId_questionId: {
          assessmentId,
          questionId,
        }
      },
      create: {
        assessmentId,
        questionId,
        userId: user.id,
        value,
        justification,
        evidenceUrls: evidenceUrls || [],
      },
      update: {
        value,
        userId: user.id,
        justification,
        evidenceUrls: evidenceUrls || [],
      }
    })

    if (assessment.status === 'DRAFT') {
      await prisma.assessment.update({
        where: { id: assessmentId },
        data: {
          status: 'IN_PROGRESS',
          startedAt: new Date(),
        }
      })
    }

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    return { success: true, answer }
  } catch (error) {
    console.error('Erro ao salvar resposta:', error)
    return { error: 'Erro ao salvar resposta' }
  }
}

export async function submitAssessment(assessmentId: string) {
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
            question: true
          }
        }
      }
    })

    if (!assessment) {
      return { error: 'Diagnóstico não encontrado' }
    }

    if (!assessment.template) {
      return { error: 'Este diagnóstico não possui um template associado' }
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
      return { error: 'Sem permissão para submeter este diagnóstico' }
    }

    // Calcular scores por seção usando o novo schema
    const totalQuestions = assessment.template.sections.reduce(
      (sum, section) => sum + section.questions.length, 
      0
    )
    
    if (assessment.answers.length < totalQuestions) {
      return { error: `Por favor, responda todas as ${totalQuestions} perguntas antes de finalizar` }
    }

    const sectionScores: { sectionId: string; rawScore: number; weightedScore: number; level: number }[] = []

    for (const section of assessment.template.sections) {
      const sectionAnswers = assessment.answers.filter(
        a => section.questions.some(q => q.id === a.questionId)
      )

      if (sectionAnswers.length === 0) continue

      // Calcular score ponderado da seção
      let rawScore = 0
      let totalWeight = 0

      for (const answer of sectionAnswers) {
        const question = section.questions.find(q => q.id === answer.questionId)
        if (!question) continue

        rawScore += answer.value * question.weight
        totalWeight += question.weight * (question.type === 'BOOLEAN' ? 1 : 5)
      }

      const weightedScore = totalWeight > 0 ? (rawScore / totalWeight) * 100 : 0
      const level = Math.min(5, Math.max(1, Math.ceil(weightedScore / 20)))

      sectionScores.push({ sectionId: section.id, rawScore, weightedScore, level })

      await prisma.assessmentScore.upsert({
        where: {
          assessmentId_sectionId: {
            assessmentId,
            sectionId: section.id,
          }
        },
        create: {
          assessmentId,
          sectionId: section.id,
          rawScore,
          weightedScore,
          level,
        },
        update: {
          rawScore,
          weightedScore,
          level,
        }
      })
    }

    // Calcular overall score (média ponderada de todas as seções)
    const overallScore = sectionScores.length > 0 
      ? sectionScores.reduce((sum, s) => sum + s.weightedScore, 0) / sectionScores.length 
      : 0
    const overallLevel = Math.min(5, Math.max(1, Math.ceil(overallScore / 20)))

    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        status: 'SCORED',
        submittedAt: new Date(),
        scoredAt: new Date(),
        overallScore,
        overallLevel,
      }
    })

    // Gerar achados automaticamente baseados nas respostas não conformes
    const { generateFindings } = await import('./findings')
    await generateFindings(assessmentId)

    revalidatePath('/dashboard/diagnostics')
    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    
    return { success: true }
  } catch (error) {
    console.error('Erro ao submeter diagnóstico:', error)
    return { error: 'Erro ao submeter diagnóstico' }
  }
}

export async function deleteAssessment(assessmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId }
    })

    if (!assessment) {
      return { error: 'Diagnóstico não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, assessment.companyId)

    if (!isAdmin && !['COMPANY_ADMIN', 'ENGINEER'].includes(role || '')) {
      return { error: 'Sem permissão para deletar este diagnóstico' }
    }

    await prisma.assessment.delete({
      where: { id: assessmentId }
    })

    revalidatePath('/dashboard/diagnostics')
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar diagnóstico:', error)
    return { error: 'Erro ao deletar diagnóstico' }
  }
}
