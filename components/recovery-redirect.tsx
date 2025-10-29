'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function RecoveryRedirect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Verificar se estamos no domínio incorreto e redirecionar
    const currentHost = window.location.host
    const correctHost = 'i9hubsst.vercel.app'
    
    if (currentHost === 'i9hubsst-i9hubssts-projects.vercel.app') {
      console.log('🔄 DOMAIN REDIRECT: Detectado domínio incorreto, redirecionando para domínio correto')
      const newUrl = window.location.href.replace(
        'i9hubsst-i9hubssts-projects.vercel.app',
        'i9hubsst.vercel.app'
      )
      console.log('🔄 DOMAIN REDIRECT: Nova URL:', newUrl)
      window.location.href = newUrl
      return
    }
    
    // Verificar se há parâmetros de recovery na URL
    const token = searchParams.get('token') // Token PKCE do Supabase
    const type = searchParams.get('type')
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    
    // Também verificar parâmetros que o Supabase pode adicionar após o processamento
    const error = searchParams.get('error')
    const error_code = searchParams.get('error_code')
    const error_description = searchParams.get('error_description')
    
    console.log('🔍 RECOVERY REDIRECT: Verificando parâmetros:', {
      token: token ? `${token.substring(0, 10)}...` : null,
      type,
      access_token: access_token ? `${access_token.substring(0, 10)}...` : null,
      refresh_token: refresh_token ? `${refresh_token.substring(0, 10)}...` : null,
      error,
      error_code,
      error_description,
      fullUrl: window.location.href,
      pathname: window.location.pathname,
      hash: window.location.hash
    })
    
    // Verificar se há tokens no hash (às vezes o Supabase coloca lá)
    const hash = window.location.hash
    if (hash && hash.includes('access_token')) {
      console.log('🟡 RECOVERY REDIRECT: Tokens detectados no hash:', hash)
      
      // Converter hash em searchParams
      const hashParams = new URLSearchParams(hash.substring(1))
      const hashAccessToken = hashParams.get('access_token')
      const hashRefreshToken = hashParams.get('refresh_token')
      const hashType = hashParams.get('type')
      
      if (hashAccessToken && hashRefreshToken) {
        const loginUrl = new URL('/auth/login', window.location.origin)
        loginUrl.searchParams.set('access_token', hashAccessToken)
        loginUrl.searchParams.set('refresh_token', hashRefreshToken)
        if (hashType) loginUrl.searchParams.set('type', hashType)
        
        console.log('🔄 RECOVERY REDIRECT: Redirecionando com tokens do hash para:', loginUrl.toString())
        window.location.href = loginUrl.toString()
        return
      }
    }
    
    // Se há tokens de recovery (PKCE ou diretos) e não estamos já na página de login, redirecionar
    if ((token && type === 'recovery') || (access_token && refresh_token)) {
      const currentPath = window.location.pathname
      
      // Se já estamos na página de login, não redirecionar novamente
      if (currentPath === '/auth/login') {
        console.log('✅ RECOVERY REDIRECT: Já estamos na página de login, não redirecionando')
        return
      }
      
      console.log('✅ RECOVERY REDIRECT: Tokens de recovery detectados, redirecionando para login')
      
      // Construir URL de login com todos os parâmetros
      const loginUrl = new URL('/auth/login', window.location.origin)
      
      // Copiar todos os parâmetros relevantes
      if (token) loginUrl.searchParams.set('token', token)
      if (type) loginUrl.searchParams.set('type', type)
      if (access_token) loginUrl.searchParams.set('access_token', access_token)
      if (refresh_token) loginUrl.searchParams.set('refresh_token', refresh_token)
      
      console.log('🔄 RECOVERY REDIRECT: Redirecionando para:', loginUrl.toString())
      
      // Fazer o redirect
      window.location.href = loginUrl.toString()
    }
  }, [searchParams, router])
  
  return null // Componente invisível
}