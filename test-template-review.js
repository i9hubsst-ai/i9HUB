// Script de teste para revisar template via IA
const fetch = require('node-fetch');

async function testTemplateReview() {
  try {
    console.log('🧪 Testando revisão de template via IA...\n');

    // Primeiro, vamos buscar um template existente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Credenciais Supabase não configuradas');
      return;
    }

    console.log('✅ Credenciais Supabase encontradas');
    console.log('✅ GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Configurada' : 'NÃO configurada');

    // Fazer requisição local para a API
    const response = await fetch('http://localhost:3000/api/ai/template-reviewer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        templateId: 'test-id' // ID de teste para ver o erro
      })
    });

    console.log('\n📡 Status da resposta:', response.status);
    console.log('📡 Headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('\n📦 Resposta da API:');
    console.log(JSON.stringify(data, null, 2));

    if (data.error) {
      console.log('\n❌ Erro retornado:', data.error);
    } else {
      console.log('\n✅ Sucesso!');
    }

  } catch (error) {
    console.error('\n💥 Erro no teste:', error.message);
    console.error(error.stack);
  }
}

testTemplateReview();
