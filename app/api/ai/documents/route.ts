import { NextRequest } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateEmbedding } from '@/lib/services/embedding-service'
import { createClient } from '@supabase/supabase-js'

// Função para extrair texto de PDFs (usando pdf-parse)
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    // Por enquanto, retornar placeholder
    // TODO: Implementar extração real com pdf-parse
    return "Texto extraído do PDF (placeholder - implementar pdf-parse)"
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error)
    throw new Error('Falha ao processar PDF')
  }
}

// Função para extrair texto de documentos Word
async function extractTextFromWord(buffer: Buffer): Promise<string> {
  try {
    // Por enquanto, retornar placeholder
    // TODO: Implementar extração real com mammoth ou similar
    return "Texto extraído do Word (placeholder - implementar mammoth)"
  } catch (error) {
    console.error('Erro ao extrair texto do Word:', error)
    throw new Error('Falha ao processar documento Word')
  }
}

// Função para processar arquivo e extrair texto
async function processDocument(file: File): Promise<{ text: string; pages?: number }> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const extension = file.name.toLowerCase().split('.').pop()

  switch (extension) {
    case 'pdf':
      const pdfText = await extractTextFromPDF(buffer)
      return { text: pdfText, pages: 1 } // TODO: calcular páginas reais
    
    case 'doc':
    case 'docx':
      const wordText = await extractTextFromWord(buffer)
      return { text: wordText }
    
    case 'txt':
      const txtText = buffer.toString('utf-8')
      return { text: txtText }
    
    default:
      throw new Error(`Tipo de arquivo não suportado: ${extension}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response('Não autorizado', { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return new Response('Acesso negado', { status: 403 })
    }

    const formData = await request.formData()
    const files = formData.getAll('documents') as File[]

    if (!files || files.length === 0) {
      return new Response('Nenhum arquivo enviado', { status: 400 })
    }

    // Inicializar Supabase Storage
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const results = []

    for (const file of files) {
      try {
        // Validações
        if (file.size > 10 * 1024 * 1024) { // 10MB
          results.push({
            filename: file.name,
            status: 'error',
            error: 'Arquivo muito grande (máx. 10MB)'
          })
          continue
        }

        const allowedTypes = ['.pdf', '.doc', '.docx', '.txt']
        const extension = '.' + file.name.toLowerCase().split('.').pop()
        
        if (!allowedTypes.includes(extension)) {
          results.push({
            filename: file.name,
            status: 'error',
            error: 'Tipo de arquivo não suportado'
          })
          continue
        }

        // Upload para Supabase Storage
        const filename = `knowledge/${Date.now()}_${file.name}`
        const buffer = Buffer.from(await file.arrayBuffer())
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
          })

        if (uploadError) {
          console.error('Erro no upload para Supabase:', uploadError)
          results.push({
            filename: file.name,
            status: 'error',
            error: 'Falha no upload para storage'
          })
          continue
        }

        // Criar registro no banco
        const document = await prisma.knowledgeDocument.create({
          data: {
            filename: file.name,
            originalFilename: file.name,
            filepath: uploadData.path,
            size: file.size,
            mimeType: file.type,
            status: 'PROCESSING',
            uploadedBy: user.id
          }
        })

        // Processar documento em background
        processDocumentAsync(document.id, uploadData.path, file, supabase)

        results.push({
          filename: file.name,
          status: 'uploaded',
          id: document.id
        })

      } catch (error) {
        console.error(`Erro ao processar ${file.name}:`, error)
        results.push({
          filename: file.name,
          status: 'error',
          error: 'Erro no processamento'
        })
      }
    }

    const uploaded = results.filter(r => r.status === 'uploaded').length

    return Response.json({
      uploaded,
      total: files.length,
      results
    })

  } catch (error) {
    console.error('Erro no upload de documentos:', error)
    return new Response('Erro interno', { status: 500 })
  }
}

// Função assíncrona para processar documento
async function processDocumentAsync(documentId: string, storagePath: string, file: File, supabase: any) {
  try {
    console.log(`📄 Processando documento: ${file.name}`)
    
    // Extrair texto
    const { text, pages } = await processDocument(file)
    
    // Dividir texto em chunks para embeddings
    const chunks = splitTextIntoChunks(text, 1000) // 1000 caracteres por chunk
    
    // Gerar embeddings para cada chunk (se OpenAI configurado)
    const embeddings = []
    if (process.env.OPENAI_API_KEY) {
      for (const chunk of chunks) {
        try {
          const embedding = await generateEmbedding(chunk)
          embeddings.push(embedding)
        } catch (error) {
          console.warn('Falha ao gerar embedding para chunk:', error)
          embeddings.push(null)
        }
      }
    }

    // Salvar chunks na base de conhecimento
    for (let i = 0; i < chunks.length; i++) {
      await prisma.knowledgeEmbedding.create({
        data: {
          sourceType: 'DOCUMENT',
          sourceId: documentId,
          content: chunks[i],
          metadata: {
            filename: file.name,
            chunk_index: i,
            total_chunks: chunks.length,
            document_id: documentId
          }
        }
      })
    }

    // Atualizar status do documento
    await prisma.knowledgeDocument.update({
      where: { id: documentId },
      data: {
        status: 'READY',
        pages,
        processedAt: new Date(),
        extractedText: text.substring(0, 5000) // Primeiros 5000 chars para preview
      }
    })

    console.log(`✅ Documento processado com sucesso: ${file.name}`)

  } catch (error) {
    console.error(`❌ Erro ao processar documento ${file.name}:`, error)
    
    // Marcar como erro
    await prisma.knowledgeDocument.update({
      where: { id: documentId },
      data: {
        status: 'ERROR',
        processedAt: new Date()
      }
    })
  }
}

// Função para dividir texto em chunks
function splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
  const chunks = []
  const sentences = text.split(/[.!?]+/)
  
  let currentChunk = ''
  
  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim()
    if (!trimmedSentence) continue
    
    const newChunk = currentChunk + (currentChunk ? '. ' : '') + trimmedSentence
    
    if (newChunk.length <= maxChunkSize) {
      currentChunk = newChunk
    } else {
      if (currentChunk) {
        chunks.push(currentChunk + '.')
      }
      currentChunk = trimmedSentence
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk + '.')
  }
  
  return chunks
}