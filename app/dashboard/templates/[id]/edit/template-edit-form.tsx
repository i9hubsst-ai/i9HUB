'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Plus, Trash2, GripVertical, Save } from 'lucide-react'
import Link from 'next/link'
import { updateTemplate } from '@/app/actions/templates'

interface Question {
  id?: string
  text: string
  type: string
  weight: number
  reference?: string
  requiresJustification: boolean
  requiresEvidence: boolean
}

interface Section {
  id?: string
  title: string
  order: number
  questions: Question[]
}

interface TemplateEditFormProps {
  template: {
    id: string
    name: string
    description: string
    sections: Array<{
      id: string
      title: string
      order: number
      questions: Array<{
        id: string
        text: string
        type: string
        weight: number
        reference: string | null
        requiresJustification: boolean
        requiresEvidence: boolean
      }>
    }>
  }
}

export function TemplateEditForm({ template }: TemplateEditFormProps) {
  const router = useRouter()
  const [name, setName] = useState(template.name)
  const [description, setDescription] = useState(template.description)
  const [sections, setSections] = useState<Section[]>(
    template.sections.map(s => ({
      id: s.id,
      title: s.title,
      order: s.order,
      questions: s.questions.map(q => ({
        id: q.id,
        text: q.text,
        type: q.type,
        weight: q.weight,
        reference: q.reference || '',
        requiresJustification: q.requiresJustification,
        requiresEvidence: q.requiresEvidence
      }))
    }))
  )
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: '',
        order: sections.length + 1,
        questions: []
      }
    ])
  }

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index))
  }

  const updateSection = (index: number, field: keyof Section, value: any) => {
    const updated = [...sections]
    updated[index] = { ...updated[index], [field]: value }
    setSections(updated)
  }

  const addQuestion = (sectionIndex: number) => {
    const updated = [...sections]
    updated[sectionIndex].questions.push({
      text: '',
      type: 'BOOLEAN',
      weight: 5,
      reference: '',
      requiresJustification: false,
      requiresEvidence: false
    })
    setSections(updated)
  }

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updated = [...sections]
    updated[sectionIndex].questions = updated[sectionIndex].questions.filter((_, i) => i !== questionIndex)
    setSections(updated)
  }

  const updateQuestion = (
    sectionIndex: number,
    questionIndex: number,
    field: keyof Question,
    value: any
  ) => {
    const updated = [...sections]
    updated[sectionIndex].questions[questionIndex] = {
      ...updated[sectionIndex].questions[questionIndex],
      [field]: value
    }
    setSections(updated)
  }

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Nome do template é obrigatório')
      return
    }

    if (sections.length === 0) {
      setError('Adicione pelo menos uma seção')
      return
    }

    const hasEmptySection = sections.some(s => !s.title.trim())
    if (hasEmptySection) {
      setError('Todas as seções precisam ter um título')
      return
    }

    const hasEmptyQuestion = sections.some(s =>
      s.questions.some(q => !q.text.trim())
    )
    if (hasEmptyQuestion) {
      setError('Todas as perguntas precisam ter um texto')
      return
    }

    setSaving(true)
    setError('')

    const result = await updateTemplate(template.id, {
      name,
      description,
      sections: sections.map((section, idx) => ({
        id: section.id,
        title: section.title,
        order: idx + 1,
        questions: section.questions.map(q => ({
          id: q.id,
          text: q.text,
          type: q.type,
          weight: q.weight,
          reference: q.reference && q.reference.trim() !== '' ? q.reference : null,
          requiresJustification: q.requiresJustification
        }))
      }))
    })

    if (result.success) {
      router.push(`/dashboard/templates/${template.id}`)
      router.refresh()
    } else {
      setError(result.error || 'Erro ao salvar template')
    }
    setSaving(false)
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/dashboard/templates/${template.id}`}>
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Cancelar
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome do Template</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Diagnóstico NR-12"
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o propósito deste template..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Seções e Perguntas</h2>
          <Button onClick={addSection} size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Seção
          </Button>
        </div>

        {sections.map((section, sectionIdx) => (
          <Card key={sectionIdx}>
            <CardHeader>
              <div className="flex items-start gap-3">
                <GripVertical className="h-5 w-5 text-gray-400 mt-1" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <Input
                      value={section.title}
                      onChange={(e) => updateSection(sectionIdx, 'title', e.target.value)}
                      placeholder={`Título da Seção ${sectionIdx + 1}`}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSection(sectionIdx)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.questions.map((question, qIdx) => (
                <div key={qIdx} className="p-3 bg-gray-50 rounded-md space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 mt-2">{qIdx + 1}.</span>
                    <div className="flex-1 space-y-3">
                      <Textarea
                        value={question.text}
                        onChange={(e) => updateQuestion(sectionIdx, qIdx, 'text', e.target.value)}
                        placeholder="Texto da pergunta..."
                        rows={2}
                      />
                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <Label className="text-xs">Tipo</Label>
                          <Select
                            value={question.type}
                            onValueChange={(value) => updateQuestion(sectionIdx, qIdx, 'type', value)}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BOOLEAN">Sim/Não</SelectItem>
                              <SelectItem value="SCORE">Pontuação (1-5)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Peso</Label>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            value={question.weight}
                            onChange={(e) =>
                              updateQuestion(sectionIdx, qIdx, 'weight', parseInt(e.target.value) || 1)
                            }
                            className="h-8 text-xs"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs">Referência</Label>
                          <Input
                            value={question.reference}
                            onChange={(e) => updateQuestion(sectionIdx, qIdx, 'reference', e.target.value)}
                            placeholder="Ex: NR-12.1"
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center">
                          <label className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={question.requiresJustification}
                              onChange={(e) =>
                                updateQuestion(sectionIdx, qIdx, 'requiresJustification', e.target.checked)
                              }
                              className="rounded"
                            />
                            <span className="text-orange-700 font-medium">Exigir Justificativa</span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <label className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={question.requiresEvidence}
                              onChange={(e) =>
                                updateQuestion(sectionIdx, qIdx, 'requiresEvidence', e.target.checked)
                              }
                              className="rounded"
                            />
                            <span className="text-blue-700 font-medium">Exigir Evidência</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeQuestion(sectionIdx, qIdx)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                onClick={() => addQuestion(sectionIdx)}
                size="sm"
                variant="outline"
                className="w-full gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Pergunta
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-teal-600 hover:bg-teal-700"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
        <Link href={`/dashboard/templates/${template.id}`}>
          <Button variant="outline">Cancelar</Button>
        </Link>
      </div>
    </>
  )
}
