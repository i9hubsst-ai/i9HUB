'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
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
import { useToast } from '@/hooks/use-toast'
import { deleteAssessment } from '@/app/actions/assessments'
import { useRouter } from 'next/navigation'

interface DeleteAssessmentButtonProps {
  assessmentId: string
  assessmentTitle: string
}

export function DeleteAssessmentButton({ assessmentId, assessmentTitle }: DeleteAssessmentButtonProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteAssessment(assessmentId)
      
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: result.error,
        })
      } else {
        toast({
          title: 'Sucesso',
          description: 'Diagnóstico excluído com sucesso',
        })
        router.refresh()
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao excluir diagnóstico',
      })
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  return (
    <>
      <DropdownMenuItem
        className="text-destructive cursor-pointer"
        onSelect={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Excluir
      </DropdownMenuItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O diagnóstico &quot;{assessmentTitle}&quot; será excluído permanentemente,
              incluindo todas as respostas, achados e planos de ação associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
