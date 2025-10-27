"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function KnowledgeBaseUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      if (!file || !title || !category) {
        throw new Error('Por favor, preencha todos os campos')
      }

      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('category', category)

      const response = await fetch('/api/ai/knowledge/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erro ao fazer upload do arquivo')
      }

      setSuccess(true)
      setFile(null)
      setTitle('')
      setCategory('')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Documento</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Manual de Segurança NR-12"
            />
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={category}
              onValueChange={setCategory}
            >
              <option value="">Selecione uma categoria</option>
              <option value="NR12">NR-12</option>
              <option value="NR35">NR-35</option>
              <option value="ISO45001">ISO 45001</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="file">Arquivo PDF</Label>
            <Input
              id="file"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription>
                Documento enviado com sucesso!
              </AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Documento'}
          </Button>
        </div>
      </form>
    </Card>
  )
}