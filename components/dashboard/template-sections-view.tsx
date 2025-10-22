'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface Question {
  id: string
  text: string
  type: string
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

interface TemplateSectionsViewProps {
  sections: Section[]
}

export function TemplateSectionsView({ sections }: TemplateSectionsViewProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Seções e Perguntas</h2>
      {sections.map((section) => {
        const isExpanded = expandedSections[section.id] || false
        const questionCount = `${section.questions.length} pergunta${section.questions.length !== 1 ? 's' : ''}`

        return (
          <Card key={section.id}>
            <CardHeader
              className="cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-base">
                      {section.order}. {section.title}
                    </CardTitle>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {questionCount}
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
              <CardContent>
                <div className="space-y-3">
                  {section.questions.map((question, idx) => (
                    <div
                      key={question.id}
                      className="flex items-start gap-3 p-3 rounded-md bg-gray-50 text-sm"
                    >
                      <span className="font-medium text-gray-500 min-w-[2rem]">
                        {idx + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-900">{question.text}</p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                          <span className="bg-white px-2 py-0.5 rounded border">
                            Tipo: {question.type}
                          </span>
                          <span className="bg-white px-2 py-0.5 rounded border">
                            Peso: {question.weight}
                          </span>
                          {question.reference && (
                            <span className="bg-white px-2 py-0.5 rounded border">
                              {question.reference}
                            </span>
                          )}
                          {question.requiresJustification && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded border border-orange-200">
                              Justificativa obrigatória
                            </span>
                          )}
                          {question.requiresEvidence && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
                              Evidência obrigatória
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
