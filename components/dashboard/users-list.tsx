'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { Mail, MoreVertical, Pencil, Trash2, Send, Users, Shield, UserCog, User } from 'lucide-react'
import { EditUserRoleDialog } from './edit-user-role-dialog'
import { EditUserProfileDialog } from './edit-user-profile-dialog'
import { resendInvite, removeUserFromCompany } from '@/app/actions/users'
import { Role } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  userId: string
  companyId: string
  role: Role
  status: string
  email?: string
  name?: string
  company: {
    id: string
    name: string
  }
}

interface UsersListProps {
  users: User[]
}

const roleIcons = {
  PLATFORM_ADMIN: { icon: Shield, color: 'bg-red-100 text-red-700', label: 'Admin Plataforma' },
  COMPANY_ADMIN: { icon: UserCog, color: 'bg-orange-100 text-orange-700', label: 'Admin Empresa' },
  ENGINEER: { icon: Users, color: 'bg-blue-100 text-blue-700', label: 'Engenheiro SST' },
  EMPLOYER: { icon: Users, color: 'bg-green-100 text-green-700', label: 'Funcionário' },
  VIEWER: { icon: Users, color: 'bg-gray-100 text-gray-700', label: 'Visualizador' },
}

export function UsersList({ users }: UsersListProps) {
  const router = useRouter()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [editingProfile, setEditingProfile] = useState<User | null>(null)
  const [removingUser, setRemovingUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  async function handleResendInvite(user: User) {
    setLoading(user.id)
    setError('')
    
    const result = await resendInvite(user.id)
    
    if (result.error) {
      setError(result.error)
    }
    
    setLoading(null)
    router.refresh()
  }

  async function handleRemoveUser() {
    if (!removingUser) return
    
    setLoading(removingUser.id)
    setError('')
    
    const result = await removeUserFromCompany(removingUser.id)
    
    if (result.error) {
      setError(result.error)
    } else {
      setRemovingUser(null)
      router.refresh()
    }
    
    setLoading(null)
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Nenhum usuário encontrado
          </h3>
          <p className="text-muted-foreground text-center max-w-md">
            Comece criando sua conta ou convidando membros para suas empresas
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {users.map((user) => {
              const roleConfig = roleIcons[user.role]
              const RoleIcon = roleConfig.icon
              
              return (
                <div key={user.id} className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-lg ${roleConfig.color}`}>
                        <RoleIcon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">
                          {user.name || user.email || 'Usuário sem nome'}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          {user.email || user.userId}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{user.company.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {roleConfig.label}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                          ${user.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 
                            user.status === 'INVITED' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-gray-100 text-gray-700'}`}>
                          {user.status === 'ACTIVE' ? 'Ativo' : user.status === 'INVITED' ? 'Convite Pendente' : 'Inativo'}
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingProfile(user)}>
                          <User className="h-4 w-4 mr-2" />
                          Editar Perfil
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Editar Papel
                        </DropdownMenuItem>
                        {user.status === 'INVITED' && (
                          <DropdownMenuItem 
                            onClick={() => handleResendInvite(user)}
                            disabled={loading === user.id}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            {loading === user.id ? 'Enviando...' : 'Reenviar Convite'}
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => setRemovingUser(user)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remover
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm mt-4">
          {error}
        </div>
      )}

      {editingProfile && (
        <EditUserProfileDialog
          open={!!editingProfile}
          onOpenChange={(open: boolean) => {
            if (!open) {
              setEditingProfile(null)
              router.refresh()
            }
          }}
          user={editingProfile}
        />
      )}

      {editingUser && (
        <EditUserRoleDialog
          open={!!editingUser}
          onOpenChange={(open: boolean) => {
            if (!open) setEditingUser(null)
            else router.refresh()
          }}
          user={editingUser}
        />
      )}

      <AlertDialog open={!!removingUser} onOpenChange={(open) => !open && setRemovingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover Usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover <strong>{removingUser?.name || removingUser?.email}</strong> da empresa <strong>{removingUser?.company.name}</strong>?
              <br /><br />
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading === removingUser?.id}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveUser}
              disabled={loading === removingUser?.id}
              className="bg-destructive hover:bg-destructive/90"
            >
              {loading === removingUser?.id ? 'Removendo...' : 'Remover'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
