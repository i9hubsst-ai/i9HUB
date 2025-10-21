'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Sparkles, Save, Eye } from 'lucide-react'

type TemplateType = 'NR12' | 'NR35' | 'ISO45001' | 'ISO14001' | 'IMSST' | 'CUSTOM'

interface GeneratedSection {
  title: string
  description: string | null
  order: number
  questions: Array<{
    text: string
    type: 'BOOLEAN' | 'SCORE'
    weight: number
    reference: string | null
    requiresJustification: boolean
  }>
}

export function TemplateBuilderForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<TemplateType>('CUSTOM')
  const [context, setContext] = useState('')
  
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [generatedTemplate, setGeneratedTemplate] = useState<{
    name: string
    description: string
    type: string
    sections: GeneratedSection[]
  } | null>(null)

  const handleGenerate = async () => {
    if (!name.trim() || !description.trim()) {
      alert('Nome e descrição são obrigatórios')
      return
    }

    setGenerating(true)

    try {
      const response = await fetch('/api/ai/template-builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, type, context: context.trim() || undefined })
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erro ao gerar template')
      }

      setGeneratedTemplate(data.template)
    } catch (error) {
      console.error('Erro:', error)
      alert(error instanceof Error ? error.message : 'Erro ao gerar template via IA')
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedTemplate) return

    setSaving(true)

    try {
      // Salvar template no banco via server action
      const response = await fetch('/api/templates/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generatedTemplate)
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Erro ao salvar template')
      }

      router.push(`/dashboard/templates/${data.templateId}`)
    } catch (error) {
      console.error('Erro:', error)
      alert(error instanceof Error ? error.message : 'Erro ao salvar template')
    } finally {
      setSaving(false)
    }
  }

  const totalQuestions = generatedTemplate?.sections.reduce(
    (sum, section) => sum + section.questions.length,
    0
  ) || 0

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Configuração do Template</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Template *</Label>
            <Textarea
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Diagnóstico NR-12 - Segurança em Máquinas"
              className="min-h-[60px]"
              disabled={generating || !!generatedTemplate}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o objetivo e escopo deste template..."
              className="min-h-[80px]"
              disabled={generating || !!generatedTemplate}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Template</Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as TemplateType)}
              disabled={generating || !!generatedTemplate}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NR12">NR-12 - Segurança em Máquinas</SelectItem>
                <SelectItem value="NR35">NR-35 - Trabalho em Altura</SelectItem>
                <SelectItem value="ISO45001">ISO 45001 - Gestão de SST</SelectItem>
                <SelectItem value="ISO14001">ISO 14001 - Gestão Ambiental</SelectItem>
                <SelectItem value="IMSST">IMSST - Maturidade SST</SelectItem>
                <SelectItem value="CUSTOM">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="context">Contexto Adicional (Opcional)</Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Informações adicionais que a IA deve considerar ao gerar o template (setor industrial, riscos específicos, etc.)"
              className="min-h-[100px]"
              disabled={generating || !!generatedTemplate}
            />
          </div>

          {!generatedTemplate && (
            <Button
              onClick={handleGenerate}
              disabled={generating || !name.trim() || !description.trim()}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando template com IA...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Gerar Template com IA
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {generatedTemplate && (
        <>
          <Card className="border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="text-base text-teal-900">
                ✓ Template Gerado com Sucesso!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-teal-800">
                  <strong>{generatedTemplate.sections.length} seções</strong> com{' '}
                  <strong>{totalQuestions} perguntas</strong> geradas
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Template
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedTemplate(null)}
                    disabled={saving}
                  >
                    Gerar Novamente
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {generatedTemplate.sections.map((section, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {section.title}
                  </CardTitle>
                  {section.description && (
                    <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {section.questions.map((question, qIdx) => (
                      <div
                        key={qIdx}
                        className="flex items-start gap-3 p-3 rounded-md bg-gray-50 text-sm"
                      >
                        <span className="font-medium text-gray-500 min-w-[2rem]">
                          {qIdx + 1}.
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
