"use client"

import { Card, CardContent } from '@/components/ui/card'
import { 
  HardHat,
  Database,
  FileCheck,
  Calendar,
  Bell,
  FileText,
  Layers,
  Package,
  TrendingUp,
  Users
} from 'lucide-react'
import Link from 'next/link'

const epiCards = [
  {
    icon: Database,
    title: 'Catálogo de EPIs e Fornecedores',
    description: 'Gerencie o catálogo completo de EPIs e seus fornecedores.',
    href: '/dashboard/epi/catalog',
  },
  {
    icon: FileCheck,
    title: 'Entregas e Devoluções',
    description: 'Controle entregas e devoluções de equipamentos de proteção.',
    href: '/dashboard/epi/delivery',
  },
  {
    icon: Calendar,
    title: 'Controle de CA e Validade',
    description: 'Acompanhe certificados de aprovação e validades dos EPIs.',
    href: '/dashboard/epi/control',
  },
  {
    icon: Bell,
    title: 'Alertas e Reposição',
    description: 'Receba alertas de vencimento e gerencie reposições.',
    href: '/dashboard/epi/alerts',
  },
  {
    icon: FileText,
    title: 'Termos de Recebimento',
    description: 'Gere e gerencie termos de recebimento de EPIs.',
    href: '/dashboard/epi/terms',
  },
  {
    icon: Layers,
    title: 'Modelos de Documentos de EPI',
    description: 'Templates e modelos para documentação de EPIs.',
    href: '/dashboard/epi/templates',
  },
  {
    icon: Package,
    title: 'Estoque de EPIs',
    description: 'Controle o estoque e movimentação de equipamentos.',
    href: '/dashboard/epi/stock',
  },
]

export default function EPIManagementPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <HardHat className="w-8 h-8" />
          Gestão de EPIs
        </h1>
        <p className="text-muted-foreground mt-2">
          Sistema completo de gerenciamento de Equipamentos de Proteção Individual
        </p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">EPIs Cadastrados</p>
                <p className="text-2xl font-bold text-primary">156</p>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +12 novos este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CAs Vencendo</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Próximos 30 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Entregas do Mês</p>
                <p className="text-2xl font-bold text-green-600">342</p>
              </div>
              <FileCheck className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              +18% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Colaboradores</p>
                <p className="text-2xl font-bold text-primary">89</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Com EPIs ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Módulos do Sistema</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {epiCards.map((card) => {
            const Icon = card.icon
            return (
              <Link key={card.href} href={card.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-primary cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4">Ações Rápidas</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <Link href="/dashboard/epi/delivery">
              <button className="w-full p-4 text-left border rounded-lg hover:bg-accent transition-colors">
                <FileCheck className="w-5 h-5 mb-2 text-primary" />
                <p className="font-medium">Nova Entrega</p>
                <p className="text-xs text-muted-foreground">Registrar entrega de EPI</p>
              </button>
            </Link>
            <Link href="/dashboard/epi/catalog">
              <button className="w-full p-4 text-left border rounded-lg hover:bg-accent transition-colors">
                <Database className="w-5 h-5 mb-2 text-primary" />
                <p className="font-medium">Cadastrar EPI</p>
                <p className="text-xs text-muted-foreground">Adicionar novo equipamento</p>
              </button>
            </Link>
            <Link href="/dashboard/epi/alerts">
              <button className="w-full p-4 text-left border rounded-lg hover:bg-accent transition-colors">
                <Bell className="w-5 h-5 mb-2 text-primary" />
                <p className="font-medium">Ver Alertas</p>
                <p className="text-xs text-muted-foreground">Verificar pendências</p>
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
