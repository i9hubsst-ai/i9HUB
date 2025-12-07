import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  ClipboardList, 
  AlertTriangle, 
  Target, 
  FileCheck, 
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  FileEdit
} from 'lucide-react'
import Link from 'next/link'
import { getDiagnosticsMetrics } from '@/app/actions/assessments'
import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function DiagnosticsModulePage() {
  const user = await getCurrentUser()
  
  if (!user) {
    return (
      <div className="p-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Usuário não autenticado</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const result = await getDiagnosticsMetrics()

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

  const metrics = result.metrics!

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Diagnósticos e Maturidade</h1>
        <p className="text-muted-foreground mt-2">
          Gestão completa de diagnósticos de SST - Templates, Avaliações, Achados, Planos de Ação e Evidências
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Diagnósticos</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.assessments.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.assessments.completed} concluídos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{metrics.assessments.inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.assessments.draft} rascunhos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achados Abertos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{metrics.findings.open}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.findings.total} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planos Pendentes</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{metrics.actionPlans.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {metrics.actionPlans.total} total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div>
        <div className="grid gap-0 grid-cols-5">
          {/* Templates */}
          <Link href="/dashboard/templates" className="block">
            <div className="bg-white hover:bg-primary/5 transition-colors cursor-pointer border-r border-b border-gray-200 p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <FileText className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1 text-sm">Templates</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Gerencie templates de diagnósticos temáticos (NR-12, ISO 45001, etc.)
                </p>
                <span className="text-3xl font-bold text-primary">{metrics.templates.total}</span>
                <span className="text-xs text-muted-foreground mt-1">Acessar</span>
              </div>
            </div>
          </Link>

          {/* Diagnósticos */}
          <Link href="/dashboard/diagnostics" className="block">
            <div className="bg-white hover:bg-primary/5 transition-colors cursor-pointer border-r border-b border-gray-200 p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <ClipboardList className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1 text-sm">Diagnósticos</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Visualize e gerencie todos os diagnósticos realizados
                </p>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Rascunhos</span>
                    <span className="font-semibold">{metrics.assessments.draft}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Em andamento</span>
                    <span className="font-semibold text-blue-600">{metrics.assessments.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Concluídos</span>
                    <span className="font-semibold text-green-600">{metrics.assessments.completed}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Achados */}
          <Link href="/dashboard/findings" className="block">
            <div className="bg-white hover:bg-primary/5 transition-colors cursor-pointer border-r border-b border-gray-200 p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <AlertTriangle className="h-8 w-8 text-yellow-600 mb-3" />
                <h3 className="font-semibold mb-1 text-sm">Achados</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Não conformidades e oportunidades de melhoria identificadas
                </p>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Abertos</span>
                    <span className="text-2xl font-bold text-yellow-600">{metrics.findings.open}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="text-xl font-bold">{metrics.findings.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Planos de Ação */}
          <Link href="/dashboard/action-plans" className="block">
            <div className="bg-white hover:bg-primary/5 transition-colors cursor-pointer border-r border-b border-gray-200 p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <Target className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="font-semibold mb-1 text-sm">Planos de Ação</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Ações corretivas e preventivas para tratamento dos achados
                </p>
                <div className="space-y-1 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Pendentes</span>
                    <span className="text-2xl font-bold text-orange-600">{metrics.actionPlans.pending}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Total</span>
                    <span className="text-xl font-bold">{metrics.actionPlans.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Evidências */}
          <Link href="/dashboard/evidence" className="block">
            <div className="bg-white hover:bg-primary/5 transition-colors cursor-pointer border-b border-gray-200 p-6 h-full">
              <div className="flex flex-col items-center text-center">
                <FileCheck className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold mb-1 text-sm">Evidências</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Documentos e comprovações das ações realizadas
                </p>
                <span className="text-3xl font-bold text-primary">{metrics.evidence.total}</span>
                <span className="text-xs text-muted-foreground mt-1">Acessar</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Informações sobre o Fluxo */}
      <Card className="border-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Fluxo do Módulo de Diagnósticos
          </CardTitle>
          <CardDescription>
            Entenda como funciona o processo completo de diagnóstico de SST
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-primary/5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">1. Templates</h3>
              <p className="text-xs text-muted-foreground">
                Escolha ou crie um template temático com perguntas estruturadas
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-blue-50">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">2. Diagnóstico</h3>
              <p className="text-xs text-muted-foreground">
                Responda às perguntas e avalie o nível de maturidade
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-yellow-50">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-1">3. Achados</h3>
              <p className="text-xs text-muted-foreground">
                Identifique não conformidades e oportunidades de melhoria
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-orange-50">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-1">4. Planos de Ação</h3>
              <p className="text-xs text-muted-foreground">
                Defina ações corretivas com prazos e responsáveis
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-green-50">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <FileCheck className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">5. Evidências</h3>
              <p className="text-xs text-muted-foreground">
                Anexe documentos que comprovem a execução das ações
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-accent/10 rounded-lg">
            <p className="text-sm text-center">
              <strong>Dica:</strong> O módulo de diagnósticos é cíclico. Após concluir um ciclo, você pode iniciar um novo diagnóstico para avaliar a evolução da maturidade de SST ao longo do tempo.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
