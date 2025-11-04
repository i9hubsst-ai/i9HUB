'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

interface ActionPlanTaskItem {
  what: string        // O quê
  why?: string        // Por quê
  where?: string      // Onde
  when?: string       // Quando
  who?: string        // Quem
  how: string         // Como
  howMuch?: string    // Quanto
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
  tasks: ActionPlanTaskItem[]
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar se o usuário tem acesso ao assessment
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      select: { companyId: true, status: true, title: true }
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

    // Deletar plano de ação existente gerado por IA (se houver)
    const existingPlan = await prisma.actionPlan.findFirst({
      where: { assessmentId, aiGenerated: true }
    })

    if (existingPlan) {
      // Deletar plano e suas tarefas (cascade)
      await prisma.actionPlan.delete({
        where: { id: existingPlan.id }
      })
    }

    // Contar planos existentes para gerar número correto
    const totalPlans = await prisma.actionPlan.count()
    const planNumber = `PA${String(totalPlans + 1).padStart(5, '0')}`

    // Criar ActionPlan (1 plano para o assessment)
    const actionPlan = await prisma.actionPlan.create({
      data: {
        number: planNumber,
        assessmentId,
        companyId: assessment.companyId,
        title: `Plano de Ação - ${assessment.title}`,
        description: executiveSummary,
        objective: 'Implementar ações corretivas identificadas no diagnóstico',
        createdBy: user.id,
        ownerUserId: user.id,
        startDate: new Date(),
        status: 'IN_PROGRESS',
        aiGenerated: true
      }
    })

    // Criar tarefas (ActionPlanTasks)
    const createdTasks = await Promise.all(
      tasks.map((task, index) =>
        prisma.actionPlanTask.create({
          data: {
            number: String(index + 1).padStart(3, '0'),
            actionPlanId: actionPlan.id,
            what: task.what,
            why: task.why,
            where: task.where,
            when: task.when,
            who: task.who,
            how: task.how,
            howMuch: task.howMuch,
            priority: priorityMap[task.priority],
            dueDate: new Date(Date.now() + task.estimatedDays * 24 * 60 * 60 * 1000),
            status: 'PENDING',
            reference: task.reference,
            createdBy: user.id,
            assignedTo: user.id
          }
        })
      )
    )

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    
    return { 
      success: true, 
      planId: actionPlan.id,
      planNumber: actionPlan.number,
      taskCount: createdTasks.length, 
      executiveSummary 
    }
  } catch (error) {
    console.error('Erro ao salvar plano de ação:', error)
    return { error: 'Erro ao salvar plano de ação' }
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

    // Buscar plano de ação com suas tarefas
    const actionPlan = await prisma.actionPlan.findFirst({
      where: { assessmentId },
      include: {
        tasks: {
          orderBy: [
            { priority: 'asc' },
            { number: 'asc' }
          ]
        }
      }
    })

    if (!actionPlan) {
      return { 
        success: true, 
        actionPlan: null,
        tasks: [],
        executiveSummary: '' 
      }
    }

    // Formatar tarefas
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formattedTasks = actionPlan.tasks.map((task: any) => ({
      ...task,
      priority: reversePriorityMap[task.priority] || 'MEDIUM'
    }))

    return { 
      success: true, 
      actionPlan: {
        id: actionPlan.id,
        number: actionPlan.number,
        title: actionPlan.title,
        description: actionPlan.description,
        status: actionPlan.status,
        startDate: actionPlan.startDate,
        endDate: actionPlan.endDate,
        aiGenerated: actionPlan.aiGenerated
      },
      tasks: formattedTasks,
      executiveSummary: actionPlan.description 
    }
  } catch (error) {
    console.error('Erro ao buscar plano de ação:', error)
    return { error: 'Erro ao buscar plano de ação' }
  }
}

export async function updateActionPlanTask(
  taskId: string,
  updates: {
    who?: string
    how?: string
    howMuch?: string
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  }
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const task = await prisma.actionPlanTask.findUnique({
      where: { id: taskId },
      include: {
        actionPlan: {
          include: {
            assessment: {
              select: { companyId: true, id: true }
            }
          }
        }
      }
    })

    if (!task) {
      return { error: 'Tarefa não encontrada' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: task.actionPlan.assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return { error: 'Sem permissão para editar esta tarefa' }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {}

    if (updates.who !== undefined) updateData.who = updates.who
    if (updates.how !== undefined) updateData.how = updates.how
    if (updates.howMuch !== undefined) updateData.howMuch = updates.howMuch
    if (updates.status !== undefined) {
      updateData.status = updates.status
      if (updates.status === 'COMPLETED') {
        updateData.completedAt = new Date()
      }
    }

    const updated = await prisma.actionPlanTask.update({
      where: { id: taskId },
      data: updateData
    })

    revalidatePath(`/dashboard/diagnostics/${task.actionPlan.assessment.id}`)
    
    return { success: true, task: updated }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error)
    return { error: 'Erro ao atualizar tarefa' }
  }
}

export async function deleteActionPlanTask(taskId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const task = await prisma.actionPlanTask.findUnique({
      where: { id: taskId },
      include: {
        actionPlan: {
          include: {
            assessment: {
              select: { companyId: true, id: true }
            }
          }
        }
      }
    })

    if (!task) {
      return { error: 'Tarefa não encontrada' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: task.actionPlan.assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return { error: 'Sem permissão para excluir esta tarefa' }
    }

    await prisma.actionPlanTask.delete({
      where: { id: taskId }
    })

    revalidatePath(`/dashboard/diagnostics/${task.actionPlan.assessment.id}`)
    
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error)
    return { error: 'Erro ao excluir tarefa' }
  }
}

export async function deleteActionPlan(actionPlanId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const actionPlan = await prisma.actionPlan.findUnique({
      where: { id: actionPlanId },
      include: {
        assessment: {
          select: { companyId: true, id: true }
        }
      }
    })

    if (!actionPlan) {
      return { error: 'Plano de ação não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: actionPlan.assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return { error: 'Sem permissão para excluir este plano de ação' }
    }

    // Deletar plano (cascade deleta tarefas)
    await prisma.actionPlan.delete({
      where: { id: actionPlanId }
    })

    revalidatePath(`/dashboard/diagnostics/${actionPlan.assessment.id}`)
    
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir plano de ação:', error)
    return { error: 'Erro ao excluir plano de ação' }
  }
}

export async function createActionPlanTask(
  actionPlanId: string,
  taskData: {
    what: string
    why?: string
    where?: string
    when?: string
    who?: string
    how?: string
    howMuch?: string
    priority: number
    dueDate?: Date
    reference?: string
  }
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const actionPlan = await prisma.actionPlan.findUnique({
      where: { id: actionPlanId },
      include: {
        assessment: {
          select: { companyId: true, id: true }
        },
        tasks: {
          select: { number: true },
          orderBy: { number: 'desc' }
        }
      }
    })

    if (!actionPlan) {
      return { error: 'Plano de ação não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: actionPlan.assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return { error: 'Sem permissão para criar tarefa neste plano de ação' }
    }

    // Gerar próximo número de tarefa
    const lastTaskNumber = actionPlan.tasks[0]?.number || '000'
    const nextNumber = String(parseInt(lastTaskNumber) + 1).padStart(3, '0')

    // Criar tarefa
    const task = await prisma.actionPlanTask.create({
      data: {
        number: nextNumber,
        actionPlanId,
        what: taskData.what,
        why: taskData.why,
        where: taskData.where,
        when: taskData.when,
        who: taskData.who,
        how: taskData.how,
        howMuch: taskData.howMuch,
        priority: taskData.priority,
        status: 'PENDING',
        dueDate: taskData.dueDate,
        reference: taskData.reference,
        createdBy: user.id,
        updatedAt: new Date()
      }
    })

    revalidatePath(`/dashboard/diagnostics/${actionPlan.assessment.id}`)
    
    return { success: true, task }
  } catch (error) {
    console.error('Erro ao criar tarefa:', error)
    return { error: 'Erro ao criar tarefa' }
  }
}
