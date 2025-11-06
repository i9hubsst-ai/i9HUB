'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Upload, Link as LinkIcon, Zap, Plus, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type DocumentMode = 'LOCAL_PDF' | 'EXTERNAL_LINK' | 'AUTO_SYNC'

const categories = [
  { value: 'NORMA', label: 'Norma Regulamentadora' },
  { value: 'PROCEDIMENTO', label: 'Procedimento' },
  { value: 'LEI', label: 'Lei' },
  { value: 'BENCHMARKING', label: 'Benchmarking' },
  { value: 'REGULAMENTO', label: 'Regulamento' },
  { value: 'MANUAL', label: 'Manual' }
]

const syncFrequencies = [
  { value: 'DAILY', label: 'Diária' },
  { value: 'WEEKLY', label: 'Semanal' },
  { value: 'MONTHLY', label: 'Mensal' }
]

interface AddDocumentDialogProps {
  isAdmin: boolean
}

export function AddDocumentDialog({ isAdmin }: AddDocumentDialogProps) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<DocumentMode>('AUTO_SYNC')
  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [syncFrequency, setSyncFrequency] = useState('WEEKLY')
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { toast } = useToast()
  const router = useRouter()

  if (!isAdmin) return null

  const resetForm = () => {
    setMode('AUTO_SYNC')
    setCategory('')
    setTitle('')
    setDescription('')
    setSourceUrl('')
    setSyncFrequency('WEEKLY')
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!category || !title) {
      toast({
        title: 'Erro',
        description: 'Categoria e título são obrigatórios',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (mode === 'LOCAL_PDF') {
        // Upload manual - TEMPORARIAMENTE DESABILITADO
        toast({
          title: 'Funcionalidade Temporariamente Desabilitada',
          description: 'Upload de PDF está sendo atualizado. Por favor, use o modo Auto-Sync com URL direta do PDF.',
          variant: 'destructive'
        })
        setIsSubmitting(false)
        return

      } else if (mode === 'AUTO_SYNC') {
        // Auto-sync
        if (!sourceUrl) {
          toast({
            title: 'Erro',
            description: 'URL de origem é obrigatória',
            variant: 'destructive'
          })
          setIsSubmitting(false)
          return
        }

        const response = await fetch('/api/ai/knowledge/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sourceUrl,
            category,
            title,
            description,
            syncFrequency
          })
        })

        if (!response.ok) {
          const error = await response.text()
          throw new Error(error)
        }

        toast({
          title: 'Sucesso',
          description: 'Documento sincronizado com sucesso'
        })

      } else if (mode === 'EXTERNAL_LINK') {
        // Link externo - criar registro sem processar
        if (!sourceUrl) {
          toast({
            title: 'Erro',
            description: 'URL é obrigatória',
            variant: 'destructive'
          })
          setIsSubmitting(false)
          return
        }

        // TODO: Criar endpoint para salvar apenas link externo
        toast({
          title: 'Info',
          description: 'Link externo ainda não implementado',
          variant: 'destructive'
        })
        setIsSubmitting(false)
        return
      }

      resetForm()
      setOpen(false)
      router.refresh()

    } catch (error: any) {
      console.error('Erro ao adicionar documento:', error)
      toast({
        title: 'Erro',
        description: error.message || 'Erro ao adicionar documento',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Documento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Documento</DialogTitle>
          <DialogDescription>
            Escolha como deseja adicionar o documento à biblioteca
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Modo de Documento */}
          <div className="space-y-3">
            <Label>Modo de Documento</Label>
            <RadioGroup value={mode} onValueChange={(value) => setMode(value as DocumentMode)}>
              <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                <RadioGroupItem value="AUTO_SYNC" id="auto-sync" />
                <div className="flex-1">
                  <label htmlFor="auto-sync" className="flex items-center gap-2 font-medium cursor-pointer">
                    <Zap className="h-4 w-4 text-green-600" />
                    Auto-Sync (Recomendado)
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    URL oficial que será baixada e sincronizada automaticamente
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer">
                <RadioGroupItem value="LOCAL_PDF" id="local-pdf" />
                <div className="flex-1">
                  <label htmlFor="local-pdf" className="flex items-center gap-2 font-medium cursor-pointer">
                    <Upload className="h-4 w-4 text-blue-600" />
                    Upload Manual
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Enviar arquivo PDF do seu computador
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 border rounded-lg p-4 hover:bg-accent cursor-pointer opacity-50">
                <RadioGroupItem value="EXTERNAL_LINK" id="external-link" disabled />
                <div className="flex-1">
                  <label htmlFor="external-link" className="flex items-center gap-2 font-medium cursor-pointer">
                    <LinkIcon className="h-4 w-4 text-purple-600" />
                    Link Externo (Em breve)
                  </label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Apenas link de referência, sem processamento pela IA
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: NR-12 - Segurança no Trabalho em Máquinas"
              required
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição do documento..."
              rows={3}
            />
          </div>

          {/* Campos condicionais baseados no modo */}
          {mode === 'AUTO_SYNC' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="sourceUrl">URL Oficial *</Label>
                <Input
                  id="sourceUrl"
                  type="url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  placeholder="https://www.gov.br/trabalho-e-emprego/pt-br/..."
                  required
                />
                <p className="text-xs text-muted-foreground">
                  URL oficial do MTE ou fonte confiável
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="syncFrequency">Frequência de Sincronização</Label>
                <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {syncFrequencies.map(freq => (
                      <SelectItem key={freq.value} value={freq.value}>
                        {freq.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {mode === 'LOCAL_PDF' && (
            <div className="space-y-2">
              <Label htmlFor="file">Arquivo PDF *</Label>
              <Input
                id="file"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                required
              />
              {file && (
                <p className="text-sm text-muted-foreground">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>
          )}

          {mode === 'EXTERNAL_LINK' && (
            <div className="space-y-2">
              <Label htmlFor="linkUrl">URL do Documento *</Label>
              <Input
                id="linkUrl"
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://..."
                required
              />
            </div>
          )}

          {/* Botões */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
