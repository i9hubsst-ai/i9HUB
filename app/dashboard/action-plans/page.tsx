import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Target, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function ActionPlansPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/diagnostics-module">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Módulo
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Planos de Ação</h1>
          <p className="text-muted-foreground mt-2">
            Ações corretivas e preventivas para tratamento dos achados dos diagnósticos
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-orange-200 bg-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Target className="h-5 w-5" />
            Planos de Ação por Diagnóstico
          </CardTitle>
          <CardDescription>
            Os planos de ação são criados a partir das respostas dos diagnósticos. Para visualizar e gerenciar planos, acesse um diagnóstico específico.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Cada plano de ação contém:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
            <li>Descrição detalhada da ação</li>
            <li>Responsável pela execução</li>
            <li>Prazo para conclusão</li>
            <li>Status de acompanhamento</li>
            <li>Evidências de execução</li>
          </ul>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline">Pendente</Badge>
            <Badge className="bg-blue-600">Em Andamento</Badge>
            <Badge className="bg-green-600">Concluído</Badge>
            <Badge variant="destructive">Atrasado</Badge>
          </div>
          <div className="pt-4">
            <Link href="/dashboard/diagnostics">
              <Button>
                Ver Diagnósticos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Próximas funcionalidades */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades Futuras</CardTitle>
          <CardDescription>
            Esta página será expandida para incluir:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Visão consolidada de todos os planos de ação de múltiplos diagnósticos</li>
            <li>Dashboard de acompanhamento com indicadores de prazo e status</li>
            <li>Filtros por responsável, status, criticidade e período</li>
            <li>Notificações automáticas de prazos próximos do vencimento</li>
            <li>Kanban board para gestão visual dos planos</li>
            <li>Relatórios de efetividade das ações</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
