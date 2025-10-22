/**
 * Script para gerar embeddings de todas as normas MTE
 * e armazená-los no banco de dados para busca vetorial
 */

import { prisma } from '@/lib/prisma'
import { generateEmbedding, prepareTextForEmbedding, chunkText } from '@/lib/services/embedding-service'

async function generateMteStandardsEmbeddings() {
  console.log('🚀 Iniciando geração de embeddings para normas MTE...\n')

  try {
    // Buscar todas as normas do banco
    const standards = await prisma.mteStandard.findMany({
      orderBy: { nrNumber: 'asc' }
    })

    console.log(`📊 Encontradas ${standards.length} normas para processar\n`)

    let totalEmbeddings = 0
    let totalTokens = 0

    for (const standard of standards) {
      console.log(`📄 Processando ${standard.nrNumber}: ${standard.title}`)

      // Preparar texto
      const preparedText = prepareTextForEmbedding(standard.content)
      
      // Dividir em chunks menores para evitar problemas de memória
      const chunks = chunkText(preparedText, 1000, 100)
      console.log(`   └─ Dividido em ${chunks.length} chunk(s)`)

      // Processar apenas os 2 primeiros chunks para teste (economia de custo e memória)
      const chunksToProcess = chunks.slice(0, 2)
      console.log(`   └─ Processando apenas ${chunksToProcess.length} chunks (modo teste)`)

      // Gerar embedding para cada chunk
      for (let i = 0; i < chunksToProcess.length; i++) {
        const chunk = chunksToProcess[i]
        
        try {
          const { embedding, tokensUsed } = await generateEmbedding(chunk)
          totalTokens += tokensUsed

          // Criar entrada no banco usando SQL raw para evitar problemas de memória
          const metadata = {
            nrNumber: standard.nrNumber,
            title: standard.title,
            section: standard.section || '',
            version: standard.version,
            chunkIndex: i,
            totalChunks: chunks.length
          }

          // Converter embedding para array de floats de forma eficiente
          const embeddingArray = `[${embedding.join(',')}]`
          
          await prisma.$executeRawUnsafe(
            `INSERT INTO knowledge_embeddings 
              (id, source_type, source_id, content, metadata, embedding, mte_standard_id, created_at, updated_at)
            VALUES 
              (gen_random_uuid(), $1, $2, $3, $4::jsonb, $5::vector, $6, NOW(), NOW())`,
            'MTE_STANDARD',
            standard.id,
            chunk,
            JSON.stringify(metadata),
            embeddingArray,
            standard.id
          )

          totalEmbeddings++
          console.log(`   ✓ Chunk ${i + 1}/${chunksToProcess.length} - ${tokensUsed} tokens`)

          // Força garbage collection entre chunks
          if (global.gc) {
            global.gc()
          }

        } catch (error) {
          console.error(`   ✗ Erro no chunk ${i + 1}:`, error)
        }
      }

      console.log()
    }

    console.log('🎉 Geração de embeddings concluída!')
    console.log(`\n📊 Estatísticas:`)
    console.log(`   - Total de embeddings criados: ${totalEmbeddings}`)
    console.log(`   - Total de tokens usados: ${totalTokens}`)
    console.log(`   - Custo estimado: $${(totalTokens / 1_000_000 * 0.02).toFixed(4)} USD`)
    console.log('\n✅ Próximo passo: Implementar API de busca vetorial\n')

  } catch (error) {
    console.error('❌ Erro ao gerar embeddings:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  generateMteStandardsEmbeddings()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { generateMteStandardsEmbeddings }
