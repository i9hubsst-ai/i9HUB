'use client'

import { useState } from 'react'
import { DocumentCategoryCard } from '@/components/dashboard/library/document-category-card'
import { DocumentList } from '@/components/dashboard/library/document-list'
import { AddDocumentDialog } from '@/components/dashboard/library/add-document-dialog'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { deleteKnowledgeDocument, syncKnowledgeDocument } from '@/app/actions/knowledge'
import { useRouter } from 'next/navigation'

interface KnowledgeBaseClientProps {
  documents: any[]
  categoryCounts: Record<string, number>
  isAdmin: boolean
}

const categories = [
  'NORMA',
  'PROCEDIMENTO', 
  'LEI',
  'BENCHMARKING',
  'REGULAMENTO',
  'MANUAL'
]

export function KnowledgeBaseClient({ 
  documents, 
  categoryCounts,
  isAdmin 
}: KnowledgeBaseClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null) // Deselecionar se clicar novamente
    } else {
      setSelectedCategory(category)
    }
  }

  const handleRefresh = () => {
    router.refresh()
    toast({
      title: 'Atualizado',
      description: 'Lista de documentos atualizada'
    })
  }

  const handleDelete = async (documentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita.')) {
      return
    }

    setIsDeleting(true)
    try {
      const result = await deleteKnowledgeDocument(documentId)
      
      if (result.error) {
        toast({
          title: 'Erro',
          description: result.error,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Sucesso',
          description: 'Documento excluído com sucesso'
        })
        router.refresh()
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSync = async (documentId: string) => {
    setIsSyncing(true)
    try {
      const result = await syncKnowledgeDocument(documentId)
      
      if (result.error) {
        toast({
          title: 'Erro',
          description: result.error,
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Sucesso',
          description: 'Documento sincronizado com sucesso'
        })
        router.refresh()
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message,
        variant: 'destructive'
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <BookOpen className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Biblioteca de Conhecimento</h1>
            <p className="text-muted-foreground">
              Normas, procedimentos, leis e documentos técnicos
            </p>
          </div>
        </div>
        
        <AddDocumentDialog isAdmin={isAdmin} />
      </div>

      {/* Category Cards */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <DocumentCategoryCard
              key={category}
              category={category}
              count={categoryCounts[category] || 0}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>

      {/* Selected Category Indicator */}
      {selectedCategory && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtrando por:</span>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            {selectedCategory}
            <span className="ml-2">×</span>
          </Button>
        </div>
      )}

      {/* Documents List */}
      <DocumentList
        documents={documents}
        selectedCategory={selectedCategory}
        onRefresh={handleRefresh}
        onDelete={handleDelete}
        onSync={handleSync}
        isAdmin={isAdmin}
      />
    </div>
  )
}
