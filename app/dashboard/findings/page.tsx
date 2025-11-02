import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function FindingsPage() {
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
          <h1 className="text-3xl font-bold text-primary">Achados</h1>
          <p className="text-muted-foreground mt-2">
            Não conformidades e oportunidades de melhoria identificadas nos diagnósticos
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-yellow-200 bg-yellow-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <AlertTriangle className="h-5 w-5" />
            Achados por Diagnóstico
          </CardTitle>
          <CardDescription>
            Os achados são gerados a partir das respostas dos diagnósticos. Para visualizar os achados, acesse um diagnóstico específico.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Cada diagnóstico pode ter múltiplos achados, classificados como:
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="destructive">Crítico</Badge>
            <Badge className="bg-orange-600">Alto</Badge>
            <Badge className="bg-yellow-600">Médio</Badge>
            <Badge className="bg-blue-600">Baixo</Badge>
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
            <li>Visão consolidada de todos os achados de múltiplos diagnósticos</li>
            <li>Filtros por status, criticidade, categoria e período</li>
            <li>Dashboard com gráficos de evolução dos achados</li>
            <li>Exportação de relatórios de achados</li>
            <li>Integração com planos de ação para rastreamento</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
