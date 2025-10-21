'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, FileText } from 'lucide-react'
import Link from 'next/link'
import { createAssessment } from '@/app/actions/assessments'
import { getCompanies } from '@/app/actions/companies'
import { getPublishedTemplates } from '@/app/actions/templates'

export default function NewDiagnosticPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [companyId, setCompanyId] = useState('')
  const [templateId, setTemplateId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [companies, setCompanies] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])

  useEffect(() => {
    async function loadData() {
      const [companiesResult, templatesResult] = await Promise.all([
        getCompanies(),
        getPublishedTemplates()
      ])
      
      if (companiesResult.success && companiesResult.companies) {
        setCompanies(companiesResult.companies)
        if (companiesResult.companies.length > 0) {
          setCompanyId(companiesResult.companies[0].id)
        }
      }

      if (templatesResult.success && templatesResult.templates) {
        setTemplates(templatesResult.templates)
      }
    }
    loadData()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!companyId) {
      setError('Selecione uma empresa')
      setLoading(false)
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    if (templateId) {
      formData.append('templateId', templateId)
    }

    try {
      const result = await createAssessment(companyId, formData)
      if (result?.error) {
        setError(result.error)
      }
    } catch (err) {
      setError('Erro ao criar diagnóstico')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link 
          href="/dashboard/diagnostics" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Diagnósticos
        </Link>
        <h1 className="text-3xl font-bold text-primary">Novo Diagnóstico IMSST</h1>
        <p className="text-muted-foreground">
          Crie uma nova avaliação de maturidade SST para sua empresa
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Diagnóstico</CardTitle>
            <CardDescription>
              Preencha os dados básicos para iniciar a avaliação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Select value={companyId} onValueChange={setCompanyId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título do Diagnóstico</Label>
                <Input
                  id="title"
                  placeholder="Ex: Diagnóstico Q1 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Escolha um nome que ajude a identificar este diagnóstico
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Informações adicionais sobre este diagnóstico..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Template (opcional)</Label>
                <Select value={templateId} onValueChange={setTemplateId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sem template - criar diagnóstico vazio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Sem template</SelectItem>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{template.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({template._count.sections} seções)
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {templateId 
                    ? 'Template será aplicado automaticamente com todas as seções e perguntas'
                    : 'Você poderá criar seções e perguntas manualmente'}
                </p>
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">O que acontece a seguir?</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Você responderá 25 perguntas divididas em 5 dimensões</li>
                  <li>O sistema calculará automaticamente seu nível de maturidade (1-5)</li>
                  <li>Você poderá gerar relatórios em PDF com os resultados</li>
                  <li>Planos de ação podem ser criados baseados nas respostas</li>
                </ol>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || !title || !companyId}>
                  {loading ? 'Criando...' : 'Criar Diagnóstico'}
                </Button>
                <Link href="/dashboard/diagnostics">
                  <Button 
                    type="button" 
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
