'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

interface DiagnosticResumeProps {
  assessment: any
}

export function DiagnosticResume({ assessment }: DiagnosticResumeProps) {
  // Dados reais dos scores por seção
  const sections = (assessment.scores || []).map((score: any) => ({
    title: score.section?.title?.substring(0, 3) || 'N/A',
    score: score.weightedScore / 20, // Converte de 0-100 para 0-5
    label: score.section?.title || 'Sem título',
    fullScore: score.weightedScore
  }))

  const radarData = sections.map((section: any) => ({
    section: section.title,
    score: section.score,
  }))

  // Calcular score geral e nível de maturidade
  const overallScore = assessment.overallScore 
    ? assessment.overallScore / 20  // Converte de 0-100 para 0-5
    : sections.length > 0 
      ? sections.reduce((sum: number, s: any) => sum + s.score, 0) / sections.length 
      : 0

  const overallLevel = assessment.overallLevel || Math.ceil(overallScore)

  const levelLabel = ['', 'Inicial', 'Básico', 'Intermediário', 'Avançado', 'Otimizado'][overallLevel] || 'Inicial'

  // Contagem real de achados
  const findings = assessment.findings || []
  const nonCompliantCount = findings.filter((f: any) => f.severity === 'HIGH').length
  const opportunityCount = findings.filter((f: any) => f.severity === 'MEDIUM' || f.severity === 'LOW').length

  return (
    <div className="space-y-6">
      {/* Gráfico Radar + Score Geral */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{assessment.title}</CardTitle>
            <CardDescription>Visão geral do desempenho e pontuação de maturidade.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis 
                    dataKey="section" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 5]} 
                    tick={{ fill: '#64748b', fontSize: 10 }}
                  />
                  <Radar 
                    name="Pontuação" 
                    dataKey="score" 
                    stroke="#17a2b8" 
                    fill="#17a2b8" 
                    fillOpacity={0.5}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-teal-50 to-white border-teal-200">
            <CardContent className="pt-6 text-center">
              <div className="text-6xl font-bold text-teal-600 mb-2">
                {overallScore.toFixed(1)}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-1">Score Geral</div>
              <Badge className="bg-teal-600 text-white">{levelLabel}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <span className="text-xl">🔍</span>
                Resumo dos Achados
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium text-red-900">Não Conformidades</span>
                  </div>
                  <Badge className="bg-red-600 text-white">{nonCompliantCount}</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="font-medium text-yellow-900">Oportunidades</span>
                  </div>
                  <Badge className="bg-yellow-600 text-white">{opportunityCount}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Progresso e Respostas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <span className="text-xl">📊</span>
            Progresso e Respostas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(() => {
            const totalQuestions = assessment.template?.sections?.reduce(
              (total: number, section: any) => total + (section.questions?.length || 0), 
              0
            ) || 0
            const answeredQuestions = assessment.answers?.length || 0
            const progressPercent = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0

            return (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Perguntas Respondidas</span>
                  <span className="font-semibold">{answeredQuestions} de {totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-teal-600 h-3 rounded-full transition-all"
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
        <CardHeader>
          <CardTitle className="text-base">Pontuação por Seção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sections.map((section: any, index: number) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-48 font-medium text-sm">{section.label}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-teal-600 h-2 rounded-full transition-all"
                      style={{ width: `${(section.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="font-bold text-teal-600">{section.score.toFixed(1)}</span>
                  <span className="text-sm text-muted-foreground ml-1">/ 5.0</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
