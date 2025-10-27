import { type NextRequest, NextResponse } from 'next/server'

const systemPrompt = `Você é um assistente especialista em Segurança e Saúde do Trabalho.
Sua função é ajudar com:
- Interpretação de normas regulamentadoras
- Identificação de riscos e perigos
- Sugestões de medidas preventivas
- Elaboração de planos de ação
- Análise de conformidade

Use sempre uma linguagem profissional e técnica, mas clara.
Cite as normas e regulamentos relevantes.
Base suas respostas no conhecimento técnico e melhores práticas de SST.`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()
    console.log('📋 [AI-ROUTE] Mensagens recebidas:', messages?.length || 0)

    // Resposta simplificada para teste
    const response = {
      success: true,
      message: 'Endpoint AI funcionando corretamente',
      messagesReceived: messages?.length || 0,
      systemPrompt: systemPrompt.substring(0, 50) + '...'
    }
    
    console.log('✅ [AI-ROUTE] Enviando resposta de teste')
    return NextResponse.json(response)

  } catch (error) {
    console.error('❌ [AI-ROUTE] Erro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}