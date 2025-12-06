"use client"

import { Card, CardContent } from '@/components/ui/card'
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  ClipboardList, 
  TrendingUp,
  Database,
  Layers,
  Target,
  Activity,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

const riskCards = [
  {
    icon: AlertTriangle,
    title: 'Cadastro e Avaliação de Riscos',
    description: 'Cadastre e avalie riscos ocupacionais identificados.',
    href: '/dashboard/risks/assessment',
  },
  {
    icon: Database,
    title: 'Base de Agentes',
    description: 'Gerencie agentes físicos, químicos e biológicos.',
    href: '/dashboard/risks/agents',
  },
  {
    icon: Layers,
    title: 'Medidas de Prevenção e Controles',
    description: 'Defina medidas de prevenção e controles de riscos.',
    href: '/dashboard/risks/prevention',
  },
  {
    icon: Target,
    title: 'Planos de Mitigação',
    description: 'Crie e gerencie planos de mitigação de riscos.',
    href: '/dashboard/risks/mitigation',
  },
  {
    icon: FileText,
    title: 'Documentos Técnicos',
    description: 'PGR, PCMSO, PCMAT e outros documentos.',
    href: '/dashboard/risks/documents',
  },
  {
    icon: ClipboardList,
    title: 'Registros de Inspeções e Incidentes',
    description: 'Registre inspeções e incidentes relacionados a riscos.',
    href: '/dashboard/risks/inspections',
  },
  {
    icon: Layers,
    title: 'Modelos de PGR e Documentos',
    description: 'Acesse modelos e templates de documentos.',
    href: '/dashboard/risks/templates',
  },
]

export default function RiskManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Riscos</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie riscos ocupacionais, documentos técnicos e planos de mitigação
        </p>
      </div>

      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Riscos Ativos</p>
                <p className="text-2xl font-bold mt-1">45</p>
              </div>
              <Activity className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Riscos Críticos</p>
                <p className="text-2xl font-bold mt-1 text-red-600">8</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Planos Ativos</p>
                <p className="text-2xl font-bold mt-1">12</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Taxa de Mitigação</p>
                <p className="text-2xl font-bold mt-1 text-green-600">78%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Acesso aos Módulos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Módulos de Gerenciamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {riskCards.map((card) => (
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
    </div>
  )
}
