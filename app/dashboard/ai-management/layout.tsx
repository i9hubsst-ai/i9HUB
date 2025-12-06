import { Suspense } from 'react'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Brain, FileText, Users, BarChart3 } from 'lucide-react'

export default async function AIManagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const isAdmin = await isPlatformAdmin(user.id)
  
  if (!isAdmin) {
    redirect('/dashboard')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestão de IA MA.IA</h1>
        <p className="text-muted-foreground">
          Dashboard completo de gerenciamento da inteligência artificial
        </p>
      </div>

      <AIManagementNav />

      <div className="mt-6">
        <Suspense fallback={<div>Carregando...</div>}>
          {children}
        </Suspense>
      </div>
    </div>
  )
}

function AIManagementNav() {
  return (
    <nav className="flex gap-2 border-b pb-2">
      <Link
        href="/dashboard/ai-management"
        className="px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
      >
        <Brain className="w-4 h-4" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/ai-management/prompt"
        className="px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
      >
        <FileText className="w-4 h-4" />
        Configuração da IA
      </Link>
      <Link
        href="/dashboard/ai-management/leads"
        className="px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
      >
        <Users className="w-4 h-4" />
        Gestão de Leads
      </Link>
      <Link
        href="/dashboard/ai-management/analytics"
        className="px-4 py-2 rounded-md hover:bg-accent transition-colors flex items-center gap-2"
      >
        <BarChart3 className="w-4 h-4" />
        Analytics
      </Link>
    </nav>
  )
}
