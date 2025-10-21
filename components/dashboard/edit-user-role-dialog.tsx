'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { updateUserRole } from '@/app/actions/users'
import { Role } from '@prisma/client'

interface EditUserRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string
    email?: string
    name?: string
    role: Role
  }
}

export function EditUserRoleDialog({ open, onOpenChange, user }: EditUserRoleDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>(user.role)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const result = await updateUserRole(user.id, selectedRole)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
      setTimeout(() => {
        onOpenChange(false)
        setSuccess(false)
      }, 1500)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Editar Papel do Usuário</DialogTitle>
          <DialogDescription>
            Altere o papel de {user.name || user.email}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="role">
              Papel <span className="text-destructive">*</span>
            </Label>
            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as Role)} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="COMPANY_ADMIN">Administrador da Empresa</SelectItem>
                <SelectItem value="ENGINEER">Engenheiro SST</SelectItem>
                <SelectItem value="EMPLOYER">Funcionário</SelectItem>
                <SelectItem value="VIEWER">Visualizador</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Define as permissões do usuário na empresa
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 text-green-700 p-3 rounded-lg text-sm">
              Papel atualizado com sucesso!
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading || success || selectedRole === user.role}
              className="flex-1"
            >
              {loading ? 'Salvando...' : success ? 'Salvo!' : 'Salvar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
