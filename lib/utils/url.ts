/**
 * Função utilitária para obter a URL base da aplicação
 * Garante que sempre retorne a URL de produção quando necessário
 */
export function getBaseUrl(): string {
  // Em produção, sempre usar a URL do Vercel
  if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
    return 'https://i9hubsst.vercel.app';
  }
  
  // Se NEXT_PUBLIC_SITE_URL for localhost, usar produção
  if (process.env.NEXT_PUBLIC_SITE_URL === 'http://localhost:3000') {
    return 'https://i9hubsst.vercel.app';
  }
  
  // Caso contrário, usar a variável de ambiente ou fallback
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://i9hubsst.vercel.app';
}

/**
 * Função para gerar URLs de callback/redirect
 */
export function getCallbackUrl(path: string = '/auth/callback'): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
}

/**
 * Função específica para reset de senha
 */
export function getResetPasswordUrl(): string {
  return getCallbackUrl('/auth/callback?type=recovery&next=/auth/reset-password');
}