import { NextResponse } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { processPdfForEmbedding, extractPdfMetadata } from '@/lib/services/pdf-service'

/**
 * POST /api/ai/knowledge/sync
 * Sincroniza documento de URL externa (download → extração → embeddings)
 * Apenas admin pode executar
 */
export async function POST(request: Request) {
  console.log('🔄 [Sync] Iniciando sincronização de documento...')
  
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Verificar se é admin
    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      console.log('❌ [Sync] Usuário não é admin')
      return NextResponse.json(
        { error: 'Apenas administradores podem sincronizar documentos' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { sourceUrl, category, title, description, syncFrequency = 'WEEKLY' } = body

    if (!sourceUrl || !category || !title) {
      return NextResponse.json(
        { error: 'URL, categoria e título são obrigatórios' },
        { status: 400 }
      )
    }

    console.log(`📥 [Sync] Baixando PDF de: ${sourceUrl}`)

    // Baixar PDF da URL
    const pdfResponse = await fetch(sourceUrl)
    if (!pdfResponse.ok) {
      throw new Error(`Erro ao baixar PDF: ${pdfResponse.statusText}`)
    }

    const contentType = pdfResponse.headers.get('content-type')
    if (!contentType?.includes('pdf')) {
      throw new Error('URL não retorna um arquivo PDF válido')
    }

    const buffer = await pdfResponse.arrayBuffer()
    console.log(`✅ [Sync] PDF baixado: ${(buffer.byteLength / 1024).toFixed(2)} KB`)

    // Salvar no Supabase Storage
    const fileName = `${Date.now()}_${title.replace(/[^a-zA-Z0-9.-]/g, '_')}.pdf`
    const filePath = `knowledge-base/auto-sync/${category}/${fileName}`

    const supabase = await createClient()
    const { error: uploadError } = await supabase.storage
      .from('pdfs')
      .upload(filePath, buffer, {
        contentType: 'application/pdf',
        upsert: false
      })

    if (uploadError) {
      console.error('❌ [Sync] Erro no storage:', uploadError)
      throw new Error('Erro ao salvar PDF: ' + uploadError.message)
    }

    console.log('✅ [Sync] PDF salvo no storage')

    // Extrair metadata
    const pdfMetadata = await extractPdfMetadata(buffer)
    console.log(`📊 [Sync] Metadata: ${pdfMetadata?.pages} páginas`)

    // Processar PDF: extrair texto e gerar embeddings
    console.log('🔄 [Sync] Processando PDF...')
    const { fullText, embeddings } = await processPdfForEmbedding(buffer)

    console.log(`✅ [Sync] ${embeddings.length} embeddings gerados`)

    // Verificar se já existe documento com mesma URL
    const existing = await prisma.knowledgeSource.findFirst({
      where: {
        sourceUrl,
        mode: 'AUTO_SYNC'
      }
    })

    let source

    if (existing) {
      // Atualizar documento existente
      console.log(`🔄 [Sync] Atualizando documento existente: ${existing.id}`)
      
      source = await prisma.knowledgeSource.update({
        where: { id: existing.id },
        data: {
          content: fullText,
          fileKey: filePath,
          lastSyncAt: new Date(),
          updatedAt: new Date(),
        }
      })

      // Deletar embeddings antigos
      await prisma.knowledgeEmbedding.deleteMany({
        where: { sourceId: existing.id }
      })
      
      console.log('✅ [Sync] Embeddings antigos removidos')
    } else {
      // Criar novo documento
      console.log('🆕 [Sync] Criando novo documento')
      
      source = await prisma.knowledgeSource.create({
        data: {
          type: 'PDF',
          mode: 'AUTO_SYNC',
          title,
          description: description || null,
          category,
          content: fullText,
          sourceUrl,
          fileKey: filePath,
          lastSyncAt: new Date(),
          syncFrequency,
          createdBy: user.id,
          companyId: 'GLOBAL',
          isActive: true,
        }
      })
    }

    console.log(`✅ [Sync] KnowledgeSource: ${source.id}`)

    // Salvar embeddings usando raw SQL (Unsupported type requer isso)
    let embeddingsCount = 0
    for (let i = 0; i < embeddings.length; i++) {
      const item = embeddings[i]
      const metadata = {
        documentTitle: title,
        category,
        chunkIndex: i,
        totalChunks: embeddings.length,
        pages: pdfMetadata?.pages || 0,
        sourceUrl,
        syncedAt: new Date().toISOString(),
      }

      const vectorString = `[${item.embedding.join(',')}]`
      
      await prisma.$executeRaw`
        INSERT INTO knowledge_embeddings 
          (id, "sourceType", "sourceId", content, metadata, embedding, "createdAt", "updatedAt")
        VALUES 
          (gen_random_uuid(), ${category}::text, ${source.id}, ${item.text}, ${JSON.stringify(metadata)}::jsonb, ${vectorString}::vector, NOW(), NOW())
      `
      embeddingsCount++
    }

    console.log(`✅ [Sync] ${embeddingsCount} embeddings salvos`)

    return NextResponse.json({
      success: true,
      document: {
        id: source.id,
        title: source.title,
        category: source.category,
        mode: source.mode,
        sourceUrl: source.sourceUrl,
        fileKey: source.fileKey,
        lastSyncAt: source.lastSyncAt,
        pages: pdfMetadata?.pages || 0,
        embeddingsCount,
        isUpdate: !!existing,
      }
    })
    
  } catch (error: any) {
    console.error('❌ [Sync] Erro:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao sincronizar documento' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ai/knowledge/sync?sourceId=xxx
 * Força re-sincronização de um documento específico
 */
export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Apenas administradores podem sincronizar' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const sourceId = searchParams.get('sourceId')

    if (!sourceId) {
      return NextResponse.json(
        { error: 'sourceId é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar documento
    const source = await prisma.knowledgeSource.findUnique({
      where: { id: sourceId }
    })

    if (!source) {
      return NextResponse.json(
        { error: 'Documento não encontrado' },
        { status: 404 }
      )
    }

    if (source.mode !== 'AUTO_SYNC' || !source.sourceUrl) {
      return NextResponse.json(
        { error: 'Documento não está em modo AUTO_SYNC' },
        { status: 400 }
      )
    }

    // Re-sincronizar chamando POST
    const syncRequest = new Request(request.url.replace(/\?.*/, ''), {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify({
        sourceUrl: source.sourceUrl,
        category: source.category,
        title: source.title,
        description: source.description,
        syncFrequency: source.syncFrequency,
      })
    })

    return POST(syncRequest)
    
  } catch (error: any) {
    console.error('❌ [Sync GET] Erro:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao sincronizar' },
      { status: 500 }
    )
  }
}
