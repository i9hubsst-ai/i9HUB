import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const email = requestUrl.searchParams.get('email') || 'teste@teste.com'
  
  try {
    const supabase = await createClient()
    
    // Testar o envio de reset
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://i9hubsst.vercel.app/auth/callback?type=recovery&next=/auth/reset-password',
    })
    
    return NextResponse.json({
      success: !error,
      error: error?.message || null,
      data: data || null,
      timestamp: new Date().toISOString(),
      testEmail: email,
      redirectUrl: 'https://i9hubsst.vercel.app/auth/callback?type=recovery&next=/auth/reset-password'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}