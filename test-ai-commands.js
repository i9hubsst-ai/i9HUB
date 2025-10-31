const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testAICommands() {
  console.log('🧪 TESTANDO SISTEMA DE COMANDOS DA IA')
  console.log('=====================================\n')
  
  try {
    // 1. Verificar configurações existentes
    console.log('1️⃣ Verificando configurações existentes...')
    const existingConfigs = await prisma.aIConfiguration.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })
    
    console.log(`📊 Encontradas ${existingConfigs.length} configurações:`)
    existingConfigs.forEach((config, index) => {
      console.log(`   ${index + 1}. ID: ${config.id}`)
      console.log(`      Ativa: ${config.isActive}`)
      console.log(`      Prompt: ${config.systemPrompt ? config.systemPrompt.substring(0, 100) + '...' : 'Vazio'}`)
      console.log(`      Criada: ${config.createdAt}`)
      console.log('')
    })
    
    // 2. Verificar configuração ativa
    console.log('2️⃣ Verificando configuração ativa...')
    const activeConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    if (activeConfig) {
      console.log('✅ Configuração ativa encontrada:')
      console.log(`   ID: ${activeConfig.id}`)
      console.log(`   Prompt: ${activeConfig.systemPrompt || 'Vazio'}`)
      console.log(`   Temperatura: ${activeConfig.temperature}`)
      console.log(`   Max Tokens: ${activeConfig.maxTokens}`)
    } else {
      console.log('❌ Nenhuma configuração ativa encontrada')
    }
    
    // 3. Simular comando /aprender
    console.log('\n3️⃣ Simulando comando /aprender...')
    const testInstruction = 'Sempre mencione a importância da NR-12 em análises de máquinas'
    
    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    // Buscar prompt existente
    const lastConfig = await prisma.aIConfiguration.findFirst({
      orderBy: { createdAt: 'desc' }
    })
    
    let existingPrompt = lastConfig?.systemPrompt || ""
    const newInstruction = `- ${testInstruction}`
    const updatedPrompt = existingPrompt.trim() 
      ? `${existingPrompt}\n${newInstruction}`
      : newInstruction
    
    // Criar nova configuração
    const newConfig = await prisma.aIConfiguration.create({
      data: {
        systemPrompt: updatedPrompt,
        temperature: 0.7,
        maxTokens: 2000,
        isActive: true,
        updatedBy: 'test-user'
      }
    })
    
    console.log('✅ Nova configuração criada:')
    console.log(`   ID: ${newConfig.id}`)
    console.log(`   Prompt completo:`)
    console.log(`   ${newConfig.systemPrompt}`)
    
    // 4. Simular comando /ver
    console.log('\n4️⃣ Simulando comando /ver...')
    const currentConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    if (currentConfig) {
      console.log('📋 PROMPT ATUAL:')
      console.log(currentConfig.systemPrompt)
    }
    
    // 5. Testar comando /limpar
    console.log('\n5️⃣ Simulando comando /limpar...')
    
    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    // Criar configuração limpa
    const cleanConfig = await prisma.aIConfiguration.create({
      data: {
        systemPrompt: "",
        temperature: 0.7,
        maxTokens: 2000,
        isActive: true,
        updatedBy: 'test-user'
      }
    })
    
    console.log('✅ Prompt limpo com sucesso!')
    console.log(`   ID da nova configuração: ${cleanConfig.id}`)
    console.log(`   Prompt: ${cleanConfig.systemPrompt || 'Vazio'}`)
    
    console.log('\n🎉 TODOS OS TESTES CONCLUÍDOS COM SUCESSO!')
    
  } catch (error) {
    console.error('❌ ERRO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAICommands()