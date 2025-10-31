import { Suspense } from 'react'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AIManagementClient } from '@/components/dashboard/ai-management-client'

export default async function AIManagementPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Gestão de IA</h1>
        <p className="text-muted-foreground">
          Configure o prompt do sistema e gerencie documentos de conhecimento para o chat AI
        </p>
      </div>

      <Suspense fallback={<div>Carregando configurações...</div>}>
        <AIManagementClient />
      </Suspense>
    </div>
  )
}