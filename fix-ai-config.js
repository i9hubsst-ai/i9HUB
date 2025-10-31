// Corrigir configuração ativa da IA
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function fixActiveConfig() {
  console.log('🔧 CORRIGINDO CONFIGURAÇÃO ATIVA DA IA')
  console.log('====================================\n')
  
  try {
    // 1. Desativar todas as configurações
    console.log('1️⃣ Desativando todas as configurações...')
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    console.log('✅ Configurações desativadas')
    
    // 2. Criar nova configuração com instruções válidas
    console.log('\n2️⃣ Criando nova configuração ativa...')
    const newConfig = await prisma.aIConfiguration.create({
      data: {
        systemPrompt: `- Sempre mencione a importância da NR-12 em análises de máquinas e equipamentos
- Inclua custos estimados quando sugerir soluções de SST
- Priorize soluções adequadas para pequenas e médias empresas
- Mencione prazos legais quando aplicável
- Cite sempre a base normativa das recomendações`,
        temperature: 0.7,
        maxTokens: 2000,
        isActive: true,
        updatedBy: 'admin-fix'
      }
    })
    
    console.log('✅ Nova configuração criada:')
    console.log(`   ID: ${newConfig.id}`)
    console.log(`   Ativa: ${newConfig.isActive}`)
    console.log(`   Prompt:`)
    console.log(`   ${newConfig.systemPrompt}`)
    
    // 3. Verificar se está funcionando
    console.log('\n3️⃣ Verificando configuração ativa...')
    const activeConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    if (activeConfig && activeConfig.systemPrompt.trim()) {
      console.log('✅ SUCESSO! Configuração ativa com prompt válido:')
      console.log(`   "${activeConfig.systemPrompt}"`)
    } else {
      console.log('❌ PROBLEMA: Configuração ainda vazia')
    }
    
  } catch (error) {
    console.error('❌ ERRO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixActiveConfig()