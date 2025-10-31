// Teste específico para verificar se o prompt personalizado está sendo aplicado
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testPromptSystem() {
  console.log('🧪 TESTANDO SISTEMA DE PROMPT PERSONALIZADO')
  console.log('==========================================\n')
  
  try {
    // 1. Verificar configurações existentes
    console.log('1️⃣ Verificando configurações na tabela ai_configurations...')
    const allConfigs = await prisma.aIConfiguration.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`📊 Total de configurações: ${allConfigs.length}`)
    allConfigs.forEach((config, index) => {
      console.log(`   ${index + 1}. ID: ${config.id}`)
      console.log(`      Ativa: ${config.isActive}`)
      console.log(`      Prompt: "${config.systemPrompt}"`)
      console.log(`      Criada: ${config.createdAt}`)
      console.log(`      Atualizada: ${config.updatedAt}`)
      console.log('')
    })
    
    // 2. Verificar configuração ativa especificamente
    console.log('2️⃣ Buscando configuração ATIVA...')
    const activeConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true },
      select: { 
        id: true,
        systemPrompt: true,
        isActive: true,
        createdAt: true,
        updatedAt: true 
      }
    })
    
    if (activeConfig) {
      console.log('✅ Configuração ativa encontrada:')
      console.log(`   ID: ${activeConfig.id}`)
      console.log(`   Prompt: "${activeConfig.systemPrompt}"`)
      console.log(`   Criada: ${activeConfig.createdAt}`)
      console.log(`   Atualizada: ${activeConfig.updatedAt}`)
    } else {
      console.log('❌ PROBLEMA: Nenhuma configuração ativa encontrada!')
      console.log('💡 Isso explica por que as instruções não aparecem')
    }
    
    // 3. Testar a função que simula getSystemPromptFromConfig
    console.log('\n3️⃣ Simulando busca de prompt personalizado...')
    const customPrompt = activeConfig?.systemPrompt || null
    
    if (customPrompt && customPrompt.trim()) {
      console.log('✅ Prompt personalizado encontrado:')
      console.log(`"${customPrompt}"`)
    } else {
      console.log('❌ Nenhum prompt personalizado ativo')
    }
    
    // 4. Criar uma configuração de teste se não existir
    if (!activeConfig) {
      console.log('\n4️⃣ Criando configuração de teste...')
      const testConfig = await prisma.aIConfiguration.create({
        data: {
          systemPrompt: "- Sempre mencione custos estimados em análises de SST\n- Priorize soluções para pequenas empresas",
          temperature: 0.7,
          maxTokens: 2000,
          isActive: true,
          updatedBy: 'test-system'
        }
      })
      
      console.log('✅ Configuração de teste criada:')
      console.log(`   ID: ${testConfig.id}`)
      console.log(`   Prompt: "${testConfig.systemPrompt}"`)
    }
    
    // 5. Verificar novamente após criação
    console.log('\n5️⃣ Verificação final...')
    const finalConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    if (finalConfig) {
      console.log('✅ Configuração ativa final:')
      console.log(`   Prompt: "${finalConfig.systemPrompt}"`)
    }
    
  } catch (error) {
    console.error('❌ ERRO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testPromptSystem()