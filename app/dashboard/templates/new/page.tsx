import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { TemplateBuilderForm } from '@/components/dashboard/template-builder-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Novo Template com IA | i9HUBSST',
  description: 'Gere templates de diagnóstico completos usando IA',
}

export default async function NewTemplatePage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    redirect('/dashboard/templates')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Criar Template com IA
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Use inteligência artificial para gerar templates completos de diagnóstico SST
          </p>
        </div>

        <TemplateBuilderForm />
      </div>
    </div>
  )
}
