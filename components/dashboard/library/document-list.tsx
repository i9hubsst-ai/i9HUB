'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  ExternalLink, 
  Trash2, 
  RefreshCw,
  Upload,
  Link as LinkIcon,
  Zap
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
  storagePath: string | null
  lastSyncAt: Date | null
  syncFrequency: string | null
  isActive: boolean
  fileSize: number | null
  createdAt: Date
}

interface DocumentListProps {
  documents: Document[]
  selectedCategory: string | null
  onRefresh: () => void
  onDelete: (id: string) => void
  onSync: (id: string) => void
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

export function DocumentList({ 
  documents, 
  selectedCategory, 
  onRefresh, 
  onDelete, 
  onSync 
}: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = !selectedCategory || doc.category === selectedCategory
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '-'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Nunca'
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true, 
      locale: ptBR 
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Documentos</CardTitle>
            <CardDescription>
              {filteredDocuments.length} documento{filteredDocuments.length !== 1 ? 's' : ''} encontrado{filteredDocuments.length !== 1 ? 's' : ''}
            </CardDescription>
          </div>
          <Button onClick={onRefresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título ou descrição..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        {/* Documents Table */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum documento encontrado</p>
          </div>
        ) : (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Modo</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead>Última Sincronização</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((doc) => {
                  const ModeIcon = modeIcons[doc.mode]
                  
                  return (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{doc.title}</div>
                          {doc.description && (
                            <div className="text-sm text-muted-foreground line-clamp-1">
                              {doc.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={modeBadgeColors[doc.mode]}
                        >
                          <ModeIcon className="h-3 w-3 mr-1" />
                          {modeLabels[doc.mode]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{doc.category}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{formatFileSize(doc.fileSize)}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {formatLastSync(doc.lastSyncAt)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={doc.isActive ? 'default' : 'secondary'}>
                          {doc.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {doc.sourceUrl && (
                              <DropdownMenuItem asChild>
                                <a 
                                  href={doc.sourceUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="cursor-pointer"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Abrir Fonte
                                </a>
                              </DropdownMenuItem>
                            )}
                            {doc.storagePath && (
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Baixar PDF
                              </DropdownMenuItem>
                            )}
                            {doc.mode === 'AUTO_SYNC' && (
                              <DropdownMenuItem onClick={() => onSync(doc.id)}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Sincronizar Agora
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => onDelete(doc.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
