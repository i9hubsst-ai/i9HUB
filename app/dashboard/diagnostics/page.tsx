import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function DiagnosticsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Diagnósticos IMSST</h1>
          <p className="text-muted-foreground">
            Avaliação de maturidade em Segurança e Saúde do Trabalho
          </p>
        </div>
        <Link href="/dashboard/diagnostics/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Diagnóstico
          </Button>
        </Link>
      </div>

      {/* IMSST Info Card */}
      <Card className="border-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-accent" />
            O que é o IMSST?
          </CardTitle>
          <CardDescription>
            Índice de Maturidade do Sistema de Segurança do Trabalho
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            O IMSST avalia o nível de maturidade da gestão de SST da sua empresa em 5 dimensões fundamentais:
          </p>
          <div className="grid gap-3 md:grid-cols-5">
            <div className="bg-chart-1/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Liderança</div>
              <div className="text-xs text-muted-foreground mt-1">
                Comprometimento da alta direção
              </div>
            </div>
            <div className="bg-chart-2/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Processos</div>
              <div className="text-xs text-muted-foreground mt-1">
                Documentação e padronização
              </div>
            </div>
            <div className="bg-chart-3/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Conformidade</div>
              <div className="text-xs text-muted-foreground mt-1">
                Atendimento legal
              </div>
            </div>
            <div className="bg-chart-4/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Capacitação</div>
              <div className="text-xs text-muted-foreground mt-1">
                Treinamentos e conscientização
              </div>
            </div>
            <div className="bg-chart-5/10 p-3 rounded-lg">
              <div className="font-semibold text-sm">Dados</div>
              <div className="text-xs text-muted-foreground mt-1">
                Indicadores e análises
              </div>
            </div>
          </div>
          <div className="bg-primary/5 p-3 rounded-lg">
            <p className="text-sm">
              <strong>Níveis de Maturidade:</strong> 1 (Inicial) → 2 (Gerenciado) → 3 (Definido) → 4 (Quantitativamente Gerenciado) → 5 (Em Otimização)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Assessments List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Diagnósticos Realizados</h2>
        
        <div className="grid gap-4">
          {/* Empty State */}
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Nenhum diagnóstico realizado
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Comece criando seu primeiro diagnóstico IMSST para avaliar o nível de maturidade da gestão de SST da sua empresa.
              </p>
              <Link href="/dashboard/diagnostics/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Criar Primeiro Diagnóstico
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Example Assessment Cards (commented for future use) */}
          {/* 
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Diagnóstico Q1 2025</CardTitle>
                  <CardDescription>
                    Criado em 15 de Janeiro de 2025
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Concluído</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-2xl font-bold text-primary">Nível 3</div>
                  <div className="text-sm text-muted-foreground">Definido</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold text-primary">72%</div>
                  <div className="text-sm text-muted-foreground">Pontuação Geral</div>
                </div>
                <div className="flex-1 text-right">
                  <Button variant="outline" size="sm">
                    Ver Relatório
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          */}
        </div>
      </div>
    </div>
  )
}
