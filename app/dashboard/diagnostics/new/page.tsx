'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewDiagnosticPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implementar criação de assessment via API
      console.log('Creating assessment:', { title, description })
      
      // Simulação
      setTimeout(() => {
        router.push('/dashboard/diagnostics')
      }, 1000)
    } catch (error) {
      console.error('Error creating assessment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <Link 
          href="/dashboard/diagnostics" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Diagnósticos
        </Link>
        <h1 className="text-3xl font-bold text-primary">Novo Diagnóstico IMSST</h1>
        <p className="text-muted-foreground">
          Crie uma nova avaliação de maturidade SST para sua empresa
        </p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Diagnóstico</CardTitle>
            <CardDescription>
              Preencha os dados básicos para iniciar a avaliação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Diagnóstico</Label>
                <Input
                  id="title"
                  placeholder="Ex: Diagnóstico Q1 2025"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Escolha um nome que ajude a identificar este diagnóstico
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (opcional)</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[100px] px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Informações adicionais sobre este diagnóstico..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="bg-accent/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">O que acontece a seguir?</h3>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Você responderá 25 perguntas divididas em 5 dimensões</li>
                  <li>O sistema calculará automaticamente seu nível de maturidade (1-5)</li>
                  <li>Um plano de ação personalizado será gerado por IA</li>
                  <li>Você poderá gerar relatórios em PDF com os resultados</li>
                </ol>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading || !title}>
                  {loading ? 'Criando...' : 'Criar Diagnóstico'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => router.push('/dashboard/diagnostics')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">⚠️ Configuração Necessária</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-700">
            <p>
              Para criar diagnósticos, é necessário configurar as credenciais do Supabase e executar as migrações do banco de dados.
            </p>
            <p className="mt-2">
              Consulte o README.md para instruções detalhadas de configuração.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
