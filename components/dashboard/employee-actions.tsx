'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
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
import { Trash2, UserCheck, UserX } from 'lucide-react'
import { deleteEmployee, inactivateEmployee } from '@/app/actions/employees'

interface EmployeeActionsProps {
  employeeId: string
  employeeName: string
  currentStatus: string
}

export function EmployeeActions({ employeeId, employeeName, currentStatus }: EmployeeActionsProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showInactivateDialog, setShowInactivateDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const result = await deleteEmployee(employeeId)
    
    if (!result.error) {
      router.push('/dashboard/employees')
      router.refresh()
    } else {
      alert(result.error)
    }
    setLoading(false)
  }

  const handleToggleStatus = async () => {
    setLoading(true)
    const newStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    const result = await inactivateEmployee(employeeId, newStatus)
    
    if (!result.error) {
      setShowInactivateDialog(false)
      router.refresh()
    } else {
      alert(result.error)
    }
    setLoading(false)
  }

  return (
    <>
      <div className="flex gap-2">
        {/* Botão Ativar/Inativar */}
        <Button
          variant={currentStatus === 'ACTIVE' ? 'outline' : 'default'}
          onClick={() => setShowInactivateDialog(true)}
          className="gap-2"
        >
          {currentStatus === 'ACTIVE' ? (
            <>
              <UserX className="h-4 w-4" />
              Inativar
            </>
          ) : (
            <>
              <UserCheck className="h-4 w-4" />
              Ativar
            </>
          )}
        </Button>

        {/* Botão Excluir */}
        <Button
          variant="destructive"
          onClick={() => setShowDeleteDialog(true)}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Excluir Funcionário
        </Button>
      </div>

      {/* Dialog de Confirmação de Inativação */}
      <AlertDialog open={showInactivateDialog} onOpenChange={setShowInactivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {currentStatus === 'ACTIVE' ? 'Inativar' : 'Ativar'} Funcionário
            </AlertDialogTitle>
            <AlertDialogDescription>
              {currentStatus === 'ACTIVE' 
                ? `Tem certeza que deseja inativar ${employeeName}? O funcionário não terá mais acesso ao sistema.`
                : `Tem certeza que deseja reativar ${employeeName}? O funcionário voltará a ter acesso ao sistema.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleStatus} disabled={loading}>
              {loading ? 'Processando...' : 'Confirmar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p className="font-semibold text-destructive">
                ⚠️ ATENÇÃO: Esta ação é irreversível!
              </p>
              <p>
                Você está prestes a excluir permanentemente o funcionário <strong>{employeeName}</strong>.
              </p>
              <p>
                Todos os dados relacionados serão perdidos, incluindo:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Histórico de avaliações</li>
                <li>Treinamentos realizados</li>
                <li>Documentos vinculados</li>
                <li>Planos de ação atribuídos</li>
              </ul>
              <p className="font-semibold mt-4">
                Tem certeza que deseja continuar?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              disabled={loading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading ? 'Excluindo...' : 'Sim, Excluir Permanentemente'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
