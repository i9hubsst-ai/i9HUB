'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

interface ActionPlanItem {
  title: string
  description: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  estimatedDays: number
  reference: string | null
}

const priorityMap: Record<'HIGH' | 'MEDIUM' | 'LOW', number> = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3
}

export async function saveActionPlans(
  assessmentId: string,
  executiveSummary: string,
  actionPlans: ActionPlanItem[]
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar se o usuário tem acesso ao assessment
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      select: { companyId: true, status: true }
    })

    if (!assessment) {
      return { error: 'Diagnóstico não encontrado' }
    }

    if (assessment.status !== 'SCORED') {
      return { error: 'Diagnóstico precisa estar finalizado' }
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
      return { error: 'Sem permissão para salvar plano de ação deste diagnóstico' }
    }

    // Deletar planos de ação existentes (se houver)
    await prisma.actionPlan.deleteMany({
      where: { assessmentId, aiGenerated: true }
    })

    // Criar novos planos de ação
    const createdPlans = await Promise.all(
      actionPlans.map((plan, index) =>
        prisma.actionPlan.create({
          data: {
            assessmentId,
            companyId: assessment.companyId,
            title: plan.title,
            description: `${executiveSummary}\n\n---\n\n${plan.description}`,
            priority: priorityMap[plan.priority],
            dueDate: new Date(Date.now() + plan.estimatedDays * 24 * 60 * 60 * 1000),
            status: 'PENDING',
            reference: plan.reference,
            createdBy: user.id,
            ownerUserId: user.id,
            aiGenerated: true
          }
        })
      )
    )

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    
    return { success: true, count: createdPlans.length, executiveSummary }
  } catch (error) {
    console.error('Erro ao salvar planos de ação:', error)
    return { error: 'Erro ao salvar planos de ação' }
  }
}

const reversePriorityMap: Record<number, 'HIGH' | 'MEDIUM' | 'LOW'> = {
  1: 'HIGH',
  2: 'MEDIUM',
  3: 'LOW'
}

export async function getActionPlans(assessmentId: string) {
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

    const actionPlans = await prisma.actionPlan.findMany({
      where: { assessmentId, aiGenerated: true },
      orderBy: [
        { priority: 'asc' }, // 1=HIGH vem primeiro
        { createdAt: 'asc' }
      ]
    })

    // Extrair executive summary da primeira action plan (se existir)
    let executiveSummary = ''
    const formattedPlans = actionPlans.map(plan => {
      const parts = plan.description.split('\n\n---\n\n')
      if (parts.length > 1 && !executiveSummary) {
        executiveSummary = parts[0]
      }
      
      return {
        ...plan,
        priority: reversePriorityMap[plan.priority] || 'MEDIUM',
        description: parts.length > 1 ? parts[1] : plan.description
      }
    })

    return { 
      success: true, 
      actionPlans: formattedPlans,
      executiveSummary 
    }
  } catch (error) {
    console.error('Erro ao buscar planos de ação:', error)
    return { error: 'Erro ao buscar planos de ação' }
  }
}
