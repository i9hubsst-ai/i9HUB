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
  isAdmin = false
}: DocumentDetailsDialogProps) {
  if (!document) return null

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${modeBadgeColors[document.mode]}`}>
              <ModeIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl">{document.title}</DialogTitle>
              <DialogDescription className="mt-1">
                {document.description || 'Sem descrição'}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Categoria</p>
              <p className="text-sm mt-1">{document.category}</p>
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
          {document.sourceUrl && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">URL de Origem</p>
                <a
                  href={document.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline break-all"
                >
                  {document.sourceUrl}
                </a>
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
            {/* Visualizar - Todos podem */}
            <Button onClick={() => onView(document)} className="flex-1 sm:flex-none">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>

            {document.sourceUrl && (
              <Button variant="outline" asChild className="flex-1 sm:flex-none">
                <a href={document.sourceUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir Fonte
                </a>
              </Button>
            )}

            {/* Ações de Admin apenas */}
            {isAdmin && (
              <>
                {document.fileKey && (
                  <Button variant="outline" className="flex-1 sm:flex-none">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar
                  </Button>
                )}

                {document.mode === 'AUTO_SYNC' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      onSync(document.id)
                      onOpenChange(false)
                    }}
                    className="flex-1 sm:flex-none"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
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
