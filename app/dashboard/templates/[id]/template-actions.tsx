'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Edit, CheckCircle2 } from 'lucide-react'
import { publishTemplate } from '@/app/actions/templates'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface TemplateActionsProps {
  templateId: string
  status: string
}

export function TemplateActions({ templateId, status }: TemplateActionsProps) {
  const router = useRouter()
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)
    const result = await publishTemplate(templateId)
    
    if (result.success) {
      router.refresh()
      setShowPublishDialog(false)
    } else {
      alert(result.error || 'Erro ao publicar template')
    }
    setIsPublishing(false)
  }

  const handleEdit = () => {
    router.push(`/dashboard/templates/${templateId}/edit`)
  }

  return (
    <>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
          Editar
        </Button>
        {status === 'DRAFT' && (
          <Button 
            size="sm" 
            className="gap-2 bg-teal-600 hover:bg-teal-700"
            onClick={() => setShowPublishDialog(true)}
          >
            <CheckCircle2 className="h-4 w-4" />
            Publicar
          </Button>
        )}
      </div>

      <AlertDialog open={showPublishDialog} onOpenChange={setShowPublishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publicar Template?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao publicar este template, ele ficará disponível para uso na criação de novos diagnósticos.
              Você ainda poderá editá-lo após a publicação.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPublishing}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {isPublishing ? 'Publicando...' : 'Publicar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
