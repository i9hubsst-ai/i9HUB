import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/ai/knowledge/view/[id]
 * Gera URL assinada para visualizar PDF do storage
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const documentId = params.id

    // Buscar documento
    const document = await prisma.knowledgeSource.findUnique({
      where: { id: documentId }
    })

    if (!document) {
      return NextResponse.json(
        { error: 'Documento não encontrado' },
        { status: 404 }
      )
    }

    // Se tem URL externa, retornar ela diretamente
    if (document.sourceUrl) {
      return NextResponse.json({ 
        url: document.sourceUrl,
        type: 'external'
      })
    }

    // Se tem arquivo no storage, gerar URL assinada
    if (document.fileKey) {
      const supabase = createAdminClient()
      
      // Gerar URL assinada válida por 1 hora
      const { data, error } = await supabase.storage
        .from('documents')
        .createSignedUrl(document.fileKey, 3600)

      if (error) {
        console.error('Erro ao gerar URL assinada:', error)
        return NextResponse.json(
          { error: 'Erro ao gerar URL de visualização' },
          { status: 500 }
        )
      }

      return NextResponse.json({ 
        url: data.signedUrl,
        type: 'storage'
      })
    }

    return NextResponse.json(
      { error: 'Documento não possui arquivo disponível' },
      { status: 404 }
    )

  } catch (error) {
    console.error('Erro ao obter URL do documento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
