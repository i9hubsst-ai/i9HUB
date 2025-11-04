'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

export async function getDashboardStats() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    console.log('📊 DASHBOARD STATS: Iniciando busca de estatísticas')
    const isAdmin = await isPlatformAdmin(user.id)

    if (isAdmin) {
      console.log('👑 DASHBOARD STATS: Usuário é admin, buscando estatísticas completas...')
      
      try {
        // Contar todos os usuários do Supabase Auth
        const supabase = await createClient()
        const { data: { users }, error: usersError } = await supabase.auth.admin.listUsers()
        const totalUsers = usersError ? 0 : users.length
        
        const [totalCompanies, totalAssessments, totalActions] = await Promise.all([
          prisma.company.count(),
          prisma.assessment.count(),
          prisma.actionPlan.count(),
        ])

        const recentAssessments = await prisma.assessment.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            company: true,
            scores: true,
          }
        })

        // Dados para gráfico de status dos diagnósticos
        const assessmentsByStatus = await prisma.assessment.groupBy({
          by: ['status'],
          _count: true,
        })

        const statusData = {
          inProgress: assessmentsByStatus.find(s => s.status === 'IN_PROGRESS')?._count || 0,
          completed: assessmentsByStatus.find(s => s.status === 'COMPLETED')?._count || 0,
          pending: (assessmentsByStatus.find(s => s.status === 'DRAFT')?._count || 0) + 
                   (assessmentsByStatus.find(s => s.status === 'SUBMITTED')?._count || 0),
        }

        // Dados para gráfico de evolução (últimos 6 meses)
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const assessmentsByMonth = await prisma.assessment.findMany({
          where: {
            createdAt: {
              gte: sixMonthsAgo
            }
          },
          select: {
            createdAt: true
          }
        })

        // Agrupar por mês
        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        const monthCounts = new Map<string, number>()
        
        // Inicializar últimos 6 meses com 0
        for (let i = 5; i >= 0; i--) {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          const key = `${monthNames[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`
          monthCounts.set(key, 0)
        }

        // Contar diagnósticos por mês
        assessmentsByMonth.forEach(assessment => {
          const date = new Date(assessment.createdAt)
          const key = `${monthNames[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`
          monthCounts.set(key, (monthCounts.get(key) || 0) + 1)
        })

        const trendData = Array.from(monthCounts.entries()).map(([month, count]) => ({
          month,
          count
        }))

        // Dados para gráfico de achados por categoria (top 5)
        const findingsBySection = await prisma.finding.groupBy({
          by: ['sectionTitle', 'severity'],
          _count: true,
          orderBy: {
            _count: {
              sectionTitle: 'desc'
            }
          },
          take: 5
        })

        const categoryData = findingsBySection.map(item => ({
          category: item.sectionTitle || 'Sem categoria',
          count: item._count,
          severity: item.severity as 'HIGH' | 'MEDIUM' | 'LOW'
        }))

        console.log('✅ DASHBOARD STATS: Estatísticas carregadas com sucesso')
        return {
          success: true,
          stats: {
            totalCompanies,
            totalUsers,
            totalAssessments,
            totalActions,
          },
          recentAssessments,
          charts: {
            assessmentStatus: statusData,
            assessmentTrend: trendData,
            findingsByCategory: categoryData,
          }
        }
        
      } catch (dbError) {
        console.error('🔴 DASHBOARD STATS: Erro de conexão com banco:', dbError)
        
        // Retornar dados mock quando não conseguir conectar
        console.log('🟡 DASHBOARD STATS: Retornando dados temporários devido a erro de conexão')
        return {
          success: true,
          stats: {
            totalCompanies: 0,
            totalUsers: 1,
            totalAssessments: 0,
            totalActions: 0,
          },
          recentAssessments: [],
          charts: {
            assessmentStatus: { inProgress: 0, completed: 0, pending: 0 },
            assessmentTrend: [],
            findingsByCategory: [],
          },
          warning: 'Dados temporários - problemas de conexão com banco de dados'
        }
      }
      
    } else {
      console.log('👤 DASHBOARD STATS: Usuário comum, buscando estatísticas das empresas...')
      
      try {
        const memberships = await prisma.membership.findMany({
          where: {
            userId: user.id,
            status: 'ACTIVE'
          },
          select: {
            companyId: true
          }
        })

        const companyIds = memberships.map(m => m.companyId)

        const [totalCompanies, totalAssessments, totalActions] = await Promise.all([
          prisma.company.count({ where: { id: { in: companyIds } } }),
          prisma.assessment.count({ where: { companyId: { in: companyIds } } }),
          prisma.actionPlan.count({ where: { companyId: { in: companyIds } } }),
        ])

        const recentAssessments = await prisma.assessment.findMany({
          where: { companyId: { in: companyIds } },
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            company: true,
            scores: true,
          }
        })

        // Dados para gráficos (filtrados por empresas do usuário)
        const assessmentsByStatus = await prisma.assessment.groupBy({
          by: ['status'],
          where: { companyId: { in: companyIds } },
          _count: true,
        })

        const statusData = {
          inProgress: assessmentsByStatus.find(s => s.status === 'IN_PROGRESS')?._count || 0,
          completed: assessmentsByStatus.find(s => s.status === 'COMPLETED')?._count || 0,
          pending: (assessmentsByStatus.find(s => s.status === 'DRAFT')?._count || 0) + 
                   (assessmentsByStatus.find(s => s.status === 'SUBMITTED')?._count || 0),
        }

        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const assessmentsByMonth = await prisma.assessment.findMany({
          where: {
            companyId: { in: companyIds },
            createdAt: { gte: sixMonthsAgo }
          },
          select: { createdAt: true }
        })

        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        const monthCounts = new Map<string, number>()
        
        for (let i = 5; i >= 0; i--) {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          const key = `${monthNames[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`
          monthCounts.set(key, 0)
        }

        assessmentsByMonth.forEach(assessment => {
          const date = new Date(assessment.createdAt)
          const key = `${monthNames[date.getMonth()]}/${date.getFullYear().toString().slice(-2)}`
          monthCounts.set(key, (monthCounts.get(key) || 0) + 1)
        })

        const trendData = Array.from(monthCounts.entries()).map(([month, count]) => ({
          month,
          count
        }))

        const findingsBySection = await prisma.finding.groupBy({
          by: ['sectionTitle', 'severity'],
          where: {
            assessment: {
              companyId: { in: companyIds }
            }
          },
          _count: true,
          orderBy: {
            _count: {
              sectionTitle: 'desc'
            }
          },
          take: 5
        })

        const categoryData = findingsBySection.map(item => ({
          category: item.sectionTitle || 'Sem categoria',
          count: item._count,
          severity: item.severity as 'HIGH' | 'MEDIUM' | 'LOW'
        }))

        console.log('✅ DASHBOARD STATS: Estatísticas de usuário carregadas')
        return {
          success: true,
          stats: {
            totalCompanies,
            totalUsers: memberships.length,
            totalAssessments,
            totalActions,
          },
          recentAssessments,
          charts: {
            assessmentStatus: statusData,
            assessmentTrend: trendData,
            findingsByCategory: categoryData,
          }
        }
        
      } catch (dbError) {
        console.error('🔴 DASHBOARD STATS: Erro de conexão (usuário comum):', dbError)
        
        return {
          success: true,
          stats: {
            totalCompanies: 0,
            totalUsers: 0,
            totalAssessments: 0,
            totalActions: 0,
          },
          recentAssessments: [],
          charts: {
            assessmentStatus: { inProgress: 0, completed: 0, pending: 0 },
            assessmentTrend: [],
            findingsByCategory: [],
          },
          warning: 'Dados temporários - problemas de conexão com banco de dados'
        }
      }
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { error: 'Erro ao buscar estatísticas' }
  }
}
