'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Image, Upload, Trash2, Eye } from 'lucide-react'

interface DiagnosticEvidenceProps {
  assessment: any
}

export function DiagnosticEvidence({ assessment }: DiagnosticEvidenceProps) {
  // Mock evidence data
  const evidences = [
    {
      id: '1',
      fileName: 'ata_reuniao.pdf',
      fileSize: '1.2 MB',
      type: 'application/pdf',
      uploadedBy: 'Mariana Costa',
      uploadedAt: '10/05/2024',
    },
    {
      id: '2',
      fileName: 'politica_sst.pdf',
      fileSize: '800 KB',
      type: 'application/pdf',
      uploadedBy: 'Mariana Costa',
      uploadedAt: '11/05/2024',
    },
    {
      id: '3',
      fileName: 'foto_extintor.jpg',
      fileSize: '2.5 MB',
      type: 'image/jpeg',
      uploadedBy: 'Carlos Silva',
      uploadedAt: '12/05/2024',
    },
  ]

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className="h-10 w-10 text-blue-500" />
    }
    return <FileText className="h-10 w-10 text-red-500" />
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
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Adicionar Evidência
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidences.map((evidence) => (
              <Card key={evidence.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    {getFileIcon(evidence.type)}
                    <div className="flex-1 min-w-0 w-full">
                      <h4 className="font-medium text-sm truncate">{evidence.fileName}</h4>
                      <p className="text-xs text-muted-foreground">{evidence.fileSize}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Anexado em {evidence.uploadedAt} por {evidence.uploadedBy}
                      </p>
                    </div>
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" size="sm" className="flex-1 gap-1">
                        <Eye className="h-3 w-3" />
                        Ver
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
