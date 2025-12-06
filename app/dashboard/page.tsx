import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Building2, Users, FileText, TrendingUp } from 'lucide-react'
import { getDashboardStats } from '@/app/actions/dashboard'
import Link from 'next/link'
import { AssessmentStatusChart } from '@/components/dashboard/charts/assessment-status-chart'
import { AssessmentTrendChart } from '@/components/dashboard/charts/assessment-trend-chart'
import { FindingsCategoryChart } from '@/components/dashboard/charts/findings-category-chart'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const result = await getDashboardStats()

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

  const { stats, recentAssessments, charts } = result

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da gestão de SST
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Empresas Ativas
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats?.totalCompanies || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalCompanies === 0 ? 'Crie sua primeira empresa' : 'Total no sistema'}
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
            <div className="text-2xl font-bold text-primary">{stats?.totalAssessments || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalAssessments === 0 ? 'Crie seu primeiro diagnóstico' : 'Total realizados'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuários Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalUsers === 0 ? 'Convide membros' : 'Total de membros'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Planos de Ação
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats?.totalActions || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.totalActions === 0 ? 'Nenhuma ação criada' : 'Total de ações'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-6 md:grid-cols-2">
        <AssessmentTrendChart data={charts?.assessmentTrend || []} />
        <AssessmentStatusChart data={charts?.assessmentStatus || { inProgress: 0, completed: 0, pending: 0 }} />
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <FindingsCategoryChart data={charts?.findingsByCategory || []} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Diagnósticos Recentes</CardTitle>
            <CardDescription>
              Últimas avaliações IMSST realizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!recentAssessments || recentAssessments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                <BarChart3 className="h-8 w-8 mb-2 opacity-50" />
                <p>Nenhum diagnóstico encontrado</p>
                <Link href="/dashboard/diagnostics/new" className="text-primary text-sm mt-2 hover:underline">
                  Criar primeiro diagnóstico
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentAssessments.map((assessment: any) => (
                  <li key={assessment.id} className="border-b pb-3 last:border-0">
                    <Link href={`/dashboard/diagnostics/${assessment.id}`} className="hover:text-primary">
                      <div className="font-medium">{assessment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {assessment.company.name} • {assessment.status} • {new Date(assessment.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      {assessment.scores && assessment.scores.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Nível {Math.round(assessment.scores.reduce((acc: number, s: any) => acc + s.level, 0) / assessment.scores.length)}
                        </div>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
            <CardDescription>
              Recomendações para utilizar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              {stats?.totalCompanies === 0 && (
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <div className="font-medium">Criar Empresa</div>
                    <Link href="/dashboard/companies/new" className="text-muted-foreground hover:text-primary">
                      Configure sua primeira empresa no sistema
                    </Link>
                  </div>
                </li>
              )}
              {stats?.totalAssessments === 0 && (
                <li className="flex items-start gap-2">
                  <div className="bg-primary/10 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {stats?.totalCompanies === 0 ? '2' : '1'}
                  </div>
                  <div>
                    <div className="font-medium">Realizar Diagnóstico</div>
                    <Link href="/dashboard/diagnostics/new" className="text-muted-foreground hover:text-primary">
                      Avalie o nível de maturidade SST da sua empresa
                    </Link>
                  </div>
                </li>
              )}
              <li className="flex items-start gap-2">
                <div className="bg-accent/50 text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 className="h-3 w-3" />
                </div>
                <div>
                  <div className="font-medium">Gerenciar Equipe</div>
                  <Link href="/dashboard/users" className="text-muted-foreground hover:text-primary">
                    Convide membros e configure permissões
                  </Link>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
