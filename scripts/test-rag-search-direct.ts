/**
 * Teste direto da busca vetorial sem gerar novos embeddings
 * Usa um embedding mockado para testar a query SQL
 */

import { prisma } from '@/lib/prisma'

async function testRagSearchDirect() {
  console.log('🧪 Testando busca vetorial direta (sem gerar embeddings)...\n')

  try {
    // 1. Pegar um embedding existente para usar como query (cast para text)
    const existingEmbedding = await prisma.$queryRaw<any[]>`
      SELECT embedding::text as embedding_text FROM knowledge_embeddings LIMIT 1
    `

    if (existingEmbedding.length === 0) {
      console.log('⚠️  Nenhum embedding encontrado. Execute: npx tsx scripts/rag/seed-sample-embeddings.ts')
      return
    }

    const queryEmbedding = existingEmbedding[0].embedding_text
    console.log('✓ Embedding de teste obtido\n')

    // 2. Testar busca vetorial básica
    console.log('📝 Teste 1: Busca vetorial básica')
    const results1 = await prisma.$queryRawUnsafe<any[]>(
      `SELECT 
        ke.id,
        ke.content,
        ke."sourceType",
        ke."sourceId",
        ke.metadata,
        1 - (ke.embedding <=> $1::vector) as similarity
      FROM knowledge_embeddings ke
      WHERE 1=1
      ORDER BY ke.embedding <=> $1::vector
      LIMIT $2`,
      queryEmbedding,
      3
    )
    console.log(`   ✓ ${results1.length} resultados encontrados`)
    if (results1.length > 0) {
      console.log(`   - Similaridade máxima: ${(results1[0].similarity * 100).toFixed(1)}%`)
      console.log(`   - Tipo: ${results1[0].sourceType}`)
      console.log(`   - Conteúdo: ${results1[0].content.substring(0, 80)}...`)
    }
    console.log()

    // 3. Testar busca com filtro de tipo
    console.log('📝 Teste 2: Busca com filtro de tipo')
    const results2 = await prisma.$queryRawUnsafe<any[]>(
      `SELECT 
        ke.id,
        ke.content,
        ke."sourceType",
        ke.metadata,
        1 - (ke.embedding <=> $1::vector) as similarity
      FROM knowledge_embeddings ke
      WHERE ke."sourceType" = ANY($2::"EmbeddingSourceType"[])
      ORDER BY ke.embedding <=> $1::vector
      LIMIT $3`,
      queryEmbedding,
      ['MTE_STANDARD'],
      2
    )
    console.log(`   ✓ ${results2.length} resultados de normas MTE`)
    if (results2.length > 0) {
      console.log(`   - NR: ${results2[0].metadata.nrNumber}`)
      console.log(`   - Título: ${results2[0].metadata.title}`)
    }
    console.log()

    // 4. Verificar índice vetorial
    console.log('📝 Teste 3: Verificar índices')
    const indexes = await prisma.$queryRaw<any[]>`
      SELECT indexname, indexdef 
      FROM pg_indexes 
      WHERE tablename = 'knowledge_embeddings'
    `
    console.log(`   ✓ ${indexes.length} índices encontrados`)
    indexes.forEach(idx => {
      console.log(`   - ${idx.indexname}`)
    })
    console.log()

    // 5. Estatísticas
    console.log('📊 Estatísticas:')
    const stats = await prisma.$queryRaw<any[]>`
      SELECT 
        "sourceType",
        COUNT(*) as count,
        jsonb_object_keys(metadata) as metadata_keys
      FROM knowledge_embeddings
      GROUP BY "sourceType", metadata_keys
      LIMIT 10
    `
    console.log(`   - Total de registros por tipo:`)
    const typeCount = new Map<string, number>()
    stats.forEach(s => {
      typeCount.set(s.sourceType, (typeCount.get(s.sourceType) || 0) + Number(s.count))
    })
    typeCount.forEach((count, type) => {
      console.log(`     ${type}: ${count}`)
    })
    console.log()

    console.log('✅ Todos os testes SQL concluídos com sucesso!')
    console.log('\n📌 Próximos passos:')
    console.log('   1. Adicionar créditos OpenAI para gerar embeddings reais')
    console.log('   2. Executar: npx tsx scripts/rag/generate-embeddings.ts')
    console.log('   3. Integrar RAG com geração de templates e diagnósticos\n')

  } catch (error) {
    console.error('❌ Erro:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

testRagSearchDirect()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
