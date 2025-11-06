import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { chunkText } from '@/lib/services/pdf-service'
import { generateEmbedding } from '@/lib/services/embedding-service'

const VALID_CATEGORIES = [
  'NORMA',
  'PROCEDIMENTO',
  'LEI',
  'BENCHMARKING',
  'REGULAMENTO',
  'MANUAL'
] as const

/**
 * POST /api/ai/knowledge/upload-text
 * Upload de documento via texto puro (workaround para PDFs)
 * Apenas admins podem fazer upload
 */
export async function POST(request: Request) {
  console.log('📝 [Upload Text] Iniciando upload de documento via texto...')
  
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      console.log('❌ [Upload Text] Usuário não autenticado')
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const isAdmin = await isPlatformAdmin(user.id)
    
    if (!isAdmin) {
      console.log('❌ [Upload Text] Usuário não é admin')
      return NextResponse.json(
        { error: 'Apenas administradores podem adicionar documentos' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { text, category, title, description } = body

    if (!text || !category || !title) {
      return NextResponse.json(
        { error: 'Texto, categoria e título são obrigatórios' },
        { status: 400 }
      )
    }

    if (!VALID_CATEGORIES.includes(category as any)) {
      return NextResponse.json(
        { error: `Categoria inválida. Opções: ${VALID_CATEGORIES.join(', ')}` },
        { status: 400 }
      )
    }

    console.log(`📝 [Upload Text] Título: ${title}, Categoria: ${category}`)

    // Dividir texto em chunks
    const chunks = chunkText(text, 1500)
    console.log(`✂️ [Upload Text] Texto dividido em ${chunks.length} chunks`)

    // Gerar embeddings
    const embeddings = []
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      try {
        const embeddingResult = await generateEmbedding(chunk)
        const embedding = 'embedding' in embeddingResult ? embeddingResult.embedding : []
        embeddings.push({ text: chunk, embedding })
      } catch (error) {
        console.error(`❌ Erro ao gerar embedding para chunk ${i + 1}:`, error)
      }
    }

    console.log(`✅ [Upload Text] ${embeddings.length} embeddings gerados`)

    // Criar documento
    const source = await prisma.knowledgeSource.create({
      data: {
        type: 'TEXT',
        mode: 'LOCAL_PDF',
        title,
        description: description || null,
        category,
        content: text,
        fileKey: null,
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
        uploadType: 'TEXT'
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
        embeddingsCount,
      }
    })
  } catch (error: any) {
    console.error('❌ [Upload Text] Erro:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar documento' },
      { status: 500 }
    )
  }
}
