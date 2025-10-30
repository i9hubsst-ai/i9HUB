// Listar modelos disponíveis na API Gemini
require('dotenv').config({ path: '.env.local' });

async function listGeminiModels() {
  console.log('🔍 Listando modelos disponíveis na API Gemini...');
  
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error('❌ API Key não encontrada!');
    return;
  }
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('❌ Erro na API:', data);
      return;
    }
    
    console.log('✅ Modelos disponíveis:');
    data.models.forEach(model => {
      console.log(`📋 Nome: ${model.name}`);
      console.log(`   Métodos suportados: ${model.supportedGenerationMethods.join(', ')}`);
      console.log('');
    });
    
    // Filtrar apenas modelos que suportam generateContent
    const contentModels = data.models.filter(model => 
      model.supportedGenerationMethods.includes('generateContent')
    );
    
    console.log('🎯 Modelos que suportam generateContent:');
    contentModels.forEach(model => {
      const shortName = model.name.replace('models/', '');
      console.log(`✅ ${shortName}`);
    });
    
  } catch (error) {
    console.error('💥 Erro ao listar modelos:', error.message);
  }
}

listGeminiModels();