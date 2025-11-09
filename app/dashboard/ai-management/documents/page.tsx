import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export default function DocumentsManagementPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Documentos de Conhecimento</h2>
        <p className="text-muted-foreground">
          Gerencie os documentos da base de conhecimento (NRs, NBRs, etc)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Base de Conhecimento
          </CardTitle>
          <CardDescription>
            Em breve: Sistema de upload e gestão de documentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta funcionalidade está em desenvolvimento.
            Por enquanto, os documentos são gerenciados diretamente no banco de dados.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
