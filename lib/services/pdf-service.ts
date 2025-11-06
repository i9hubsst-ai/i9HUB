/**
 * Serviço de processamento de PDFs
 * Extrai texto e gera embeddings para base de conhecimento
 */

import * as pdfParse from 'pdf-parse'
import { generateEmbedding } from './embedding-service'

/**
 * Extrai texto de um buffer de PDF
 */
export async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  try {
    console.log('📄 [PDF Service] Extraindo texto do PDF...')
    
    const data = await pdfParse(Buffer.from(buffer))
    
    console.log(`✅ [PDF Service] Texto extraído: ${data.numpages} páginas, ${data.text.length} caracteres`)
    
    return data.text
  } catch (error) {
    console.error('❌ [PDF Service] Erro ao extrair texto:', error)
    throw new Error('Falha ao extrair texto do PDF')
  }
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
 * Extrai metadados do PDF
 */
export async function extractPdfMetadata(buffer: ArrayBuffer) {
  try {
    const data = await pdfParse(Buffer.from(buffer))
    
    return {
      pages: data.numpages,
      info: data.info,
      metadata: data.metadata,
      version: data.version,
    }
  } catch (error) {
    console.error('❌ [PDF Service] Erro ao extrair metadata:', error)
    return null
  }
}
