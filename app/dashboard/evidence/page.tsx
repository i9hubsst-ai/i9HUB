import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileCheck, ArrowLeft, FileImage, FileText, File } from 'lucide-react'
import Link from 'next/link'

export default async function EvidencePage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/diagnostics-module">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Módulo
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Evidências</h1>
          <p className="text-muted-foreground mt-2">
            Documentos e comprovações das ações realizadas nos planos de ação
          </p>
        </div>
      </div>

      {/* Info Card */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <FileCheck className="h-5 w-5" />
            Evidências por Plano de Ação
          </CardTitle>
          <CardDescription>
            As evidências são anexadas aos planos de ação para comprovar a execução. Para visualizar e gerenciar evidências, acesse um diagnóstico específico e seus planos de ação.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Tipos de evidências aceitas:
          </p>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border">
              <FileImage className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold text-sm">Imagens</div>
                <div className="text-xs text-muted-foreground">JPG, PNG, GIF</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border">
              <FileText className="h-8 w-8 text-red-600" />
              <div>
                <div className="font-semibold text-sm">Documentos</div>
                <div className="text-xs text-muted-foreground">PDF, DOC, XLS</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white border">
              <File className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-semibold text-sm">Outros</div>
                <div className="text-xs text-muted-foreground">ZIP, TXT, CSV</div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Link href="/dashboard/diagnostics">
              <Button>
                Ver Diagnósticos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Informações sobre evidências */}
      <Card>
        <CardHeader>
          <CardTitle>Importância das Evidências</CardTitle>
          <CardDescription>
            Por que documentar a execução dos planos de ação?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Comprovação legal:</strong> Demonstrar conformidade com normas regulamentadoras
            </li>
            <li>
              <strong>Rastreabilidade:</strong> Histórico completo das ações de SST realizadas
            </li>
            <li>
              <strong>Auditorias:</strong> Facilita processos de auditoria interna e externa
            </li>
            <li>
              <strong>Melhoria contínua:</strong> Base para análise de efetividade das ações
            </li>
            <li>
              <strong>Proteção jurídica:</strong> Evidências em caso de fiscalização ou processos
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Próximas funcionalidades */}
      <Card>
        <CardHeader>
          <CardTitle>Funcionalidades Futuras</CardTitle>
          <CardDescription>
            Esta página será expandida para incluir:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Galeria de todas as evidências com visualização em grid</li>
            <li>Busca e filtros por tipo, data, plano de ação e diagnóstico</li>
            <li>Preview de documentos e imagens sem necessidade de download</li>
            <li>Organização por pastas e tags customizáveis</li>
            <li>Sistema de versionamento de documentos</li>
            <li>Exportação em lote para backup ou auditoria</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
