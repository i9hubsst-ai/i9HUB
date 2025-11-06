import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/ai/knowledge/auto-update
 * Cron job que verifica e atualiza documentos AUTO_SYNC
 * Deve ser chamado por Vercel Cron ou similar
 */
export async function GET(request: Request) {
  console.log('🔄 [Auto-Update] Iniciando verificação de atualizações...')
  
  try {
    // Verificar authorization header (proteção para cron jobs)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'dev-secret-change-in-production'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    // Buscar documentos AUTO_SYNC que precisam ser atualizados
    const now = new Date()
    const documentsToUpdate = await prisma.knowledgeSource.findMany({
      where: {
        mode: 'AUTO_SYNC',
        isActive: true,
        sourceUrl: { not: null },
        OR: [
          { lastSyncAt: null }, // Nunca sincronizado
          {
            AND: [
              { syncFrequency: 'DAILY' },
              { lastSyncAt: { lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) } }
            ]
          },
          {
            AND: [
              { syncFrequency: 'WEEKLY' },
              { lastSyncAt: { lt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) } }
            ]
          },
          {
            AND: [
              { syncFrequency: 'MONTHLY' },
              { lastSyncAt: { lt: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) } }
            ]
          }
        ]
      }
    })

    console.log(`📊 [Auto-Update] ${documentsToUpdate.length} documentos precisam atualização`)

    const results = {
      total: documentsToUpdate.length,
      updated: 0,
      failed: 0,
      errors: [] as Array<{ documentId: string; error: string }>
    }

    // Sincronizar cada documento
    for (const doc of documentsToUpdate) {
      try {
        console.log(`🔄 [Auto-Update] Sincronizando: ${doc.title}`)
        
        // Chamar endpoint de sync
        const syncResponse = await fetch(
          `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/ai/knowledge/sync`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sourceUrl: doc.sourceUrl,
              category: doc.category,
              title: doc.title,
              description: doc.description,
              syncFrequency: doc.syncFrequency,
            })
          }
        )

        if (syncResponse.ok) {
          results.updated++
          console.log(`✅ [Auto-Update] ${doc.title} atualizado com sucesso`)
        } else {
          const error = await syncResponse.text()
          results.failed++
          results.errors.push({
            documentId: doc.id,
            error: error || 'Erro desconhecido'
          })
          console.error(`❌ [Auto-Update] Erro ao atualizar ${doc.title}:`, error)
        }
        
      } catch (error: any) {
        results.failed++
        results.errors.push({
          documentId: doc.id,
          error: error.message
        })
        console.error(`❌ [Auto-Update] Exceção ao atualizar ${doc.title}:`, error)
      }

      // Aguardar 2 segundos entre cada sincronização para não sobrecarregar
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    console.log(`✅ [Auto-Update] Finalizado: ${results.updated} atualizados, ${results.failed} falharam`)

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...results
    })
    
  } catch (error: any) {
    console.error('❌ [Auto-Update] Erro geral:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
