import { Suspense } from 'react'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, MessageSquare, ThumbsUp, Users, TrendingUp } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getDashboardStats() {
  try {
    const [
      totalLeads,
      totalMessages,
      positiveFeedbacks,
      recentLeads
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.chatMessage.count(),
      prisma.aIFeedback.count({
        where: { feedback: 'POSITIVE' }
      }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          createdAt: true
      }
    })
  ])

  return {
    totalLeads,
    totalMessages,
    positiveFeedbacks,
    recentLeads
  }
  } catch (error) {
    console.error('Erro ao buscar stats:', error)
    return {
      totalLeads: 0,
      totalMessages: 0,
      positiveFeedbacks: 0,
      recentLeads: []
    }
  }
}

export default async function AIManagementDashboard() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const isAdmin = await isPlatformAdmin(user.id)
  
  if (!isAdmin) {
    redirect('/dashboard')
  }

  const stats = await getDashboardStats()

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              Cadastrados no MA.IA
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensagens Trocadas</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              Conversas com a IA
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedbacks Positivos</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.positiveFeedbacks}</div>
            <p className="text-xs text-muted-foreground">
              Respostas aprovadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalMessages > 0 
                ? Math.round((stats.positiveFeedbacks / stats.totalMessages) * 100) 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Qualidade das respostas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Últimos Leads Cadastrados */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos Leads Cadastrados</CardTitle>
          <CardDescription>
            Os 5 cadastros mais recentes no MA.IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.email}</p>
                  {lead.company && (
                    <p className="text-xs text-muted-foreground">{lead.company}</p>
                  )}
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:bg-accent cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Configurar Prompt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ajuste o comportamento da IA editando o prompt do sistema
            </p>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5" />
              Gerenciar Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Visualize e gerencie todos os leads cadastrados
            </p>
          </CardContent>
        </Card>

        <Card className="hover:bg-accent cursor-pointer transition-colors">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Ver Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analise métricas detalhadas de uso e performance
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}