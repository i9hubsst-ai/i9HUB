import { NextRequest, NextResponse } from 'next/server'
import { validateResetToken } from '@/lib/services/custom-password-reset'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { valid: false, error: 'Token não fornecido' },
        { status: 400 }
      )
    }

    const result = await validateResetToken(token)

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Erro na validação de token:', error)
    return NextResponse.json(
      { valid: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}