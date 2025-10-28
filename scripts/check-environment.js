// Script para verificar configurações de ambiente
console.log('🔍 Verificando configurações de ambiente:');
console.log('NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Configurado' : '❌ Não configurado');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Configurado' : '❌ Não configurado');

// Função para testar reset de senha
export async function testResetPasswordURL() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const redirectUrl = `${baseUrl}/auth/callback?type=recovery&next=/auth/reset-password`;
  
  console.log('🔗 URL de redirecionamento para reset:', redirectUrl);
  
  return redirectUrl;
}