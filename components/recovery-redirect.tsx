'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RecoveryRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Verificar se há parâmetros de recovery na URL
    const token = searchParams.get('token')
    const type = searchParams.get('type')
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    
    console.log('🔍 RECOVERY REDIRECT: Verificando parâmetros:', {
      token: token ? `${token.substring(0, 10)}...` : null,
      type,
      access_token: access_token ? `${access_token.substring(0, 10)}...` : null,
      refresh_token: refresh_token ? `${refresh_token.substring(0, 10)}...` : null,
      fullUrl: window.location.href
    })
    
    // Se há tokens de recovery, redirecionar para o callback
    if ((token && type === 'recovery') || (access_token && refresh_token)) {
      console.log('✅ RECOVERY REDIRECT: Tokens de recovery detectados, redirecionando para callback')
      
      // Construir URL de callback com todos os parâmetros
      const callbackUrl = new URL('/auth/callback', window.location.origin)
      
      // Copiar todos os parâmetros relevantes
      if (token) callbackUrl.searchParams.set('token', token)
      if (type) callbackUrl.searchParams.set('type', type)
      if (access_token) callbackUrl.searchParams.set('access_token', access_token)
      if (refresh_token) callbackUrl.searchParams.set('refresh_token', refresh_token)
      
      // Adicionar next parameter para indicar destino final
      callbackUrl.searchParams.set('next', '/auth/reset-password')
      
      console.log('🔄 RECOVERY REDIRECT: Redirecionando para:', callbackUrl.toString())
      
      // Fazer o redirect
      window.location.href = callbackUrl.toString()
    }
  }, [searchParams, router])
  
  return null // Componente invisível
}