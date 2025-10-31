const fetch = require('node-fetch');

async function testChatCommands() {
  console.log('🧪 TESTANDO COMANDOS NO CHAT API')
  console.log('=================================\n')
  
  const baseUrl = 'http://localhost:3000'
  
  try {
    // 1. Teste comando /ajuda
    console.log('1️⃣ Testando comando /ajuda...')
    const helpResponse = await fetch(`${baseUrl}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: '/ajuda' }
        ]
      })
    })
    
    if (helpResponse.ok) {
      const helpText = await helpResponse.text()
      console.log('✅ Resposta do /ajuda:')
      console.log(helpText)
    } else {
      console.log('❌ Erro ao testar /ajuda:', helpResponse.status, helpResponse.statusText)
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // 2. Teste comando /ver
    console.log('2️⃣ Testando comando /ver...')
    const viewResponse = await fetch(`${baseUrl}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: '/ver' }
        ]
      })
    })
    
    if (viewResponse.ok) {
      const viewText = await viewResponse.text()
      console.log('✅ Resposta do /ver:')
      console.log(viewText)
    } else {
      console.log('❌ Erro ao testar /ver:', viewResponse.status, viewResponse.statusText)
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // 3. Teste comando /aprender
    console.log('3️⃣ Testando comando /aprender...')
    const learnResponse = await fetch(`${baseUrl}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: '/aprender Sempre inclua custos estimados nas sugestões de SST' }
        ]
      })
    })
    
    if (learnResponse.ok) {
      const learnText = await learnResponse.text()
      console.log('✅ Resposta do /aprender:')
      console.log(learnText)
    } else {
      console.log('❌ Erro ao testar /aprender:', learnResponse.status, learnResponse.statusText)
    }
    
    console.log('\n' + '='.repeat(50) + '\n')
    
    // 4. Verificar se a instrução foi salva
    console.log('4️⃣ Verificando se instrução foi salva (/ver novamente)...')
    const verifyResponse = await fetch(`${baseUrl}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: '/ver' }
        ]
      })
    })
    
    if (verifyResponse.ok) {
      const verifyText = await verifyResponse.text()
      console.log('✅ Prompt após /aprender:')
      console.log(verifyText)
    } else {
      console.log('❌ Erro ao verificar prompt:', verifyResponse.status, verifyResponse.statusText)
    }
    
  } catch (error) {
    console.error('❌ ERRO nos testes da API:', error.message)
    console.log('\n💡 DICA: Certifique-se de que o servidor está rodando em localhost:3000')
    console.log('Execute: npm run dev')
  }
}

// Executar testes
testChatCommands()