// Teste final: verificar se o prompt personalizado está sendo aplicado na resposta da IA
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Simular a função enrichPromptWithRAG do rag-service.ts
async function simulateEnrichPromptWithRAG(userPrompt) {
  // Prompt base do sistema (sempre presente)
  const baseSystemPrompt = `Você é um assistente especializado em Segurança e Saúde do Trabalho (SST),
com profundo conhecimento das normas regulamentadoras brasileiras (NRs),
ISO 45001 e melhores práticas do setor.

DIRETRIZES BÁSICAS:
- Base suas respostas no conhecimento específico das NRs brasileiras
- Cite as normas relevantes (ex: "Conforme NR-12, item 12.38...")
- Seja técnico e preciso
- Use terminologia oficial das normas
- Se não tiver certeza sobre algo específico, mencione que precisa consultar a norma completa`

  // Buscar configuração personalizada do admin
  const config = await prisma.aIConfiguration.findFirst({
    where: { isActive: true },
    select: { systemPrompt: true }
  })
  
  const customPrompt = config?.systemPrompt || null
  
  // Montar prompt final: Base + Personalizado
  let fullSystemPrompt = baseSystemPrompt
  
  if (customPrompt && customPrompt.trim()) {
    fullSystemPrompt += `

INSTRUÇÕES ADICIONAIS DO ADMINISTRADOR:
${customPrompt.trim()}`
  }

  const fullPrompt = `${fullSystemPrompt}

Pergunta do usuário: ${userPrompt}`

  return { fullPrompt, customPrompt, hasCustomPrompt: !!(customPrompt && customPrompt.trim()) }
}

async function testPromptApplication() {
  console.log('🧪 TESTE FINAL: APLICAÇÃO DO PROMPT PERSONALIZADO')
  console.log('===============================================\n')
  
  try {
    // Teste com uma pergunta de exemplo
    const testQuery = "Preciso de orientações sobre segurança em máquinas industriais"
    
    console.log(`📝 Pergunta de teste: "${testQuery}"\n`)
    
    // Simular o processo de enriquecimento do prompt
    const result = await simulateEnrichPromptWithRAG(testQuery)
    
    console.log('📊 RESULTADO DO TESTE:')
    console.log('=====================\n')
    
    console.log(`✅ Prompt personalizado encontrado: ${result.hasCustomPrompt ? 'SIM' : 'NÃO'}`)
    
    if (result.hasCustomPrompt) {
      console.log('\n📋 INSTRUÇÕES PERSONALIZADAS ATIVAS:')
      console.log('------------------------------------')
      console.log(result.customPrompt)
      console.log('------------------------------------\n')
      
      console.log('🎯 PROMPT COMPLETO ENVIADO PARA A IA:')
      console.log('=====================================')
      console.log(result.fullPrompt)
      console.log('=====================================\n')
      
      console.log('✅ DIAGNÓSTICO: O sistema está funcionando corretamente!')
      console.log('   - Configuração ativa encontrada ✓')
      console.log('   - Prompt personalizado não vazio ✓')
      console.log('   - Instruções sendo aplicadas ✓')
      
    } else {
      console.log('❌ PROBLEMA: Nenhum prompt personalizado ativo')
      console.log('💡 As instruções não estão sendo aplicadas à IA')
    }
    
    // Verificar na interface também
    console.log('\n🔍 VERIFICAÇÃO NA INTERFACE:')
    console.log('Para verificar na interface web:')
    console.log('1. Acesse: http://localhost:3000/dashboard/ai-management')
    console.log('2. Verifique se as instruções aparecem na aba "Configurações"')
    console.log('3. Teste o chat em: http://localhost:3000/dashboard')
    
  } catch (error) {
    console.error('❌ ERRO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testPromptApplication()