import { NextResponse } from 'next/server'
import { geminiService } from '@/lib/services/gemini-service'

// Configurações Vercel
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { findings, context } = await request.json()

    if (!findings) {
      return NextResponse.json(
        { error: 'As não-conformidades são obrigatórias' },
        { status: 400 }
      )
    }

    const suggestions = await geminiService.generateActionPlanSuggestions(findings, context)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Erro ao gerar sugestões:', error)
    return NextResponse.json(
      { error: 'Erro ao processar a requisição' },
      { status: 500 }
    )
  }
}