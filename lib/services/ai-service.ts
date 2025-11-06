/**
 * Serviço Unificado de IA para i9HUBSST
 * 
 * Centraliza todas as chamadas de IA usando:
 * - Modelo: gemini-2.5-flash (mais recente e performático)
 * - RAG: Busca semântica em base de conhecimento SST
 * - Prompts especializados por contexto
 */

import { streamText, generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { buildRAGContext, enrichPromptWithRAG } from './rag-service'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
})

const MODEL = 'gemini-2.5-flash' // Modelo unificado

/**
 * Sistema de prompts especializados
 */
const SYSTEM_PROMPTS = {
  chat: `Você é MA.IA, assistente especializada em Segurança e Saúde do Trabalho da plataforma i9HUBSST.

IDENTIDADE:
- Nome: MA.IA (Matriz de Análise Inteligente Assistida)
- Especialização: SST, NRs, ISO 45001, auditorias, análise de riscos
- Tom: Profissional, didática, objetiva e prestativa

DIRETRIZES:
✅ Responda SEMPRE em português brasileiro
✅ Seja precisa e cite fontes quando possível (NRs, normas)
✅ Use exemplos práticos do dia a dia de SST
✅ Formate respostas de forma clara (listas, tópicos)
✅ Sugira ações práticas quando relevante

❌ Nunca invente informações técnicas ou normativas
❌ Não dê diagnósticos médicos
❌ Se não souber, seja honesta e sugira onde buscar

CONTEXTO: Você tem acesso a base de conhecimento com NRs, ISO e documentação SST.`,

  templateSuggestions: `Você é um especialista em criação de templates de auditoria e diagnóstico para SST.

TAREFA: Analisar a solicitação e gerar sugestões estruturadas de templates.

FORMATO DE RESPOSTA (JSON):
{
  "suggestions": [
    {
      "title": "Nome do Template",
      "description": "Descrição detalhada",
      "sections": ["Seção 1", "Seção 2", "..."],
      "norm": "NR ou ISO aplicável",
      "estimatedQuestions": 15
    }
  ]
}

DIRETRIZES:
✅ Base-se em normas e boas práticas (NRs, ISO)
✅ Estruture em seções lógicas
✅ Inclua perguntas de verificação objetivas
✅ Considere diferentes níveis de maturidade
✅ Use linguagem técnica mas acessível

CONTEXTO: Você tem acesso à base de conhecimento com NRs e normas SST.`,

  actionPlanSuggestions: `Você é um especialista em elaboração de planos de ação corretivos para SST.

TAREFA: Analisar achados/não-conformidades e gerar sugestões de ações usando metodologia 5W2H.

FORMATO DE RESPOSTA (JSON):
{
  "actions": [
    {
      "what": "O que fazer (ação clara e objetiva)",
      "why": "Por que fazer (justificativa técnica)",
      "where": "Onde aplicar (local/setor específico)",
      "when": "Quando fazer (prazo sugerido)",
      "who": "Quem é responsável (cargo/função)",
      "how": "Como fazer (método detalhado)",
      "howMuch": "Quanto custa (estimativa se possível)",
      "priority": "HIGH|MEDIUM|LOW",
      "norm": "NR ou norma relacionada"
    }
  ]
}

DIRETRIZES:
✅ Priorize ações por criticidade (risco à vida/saúde = HIGH)
✅ Seja específico e prático nas ações
✅ Considere viabilidade técnica e econômica
✅ Referencie normas quando aplicável
✅ Sugira prazos realistas (imediato, 30, 60, 90 dias)

HIERARQUIA DE CONTROLES (ordem de prioridade):
1. Eliminação do perigo
2. Substituição por algo menos perigoso
3. Controles de engenharia
4. Controles administrativos
5. EPIs (último recurso)

CONTEXTO: Você tem acesso à base de conhecimento com NRs e boas práticas SST.`,

  reportWriter: `Você é um especialista em redação técnica de relatórios de SST.

TAREFA: Transformar dados estruturados em relatório profissional e detalhado.

FORMATO: Texto corrido em português formal técnico

ESTRUTURA SUGERIDA:
1. Sumário Executivo
2. Introdução e Objetivos
3. Metodologia
4. Resultados e Análises
5. Não-conformidades Identificadas
6. Recomendações e Plano de Ação
7. Conclusão
8. Referências Normativas

DIRETRIZES:
✅ Use linguagem técnica mas clara
✅ Cite normas e regulamentações
✅ Inclua análises críticas, não apenas descrições
✅ Priorize objetividade e evidências
✅ Formate com títulos, subtítulos e tópicos

CONTEXTO: Você tem acesso à base de conhecimento com NRs e normas.`
}

/**
 * Interface de configuração para geração de texto
 */
interface AIGenerationConfig {
  systemPrompt: string
  userPrompt: string
  useRAG?: boolean
  temperature?: number
  maxTokens?: number
}

/**
 * Gera texto com RAG (não-streaming)
 */
export async function generateWithRAG(config: AIGenerationConfig): Promise<string> {
  const {
    systemPrompt,
    userPrompt,
    useRAG = true,
    temperature = 0.7,
    maxTokens = 2000
  } = config

  console.log(`🤖 [AI-Service] Gerando texto com RAG=${useRAG}`)

  let enrichedPrompt = userPrompt

  // Buscar contexto RAG se habilitado
  if (useRAG) {
    const ragStart = Date.now()
    const ragContext = await buildRAGContext(userPrompt)
    const ragEnd = Date.now()
    console.log(`📚 [AI-Service] RAG completado em ${ragEnd - ragStart}ms - Confiança: ${ragContext.confidence.toFixed(2)}`)
    
    enrichedPrompt = await enrichPromptWithRAG(userPrompt, ragContext)
  }

  // Combinar system prompt com user prompt
  const fullPrompt = `${systemPrompt}

---

${enrichedPrompt}`

  console.log(`🤖 [AI-Service] Chamando Gemini ${MODEL}...`)
  const start = Date.now()

  const result = await generateText({
    model: google(MODEL),
    prompt: fullPrompt,
    temperature,
    maxTokens,
  })

  const end = Date.now()
  console.log(`✅ [AI-Service] Gemini respondeu em ${end - start}ms`)

  return result.text
}

/**
 * Gera texto com streaming e RAG
 */
export async function streamWithRAG(config: AIGenerationConfig) {
  const {
    systemPrompt,
    userPrompt,
    useRAG = true,
    temperature = 0.7,
    maxTokens = 2000
  } = config

  console.log(`🤖 [AI-Service] Streaming com RAG=${useRAG}`)

  let enrichedPrompt = userPrompt

  // Buscar contexto RAG se habilitado
  if (useRAG) {
    const ragStart = Date.now()
    const ragContext = await buildRAGContext(userPrompt)
    const ragEnd = Date.now()
    console.log(`📚 [AI-Service] RAG completado em ${ragEnd - ragStart}ms - Confiança: ${ragContext.confidence.toFixed(2)}`)
    
    enrichedPrompt = await enrichPromptWithRAG(userPrompt, ragContext)
  }

  // Combinar system prompt com user prompt
  const fullPrompt = `${systemPrompt}

---

${enrichedPrompt}`

  console.log(`🤖 [AI-Service] Chamando Gemini ${MODEL} (streaming)...`)

  const result = await streamText({
    model: google(MODEL),
    prompt: fullPrompt,
    temperature,
    maxTokens,
  })

  return result
}

/**
 * API específica para chat (streaming)
 */
export async function chatWithAI(userPrompt: string) {
  return streamWithRAG({
    systemPrompt: SYSTEM_PROMPTS.chat,
    userPrompt,
    useRAG: true,
    temperature: 0.7,
    maxTokens: 2000
  })
}

/**
 * API específica para sugestões de templates
 */
export async function generateTemplateSuggestions(prompt: string, context?: Record<string, unknown>): Promise<string> {
  const contextStr = context ? `\n\nCONTEXTO ADICIONAL:\n${JSON.stringify(context, null, 2)}` : ''
  
  return generateWithRAG({
    systemPrompt: SYSTEM_PROMPTS.templateSuggestions,
    userPrompt: `${prompt}${contextStr}`,
    useRAG: true,
    temperature: 0.8, // Mais criativo para sugestões
    maxTokens: 3000
  })
}

/**
 * API específica para sugestões de planos de ação
 */
export async function generateActionPlanSuggestions(
  findings: Record<string, unknown>[], 
  context?: Record<string, unknown>
): Promise<string> {
  const findingsStr = JSON.stringify(findings, null, 2)
  const contextStr = context ? JSON.stringify(context, null, 2) : 'Não fornecido'
  
  const prompt = `ACHADOS/NÃO-CONFORMIDADES:
${findingsStr}

CONTEXTO DO DIAGNÓSTICO:
${contextStr}

Analise os achados acima e gere um plano de ação completo em JSON.`

  return generateWithRAG({
    systemPrompt: SYSTEM_PROMPTS.actionPlanSuggestions,
    userPrompt: prompt,
    useRAG: true,
    temperature: 0.6, // Menos criativo, mais técnico
    maxTokens: 4000 // Mais tokens para planos complexos
  })
}

/**
 * API específica para geração de relatórios
 */
export async function generateReport(data: Record<string, unknown>): Promise<string> {
  const dataStr = JSON.stringify(data, null, 2)
  
  const prompt = `DADOS DO DIAGNÓSTICO/AUDITORIA:
${dataStr}

Gere um relatório técnico profissional baseado nos dados acima.`

  return generateWithRAG({
    systemPrompt: SYSTEM_PROMPTS.reportWriter,
    userPrompt: prompt,
    useRAG: true,
    temperature: 0.5, // Baixa criatividade para relatórios formais
    maxTokens: 5000 // Relatórios podem ser longos
  })
}

/**
 * Exportar tudo como um serviço único
 */
export const aiService = {
  chat: chatWithAI,
  generateTemplateSuggestions,
  generateActionPlanSuggestions,
  generateReport,
  // APIs de baixo nível para casos personalizados
  generateWithRAG,
  streamWithRAG,
}
