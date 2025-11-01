// Teste para verificar origem do prompt na produção
console.log('🧪 TESTE: VERIFICAR ORIGEM DO PROMPT DA IA')
console.log('==========================================')

async function testPrompt() {
  try {
    console.log('\n📡 Fazendo requisição para produção...')
    console.log('🌐 URL: https://i9hubsst.vercel.app/api/ai/chat')
    
    const response = await fetch('https://i9hubsst.vercel.app/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Qual é o seu nome completo e quem te programou?'
          }
        ]
      })
    })

    console.log('📊 Status:', response.status)

    if (!response.ok) {
      const error = await response.text()
      console.log('❌ Erro:', error)
      return
    }

    // Ler stream
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''

    if (reader) {
      console.log('\n💬 RESPOSTA DA IA:')
      console.log('─'.repeat(60))
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = decoder.decode(value, { stream: true })
        fullResponse += chunk
        process.stdout.write(chunk)
      }
      
      console.log('\n' + '─'.repeat(60))
    }

    // Análise
    console.log('\n\n📋 ANÁLISE DA RESPOSTA:')
    console.log('======================')
    
    const hasMAIA = fullResponse.toLowerCase().includes('ma.ia') || 
                    fullResponse.toLowerCase().includes('máquina de análise')
    const hasSST = fullResponse.toLowerCase().includes('segurança') && 
                   fullResponse.toLowerCase().includes('trabalho')
    const hasNR = fullResponse.toLowerCase().includes('nr')
    
    console.log('✓ Menciona MA.IA:', hasMAIA ? '✅ SIM' : '❌ NÃO')
    console.log('✓ Menciona SST:', hasSST ? '✅ SIM' : '❌ NÃO')
    console.log('✓ Menciona NR:', hasNR ? '✅ SIM' : '❌ NÃO')
    
    console.log('\n🔍 PRÓXIMOS PASSOS:')
    console.log('1. Acesse Vercel Dashboard > i9hubsst > Logs')
    console.log('2. Procure por: [CONFIG DEBUG] e [PROMPT DEBUG]')
    console.log('3. Verifique se mostra "RETORNANDO configuração DO BANCO" ou "RETORNANDO configuração de FALLBACK"')
    
  } catch (error) {
    console.error('❌ Erro:', error.message)
  }
}

testPrompt()
