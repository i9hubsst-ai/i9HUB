import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3, CheckCircle2, Clock, AlertCircle, FileEdit, MoreVertical, Edit } from 'lucide-react'
import Link from 'next/link'
import { getAssessments } from '@/app/actions/assessments'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteAssessmentButton } from '@/components/dashboard/delete-assessment-button'

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Diagnósticos</h1>
          <p className="text-sm text-muted-foreground">
            Avaliação de maturidade em SST • {assessments.length} {assessments.length === 1 ? 'diagnóstico' : 'diagnósticos'}
          </p>
        </div>
        <Link href="/dashboard/diagnostics/new">
          <Button className="gap-2" size="sm">
            <Plus className="h-4 w-4" />
            Novo Diagnóstico
          </Button>
        </Link>
      </div>

      {/* Assessments List */}
      <div>
        
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
          <div className="grid gap-3">
            {assessments.map((assessment) => {
              const status = statusConfig[assessment.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              const totalQuestions = 25
              const progress = Math.min(100, (assessment._count.answers / totalQuestions) * 100)
              
              return (
                <Card key={assessment.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3 pt-4">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base">{assessment.title}</CardTitle>
                        <CardDescription className="mt-0.5 text-xs">
                          {assessment.company.name} • {new Date(assessment.createdAt).toLocaleDateString('pt-BR')}
                        </CardDescription>
                        {assessment.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {assessment.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${status.bg} ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="text-xs font-medium">{status.label}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/diagnostics/${assessment.id}`} className="cursor-pointer">
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DeleteAssessmentButton 
                              assessmentId={assessment.id} 
                              assessmentTitle={assessment.title}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <div className="space-y-2.5">
                      {assessment.status !== 'COMPLETED' && assessment.status !== 'SCORED' && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="bg-primary h-1.5 rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap font-medium">
                            {assessment._count.answers}/{totalQuestions}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        {(assessment.status === 'COMPLETED' || assessment.status === 'SCORED') && assessment.scores.length > 0 ? (
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="text-lg font-bold text-primary">
                                Nível {Math.round(assessment.scores.reduce((acc, s) => acc + s.level, 0) / assessment.scores.length)}
                              </div>
                              <div className="text-[10px] text-muted-foreground">Maturidade</div>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div>
                              <div className="text-lg font-bold text-primary">
                                {Math.round(assessment.scores.reduce((acc, s) => acc + s.weightedScore, 0) / assessment.scores.length)}%
                              </div>
                              <div className="text-[10px] text-muted-foreground">Pontuação</div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground">
                            {assessment.status === 'COMPLETED' || assessment.status === 'SCORED' ? 'Processando...' : 'Em andamento'}
                          </div>
                        )}
                        
                        <Link href={`/dashboard/diagnostics/${assessment.id}`}>
                          <Button size="sm" className="h-8">
                            {assessment.status === 'COMPLETED' || assessment.status === 'SCORED' ? 'Ver Resultados' : 'Continuar'}
                          </Button>
                        </Link>
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
