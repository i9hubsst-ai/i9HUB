import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const token = requestUrl.searchParams.get('token')
  
  if (!token) {
    return NextResponse.json({
      error: 'Token não fornecido',
      usage: 'Adicione ?token=pkce_xxx na URL'
    })
  }
  
  try {
    console.log('🧪 TESTE: Testando token:', token.substring(0, 15) + '...')
    
    const supabase = await createClient()
    
    // Tentar fazer exchange do token
    const { data, error } = await supabase.auth.exchangeCodeForSession(token)
    
    return NextResponse.json({
      success: !error,
      hasSession: !!data?.session,
      hasUser: !!data?.user,
      userEmail: data?.user?.email || null,
      error: error?.message || null,
      sessionExpiresAt: data?.session?.expires_at || null,
      timestamp: new Date().toISOString(),
      tokenUsed: token.substring(0, 15) + '...'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}