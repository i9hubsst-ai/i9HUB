"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Shield, AlertTriangle, FileText, ClipboardList, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const riskCards = [
  {
    icon: Shield,
    title: 'Mapa de Riscos',
    description: 'Visualize e edite o mapa de riscos da empresa.',
    href: '/dashboard/risk-management/mapa',
  },
  {
    icon: AlertTriangle,
    title: 'Inventário de Riscos',
    description: 'Gerencie o inventário completo dos riscos identificados.',
    href: '/dashboard/risk-management/inventario',
  },
  {
    icon: FileText,
    title: 'Relatórios de Riscos',
    description: 'Acesse relatórios detalhados sobre riscos e controles.',
    href: '/dashboard/risk-management/relatorios',
  },
  {
    icon: ClipboardList,
    title: 'Planos de Ação',
    description: 'Crie e acompanhe planos de ação para mitigação de riscos.',
    href: '/dashboard/risk-management/planos',
  },
  {
    icon: TrendingUp,
    title: 'Indicadores de Risco',
    description: 'Monitore indicadores e tendências de riscos.',
    href: '/dashboard/risk-management/indicadores',
  },
]

export default function RiskManagementPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Gerenciamento de Riscos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {riskCards.map((card) => (
          <Link href={card.href} key={card.title}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-start gap-4">
                <card.icon className="w-8 h-8 text-primary" />
                <div>
                  <h2 className="text-lg font-semibold mb-1">{card.title}</h2>
                  <p className="text-muted-foreground text-sm">{card.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
