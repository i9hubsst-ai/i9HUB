'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  CheckCheck,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

type SuggestionType = 'add_question' | 'modify_question' | 'remove_question' | 'add_section' | 'reorganize' | 'update_reference'
type Priority = 'high' | 'medium' | 'low'

interface SuggestedQuestion {
  text: string
  type: 'BOOLEAN' | 'SCORE'
  weight: number
  reference?: string | null
  requiresJustification: boolean
  requiresEvidence: boolean
}

interface Suggestion {
  type: SuggestionType
  priority: Priority
  category: string
  description: string
  sectionTitle?: string
  currentQuestion?: string
  suggestedQuestion?: SuggestedQuestion
}

interface ReviewResult {
  overallAssessment: string
  strengths: string[]
  suggestions: Suggestion[]
}

interface TemplateReviewSuggestionsProps {
  templateName: string
  review: ReviewResult
  onApplySuggestions: (acceptedSuggestions: Suggestion[]) => void
  onClose: () => void
}

export function TemplateReviewSuggestions({
  templateName,
  review,
  onApplySuggestions,
  onClose
}: TemplateReviewSuggestionsProps) {
  const [acceptedSuggestions, setAcceptedSuggestions] = useState<Set<number>>(new Set())
  const [expandedSuggestions, setExpandedSuggestions] = useState<Set<number>>(new Set())

  const toggleSuggestion = (index: number) => {
    const newSet = new Set(acceptedSuggestions)
    if (newSet.has(index)) {
      newSet.delete(index)
    } else {
      newSet.add(index)
    }
    setAcceptedSuggestions(newSet)
  }

  const toggleExpanded = (index: number) => {
    const newSet = new Set(expandedSuggestions)
    if (newSet.has(index)) {
      newSet.delete(index)
    } else {
      newSet.add(index)
    }
    setExpandedSuggestions(newSet)
  }

  const acceptAllHigh = () => {
    const highPriorityIndices = review.suggestions
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.priority === 'high')
      .map(({ i }) => i)
    setAcceptedSuggestions(new Set(highPriorityIndices))
  }

  const handleApply = () => {
    const accepted = Array.from(acceptedSuggestions).map(i => review.suggestions[i])
    onApplySuggestions(accepted)
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case 'high': return <AlertCircle className="h-3 w-3" />
      case 'medium': return <AlertCircle className="h-3 w-3" />
      case 'low': return <AlertCircle className="h-3 w-3" />
    }
  }

  const getTypeLabel = (type: SuggestionType) => {
    const labels = {
      add_question: 'Adicionar Pergunta',
      modify_question: 'Modificar Pergunta',
      remove_question: 'Remover Pergunta',
      add_section: 'Adicionar Seção',
      reorganize: 'Reorganizar',
      update_reference: 'Atualizar Referência'
    }
    return labels[type]
  }

  return (
    <div className="space-y-4">
      {/* Avaliação Geral */}
      <Card className="border-teal-200 bg-teal-50">
        <CardHeader>
          <CardTitle className="text-base text-teal-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Revisão do Template: {templateName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-teal-800 mb-4">{review.overallAssessment}</p>
          
          {review.strengths.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-teal-900 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Pontos Fortes
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-teal-800">
                {review.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sugestões */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">
                {review.suggestions.length} Sugestões de Melhoria
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {acceptedSuggestions.size} selecionadas
              </CardDescription>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={acceptAllHigh}
              className="text-xs"
            >
              Aceitar Todas (Alta Prioridade)
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {review.suggestions.map((suggestion, index) => {
            const isAccepted = acceptedSuggestions.has(index)
            const isExpanded = expandedSuggestions.has(index)

            return (
              <div
                key={index}
                className={`border rounded-md p-3 transition-all ${
                  isAccepted ? 'border-green-300 bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleSuggestion(index)}
                    className="mt-1 flex-shrink-0"
                  >
                    {isAccepted ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
                    )}
                  </button>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-2 flex-wrap">
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(suggestion.priority)}`}>
                        {getPriorityIcon(suggestion.priority)}
                        <span className="ml-1">{suggestion.priority.toUpperCase()}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(suggestion.type)}
                      </Badge>
                      {suggestion.category && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          {suggestion.category}
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-gray-900">{suggestion.description}</p>

                    {(suggestion.sectionTitle || suggestion.currentQuestion || suggestion.suggestedQuestion) && (
                      <button
                        onClick={() => toggleExpanded(index)}
                        className="text-xs text-teal-600 hover:text-teal-700 flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Ocultar detalhes
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            Ver detalhes
                          </>
                        )}
                      </button>
                    )}

                    {isExpanded && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md space-y-2 text-xs">
                        {suggestion.sectionTitle && (
                          <div>
                            <span className="font-semibold text-gray-700">Seção: </span>
                            <span className="text-gray-600">{suggestion.sectionTitle}</span>
                          </div>
                        )}
                        {suggestion.currentQuestion && (
                          <div>
                            <span className="font-semibold text-gray-700">Pergunta Atual: </span>
                            <span className="text-gray-600">{suggestion.currentQuestion}</span>
                          </div>
                        )}
                        {suggestion.suggestedQuestion && (
                          <div className="space-y-1 border-t border-gray-200 pt-2 mt-2">
                            <div className="font-semibold text-gray-700">Sugestão:</div>
                            <div className="text-gray-600">{suggestion.suggestedQuestion.text}</div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {suggestion.suggestedQuestion.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Peso: {suggestion.suggestedQuestion.weight}
                              </Badge>
                              {suggestion.suggestedQuestion.reference && (
                                <Badge variant="outline" className="text-xs">
                                  {suggestion.suggestedQuestion.reference}
                                </Badge>
                              )}
                              {suggestion.suggestedQuestion.requiresJustification && (
                                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                                  Justificativa
                                </Badge>
                              )}
                              {suggestion.suggestedQuestion.requiresEvidence && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                                  Evidência
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex items-center justify-between gap-3 sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-4 -mb-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          <XCircle className="mr-2 h-4 w-4" />
          Cancelar
        </Button>
        <Button
          onClick={handleApply}
          disabled={acceptedSuggestions.size === 0}
          className="flex-1 bg-teal-600 hover:bg-teal-700"
        >
          <CheckCheck className="mr-2 h-4 w-4" />
          Aplicar {acceptedSuggestions.size} Sugestões
        </Button>
      </div>
    </div>
  )
}
