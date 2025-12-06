import { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TemplateEditForm } from './template-edit-form'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Editar Template | i9HUBSST',
  description: 'Editar template de diagnóstico',
}

export default async function EditTemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    redirect('/dashboard/templates')
  }

  const template = await prisma.diagnosticTemplate.findUnique({
    where: { id },
    include: {
      sections: {
        include: {
          questions: true
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!template) {
    notFound()
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Editar Template</h1>
        <p className="text-sm text-gray-600 mt-1">
          Modifique o nome, descrição, seções e perguntas do template
        </p>
      </div>

      <TemplateEditForm template={{
        ...template,
        description: template.description || ''
      }} />
    </div>
  )
}
