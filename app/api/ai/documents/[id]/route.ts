import { NextRequest } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { unlink } from 'fs/promises'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response('Não autorizado', { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return new Response('Acesso negado', { status: 403 })
    }

    const params = await context.params
    const documentId = params.id

    // Buscar documento
    const document = await prisma.knowledgeDocument.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return new Response('Documento não encontrado', { status: 404 })
    }

    // Remover arquivo físico
    try {
      await unlink(document.filepath)
    } catch {
      console.warn('Arquivo físico não encontrado:', document.filepath)
    }

    // Remover embeddings relacionados
    await prisma.knowledgeEmbedding.deleteMany({
      where: { 
        sourceType: 'DOCUMENT',
        sourceId: documentId 
      }
    })

    // Remover documento do banco
    await prisma.knowledgeDocument.delete({
      where: { id: documentId }
    })

    return Response.json({ success: true })

  } catch (error) {
    console.error('Erro ao deletar documento:', error)
    return new Response('Erro interno', { status: 500 })
  }
}