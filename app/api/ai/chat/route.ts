import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

export async function POST(request: Request) {
  const startTime = Date.now()
  console.log(`⏱️ [${new Date().toISOString()}] [API] Requisição recebida - START TIME: ${startTime}`)
  
  try {
    const parseStart = Date.now()
    const { messages } = await request.json()
    const parseEnd = Date.now()
    console.log(`� [${new Date().toISOString()}] [API] JSON parseado em ${parseEnd - parseStart}ms`)
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
    const prompt = lastMessage.content
    const extractEnd = Date.now()
    console.log(`� [${new Date().toISOString()}] [API] Prompt extraído em ${extractEnd - extractStart}ms:`, prompt)

    const systemPrompt = `Você é um assistente especializado em Segurança e Saúde do Trabalho (SST),
    com profundo conhecimento das normas regulamentadoras brasileiras (NRs),
    ISO 45001 e melhores práticas do setor. 

CONHECIMENTO ESPECÍFICO DE SST:

NR-01 - DISPOSIÇÕES GERAIS: Estabelece o Gerenciamento de Riscos Ocupacionais (GRO), Programa de Gerenciamento de Riscos (PGR), inventário de riscos e análise preliminar.

NR-04 - SESMT: Serviços Especializados em Engenharia de Segurança e Medicina do Trabalho. Dimensionamento baseado no grau de risco e número de empregados.

NR-05 - CIPA: Comissão Interna de Prevenção de Acidentes. Obrigatória conforme número de empregados e grau de risco, mandato de um ano.

NR-06 - EPI: Equipamentos de Proteção Individual devem ter CA (Certificado de Aprovação), fornecimento gratuito pelo empregador, treinamento obrigatório.

NR-12 - MÁQUINAS: Segurança em máquinas e equipamentos. Dispositivos de segurança, proteções fixas/móveis, capacitação obrigatória.

NR-35 - ALTURA: Trabalho acima de 2m. Exige Análise de Risco, Permissão de Trabalho (PT), capacitação específica, EPIs adequados.

INSTRUÇÕES:
- Base suas respostas neste conhecimento específico
- Cite as NRs relevantes quando aplicável
- Seja técnico e preciso
- Use terminologia oficial das normas brasileiras
- Se não souber algo específico, mencione que precisa consultar a norma completa`

    const geminiStart = Date.now()
    console.log(`🤖 [${new Date().toISOString()}] [API] Chamando Gemini... START GEMINI: ${geminiStart}`)
    
    // Usar a mesma sintaxe que funciona no gemini-service.ts
    const response = await genai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ 
        role: 'user', 
        parts: [{ text: `${systemPrompt}\n\nUsuário: ${prompt}` }] 
      }]
    })
    
    const responseText = response.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui processar sua pergunta.'
    
    const geminiEnd = Date.now()
    console.log(`✅ [${new Date().toISOString()}] [API] Resposta do Gemini recebida em ${geminiEnd - geminiStart}ms`)
    console.log(`📄 [${new Date().toISOString()}] [API] Conteúdo da resposta:`, responseText)
    
    if (!responseText) {
      console.log(`❌ [${new Date().toISOString()}] [API] Erro: Resposta vazia do Gemini`)
      return new Response(
        'Não foi possível gerar uma resposta',
        { 
          status: 500,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
          }
        }
      )
    }

    const sendStart = Date.now()
    console.log(`📤 [${new Date().toISOString()}] [API] Enviando resposta para cliente...`)
    
    // O useChat do Vercel AI SDK espera uma resposta em texto simples
    const finalResponse = new Response(responseText, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
    const sendEnd = Date.now()
    
    const totalTime = Date.now() - startTime
    console.log(`🏁 [${new Date().toISOString()}] [API] PROCESSO COMPLETO - Total: ${totalTime}ms | Parse: ${parseEnd - parseStart}ms | Extract: ${extractEnd - extractStart}ms | Gemini: ${geminiEnd - geminiStart}ms | Send: ${sendEnd - sendStart}ms`)
    
    return finalResponse
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