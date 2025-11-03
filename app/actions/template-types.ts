'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

export async function getTemplateTypes() {
  try {
    const types = await prisma.templateTypeConfig.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return { success: true, types }
  } catch (error) {
    console.error('Erro ao buscar tipos de template:', error)
    return { error: 'Erro ao buscar tipos de template' }
  }
}

export async function getAllTemplateTypes() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores podem gerenciar tipos de template' }
  }

  try {
    const types = await prisma.templateTypeConfig.findMany({
      orderBy: { order: 'asc' }
    })

    return { success: true, types }
  } catch (error) {
    console.error('Erro ao buscar tipos de template:', error)
    return { error: 'Erro ao buscar tipos de template' }
  }
}

export async function createTemplateType(data: {
  code: string
  name: string
  description?: string
  icon?: string
  order?: number
}) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores podem criar tipos de template' }
  }

  if (!data.code || !data.name) {
    return { error: 'Código e nome são obrigatórios' }
  }

  try {
    // Verificar se o código já existe
    const existing = await prisma.templateTypeConfig.findUnique({
      where: { code: data.code }
    })

    if (existing) {
      return { error: 'Já existe um tipo com este código' }
    }

    const type = await prisma.templateTypeConfig.create({
      data: {
        code: data.code,
        name: data.name,
        description: data.description,
        icon: data.icon,
        order: data.order ?? 0
      }
    })

    revalidatePath('/dashboard/templates')
    return { success: true, type }
  } catch (error) {
    console.error('Erro ao criar tipo de template:', error)
    return { error: 'Erro ao criar tipo de template' }
  }
}

export async function updateTemplateType(
  id: string,
  data: {
    code?: string
    name?: string
    description?: string
    icon?: string
    order?: number
    isActive?: boolean
  }
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores podem atualizar tipos de template' }
  }

  try {
    // Se estiver mudando o código, verificar se já existe
    if (data.code) {
      const existing = await prisma.templateTypeConfig.findFirst({
        where: {
          code: data.code,
          NOT: { id }
        }
      })

      if (existing) {
        return { error: 'Já existe um tipo com este código' }
      }
    }

    const type = await prisma.templateTypeConfig.update({
      where: { id },
      data
    })

    revalidatePath('/dashboard/templates')
    return { success: true, type }
  } catch (error) {
    console.error('Erro ao atualizar tipo de template:', error)
    return { error: 'Erro ao atualizar tipo de template' }
  }
}

export async function deleteTemplateType(id: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores podem excluir tipos de template' }
  }

  try {
    // Buscar o tipo para pegar o código
    const typeConfig = await prisma.templateTypeConfig.findUnique({
      where: { id }
    })

    if (!typeConfig) {
      return { error: 'Tipo não encontrado' }
    }

    // Verificar se existem templates usando este tipo
    // Nota: O campo 'type' no DiagnosticTemplate é um enum, então por enquanto permitimos a exclusão
    // Em uma versão futura, podemos adicionar uma foreign key para reforçar a integridade

    await prisma.templateTypeConfig.delete({
      where: { id }
    })

    revalidatePath('/dashboard/templates')
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir tipo de template:', error)
    return { error: 'Erro ao excluir tipo de template' }
  }
}
