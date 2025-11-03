                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                import { NextRequest } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    console.log('🗑️ [DELETE] Iniciando exclusão de documento')
    
    const user = await getCurrentUser()
    if (!user) {
      console.log('❌ [DELETE] Usuário não autenticado')
      return new Response('Não autorizado', { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      console.log('❌ [DELETE] Usuário não é admin')
      return new Response('Acesso negado', { status: 403 })
    }

    const params = await context.params
    const documentId = params.id
    
    console.log('✅ [DELETE] Admin verificado, deletando documento:', documentId)

    // Buscar documento
    const document = await prisma.knowledgeDocument.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      console.log('❌ [DELETE] Documento não encontrado')
      return new Response('Documento não encontrado', { status: 404 })
    }

    console.log('📄 [DELETE] Documento encontrado:', document.filename)
    console.log('📂 [DELETE] Caminho no storage:', document.filepath)

    // Inicializar Supabase Storage
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (serviceKey) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceKey
      )

      // Deletar arquivo do Supabase Storage
      console.log('🗑️ [DELETE] Deletando arquivo do storage...')
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.filepath])

      if (storageError) {
        console.error('❌ [DELETE] Erro ao deletar do storage:', storageError)
        // Continua mesmo com erro, para não deixar registro órfão no banco
      } else {
        console.log('✅ [DELETE] Arquivo removido do storage com sucesso')
      }
    } else {
      console.warn('⚠️ [DELETE] SUPABASE_SERVICE_ROLE_KEY não configurado, pulando delete do storage')
    }

    // Remover embeddings relacionados
    console.log('🗑️ [DELETE] Removendo embeddings...')
    const deletedEmbeddings = await prisma.knowledgeEmbedding.deleteMany({
      where: { 
        sourceType: 'DOCUMENT',
        sourceId: documentId 
      }
    })
    console.log(`✅ [DELETE] ${deletedEmbeddings.count} embeddings removidos`)

    // Remover documento do banco
    console.log('🗑️ [DELETE] Removendo documento do banco...')
    await prisma.knowledgeDocument.delete({
      where: { id: documentId }
    })
    console.log('✅ [DELETE] Documento removido do banco com sucesso')

    return Response.json({ 
      success: true,
      message: 'Documento e arquivo removidos com sucesso'
    })

  } catch (error) {
    console.error('❌ [DELETE] Erro ao deletar documento:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}