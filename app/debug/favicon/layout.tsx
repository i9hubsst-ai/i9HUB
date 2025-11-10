import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Debug Favicon - i9HUBSST',
  description: 'Página de diagnóstico de favicons'
}

export default function FaviconDebugLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
