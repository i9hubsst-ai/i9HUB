import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const testToken = requestUrl.searchParams.get('token')
  const newPassword = requestUrl.searchParams.get('password') || 'admin123'
  
  if (!testToken) {
    return NextResponse.json({ 
      error: 'Token é obrigatório. Use: ?token=SEU_TOKEN&password=admin123' 
    })
  }
  
  console.log('🧪 TEST RECOVERY: Iniciando teste de recovery')
  console.log('🧪 TEST RECOVERY: Token:', testToken.substring(0, 20) + '...')
  console.log('🧪 TEST RECOVERY: Nova senha:', newPassword)
  
  try {
    const supabase = await createClient()
    
    // Passo 1: Tentar fazer exchange do token PKCE
    console.log('🧪 STEP 1: Fazendo exchange do token PKCE...')
    const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(testToken)
    
    if (exchangeError) {
      console.log('🔴 TEST RECOVERY: Erro no exchange:', exchangeError)
      return NextResponse.json({
        step: 1,
        success: false,
        error: exchangeError.message,
        details: 'Falha ao fazer exchange do token PKCE'
      })
    }
    
    if (!sessionData.session) {
      console.log('🔴 TEST RECOVERY: Nenhuma sessão criada')
      return NextResponse.json({
        step: 1,
        success: false,
        error: 'Nenhuma sessão criada no exchange'
      })
    }
    
    console.log('🟢 STEP 1: Exchange bem-sucedido!')
    console.log('🟢 STEP 1: User ID:', sessionData.user?.id)
    console.log('🟢 STEP 1: Email:', sessionData.user?.email)
    
    // Passo 2: Tentar atualizar a senha
    console.log('🧪 STEP 2: Atualizando senha...')
    const { data: updateData, error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    })
    
    if (updateError) {
      console.log('🔴 TEST RECOVERY: Erro ao atualizar senha:', updateError)
      return NextResponse.json({
        step: 2,
        success: false,
        error: updateError.message,
        sessionInfo: {
          userId: sessionData.user?.id,
          email: sessionData.user?.email
        }
      })
    }
    
    console.log('🟢 STEP 2: Senha atualizada com sucesso!')
    console.log('🟢 STEP 2: Updated at:', updateData.user?.updated_at)
    
    // Passo 3: Testar login com nova senha
    console.log('🧪 STEP 3: Testando login com nova senha...')
    
    // Fazer logout primeiro
    await supabase.auth.signOut()
    
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: sessionData.user?.email || '',
      password: newPassword
    })
    
    if (loginError) {
      console.log('🔴 TEST RECOVERY: Erro no login:', loginError)
      return NextResponse.json({
        step: 3,
        success: false,
        error: loginError.message,
        passwordUpdateSuccess: true,
        updatedAt: updateData.user?.updated_at
      })
    }
    
    console.log('🟢 STEP 3: Login com nova senha bem-sucedido!')
    
    return NextResponse.json({
      success: true,
      message: 'Fluxo completo de recovery testado com sucesso!',
      steps: {
        tokenExchange: '✅ Sucesso',
        passwordUpdate: '✅ Sucesso', 
        loginTest: '✅ Sucesso'
      },
      userInfo: {
        id: sessionData.user?.id,
        email: sessionData.user?.email,
        updatedAt: updateData.user?.updated_at
      },
      newPassword: newPassword
    })
    
  } catch (error) {
    console.error('🔴 TEST RECOVERY: Exception:', error)
    return NextResponse.json({
      success: false,
      error: 'Erro interno',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}