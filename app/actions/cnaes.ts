'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

export async function createCNAE(data: {
  codigo: string
  descricao: string
  grauRisco: number
}) {
  const user = await getCurrentUser()
  if (!user || !isPlatformAdmin(user.id)) {
    return { error: 'Não autorizado. Apenas administradores da plataforma.' }
  }

  if (!data.codigo || !data.descricao || !data.grauRisco) {
    return { error: 'Código, descrição e grau de risco são obrigatórios' }
  }

  if (data.grauRisco < 1 || data.grauRisco > 4) {
    return { error: 'Grau de risco deve ser entre 1 e 4' }
  }

  try {
    // Verificar se já existe
    const existing = await prisma.cNAE.findUnique({
      where: { codigo: data.codigo }
    })

    if (existing) {
      return { error: 'Já existe um CNAE com este código' }
    }

    const cnae = await prisma.cNAE.create({
      data: {
        codigo: data.codigo,
        descricao: data.descricao,
        grauRisco: data.grauRisco,
        ativo: true,
      }
    })

    revalidatePath('/dashboard/cadastros/cnaes')
    return { success: true, cnae }
  } catch (error) {
    console.error('Erro ao criar CNAE:', error)
    return { error: 'Erro ao criar CNAE' }
  }
}

export async function updateCNAE(id: string, data: {
  codigo: string
  descricao: string
  grauRisco: number
  ativo: boolean
}) {
  const user = await getCurrentUser()
  if (!user || !isPlatformAdmin(user.id)) {
    return { error: 'Não autorizado. Apenas administradores da plataforma.' }
  }

  if (!data.codigo || !data.descricao || !data.grauRisco) {
    return { error: 'Código, descrição e grau de risco são obrigatórios' }
  }

  if (data.grauRisco < 1 || data.grauRisco > 4) {
    return { error: 'Grau de risco deve ser entre 1 e 4' }
  }

  try {
    // Verificar se o código já existe em outro CNAE
    const existing = await prisma.cNAE.findUnique({
      where: { codigo: data.codigo }
    })

    if (existing && existing.id !== id) {
      return { error: 'Já existe outro CNAE com este código' }
    }

    const cnae = await prisma.cNAE.update({
      where: { id },
      data: {
        codigo: data.codigo,
        descricao: data.descricao,
        grauRisco: data.grauRisco,
        ativo: data.ativo,
      }
    })

    revalidatePath('/dashboard/cadastros/cnaes')
    return { success: true, cnae }
  } catch (error) {
    console.error('Erro ao atualizar CNAE:', error)
    return { error: 'Erro ao atualizar CNAE' }
  }
}

export async function deleteCNAE(id: string) {
  const user = await getCurrentUser()
  if (!user || !isPlatformAdmin(user.id)) {
    return { error: 'Não autorizado. Apenas administradores da plataforma.' }
  }

  try {
    // Verificar se há empresas usando este CNAE
    const companiesUsingCNAE = await prisma.companyCNAE.count({
      where: { cnaeId: id }
    })

    if (companiesUsingCNAE > 0) {
      return { 
        error: `Este CNAE não pode ser excluído pois está sendo usado por ${companiesUsingCNAE} empresa(s)` 
      }
    }

    await prisma.cNAE.delete({
      where: { id }
    })

    revalidatePath('/dashboard/cadastros/cnaes')
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar CNAE:', error)
    return { error: 'Erro ao deletar CNAE' }
  }
}

export async function getCNAEById(id: string) {
  try {
    const cnae = await prisma.cNAE.findUnique({
      where: { id }
    })

    if (!cnae) {
      return { error: 'CNAE não encontrado' }
    }

    return { success: true, cnae }
  } catch (error) {
    console.error('Erro ao buscar CNAE:', error)
    return { error: 'Erro ao buscar CNAE' }
  }
}
