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
        status: 'DRAFT',
      }
    })

    revalidatePath('/dashboard/diagnostics')
    redirect(`/dashboard/diagnostics/${assessment.id}`)
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
        answers: {
          include: {
            question: {
              include: {
                dimension: true
              }
            }
          }
        },
        scores: true,
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

    return { success: true, assessment }
  } catch (error) {
    console.error('Erro ao buscar diagnóstico:', error)
    return { error: 'Erro ao buscar diagnóstico' }
  }
}

export async function getQuestions() {
  try {
    const dimensions = await prisma.iMSSTDimension.findMany({
      include: {
        questions: {
          orderBy: {
            order: 'asc'
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    return { success: true, dimensions }
  } catch (error) {
    console.error('Erro ao buscar perguntas:', error)
    return { error: 'Erro ao buscar perguntas' }
  }
}

export async function saveAnswer(assessmentId: string, questionId: string, value: number) {
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
        answeredBy: user.id,
        value,
      },
      update: {
        value,
        answeredBy: user.id,
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
        answers: {
          include: {
            question: {
              include: {
                dimension: true
              }
            }
          }
        }
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
      return { error: 'Sem permissão para submeter este diagnóstico' }
    }

    const totalQuestions = await prisma.question.count()
    
    if (assessment.answers.length < totalQuestions) {
      return { error: `Por favor, responda todas as ${totalQuestions} perguntas antes de finalizar` }
    }

    const dimensions = await prisma.iMSSTDimension.findMany({
      include: {
        questions: true
      }
    })

    for (const dimension of dimensions) {
      const dimensionAnswers = assessment.answers.filter(
        a => a.question.dimensionId === dimension.id
      )

      const sum = dimensionAnswers.reduce((acc, answer) => {
        const value = typeof answer.value === 'number' ? answer.value : 0
        return acc + value * answer.question.weight
      }, 0)

      const maxScore = dimensionAnswers.reduce((acc, answer) => {
        return acc + (5 * answer.question.weight)
      }, 0)

      const score = (sum / maxScore) * 100
      const level = Math.ceil(score / 20)

      await prisma.assessmentScore.upsert({
        where: {
          assessmentId_dimensionId: {
            assessmentId,
            dimensionId: dimension.id,
          }
        },
        create: {
          assessmentId,
          dimensionId: dimension.id,
          score,
          level: Math.max(1, Math.min(5, level)),
        },
        update: {
          score,
          level: Math.max(1, Math.min(5, level)),
        }
      })
    }

    await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        status: 'COMPLETED',
        submittedAt: new Date(),
      }
    })

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
