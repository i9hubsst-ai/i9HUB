// Script para visualizar a base de conhecimento atual
import { prisma } from '../lib/prisma'

async function showKnowledgeBase() {
  console.log('📚 BASE DE CONHECIMENTO - i9HUBSST\n')
  console.log('=' .repeat(80))

  try {
    // Contar total de embeddings
    const total = await prisma.knowledgeEmbedding.count()
    console.log(`\n✅ Total de embeddings: ${total}`)

    if (total === 0) {
      console.log('\n⚠️  BASE VAZIA - Nenhum embedding encontrado!')
      console.log('\n💡 Para adicionar conhecimento:')
      console.log('   1. Use o endpoint: POST /api/ai/knowledge/upload')
      console.log('   2. Ou rode o script de seed com dados de NRs')
      return
    }

    // Agrupar por tipo de fonte
    const byType = await prisma.knowledgeEmbedding.groupBy({
      by: ['sourceType'],
      _count: true,
    })

    console.log('\n📊 DISTRIBUIÇÃO POR TIPO:')
    console.log('-'.repeat(80))
    byType.forEach(item => {
      console.log(`   ${item.sourceType.padEnd(20)} → ${item._count} embeddings`)
    })

    // Buscar algumas amostras de cada tipo
    console.log('\n📄 AMOSTRAS DO CONTEÚDO:')
    console.log('-'.repeat(80))

    for (const type of byType) {
      const samples = await prisma.knowledgeEmbedding.findMany({
        where: { sourceType: type.sourceType },
        take: 2,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          sourceType: true,
          sourceId: true,
          content: true,
          metadata: true,
          createdAt: true,
        }
      })

      console.log(`\n🔹 ${type.sourceType}:`)
      samples.forEach((sample, idx) => {
        console.log(`\n   Amostra ${idx + 1}:`)
        console.log(`   ID: ${sample.id}`)
        console.log(`   Source ID: ${sample.sourceId}`)
        console.log(`   Criado em: ${sample.createdAt.toLocaleString('pt-BR')}`)
        console.log(`   Metadata:`, sample.metadata)
        console.log(`   Conteúdo (preview):`)
        const preview = sample.content.substring(0, 200)
        console.log(`   "${preview}${sample.content.length > 200 ? '...' : ''}"`)
      })
    }

    // Verificar se há NRs específicas
    console.log('\n\n🔍 BUSCA POR NRs ESPECÍFICAS:')
    console.log('-'.repeat(80))

    const nrKeywords = ['NR-1', 'NR-6', 'NR-7', 'NR-9', 'NR-12', 'NR-17', 'NR-35', 'ISO 45001']
    
    for (const keyword of nrKeywords) {
      const count = await prisma.knowledgeEmbedding.count({
        where: {
          content: {
            contains: keyword,
            mode: 'insensitive'
          }
        }
      })
      
      if (count > 0) {
        console.log(`   ✅ ${keyword.padEnd(12)} → ${count} embeddings`)
      } else {
        console.log(`   ❌ ${keyword.padEnd(12)} → Não encontrado`)
      }
    }

    console.log('\n' + '='.repeat(80))
    console.log('✅ Consulta concluída!\n')

  } catch (error) {
    console.error('❌ Erro ao consultar base:', error)
  } finally {
    await prisma.$disconnect()
  }
}

showKnowledgeBase()
