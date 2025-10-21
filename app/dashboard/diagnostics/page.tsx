import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3, CheckCircle2, Clock, AlertCircle, FileEdit } from 'lucide-react'
import Link from 'next/link'
import { getAssessments } from '@/app/actions/assessments'

export default async function DiagnosticsPage() {
  const result = await getAssessments()

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

  const assessments = result.assessments || []

  const statusConfig = {
    DRAFT: { icon: FileEdit, color: 'text-gray-600', bg: 'bg-gray-100', label: 'Rascunho' },
    IN_PROGRESS: { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100', label: 'Em Andamento' },
    SUBMITTED: { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Submetido' },
    COMPLETED: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', label: 'Concluído' },
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Diagnósticos IMSST</h1>
          <p className="text-muted-foreground">
            Avaliação de maturidade em Segurança e Saúde do Trabalho ({assessments.length} total)
          </p>
        </div>
        <Link href="/dashboard/diagnostics/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Diagnóstico
          </Button>
        </Link>
      </div>

      {/* IMSST Info Card */}
      <Card className="border-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            O que é o IMSST?
          </CardTitle>
          <CardDescription>
            Índice de Maturidade do Sistema de Segurança do Trabalho
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            O IMSST avalia o nível de maturidade da gestão de SST da sua empresa em 5 dimensões fundamentais:
          </p>
          <div className="grid gap-3 md:grid-cols-5">
            <div className="bg-chart-1/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Liderança</div>
              <div className="text-xs text-muted-foreground mt-1">
                Comprometimento da alta direção
              </div>
            </div>
            <div className="bg-chart-2/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Processos</div>
              <div className="text-xs text-muted-foreground mt-1">
                Documentação e padronização
              </div>
            </div>
            <div className="bg-chart-3/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Conformidade</div>
              <div className="text-xs text-muted-foreground mt-1">
                Atendimento legal
              </div>
            </div>
            <div className="bg-chart-4/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Capacitação</div>
              <div className="text-xs text-muted-foreground mt-1">
                Treinamentos e conscientização
              </div>
            </div>
            <div className="bg-chart-5/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Dados</div>
              <div className="text-xs text-muted-foreground mt-1">
                Indicadores e análises
              </div>
            </div>
          </div>
          <div className="bg-primary/5 p-3 rounded-lg">
            <p className="text-sm">
              <strong>Níveis de Maturidade:</strong> 1 (Inicial) → 2 (Gerenciado) → 3 (Definido) → 4 (Quantitativamente Gerenciado) → 5 (Em Otimização)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Diagnósticos Realizados</h2>
        
        {assessments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum diagnóstico realizado
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Comece criando seu primeiro diagnóstico IMSST para avaliar o nível de maturidade da gestão de SST da sua empresa.
              </p>
              <Link href="/dashboard/diagnostics/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Primeiro Diagnóstico
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {assessments.map((assessment) => {
              const status = statusConfig[assessment.status]
              const StatusIcon = status.icon
              const totalQuestions = 25
              const progress = (assessment._count.answers / totalQuestions) * 100
              
              return (
                <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle>{assessment.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {assessment.company.name} • Criado em {new Date(assessment.createdAt).toLocaleDateString('pt-BR')}
                        </CardDescription>
                        {assessment.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {assessment.description}
                          </p>
                        )}
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg} ${status.color}`}>
                        <StatusIcon className="h-4 w-4" />
                        <span className="text-sm font-medium">{status.label}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assessment.status !== 'COMPLETED' && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="font-medium">
                              {assessment._count.answers}/{totalQuestions} perguntas
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        {assessment.status === 'COMPLETED' && assessment.scores.length > 0 && (
                          <>
                            <div className="flex-1">
                              <div className="text-2xl font-bold text-primary">
                                Nível {Math.round(assessment.scores.reduce((acc, s) => acc + s.level, 0) / assessment.scores.length)}
                              </div>
                              <div className="text-sm text-muted-foreground">Maturidade Média</div>
                            </div>
                            <div className="flex-1 text-center">
                              <div className="text-2xl font-bold text-primary">
                                {Math.round(assessment.scores.reduce((acc, s) => acc + s.score, 0) / assessment.scores.length)}%
                              </div>
                              <div className="text-sm text-muted-foreground">Pontuação Geral</div>
                            </div>
                          </>
                        )}
                        
                        <div className="flex gap-2 ml-auto">
                          <Link href={`/dashboard/diagnostics/${assessment.id}`}>
                            <Button variant="outline" size="sm">
                              {assessment.status === 'COMPLETED' ? 'Ver Resultados' : 'Continuar'}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
