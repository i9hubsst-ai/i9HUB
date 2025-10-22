/**
 * Serviço RAG (Retrieval-Augmented Generation)
 * 
 * Fornece busca semântica sobre a base de conhecimento usando embeddings vetoriais
 */

import { prisma } from '@/lib/prisma'
import { generateEmbedding } from './embedding-service'

export interface RAGSearchResult {
  id: string
  content: string
  sourceType: string
  sourceId: string
  metadata: any
  similarity: number
}

export interface RAGSearchOptions {
  limit?: number
  minSimilarity?: number
  sourceTypes?: string[]
  nrNumbers?: string[] // Filtrar por normas específicas
}

/**
 * Busca semântica na base de conhecimento
 */
export async function searchKnowledge(
  query: string,
  options: RAGSearchOptions = {}
): Promise<RAGSearchResult[]> {
  const {
    limit = 5,
    minSimilarity = 0.7,
    sourceTypes,
    nrNumbers
  } = options

  try {
    // 1. Gerar embedding da query
    const { embedding: queryEmbedding } = await generateEmbedding(query)
    const embeddingVector = `[${queryEmbedding.join(',')}]`

    // 2. Construir parâmetros e WHERE clause
    // Importante: construir array de params ANTES de montar SQL para evitar problemas com índices
    const params: any[] = [embeddingVector] // $1 sempre é o embedding
    let whereClause = ''
    
    if (sourceTypes && sourceTypes.length > 0) {
      params.push(sourceTypes)
      whereClause += ` AND ke."sourceType" = ANY($${params.length}::"EmbeddingSourceType"[])`
    }

    if (nrNumbers && nrNumbers.length > 0) {
      params.push(nrNumbers)
      whereClause += ` AND (ke.metadata->>'nrNumber') = ANY($${params.length}::text[])`
    }

    // Adicionar limit como último parâmetro
    params.push(limit)
    const limitParam = params.length

    // 3. Busca vetorial usando pgvector
    // Nota: pgvector usa operador <=> para distância de cosseno
    const sql = `
      SELECT 
        ke.id,
        ke.content,
        ke."sourceType",
        ke."sourceId",
        ke.metadata,
        1 - (ke.embedding <=> $1::vector) as similarity
      FROM knowledge_embeddings ke
      WHERE 1=1 ${whereClause}
      ORDER BY ke.embedding <=> $1::vector
      LIMIT $${limitParam}
    `

    const results = await prisma.$queryRawUnsafe<any[]>(sql, ...params)

    // 4. Filtrar por similaridade mínima
    return results
      .filter(r => r.similarity >= minSimilarity)
      .map(r => ({
        id: r.id,
        content: r.content,
        sourceType: r.sourceType,
        sourceId: r.sourceId,
        metadata: r.metadata,
        similarity: Number(r.similarity)
      }))

  } catch (error) {
    console.error('Erro na busca vetorial:', error)
    throw new Error('Falha ao realizar busca semântica')
  }
}

/**
 * Busca normas MTE relevantes para uma query
 */
export async function searchMteStandards(
  query: string,
  options: { limit?: number; nrNumbers?: string[] } = {}
): Promise<RAGSearchResult[]> {
  return searchKnowledge(query, {
    ...options,
    sourceTypes: ['MTE_STANDARD'],
    minSimilarity: 0.75 // Threshold mais alto para normas
  })
}

/**
 * Constrói contexto rico para a IA baseado em busca RAG
 */
export async function buildAIContext(
  query: string,
  options: {
    includeStandards?: boolean
    includeTemplates?: boolean
    includeAssessments?: boolean
    maxTokens?: number
  } = {}
): Promise<string> {
  const {
    includeStandards = true,
    includeTemplates = true,
    includeAssessments = false,
    maxTokens = 4000
  } = options

  const sourceTypes: string[] = []
  if (includeStandards) sourceTypes.push('MTE_STANDARD')
  if (includeTemplates) sourceTypes.push('TEMPLATE')
  if (includeAssessments) sourceTypes.push('ASSESSMENT')

  // Buscar conhecimento relevante
  const results = await searchKnowledge(query, {
    limit: 10,
    sourceTypes,
    minSimilarity: 0.7
  })

  if (results.length === 0) {
    return ''
  }

  // Construir contexto formatado
  let context = '## Contexto Relevante da Base de Conhecimento:\n\n'
  let currentTokens = 0

  for (const result of results) {
    const section = `### ${result.sourceType} (Similaridade: ${(result.similarity * 100).toFixed(1)}%)\n`
    const content = `${result.content}\n\n`
    const metadata = result.metadata ? `*Metadados: ${JSON.stringify(result.metadata)}*\n\n` : ''
    
    const sectionText = section + content + metadata
    const estimatedTokens = sectionText.length / 4 // Aproximação: 1 token ≈ 4 chars

    if (currentTokens + estimatedTokens > maxTokens) {
      break // Não exceder limite de tokens
    }

    context += sectionText
    currentTokens += estimatedTokens
  }

  context += '---\n\n'
  return context
}

/**
 * Encontra normas relacionadas a um tema específico
 */
export async function findRelatedStandards(
  topic: string,
  limit: number = 5
): Promise<Array<{
  nrNumber: string
  title: string
  relevantSections: string[]
  similarity: number
}>> {
  const results = await searchMteStandards(topic, { limit: limit * 2 })

  // Agrupar por NR
  const byNr = new Map<string, RAGSearchResult[]>()
  
  for (const result of results) {
    const nrNumber = result.metadata?.nrNumber || 'unknown'
    if (!byNr.has(nrNumber)) {
      byNr.set(nrNumber, [])
    }
    byNr.get(nrNumber)!.push(result)
  }

  // Consolidar resultados
  const consolidated = Array.from(byNr.entries()).map(([nrNumber, chunks]) => {
    const avgSimilarity = chunks.reduce((sum, c) => sum + c.similarity, 0) / chunks.length
    const title = chunks[0]?.metadata?.title || nrNumber
    const relevantSections = chunks
      .map(c => c.content.substring(0, 200) + '...')
      .slice(0, 3)

    return {
      nrNumber,
      title,
      relevantSections,
      similarity: avgSimilarity
    }
  })

  // Ordenar por similaridade e limitar
  return consolidated
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
}
