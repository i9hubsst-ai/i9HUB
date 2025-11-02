'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Upload, FileText, Save, RefreshCw, Trash2, Download, Eye, Settings } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface DocumentInfo {
  id: string
  filename: string
  uploadedAt: string
  size: number
  status: 'processing' | 'ready' | 'error'
  pages?: number
  extractedText?: string
}

interface AIConfig {
  systemPrompt: string
  temperature: number
  maxTokens: number
  documents: DocumentInfo[]
}

export function AIManagementClient() {
  const [config, setConfig] = useState<AIConfig>({
    systemPrompt: '',
    temperature: 0.7,
    maxTokens: 2000,
    documents: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('prompt')
  const { toast } = useToast()

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/ai/config')
      if (response.ok) {
        const data = await response.json()
        setConfig(data)
        console.log('Configuração carregada:', data)
      } else {
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Erro ao carregar configuração:', error)
      toast({
        title: "Erro",
        description: "Falha ao carregar configurações. Verifique sua conexão.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const saveConfig = async () => {
    setSaving(true)
    try {
      console.log('Salvando configuração:', config)
      const response = await fetch('/api/ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: config.systemPrompt,
          temperature: config.temperature,
          maxTokens: config.maxTokens
        })
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Configurações salvas com sucesso"
        })
        // Recarregar automaticamente após salvar para confirmar persistência
        setTimeout(() => {
          loadConfig()
        }, 500)
      } else {
        const errorText = await response.text()
        throw new Error(`Erro ${response.status}: ${errorText}`)
      }
    } catch (error) {
      console.error('Erro ao salvar configuração:', error)
      toast({
        title: "Erro",
        description: `Falha ao salvar configurações: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    console.log('📤 [CLIENT] Iniciando upload de', files.length, 'arquivo(s)')
    setUploading(true)
    const formData = new FormData()
    
    Array.from(files).forEach(file => {
      formData.append('documents', file)
    })

    try {
      console.log('📤 [CLIENT] Enviando request para /api/ai/documents')
      const response = await fetch('/api/ai/documents', {
        method: 'POST',
        body: formData
      })

      console.log('📤 [CLIENT] Resposta recebida:', response.status, response.ok)

      if (response.ok) {
        const result = await response.json()
        console.log('✅ [CLIENT] Upload bem-sucedido:', result)
        toast({
          title: "Sucesso",
          description: `${result.uploaded} documento(s) enviado(s) com sucesso`
        })
        // Recarregar lista de documentos após pequeno delay
        setTimeout(() => {
          loadConfig()
        }, 1000)
      } else {
        const errorText = await response.text()
        console.error('❌ [CLIENT] Erro no upload:', response.status, errorText)
        throw new Error(`Falha no upload: ${response.status}`)
      }
    } catch (error) {
      console.error('❌ [CLIENT] Erro capturado:', error)
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Falha ao enviar documentos",
        variant: "destructive"
      })
    } finally {
      setUploading(false)
      // Limpar o input para permitir reupload do mesmo arquivo
      event.target.value = ''
    }
  }

  const deleteDocument = async (documentId: string) => {
    try {
      const response = await fetch(`/api/ai/documents/${documentId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Documento removido com sucesso"
        })
        loadConfig()
      } else {
        throw new Error('Falha ao deletar')
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao remover documento",
        variant: "destructive"
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="secondary">Processando</Badge>
      case 'ready':
        return <Badge variant="default">Pronto</Badge>
      case 'error':
        return <Badge variant="destructive">Erro</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-500" />
          <div>
            <h3 className="text-lg font-medium">Carregando configurações da IA</h3>
            <p className="text-sm text-muted-foreground">Aguarde enquanto carregamos suas configurações personalizadas...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList>
        <TabsTrigger value="prompt">
          <Settings className="w-4 h-4 mr-2" />
          Prompt do Sistema
        </TabsTrigger>
        <TabsTrigger value="documents">
          <FileText className="w-4 h-4 mr-2" />
          Documentos ({config.documents.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="prompt">
        <Card>
          <CardHeader>
            <CardTitle>Configuração do Prompt do Sistema</CardTitle>
            <CardDescription>
              Configure instruções adicionais que serão somadas ao prompt base do sistema. 
              Estas instruções complementam o comportamento padrão da IA especializada em SST.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="systemPrompt">Instruções Adicionais (Opcional)</Label>
              <Textarea
                id="systemPrompt"
                placeholder="Digite instruções específicas para personalizar o comportamento da IA...
Exemplo: 
- Sempre inclua sugestões práticas de implementação
- Priorize soluções de baixo custo quando aplicável
- Mencione prazos legais quando relevante"
                value={config.systemPrompt}
                onChange={(e) => setConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                rows={12}
                className="font-mono text-sm"
              />
              <p className="text-sm text-muted-foreground">
                <strong>Estrutura final:</strong> [Prompt Base SST] + [Suas Instruções] + [Contexto dos Documentos] + [Pergunta do Usuário]
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperatura</Label>
                <Input
                  id="temperature"
                  type="number"
                  min="0"
                  max="2"
                  step="0.1"
                  value={config.temperature}
                  onChange={(e) => setConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                />
                <p className="text-xs text-muted-foreground">
                  0 = mais preciso, 2 = mais criativo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxTokens">Máximo de Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  min="100"
                  max="4000"
                  step="100"
                  value={config.maxTokens}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                />
                <p className="text-xs text-muted-foreground">
                  Limite de tokens para cada resposta
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={saveConfig} disabled={saving}>
                {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Salvar Configurações
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="documents">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload de Documentos</CardTitle>
              <CardDescription>
                Envie PDFs, Word ou outros documentos para expandir a base de conhecimento da IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <Label htmlFor="fileUpload" className="cursor-pointer">
                    <span className="text-sm font-medium">Clique para selecionar arquivos</span>
                    <br />
                    <span className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX, TXT (máx. 10MB por arquivo)
                    </span>
                  </Label>
                  <Input
                    id="fileUpload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </div>
                {uploading && (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processando arquivos...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentos Carregados</CardTitle>
              <CardDescription>
                Gerencie os documentos que fazem parte da base de conhecimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {config.documents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum documento carregado ainda
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[200px] max-w-[300px]">Arquivo</TableHead>
                        <TableHead className="whitespace-nowrap">Tamanho</TableHead>
                        <TableHead className="whitespace-nowrap">Status</TableHead>
                        <TableHead className="whitespace-nowrap">Data</TableHead>
                        <TableHead className="whitespace-nowrap">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {config.documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium max-w-[300px] break-words">{doc.filename}</TableCell>
                          <TableCell className="whitespace-nowrap">{formatFileSize(doc.size)}</TableCell>
                          <TableCell className="whitespace-nowrap">{getStatusBadge(doc.status)}</TableCell>
                          <TableCell className="whitespace-nowrap">{new Date(doc.uploadedAt).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Remover documento</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja remover o documento "{doc.filename}"? 
                                    Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteDocument(doc.id)}>
                                    Remover
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}