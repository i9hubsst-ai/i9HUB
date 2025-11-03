'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Settings, Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import { getAllTemplateTypes, createTemplateType, updateTemplateType, deleteTemplateType } from '@/app/actions/template-types'
import { useToast } from '@/hooks/use-toast'

type TemplateType = {
  id: string
  code: string
  name: string
  description: string | null
  icon: string | null
  isActive: boolean
  order: number
}

export function TemplateTypeManager() {
  const [open, setOpen] = useState(false)
  const [types, setTypes] = useState<TemplateType[]>([])
  const [loading, setLoading] = useState(false)
  const [editingType, setEditingType] = useState<TemplateType | null>(null)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    icon: '',
    order: 0
  })
  const { toast } = useToast()

  const loadTypes = async () => {
    setLoading(true)
    const result = await getAllTemplateTypes()
    if (result.success && result.types) {
      setTypes(result.types)
    } else {
      toast({
        title: 'Erro',
        description: result.error || 'Erro ao carregar tipos',
        variant: 'destructive'
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (open) {
      loadTypes()
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = editingType
      ? await updateTemplateType(editingType.id, formData)
      : await createTemplateType(formData)

    if (result.success) {
      toast({
        title: 'Sucesso',
        description: editingType ? 'Tipo atualizado com sucesso' : 'Tipo criado com sucesso'
      })
      setFormData({ code: '', name: '', description: '', icon: '', order: 0 })
      setEditingType(null)
      loadTypes()
    } else {
      toast({
        title: 'Erro',
        description: result.error,
        variant: 'destructive'
      })
    }

    setLoading(false)
  }

  const handleEdit = (type: TemplateType) => {
    setEditingType(type)
    setFormData({
      code: type.code,
      name: type.name,
      description: type.description || '',
      icon: type.icon || '',
      order: type.order
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este tipo?')) return

    setLoading(true)
    const result = await deleteTemplateType(id)

    if (result.success) {
      toast({
        title: 'Sucesso',
        description: 'Tipo excluído com sucesso'
      })
      loadTypes()
    } else {
      toast({
        title: 'Erro',
        description: result.error,
        variant: 'destructive'
      })
    }

    setLoading(false)
  }

  const handleCancel = () => {
    setFormData({ code: '', name: '', description: '', icon: '', order: 0 })
    setEditingType(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gerenciar Tipos de Template</DialogTitle>
          <DialogDescription>
            Adicione, edite ou remova tipos de template disponíveis no sistema
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-4 bg-muted/50">
            <h3 className="font-semibold">
              {editingType ? 'Editar Tipo' : 'Novo Tipo'}
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="code">Código *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="Ex: NR12, ISO45001"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: NR-12 - Segurança em Máquinas"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição detalhada do tipo de template"
                rows={2}
                disabled={loading}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="icon">Ícone (opcional)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Nome do ícone Lucide"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Ordem de Exibição</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingType ? 'Atualizar' : 'Criar'}
              </Button>
              {editingType && (
                <Button type="button" variant="outline" onClick={handleCancel} disabled={loading}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          {/* Lista de Tipos */}
          <div>
            <h3 className="font-semibold mb-4">Tipos Cadastrados</h3>
            {loading && types.length === 0 ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : types.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Nenhum tipo cadastrado
              </p>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-center">Ordem</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {types.map((type) => (
                      <TableRow key={type.id}>
                        <TableCell className="font-mono text-sm">{type.code}</TableCell>
                        <TableCell className="font-medium">{type.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                          {type.description || '-'}
                        </TableCell>
                        <TableCell className="text-center">{type.order}</TableCell>
                        <TableCell className="text-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${type.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {type.isActive ? 'Ativo' : 'Inativo'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(type)}
                              disabled={loading}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(type.id)}
                              disabled={loading}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
