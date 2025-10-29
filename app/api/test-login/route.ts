import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const email = requestUrl.searchParams.get('email') || 'i9.hubsst@gmail.com'
  const password = requestUrl.searchParams.get('password') || 'admin123'
  
  console.log('🧪 LOGIN TEST: Testando credenciais')
  console.log('🧪 LOGIN TEST: Email:', email)
  console.log('🧪 LOGIN TEST: Password length:', password.length)
  
  try {
    const supabase = await createClient()
    
    // Primeiro, fazer logout completo
    console.log('🧪 STEP 1: Fazendo logout completo...')
    await supabase.auth.signOut()
    
    // Verificar se não há sessão ativa
    const { data: { session: beforeSession } } = await supabase.auth.getSession()
    console.log('🧪 STEP 1: Sessão antes do teste:', !!beforeSession)
    
    // Tentar fazer login
    console.log('🧪 STEP 2: Tentando login...')
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    console.log('🧪 LOGIN TEST: Resultado detalhado:', {
      hasError: !!loginError,
      errorMessage: loginError?.message,
      errorStatus: loginError?.status,
      hasSession: !!loginData?.session,
      hasUser: !!loginData?.user,
      userId: loginData?.user?.id,
      userEmail: loginData?.user?.email,
      lastSignIn: loginData?.user?.last_sign_in_at,
      updatedAt: loginData?.user?.updated_at
    })
    
    if (loginError) {
      return NextResponse.json({
        success: false,
        step: 'login_attempt',
        error: loginError.message,
        errorCode: loginError.status,
        details: 'Falha na autenticação - senha pode não ter sido atualizada',
        testCredentials: {
          email,
          passwordLength: password.length,
          passwordPreview: password.substring(0, 3) + '***'
        }
      })
    }
    
    if (!loginData?.session) {
      return NextResponse.json({
        success: false,
        step: 'session_creation',
        error: 'Nenhuma sessão criada apesar de não haver erro',
        testCredentials: {
          email,
          passwordLength: password.length
        }
      })
    }
    
    console.log('🟢 LOGIN TEST: Login bem-sucedido!')
    
    // Fazer logout após teste
    await supabase.auth.signOut()
    
    return NextResponse.json({
      success: true,
      message: 'Login foi bem-sucedido! A senha está correta.',
      userInfo: {
        id: loginData.user?.id,
        email: loginData.user?.email,
        lastSignIn: loginData.user?.last_sign_in_at,
        updatedAt: loginData.user?.updated_at
      },
      testCredentials: {
        email,
        passwordLength: password.length,
        passwordPreview: password.substring(0, 3) + '***'
      }
    })
    
  } catch (error) {
    console.error('🔴 LOGIN TEST: Exception:', error)
    return NextResponse.json({
      success: false,
      step: 'exception',
      error: 'Erro interno',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
      testCredentials: {
        email,
        passwordLength: password.length
      }
    }, { status: 500 })
  }
}