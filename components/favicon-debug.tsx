'use client'

import { useEffect } from 'react'

/**
 * Componente de debug para favicons
 * Loga informações detalhadas sobre favicons no console do navegador
 */
export function FaviconDebug() {
  useEffect(() => {
    console.log('🔍 [FAVICON DEBUG] Iniciando diagnóstico...')
    console.log('🔍 [FAVICON DEBUG] URL atual:', window.location.href)
    console.log('🔍 [FAVICON DEBUG] Origem:', window.location.origin)
    
    // Verificar todos os links de favicon no documento
    const iconLinks = document.querySelectorAll('link[rel*="icon"]')
    console.log('🔍 [FAVICON DEBUG] Total de links icon encontrados:', iconLinks.length)
    
    iconLinks.forEach((link, index) => {
      const linkElement = link as HTMLLinkElement
      console.log(`🔍 [FAVICON DEBUG] Link ${index + 1}:`, {
        rel: linkElement.rel,
        href: linkElement.href,
        type: linkElement.type,
        sizes: linkElement.sizes?.value || 'N/A',
        tagName: linkElement.tagName
      })
    })

    // Verificar apple-touch-icon
    const appleTouchIcons = document.querySelectorAll('link[rel="apple-touch-icon"]')
    console.log('🔍 [FAVICON DEBUG] Apple touch icons:', appleTouchIcons.length)
    appleTouchIcons.forEach((link, index) => {
      const linkElement = link as HTMLLinkElement
      console.log(`🔍 [FAVICON DEBUG] Apple Icon ${index + 1}:`, linkElement.href)
    })

    // Tentar fazer fetch dos favicons para verificar se existem
    const faviconUrls = [
      '/favicon.ico',
      '/favicon.svg',
      '/apple-touch-icon.png',
      '/favicon-16x16.png',
      '/favicon-96x96.png'
    ]

    console.log('🔍 [FAVICON DEBUG] Testando existência dos arquivos...')
    
    faviconUrls.forEach(async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' })
        console.log(`🔍 [FAVICON DEBUG] ${url}:`, {
          status: response.status,
          statusText: response.statusText,
          exists: response.ok,
          contentType: response.headers.get('content-type'),
          contentLength: response.headers.get('content-length')
        })
      } catch (error) {
        console.error(`🔍 [FAVICON DEBUG] Erro ao buscar ${url}:`, error)
      }
    })

    // Verificar metadados do documento
    console.log('🔍 [FAVICON DEBUG] Document title:', document.title)
    
    // Verificar todos os meta tags
    const metaTags = document.querySelectorAll('meta')
    console.log('🔍 [FAVICON DEBUG] Total de meta tags:', metaTags.length)
    
    // Listar meta tags relacionadas a ícones ou imagens
    metaTags.forEach((meta) => {
      const property = meta.getAttribute('property')
      const name = meta.getAttribute('name')
      const content = meta.getAttribute('content')
      
      if (property?.includes('image') || name?.includes('image') || name?.includes('icon')) {
        console.log('🔍 [FAVICON DEBUG] Meta tag relevante:', {
          property,
          name,
          content
        })
      }
    })

    // Verificar se há favicons em cache
    console.log('🔍 [FAVICON DEBUG] Cache API disponível:', 'caches' in window)
    
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        console.log('🔍 [FAVICON DEBUG] Caches disponíveis:', cacheNames)
        
        cacheNames.forEach(async (cacheName) => {
          const cache = await caches.open(cacheName)
          const requests = await cache.keys()
          const faviconRequests = requests.filter(req => 
            req.url.includes('favicon') || req.url.includes('icon')
          )
          if (faviconRequests.length > 0) {
            console.log(`🔍 [FAVICON DEBUG] Favicons em cache "${cacheName}":`, 
              faviconRequests.map(req => req.url)
            )
          }
        })
      })
    }

    // Informações do navegador
    console.log('🔍 [FAVICON DEBUG] User Agent:', navigator.userAgent)
    console.log('🔍 [FAVICON DEBUG] Vendor:', navigator.vendor)
    
    console.log('🔍 [FAVICON DEBUG] Diagnóstico completo!')
    console.log('🔍 [FAVICON DEBUG] ===================================')
    
  }, [])

  return null // Componente invisível, apenas para logging
}
