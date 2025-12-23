'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface DiagnosticResumeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assessment: any
}

export function DiagnosticResume({ assessment }: DiagnosticResumeProps) {
  // Dados reais dos scores por seção
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (assessment.scores || []).map((score: any) => ({
    title: score.section?.title || 'Sem título',
    score: score.weightedScore / 20, // Converte de 0-100 para 0-5
    label: score.section?.title || 'Sem título',
    fullScore: score.weightedScore,
    percentage: Math.round((score.weightedScore / 100) * 100) // Para tooltip
  }))

  // Dados para o gráfico de barras (ordenados por pontuação decrescente)
  const chartData = sections
    .sort((a: any, b: any) => b.score - a.score)
    .map((section: any, index: number) => ({
      name: section.title.length > 20 ? section.title.substring(0, 20) + '...' : section.title,
      score: section.score,
      fullName: section.title,
      percentage: section.percentage,
      color: section.score >= 4 ? '#10b981' : section.score >= 3 ? '#f59e0b' : '#ef4444'
    }))

  // Calcular score geral e nível de maturidade
  const overallScore = assessment.overallScore
    ? assessment.overallScore / 20  // Converte de 0-100 para 0-5
    : sections.length > 0
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? sections.reduce((sum: number, s: any) => sum + s.score, 0) / sections.length
      : 0

  const overallLevel = assessment.overallLevel || Math.ceil(overallScore)

  const levelLabel = ['', 'Inicial', 'Básico', 'Intermediário', 'Avançado', 'Otimizado'][overallLevel] || 'Inicial'

  // Contagem real de achados
  const findings = assessment.findings || []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nonCompliantCount = findings.filter((f: any) => f.severity === 'HIGH').length
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opportunityCount = findings.filter((f: any) => f.severity === 'MEDIUM' || f.severity === 'LOW').length

  return (
    <div className="space-y-4">
      {/* Gráfico Radar + Score Geral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">{assessment.title}</CardTitle>
            <CardDescription className="text-xs">Visão geral do desempenho e pontuação de maturidade.</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="horizontal"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    type="number"
                    domain={[0, 5]}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickCount={6}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    width={120}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-900">{data.fullName}</p>
                            <p className="text-sm text-gray-600">
                              Pontuação: <span className="font-bold text-teal-600">{payload[0].value?.toFixed(1)}/5</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Percentual: <span className="font-bold">{data.percentage}%</span>
                            </p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Excelente (4-5)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span>Bom (3-4)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Precisa Melhorar (0-3)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-teal-50 to-white border-teal-200">
            <CardContent className="pt-5 pb-4 text-center">
              <div className="text-4xl font-bold text-teal-600 mb-1.5">
                {overallScore.toFixed(1)}
              </div>
              <div className="text-sm font-semibold text-gray-700 mb-1">Score Geral</div>
              <Badge className="bg-teal-600 text-white text-xs">{levelLabel}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="text-base">🔍</span>
                Resumo dos Achados
            </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium text-red-900">Não Conformidades</span>
                  </div>
                  <Badge className="bg-red-600 text-white text-xs h-5">{nonCompliantCount}</Badge>
                </div>
                
                <div className="flex items-center justify-between p-2.5 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium text-yellow-900">Oportunidades</span>
                  </div>
                  <Badge className="bg-yellow-600 text-white text-xs h-5">{opportunityCount}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Progresso e Respostas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <span className="text-base">📊</span>
            Progresso e Respostas
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          {(() => {
            const totalQuestions = assessment.template?.sections?.reduce(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (total: number, section: any) => total + (section.questions?.length || 0), 
              0
            ) || 0
            const answeredQuestions = assessment.answers?.length || 0
            const progressPercent = Math.min(100, totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0)

            return (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Perguntas Respondidas</span>
                  <span className="text-sm font-semibold">{answeredQuestions} de {totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-teal-600 h-2 rounded-full transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </>
            )
          })()}
        </CardContent>
      </Card>

      {/* Scores por Seção */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Pontuação por Seção</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="space-y-2.5">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {sections.map((section: any, index: number) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-40 font-medium text-xs truncate" title={section.label}>{section.label}</div>
                <div className="flex-1 min-w-0">
                  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-teal-600 h-1.5 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (section.score / 5) * 100)}%` }}
                    />
                  </div>
                </div>
                <div className="w-14 text-right shrink-0">
                  <span className="font-bold text-teal-600 text-sm">{section.score.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground ml-0.5">/ 5</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
