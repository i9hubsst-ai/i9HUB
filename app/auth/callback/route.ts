import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('🔵 AUTH CALLBACK: Iniciando processamento')
  console.log('🔵 Request URL:', request.url)
  
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next')
  
  console.log('🔵 Parâmetros:', { code: !!code, type, next })

  // Se for recuperação de senha
  if (type === 'recovery') {
    console.log('🟡 Processando recuperação de senha')
    const supabase = await createClient()
    
    try {
      console.log('🟡 Tentando exchange code for session...')
      // Processa o código de recuperação
      const { data, error } = await supabase.auth.exchangeCodeForSession(code || '')
      
      console.log('🟡 Resultado exchange:', { 
        hasSession: !!data?.session, 
        error: error?.message 
      })
      
      if (!error && data.session) {
        console.log('🟢 Sessão de recuperação criada:', !!data.session)
        
        // Redireciona para a página de reset com o token na URL
        const redirectUrl = `/auth/reset-password?token=${data.session.access_token}`
        console.log('🟢 Redirecionando para:', redirectUrl)
        return NextResponse.redirect(
          new URL(redirectUrl, requestUrl.origin)
        )
      }
    } catch (error) {
      console.error('🔴 Error verifying OTP:', error)
    }
    
    // Se houver erro, redireciona para a página de erro
    console.log('🔴 Redirecionando para erro de token inválido')
    return NextResponse.redirect(
      new URL('/auth/forgot-password?error=TokenInvalido', requestUrl.origin)
    )
  }

  // Para outros casos (login normal, signup)
  if (code) {
    console.log('🟡 Processando login/signup normal')
    const supabase = await createClient()
    
    try {
      console.log('🟡 Tentando exchange code for session...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      console.log('🟡 Resultado exchange:', { 
        hasSession: !!data?.session, 
        error: error?.message 
      })
      
      if (!error && data.session) {
        const redirectTo = next ?? '/dashboard'
        console.log('🟢 Login bem-sucedido, redirecionando para:', redirectTo)
        return NextResponse.redirect(new URL(redirectTo, requestUrl.origin))
      } else {
        console.log('🔴 Erro no exchange ou sessão inválida')
      }
    } catch (error) {
      console.error('🔴 Erro no processamento do código:', error)
    }
  } else {
    console.log('🔴 Nenhum código fornecido')
  }

  console.log('🔴 Redirecionando para login com erro')
  return NextResponse.redirect(new URL('/auth/login?error=confirmation_failed', requestUrl.origin))
}
