// Script para testar se a IA funciona mesmo com problemas de conexão
console.log('🧪 TESTE DE FALLBACK OFFLINE')
console.log('===========================')

const testFallback = async () => {
  try {
    console.log('\n🚀 Testando chat AI com configuração de fallback...')
    
    const response = await fetch('http://localhost:3000/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Olá! Qual é o seu nome? Você pode me ajudar com segurança do trabalho?'
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    console.log('✅ RESPOSTA RECEBIDA!')
    console.log('📄 Status:', response.status)
    console.log('📋 Headers:', Object.fromEntries(response.headers.entries()))
    
    // Ler stream da resposta
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let result = ''
    
    if (reader) {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        process.stdout.write(chunk) // Mostrar em tempo real
      }
    }
    
    console.log('\n\n✅ TESTE CONCLUÍDO!')
    console.log('📝 Resposta completa recebida')
    
    // Verificar se menciona MA.IA
    if (result.toLowerCase().includes('ma.ia') || result.toLowerCase().includes('máquina de análise')) {
      console.log('🎯 ✅ NOME MA.IA DETECTADO NA RESPOSTA!')
    } else {
      console.log('❌ Nome MA.IA não encontrado na resposta')
    }
    
  } catch (error) {
    console.error('❌ ERRO NO TESTE:', error.message)
    console.log('\n🔍 DIAGNÓSTICO:')
    console.log('- Verifique se o servidor está rodando (npm run dev)')
    console.log('- Confirme se o endpoint /api/ai/chat está funcionando')
    console.log('- O sistema de fallback deve funcionar mesmo com banco offline')
  }
}

// Executar teste
testFallback()