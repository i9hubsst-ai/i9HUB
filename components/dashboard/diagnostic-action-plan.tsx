'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Loader2, Save, CheckCircle2, AlertCircle } from 'lucide-react'

interface DiagnosticActionPlanProps {
  assessment: {
    id: string
    status: string
    findings: Array<{ id: string }>
  }
}

interface ActionPlanItem {
  title: string
  description: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  estimatedDays: number
  reference: string | null
}

interface AIReport {
  executiveSummary: string
  actionPlan: ActionPlanItem[]
  metadata: {
    assessmentId: string
    companyName: string
    overallScore: number | null
    overallLevel: number | null
    findingsCount: number
    generatedAt: string
  }
}

const priorityConfig = {
  HIGH: {
    label: 'Alta',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
  MEDIUM: {
    label: 'Média',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  LOW: {
    label: 'Baixa',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  }
}

export function DiagnosticActionPlan({ assessment }: DiagnosticActionPlanProps) {
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState<AIReport | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canGenerateReport = 
    assessment.status === 'SCORED' && 
    assessment.findings.length > 0

  // Carregar planos salvos ao montar o componente
  useEffect(() => {
    async function loadSavedPlans() {
      try {
        const { getActionPlans } = await import('@/app/actions/action-plans')
        const result = await getActionPlans(assessment.id)
        
        if ('error' in result) {
          console.error('Erro ao carregar planos:', result.error)
          return
        }

        if (result.actionPlans && result.actionPlans.length > 0) {
          // Reconstituir o report a partir dos planos salvos
          setReport({
            executiveSummary: result.executiveSummary || '',
            actionPlan: result.actionPlans.map(plan => ({
              title: plan.title,
              description: plan.description,
              priority: plan.priority as 'HIGH' | 'MEDIUM' | 'LOW',
              estimatedDays: plan.dueDate 
                ? Math.ceil((new Date(plan.dueDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
                : 30,
              reference: plan.reference
            })),
            metadata: {
              assessmentId: assessment.id,
              companyName: '',
              overallScore: null,
              overallLevel: null,
              findingsCount: assessment.findings.length,
              generatedAt: new Date().toISOString()
            }
          })
        }
      } catch (err) {
        console.error('Erro ao carregar planos salvos:', err)
      } finally {
        setLoading(false)
      }
    }

    loadSavedPlans()
  }, [assessment.id, assessment.findings.length])

  const handleGenerateReport = async () => {
    setGenerating(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/report-writer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ assessmentId: assessment.id })
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erro ao gerar relatório')
      }

      setReport(data.report)
    } catch (err) {
      console.error('Erro:', err)
      setError(err instanceof Error ? err.message : 'Erro ao gerar relatório via IA')
    } finally {
      setGenerating(false)
    }
  }

  const handleSaveActionPlan = async () => {
    if (!report) return

    setSaving(true)
    setError(null)

    try {
      const { saveActionPlans } = await import('@/app/actions/action-plans')
      
      const result = await saveActionPlans(
        assessment.id,
        report.executiveSummary,
        report.actionPlan
      )

      if ('error' in result) {
        throw new Error(result.error)
      }

      alert(`${result.count} ações salvas com sucesso no banco de dados!`)
    } catch (err) {
      console.error('Erro:', err)
      setError(err instanceof Error ? err.message : 'Erro ao salvar plano de ação')
    } finally {
      setSaving(false)
    }
  }

  if (assessment.status !== 'SCORED') {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="text-base font-semibold text-gray-900">
              Diagnóstico não finalizado
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Finalize o diagnóstico e responda todas as perguntas para gerar o plano de ação.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (assessment.findings.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-base font-semibold text-gray-900">
              Nenhuma ação necessária
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              O diagnóstico não identificou achados que requerem ações corretivas.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto" />
            <p className="text-sm text-gray-600 mt-3">Carregando plano de ação...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!report) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <Sparkles className="h-12 w-12 text-teal-600 mx-auto" />
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Gerar Plano de Ação com IA
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                Nossa IA analisará os {assessment.findings.length} achados identificados e gerará um 
                plano de ação priorizado com recomendações específicas.
              </p>
            </div>
            <Button
              onClick={handleGenerateReport}
              disabled={generating || !canGenerateReport}
              className="bg-teal-600 hover:bg-teal-700"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando plano de ação...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar Plano de Ação com IA
                </>
              )}
            </Button>
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-teal-200 bg-teal-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base text-teal-900">
              ✓ Plano de Ação Gerado pela IA
            </CardTitle>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setReport(null)}
                disabled={saving}
              >
                Gerar Novamente
              </Button>
              <Button
                size="sm"
                onClick={handleSaveActionPlan}
                disabled={saving}
                className="bg-teal-600 hover:bg-teal-700"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-3 w-3" />
                    Salvar Plano
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-teal-800">
            <strong>{report.actionPlan.length} ações</strong> recomendadas pela IA
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo Executivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {report.executiveSummary}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">
          Ações Recomendadas ({report.actionPlan.length})
        </h3>
        
        {report.actionPlan.map((action, idx) => {
          const config = priorityConfig[action.priority]
          
          return (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        #{idx + 1}
                      </span>
                      <Badge className={config.className}>
                        Prioridade: {config.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {action.estimatedDays} dias
                      </Badge>
                    </div>
                    <CardTitle className="text-base text-gray-900">
                      {action.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  {action.description}
                </p>
                {action.reference && (
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    <span className="font-medium">Referência:</span>
                    <span>{action.reference}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  )
}
