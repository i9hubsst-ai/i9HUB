import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    console.log('🧪 DIRECT LOGIN TEST: Iniciando')
    console.log('🧪 DIRECT LOGIN TEST: Email:', email)
    console.log('🧪 DIRECT LOGIN TEST: Password length:', password?.length)
    
    const supabase = await createClient()
    
    // Fazer logout primeiro
    await supabase.auth.signOut()
    
    // Tentar login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    console.log('🧪 DIRECT LOGIN TEST: Resultado:', {
      hasError: !!error,
      errorMessage: error?.message,
      hasSession: !!data?.session,
      hasUser: !!data?.user
    })
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        step: 'authentication'
      })
    }
    
    if (!data?.session) {
      return NextResponse.json({
        success: false,
        error: 'Sessão não criada',
        step: 'session_creation'
      })
    }
    
    return NextResponse.json({
      success: true,
      message: 'Login bem-sucedido via API direta',
      user: {
        id: data.user?.id,
        email: data.user?.email
      },
      redirectTo: '/dashboard'
    })
    
  } catch (error) {
    console.error('🔴 DIRECT LOGIN TEST: Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}