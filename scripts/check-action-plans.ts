import { prisma } from '@/lib/prisma'

async function checkActionPlans() {
  console.log('🔍 Verificando Planos de Ação...\n')

  // Contar todos os planos
  const totalPlans = await prisma.actionPlan.count()
  console.log(`📊 Total de registros na tabela action_plans: ${totalPlans}`)

  // Contar por tipo
  const aiGenerated = await prisma.actionPlan.count({ where: { aiGenerated: true } })
  const manual = await prisma.actionPlan.count({ where: { aiGenerated: false } })
  console.log(`🤖 Gerados por IA: ${aiGenerated}`)
  console.log(`✍️  Manuais: ${manual}\n`)

  // Buscar todos os planos com detalhes
  const allPlans = await prisma.actionPlan.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      assessment: {
        select: {
          id: true,
          title: true,
          status: true
        }
      }
    }
  })

  console.log('📋 Detalhes dos Planos:\n')
  allPlans.forEach((plan, index) => {
    console.log(`--- Plano ${index + 1} ---`)
    console.log(`ID: ${plan.id}`)
    console.log(`Título: ${plan.title}`)
    console.log(`Assessment: ${plan.assessment.title} (${plan.assessment.status})`)
    console.log(`Prioridade: ${plan.priority}`)
    console.log(`Status: ${plan.status}`)
    console.log(`IA?: ${plan.aiGenerated ? 'Sim' : 'Não'}`)
    console.log(`Criado em: ${plan.createdAt.toISOString()}`)
    console.log(`Descrição (primeiros 100 chars): ${plan.description.substring(0, 100)}...`)
    console.log('')
  })

  // Contar por assessment
  const plansByAssessment = await prisma.actionPlan.groupBy({
    by: ['assessmentId'],
    _count: { id: true }
  })

  console.log('📊 Planos por Diagnóstico:')
  for (const group of plansByAssessment) {
    const assessment = await prisma.assessment.findUnique({
      where: { id: group.assessmentId },
      select: { title: true }
    })
    console.log(`  - ${assessment?.title}: ${group._count.id} planos`)
  }

  console.log('\n✅ Verificação concluída!')
}

checkActionPlans()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
