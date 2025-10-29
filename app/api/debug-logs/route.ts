import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const testType = requestUrl.searchParams.get('test') || 'callback'
  
  console.log('🟥 DEBUG LOGS: Teste iniciado')
  console.log('🟥 DEBUG LOGS: Timestamp:', new Date().toISOString())
  console.log('🟥 DEBUG LOGS: Test type:', testType)
  console.log('🟥 DEBUG LOGS: URL:', request.url)
  console.log('🟥 DEBUG LOGS: Headers:', Object.fromEntries(request.headers.entries()))
  
  if (testType === 'callback') {
    // Simular logs do callback
    console.log('🔵 AUTH CALLBACK: Iniciando processamento (TESTE)')
    console.log('🟡 RECOVERY: Processando recuperação de senha (TESTE)')
    console.log('🟢 RECOVERY: Sessão estabelecida com sucesso (TESTE)')
  } else if (testType === 'login') {
    // Simular logs da página de login
    console.log('🟣 LOGIN: useEffect executado (TESTE)')
    console.log('🟢 LOGIN: Modo recovery ativado pelo callback (TESTE)')
  }
  
  return NextResponse.json({
    message: 'Debug logs enviados para console do servidor',
    timestamp: new Date().toISOString(),
    testType,
    instructions: [
      '1. Verifique os logs do Vercel em: https://vercel.com/i9hubsst-ai/i9hub/functions',
      '2. Ou use Vercel CLI: vercel logs --app=i9hub',
      '3. Os logs aparecem com emojis 🔵🟡🟢🟣 para facilitar identificação'
    ]
  })
}