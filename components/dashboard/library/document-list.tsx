'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Search, 
  Filter, 
  RefreshCw,
  Upload,
  Link as LinkIcon,
  Zap,
  Info,
} from 'lucide-react'
import { DocumentDetailsDialog } from './document-details-dialog'

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

interface DocumentListProps {
  documents: Document[]
  selectedCategory: string | null
  onRefresh: () => void
  onDelete: (id: string) => void
  onSync: (id: string) => void
  isAdmin?: boolean
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
  onSync,
  isAdmin = false
}: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const handleViewDocument = async (doc: Document) => {
    try {
      const response = await fetch(`/api/ai/knowledge/view/${doc.id}`)
      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Erro ao abrir documento')
        return
      }

      window.open(data.url, '_blank')
    } catch (error) {
      console.error('Erro ao visualizar documento:', error)
      alert('Erro ao abrir documento')
    }
  }

  const handleShowDetails = (doc: Document) => {
    setSelectedDocument(doc)
    setDetailsOpen(true)
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = !selectedCategory || doc.category === selectedCategory
    const matchesSearch = !searchQuery || 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

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

        {/* Documents List */}
        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum documento encontrado</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredDocuments.map((doc) => {
              const ModeIcon = modeIcons[doc.mode]
              
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${modeBadgeColors[doc.mode]}`}>
                    <ModeIcon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{doc.title}</h4>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShowDetails(doc)}
                    className="shrink-0"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              )
            })}
          </div>
        )}

        <DocumentDetailsDialog
          document={selectedDocument}
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          onView={handleViewDocument}
          onDelete={onDelete}
          onSync={onSync}
          isAdmin={isAdmin}
        />
      </CardContent>
    </Card>
  )
}
