// Teste rápido do Mistral Nemo
const testMistral = async () => {
  try {
    console.log('🚀 Testando Mistral Nemo...')
    const start = Date.now()
    
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'mistral-nemo',
        prompt: 'Explique brevemente o que é a NR-12 em segurança do trabalho.',
        stream: false
      })
    })
    
    const data = await response.json()
    const end = Date.now()
    
    console.log(`⏱️  Tempo: ${end - start}ms`)
    console.log(`📝 Resposta: ${data.response.substring(0, 200)}...`)
    console.log(`✅ Sucesso!`)
  } catch (error) {
    console.error('❌ Erro:', error.message)
  }
}

testMistral()