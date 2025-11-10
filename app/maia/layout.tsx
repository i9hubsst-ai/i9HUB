import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MA.IA - Inteligência Artificial para Segurança do Trabalho',
  description: 'Módulo Avançado de Inteligência Artificial especializado em Segurança e Saúde do Trabalho',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function MaiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
