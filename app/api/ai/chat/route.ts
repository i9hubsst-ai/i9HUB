import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { buildRAGContext, enrichPromptWithRAG } from '@/lib/services/rag-service'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// 🚀 LEMBRETE: ESTE CÓDIGO RODA NA VERCEL (PRODUÇÃO), NÃO LOCAL!
// Para debug: Vercel Dashboard > Logs, não console local
// Configure Google provider with API key
const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
})

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

    // Verificar se é um comando especial de admin
    const user = await getCurrentUser()
    const isAdmin = user ? await isPlatformAdmin(user.id) : false
    
    if (isAdmin && user && userPrompt.startsWith('/')) {
      console.log(`👑 [${new Date().toISOString()}] [API] Comando de admin detectado`)
      const commandResponse = await processAdminCommand(userPrompt, user.id)
      return new Response(commandResponse, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        }
      })
    }

    // Buscar contexto RAG
    const ragStart = Date.now()
    console.log(`🧠 [${new Date().toISOString()}] [API] Iniciando busca RAG...`)
    const ragContext = await buildRAGContext(userPrompt)
    const ragEnd = Date.now()
    console.log(`📚 [${new Date().toISOString()}] [API] RAG completado em ${ragEnd - ragStart}ms - Confiança: ${ragContext.confidence.toFixed(2)}`)
    
    // Enriquecer prompt com contexto RAG
    const enrichedPrompt = await enrichPromptWithRAG(userPrompt, ragContext)
    
    console.log(`🤖 [${new Date().toISOString()}] [API] Chamando Gemini com contexto RAG - MODELO CORRIGIDO!`)
    const geminiStart = Date.now()
    
    // ✅ MODELO FUNCIONANDO: gemini-2.5-flash (testado e validado)
    const result = await streamText({
      model: google('gemini-2.5-flash'), // ✅ Modelo compatível com API v1beta
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

/**
 * Processa comandos especiais para administradores
 */
async function processAdminCommand(command: string, userId: string): Promise<string> {
  const cmd = command.toLowerCase().trim()
  
  try {
    // Comando /aprender - adiciona instrução ao prompt
    if (cmd.startsWith('/aprender ')) {
      const instruction = command.substring(10).trim()
      if (!instruction) {
        return "❌ Comando inválido. Use: /aprender [sua instrução]"
      }
      
      const result = await addInstructionToPrompt(instruction, userId)
      return result
    }
    
    // Comando /ver - mostra prompt atual
    if (cmd === '/ver' || cmd === '/prompt') {
      const currentPrompt = await getCurrentPrompt()
      return currentPrompt
    }
    
    // Comando /limpar - limpa prompt personalizado
    if (cmd === '/limpar' || cmd === '/reset') {
      const result = await clearCustomPrompt(userId)
      return result
    }
    
    // Comando /ajuda - lista comandos disponíveis
    if (cmd === '/ajuda' || cmd === '/help' || cmd === '/?') {
      return `🤖 **COMANDOS DE ADMINISTRADOR**

**Treinar IA:**
• \`/aprender [instrução]\` - Adiciona nova instrução ao prompt
• \`/ver\` - Mostra prompt personalizado atual  
• \`/limpar\` - Remove todas as instruções personalizadas

**Exemplos:**
• \`/aprender Sempre inclua custos estimados nas sugestões\`
• \`/aprender Priorize soluções para pequenas empresas\`
• \`/aprender Mencione prazos legais quando aplicável\`

**Dica:** Use esses comandos durante conversas para ajustar o comportamento da IA em tempo real! 🚀`
    }
    
    return `❌ Comando não reconhecido: ${command}

Digite \`/ajuda\` para ver comandos disponíveis.`
    
  } catch (error) {
    console.error('Erro ao processar comando admin:', error)
    return "❌ Erro interno ao processar comando. Tente novamente."
  }
}

/**
 * Adiciona nova instrução ao prompt personalizado
 */
async function addInstructionToPrompt(instruction: string, userId: string): Promise<string> {
  try {
    // Buscar prompt atual
    const currentConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    let existingInstructions = currentConfig?.systemPrompt || ""
    
    // Adicionar nova instrução
    const newInstruction = `- ${instruction}`
    const updatedPrompt = existingInstructions.trim() 
      ? `${existingInstructions}\n${newInstruction}`
      : newInstruction
    
    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    // Criar nova configuração
    await prisma.aIConfiguration.create({
      data: {
        systemPrompt: updatedPrompt,
        temperature: currentConfig?.temperature || 0.7,
        maxTokens: currentConfig?.maxTokens || 2000,
        isActive: true,
        updatedBy: userId
      }
    })
    
    return `✅ **Instrução adicionada com sucesso!**

**Nova instrução:** ${instruction}

A IA agora seguirá esta orientação em todas as respostas. Use \`/ver\` para conferir o prompt completo.`
    
  } catch (error) {
    console.error('Erro ao adicionar instrução:', error)
    throw error
  }
}

/**
 * Mostra o prompt personalizado atual
 */
async function getCurrentPrompt(): Promise<string> {
  try {
    const config = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    if (!config?.systemPrompt || config.systemPrompt.trim() === '') {
      return `📋 **PROMPT ATUAL**

**Status:** Usando apenas prompt base SST
**Instruções personalizadas:** Nenhuma

Use \`/aprender [instrução]\` para adicionar orientações específicas.`
    }
    
    return `📋 **PROMPT PERSONALIZADO ATUAL**

\`\`\`
${config.systemPrompt}
\`\`\`

**Configurações:**
• Temperatura: ${config.temperature}
• Max Tokens: ${config.maxTokens}

Use \`/aprender [nova instrução]\` para adicionar mais orientações.`
    
  } catch (error) {
    console.error('Erro ao buscar prompt:', error)
    return "❌ Erro ao buscar prompt atual."
  }
}

/**
 * Limpa prompt personalizado
 */
async function clearCustomPrompt(userId: string): Promise<string> {
  try {
    const currentConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    // Criar configuração limpa
    await prisma.aIConfiguration.create({
      data: {
        systemPrompt: "",
        temperature: currentConfig?.temperature || 0.7,
        maxTokens: currentConfig?.maxTokens || 2000,
        isActive: true,
        updatedBy: userId
      }
    })
    
    return `🧹 **Prompt personalizado limpo!**

A IA agora usa apenas o prompt base especializado em SST.
Use \`/aprender [instrução]\` para adicionar novas orientações.`
    
  } catch (error) {
    console.error('Erro ao limpar prompt:', error)
    throw error
  }
}