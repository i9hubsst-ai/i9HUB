/**
 * Serviço RAG (Retrieval-Augmented Generation) para i9HUBSST
 * 
 * Combina busca semântica com embeddings OpenAI para encontrar
 * contexto relevante das NRs e documentação SST
 */

import { generateEmbedding } from './embedding-service'
import { prisma } from '@/lib/prisma'

export interface RAGSearchResult {
  content: string
  source: string
  similarity: number
  metadata: {
    nr?: string
    section?: string
    type: string
  }
}

export interface RAGContext {
  relevantContent: string
  sources: string[]
  confidence: number
}

/**
 * Busca contexto relevante usando embeddings
 */
export async function searchRelevantContext(
  query: string, 
  maxResults: number = 5,
  minSimilarity: number = 0.7
): Promise<RAGSearchResult[]> {
  try {
    console.log(`🔍 [RAG] Buscando contexto para: "${query}"`)
    
    // Timeout de 5 segundos para busca no banco
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout na busca RAG')), 5000)
    })
    
    // Por enquanto, fazer busca textual simples até embeddings serem configurados
    const dbPromise = prisma.$queryRaw`
      SELECT 
        content,
        metadata,
        "sourceType" as source_type,
        "sourceId" as source_id,
        "mteStandardId" as mte_standard_id,
        0.8 as similarity
      FROM knowledge_embeddings
      WHERE content ILIKE ${'%' + query + '%'}
      ORDER BY "createdAt" DESC
      LIMIT ${maxResults}
    `
    
    const results = await Promise.race([dbPromise, timeoutPromise]) as any[]

    console.log(`📚 [RAG] Encontrados ${results.length} resultados relevantes`)

    return results.map(row => ({
      content: row.content,
      source: row.source_type || 'UNKNOWN',
      similarity: row.similarity,
      metadata: {
        nr: row.metadata?.nr,
        section: row.metadata?.section,
        type: row.source_type || 'document'
      }
    }))
  } catch (error) {
    console.error('❌ [RAG] Erro na busca:', error)
    console.log('🔄 Usando fallback offline - RAG indisponível mas IA funcionará!')
    // Retornar contexto vazio - a IA ainda funcionará com o prompt base
    return []
  }
}

/**
 * Constrói contexto RAG formatado para o chat
 */
export async function buildRAGContext(query: string): Promise<RAGContext> {
  try {
    const results = await searchRelevantContext(query, 3, 0.6)
    
    if (results.length === 0) {
      return {
        relevantContent: '',
        sources: [],
        confidence: 0
      }
    }

    // Agregar conteúdo relevante
    const contentParts = results.map((result, index) => {
      const sourceInfo = result.metadata.nr ? 
        `(${result.metadata.nr}${result.metadata.section ? ` - ${result.metadata.section}` : ''})` :
        `(${result.source})`
      
      return `${index + 1}. ${sourceInfo}: ${result.content}`
    })

    const relevantContent = contentParts.join('\n\n')
    const sources = results.map(r => r.metadata.nr || r.source).filter(Boolean)
    const confidence = results.reduce((sum, r) => sum + r.similarity, 0) / results.length

    console.log(`✅ [RAG] Contexto construído com ${results.length} fontes, confiança: ${confidence.toFixed(2)}`)

    return {
      relevantContent,
      sources: Array.from(new Set(sources)), // remover duplicatas
      confidence
    }
  } catch (error) {
    console.error('❌ [RAG] Erro ao construir contexto:', error)
    return {
      relevantContent: '',
      sources: [],
      confidence: 0
    }
  }
}

/**
 * Prepara prompt enriquecido com contexto RAG usando configuração do admin
 */
export async function enrichPromptWithRAG(userPrompt: string, ragContext: RAGContext): Promise<string> {
  console.log('🔍 [PROMPT DEBUG] === INICIO DA CONSTRUÇÃO DO PROMPT ===')
  
  // Prompt base do sistema (sempre presente)
  const baseSystemPrompt = `Você é um assistente especializado em Segurança e Saúde do Trabalho (SST),
com profundo conhecimento das normas regulamentadoras brasileiras (NRs),
ISO 45001 e melhores práticas do setor.

DIRETRIZES BÁSICAS:
- Base suas respostas no conhecimento específico das NRs brasileiras
- Cite as normas relevantes (ex: "Conforme NR-12, item 12.38...")
- Seja técnico e preciso
- Use terminologia oficial das normas
- Se não tiver certeza sobre algo específico, mencione que precisa consultar a norma completa`

  console.log('📋 [PROMPT DEBUG] Prompt base SST definido')

  // Buscar configuração personalizada do admin (adicional)
  console.log('🔍 [PROMPT DEBUG] Buscando configuração personalizada do admin...')
  const customPrompt = await getSystemPromptFromConfig()
  
  console.log('📊 [PROMPT DEBUG] Resultado da busca de configuração:')
  console.log('📊 [PROMPT DEBUG] - Custom prompt existe:', !!customPrompt)
  console.log('📊 [PROMPT DEBUG] - Custom prompt tamanho:', customPrompt?.length || 0)
  console.log('📊 [PROMPT DEBUG] - Custom prompt conteúdo:', customPrompt || 'VAZIO')
  
  // Montar prompt final: Base + Personalizado + Contexto
  let fullSystemPrompt = baseSystemPrompt
  
  if (customPrompt && customPrompt.trim()) {
    console.log('✅ [PROMPT DEBUG] APLICANDO configuração personalizada do admin!')
    fullSystemPrompt += `

INSTRUÇÕES ADICIONAIS DO ADMINISTRADOR:
${customPrompt.trim()}`
  } else {
    console.log('⚠️ [PROMPT DEBUG] NENHUMA configuração personalizada encontrada - usando apenas prompt base')
  }

  const contextSection = ragContext.relevantContent ? `

## CONTEXTO RELEVANTE DAS NORMAS:
${ragContext.relevantContent}

IMPORTANTE: Use SEMPRE as informações do contexto acima para fundamentar sua resposta. 
Cite as normas específicas mencionadas quando aplicável.
` : ''

  console.log('📚 [PROMPT DEBUG] Contexto RAG:', ragContext.relevantContent ? 'ADICIONADO' : 'VAZIO')

  const fullPrompt = `${fullSystemPrompt}${contextSection}

Pergunta do usuário: ${userPrompt}`

  console.log('🎯 [PROMPT DEBUG] === PROMPT FINAL CONSTRUÍDO ===')
  console.log('📏 [PROMPT DEBUG] Tamanho total do prompt:', fullPrompt.length)
  console.log(' [PROMPT DEBUG] === FIM DA CONSTRUÇÃO DO PROMPT ===')

  return fullPrompt
}

/**
 * Busca o prompt personalizado do admin com fallback offline
 */
async function getSystemPromptFromConfig(): Promise<string | null> {
  console.log('🔍 [CONFIG DEBUG] === INICIO BUSCA CONFIGURAÇÃO ===')
  
  try {
    console.log('⏱️ [CONFIG DEBUG] Iniciando busca no banco com timeout de 3s...')
    
    // Timeout de 3 segundos para evitar travamento
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        console.log('⏰ [CONFIG DEBUG] TIMEOUT - Banco demorou mais de 3s')
        reject(new Error('Timeout na conexão com banco'))
      }, 3000)
    })
    
    const dbPromise = prisma.aIConfiguration.findFirst({
      where: { isActive: true },
      select: { systemPrompt: true, createdAt: true, updatedBy: true }
    })
    
    console.log('📡 [CONFIG DEBUG] Fazendo consulta no banco...')
    const config = await Promise.race([dbPromise, timeoutPromise]) as any
    
    console.log('✅ [CONFIG DEBUG] Consulta no banco bem-sucedida!')
    console.log('📊 [CONFIG DEBUG] Configuração encontrada:', !!config)
    
    if (config) {
      console.log('📋 [CONFIG DEBUG] Detalhes da configuração:')
      console.log('📋 [CONFIG DEBUG] - systemPrompt existe:', !!config.systemPrompt)
      console.log('📋 [CONFIG DEBUG] - systemPrompt tamanho:', config.systemPrompt?.length || 0)
      console.log('📋 [CONFIG DEBUG] - systemPrompt conteúdo:', config.systemPrompt || 'VAZIO')
      console.log('📋 [CONFIG DEBUG] - createdAt:', config.createdAt)
      console.log('📋 [CONFIG DEBUG] - updatedBy:', config.updatedBy)
      
      if (config.systemPrompt && config.systemPrompt.trim()) {
        console.log('🎯 [CONFIG DEBUG] RETORNANDO configuração DO BANCO!')
        return config.systemPrompt
      } else {
        console.log('⚠️ [CONFIG DEBUG] Configuração existe mas está VAZIA!')
        return null
      }
    } else {
      console.log('⚠️ [CONFIG DEBUG] Nenhuma configuração ativa encontrada no banco')
      return null
    }
    
  } catch (error) {
    console.error('❌ [CONFIG DEBUG] Erro ao buscar configuração do prompt:', error)
    console.log('🔄 [CONFIG DEBUG] Ativando FALLBACK offline...')
    
    // FALLBACK: Configuração padrão quando banco não está disponível
    const fallbackConfig = `- O seu nome é MA.IA (Máquina de Análise de Inteligência Artificial)
- Você é especialista em Segurança e Saúde do Trabalho
- Responda sempre de forma técnica e precisa
- Cite as normas regulamentadoras brasileiras quando relevante`
    
    console.log('🔄 [CONFIG DEBUG] RETORNANDO configuração de FALLBACK!')
    console.log('🔄 [CONFIG DEBUG] Fallback conteúdo:', fallbackConfig)
    
    return fallbackConfig
  }
}

/**
 * Conhecimento básico de SST como fallback
 */
function getBasicSSTKnowledge(query: string): RAGSearchResult[] {
  const normalizedQuery = query.toLowerCase()
  
  const basicKnowledge = [
    {
      content: "NR-01 - DISPOSIÇÕES GERAIS: Estabelece o Gerenciamento de Riscos Ocupacionais (GRO), Programa de Gerenciamento de Riscos (PGR), inventário de riscos e análise preliminar de riscos.",
      source: "NR-01",
      similarity: 0.9,
      metadata: { nr: "NR-01", type: "norma", section: "disposições gerais" }
    },
    {
      content: "NR-04 - SESMT: Serviços Especializados em Engenharia de Segurança e Medicina do Trabalho. Dimensionamento baseado no grau de risco e número de empregados conforme quadro I e II.",
      source: "NR-04",
      similarity: 0.9,
      metadata: { nr: "NR-04", type: "norma", section: "sesmt" }
    },
    {
      content: "NR-05 - CIPA: Comissão Interna de Prevenção de Acidentes. Obrigatória conforme número de empregados e grau de risco, mandato de um ano, eleições anuais.",
      source: "NR-05",
      similarity: 0.9,
      metadata: { nr: "NR-05", type: "norma", section: "cipa" }
    },
    {
      content: "NR-06 - EPI: Equipamentos de Proteção Individual devem ter CA (Certificado de Aprovação), fornecimento gratuito pelo empregador, treinamento obrigatório sobre uso adequado.",
      source: "NR-06",
      similarity: 0.9,
      metadata: { nr: "NR-06", type: "norma", section: "epi" }
    },
    {
      content: "NR-12 - MÁQUINAS: Segurança em máquinas e equipamentos. Dispositivos de segurança, proteções fixas/móveis, capacitação obrigatória, análise de riscos.",
      source: "NR-12",
      similarity: 0.9,
      metadata: { nr: "NR-12", type: "norma", section: "máquinas" }
    },
    {
      content: "NR-35 - ALTURA: Trabalho em altura acima de 2m. Exige Análise de Risco, Permissão de Trabalho (PT), capacitação específica, EPIs adequados, supervisão.",
      source: "NR-35",
      similarity: 0.9,
      metadata: { nr: "NR-35", type: "norma", section: "altura" }
    }
  ]

  // Filtrar conhecimento relevante baseado na query
  return basicKnowledge.filter(item => {
    const content = item.content.toLowerCase()
    const nr = item.metadata.nr?.toLowerCase()
    
    return content.includes(normalizedQuery) || 
           nr?.includes(normalizedQuery) ||
           item.metadata.section?.includes(normalizedQuery)
  }).slice(0, 3)
}

/**
 * Adiciona resposta aprovada à base de conhecimento
 */
export async function addApprovedResponse(
  userQuery: string, 
  aiResponse: string, 
  userId: string = 'anonymous',
  source: string = 'feedback'
): Promise<void> {
  try {
    console.log(`📚 [RAG] Adicionando resposta aprovada à base de conhecimento`)
    
    // Salvar no banco de dados sem embedding por enquanto
    await prisma.knowledgeEmbedding.create({
      data: {
        sourceType: 'BEST_PRACTICE',
        sourceId: `feedback_${Date.now()}_${userId}`,
        content: `PERGUNTA: ${userQuery}\nRESPOSTA: ${aiResponse}`,
        metadata: {
          user_query: userQuery,
          ai_response: aiResponse,
          approved_by: userId,
          source: source,
          created_from: 'feedback',
          type: 'chat_approved'
        }
      }
    })
    
    console.log(`✅ [RAG] Resposta aprovada salva com sucesso`)
  } catch (error) {
    console.error('❌ [RAG] Erro ao salvar resposta aprovada:', error)
    throw error
  }
}
