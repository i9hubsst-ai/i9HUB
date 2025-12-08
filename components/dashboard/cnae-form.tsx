'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { createCNAE, updateCNAE } from '@/app/actions/cnaes'

interface CNAEFormProps {
  cnae?: {
    id: string
    codigo: string
    descricao: string
    grauRisco: number
    ativo: boolean
  }
}

export function CNAEForm({ cnae }: CNAEFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [codigo, setCodigo] = useState(cnae?.codigo || '')
  const [descricao, setDescricao] = useState(cnae?.descricao || '')
  const [grauRisco, setGrauRisco] = useState(cnae?.grauRisco.toString() || '1')
  const [ativo, setAtivo] = useState(cnae?.ativo ?? true)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      codigo,
      descricao,
      grauRisco: parseInt(grauRisco),
      ativo,
    }

    try {
      const result = cnae
        ? await updateCNAE(cnae.id, data)
        : await createCNAE(data)

      if (result.error) {
        alert(result.error)
        setIsSubmitting(false)
        return
      }

      router.push('/dashboard/cadastros/cnaes')
      router.refresh()
    } catch (error) {
      console.error('Erro ao salvar CNAE:', error)
      alert('Erro ao salvar CNAE')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{cnae ? 'Editar CNAE' : 'Novo CNAE'}</CardTitle>
          <CardDescription>
            Preencha as informações do código CNAE
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="codigo">Código CNAE *</Label>
            <Input
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ex: 6201-5/00"
              required
              maxLength={20}
            />
            <p className="text-sm text-gray-500">
              Formato: 0000-0/00
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Desenvolvimento de programas de computador sob encomenda"
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grauRisco">Grau de Risco (NR-04) *</Label>
            <Select value={grauRisco} onValueChange={setGrauRisco}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Grau 1 - Leve</SelectItem>
                <SelectItem value="2">Grau 2 - Médio</SelectItem>
                <SelectItem value="3">Grau 3 - Grave</SelectItem>
                <SelectItem value="4">Grau 4 - Muito Grave</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Conforme classificação da NR-04
            </p>
          </div>

          {cnae && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ativo"
                checked={ativo}
                onCheckedChange={(checked) => setAtivo(checked as boolean)}
              />
              <Label
                htmlFor="ativo"
                className="text-sm font-normal cursor-pointer"
              >
                CNAE ativo (disponível para seleção)
              </Label>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar CNAE'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
