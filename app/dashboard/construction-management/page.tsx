"use client"

import { Card, CardContent } from '@/components/ui/card'
import { 
  Building, 
  MapPin, 
  FileCheck, 
  ClipboardList, 
  Users, 
  Camera, 
  Layers,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

const constructionCards = [
  {
    icon: MapPin,
    title: 'Planejamento de Obras e Frentes',
    description: 'Planeje e gerencie obras, frentes de trabalho e cronogramas.',
    href: '/dashboard/construction/planning',
  },
  {
    icon: FileCheck,
    title: 'Permissões de Trabalho (PT)',
    description: 'Controle permissões de trabalho e autorizações.',
    href: '/dashboard/construction/permits',
  },
  {
    icon: ClipboardList,
    title: 'Checklists (Andaimes/Escadas/Linhas)',
    description: 'Gerencie checklists de segurança para equipamentos.',
    href: '/dashboard/construction/checklists',
  },
  {
    icon: Users,
    title: 'Integração de Terceiros',
    description: 'Controle e integre empresas terceirizadas.',
    href: '/dashboard/construction/integration',
  },
  {
    icon: Camera,
    title: 'Registros Fotográficos e Relatórios',
    description: 'Documente obras com fotos e relatórios detalhados.',
    href: '/dashboard/construction/reports',
  },
  {
    icon: Layers,
    title: 'Modelos de Relatórios de Obra',
    description: 'Acesse e customize modelos de relatórios.',
    href: '/dashboard/construction/templates',
  },
]

export default function ConstructionManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Obras</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie obras, permissões de trabalho, checklists e integração de terceiros
        </p>
      </div>

      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Obras Ativas</p>
                <p className="text-2xl font-bold mt-1">23</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">PTs Pendentes</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">12</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Checklists Concluídos</p>
                <p className="text-2xl font-bold mt-1 text-green-600">187</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Terceiros Ativos</p>
                <p className="text-2xl font-bold mt-1">34</p>
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
          {constructionCards.map((card) => (
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
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Nova Obra</p>
                <p className="text-xs text-muted-foreground">Cadastrar nova obra</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileCheck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Nova PT</p>
                <p className="text-xs text-muted-foreground">Emitir permissão de trabalho</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ClipboardList className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Novo Checklist</p>
                <p className="text-xs text-muted-foreground">Criar checklist de segurança</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
