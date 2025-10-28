'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Edit, CheckCircle2, Sparkles, Loader2 } from 'lucide-react'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TemplateReviewSuggestions } from '@/components/dashboard/template-review-suggestions'

interface TemplateActionsProps {
  templateId: string
  status: string
}

export function TemplateActions({ templateId, status }: TemplateActionsProps) {
  const router = useRouter()
  const [showPublishDialog, setShowPublishDialog] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [isReviewing, setIsReviewing] = useState(false)
  const [reviewResult, setReviewResult] = useState<any>(null)

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

  const handleReview = async () => {
    setIsReviewing(true)
    setShowReviewDialog(true)
    setReviewResult(null)

    try {
      const response = await fetch('/api/ai/template-reviewer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId })
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erro ao revisar template')
      }

      setReviewResult(data)
    } catch (error) {
      console.error('Erro:', error)
      alert(error instanceof Error ? error.message : 'Erro ao revisar template com IA')
      setShowReviewDialog(false)
    } finally {
      setIsReviewing(false)
    }
  }

  const handleApplySuggestions = (acceptedSuggestions: any[]) => {
    // Armazenar sugestões aceitas no localStorage para uso na página de edição
    localStorage.setItem('aiSuggestions', JSON.stringify(acceptedSuggestions))
    // Redirecionar para a página de edição
    router.push(`/dashboard/templates/${templateId}/edit?fromAI=true`)
  }

  const handleCloseReview = () => {
    setShowReviewDialog(false)
    setReviewResult(null)
  }

  return (
    <>
      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="gap-2 bg-teal-600 hover:bg-teal-700"
          onClick={handleEdit}
        >
          <Edit className="h-4 w-4" />
          Editar Template
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleReview}
          disabled={isReviewing}
        >
          {isReviewing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Revisando...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Revisar com IA
            </>
          )}
        </Button>
        {status === 'DRAFT' && (
          <Button 
            variant="outline"
            size="sm" 
            className="gap-2"
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

      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sugestões da IA para o Template</DialogTitle>
            <DialogDescription>
              {isReviewing ? (
                <div className="flex items-center gap-2 py-8">
                  <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
                  <span>Analisando template e gerando sugestões...</span>
                </div>
              ) : (
                'Revise as sugestões e selecione as que deseja aplicar ao template.'
              )}
            </DialogDescription>
          </DialogHeader>
          
          {reviewResult && !isReviewing && (
            <TemplateReviewSuggestions
              templateName={reviewResult.templateName}
              review={reviewResult.review}
              onApplySuggestions={handleApplySuggestions}
              onClose={handleCloseReview}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
