import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = await createClient()
    
    // Verificar sessão atual
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    console.log('🔍 USER STATUS: Verificando status do usuário')
    console.log('🔍 USER STATUS: Sessão atual:', {
      hasSession: !!session,
      userId: session?.user?.id,
      email: session?.user?.email,
      lastSignIn: session?.user?.last_sign_in_at,
      updatedAt: session?.user?.updated_at,
      sessionError: sessionError?.message
    })
    
    const userInfo = session?.user ? {
      id: session.user.id,
      email: session.user.email,
      emailConfirmed: session.user.email_confirmed_at,
      lastSignIn: session.user.last_sign_in_at,
      updatedAt: session.user.updated_at,
      createdAt: session.user.created_at,
      userMetadata: session.user.user_metadata,
      appMetadata: session.user.app_metadata
    } : null
    
    return NextResponse.json({
      hasActiveSession: !!session,
      sessionError: sessionError?.message || null,
      user: userInfo,
      timestamp: new Date().toISOString(),
      instructions: [
        'Se updatedAt é recente, a senha provavelmente foi atualizada',
        'Teste fazendo login com a nova senha em aba privada',
        'Verifique também no Dashboard do Supabase → Authentication → Users'
      ]
    })
    
  } catch (error) {
    console.error('🔴 USER STATUS ERROR:', error)
    return NextResponse.json({ 
      error: 'Erro ao verificar status do usuário',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 })
  }
}