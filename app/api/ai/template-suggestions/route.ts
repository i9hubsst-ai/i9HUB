import { NextResponse } from 'next/server'
import { geminiService } from '@/lib/services/gemini-service'

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const { prompt, context } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'O prompt é obrigatório' },
        { status: 400 }
      )
    }

    const suggestions = await geminiService.generateTemplateSuggestions(prompt, context)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    )
  }
}