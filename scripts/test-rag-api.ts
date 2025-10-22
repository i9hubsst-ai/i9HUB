/**
 * Script de teste para a API de busca RAG
 */

import { searchKnowledge, searchMteStandards, buildAIContext } from '@/lib/services/rag-service'

async function testRAGAPI() {
  console.log('🧪 Testando API RAG...\n')

  try {
    // Teste 1: Busca geral
    console.log('📝 Teste 1: Busca geral por "máquinas"')
    const results1 = await searchKnowledge('máquinas', {
      limit: 3,
      minSimilarity: 0.5
    })
    console.log(`   ✓ Encontrados ${results1.length} resultados`)
    if (results1.length > 0) {
      console.log(`   Exemplo: ${results1[0].content.substring(0, 100)}... (similaridade: ${(results1[0].similarity * 100).toFixed(1)}%)`)
    }
    console.log()

    // Teste 2: Busca específica de normas
    console.log('📝 Teste 2: Busca em normas MTE por "segurança"')
    const results2 = await searchMteStandards('segurança', {
      limit: 2
    })
    console.log(`   ✓ Encontrados ${results2.length} resultados de normas`)
    if (results2.length > 0) {
      console.log(`   NR: ${results2[0].metadata.nrNumber} - ${results2[0].metadata.title}`)
    }
    console.log()

    // Teste 3: Construir contexto para IA
    console.log('📝 Teste 3: Construir contexto para IA sobre "altura"')
    const context = await buildAIContext('trabalho em altura', {
      includeStandards: true,
      maxTokens: 1000
    })
    console.log(`   ✓ Contexto gerado (${context.length} caracteres)`)
    if (context.length > 0) {
      console.log(`   Prévia:\n${context.substring(0, 200)}...`)
    }
    console.log()

    console.log('✅ Todos os testes concluídos com sucesso!\n')

  } catch (error) {
    console.error('❌ Erro nos testes:', error)
    throw error
  }
}

testRAGAPI()
  .then(() => {
    console.log('🎉 Sistema RAG funcionando corretamente!')
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
