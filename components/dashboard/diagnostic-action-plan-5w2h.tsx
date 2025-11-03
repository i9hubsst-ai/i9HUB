'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Sparkles, 
  Loader2, 
  FileDown, 
  Filter,
  BarChart3,
  AlertCircle
} from 'lucide-react'
import { ActionPlanCard } from './action-plan-5w2h'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DiagnosticActionPlan5W2HProps {
  assessment: {
    id: string
    status: string
    findings: Array<{ id: string }>
  }
}

interface ActionPlan5W2H {
  id: string
  prioridade: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  prazo: number
  what: string
  why: string
  where: string
  when: string
  who: string
  how: string
  howMuch: string
  referencia: string
  origem: string
}

export function DiagnosticActionPlan5W2H({ assessment }: DiagnosticActionPlan5W2HProps) {
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionPlans, setActionPlans] = useState<ActionPlan5W2H[]>([])
  const [filteredPlans, setFilteredPlans] = useState<ActionPlan5W2H[]>([])
  const [error, setError] = useState<string | null>(null)
  
  // Filtros
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [responsibleFilter, setResponsibleFilter] = useState<string>('all')

  const canGenerateReport = 
    assessment.status === 'SCORED' && 
    assessment.findings.length > 0

  // Carregar planos salvos
  useEffect(() => {
    async function loadActionPlans() {
      try {
        const { getActionPlans } = await import('@/app/actions/action-plans')
        const result = await getActionPlans(assessment.id)
        
        if ('error' in result) {
          console.error('Erro ao carregar planos:', result.error)
          setActionPlans([])
          return
        }

        if (result.actionPlans && result.actionPlans.length > 0) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const plans: ActionPlan5W2H[] = result.actionPlans.map((plan: any, index: number) => ({
            id: plan.id,
            prioridade: plan.priority === 1 ? 'HIGH' : plan.priority === 2 ? 'MEDIUM' : 'LOW',
            status: plan.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED',
            prazo: plan.dueDate 
              ? Math.ceil((new Date(plan.dueDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
              : 30,
            what: plan.what || plan.title,
            why: plan.why || 'Necessidade identificada pelo diagnóstico IMSST',
            where: plan.where || 'Toda a estrutura organizacional',
            when: plan.when || (plan.dueDate ? new Date(plan.dueDate).toLocaleDateString('pt-BR') : 'A definir'),
            who: plan.who || plan.ownerUserId || 'A definir',
            how: plan.how || plan.description,
            howMuch: plan.howMuch || 'R$ 0,00',
            referencia: plan.reference || `Diagnóstico IMSST – Item ${index + 1}`,
            origem: plan.aiGenerated ? 'MA.IA' : 'Manual'
          }))
          
          setActionPlans(plans)
          setFilteredPlans(plans)
        }
      } catch (err) {
        console.error('Erro ao carregar planos:', err)
      } finally {
        setLoading(false)
      }
    }

    loadActionPlans()
  }, [assessment.id, assessment.findings.length])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...actionPlans]

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(p => p.prioridade === priorityFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter)
    }

    if (responsibleFilter !== 'all') {
      filtered = filtered.filter(p => p.who.includes(responsibleFilter))
    }

    setFilteredPlans(filtered)
  }, [priorityFilter, statusFilter, responsibleFilter, actionPlans])

  const handleGenerateWithAI = async () => {
    setGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/action-plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId: assessment.id })
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erro ao gerar plano de ação')
      }

      // Recarregar planos após geração
      window.location.reload()
    } catch (err) {
      console.error('Erro:', err)
      setError(err instanceof Error ? err.message : 'Erro ao gerar plano de ação via IA')
    } finally {
      setGenerating(false)
    }
  }

  const handleUpdatePlan = async (id: string, updates: Partial<ActionPlan5W2H>) => {
    // Atualizar no estado local
    setActionPlans(prev => 
      prev.map(plan => 
        plan.id === id ? { ...plan, ...updates } : plan
      )
    )

    // TODO: Chamar API para salvar no banco
    try {
      const { updateActionPlan } = await import('@/app/actions/action-plans')
      await updateActionPlan(id, {
        who: updates.who,
        how: updates.how,
        howMuch: updates.howMuch
      })
    } catch (err) {
      console.error('Erro ao atualizar plano:', err)
    }
  }

  const handleDeletePlan = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este plano de ação?')) return

    setActionPlans(prev => prev.filter(plan => plan.id !== id))

    try {
      const { deleteActionPlan } = await import('@/app/actions/action-plans')
      await deleteActionPlan(id)
    } catch (err) {
      console.error('Erro ao excluir plano:', err)
    }
  }

  const handleExportPDF = () => {
    // TODO: Implementar exportação para PDF
    alert('Funcionalidade de exportação em desenvolvimento')
  }

  // Estatísticas
  const stats = {
    total: actionPlans.length,
    completed: actionPlans.filter(p => p.status === 'COMPLETED').length,
    inProgress: actionPlans.filter(p => p.status === 'IN_PROGRESS').length,
    pending: actionPlans.filter(p => p.status === 'PENDING').length,
    high: actionPlans.filter(p => p.prioridade === 'HIGH').length
  }

  // Lista de responsáveis únicos
  const responsibles = Array.from(new Set(actionPlans.map(p => p.who)))

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!canGenerateReport && actionPlans.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <AlertCircle className="h-12 w-12 text-orange-500 mx-auto" />
            <h3 className="text-base font-semibold">Plano de Ação não disponível</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Para gerar um plano de ação, primeiro finalize o diagnóstico respondendo todas as perguntas.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-xs text-muted-foreground">Concluídas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-xs text-muted-foreground">Em Andamento</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-xs text-muted-foreground">Pendentes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.high}</div>
              <div className="text-xs text-muted-foreground">Alta Prioridade</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Ações */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Plano de Ação 5W2H
            </CardTitle>
            <div className="flex items-center gap-2">
              {canGenerateReport && (
                <Button
                  onClick={handleGenerateWithAI}
                  disabled={generating}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Gerar com IA
                    </>
                  )}
                </Button>
              )}
              <Button
                onClick={handleExportPDF}
                size="sm"
                className="gap-2"
                disabled={actionPlans.length === 0}
              >
                <FileDown className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="LOW">Baixa</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="PENDING">Não iniciada</SelectItem>
                <SelectItem value="IN_PROGRESS">Em andamento</SelectItem>
                <SelectItem value="COMPLETED">Concluída</SelectItem>
              </SelectContent>
            </Select>

            <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Responsável" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {responsibles.map(resp => (
                  <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Planos de Ação */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredPlans.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-3">
              <BarChart3 className="h-12 w-12 text-muted-foreground/50 mx-auto" />
              <h3 className="text-base font-semibold">Nenhum plano de ação encontrado</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {actionPlans.length === 0 
                  ? 'Gere um plano de ação usando a IA ou crie manualmente.' 
                  : 'Nenhum plano corresponde aos filtros selecionados.'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredPlans.map((plan) => (
            <ActionPlanCard
              key={plan.id}
              {...plan}
              onUpdate={handleUpdatePlan}
              onDelete={handleDeletePlan}
            />
          ))}
        </div>
      )}

      {/* Rodapé com Resumo */}
      {filteredPlans.length > 0 && (
        <Card className="bg-teal-50 border-teal-200">
          <CardContent className="py-3">
            <p className="text-sm text-center text-teal-900">
              Exibindo <strong>{filteredPlans.length}</strong> de <strong>{actionPlans.length}</strong> ações •{' '}
              <strong>{stats.completed}</strong> concluídas •{' '}
              <strong>{stats.pending}</strong> pendentes
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
