/**
 * Serviço de Geração de Embeddings usando OpenAI - Enhanced for RAG
 * 
 * Este serviço é responsável por:
 * 1. Gerar embeddings vetoriais de textos usando OpenAI API
 * 2. Prover interface para busca vetorial RAG
 * 3. Processar documentos para base de conhecimento
 * 4. Suporte a feedback e aprendizado contínuo
 */

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export interface EmbeddingInput {
  text: string
  sourceType: 'TEMPLATE' | 'ASSESSMENT' | 'ACTION_PLAN' | 'MTE_STANDARD' | 'ISO_STANDARD' | 'BEST_PRACTICE' | 'CHAT_APPROVED' | 'NR_DOCUMENT'
  sourceId: string
  metadata?: Record<string, any>
}

export interface EmbeddingResult {
  embedding: number[]
  tokensUsed: number
}

export interface DocumentChunk {
  id: string
  text: string
  embedding?: number[]
  metadata: {
    source: string
    type: 'nr' | 'iso' | 'template' | 'action_plan' | 'chat_approved'
    category?: string
    company_id?: string
    nr_number?: string
    created_at: Date
    approved_by?: string
  }
}

export interface SearchResult {
  chunk: DocumentChunk
  similarity: number
  relevanceScore: number
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

/**
 * Processa documento para RAG: divide em chunks e gera embeddings
 */
export async function processDocumentForRAG(
  content: string,
  metadata: DocumentChunk['metadata']
): Promise<DocumentChunk[]> {
  try {
    console.log(`📄 [RAG] Processando documento: ${metadata.source}`)
    
    // Divide em chunks menores
    const textChunks = chunkText(content, 1500, 150)
    
    // Gera embeddings para todos os chunks
    const embeddingResults = await generateEmbeddingsBatch(textChunks)
    
    // Cria DocumentChunks
    const documentChunks: DocumentChunk[] = textChunks.map((text, index) => ({
      id: `${metadata.source}_chunk_${index}`,
      text: prepareTextForEmbedding(text),
      embedding: embeddingResults[index]?.embedding,
      metadata: {
        ...metadata,
        created_at: new Date(),
      }
    }))

    console.log(`✅ [RAG] ${documentChunks.length} chunks processados para ${metadata.source}`)
    return documentChunks
  } catch (error) {
    console.error('❌ [RAG] Erro ao processar documento:', error)
    throw error
  }
}

/**
 * Busca semântica usando embeddings
 */
export async function semanticSearch(
  query: string,
  documentChunks: DocumentChunk[],
  topK: number = 5,
  minSimilarity: number = 0.7
): Promise<SearchResult[]> {
  try {
    console.log(`🔍 [RAG] Buscando: "${query}" em ${documentChunks.length} chunks`)
    
    // Gera embedding da query
    const queryResult = await generateEmbedding(query)
    const queryEmbedding = queryResult.embedding
    
    // Calcula similaridade para todos os chunks
    const results: SearchResult[] = documentChunks
      .filter(chunk => chunk.embedding) // Só chunks com embedding
      .map(chunk => {
        const similarity = cosineSimilarity(queryEmbedding, chunk.embedding!)
        
        // Calcula score de relevância baseado em tipo e similaridade
        let relevanceScore = similarity
        
        // Boost para tipos específicos
        if (chunk.metadata.type === 'nr' && query.toLowerCase().includes('nr')) {
          relevanceScore *= 1.2
        }
        if (chunk.metadata.type === 'template' && query.toLowerCase().includes('template')) {
          relevanceScore *= 1.1
        }
        if (chunk.metadata.type === 'chat_approved') {
          relevanceScore *= 1.15 // Prioriza conteúdo já aprovado
        }
        
        return {
          chunk,
          similarity,
          relevanceScore
        }
      })
      .filter(result => result.similarity >= minSimilarity)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, topK)

    console.log(`✅ [RAG] ${results.length} resultados encontrados (similarity >= ${minSimilarity})`)
    return results
  } catch (error) {
    console.error('❌ [RAG] Erro na busca semântica:', error)
    throw error
  }
}

/**
 * Constrói contexto RAG a partir dos resultados da busca
 */
export function buildRAGContext(searchResults: SearchResult[], maxTokens: number = 3000): string {
  let context = ''
  let tokenCount = 0
  
  for (const result of searchResults) {
    const chunkText = result.chunk.text
    const chunkTokens = Math.ceil(chunkText.length / 4) // Aproximação de tokens
    
    if (tokenCount + chunkTokens > maxTokens) {
      break
    }
    
    // Adiciona metadados do source
    const source = result.chunk.metadata.source
    const type = result.chunk.metadata.type
    const similarity = (result.similarity * 100).toFixed(1)
    
    context += `[FONTE: ${source} (${type}) - Relevância: ${similarity}%]\n`
    context += `${chunkText}\n\n`
    
    tokenCount += chunkTokens
  }
  
  console.log(`📝 [RAG] Contexto construído: ~${tokenCount} tokens de ${searchResults.length} fontes`)
  return context
}

/**
 * Pipeline RAG completo: busca + contexto + geração
 */
export async function ragPipeline(
  query: string,
  documentChunks: DocumentChunk[],
  systemPrompt: string = ''
): Promise<{
  context: string
  searchResults: SearchResult[]
  enhancedPrompt: string
}> {
  try {
    console.log(`🚀 [RAG] Iniciando pipeline para: "${query}"`)
    
    // 1. Busca semântica
    const searchResults = await semanticSearch(query, documentChunks, 5, 0.65)
    
    // 2. Constrói contexto
    const context = buildRAGContext(searchResults, 3000)
    
    // 3. Monta prompt enriquecido
    const enhancedPrompt = `${systemPrompt}

CONTEXTO ESPECÍFICO (baseado em documentos oficiais e conhecimento aprovado):
${context}

PERGUNTA DO USUÁRIO: ${query}

Responda baseando-se prioritariamente no CONTEXTO ESPECÍFICO fornecido acima. Se o contexto não contiver informações suficientes, mencione isso na resposta.`

    console.log(`✅ [RAG] Pipeline completo: ${searchResults.length} fontes, contexto de ~${Math.ceil(context.length/4)} tokens`)
    
    return {
      context,
      searchResults,
      enhancedPrompt
    }
  } catch (error) {
    console.error('❌ [RAG] Erro no pipeline:', error)
    throw error
  }
}
