'use client'

import { useState } from 'react'
import { TemplateStatus } from '@prisma/client'
import { updateTemplateStatus, deleteTemplate } from '@/app/actions/templates'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Eye, 
  Power, 
  Trash2, 
  Check, 
  X,
  Clock,
  Archive 
} from 'lucide-react'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Template = {
  id: string
  name: string
  description: string | null
  type: string
  status: TemplateStatus
  createdAt: Date
  sections: Array<{
    id: string
    title: string
    questions: Array<{ id: string }>
  }>
  _count: {
    sections: number
    assessments: number
  }
}

interface TemplateListProps {
  templates: Template[]
}

const statusColors = {
  DRAFT: 'bg-gray-100 text-gray-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-orange-100 text-orange-800'
}

const statusIcons = {
  DRAFT: Clock,
  PUBLISHED: Check,
  ARCHIVED: Archive
}

const statusLabels = {
  DRAFT: 'Rascunho',
  PUBLISHED: 'Publicado',
  ARCHIVED: 'Arquivado'
}

export function TemplateList({ templates }: TemplateListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  const handleStatusChange = async (templateId: string, newStatus: TemplateStatus) => {
    setLoading(templateId)
    const result = await updateTemplateStatus(templateId, newStatus)
    
    if ('error' in result) {
      alert(result.error)
    }
    
    setLoading(null)
  }

  const handleDelete = async () => {
    if (!selectedTemplateId) return
    
    setLoading(selectedTemplateId)
    const result = await deleteTemplate(selectedTemplateId)
    
    if ('error' in result) {
      alert(result.error)
    }
    
    setLoading(null)
    setDeleteDialogOpen(false)
    setSelectedTemplateId(null)
  }

  if (templates.length === 0) {
    return (
      <div className="rounded-md border border-gray-200 bg-white p-12 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-base font-semibold text-gray-900">
          Nenhum template encontrado
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Comece criando seu primeiro template de diagnóstico usando IA
        </p>
        <Button asChild className="mt-4 bg-teal-600 hover:bg-teal-700">
          <Link href="/dashboard/templates/new">
            Criar Template com IA
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {templates.map((template) => {
          const StatusIcon = statusIcons[template.status]
          const totalQuestions = template.sections.reduce(
            (sum, section) => sum + section.questions.length, 
            0
          )
          
          return (
            <div
              key={template.id}
              className="rounded-md border border-gray-200 bg-white p-4 hover:border-teal-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[template.status]}`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusLabels[template.status]}
                    </span>
                  </div>
                  
                  {template.description && (
                    <p className="mt-1 text-sm text-gray-600">
                      {template.description}
                    </p>
                  )}
                  
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {template._count.sections} seções
                    </span>
                    <span>
                      {totalQuestions} perguntas
                    </span>
                    <span>
                      {template._count.assessments} diagnósticos
                    </span>
                  </div>
                </div>
                
                <div className="ml-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <Link href={`/dashboard/templates/${template.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  
                  {template.status === 'PUBLISHED' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(template.id, 'ARCHIVED')}
                      disabled={loading === template.id}
                      title="Arquivar template"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                  ) : template.status === 'ARCHIVED' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(template.id, 'PUBLISHED')}
                      disabled={loading === template.id}
                      title="Publicar template"
                    >
                      <Power className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(template.id, 'PUBLISHED')}
                      disabled={loading === template.id}
                      title="Publicar template"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTemplateId(template.id)
                      setDeleteDialogOpen(true)
                    }}
                    disabled={loading === template.id || template._count.assessments > 0}
                    title={template._count.assessments > 0 ? 'Não pode excluir: template em uso' : 'Excluir template'}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
