"use client"

import { Card, CardContent } from '@/components/ui/card'
import { 
  Target, 
  FileText, 
  Bell, 
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react'
import Link from 'next/link'

const actionPlansCards = [
  {
    icon: Target,
    title: 'Minhas Ações',
    description: 'Gerencie suas ações atribuídas e responsabilidades.',
    href: '/dashboard/actions/my',
  },
  {
    icon: FileText,
    title: 'Todas as Ações',
    description: 'Visualize e gerencie todas as ações do sistema.',
    href: '/dashboard/actions',
  },
  {
    icon: Bell,
    title: 'Alertas e Prazos',
    description: 'Acompanhe alertas e prazos de vencimento.',
    href: '/dashboard/actions/alerts',
  },
  {
    icon: Calendar,
    title: 'Cronogramas e Status',
    description: 'Visualize cronogramas e status de execução.',
    href: '/dashboard/actions/schedule',
  },
]

export default function ActionPlansManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Planos de Ação</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie planos de ação, cronogramas e acompanhe o progresso das atividades
        </p>
      </div>

      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ações Ativas</p>
                <p className="text-2xl font-bold mt-1">67</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Atrasadas</p>
                <p className="text-2xl font-bold mt-1 text-red-600">15</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold mt-1 text-green-600">234</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vencendo em 7 dias</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">8</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Acesso aos Módulos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Módulos de Gerenciamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actionPlansCards.map((card) => (
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
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Nova Ação</p>
                <p className="text-xs text-muted-foreground">Criar novo plano de ação</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Ver Alertas</p>
                <p className="text-xs text-muted-foreground">Verificar ações vencendo</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Relatório</p>
                <p className="text-xs text-muted-foreground">Gerar relatório de ações</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
