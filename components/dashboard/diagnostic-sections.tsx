'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { saveAnswer, submitAssessment } from '@/app/actions/assessments'
import { Check, X, AlertTriangle, Loader2, FileText, ChevronDown, ChevronUp, Send } from 'lucide-react'
import { EvidenceUpload } from './evidence-upload'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

type QuestionType = 'BOOLEAN' | 'SCORE'

interface Question {
  id: string
  text: string
  type: QuestionType
  weight: number
  reference: string | null
  requiresJustification: boolean
  requiresEvidence: boolean
}

interface Section {
  id: string
  title: string
  description: string | null
  order: number
  questions: Question[]
}

interface Evidence {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
  uploadedAt: Date
}

interface Answer {
  id: string
  questionId: string
  value: number
  justification: string | null
  evidences?: Evidence[]
}

interface DiagnosticSectionsProps {
  assessment: {
    id: string
    status: string
    template: {
      sections: Section[]
    } | null
    answers: Answer[]
  }
}

export function DiagnosticSections({ assessment }: DiagnosticSectionsProps) {
  const [answers, setAnswers] = useState<Record<string, { value: number | null; justification: string }>>(() => {
    const initial: Record<string, { value: number | null; justification: string }> = {}
    assessment.answers.forEach(answer => {
      initial[answer.questionId] = {
        value: answer.value,
        justification: answer.justification || ''
      }
    })
    return initial
  })
  
  const [answerIds, setAnswerIds] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    assessment.answers.forEach(answer => {
      initial[answer.questionId] = answer.id
    })
    return initial
  })
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [submitting, setSubmitting] = useState(false)
  
  const router = useRouter()
  const { toast } = useToast()

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  if (!assessment.template) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-base font-semibold">Template não encontrado</h3>
            <p className="text-sm text-muted-foreground">
              Este diagnóstico não possui um template associado.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isReadOnly = assessment.status !== 'IN_PROGRESS' && assessment.status !== 'DRAFT'

  const handleAnswer = async (questionId: string, value: number, requiresJustification: boolean, requiresEvidence: boolean) => {
    const currentAnswer = answers[questionId] || { value: null, justification: '' }

    const newErrors = { ...errors }
    delete newErrors[questionId]
    setErrors(newErrors)

    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...currentAnswer, value }
    }))

    if (!requiresJustification && !requiresEvidence) {
      setSaving(questionId)
      
      const result = await saveAnswer(
        assessment.id,
        questionId,
        value,
        undefined
      )
      
      if ('error' in result) {
        setErrors({ ...errors, [questionId]: result.error })
      } else if (result.answer) {
        setAnswerIds(prev => ({
          ...prev,
          [questionId]: result.answer.id
        }))
      }
      
      setSaving(null)
    }
  }

  const handleJustificationChange = (questionId: string, justification: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { ...prev[questionId], justification }
    }))
    
    const newErrors = { ...errors }
    delete newErrors[questionId]
    setErrors(newErrors)
  }

  const handleSaveResponse = async (questionId: string, requiresJustification: boolean) => {
    const currentAnswer = answers[questionId]
    
    if (!currentAnswer || currentAnswer.value === null) {
      setErrors({ ...errors, [questionId]: 'Selecione uma resposta primeiro' })
      return
    }

    if (requiresJustification && !currentAnswer.justification.trim()) {
      setErrors({ ...errors, [questionId]: 'Justificativa obrigatória para esta resposta' })
      return
    }

    setSaving(questionId)
    
    const result = await saveAnswer(
      assessment.id,
      questionId,
      currentAnswer.value,
      currentAnswer.justification.trim() || undefined
    )
    
    setSaving(null)
    
    if ('error' in result) {
      setErrors({ ...errors, [questionId]: result.error })
    } else if (result.answer) {
      setAnswerIds(prev => ({
        ...prev,
        [questionId]: result.answer.id
      }))
    }
  }

  const handleSubmitAssessment = async () => {
    if (!assessment.template) return

    // Verificar se todas as perguntas foram respondidas
    const totalQuestions = assessment.template.sections.reduce(
      (sum, section) => sum + section.questions.length,
      0
    )
    const answeredQuestions = Object.keys(answerIds).length

    if (answeredQuestions < totalQuestions) {
      toast({
        title: 'Diagnóstico incompleto',
        description: `Por favor, responda todas as ${totalQuestions} perguntas antes de finalizar (${answeredQuestions}/${totalQuestions} respondidas)`,
        variant: 'destructive'
      })
      return
    }

    setSubmitting(true)

    const result = await submitAssessment(assessment.id)

    if ('error' in result) {
      toast({
        title: 'Erro ao finalizar diagnóstico',
        description: result.error,
        variant: 'destructive'
      })
      setSubmitting(false)
    } else {
      toast({
        title: 'Diagnóstico finalizado!',
        description: 'Os achados foram gerados automaticamente com base nas suas respostas.',
      })
      router.refresh()
    }
  }

  return (
    <div className="space-y-6">
      {isReadOnly && (
        <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-blue-600" />
            <p className="text-sm font-medium text-blue-800">
              Diagnóstico finalizado - Somente leitura
            </p>
          </div>
        </div>
      )}

      {assessment.template.sections.map((section) => {
        const isExpanded = expandedSections[section.id] || false
        const sectionAnswers = section.questions.filter(q => {
          const answer = answers[q.id]
          return answer?.value !== undefined && answer?.value !== null
        })
        const progressText = `${sectionAnswers.length}/${section.questions.length} respondidas`
        
        return (
          <Card key={section.id}>
            <CardHeader 
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base text-gray-900">
                      {section.title}
                    </CardTitle>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {progressText}
                    </span>
                  </div>
                  {section.description && isExpanded && (
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSection(section.id)
                  }}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            {isExpanded && (
              <CardContent className="space-y-6">
            {section.questions.map((question, idx) => {
              const localAnswer = answers[question.id]
              const answerId = answerIds[question.id]
              const savedAnswer = assessment.answers.find(a => a.questionId === question.id)
              const hasAnswer = localAnswer && localAnswer.value !== null
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const hasJustification = localAnswer?.justification && localAnswer.justification.trim().length > 0
              const error = errors[question.id]
              const isSaving = saving === question.id

              return (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-medium text-gray-500 mt-1 min-w-[2rem]">
                      {idx + 1}.
                    </span>
                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-sm text-gray-900">{question.text}</p>
                        {question.reference && (
                          <p className="text-xs text-gray-500 mt-1">
                            Referência: {question.reference}
                          </p>
                        )}
                        {(question.requiresJustification || question.requiresEvidence) && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {question.requiresJustification && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded border border-orange-200">
                                Justificativa obrigatória
                              </span>
                            )}
                            {question.requiresEvidence && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                                Evidência obrigatória
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {question.type === 'BOOLEAN' ? (
                          <>
                            <Button
                              variant={localAnswer?.value === 1 ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleAnswer(question.id, 1, question.requiresJustification, question.requiresEvidence)}
                              disabled={isReadOnly || isSaving}
                              className={localAnswer?.value === 1 ? 'bg-green-600 hover:bg-green-700' : ''}
                            >
                              {isSaving && localAnswer?.value === 1 ? (
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                              ) : (
                                <Check className="mr-2 h-3 w-3" />
                              )}
                              Sim
                            </Button>
                            <Button
                              variant={localAnswer?.value === 0 ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleAnswer(question.id, 0, question.requiresJustification, question.requiresEvidence)}
                              disabled={isReadOnly || isSaving}
                              className={localAnswer?.value === 0 ? 'bg-red-600 hover:bg-red-700' : ''}
                            >
                              {isSaving && localAnswer?.value === 0 ? (
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                              ) : (
                                <X className="mr-2 h-3 w-3" />
                              )}
                              Não
                            </Button>
                          </>
                        ) : (
                          <>
                            {[1, 2, 3, 4, 5].map((score) => (
                              <Button
                                key={score}
                                variant={localAnswer?.value === score ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => handleAnswer(question.id, score, question.requiresJustification, question.requiresEvidence)}
                                disabled={isReadOnly || isSaving}
                                className={localAnswer?.value === score ? 'bg-teal-600 hover:bg-teal-700' : ''}
                              >
                                {isSaving && localAnswer?.value === score && (
                                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                )}
                                {score}
                              </Button>
                            ))}
                            <span className="text-xs text-gray-500 self-center ml-2">
                              (1=Muito Baixo, 5=Excelente)
                            </span>
                          </>
                        )}
                      </div>

                      {(question.requiresJustification || question.requiresEvidence) && hasAnswer && (
                        <div className="space-y-2">
                          {question.requiresJustification && (
                            <>
                              <Label htmlFor={`justification-${question.id}`} className="text-sm font-medium text-orange-700">
                                Justificativa obrigatória *
                              </Label>
                              <Textarea
                                id={`justification-${question.id}`}
                                value={localAnswer?.justification || ''}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleJustificationChange(question.id, e.target.value)}
                                placeholder="Descreva a justificativa para esta resposta..."
                                className="min-h-[80px] text-sm"
                                disabled={isReadOnly}
                              />
                            </>
                          )}
                          {!isReadOnly && (
                            <Button
                              size="sm"
                              className="bg-teal-600 hover:bg-teal-700"
                              onClick={() => handleSaveResponse(question.id, question.requiresJustification)}
                              disabled={isSaving}
                            >
                              {isSaving ? (
                                <>
                                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                  Salvando...
                                </>
                              ) : (
                                <>
                                  <Check className="mr-2 h-3 w-3" />
                                  {answerId ? 'Atualizar Resposta' : 'Salvar Resposta'}
                                </>
                              )}
                            </Button>
                          )}
                          {answerId && (
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              Resposta salva com sucesso
                            </p>
                          )}
                        </div>
                      )}

                      {!question.requiresJustification && !question.requiresEvidence && hasAnswer && answerId && !isReadOnly && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Check className="h-3 w-3" />
                          Resposta salva com sucesso
                        </p>
                      )}

                      {question.requiresEvidence && hasAnswer && answerId && (
                        <div className="pt-2 border-t border-gray-100">
                          <EvidenceUpload
                            assessmentId={assessment.id}
                            answerId={answerId}
                            existingEvidences={savedAnswer?.evidences || []}
                            disabled={isReadOnly}
                          />
                        </div>
                      )}

                      {error && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {error}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
              </CardContent>
            )}
          </Card>
        )
      })}

      {!isReadOnly && assessment.template && (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-primary">Pronto para finalizar?</h3>
                <p className="text-sm text-muted-foreground">
                  Ao finalizar, os achados serão gerados automaticamente com base nas suas respostas.
                </p>
              </div>
              <Button 
                onClick={handleSubmitAssessment}
                disabled={submitting}
                size="lg"
                className="gap-2 min-w-[180px]"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Finalizando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Finalizar Diagnóstico
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
