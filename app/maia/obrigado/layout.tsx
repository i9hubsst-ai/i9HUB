import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obrigado! - MA.IA',
  description: 'Bem-vindo ao MA.IA - Seu acesso foi confirmado',
  icons: {
    icon: '/images/maia-brain.png',
    apple: '/images/maia-brain.png',
  },
}

export default function MaiaObrigadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
