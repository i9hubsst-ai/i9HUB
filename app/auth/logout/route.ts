import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Fazer logout no Supabase
    await supabase.auth.signOut()
    
    // Limpar cache
    revalidatePath('/', 'layout')
    
    // Redirecionar para a página de login
    const response = NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
    
    // Limpar cookies de autenticação
    response.cookies.delete('sb-access-token')
    response.cookies.delete('sb-refresh-token')
    
    return response
  } catch (error) {
    console.error('Erro no logout:', error)
    return NextResponse.redirect(new URL('/auth/login', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
  }
}

export async function POST() {
  return GET()
}