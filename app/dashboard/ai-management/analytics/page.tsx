import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  ThumbsUp,
  ThumbsDown,
  Users,
  Calendar,
  Clock
} from 'lucide-react'

async function getAnalytics() {
  try {
    const now = new Date()
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [
      totalMessages,
      messagesLast30Days,
      messagesLast7Days,
      totalFeedbacks,
      positiveFeedbacks,
      negativeFeedbacks,
      totalLeads,
      messagesByDay,
      topUsers,
      feedbackByDate
    ] = await Promise.all([
      // Total de mensagens
      prisma.chatMessage.count(),
      
      // Mensagens últimos 30 dias
      prisma.chatMessage.count({
        where: { createdAt: { gte: last30Days } }
      }),
      
      // Mensagens últimos 7 dias
      prisma.chatMessage.count({
        where: { createdAt: { gte: last7Days } }
      }),
      
      // Total feedbacks
      prisma.aIFeedback.count(),
      
      // Feedbacks positivos
      prisma.aIFeedback.count({
        where: { feedback: 'POSITIVE' }
      }),
      
      // Feedbacks negativos
      prisma.aIFeedback.count({
        where: { feedback: 'NEGATIVE' }
      }),
      
      // Total leads
      prisma.lead.count(),
      
      // Mensagens por dia (últimos 30 dias)
      prisma.$queryRaw<Array<{ date: Date, count: bigint }>>`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM "chat_messages"
        WHERE created_at >= ${last30Days}
        GROUP BY DATE(created_at)
        ORDER BY date DESC
        LIMIT 30
      `,
      
      // Top 10 usuários mais ativos
      prisma.chatMessage.groupBy({
        by: ['leadId'],
        _count: true,
        orderBy: {
          _count: {
            leadId: 'desc'
          }
        },
        take: 10
      }),
      
      // Feedbacks por data
      prisma.aIFeedback.groupBy({
        by: ['feedback'],
        _count: true
      })
    ])

    // Contar leads ativos de forma simples
    const activeLeadsCount = await prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(DISTINCT lead_id)::int as count
      FROM "chat_messages"
    `
    const activeLeads = activeLeadsCount[0] ? Number(activeLeadsCount[0].count) : 0

    // Calcular taxa de aprovação
    const approvalRate = totalFeedbacks > 0 
      ? Math.round((positiveFeedbacks / totalFeedbacks) * 100) 
      : 0

    // Taxa de engajamento
    const engagementRate = totalLeads > 0
      ? Math.round((activeLeads / totalLeads) * 100)
      : 0

    // Média de mensagens por lead
    const avgMessagesPerLead = activeLeads > 0
      ? Math.round(totalMessages / activeLeads)
      : 0

    return {
      totalMessages,
      messagesLast30Days,
      messagesLast7Days,
      totalFeedbacks,
      positiveFeedbacks,
      negativeFeedbacks,
      approvalRate,
      totalLeads,
      activeLeads,
      engagementRate,
      avgMessagesPerLead,
      messagesByDay,
      topUsers
    }
  } catch (error) {
    console.error('Erro ao buscar analytics:', error)
    // Retornar valores padrão em caso de erro
    return {
      totalMessages: 0,
      messagesLast30Days: 0,
      messagesLast7Days: 0,
      totalFeedbacks: 0,
      positiveFeedbacks: 0,
      negativeFeedbacks: 0,
      approvalRate: 0,
      totalLeads: 0,
      activeLeads: 0,
      engagementRate: 0,
      avgMessagesPerLead: 0,
      messagesByDay: [],
      topUsers: []
    }
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics do MA.IA</h2>
        <p className="text-muted-foreground">
          Métricas detalhadas de uso e performance da IA
        </p>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalMessages}</div>
            <p className="text-xs text-muted-foreground">
              +{analytics.messagesLast7Days} nos últimos 7 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.approvalRate}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.positiveFeedbacks} de {analytics.totalFeedbacks} feedbacks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.engagementRate}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.activeLeads} de {analytics.totalLeads} leads ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média de Mensagens</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgMessagesPerLead}</div>
            <p className="text-xs text-muted-foreground">
              Por lead ativo
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Métricas de Feedback */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedbacks Positivos</CardTitle>
            <ThumbsUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.positiveFeedbacks}</div>
            <p className="text-xs text-muted-foreground">
              Respostas aprovadas pelos usuários
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedbacks Negativos</CardTitle>
            <ThumbsDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{analytics.negativeFeedbacks}</div>
            <p className="text-xs text-muted-foreground">
              Respostas rejeitadas pelos usuários
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalFeedbacks}</div>
            <p className="text-xs text-muted-foreground">
              Feedbacks recebidos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Atividade nos Últimos 30 Dias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Atividade nos Últimos 30 Dias
          </CardTitle>
          <CardDescription>
            Número de mensagens trocadas por dia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analytics.messagesByDay.slice(0, 10).map((day, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(day.date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(Number(day.count) / Math.max(...analytics.messagesByDay.map(d => Number(d.count))) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">
                    {day.count.toString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Usuários Mais Ativos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Top 10 Usuários Mais Ativos
          </CardTitle>
          <CardDescription>
            Leads com mais mensagens trocadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {analytics.topUsers.map((user, index) => (
              <div key={user.leadId} className="flex items-center justify-between border-b pb-2 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    Lead {user.leadId.substring(0, 8)}...
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {user._count} mensagens
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
