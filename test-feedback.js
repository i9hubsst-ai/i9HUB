// Script para testar API de feedback
const testFeedbackAPI = async () => {
  console.log('🧪 [TEST] Iniciando testes da API de feedback...')

  try {
    // Teste 1: GET - Buscar estatísticas (deve retornar vazio no início)
    console.log('\n📊 [TEST] Testando GET /api/ai/feedback...')
    const statsResponse = await fetch('http://localhost:3000/api/ai/feedback')
    const stats = await statsResponse.json()
    console.log('✅ [TEST] Estatísticas recebidas:', stats)

    // Teste 2: POST - Enviar feedback positivo
    console.log('\n👍 [TEST] Testando POST feedback positivo...')
    const positiveFeedback = {
      messageId: `test_${Date.now()}_1`,
      userQuery: 'O que é NR-12?',
      aiResponse: 'A NR-12 é a Norma Regulamentadora que trata da segurança no trabalho em máquinas e equipamentos.',
      feedback: 'positive',
      timestamp: new Date().toISOString()
    }

    const positiveResponse = await fetch('http://localhost:3000/api/ai/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(positiveFeedback)
    })
    const positiveResult = await positiveResponse.json()
    console.log('✅ [TEST] Feedback positivo enviado:', positiveResult)

    // Teste 3: POST - Enviar feedback negativo
    console.log('\n👎 [TEST] Testando POST feedback negativo...')
    const negativeFeedback = {
      messageId: `test_${Date.now()}_2`,
      userQuery: 'Qual é a cor do céu?',
      aiResponse: 'O céu é verde como a grama.',
      feedback: 'negative',
      timestamp: new Date().toISOString()
    }

    const negativeResponse = await fetch('http://localhost:3000/api/ai/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(negativeFeedback)
    })
    const negativeResult = await negativeResponse.json()
    console.log('✅ [TEST] Feedback negativo enviado:', negativeResult)

    // Teste 4: GET - Verificar estatísticas atualizadas
    console.log('\n📊 [TEST] Verificando estatísticas atualizadas...')
    const updatedStatsResponse = await fetch('http://localhost:3000/api/ai/feedback')
    const updatedStats = await updatedStatsResponse.json()
    console.log('✅ [TEST] Estatísticas atualizadas:', updatedStats)

    console.log('\n🎉 [TEST] Todos os testes concluídos com sucesso!')

  } catch (error) {
    console.error('❌ [TEST] Erro durante os testes:', error)
  }
}

// Executar testes
testFeedbackAPI()