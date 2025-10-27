import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Wand2 } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface AISuggestion {
  title: string
  description: string | null
  questions: Array<{
    text: string
    type: 'BOOLEAN' | 'SCORE'
  }>
}

interface Props {
  type: string
  context?: string
}

export function TemplateSuggestionsDialog({ type, context }: Props) {
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestion | null>(null)
  const [loading, setLoading] = useState(false)

  const requestSuggestions = async () => {
    try {
      setLoading(true)
      const prompt = `Por favor, crie uma seção de auditoria para um template do tipo ${type}. 
      ${context ? `Considere o seguinte contexto adicional: ${context}` : ''}
      A seção deve incluir um título relevante, uma descrição opcional, e uma lista de questões 
      objetivas que podem ser respondidas com Sim/Não ou com uma pontuação.
      Retorne a resposta no formato JSON com a seguinte estrutura:
      {
        "title": "Título da Seção",
        "description": "Descrição opcional da seção ou null",
        "questions": [
          {
            "text": "Texto da questão",
            "type": "BOOLEAN" ou "SCORE"
          }
        ]
      }`

      const response = await fetch('/api/ai/template-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, context }),
      })

      if (!response.ok) {
        throw new Error('Erro ao obter sugestões')
      }

      const data = await response.json()
      const suggestions = JSON.parse(data.suggestions) as AISuggestion
      setAiSuggestion(suggestions)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao obter sugestões da IA')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="flex-none"
          disabled={loading}
          onClick={requestSuggestions}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Consultando IA...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Sugerir Seção
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Sugestões da IA</AlertDialogTitle>
          <AlertDialogDescription>
            A IA analisou o contexto e gerou uma sugestão de seção para seu template:
          </AlertDialogDescription>
        </AlertDialogHeader>

        {aiSuggestion && (
          <div className="space-y-4 my-4">
            <div>
              <h4 className="font-medium mb-2">{aiSuggestion.title}</h4>
              {aiSuggestion.description && (
                <p className="text-sm text-gray-600 mb-4">{aiSuggestion.description}</p>
              )}
              <div className="space-y-2">
                {aiSuggestion.questions.map((question: { text: string, type: string }, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-md text-sm">
                    <span className="text-gray-600 mr-2">{idx + 1}.</span>
                    <span>{question.text}</span>
                    <span className="ml-2 text-xs bg-white px-2 py-0.5 rounded border">
                      {question.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setAiSuggestion(null)}
          >
            Gerar Nova Sugestão
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}