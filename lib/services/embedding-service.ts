/**
 * Serviço de Geração de Embeddings usando OpenAI
 * 
 * Este serviço é responsável por:
 * 1. Gerar embeddings vetoriais de textos usando OpenAI API
 * 2. Armazenar embeddings no banco de dados
 * 3. Prover interface para busca vetorial
 */

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export interface EmbeddingInput {
  text: string
  sourceType: 'TEMPLATE' | 'ASSESSMENT' | 'ACTION_PLAN' | 'MTE_STANDARD' | 'ISO_STANDARD' | 'BEST_PRACTICE'
  sourceId: string
  metadata?: Record<string, any>
}

export interface EmbeddingResult {
  embedding: number[]
  tokensUsed: number
}

/**
 * Gera embedding para um texto usando OpenAI text-embedding-3-small
 * Mais eficiente e barato que ada-002
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float'
    })

    return {
      embedding: response.data[0].embedding,
      tokensUsed: response.usage.total_tokens
    }
  } catch (error) {
    console.error('Erro ao gerar embedding:', error)
    throw new Error('Falha ao gerar embedding com OpenAI')
  }
}

/**
 * Gera embeddings em lote (mais eficiente para múltiplos textos)
 */
export async function generateEmbeddingsBatch(texts: string[]): Promise<EmbeddingResult[]> {
  if (texts.length === 0) {
    return []
  }

  // OpenAI permite até 2048 inputs por request
  const MAX_BATCH_SIZE = 100 // Sendo conservador
  const results: EmbeddingResult[] = []

  for (let i = 0; i < texts.length; i += MAX_BATCH_SIZE) {
    const batch = texts.slice(i, i + MAX_BATCH_SIZE)
    
    try {
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: batch,
        encoding_format: 'float'
      })

      const batchResults = response.data.map((item) => ({
        embedding: item.embedding,
        tokensUsed: response.usage.total_tokens / response.data.length // Aproximado
      }))

      results.push(...batchResults)
    } catch (error) {
      console.error(`Erro ao processar lote ${i / MAX_BATCH_SIZE + 1}:`, error)
      throw error
    }
  }

  return results
}

/**
 * Prepara texto para embedding (limpeza e truncamento)
 */
export function prepareTextForEmbedding(text: string, maxLength: number = 8000): string {
  // Remove múltiplos espaços e quebras de linha
  let cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, '\n')
    .trim()

  // Trunca se muito longo (OpenAI tem limite de ~8191 tokens)
  if (cleaned.length > maxLength) {
    cleaned = cleaned.substring(0, maxLength) + '...'
  }

  return cleaned
}

/**
 * Divide texto longo em chunks menores para embedding
 * Útil para normas muito longas
 */
export function chunkText(text: string, chunkSize: number = 2000, overlap: number = 200): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    const chunk = text.substring(start, end)
    chunks.push(chunk)
    
    // Overlap para manter contexto entre chunks
    start = end - overlap
    if (start >= text.length) break
  }

  return chunks
}

/**
 * Calcula similaridade de cosseno entre dois vetores
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vetores devem ter o mesmo tamanho')
  }

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i]
    normA += vecA[i] * vecA[i]
    normB += vecB[i] * vecB[i]
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}
