import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Apenas administradores podem acessar esta rota' },
        { status: 403 }
      )
    }

    // Verificar configurações de IA
    const config = {
      geminiApiKey: process.env.GEMINI_API_KEY ? 'Configurada (✓)' : 'Não configurada (✗)',
      geminiApiKeyLength: process.env.GEMINI_API_KEY?.length || 0,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'local',
    }

    return NextResponse.json(config)
  } catch (error) {
    console.error('Erro ao verificar configuração:', error)
    return NextResponse.json(
      { error: 'Erro ao verificar configuração' },
      { status: 500 }
    )
  }
}
