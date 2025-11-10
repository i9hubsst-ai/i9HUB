import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obrigado! - MA.IA',
  description: 'Bem-vindo ao MA.IA - Seu acesso foi confirmado',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function MaiaObrigadoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
