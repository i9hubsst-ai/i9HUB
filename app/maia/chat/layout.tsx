import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat MA.IA - Assistente de Segurança do Trabalho',
  description: 'Converse com o MA.IA, seu assistente inteligente especializado em SST',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function MaiaChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
