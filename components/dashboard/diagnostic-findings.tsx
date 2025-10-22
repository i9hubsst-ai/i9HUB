'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, FileText, CheckCircle2, XCircle } from 'lucide-react'

type FindingSeverity = 'HIGH' | 'MEDIUM' | 'LOW'
type QuestionType = 'BOOLEAN' | 'SCORE'

interface Finding {
  id: string
  sectionTitle: string
  questionText: string
  questionType: QuestionType
  value: number
  reference: string | null
  justification: string | null
  severity: FindingSeverity
  evidenceCount: number
  createdAt: Date
}

interface DiagnosticFindingsProps {
  assessment: {
    id: string
    findings: Finding[]
  }
}

const severityConfig = {
  HIGH: {
    label: 'Alta',
    className: 'bg-red-100 text-red-800 border-red-200',
    icon: XCircle,
    iconColor: 'text-red-600'
  },
  MEDIUM: {
    label: 'Média',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: AlertTriangle,
    iconColor: 'text-orange-600'
  },
  LOW: {
    label: 'Baixa',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600'
  }
}

export function DiagnosticFindings({ assessment }: DiagnosticFindingsProps) {
  const findings = assessment.findings || []

  const findingsBySection = findings.reduce((acc, finding) => {
    if (!acc[finding.sectionTitle]) {
      acc[finding.sectionTitle] = []
    }
    acc[finding.sectionTitle].push(finding)
    return acc
  }, {} as Record<string, Finding[]>)

  const stats = {
    high: findings.filter(f => f.severity === 'HIGH').length,
    medium: findings.filter(f => f.severity === 'MEDIUM').length,
    low: findings.filter(f => f.severity === 'LOW').length,
    total: findings.length
  }

  if (findings.length === 0) {
    const isCompleted = assessment.id && !['DRAFT', 'IN_PROGRESS'].includes(assessment.id)
    
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
            <h3 className="text-base font-semibold text-gray-900">
              Nenhum achado identificado
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {isCompleted 
                ? 'Todas as respostas estão conformes. O diagnóstico não identificou não conformidades.'
                : 'Os achados serão gerados automaticamente quando você finalizar o diagnóstico. Achados são criados para: respostas "Não" em perguntas booleanas ou pontuação ≤ 3 em perguntas de escala.'
              }
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumo de Achados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-xs text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.high}</div>
              <div className="text-xs text-gray-600">Alta</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.medium}</div>
              <div className="text-xs text-gray-600">Média</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.low}</div>
              <div className="text-xs text-gray-600">Baixa</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {Object.entries(findingsBySection).map(([sectionTitle, sectionFindings]) => (
        <Card key={sectionTitle}>
          <CardHeader>
            <CardTitle className="text-base text-gray-900">
              {sectionTitle}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({sectionFindings.length} {sectionFindings.length === 1 ? 'achado' : 'achados'})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectionFindings.map((finding) => {
              const config = severityConfig[finding.severity]
              const Icon = config.icon
              
              return (
                <div
                  key={finding.id}
                  className={`rounded-md border p-4 ${config.className}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${config.iconColor}`} />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-gray-900">
                          {finding.questionText}
                        </p>
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          Severidade: {config.label}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-xs text-gray-700">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Resposta:</span>
                          {finding.questionType === 'BOOLEAN' ? (
                            <span className="font-semibold text-red-700">
                              Não
                            </span>
                          ) : (
                            <span className="font-semibold text-red-700">
                              {finding.value}/5
                            </span>
                          )}
                        </div>

                        {finding.reference && (
                          <div className="flex items-start gap-2">
                            <span className="font-medium">Referência:</span>
                            <span>{finding.reference}</span>
                          </div>
                        )}

                        {finding.justification && (
                          <div className="flex items-start gap-2 mt-2">
                            <span className="font-medium">Justificativa:</span>
                            <span className="italic">{finding.justification}</span>
                          </div>
                        )}

                        {finding.evidenceCount > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            <FileText className="h-3 w-3" />
                            <span>{finding.evidenceCount} evidência(s) anexada(s)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
