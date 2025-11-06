'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function getKnowledgeDocuments() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Não autorizado' }
    }

    const documents = await prisma.knowledgeSource.findMany({
      where: {
        isActive: true
        // TODO: Filtrar por companyId quando schema for ajustado
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { success: true, documents }
  } catch (error: any) {
    console.error('Erro ao buscar documentos:', error)
    return { error: error.message }
  }
}

export async function getDocumentCategoryCounts() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Não autorizado' }
    }

    // Buscar todos os documentos e contar manualmente
    const documents = await prisma.knowledgeSource.findMany({
      where: {
        isActive: true
      },
      select: {
        category: true
      }
    })

    const categoryMap = documents.reduce((acc, doc) => {
      acc[doc.category] = (acc[doc.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Garantir que todas as categorias apareçam (mesmo com 0)
    const allCategories = ['NORMA', 'PROCEDIMENTO', 'LEI', 'BENCHMARKING', 'REGULAMENTO', 'MANUAL']
    const result = allCategories.reduce((acc, category) => {
      acc[category] = categoryMap[category] || 0
      return acc
    }, {} as Record<string, number>)

    return { success: true, counts: result }
  } catch (error: any) {
    console.error('Erro ao contar documentos:', error)
    return { error: error.message }
  }
}

export async function deleteKnowledgeDocument(documentId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Não autorizado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return { error: 'Apenas administradores podem excluir documentos' }
    }

    // Deletar embeddings associados
    await prisma.knowledgeEmbedding.deleteMany({
      where: { sourceId: documentId }
    })

    // Deletar documento
    await prisma.knowledgeSource.delete({
      where: { id: documentId }
    })

    revalidatePath('/dashboard/knowledge-base')
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao excluir documento:', error)
    return { error: error.message }
  }
}

export async function syncKnowledgeDocument(documentId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Não autorizado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return { error: 'Apenas administradores podem sincronizar documentos' }
    }

    // Buscar documento
    const document = await prisma.knowledgeSource.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return { error: 'Documento não encontrado' }
    }

    if (document.mode !== 'AUTO_SYNC') {
      return { error: 'Apenas documentos AUTO_SYNC podem ser sincronizados' }
    }

    if (!document.sourceUrl) {
      return { error: 'Documento não possui URL de origem' }
    }

    // Chamar endpoint de sync
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/ai/knowledge/sync?sourceId=${documentId}`, {
      method: 'GET'
    })

    if (!response.ok) {
      const error = await response.text()
      return { error: `Erro ao sincronizar: ${error}` }
    }

    revalidatePath('/dashboard/knowledge-base')
    return { success: true }
  } catch (error: any) {
    console.error('Erro ao sincronizar documento:', error)
    return { error: error.message }
  }
}
