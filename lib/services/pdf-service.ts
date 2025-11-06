/**
 * Serviço de processamento de PDFs
 * Extrai texto e gera embeddings para base de conhecimento
 * Usa pdf2json - 100% compatível com serverless
 */

import { generateEmbedding } from './embedding-service'

/**
 * Extrai texto de um buffer de PDF usando pdf2json (mesmo método do /api/ai/documents)
 */
export async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      console.log('📄 [PDF Service] Extraindo texto do PDF com pdf2json...')
      
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const PDFParser = require('pdf2json')
      const pdfParser = new PDFParser()
      
      // Handler de sucesso
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        try {
          let fullText = ''
          const pages = pdfData.Pages || []
          
          console.log(`📄 [PDF Service] Total de páginas: ${pages.length}`)
          
          pages.forEach((page: any) => {
            const texts = page.Texts || []
            texts.forEach((text: any) => {
              if (text.R && text.R.length > 0) {
                text.R.forEach((r: any) => {
                  if (r.T) {
                    const decodedText = decodeURIComponent(r.T)
                    fullText += decodedText + ' '
                  }
                })
              }
            })
            fullText += '\n'
          })
          
          fullText = fullText.trim()
          
          console.log(`✅ [PDF Service] Extraído: ${fullText.length} caracteres de ${pages.length} páginas`)
          
          resolve(fullText)
        } catch (parseError) {
          reject(new Error(`Erro ao processar PDF: ${parseError instanceof Error ? parseError.message : 'Erro desconhecido'}`))
        }
      })
      
      // Handler de erro
      pdfParser.on('pdfParser_dataError', (error: any) => {
        console.error('❌ [PDF Service] Erro no parser:', error)
        reject(new Error(`Erro no parser: ${error.parserError || 'Erro desconhecido'}`))
      })
      
      // Converter ArrayBuffer para Buffer
      const nodeBuffer = Buffer.from(buffer)
      pdfParser.parseBuffer(nodeBuffer)
      
    } catch (error) {
      console.error('❌ [PDF Service] Erro ao extrair texto:', error)
      reject(new Error('Falha ao extrair texto do PDF'))
    }
  })
}

/**
 * Divide texto em chunks menores para processamento
 * OpenAI tem limite de ~8000 tokens por embedding
 */
export function chunkText(text: string, maxChunkSize: number = 1500): string[] {
  const chunks: string[] = []
  const paragraphs = text.split('\n\n')
  
  let currentChunk = ''
  
  for (const paragraph of paragraphs) {
    // Se adicionar o parágrafo ultrapassar o limite, salva o chunk atual
    if (currentChunk.length + paragraph.length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = paragraph
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph
    }
  }
  
  // Adiciona o último chunk
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim())
  }
  
  console.log(`📦 [PDF Service] Texto dividido em ${chunks.length} chunks`)
  
  return chunks
}

/**
 * Processa PDF completo: extrai texto, divide em chunks e gera embeddings
 */
export async function processPdfForEmbedding(buffer: ArrayBuffer) {
  // Extrair texto
  const fullText = await extractPdfText(buffer)
  
  // Dividir em chunks
  const chunks = chunkText(fullText)
  
  // Gerar embeddings para cada chunk
  const embeddings: Array<{ text: string; embedding: number[] }> = []
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i]
    console.log(`🔄 [PDF Service] Gerando embedding ${i + 1}/${chunks.length}...`)
    
    try {
      const embeddingResult = await generateEmbedding(chunk)
      const embedding = 'embedding' in embeddingResult ? embeddingResult.embedding : []
      embeddings.push({ text: chunk, embedding })
    } catch (error) {
      console.error(`❌ [PDF Service] Erro ao gerar embedding para chunk ${i + 1}:`, error)
      // Continua com os próximos chunks mesmo se um falhar
    }
  }
  
  console.log(`✅ [PDF Service] ${embeddings.length}/${chunks.length} embeddings gerados com sucesso`)
  
  return {
    fullText,
    chunks,
    embeddings
  }
}

/**
 * Extrai metadados de um PDF usando pdf2json
 */
export async function extractPdfMetadata(buffer: ArrayBuffer): Promise<{ pages: number; title?: string }> {
  return new Promise((resolve, reject) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const PDFParser = require('pdf2json')
      const pdfParser = new PDFParser()
      
      pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
        try {
          const pages = pdfData.Pages ? pdfData.Pages.length : 0
          const title = pdfData.Meta?.Title || undefined
          
          console.log(`✅ [PDF Service] Metadados extraídos: ${pages} páginas${title ? `, título: ${title}` : ''}`)
          resolve({ pages, title })
        } catch (error) {
          reject(new Error('Erro ao processar metadados'))
        }
      })
      
      pdfParser.on('pdfParser_dataError', (error: any) => {
        console.error('❌ [PDF Service] Erro ao extrair metadados:', error)
        reject(new Error(`Erro no parser: ${error.parserError || 'Erro desconhecido'}`))
      })
      
      const nodeBuffer = Buffer.from(buffer)
      pdfParser.parseBuffer(nodeBuffer)
      
    } catch (error) {
      console.error('❌ [PDF Service] Erro ao extrair metadados:', error)
      reject(new Error('Falha ao extrair metadados do PDF'))
    }
  })
}
