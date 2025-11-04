'use client'

import { useState, useEffect } from 'react'
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
import { updateUserRole, createUserMembership } from '@/app/actions/users'
import { getCompanies } from '@/app/actions/companies'
import { Role } from '@prisma/client'
import { Building2 } from 'lucide-react'

interface EditUserRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: {
    id: string
    userId: string
    companyId: string | null
    email?: string
    name?: string
    role: Role
    hasMembership?: boolean
  }
}

// Roles que NÃO precisam de empresa vinculada
const ROLES_WITHOUT_COMPANY = ['ENGINEER', 'VIEWER'] as const

// Roles que PRECISAM de empresa vinculada
const ROLES_WITH_COMPANY = ['COMPANY_ADMIN', 'EMPLOYER'] as const

export function EditUserRoleDialog({ open, onOpenChange, user }: EditUserRoleDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role>(user.role)
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(user.companyId || '')
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([])
  const [loadingCompanies, setLoadingCompanies] = useState(false)

  const needsCompany = ROLES_WITH_COMPANY.includes(selectedRole as any)
  const canCreateWithoutCompany = ROLES_WITHOUT_COMPANY.includes(selectedRole as any)

  // Carregar empresas quando abrir dialog
  useEffect(() => {
    if (open && !companies.length) {
      loadCompanies()
    }
  }, [open])

  async function loadCompanies() {
    setLoadingCompanies(true)
    const result = await getCompanies()
    if (result.companies) {
      setCompanies(result.companies)
    }
    setLoadingCompanies(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      let result

      // Se usuário JÁ tem membership, apenas atualizar role
      if (user.hasMembership) {
        result = await updateUserRole(user.id, selectedRole)
      } else {
        // Usuário SEM membership
        
        // Se role PRECISA de empresa e não foi selecionada
        if (needsCompany && !selectedCompanyId) {
          setError('Selecione uma empresa para este papel')
          setLoading(false)
          return
        }

        // Criar nova membership
        result = await createUserMembership({
          userId: user.userId,
          companyId: selectedCompanyId || null,
          role: selectedRole
        })
      }

      if (result.error) {
        setError(result.error)
        setLoading(false)
      } else {
        setSuccess(true)
        setLoading(false)
        setTimeout(() => {
          onOpenChange(false)
          setSuccess(false)
          window.location.reload() // Recarregar para atualizar lista
        }, 1500)
      }
    } catch (err) {
      setError('Erro ao salvar alterações')
      setLoading(false)
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

        {!user.hasMembership && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-medium mb-2">ℹ️ Criar vínculo</p>
            <p>Este usuário será vinculado ao sistema. Escolha o papel e, se necessário, a empresa.</p>
          </div>
        )}

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
                <SelectItem value="ENGINEER">Engenheiro SST (sem vínculo)</SelectItem>
                <SelectItem value="EMPLOYER">Funcionário</SelectItem>
                <SelectItem value="VIEWER">Visualizador (sem vínculo)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {canCreateWithoutCompany 
                ? 'Este papel não requer vínculo com empresa específica'
                : needsCompany
                ? 'Este papel requer vínculo com uma empresa'
                : 'Define as permissões do usuário'
              }
            </p>
          </div>

          {/* Seletor de Empresa - aparece apenas se não tem membership E o role precisa de empresa */}
          {!user.hasMembership && needsCompany && (
            <div className="space-y-2">
              <Label htmlFor="company">
                Empresa <span className="text-destructive">*</span>
              </Label>
              <Select 
                value={selectedCompanyId} 
                onValueChange={setSelectedCompanyId} 
                disabled={loading || loadingCompanies}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingCompanies ? "Carregando..." : "Selecione uma empresa"} />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem key={company.id} value={company.id}>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {company.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Empresa à qual o usuário será vinculado
              </p>
            </div>
          )}

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
              disabled={loading || success || (user.hasMembership && selectedRole === user.role)}
              className="flex-1"
            >
              {loading ? 'Salvando...' : success ? 'Salvo!' : user.hasMembership ? 'Atualizar' : 'Vincular'}
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
