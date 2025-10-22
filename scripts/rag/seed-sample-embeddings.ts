/**
 * Script para inserir embeddings de exemplo (mockados) para demonstração
 * 
 * Em produção, os embeddings seriam gerados via OpenAI
 * Este script cria dados sintéticos para demonstrar o sistema RAG funcionando
 */

import { prisma } from '@/lib/prisma'

async function seedSampleEmbeddings() {
  console.log('🚀 Inserindo embeddings de exemplo para demonstração...\n')

  try {
    // Buscar normas do banco
    const standards = await prisma.mteStandard.findMany({
      orderBy: { nrNumber: 'asc' }
    })

    if (standards.length === 0) {
      console.log('⚠️  Nenhuma norma encontrada. Execute primeiro: npx tsx scripts/rag/scrape-mte-standards.ts')
      return
    }

    // Gerar embedding mockado (1536 dimensões com valores aleatórios normalizados)
    function generateMockEmbedding(): number[] {
      const embedding: number[] = []
      for (let i = 0; i < 1536; i++) {
        embedding.push((Math.random() - 0.5) * 0.1) // Valores pequenos para simular embeddings normalizados
      }
      // Normalizar
      const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
      return embedding.map(val => val / magnitude)
    }

    let totalInserted = 0

    for (const standard of standards) {
      console.log(`📄 Processando ${standard.nrNumber}: ${standard.title}`)

      // Pegar trechos pequenos do conteúdo
      const content = standard.content
      const chunks = [
        content.substring(0, 500),
        content.substring(500, 1000)
      ].filter(c => c.length > 0)

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        const mockEmbedding = generateMockEmbedding()
        
        const metadata = {
          nrNumber: standard.nrNumber,
          title: standard.title,
          section: standard.section || '',
          version: standard.version,
          chunkIndex: i,
          totalChunks: chunks.length,
          note: 'Mock embedding for demonstration purposes'
        }

        await prisma.$executeRawUnsafe(
          `INSERT INTO knowledge_embeddings 
            (id, "sourceType", "sourceId", content, metadata, embedding, "mteStandardId", "createdAt", "updatedAt")
          VALUES 
            (gen_random_uuid(), $1::"EmbeddingSourceType", $2, $3, $4::jsonb, $5::vector, $6, NOW(), NOW())`,
          'MTE_STANDARD',
          standard.id,
          chunk,
          JSON.stringify(metadata),
          `[${mockEmbedding.join(',')}]`,
          standard.id
        )

        totalInserted++
        console.log(`   ✓ Chunk ${i + 1}/${chunks.length} inserido`)
      }

      console.log()
    }

    console.log('🎉 Embeddings de exemplo inseridos com sucesso!')
    console.log(`\n📊 Total: ${totalInserted} embeddings`)
    console.log('\n✅ Sistema RAG pronto para testes!')
    console.log('\nNota: Estes são embeddings mockados para demonstração.')
    console.log('Em produção, use generate-embeddings.ts com OpenAI API.\n')

  } catch (error) {
    console.error('❌ Erro ao inserir embeddings:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) {
  seedSampleEmbeddings()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { seedSampleEmbeddings }
