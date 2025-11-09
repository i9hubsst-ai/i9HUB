import { Suspense } from 'react'
import { AIManagementClient } from '@/components/dashboard/ai-management-client'

export default function PromptManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Prompt do Sistema</h2>
        <p className="text-muted-foreground">
          Configure o comportamento da IA editando o prompt do sistema
        </p>
      </div>

      <Suspense fallback={<div>Carregando configurações...</div>}>
        <AIManagementClient />
      </Suspense>
    </div>
  )
}
