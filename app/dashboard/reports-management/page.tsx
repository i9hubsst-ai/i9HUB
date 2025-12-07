"use client"

import { Card, CardContent } from '@/components/ui/card'
import { 
  BarChart, 
  Gauge, 
  FileText, 
  Download, 
  TrendingUp,
  Activity,
  PieChart,
  FileBarChart,
  Clock
} from 'lucide-react'
import Link from 'next/link'

const reportsCards = [
  {
    icon: Gauge,
    title: 'Painéis e Indicadores',
    description: 'Visualize painéis e indicadores de desempenho em SST.',
    href: '/dashboard/reports/dashboards',
  },
  {
    icon: FileText,
    title: 'Relatórios Técnicos',
    description: 'Gere relatórios técnicos especializados de SST.',
    href: '/dashboard/reports/technical',
  },
  {
    icon: Download,
    title: 'Exportações (PDF/Excel)',
    description: 'Exporte relatórios e dados em diversos formatos.',
    href: '/dashboard/reports/exports',
  },
  {
    icon: TrendingUp,
    title: 'Comparativos de Desempenho',
    description: 'Analise comparativos e tendências de performance.',
    href: '/dashboard/reports/performance',
  },
]

export default function ReportsManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground mt-2">
          Gere relatórios, painéis de indicadores e análises de desempenho em SST
        </p>
      </div>

      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Relatórios Gerados</p>
                <p className="text-2xl font-bold mt-1">89</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Painéis Ativos</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </div>
              <PieChart className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Exportações no Mês</p>
                <p className="text-2xl font-bold mt-1">234</p>
              </div>
              <FileBarChart className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Última Atualização</p>
                <p className="text-2xl font-bold mt-1">Hoje</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Acesso aos Módulos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Módulos de Relatórios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportsCards.map((card) => (
            <Link href={card.href} key={card.title}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full hover:border-primary">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Ações Rápidas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Novo Relatório</p>
                <p className="text-xs text-muted-foreground">Criar relatório técnico</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Gauge className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Ver Painéis</p>
                <p className="text-xs text-muted-foreground">Acessar indicadores</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Download className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Exportar Dados</p>
                <p className="text-xs text-muted-foreground">Gerar arquivo PDF/Excel</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
