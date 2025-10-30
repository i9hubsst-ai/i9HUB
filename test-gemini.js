// Teste direto da API Gemini
require('dotenv').config({ path: '.env.local' });

const { createGoogleGenerativeAI } = require('@ai-sdk/google');
const { streamText } = require('ai');

async function testGemini() {
  console.log('🚀 Testando comunicação com Gemini...');
  
  // Verificar se API key existe
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error('❌ API Key não encontrada!');
    return;
  }
  
  console.log('✅ API Key encontrada:', apiKey.substring(0, 10) + '...');
  
  try {
    // Configurar o provider
    const google = createGoogleGenerativeAI({
      apiKey: apiKey
    });
    
    console.log('🔧 Provider configurado, testando modelo gemini-pro...');
    
    // Testar streamText
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      messages: [
        {
          role: 'user',
          content: 'Olá! Você está funcionando?'
        }
      ],
      temperature: 0.7,
      maxTokens: 100
    });
    
    console.log('📤 Requisição enviada, aguardando resposta...');
    
    // Ler o stream
    let response = '';
    for await (const chunk of result.textStream) {
      response += chunk;
      process.stdout.write(chunk);
    }
    
    console.log('\n✅ Teste concluído! Resposta recebida.');
    console.log('📊 Comprimento da resposta:', response.length, 'caracteres');
    
  } catch (error) {
    console.error('💥 ERRO no teste:', error.message);
    console.error('🔍 Detalhes:', error);
  }
}

testGemini();