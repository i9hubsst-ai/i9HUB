// Teste específico: adicionar nome MA.IA e verificar se funciona
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testMAIAName() {
  console.log('🤖 TESTE: ADICIONANDO NOME MA.IA')
  console.log('===============================\n')
  
  try {
    // 1. Adicionar instrução sobre o nome
    console.log('1️⃣ Adicionando instrução sobre o nome...')
    
    // Buscar configuração atual
    const currentConfig = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })
    
    let existingPrompt = currentConfig?.systemPrompt || ""
    const nameInstruction = "- O seu nome é MA.IA (Máquina de Análise de Inteligência Artificial)"
    
    const updatedPrompt = existingPrompt.trim() 
      ? `${existingPrompt}\n${nameInstruction}`
      : nameInstruction
    
    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })
    
    // Criar nova configuração
    const newConfig = await prisma.aIConfiguration.create({
      data: {
        systemPrompt: updatedPrompt,
        temperature: currentConfig?.temperature || 0.7,
        maxTokens: currentConfig?.maxTokens || 2000,
        isActive: true,
        updatedBy: 'test-maia'
      }
    })
    
    console.log('✅ Instrução adicionada com sucesso!')
    console.log(`Nova configuração ID: ${newConfig.id}`)
    
    // 2. Verificar o prompt completo
    console.log('\n2️⃣ Verificando prompt completo...')
    console.log('📋 PROMPT PERSONALIZADO ATUAL:')
    console.log('```')
    console.log(newConfig.systemPrompt)
    console.log('```')
    
    // 3. Simular como o prompt seria enviado para a IA
    console.log('\n3️⃣ Simulando prompt completo enviado para IA...')
    
    const baseSystemPrompt = `Você é um assistente especializado em Segurança e Saúde do Trabalho (SST),
com profundo conhecimento das normas regulamentadoras brasileiras (NRs),
ISO 45001 e melhores práticas do setor.

DIRETRIZES BÁSICAS:
- Base suas respostas no conhecimento específico das NRs brasileiras
- Cite as normas relevantes (ex: "Conforme NR-12, item 12.38...")
- Seja técnico e preciso
- Use terminologia oficial das normas
- Se não tiver certeza sobre algo específico, mencione que precisa consultar a norma completa`

    const fullSystemPrompt = baseSystemPrompt + `

INSTRUÇÕES ADICIONAIS DO ADMINISTRADOR:
${newConfig.systemPrompt.trim()}`

    const testQuestion = "Qual é o seu nome?"
    const finalPrompt = `${fullSystemPrompt}

Pergunta do usuário: ${testQuestion}`

    console.log('🎯 PROMPT FINAL COMPLETO:')
    console.log('=' * 50)
    console.log(finalPrompt)
    console.log('=' * 50)
    
    // 4. Verificar se a instrução sobre nome está presente
    console.log('\n4️⃣ Verificação de presença da instrução...')
    
    if (finalPrompt.includes('MA.IA')) {
      console.log('✅ SUCESSO: Instrução sobre nome MA.IA encontrada no prompt!')
      console.log('✅ A IA deveria responder que seu nome é MA.IA')
    } else {
      console.log('❌ ERRO: Instrução sobre nome não encontrada no prompt')
    }
    
    if (finalPrompt.includes('Máquina de Análise de Inteligência Artificial')) {
      console.log('✅ SUCESSO: Descrição completa do nome encontrada!')
    }
    
    console.log('\n🧪 TESTE DE RESPOSTA ESPERADA:')
    console.log('===============================')
    console.log('Pergunta: "Qual é o seu nome?"')
    console.log('Resposta esperada: Deve mencionar "MA.IA" e possivelmente a descrição completa')
    
    console.log('\n💡 PARA TESTAR NO CHAT REAL:')
    console.log('1. Acesse http://localhost:3000/dashboard')
    console.log('2. Faça uma pergunta: "Qual é o seu nome?"')
    console.log('3. A IA deve responder mencionando MA.IA')
    
  } catch (error) {
    console.error('❌ ERRO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testMAIAName()