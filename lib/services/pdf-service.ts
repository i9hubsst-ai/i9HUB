/**
 * Serviço de processamento de PDFs
 * Extrai texto e gera embeddings para base de conhecimento
 * 
 * NOTA: Extração de PDF desabilitada temporariamente devido a incompatibilidades serverless
 * Use endpoints externos ou aguarde implementação de worker separado
 */

import { generateEmbedding } from './embedding-service'

/**
 * Extrai texto de um buffer de PDF
 * TEMPORÁRIO: Retorna mensagem de erro até implementar worker externo
 */
export async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  throw new Error('Extração de PDF temporariamente desabilitada. Por favor, cole o texto manualmente ou aguarde próxima atualização.')
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
 * TEMPORÁRIO: Retorna dados mínimos até implementar worker externo
 */
export async function extractPdfMetadata(buffer: ArrayBuffer) {
  return {
    pages: 1,
    info: {},
    metadata: {},
  }
}
