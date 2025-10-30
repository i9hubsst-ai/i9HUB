import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { buildRAGContext, enrichPromptWithRAG } from '@/lib/services/rag-service'

export async function POST(request: Request) {
  const startTime = Date.now()
  console.log(`⏱️ [${new Date().toISOString()}] [API] Requisição recebida - START TIME: ${startTime}`)
  
  try {
    const parseStart = Date.now()
    const { messages } = await request.json()
    const parseEnd = Date.now()
    console.log(`📋 [${new Date().toISOString()}] [API] JSON parseado em ${parseEnd - parseStart}ms`)
    console.log(`📋 [${new Date().toISOString()}] [API] Mensagens:`, JSON.stringify(messages, null, 2))
    
    if (!messages || !messages.length) {
      console.log(`❌ [${new Date().toISOString()}] [API] Erro: Mensagens vazias`)
      return new Response(
        'Mensagens são obrigatórias',
        { 
          status: 400,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          }
        }
      )
    }

    const extractStart = Date.now()
    const lastMessage = messages[messages.length - 1]
    const userPrompt = lastMessage.content
    const extractEnd = Date.now()
    console.log(`🔍 [${new Date().toISOString()}] [API] Prompt extraído em ${extractEnd - extractStart}ms:`, userPrompt)

    // Buscar contexto RAG
    const ragStart = Date.now()
    console.log(`🧠 [${new Date().toISOString()}] [API] Iniciando busca RAG...`)
    const ragContext = await buildRAGContext(userPrompt)
    const ragEnd = Date.now()
    console.log(`📚 [${new Date().toISOString()}] [API] RAG completado em ${ragEnd - ragStart}ms - Confiança: ${ragContext.confidence.toFixed(2)}`)
    
    // Enriquecer prompt com contexto RAG
    const enrichedPrompt = enrichPromptWithRAG(userPrompt, ragContext)
    
    console.log(`🤖 [${new Date().toISOString()}] [API] Chamando Gemini com contexto RAG...`)
    const geminiStart = Date.now()
    
    // Usar AI SDK v3 com streamText
    const result = await streamText({
      model: google('models/gemini-1.5-flash'),
      messages: [
        {
          role: 'user',
          content: enrichedPrompt
        }
      ],
      temperature: 0.7,
      maxTokens: 2000,
    })

    const geminiEnd = Date.now()
    console.log(`✅ [${new Date().toISOString()}] [API] Gemini respondeu em ${geminiEnd - geminiStart}ms`)
    
    const totalTime = Date.now() - startTime
    console.log(`🏁 [${new Date().toISOString()}] [API] PROCESSO COMPLETO com RAG - Total: ${totalTime}ms | Parse: ${parseEnd - parseStart}ms | Extract: ${extractEnd - extractStart}ms | RAG: ${ragEnd - ragStart}ms | Gemini: ${geminiEnd - geminiStart}ms`)
    console.log(`📊 [${new Date().toISOString()}] [API] Fontes RAG usadas:`, ragContext.sources)
    
    return result.toAIStreamResponse()
  } catch (error: any) {
    const errorTime = Date.now() - startTime
    console.error(`💥 [${new Date().toISOString()}] [API] ERRO após ${errorTime}ms:`, error)
    return new Response(
      `Erro: ${error.message || 'Erro interno do servidor'}`,
      { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        }
      }
    )
  }
}