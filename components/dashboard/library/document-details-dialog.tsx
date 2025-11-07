'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Eye,
  ExternalLink,
  Trash2,
  RefreshCw,
  Download,
  FileText,
  Calendar,
  Zap,
  Upload,
  Link as LinkIcon,
  Edit,
  Loader2,
  X,
  Check,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Document {
  id: string
  title: string
  description: string | null
  category: string
  mode: 'LOCAL_PDF' | 'EXTERNAL_LINK' | 'AUTO_SYNC'
  sourceUrl: string | null
  fileKey: string | null
  lastSyncAt: Date | null
  syncFrequency: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface DocumentDetailsDialogProps {
  document: Document | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onView: (doc: Document) => void
  onDelete: (id: string) => void
  onSync: (id: string) => void
  onEdit?: (doc: Document) => void
  isAdmin?: boolean
}

const modeLabels = {
  LOCAL_PDF: 'Upload Manual',
  EXTERNAL_LINK: 'Link Externo',
  AUTO_SYNC: 'Auto-Sync'
}

const modeIcons = {
  LOCAL_PDF: Upload,
  EXTERNAL_LINK: LinkIcon,
  AUTO_SYNC: Zap
}

const modeBadgeColors = {
  LOCAL_PDF: 'bg-gray-100 text-gray-700',
  EXTERNAL_LINK: 'bg-blue-100 text-blue-700',
  AUTO_SYNC: 'bg-green-100 text-green-700'
}

export function DocumentDetailsDialog({
  document,
  open,
  onOpenChange,
  onView,
  onDelete,
  onSync,
  onEdit,
  isAdmin = false
}: DocumentDetailsDialogProps) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editedDoc, setEditedDoc] = useState<Document | null>(null)
  const { toast } = useToast()
  
  if (!document) return null

  // Inicializar dados editáveis quando abrir
  if (!editedDoc && document) {
    setEditedDoc(document)
  }

  const ModeIcon = modeIcons[document.mode]

  const formatDate = (date: Date | null) => {
    if (!date) return 'Nunca'
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ptBR })
  }

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este documento?')) {
      onDelete(document.id)
      onOpenChange(false)
    }
  }

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      await onSync(document.id)
      toast({
        title: 'Sincronização concluída',
        description: 'Arquivo sincronizado com sucesso!',
      })
    } catch (error) {
      toast({
        title: 'Erro na sincronização',
        description: 'Não foi possível sincronizar o documento.',
        variant: 'destructive',
      })
    } finally {
      setIsSyncing(false)
    }
  }

  const handleDownload = async () => {
    if (!document.fileKey) return
    
    setIsDownloading(true)
    try {
      const response = await fetch(`/api/ai/knowledge/view/${document.id}`)
      const data = await response.json()
      
      if (data.url) {
        // Criar link temporário para download
        const link = window.document.createElement('a')
        link.href = data.url
        link.download = document.title + '.pdf'
        window.document.body.appendChild(link)
        link.click()
        window.document.body.removeChild(link)
        
        toast({
          title: 'Download iniciado',
          description: 'O arquivo está sendo baixado.',
        })
      }
    } catch (error) {
      toast({
        title: 'Erro no download',
        description: 'Não foi possível baixar o documento.',
        variant: 'destructive',
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleViewPDF = () => {
    // Visualizar apenas se for PDF armazenado
    if (document.fileKey) {
      onView(document)
    }
  }

  const handleOpenSource = () => {
    // Abrir fonte externa
    if (document.sourceUrl) {
      window.open(document.sourceUrl, '_blank')
    }
  }

  const handleEdit = () => {
    setEditedDoc({ ...document })
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setEditedDoc(document)
    setIsEditing(false)
  }

  const handleSaveEdit = async () => {
    if (!editedDoc) return
    
    setIsSaving(true)
    try {
      const response = await fetch(`/api/ai/knowledge/${editedDoc.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editedDoc.title,
          description: editedDoc.description,
          category: editedDoc.category,
          sourceUrl: editedDoc.sourceUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar')
      }

      const result = await response.json()

      toast({
        title: '✓ Documento atualizado',
        description: 'As alterações foram salvas com sucesso!',
      })
      
      // Sair do modo de edição
      setIsEditing(false)
      
      // Atualizar documento local
      if (result.document) {
        setEditedDoc(result.document)
      }
      
      // Notificar componente pai para atualizar lista
      onEdit?.(editedDoc)
      
    } catch (error) {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível atualizar o documento.',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1200px] !w-[90vw] max-h-[600px] !h-auto overflow-y-auto" style={{ width: '1200px', maxWidth: '90vw' }}>
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${modeBadgeColors[document.mode]}`}>
              <ModeIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              {isEditing && editedDoc ? (
                <Input
                  value={editedDoc.title}
                  onChange={(e) => setEditedDoc({ ...editedDoc, title: e.target.value })}
                  className="text-xl font-semibold mb-2"
                  placeholder="Título do documento"
                />
              ) : (
                <DialogTitle className="text-xl">{document.title}</DialogTitle>
              )}
              {isEditing && editedDoc ? (
                <Textarea
                  value={editedDoc.description || ''}
                  onChange={(e) => setEditedDoc({ ...editedDoc, description: e.target.value })}
                  className="mt-1"
                  placeholder="Descrição"
                  rows={2}
                />
              ) : (
                <DialogDescription className="mt-1">
                  {document.description || 'Sem descrição'}
                </DialogDescription>
              )}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Categoria</p>
              {isEditing && editedDoc ? (
                <Select
                  value={editedDoc.category}
                  onValueChange={(value) => setEditedDoc({ ...editedDoc, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NORMA">Normas Regulamentadoras</SelectItem>
                    <SelectItem value="PROCEDIMENTO">Procedimentos</SelectItem>
                    <SelectItem value="LEI">Leis</SelectItem>
                    <SelectItem value="BENCHMARKING">Benchmarking</SelectItem>
                    <SelectItem value="REGULAMENTO">Regulamentos</SelectItem>
                    <SelectItem value="MANUAL">Manuais</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm">{document.category}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Modo</p>
              <Badge variant="secondary" className={`${modeBadgeColors[document.mode]} mt-1`}>
                <ModeIcon className="h-3 w-3 mr-1" />
                {modeLabels[document.mode]}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Datas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Criado
              </p>
              <p className="text-sm mt-1">{formatDate(document.createdAt)}</p>
            </div>
            {document.lastSyncAt && (
              <div>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" />
                  Última Sincronização
                </p>
                <p className="text-sm mt-1">{formatDate(document.lastSyncAt)}</p>
              </div>
            )}
          </div>

          {/* URL de origem */}
          {(document.sourceUrl || isEditing) && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">URL de Origem</p>
                {isEditing && editedDoc ? (
                  <Input
                    value={editedDoc.sourceUrl || ''}
                    onChange={(e) => setEditedDoc({ ...editedDoc, sourceUrl: e.target.value })}
                    placeholder="https://exemplo.com/documento.pdf"
                    type="url"
                  />
                ) : (
                  <a
                    href={document.sourceUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline break-all"
                  >
                    {document.sourceUrl}
                  </a>
                )}
              </div>
            </>
          )}

          {/* Frequência de sincronização */}
          {document.mode === 'AUTO_SYNC' && document.syncFrequency && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Frequência de Sincronização</p>
                <p className="text-sm mt-1">{document.syncFrequency}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Ações */}
          <div className="flex flex-wrap gap-2">
            {/* Visualizar PDF - Apenas se tiver arquivo armazenado */}
            {!isEditing && document.fileKey && (
              <Button onClick={handleViewPDF} className="flex-1 sm:flex-none">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar PDF
              </Button>
            )}

            {/* Abrir Fonte - Se tiver URL */}
            {!isEditing && document.sourceUrl && (
              <Button variant="outline" onClick={handleOpenSource} className="flex-1 sm:flex-none">
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir Fonte
              </Button>
            )}

            {/* Ações de Admin apenas */}
            {!isEditing && isAdmin && (
              <>
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  className="flex-1 sm:flex-none"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>

                {document.fileKey && (
                  <Button 
                    variant="outline" 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 sm:flex-none"
                  >
                    {isDownloading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4 mr-2" />
                    )}
                    Baixar
                  </Button>
                )}

                {document.mode === 'AUTO_SYNC' && (
                  <Button
                    variant="outline"
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="flex-1 sm:flex-none"
                  >
                    {isSyncing ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Sincronizar
                  </Button>
                )}

                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex-1 sm:flex-none"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
