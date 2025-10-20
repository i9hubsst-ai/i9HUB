import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Building2, Users, FileText } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da gestão de SST da sua empresa
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Empresas Ativas
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2</div>
            <p className="text-xs text-muted-foreground">
              +0% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Diagnósticos
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">0</div>
            <p className="text-xs text-muted-foreground">
              Nenhum diagnóstico realizado ainda
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuários
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">0</div>
            <p className="text-xs text-muted-foreground">
              Aguardando configuração do Supabase
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ações Pendentes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">0</div>
            <p className="text-xs text-muted-foreground">
              Nenhuma ação pendente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Diagnósticos Recentes</CardTitle>
            <CardDescription>
              Últimas avaliações IMSST realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              Nenhum diagnóstico encontrado
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações em Andamento</CardTitle>
            <CardDescription>
              Planos de ação em execução
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              Nenhuma ação em andamento
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Warning */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">
            ⚙️ Configuração Necessária
          </CardTitle>
          <CardDescription className="text-yellow-700">
            Para ativar todas as funcionalidades do HUBSST
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-yellow-700">
          <p>
            <strong>Próximos passos:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 ml-2">
            <li>Configure as credenciais do Supabase no arquivo .env</li>
            <li>Execute <code className="bg-yellow-100 px-2 py-0.5 rounded">npx prisma db push</code> para criar as tabelas</li>
            <li>Execute <code className="bg-yellow-100 px-2 py-0.5 rounded">npm run seed</code> para popular o banco</li>
            <li>Configure a OpenAI API Key para habilitar os assistentes de IA</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
