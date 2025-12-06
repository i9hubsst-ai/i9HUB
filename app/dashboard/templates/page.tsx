import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getAllTemplates } from '@/app/actions/templates'
import { TemplateList } from '@/components/dashboard/template-list'
import { Button } from '@/components/ui/button'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Templates de Diagnóstico | i9HUBSST',
  description: 'Gerencie templates de diagnóstico reutilizáveis',
}

export default async function TemplatesPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const result = await getAllTemplates()
  
  if ('error' in result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-800">
          {result.error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botão de Retorno */}
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/diagnostics-module">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para Diagnósticos e Maturidade
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates de Diagnóstico</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gerencie templates reutilizáveis para NR-12, NR-35, ISO 45001 e outros
          </p>
        </div>
        <Button asChild className="bg-teal-600 hover:bg-teal-700">
          <Link href="/dashboard/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Template (IA)
          </Link>
        </Button>
      </div>

      <TemplateList templates={result.templates} />
    </div>
  )
}
