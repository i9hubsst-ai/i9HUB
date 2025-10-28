import { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { TemplateActions } from './template-actions'
import { TemplateSectionsView } from '@/components/dashboard/template-sections-view'

export const metadata: Metadata = {
  title: 'Detalhes do Template | i9HUBSST',
  description: 'Visualizar detalhes do template de diagnóstico',
}

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
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

  const totalQuestions = template.sections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  )

  const statusColors = {
    DRAFT: 'bg-yellow-100 text-yellow-800',
    PUBLISHED: 'bg-green-100 text-green-800',
    ARCHIVED: 'bg-gray-100 text-gray-800'
  }

  const typeLabels: Record<string, string> = {
    NR: 'Norma Regulamentadora',
    ISO: 'ISO Standard',
    IMSST: 'Sistema IMSST',
    CUSTOM: 'Personalizado'
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/templates">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Templates
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{template.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
          <div className="flex gap-2 mt-3">
            <Badge className={statusColors[template.status]}>
              {template.status}
            </Badge>
            <Badge variant="outline">
              {typeLabels[template.type] || template.type}
            </Badge>
            <Badge variant="outline">
              Versão {template.version}
            </Badge>
          </div>
        </div>
        <TemplateActions templateId={template.id} status={template.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Seções</p>
              <p className="font-semibold text-lg">{template.sections.length}</p>
            </div>
            <div>
              <p className="text-gray-600">Perguntas</p>
              <p className="font-semibold text-lg">{totalQuestions}</p>
            </div>
            <div>
              <p className="text-gray-600">Criado em</p>
              <p className="font-semibold text-lg">
                {new Date(template.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TemplateSectionsView sections={template.sections.map(section => ({
        ...section,
        description: null // Assumindo que sections não têm description no schema atual
      }))} />
    </div>
  )
}
