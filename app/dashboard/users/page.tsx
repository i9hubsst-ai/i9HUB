import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Shield, UserCog } from 'lucide-react'

export default function UsersPage() {
  const roles = [
    { key: 'PLATFORM_ADMIN', label: 'Administrador da Plataforma', icon: Shield, color: 'text-red-600' },
    { key: 'COMPANY_ADMIN', label: 'Administrador da Empresa', icon: UserCog, color: 'text-orange-600' },
    { key: 'ENGINEER', label: 'Engenheiro SST', icon: Users, color: 'text-blue-600' },
    { key: 'EMPLOYER', label: 'Funcionário', icon: Users, color: 'text-green-600' },
    { key: 'VIEWER', label: 'Visualizador', icon: Users, color: 'text-gray-600' },
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários e suas permissões
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Convidar Usuário
        </Button>
      </div>

      {/* Roles Overview */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Papéis e Permissões</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <Card key={role.key}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${role.color}`} />
                    <CardTitle className="text-base">{role.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-1">0</div>
                  <p className="text-sm text-muted-foreground">usuários</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Users List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Usuários</h2>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhum usuário cadastrado
            </h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Configure a autenticação do Supabase para começar a gerenciar usuários e convidar membros para sua empresa.
            </p>
          </CardContent>
        </Card>
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
