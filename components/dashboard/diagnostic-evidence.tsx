'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Image, Upload, Trash2, Eye, Loader2 } from 'lucide-react'
import { getEvidencesByAssessment, deleteEvidence } from '@/app/actions/evidence'
import { useToast } from '@/hooks/use-toast'

interface DiagnosticEvidenceProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assessment: any
}

export function DiagnosticEvidence({ assessment }: DiagnosticEvidenceProps) {
  const [evidences, setEvidences] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadEvidences()
  }, [assessment.id])

  const loadEvidences = async () => {
    setLoading(true)
    const result = await getEvidencesByAssessment(assessment.id)
    if (result.success && result.evidences) {
      setEvidences(result.evidences)
    } else {
      toast({
        title: 'Erro ao carregar evidências',
        description: result.error || 'Tente novamente',
        variant: 'destructive'
      })
    }
    setLoading(false)
  }

  const handleDelete = async (evidenceId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta evidência?')) {
      return
    }

    setDeleting(evidenceId)
    const result = await deleteEvidence(evidenceId, assessment.id)
    
    if (result.success) {
      toast({
        title: 'Evidência excluída',
        description: 'A evidência foi removida com sucesso'
      })
      await loadEvidences()
    } else {
      toast({
        title: 'Erro ao excluir',
        description: result.error || 'Tente novamente',
        variant: 'destructive'
      })
    }
    setDeleting(null)
  }

  const handleView = (evidence: any) => {
    // Se for base64 data URL, abrir em nova aba
    if (evidence.fileUrl.startsWith('data:')) {
      const newWindow = window.open()
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${evidence.fileName}</title></head>
            <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f5f5f5;">
              ${evidence.mimeType.startsWith('image/') 
                ? `<img src="${evidence.fileUrl}" style="max-width:100%;max-height:100vh;" />`
                : `<embed src="${evidence.fileUrl}" width="100%" height="100%" type="${evidence.mimeType}" />`
              }
            </body>
          </html>
        `)
      }
    } else {
      // Se for URL externa, abrir diretamente
      window.open(evidence.fileUrl, '_blank')
    }
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="h-10 w-10 text-blue-500" />
    }
    return <FileText className="h-10 w-10 text-red-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Galeria de Evidências</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Todos os arquivos anexados às respostas e achados.
              </p>
            </div>
            <Button className="gap-2" onClick={() => toast({
              title: 'Em desenvolvimento',
              description: 'Upload de evidências será implementado em breve'
            })}>
              <Upload className="h-4 w-4" />
              Adicionar Evidência
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {evidences.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhuma evidência encontrada</p>
              <p className="text-sm mt-1">
                As evidências anexadas às respostas aparecerão aqui
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {evidences.map((evidence) => (
                <Card key={evidence.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                      {getFileIcon(evidence.mimeType)}
                      <div className="flex-1 min-w-0 w-full">
                        <h4 className="font-medium text-sm truncate">{evidence.fileName}</h4>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(evidence.fileSize)}
                        </p>
                        {evidence.answer?.question && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {evidence.answer.question.section.title} - {evidence.answer.question.text}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Anexado em {formatDate(evidence.uploadedAt)} por {evidence.uploadedByUser}
                        </p>
                      </div>
                      <div className="flex gap-2 w-full">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 gap-1"
                          onClick={() => handleView(evidence)}
                        >
                          <Eye className="h-3 w-3" />
                          Ver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(evidence.id)}
                          disabled={deleting === evidence.id}
                        >
                          {deleting === evidence.id ? (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                            <Trash2 className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
