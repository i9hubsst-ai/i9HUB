import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  
  // Simular a URL que o Supabase está enviando
  const supabaseUrl = "https://zgnzobnearxgakhvxxyp.supabase.co/auth/v1/verify?token=pkce_43d89c6b113240a219817ffab9ed96926b69ecf8c1547cda29557e55&type=recovery&redirect_to=https://i9hubsst-i9hubssts-projects.vercel.app/"
  
  // Análise dos parâmetros
  const url = new URL(supabaseUrl)
  const token = url.searchParams.get('token')
  const type = url.searchParams.get('type')
  const redirect_to = url.searchParams.get('redirect_to')
  
  return NextResponse.json({
    message: "Análise do link do Supabase",
    supabaseUrl,
    params: {
      token: token ? `${token.substring(0, 15)}...` : null,
      type,
      redirect_to
    },
    problem: "Supabase está enviando token PKCE, não access_token/refresh_token",
    solution: "Precisamos processar token PKCE via exchangeCodeForSession",
    nextSteps: [
      "1. Detectar parâmetro 'token' em vez de 'access_token'",
      "2. Usar exchangeCodeForSession para converter token em sessão",
      "3. Atualizar RecoveryRedirect para lidar com tokens PKCE"
    ]
  })
}