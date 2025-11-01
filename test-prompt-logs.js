// Script para testar logs detalhados do sistema de prompt
console.log('🧪 TESTE DOS LOGS DETALHADOS DO PROMPT')
console.log('======================================')

const testPromptLogs = async () => {
  try {
    console.log('\n🚀 Fazendo pergunta para a IA para ver os logs...')
    
    const response = await fetch('https://i9hubsst.vercel.app/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Qual é o seu nome e qual sua especialidade?'
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    console.log('✅ RESPOSTA RECEBIDA!')
    console.log('📄 Status:', response.status)
    
    // Ler stream da resposta
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let result = ''
    
    if (reader) {
      console.log('\n🤖 RESPOSTA DA IA:')
      console.log('-'.repeat(50))
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        process.stdout.write(chunk) // Mostrar em tempo real
      }
      
      console.log('\n' + '-'.repeat(50))
    }
    
    console.log('\n\n📋 ANÁLISE DA RESPOSTA:')
    console.log('======================')
    
    // Verificar se menciona MA.IA
    if (result.toLowerCase().includes('ma.ia') || result.toLowerCase().includes('máquina de análise')) {
      console.log('🎯 ✅ NOME MA.IA DETECTADO!')
    } else {
      console.log('❌ Nome MA.IA NÃO encontrado')
    }
    
    // Verificar se menciona SST
    if (result.toLowerCase().includes('segurança') && result.toLowerCase().includes('trabalho')) {
      console.log('🎯 ✅ ESPECIALIDADE SST DETECTADA!')
    } else {
      console.log('❌ Especialidade SST NÃO detectada claramente')
    }
    
    console.log('\n🔍 PRÓXIMOS PASSOS:')
    console.log('1. Verifique os logs do servidor (terminal do npm run dev)')
    console.log('2. Procure por linhas começando com [PROMPT DEBUG] e [CONFIG DEBUG]')
    console.log('3. Verifique se está carregando do banco ou usando fallback')
    
  } catch (error) {
    console.error('❌ ERRO NO TESTE:', error.message)
    console.log('\n🔍 VERIFICAÇÕES:')
    console.log('- O servidor está rodando? (npm run dev)')
    console.log('- O banco está conectado?')
    console.log('- Há configurações salvas na Gestão de IA?')
  }
}

// Executar teste
testPromptLogs()