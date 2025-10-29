import { NextResponse } from 'next/server'

// Store para logs temporários (em produção seria um banco/cache)
let logStore: string[] = []

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const action = requestUrl.searchParams.get('action') || 'view'
  
  if (action === 'clear') {
    logStore = []
    console.log('🟥 LOG MONITOR: Logs limpos')
    return NextResponse.json({ message: 'Logs limpos', logs: [] })
  }
  
  if (action === 'test') {
    const testLog = `🧪 TEST LOG: ${new Date().toISOString()} - Teste de monitoramento`
    logStore.push(testLog)
    console.log(testLog)
    return NextResponse.json({ message: 'Log de teste adicionado', logs: logStore })
  }
  
  return NextResponse.json({ 
    logs: logStore,
    count: logStore.length,
    lastUpdate: new Date().toISOString(),
    instructions: [
      'Para limpar: ?action=clear',
      'Para testar: ?action=test',
      'Para ver: ?action=view (padrão)'
    ]
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const logMessage = `📝 ${new Date().toISOString()}: ${body.message || 'Log recebido'}`
    
    logStore.push(logMessage)
    console.log('🟥 LOG MONITOR:', logMessage)
    
    // Manter apenas os últimos 50 logs
    if (logStore.length > 50) {
      logStore = logStore.slice(-50)
    }
    
    return NextResponse.json({ success: true, message: 'Log adicionado' })
  } catch (error) {
    console.error('🔴 LOG MONITOR ERROR:', error)
    return NextResponse.json({ error: 'Erro ao processar log' }, { status: 500 })
  }
}