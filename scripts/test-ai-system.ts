// import { KnowledgeBaseService } from '@/lib/services/knowledge-base-service' // Temporariamente desabilitado
import { LlamaService } from '@/lib/services/llama-service'

async function runTests() {
  console.log('🧪 Iniciando testes do sistema de IA...\n')

  try {
    // Teste 1: Sugestão de template NR-12
    console.log('📋 Teste 1: Gerando sugestão de template NR-12')
    const llama = new LlamaService()
    const result1 = await llama.generateTemplateSuggestions(
      'Preciso de um template para avaliar proteções de máquinas injetoras de plástico',
      'Indústria de plásticos com 5 injetoras de médio porte'
    )
    console.log('\nResposta:', result1)
    console.log('\n-------------------------------------------\n')

    // Teste 2: Plano de ação para não-conformidade
    console.log('🎯 Teste 2: Gerando plano de ação')
    const result2 = await llama.generateActionPlanSuggestions(
      'Foi identificado que as proteções móveis não possuem intertravamento e os operadores desativam as proteções durante a operação',
      'Máquina: Injetora de plástico 250t'
    )
    console.log('\nResposta:', result2)
    console.log('\n-------------------------------------------\n')

    // Teste 3: Chat especializado
    console.log('💬 Teste 3: Testando chat especializado')
    const response = await llama.generate(
      'Quais são os principais requisitos de segurança para prensas hidráulicas segundo a NR-12?'
    )
    console.log('\nResposta:', response)
    
  } catch (error) {
    console.error('❌ Erro durante os testes:', error)
  }
}

runTests()