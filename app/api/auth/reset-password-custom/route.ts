import { NextRequest, NextResponse } from 'next/server'
import { resetPasswordWithToken } from '@/lib/services/custom-password-reset'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: 'Token e senha são obrigatórios' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    const result = await resetPasswordWithToken(token, password)

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Erro no reset de senha:', error)
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}