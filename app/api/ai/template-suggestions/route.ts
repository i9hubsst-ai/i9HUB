import { NextResponse } from 'next/server'
import { aiService } from '@/lib/services/ai-service'

export async function POST(request: Request) {
  try {
    const { prompt, context } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'O prompt é obrigatório' },
        { status: 400 }
      )
    }

    console.log('🎯 [Template Suggestions] Gerando com RAG e gemini-2.5-flash')
    const suggestions = await aiService.generateTemplateSuggestions(prompt, context)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    )
  }
}