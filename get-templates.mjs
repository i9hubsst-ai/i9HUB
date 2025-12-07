import { prisma } from './lib/prisma.js'

async function getTemplates() {
  try {
    console.log('🔍 Buscando templates...\n')

    const templates = await prisma.diagnosticTemplate.findMany({
      take: 5,
      select: {
        id: true,
        name: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    console.log(`📋 Templates encontrados: ${templates.length}\n`)
    templates.forEach(t => {
      console.log(`- ID: ${t.id}`)
      console.log(`  Nome: ${t.name}`)
      console.log(`  Status: ${t.status}`)
      console.log(`  Criado em: ${t.createdAt.toISOString()}`)
      console.log('')
    })

    await prisma.$disconnect()
  } catch (error) {
    console.error('❌ Erro:', error)
    await prisma.$disconnect()
  }
}

getTemplates()
