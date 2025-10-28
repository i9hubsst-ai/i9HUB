import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('🔵 AUTH CALLBACK: Iniciando processamento')
  console.log('🔵 Request URL:', request.url)
  
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next')
  const token = requestUrl.searchParams.get('token')
  const access_token = requestUrl.searchParams.get('access_token')
  const refresh_token = requestUrl.searchParams.get('refresh_token')
  
  console.log('🔵 Parâmetros recebidos:', { 
    code: code ? `${code.substring(0, 8)}...` : null,
    token: token ? `${token.substring(0, 8)}...` : null,
    access_token: access_token ? `${access_token.substring(0, 8)}...` : null,
    refresh_token: refresh_token ? `${refresh_token.substring(0, 8)}...` : null,
    type, 
    next,
    fullUrl: request.url
  })

  // Se for recuperação de senha
  if (type === 'recovery') {
    console.log('🟡 RECOVERY: Processando recuperação de senha')
    
    // Verificar se temos tokens diretos (acesso via link do Supabase)
    if (access_token && refresh_token) {
      console.log('🟡 RECOVERY: Tokens diretos detectados, estabelecendo sessão')
      
      const supabase = await createClient()
      
      try {
        // Estabelecer sessão com tokens diretos
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token
        })
        
        console.log('🟡 RECOVERY: Resultado setSession:', { 
          hasSession: !!data?.session, 
          hasUser: !!data?.user,
          error: error?.message
        })
        
        if (!error && data.session) {
          console.log('🟢 RECOVERY: Sessão estabelecida com tokens diretos')
          const redirectUrl = next || '/auth/reset-password'
          console.log('🟢 RECOVERY: Redirecionando para:', redirectUrl)
          
          return NextResponse.redirect(
            new URL(redirectUrl, requestUrl.origin)
          )
        } else {
          console.log('🔴 RECOVERY: Erro ao estabelecer sessão com tokens diretos:', error?.message)
        }
      } catch (error) {
        console.error('🔴 RECOVERY: Exception ao estabelecer sessão:', error)
      }
    }
    
    if (!code && !access_token) {
      console.log('🔴 RECOVERY: Nem código nem tokens fornecidos')
      return NextResponse.redirect(
        new URL('/auth/forgot-password?error=codigo-invalido', requestUrl.origin)
      )
    }
    
    if (code) {
      const supabase = await createClient()
      
      try {
        console.log('🟡 RECOVERY: Tentando exchange code for session...')
        // Processa o código de recuperação
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        
        console.log('🟡 RECOVERY: Resultado exchange:', { 
          hasSession: !!data?.session, 
          hasUser: !!data?.user,
          error: error?.message,
          sessionExpiresAt: data?.session?.expires_at
        })
        
        if (!error && data.session) {
          console.log('🟢 RECOVERY: Sessão de recuperação criada com sucesso')
          console.log('🟢 RECOVERY: User ID:', data.user?.id)
          
          // Redireciona para a página de reset
          const redirectUrl = next || '/auth/reset-password'
          console.log('🟢 RECOVERY: Redirecionando para:', redirectUrl)
          
          return NextResponse.redirect(
            new URL(redirectUrl, requestUrl.origin)
          )
        } else {
          console.log('🔴 RECOVERY: Erro no exchange:', error?.message)
        }
      } catch (error) {
        console.error('🔴 RECOVERY: Exception:', error)
      }
    }
    
    // Se houver erro, redireciona para a página de erro
    console.log('🔴 RECOVERY: Falha, redirecionando para forgot-password')
    return NextResponse.redirect(
      new URL('/auth/forgot-password?error=token-expirado', requestUrl.origin)
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
