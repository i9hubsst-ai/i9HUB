"use client"

import { Card, CardContent } from '@/components/ui/card'
import { 
  Search,
  ClipboardList,
  Eye,
  Gauge,
  AlertTriangle,
  BarChart,
  Layers,
  Activity,
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

const inspectionCards = [
  {
    icon: ClipboardList,
    title: 'Checklists',
    description: 'Crie e gerencie checklists de inspeção e segurança.',
    href: '/dashboard/inspections/checklists',
  },
  {
    icon: Eye,
    title: 'Inspeções em Campo',
    description: 'Registre inspeções realizadas em campo.',
    href: '/dashboard/inspections/field',
  },
  {
    icon: Gauge,
    title: 'Medições Ambientais e Ocupacionais',
    description: 'Controle medições de agentes físicos, químicos e biológicos.',
    href: '/dashboard/inspections/measurements',
  },
  {
    icon: AlertTriangle,
    title: 'Não Conformidades',
    description: 'Gerencie não conformidades identificadas.',
    href: '/dashboard/inspections/non-compliance',
  },
  {
    icon: BarChart,
    title: 'Relatórios de Inspeção',
    description: 'Gere e visualize relatórios de inspeções.',
    href: '/dashboard/inspections/reports',
  },
  {
    icon: Layers,
    title: 'Modelos de Checklists e Relatórios',
    description: 'Acesse e customize modelos de documentos.',
    href: '/dashboard/inspections/templates',
  },
]

export default function InspectionsManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inspeções e Medições</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie inspeções, medições ambientais, checklists e não conformidades
        </p>
      </div>

      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inspeções no Mês</p>
                <p className="text-2xl font-bold mt-1">142</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Não Conformidades</p>
                <p className="text-2xl font-bold mt-1 text-red-600">23</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Checklists Concluídos</p>
                <p className="text-2xl font-bold mt-1 text-green-600">387</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Medições Realizadas</p>
                <p className="text-2xl font-bold mt-1">156</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Acesso aos Módulos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Módulos de Gerenciamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inspectionCards.map((card) => (
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
                <ClipboardList className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Novo Checklist</p>
                <p className="text-xs text-muted-foreground">Criar checklist de inspeção</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Nova Inspeção</p>
                <p className="text-xs text-muted-foreground">Registrar inspeção em campo</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Gauge className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Nova Medição</p>
                <p className="text-xs text-muted-foreground">Registrar medição ambiental</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
