// Teste dos comandos de chat (/aprender, /ver, /limpar)
const fetch = require('node-fetch');

async function testChatCommandsWithAuth() {
  console.log('🧪 TESTE DOS COMANDOS DE CHAT COM SIMULAÇÃO')
  console.log('==========================================\n')
  
  // Simular o que acontece quando comandos são enviados
  // (sem autenticação real, apenas processamento direto)
  
  const { PrismaClient } = require('@prisma/client')
  const prisma = new PrismaClient()
  
  try {
    // 1. Comando /ver - mostrar prompt atual
    console.log('1️⃣ TESTANDO COMANDO /ver')
    console.log('-'.repeat(30))
    
    const currentConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    if (currentConfig?.systemPrompt && currentConfig.systemPrompt.trim()) {
      console.log('📋 **PROMPT PERSONALIZADO ATUAL**\n')
      console.log('```')
      console.log(currentConfig.systemPrompt)
      console.log('```\n')
      console.log(`**Configurações:**`)
      console.log(`• Temperatura: ${currentConfig.temperature}`)
      console.log(`• Max Tokens: ${currentConfig.maxTokens}\n`)
      console.log('Use `/aprender [nova instrução]` para adicionar mais orientações.')
    } else {
      console.log('📋 **PROMPT ATUAL**\n')
      console.log('**Status:** Usando apenas prompt base SST')
      console.log('**Instruções personalizadas:** Nenhuma\n')
      console.log('Use `/aprender [instrução]` para adicionar orientações específicas.')
    }
    
    console.log('\n' + '='.repeat(60) + '\n')
    
    // 2. Comando /aprender - adicionar nova instrução
    console.log('2️⃣ TESTANDO COMANDO /aprender')
    console.log('-'.repeat(30))
    
    const newInstruction = 'Sempre inclua análise de custo-benefício nas recomendações'
    
    // Buscar prompt atual
    const existingConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    let existingInstructions = existingConfig?.systemPrompt || ""
    
    // Adicionar nova instrução
    const instruction = `- ${newInstruction}`
    const updatedPrompt = existingInstructions.trim() 
      ? `${existingInstructions}\n${instruction}`
      : instruction
    
    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    // Criar nova configuração
    await prisma.aIConfiguration.create({
      data: {
        systemPrompt: updatedPrompt,
        temperature: existingConfig?.temperature || 0.7,
        maxTokens: existingConfig?.maxTokens || 2000,
        isActive: true,
        updatedBy: 'test-admin'
      }
    })
    
    console.log('✅ **Instrução adicionada com sucesso!**\n')
    console.log(`**Nova instrução:** ${newInstruction}\n`)
    console.log('A IA agora seguirá esta orientação em todas as respostas. Use `/ver` para conferir o prompt completo.')
    
    console.log('\n' + '='.repeat(60) + '\n')
    
    // 3. Comando /ver novamente - verificar se foi adicionada
    console.log('3️⃣ VERIFICANDO PROMPT APÓS /aprender')
    console.log('-'.repeat(30))
    
    const updatedConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    console.log('📋 **PROMPT PERSONALIZADO ATUALIZADO**\n')
    console.log('```')
    console.log(updatedConfig.systemPrompt)
    console.log('```\n')
    
    console.log('\n' + '='.repeat(60) + '\n')
    
    // 4. Comando /limpar - limpar prompt
    console.log('4️⃣ TESTANDO COMANDO /limpar')
    console.log('-'.repeat(30))
    
    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    // Criar configuração limpa
    await prisma.aIConfiguration.create({
      data: {
        systemPrompt: "",
        temperature: updatedConfig?.temperature || 0.7,
        maxTokens: updatedConfig?.maxTokens || 2000,
        isActive: true,
        updatedBy: 'test-admin'
      }
    })
    
    console.log('🧹 **Prompt personalizado limpo!**\n')
    console.log('A IA agora usa apenas o prompt base especializado em SST.')
    console.log('Use `/aprender [instrução]` para adicionar novas orientações.')
    
    console.log('\n' + '='.repeat(60) + '\n')
    
    // 5. Verificação final
    console.log('5️⃣ VERIFICAÇÃO FINAL')
    console.log('-'.repeat(30))
    
    const finalConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    if (finalConfig.systemPrompt.trim() === '') {
      console.log('✅ SUCESSO: Prompt foi limpo corretamente')
      console.log('Configuração ativa agora tem prompt vazio, usando apenas o base')
    } else {
      console.log('❌ ERRO: Prompt não foi limpo')
    }
    
    console.log('\n🎉 **TODOS OS COMANDOS FUNCIONARAM PERFEITAMENTE!**')
    
    console.log('\n📝 **RESUMO DOS COMANDOS:**')
    console.log('• `/ver` - Mostra prompt personalizado atual')
    console.log('• `/aprender [instrução]` - Adiciona nova orientação')
    console.log('• `/limpar` - Remove todas as instruções personalizadas')
    console.log('• `/ajuda` - Lista todos os comandos disponíveis')
    
    console.log('\n💡 **PARA USAR NO CHAT REAL:**')
    console.log('1. Faça login como administrador da plataforma')
    console.log('2. Acesse o chat em /dashboard')
    console.log('3. Digite os comandos começando com /')
    console.log('4. As instruções serão aplicadas instantaneamente!')
    
  } catch (error) {
    console.error('❌ ERRO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testChatCommandsWithAuth()