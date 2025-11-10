import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MA.IA - Inteligência Artificial para Segurança do Trabalho',
  description: 'Módulo Avançado de Inteligência Artificial especializado em Segurança e Saúde do Trabalho',
  icons: {
    icon: '/images/maia-brain.png',
    apple: '/images/maia-brain.png',
  },
}

export default function MaiaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
