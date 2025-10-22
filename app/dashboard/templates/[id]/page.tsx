import { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { TemplateActions } from './template-actions'

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

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Seções e Perguntas</h2>
        {template.sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {section.order}. {section.title}
              </CardTitle>
              <CardDescription>
                {section.questions.length} pergunta(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {section.questions.map((question, idx) => (
                  <div
                    key={question.id}
                    className="flex items-start gap-3 p-3 rounded-md bg-gray-50 text-sm"
                  >
                    <span className="font-medium text-gray-500 min-w-[2rem]">
                      {idx + 1}.
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-900">{question.text}</p>
                      <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                        <span className="bg-white px-2 py-0.5 rounded border">
                          Tipo: {question.type}
                        </span>
                        <span className="bg-white px-2 py-0.5 rounded border">
                          Peso: {question.weight}
                        </span>
                        {question.reference && (
                          <span className="bg-white px-2 py-0.5 rounded border">
                            {question.reference}
                          </span>
                        )}
                        {question.requiresJustification && (
                          <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded border border-orange-200">
                            Justificativa obrigatória
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
