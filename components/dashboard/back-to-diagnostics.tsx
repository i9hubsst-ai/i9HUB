'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export function BackToDiagnostics() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.push('/dashboard/diagnostics-module')}
      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Voltar para Módulo de Diagnósticos
    </Button>
  )
}
