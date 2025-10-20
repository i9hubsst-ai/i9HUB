import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ActionsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Planos de Ação</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie os planos de ação de SST
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Ações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Andamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Ações</CardTitle>
          <CardDescription>
            Ações geradas a partir dos diagnósticos IMSST
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Nenhum plano de ação criado
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              Os planos de ação são gerados automaticamente após a conclusão de um diagnóstico IMSST. A IA analisa os resultados e sugere ações corretivas e preventivas personalizadas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Como funcionam os Planos de Ação?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Os planos de ação do HUBSST são gerados automaticamente pelo assistente de IA após cada diagnóstico IMSST completado.
          </p>
          <div className="bg-accent/10 p-4 rounded-lg space-y-2">
            <p><strong>Categorias de Ações:</strong></p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li><strong>NR Compliance:</strong> Adequação às Normas Regulamentadoras</li>
              <li><strong>Processos:</strong> Melhoria de processos internos de SST</li>
              <li><strong>Treinamento:</strong> Capacitações e conscientização</li>
              <li><strong>Gestão:</strong> Aspectos administrativos e de liderança</li>
              <li><strong>Outros:</strong> Ações específicas da realidade da empresa</li>
            </ul>
          </div>
          <p>
            Cada ação inclui: título, descrição detalhada, categoria, prioridade (1-5), responsável sugerido e prazo estimado.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
