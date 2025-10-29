'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

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
        const [totalCompanies, totalUsers, totalAssessments, totalActions] = await Promise.all([
          prisma.company.count(),
          prisma.membership.count({ where: { status: 'ACTIVE' } }),
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
          warning: 'Dados temporários - problemas de conexão com banco de dados'
        }
      }
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { error: 'Erro ao buscar estatísticas' }
  }
}
