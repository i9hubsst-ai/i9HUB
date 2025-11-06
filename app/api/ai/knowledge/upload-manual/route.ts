import { NextResponse } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { processPdfForEmbedding, extractPdfMetadata } from '@/lib/services/pdf-service'

const VALID_CATEGORIES = [
  'NORMA',
  'PROCEDIMENTO',
  'LEI',
  'BENCHMARKING',
  'MTE_STANDARD',
  'ISO_STANDARD',
  'REGULAMENTO',
  'MANUAL',
  'DOCUMENT'
] as const

export async function POST(request: Request) {
  console.log('📤 [Upload] Iniciando upload manual...')
  
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Apenas admins podem fazer upload' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null

    if (!file || !category || !title) {
      return NextResponse.json({ error: 'Arquivo, categoria e título obrigatórios' }, { status: 400 })
    }

    if (!VALID_CATEGORIES.includes(category as any)) {
      return NextResponse.json({ error: 'Categoria inválida' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Apenas PDFs são permitidos' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filePath = `knowledge/${fileName}`

    const supabase = await createClient()
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, buffer, { contentType: 'application/pdf', upsert: false })

    if (uploadError) throw new Error('Erro no storage: ' + uploadError.message)

    const metadata = await extractPdfMetadata(buffer)
    const { fullText, embeddings } = await processPdfForEmbedding(buffer)

    const source = await prisma.knowledgeSource.create({
      data: {
        type: 'PDF',
        mode: 'LOCAL_PDF',
        title,
        description,
        category,
        content: fullText,
        fileKey: filePath,
        createdBy: user.id,
        companyId: 'GLOBAL',
        isActive: true,
      }
    })

    // Salvar embeddings usando raw SQL
    let embeddingsCount = 0
    for (let i = 0; i < embeddings.length; i++) {
      const item = embeddings[i]
      const embeddingMetadata = {
        documentTitle: title,
        category,
        chunkIndex: i,
        totalChunks: embeddings.length,
        pages: metadata?.pages || 0,
        fileName: file.name,
      }

      const vectorString = `[${item.embedding.join(',')}]`
      
      await prisma.$executeRaw`
        INSERT INTO knowledge_embeddings 
          (id, "sourceType", "sourceId", content, metadata, embedding, "createdAt", "updatedAt")
        VALUES 
          (gen_random_uuid(), ${category}::text, ${source.id}, ${item.text}, ${JSON.stringify(embeddingMetadata)}::jsonb, ${vectorString}::vector, NOW(), NOW())
      `
      embeddingsCount++
    }

    return NextResponse.json({
      success: true,
      document: {
        id: source.id,
        title: source.title,
        category: source.category,
        mode: source.mode,
        pages: metadata?.pages || 0,
        embeddingsCount,
      }
    })
    
  } catch (error: any) {
    console.error('❌ [Upload] Erro:', error)
    return NextResponse.json({ error: error.message || 'Erro ao processar' }, { status: 500 })
  }
}
