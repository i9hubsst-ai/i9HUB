'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle2, Save } from 'lucide-react'
import Link from 'next/link'
import { getAssessmentById, getQuestions, saveAnswer, submitAssessment } from '@/app/actions/assessments'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'

export default function DiagnosticDetailPage({ params }: { params: { id: string } }) {
  const [assessment, setAssessment] = useState<any>(null)
  const [dimensions, setDimensions] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      const [assessmentResult, questionsResult] = await Promise.all([
        getAssessmentById(params.id),
        getQuestions()
      ])

      if (assessmentResult.error || questionsResult.error) {
        setError(assessmentResult.error || questionsResult.error || 'Erro ao carregar dados')
        setLoading(false)
        return
      }

      setAssessment(assessmentResult.assessment)
      setDimensions(questionsResult.dimensions || [])

      const existingAnswers: Record<string, number> = {}
      assessmentResult.assessment?.answers?.forEach((answer: any) => {
        const value = typeof answer.value === 'number' ? answer.value : Number(answer.value)
        existingAnswers[answer.questionId] = value
      })
      setAnswers(existingAnswers)
      setLoading(false)
    }

    loadData()
  }, [params.id])

  const handleAnswer = async (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    setSaving(true)
    const result = await saveAnswer(params.id, questionId, value)
    setSaving(false)

    if (result.error) {
      setError(result.error)
    }
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    const result = await submitAssessment(params.id)
    
    if (result.error) {
      setError(result.error)
      setSubmitting(false)
    } else {
      window.location.reload()
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Carregando diagnóstico...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error && !assessment) {
    return (
      <div className="p-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <Link href="/dashboard/diagnostics">
              <Button className="mt-4">Voltar para Diagnósticos</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isCompleted = assessment?.status === 'COMPLETED'
  const totalQuestions = dimensions.reduce((acc, d) => acc + d.questions.length, 0)
  const answeredQuestions = Object.keys(answers).length
  const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0

  const radarData = assessment?.scores?.map((score: any, index: number) => ({
    dimension: dimensions.find(d => d.id === score.dimensionId)?.name || `Dimensão ${index + 1}`,
    value: score.score,
    level: score.level,
  })) || []

  return (
    <div className="p-8 space-y-6">
      <div>
        <Link 
          href="/dashboard/diagnostics" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Diagnósticos
        </Link>
        <h1 className="text-3xl font-bold text-primary">{assessment?.title}</h1>
        <p className="text-muted-foreground">
          {assessment?.company?.name} • {assessment?.description || 'Diagnóstico IMSST'}
        </p>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="py-4">
            <p className="text-destructive text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {!isCompleted && (
        <Card>
          <CardContent className="py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progresso</span>
              <span className="text-sm text-muted-foreground">
                {answeredQuestions}/{totalQuestions} perguntas respondidas
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            {saving && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                <Save className="h-3 w-3 animate-pulse" />
                Salvando automaticamente...
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {isCompleted && radarData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados do Diagnóstico</CardTitle>
            <CardDescription>Pontuação por dimensão IMSST</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="dimension" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Pontuação" dataKey="value" stroke="#1e3a8a" fill="#3b82f6" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {radarData.map((data: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        Nível {data.level}
                      </div>
                      <div className="text-sm font-medium mt-1">{data.dimension}</div>
                      <div className="text-xs text-muted-foreground">{Math.round(data.value)}%</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isCompleted && dimensions.map((dimension, dimIndex) => (
        <Card key={dimension.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{dimension.name}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {dimension.questions.filter((q: any) => answers[q.id] !== undefined).length}/{dimension.questions.length}
              </span>
            </CardTitle>
            {dimension.description && (
              <CardDescription>{dimension.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {dimension.questions.map((question: any) => (
              <div key={question.id} className="space-y-3">
                <p className="font-medium">{question.text}</p>
                {question.type === 'LIKERT' && (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => handleAnswer(question.id, value)}
                        className={`flex-1 py-3 px-2 rounded-lg border-2 transition-all ${
                          answers[question.id] === value
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border hover:border-primary/50'
                        }`}
                        disabled={isCompleted}
                      >
                        <div className="text-lg font-bold">{value}</div>
                        <div className="text-xs">
                          {value === 1 && 'Muito Baixo'}
                          {value === 2 && 'Baixo'}
                          {value === 3 && 'Médio'}
                          {value === 4 && 'Alto'}
                          {value === 5 && 'Muito Alto'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {!isCompleted && answeredQuestions === totalQuestions && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Todas as perguntas respondidas!</h3>
                <p className="text-sm text-green-700">
                  Finalize o diagnóstico para ver os resultados e gerar o relatório.
                </p>
              </div>
              <Button 
                onClick={handleSubmit} 
                disabled={submitting}
                className="gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                {submitting ? 'Finalizando...' : 'Finalizar Diagnóstico'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
