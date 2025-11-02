import { NextRequest } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateEmbedding } from '@/lib/services/embedding-service'
import { createClient } from '@supabase/supabase-js'

// Função para extrair texto de PDFs (usando pdfjs-dist - compatível com serverless)
async function extractTextFromPDF(buffer: Buffer): Promise<{ text: string; pages: number }> {
  try {
    console.log('📄 [PDF] Extraindo texto do PDF com pdfjs-dist...')
    console.log('📄 [PDF] Buffer size:', buffer.length, 'bytes')
    
    // Importar pdfjs-dist (compatível com serverless)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js')
    console.log('📄 [PDF] pdfjs-dist carregado com sucesso')
    
    // Carregar o PDF
    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(buffer),
      useSystemFonts: true,
      standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/standard_fonts/',
    })
    
    const pdfDocument = await loadingTask.promise
    const numPages = pdfDocument.numPages
    console.log(`📄 [PDF] PDF carregado: ${numPages} páginas`)
    
    // Extrair texto de todas as páginas
    let fullText = ''
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(' ')
      fullText += pageText + '\n'
      
      if (pageNum % 10 === 0) {
        console.log(`📄 [PDF] Processadas ${pageNum}/${numPages} páginas...`)
      }
    }
    
    console.log(`✅ [PDF] Extraído: ${fullText.length} caracteres de ${numPages} páginas`)
    console.log(`✅ [PDF] Preview: ${fullText.substring(0, 300)}`)
    
    return {
      text: fullText.trim(),
      pages: numPages
    }
  } catch (error) {
    console.error('❌ [PDF] Erro detalhado ao extrair texto:', error)
    console.error('❌ [PDF] Error name:', error instanceof Error ? error.name : 'unknown')
    console.error('❌ [PDF] Error message:', error instanceof Error ? error.message : 'unknown')
    console.error('❌ [PDF] Error stack:', error instanceof Error ? error.stack : 'unknown')
    throw new Error(`Falha ao processar PDF: ${error instanceof Error ? error.message : 'Erro desconhecido'}`)
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
  try {
    console.log(`📄 [PROCESS] Processando arquivo: ${file.name}, tipo: ${file.type}, tamanho: ${file.size}`)
    
    const buffer = Buffer.from(await file.arrayBuffer())
    console.log(`📄 [PROCESS] Buffer criado: ${buffer.length} bytes`)
    
    const extension = file.name.toLowerCase().split('.').pop()
    console.log(`📄 [PROCESS] Extensão detectada: ${extension}`)

    switch (extension) {
      case 'pdf':
        console.log('📄 [PROCESS] Iniciando extração PDF...')
        const pdfResult = await extractTextFromPDF(buffer)
        console.log('📄 [PROCESS] Extração PDF concluída com sucesso')
        return { text: pdfResult.text, pages: pdfResult.pages }
      
      case 'doc':
      case 'docx':
        console.log('📄 [PROCESS] Iniciando extração Word...')
        const wordText = await extractTextFromWord(buffer)
        return { text: wordText }
      
      case 'txt':
        console.log('📄 [PROCESS] Lendo arquivo texto...')
        const txtText = buffer.toString('utf-8')
        return { text: txtText }
      
      default:
        throw new Error(`Tipo de arquivo não suportado: ${extension}`)
    }
  } catch (error) {
    console.error('❌ [PROCESS] Erro em processDocument:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('📤 [UPLOAD] Iniciando upload de documentos')
    
    const user = await getCurrentUser()
    if (!user) {
      console.log('❌ [UPLOAD] Usuário não autenticado')
      return new Response('Não autorizado', { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      console.log('❌ [UPLOAD] Usuário não é admin:', user.id)
      return new Response('Acesso negado', { status: 403 })
    }

    console.log('✅ [UPLOAD] Admin verificado:', user.id)

    const formData = await request.formData()
    const files = formData.getAll('documents') as File[]

    if (!files || files.length === 0) {
      console.log('❌ [UPLOAD] Nenhum arquivo enviado')
      return new Response('Nenhum arquivo enviado', { status: 400 })
    }

    console.log(`📁 [UPLOAD] ${files.length} arquivo(s) recebido(s)`)

    // Verificar variáveis de ambiente
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('❌ [UPLOAD] NEXT_PUBLIC_SUPABASE_URL não configurado')
      return new Response('Configuração de storage inválida', { status: 500 })
    }

    // DEBUG: Verificar quais chaves existem
    console.log('🔍 [DEBUG] SUPABASE_SERVICE_ROLE_KEY existe?', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    console.log('🔍 [DEBUG] NEXT_PUBLIC_SUPABASE_ANON_KEY existe?', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (serviceKey) {
      console.log('🔑 [UPLOAD] Usando SERVICE_ROLE_KEY:', serviceKey.substring(0, 30) + '...')
    } else if (anonKey) {
      console.log('⚠️ [UPLOAD] Usando ANON_KEY (não recomendado):', anonKey.substring(0, 30) + '...')
    } else {
      console.error('❌ [UPLOAD] Nenhuma chave Supabase disponível')
      return new Response('Configuração de storage inválida', { status: 500 })
    }

    const keyToUse = serviceKey || anonKey
    if (!keyToUse) {
      console.error('❌ [UPLOAD] Nenhuma chave Supabase disponível')
      return new Response('Configuração de storage inválida', { status: 500 })
    }

    // Inicializar Supabase Storage
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      keyToUse
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
        // Sanitizar nome do arquivo (remover caracteres especiais)
        const sanitizedName = file.name
          .normalize('NFD') // Decompor caracteres acentuados
          .replace(/[\u0300-\u036f]/g, '') // Remover diacríticos
          .replace(/[^a-zA-Z0-9._-]/g, '_') // Substituir caracteres especiais por _
          .replace(/_+/g, '_') // Remover underscores duplicados
          .replace(/^_|_$/g, '') // Remover underscores no início/fim
        
        const filename = `knowledge/${Date.now()}_${sanitizedName}`
        const buffer = Buffer.from(await file.arrayBuffer())
        
        console.log(`📤 [UPLOAD] Nome original: ${file.name}`)
        console.log(`📤 [UPLOAD] Nome sanitizado: ${sanitizedName}`)
        console.log(`📤 [UPLOAD] Enviando para storage: ${filename}`)
        console.log(`📤 [UPLOAD] Tamanho do buffer: ${buffer.length} bytes`)
        console.log(`📤 [UPLOAD] Content-Type: ${file.type}`)
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
          })

        if (uploadError) {
          console.error('❌ [UPLOAD] Erro no upload para Supabase:', uploadError)
          console.error('❌ [UPLOAD] Erro detalhado:', JSON.stringify(uploadError, null, 2))
          results.push({
            filename: file.name,
            status: 'error',
            error: `Falha no upload: ${uploadError.message}`
          })
          continue
        }

        console.log(`✅ [UPLOAD] Arquivo salvo no storage: ${uploadData.path}`)

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

    const response = {
      uploaded,
      total: files.length,
      results
    }

    console.log('✅ [UPLOAD] Retornando sucesso:', JSON.stringify(response))

    return Response.json(response)

  } catch (error) {
    console.error('❌ [UPLOAD] Erro no upload de documentos:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

// Função assíncrona para processar documento
async function processDocumentAsync(documentId: string, storagePath: string, file: File, supabase: any) {
  try {
    console.log(`📄 [ASYNC] Iniciando processamento assíncrono: ${file.name}`)
    console.log(`📄 [ASYNC] Document ID: ${documentId}`)
    console.log(`📄 [ASYNC] Storage path: ${storagePath}`)
    
    // Extrair texto
    console.log('📄 [ASYNC] Chamando processDocument...')
    const { text, pages } = await processDocument(file)
    console.log(`📝 [ASYNC] Texto extraído: ${text.length} caracteres, ${pages || 0} páginas`)
    console.log(`📝 [ASYNC] Preview do texto: ${text.substring(0, 200)}...`)
    
    // Dividir texto em chunks para embeddings
    const chunks = splitTextIntoChunks(text, 1000) // 1000 caracteres por chunk
    console.log(`✂️ [PROCESS] Documento dividido em ${chunks.length} chunks`)
    
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
    console.log(`💾 [PROCESS] Salvando ${chunks.length} chunks no banco...`)
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
    console.log(`✅ [PROCESS] ${chunks.length} embeddings salvos com sucesso`)

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

    console.log(`✅ [ASYNC] Documento processado com sucesso: ${file.name}`)

  } catch (error) {
    console.error(`❌ [ASYNC] Erro ao processar documento ${file.name}`)
    console.error('❌ [ASYNC] Error type:', typeof error)
    console.error('❌ [ASYNC] Error instanceof Error:', error instanceof Error)
    console.error('❌ [ASYNC] Error details:', error)
    
    if (error instanceof Error) {
      console.error('❌ [ASYNC] Error name:', error.name)
      console.error('❌ [ASYNC] Error message:', error.message)
      console.error('❌ [ASYNC] Error stack:', error.stack)
    }
    
    // Marcar como erro
    try {
      await prisma.knowledgeDocument.update({
        where: { id: documentId },
        data: {
          status: 'ERROR',
          processedAt: new Date()
        }
      })
      console.log('❌ [ASYNC] Documento marcado como ERROR no banco')
    } catch (dbError) {
      console.error('❌ [ASYNC] Erro ao atualizar status no banco:', dbError)
    }
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