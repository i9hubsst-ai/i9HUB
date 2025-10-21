'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

export async function getDashboardStats() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  // Verificar se existe algum admin no sistema
  const adminCount = await prisma.platformAdmin.count()
  if (adminCount === 0) {
    return { error: 'Nenhum administrador configurado. Acesse /setup para configurar.' }
  }

  try {
    const isAdmin = await isPlatformAdmin(user.id)

    if (isAdmin) {
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
    } else {
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
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { error: 'Erro ao buscar estatísticas' }
  }
}
