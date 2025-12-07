"use client"

import { Card, CardContent } from '@/components/ui/card'
import { 
  GraduationCap, 
  Target, 
  Award, 
  Calendar, 
  Layers,
  Activity,
  Users,
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

const trainingCards = [
  {
    icon: GraduationCap,
    title: 'Cursos',
    description: 'Gerencie cursos de segurança e saúde do trabalho.',
    href: '/dashboard/training/courses',
  },
  {
    icon: Target,
    title: 'Trilhas',
    description: 'Crie trilhas de aprendizado personalizadas.',
    href: '/dashboard/training/tracks',
  },
  {
    icon: Award,
    title: 'Certificações',
    description: 'Controle certificações e qualificações.',
    href: '/dashboard/training/certifications',
  },
  {
    icon: Calendar,
    title: 'Reciclagens',
    description: 'Gerencie períodos de reciclagem e renovações.',
    href: '/dashboard/training/refresher',
  },
  {
    icon: Layers,
    title: 'Modelos de Certificados',
    description: 'Acesse e customize modelos de certificados.',
    href: '/dashboard/training/templates',
  },
]

export default function TrainingManagementPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Treinamentos</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie cursos, trilhas, certificações e reciclagens de SST
        </p>
      </div>

      {/* Dashboard com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cursos Ativos</p>
                <p className="text-2xl font-bold mt-1">34</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Colaboradores Treinados</p>
                <p className="text-2xl font-bold mt-1">287</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificações Emitidas</p>
                <p className="text-2xl font-bold mt-1">412</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reciclagens Pendentes</p>
                <p className="text-2xl font-bold mt-1 text-orange-600">18</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cards de Acesso aos Módulos */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Módulos de Gerenciamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingCards.map((card) => (
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
                <GraduationCap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Novo Curso</p>
                <p className="text-xs text-muted-foreground">Cadastrar novo treinamento</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Emitir Certificação</p>
                <p className="text-xs text-muted-foreground">Gerar certificado</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="font-semibold text-sm">Agendar Reciclagem</p>
                <p className="text-xs text-muted-foreground">Programar renovação</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
