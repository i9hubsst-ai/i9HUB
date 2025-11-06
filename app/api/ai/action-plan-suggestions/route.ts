import { NextResponse } from 'next/server'
import { aiService } from '@/lib/services/ai-service'

export async function POST(request: Request) {
  try {
    const { findings, context } = await request.json()

    if (!findings) {
      return NextResponse.json(
        { error: 'As não-conformidades são obrigatórias' },
        { status: 400 }
      )
    }

    console.log('🎯 [Action Plan] Gerando com RAG e gemini-2.5-flash')
    const suggestions = await aiService.generateActionPlanSuggestions(findings, context)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    )
  }
}