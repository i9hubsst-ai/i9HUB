import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield, UserCog } from 'lucide-react'
import { getAllUsers } from '@/app/actions/users'
import { getCompanies } from '@/app/actions/companies'
import { InviteUserDialog } from '@/components/dashboard/invite-user-dialog'
import { UsersList } from '@/components/dashboard/users-list'

export const dynamic = 'force-dynamic'

export default async function UsersPage() {
  const result = await getAllUsers()
  const companiesResult = await getCompanies()

  if (result.error) {
    return (
      <div className="p-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const users = result.users || []
  const companies = companiesResult.companies || []

  const roleIcons = {
    PLATFORM_ADMIN: { icon: Shield, color: 'bg-red-100 text-red-700', label: 'Admin Plataforma' },
    COMPANY_ADMIN: { icon: UserCog, color: 'bg-orange-100 text-orange-700', label: 'Admin Empresa' },
    ENGINEER: { icon: Users, color: 'bg-blue-100 text-blue-700', label: 'Engenheiro SST' },
    EMPLOYER: { icon: Users, color: 'bg-green-100 text-green-700', label: 'Funcionário' },
    VIEWER: { icon: Users, color: 'bg-gray-100 text-gray-700', label: 'Visualizador' },
  }

  const roleCounts = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários e suas permissões ({users.length} total)
          </p>
        </div>
        <InviteUserDialog companies={companies} />
      </div>

      {/* Roles Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Papéis e Permissões</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {Object.entries(roleIcons).map(([key, config]) => {
            const Icon = config.icon
            return (
              <Card key={key}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {roleCounts[key] || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">{config.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
        <UsersList users={users} />
      </div>

      {/* Roles Description */}
      <Card>
        <CardHeader>
          <CardTitle>Descrição dos Papéis</CardTitle>
          <CardDescription>
            Entenda as permissões de cada tipo de usuário
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="border-l-4 border-red-600 pl-4">
              <h4 className="font-semibold">Administrador da Plataforma</h4>
              <p className="text-sm text-muted-foreground">
                Acesso total ao sistema. Pode criar empresas, gerenciar todos os usuários e acessar dados de todas as empresas.
                Múltiplas empresas: ✓
              </p>
            </div>
            <div className="border-l-4 border-orange-600 pl-4">
              <h4 className="font-semibold">Administrador da Empresa</h4>
              <p className="text-sm text-muted-foreground">
                Gerencia uma empresa específica. Pode convidar usuários, atribuir permissões e visualizar todos os dados da empresa.
                Múltiplas empresas: ✗ (apenas uma)
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-4">
              <h4 className="font-semibold">Engenheiro SST</h4>
              <p className="text-sm text-muted-foreground">
                Aplica diagnósticos IMSST, gera relatórios e cria planos de ação. Pode trabalhar com múltiplas empresas.
                Múltiplas empresas: ✓
              </p>
            </div>
            <div className="border-l-4 border-green-600 pl-4">
              <h4 className="font-semibold">Funcionário (Employer)</h4>
              <p className="text-sm text-muted-foreground">
                Acesso limitado por módulo. Pode responder questionários e visualizar informações conforme permissões concedidas.
                Múltiplas empresas: ✗ (apenas uma)
              </p>
            </div>
            <div className="border-l-4 border-gray-600 pl-4">
              <h4 className="font-semibold">Visualizador</h4>
              <p className="text-sm text-muted-foreground">
                Apenas visualização. Não pode editar ou criar conteúdo. Pode acessar múltiplas empresas.
                Múltiplas empresas: ✓
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
