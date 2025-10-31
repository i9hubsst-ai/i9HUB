// Teste real da API: fazer pergunta sobre o nome para verificar se MA.IA responde
const fetch = require('node-fetch');

async function testMAIANameInChat() {
  console.log('🤖 TESTE REAL: PERGUNTANDO O NOME PARA A IA')
  console.log('===========================================\n')
  
  const baseUrl = 'http://localhost:3000'
  
  try {
    console.log('📞 Fazendo pergunta para a IA: "Qual é o seu nome?"...\n')
    
    const response = await fetch(`${baseUrl}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Qual é o seu nome?' }
        ]
      })
    })
    
    if (response.ok) {
      console.log('✅ Resposta recebida com sucesso!')
      console.log('📄 Status:', response.status)
      
      // Como é um stream, vamos ler o texto
      const responseText = await response.text()
      
      console.log('\n🤖 RESPOSTA DA IA:')
      console.log('=' * 40)
      console.log(responseText)
      console.log('=' * 40)
      
      // Verificar se a resposta contém "MA.IA"
      if (responseText.includes('MA.IA') || responseText.includes('ma.ia') || responseText.includes('Maia')) {
        console.log('\n✅ SUCESSO! A IA mencionou o nome MA.IA na resposta!')
        console.log('🎯 O sistema de prompt personalizado está funcionando perfeitamente!')
      } else {
        console.log('\n❌ PROBLEMA: A IA não mencionou o nome MA.IA')
        console.log('💡 Possíveis causas:')
        console.log('   1. A instrução pode não estar sendo aplicada')
        console.log('   2. A IA pode estar ignorando a instrução')
        console.log('   3. Pode haver um problema no prompt final')
      }
      
      // Verificar se menciona SST (para confirmar que o prompt base também funciona)
      if (responseText.toLowerCase().includes('sst') || 
          responseText.toLowerCase().includes('segurança') || 
          responseText.toLowerCase().includes('trabalho')) {
        console.log('✅ BONUS: A IA também manteve o contexto de SST!')
      }
      
    } else {
      console.log('❌ Erro na requisição:', response.status, response.statusText)
      const errorText = await response.text()
      console.log('Detalhes do erro:', errorText)
    }
    
  } catch (error) {
    console.error('❌ ERRO na requisição:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 SOLUÇÃO: O servidor não está rodando!')
      console.log('Execute: npm run dev')
      console.log('Então execute este teste novamente.')
    }
  }
}

// Pequena pausa para garantir que o servidor está pronto, depois executa
console.log('⏱️ Aguardando 2 segundos para garantir que o servidor está pronto...')
setTimeout(testMAIANameInChat, 2000)