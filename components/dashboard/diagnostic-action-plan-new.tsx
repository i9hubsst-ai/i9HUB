'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Loader2, 
  FileDown, 
  Filter,
  BarChart3,
  AlertCircle,
  ClipboardList,
  Calendar,
  User
} from 'lucide-react'
import { ActionPlanCard } from './action-plan-task-card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'

interface DiagnosticActionPlanProps {
  assessment: {
    id: string
    status: string
    findings: Array<{ id: string }>
  }
}

interface ActionPlanInfo {
  id: string
  number: string
  title: string
  description: string
  status: string
  startDate: Date | null
  endDate: Date | null
}

interface ActionPlanTask {
  id: string
  number: string
  what: string
  why: string | null
  where: string | null
  when: string | null
  who: string | null
  how: string | null
  howMuch: string | null
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  dueDate: Date | null
  reference: string | null
}

export function DiagnosticActionPlanNew({ assessment }: DiagnosticActionPlanProps) {
  const [generating, setGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [actionPlan, setActionPlan] = useState<ActionPlanInfo | null>(null)
  const [tasks, setTasks] = useState<ActionPlanTask[]>([])
  const [filteredTasks, setFilteredTasks] = useState<ActionPlanTask[]>([])
  const [error, setError] = useState<string | null>(null)
  
  // Filtros
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [responsibleFilter, setResponsibleFilter] = useState<string>('all')
  
  // Nova tarefa
  const [showNewTaskDialog, setShowNewTaskDialog] = useState(false)
  const [creatingTask, setCreatingTask] = useState(false)
  const [newTask, setNewTask] = useState({
    what: '',
    why: '',
    where: '',
    when: '',
    who: '',
    how: '',
    howMuch: '',
    priority: 2, // MEDIUM
    dueDate: '',
    reference: ''
  })

  const canGenerateReport = 
    assessment.status === 'SCORED' && 
    assessment.findings.length > 0

  // Carregar plano e tarefas
  useEffect(() => {
    async function loadActionPlan() {
      try {
        const { getActionPlans } = await import('@/app/actions/action-plans')
        const result = await getActionPlans(assessment.id)
        
        if ('error' in result) {
          console.error('Erro ao carregar plano:', result.error)
          setActionPlan(null)
          setTasks([])
          return
        }

        if (result.actionPlan) {
          setActionPlan(result.actionPlan)
          setTasks(result.tasks)
          setFilteredTasks(result.tasks)
        }
      } catch (err) {
        console.error('Erro ao carregar plano:', err)
      } finally {
        setLoading(false)
      }
    }

    loadActionPlan()
  }, [assessment.id, assessment.findings.length])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...tasks]

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(t => t.priority === priorityFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter)
    }

    if (responsibleFilter !== 'all') {
      filtered = filtered.filter(t => t.who?.includes(responsibleFilter))
    }

    setFilteredTasks(filtered)
  }, [priorityFilter, statusFilter, responsibleFilter, tasks])

  const handleGenerateWithAI = async () => {
    // Se já existe plano com tarefas, mostrar opção de otimização
    if (actionPlan && tasks.length > 0) {
      const confirmOptimize = confirm(
        `Já existe um plano de ação com ${tasks.length} tarefa(s).\n\n` +
        `A IA irá analisar as tarefas existentes e sugerir:\n` +
        `• Melhorias nas tarefas atuais\n` +
        `• Novas tarefas recomendadas\n` +
        `• Tarefas que podem ser removidas\n\n` +
        `Você poderá revisar as sugestões antes de aplicar.\n\n` +
        `Deseja continuar?`
      )

      if (!confirmOptimize) return

      // TODO: Implementar endpoint de otimização
      alert(
        'Funcionalidade de otimização em desenvolvimento.\n\n' +
        'Por enquanto, você pode:\n' +
        '• Adicionar tarefas manualmente com "Nova Tarefa"\n' +
        '• Editar tarefas existentes clicando em "Editar"\n' +
        '• Excluir tarefas desnecessárias'
      )
      return
    }

    // Se não existe plano, criar novo
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

      // Recarregar após geração
      window.location.reload()
    } catch (err) {
      console.error('Erro:', err)
      setError(err instanceof Error ? err.message : 'Erro ao gerar plano de ação via IA')
    } finally {
      setGenerating(false)
    }
  }

  const handleUpdateTask = async (id: string, updates: Partial<ActionPlanTask>) => {
    // Atualizar no estado local
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    )

    try {
      const { updateActionPlanTask } = await import('@/app/actions/action-plans')
      await updateActionPlanTask(id, {
        who: updates.who || undefined,
        how: updates.how || undefined,
        howMuch: updates.howMuch || undefined,
        status: updates.status
      })
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err)
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return

    setTasks(prev => prev.filter(task => task.id !== id))

    try {
      const { deleteActionPlanTask } = await import('@/app/actions/action-plans')
      await deleteActionPlanTask(id)
    } catch (err) {
      console.error('Erro ao excluir tarefa:', err)
    }
  }

  const handleCreateTask = async () => {
    if (!newTask.what.trim()) {
      alert('Por favor, preencha o campo "O quê" (obrigatório)')
      return
    }

    if (!actionPlan) {
      alert('Nenhum plano de ação encontrado')
      return
    }

    setCreatingTask(true)

    try {
      const { createActionPlanTask } = await import('@/app/actions/action-plans')
      const result = await createActionPlanTask(actionPlan.id, {
        what: newTask.what,
        why: newTask.why || undefined,
        where: newTask.where || undefined,
        when: newTask.when || undefined,
        who: newTask.who || undefined,
        how: newTask.how || undefined,
        howMuch: newTask.howMuch || undefined,
        priority: newTask.priority,
        dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
        reference: newTask.reference || undefined
      })

      if ('error' in result) {
        alert(result.error)
        return
      }

      // Limpar formulário e fechar dialog
      setNewTask({
        what: '',
        why: '',
        where: '',
        when: '',
        who: '',
        how: '',
        howMuch: '',
        priority: 2,
        dueDate: '',
        reference: ''
      })
      setShowNewTaskDialog(false)

      // Recarregar tarefas
      window.location.reload()
    } catch (err) {
      console.error('Erro ao criar tarefa:', err)
      alert('Erro ao criar tarefa')
    } finally {
      setCreatingTask(false)
    }
  }

  const handleExportPDF = () => {
    alert('Funcionalidade de exportação em desenvolvimento')
  }

  // Estatísticas
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'COMPLETED').length,
    inProgress: tasks.filter(t => t.status === 'IN_PROGRESS').length,
    pending: tasks.filter(t => t.status === 'PENDING').length,
    high: tasks.filter(t => t.priority === 'HIGH').length
  }

  // Lista de responsáveis únicos
  const responsibles = Array.from(new Set(tasks.map(t => t.who).filter(Boolean)))

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

  if (!canGenerateReport && !actionPlan) {
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
      {/* Info do Plano */}
      {actionPlan && (
        <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground font-mono font-bold">
                    {actionPlan.number}
                  </Badge>
                  <Badge variant="outline">
                    {stats.total} tarefas
                  </Badge>
                </div>
                <CardTitle className="text-lg">{actionPlan.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {actionPlan.description}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

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
              <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
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

      {/* Ações e Filtros */}
      <Card>
        <CardContent className="pt-4 space-y-4">
          {/* Botões de ação */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleGenerateWithAI}
              disabled={generating || !canGenerateReport}
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
                  {actionPlan && tasks.length > 0 ? 'Otimizar com IA' : 'Gerar com IA'}
                </>
              )}
            </Button>

            <Dialog open={showNewTaskDialog} onOpenChange={setShowNewTaskDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  disabled={!actionPlan}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Nova Tarefa
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Criar Nova Tarefa</DialogTitle>
                  <DialogDescription>
                    Preencha os campos abaixo para adicionar uma nova tarefa ao plano de ação (5W2H)
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* O quê - Obrigatório */}
                  <div>
                    <Label htmlFor="what">O quê? (Obrigatório) *</Label>
                    <Textarea
                      id="what"
                      value={newTask.what}
                      onChange={(e) => setNewTask({ ...newTask, what: e.target.value })}
                      placeholder="Descreva a atividade a ser realizada"
                      className="mt-1"
                      rows={3}
                    />
                  </div>

                  {/* Por quê */}
                  <div>
                    <Label htmlFor="why">Por quê?</Label>
                    <Textarea
                      id="why"
                      value={newTask.why}
                      onChange={(e) => setNewTask({ ...newTask, why: e.target.value })}
                      placeholder="Justificativa para a atividade"
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  {/* Onde */}
                  <div>
                    <Label htmlFor="where">Onde?</Label>
                    <Input
                      id="where"
                      value={newTask.where}
                      onChange={(e) => setNewTask({ ...newTask, where: e.target.value })}
                      placeholder="Local de execução"
                      className="mt-1"
                    />
                  </div>

                  {/* Quando */}
                  <div>
                    <Label htmlFor="when">Quando?</Label>
                    <Input
                      id="when"
                      value={newTask.when}
                      onChange={(e) => setNewTask({ ...newTask, when: e.target.value })}
                      placeholder="Prazo ou período"
                      className="mt-1"
                    />
                  </div>

                  {/* Quem */}
                  <div>
                    <Label htmlFor="who">Quem?</Label>
                    <Input
                      id="who"
                      value={newTask.who}
                      onChange={(e) => setNewTask({ ...newTask, who: e.target.value })}
                      placeholder="Responsável"
                      className="mt-1"
                    />
                  </div>

                  {/* Como */}
                  <div>
                    <Label htmlFor="how">Como?</Label>
                    <Textarea
                      id="how"
                      value={newTask.how}
                      onChange={(e) => setNewTask({ ...newTask, how: e.target.value })}
                      placeholder="Método de execução"
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  {/* Quanto */}
                  <div>
                    <Label htmlFor="howMuch">Quanto?</Label>
                    <Input
                      id="howMuch"
                      value={newTask.howMuch}
                      onChange={(e) => setNewTask({ ...newTask, howMuch: e.target.value })}
                      placeholder="Custo estimado"
                      className="mt-1"
                    />
                  </div>

                  {/* Prioridade */}
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select
                      value={String(newTask.priority)}
                      onValueChange={(value) => setNewTask({ ...newTask, priority: Number(value) })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Alta</SelectItem>
                        <SelectItem value="2">Média</SelectItem>
                        <SelectItem value="3">Baixa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Data de vencimento */}
                  <div>
                    <Label htmlFor="dueDate">Data de Vencimento</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  {/* Referência */}
                  <div>
                    <Label htmlFor="reference">Referência</Label>
                    <Input
                      id="reference"
                      value={newTask.reference}
                      onChange={(e) => setNewTask({ ...newTask, reference: e.target.value })}
                      placeholder="Ex: NR-12, ISO 45001, etc."
                      className="mt-1"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewTaskDialog(false)}
                    disabled={creatingTask}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateTask}
                    disabled={creatingTask || !newTask.what.trim()}
                  >
                    {creatingTask ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      'Criar Tarefa'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              onClick={handleExportPDF}
              disabled={tasks.length === 0}
              className="gap-2"
            >
              <FileDown className="h-4 w-4" />
              Exportar PDF
            </Button>
          </div>

          {/* Filtros */}
          {tasks.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtros:</span>
              </div>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px] h-9">
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
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="PENDING">Não iniciada</SelectItem>
                  <SelectItem value="IN_PROGRESS">Em andamento</SelectItem>
                  <SelectItem value="COMPLETED">Concluída</SelectItem>
                </SelectContent>
              </Select>

              {responsibles.length > 0 && (
                <Select value={responsibleFilter} onValueChange={setResponsibleFilter}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Responsável" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    {responsibles.map((resp) => (
                      <SelectItem key={resp} value={resp || ''}>
                        {resp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Lista de Tarefas */}
      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-3">
              <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-sm text-muted-foreground">
                {tasks.length === 0 
                  ? 'Nenhuma tarefa encontrada. Clique em "Gerar com IA" para criar automaticamente.'
                  : 'Nenhuma tarefa corresponde aos filtros selecionados.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <ActionPlanCard
                key={task.id}
                {...task}
                prazo={task.dueDate ? Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000)) : 0}
                prioridade={task.priority}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>

          {/* Resumo */}
          <Card className="bg-muted/50">
            <CardContent className="py-3">
              <p className="text-sm text-center text-muted-foreground">
                Exibindo <strong>{filteredTasks.length}</strong> de <strong>{tasks.length}</strong> tarefas •{' '}
                <strong>{stats.completed}</strong> concluídas ({tasks.length > 0 ? Math.round((stats.completed / tasks.length) * 100) : 0}%)
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-3">
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
