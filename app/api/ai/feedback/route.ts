import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { FeedbackType, FeedbackStatus } from '@prisma/client'

export async function POST(req: NextRequest) {
  try {
    console.log('📝 [FEEDBACK-API] Recebendo feedback do usuário')
    
    const body = await req.json()
    const { messageId, userQuery, aiResponse, feedback, timestamp } = body

    // Validação dos dados
    if (!messageId || !aiResponse || !feedback || !timestamp) {
      console.error('❌ [FEEDBACK-API] Dados inválidos:', { messageId, feedback, timestamp })
      return NextResponse.json(
        { error: 'Dados obrigatórios ausentes' },
        { status: 400 }
      )
    }

    if (!['positive', 'negative'].includes(feedback)) {
      console.error('❌ [FEEDBACK-API] Tipo de feedback inválido:', feedback)
      return NextResponse.json(
        { error: 'Tipo de feedback inválido' },
        { status: 400 }
      )
    }

    console.log(`${feedback === 'positive' ? '👍' : '👎'} [FEEDBACK-API] Processando feedback:`, {
      messageId: messageId.substring(0, 20) + '...',
      feedback,
      userQueryLength: userQuery?.length || 0,
      aiResponseLength: aiResponse.length,
      timestamp
    })

    // Converte string para enum do Prisma
    const feedbackType = feedback === 'positive' ? FeedbackType.POSITIVE : FeedbackType.NEGATIVE

    // Salva feedback no banco de dados
    const savedFeedback = await prisma.aIFeedback.create({
      data: {
        messageId,
        userQuery: userQuery || '',
        aiResponse,
        feedback: feedbackType,
        status: FeedbackStatus.PENDING,
        metadata: {
          timestamp,
          userAgent: req.headers.get('user-agent'),
          ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
        }
      }
    })

    console.log('💾 [FEEDBACK-API] Feedback salvo no banco:', savedFeedback.id)

    // Processamento baseado no tipo de feedback
    if (feedback === 'positive') {
      console.log('✅ [FEEDBACK-API] Resposta aprovada pelo usuário - processando para aprendizado')
      
      // Processamento automático para feedback positivo
      await processPositiveFeedback(savedFeedback.id, userQuery, aiResponse)
      
    } else {
      console.log('❌ [FEEDBACK-API] Resposta rejeitada pelo usuário - marcada para revisão')
      
      // Para feedback negativo, apenas marca para revisão manual
      await markForReview(savedFeedback.id)
    }

    console.log('✅ [FEEDBACK-API] Feedback processado com sucesso')
    
    return NextResponse.json({
      success: true,
      message: 'Feedback recebido e processado com sucesso',
      feedbackId: savedFeedback.id,
      processed: true,
      feedbackType: feedback
    })

  } catch (error) {
    console.error('❌ [FEEDBACK-API] Erro ao processar feedback:', error)
    
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: 500 }
    )
  }
}

// Função para processar feedback positivo
async function processPositiveFeedback(feedbackId: string, userQuery: string, aiResponse: string) {
  try {
    console.log('🧠 [LEARNING] Iniciando aprendizado automático para feedback positivo')
    
    // Cria entrada na base de conhecimento
    const knowledgeEntry = `PERGUNTA: ${userQuery}\nRESPOSTA APROVADA: ${aiResponse}`
    
    // Aqui você pode integrar com seu sistema de embeddings
    // Por exemplo, adicionar ao ChromaDB ou outro sistema RAG
    console.log('📚 [LEARNING] Adicionando à base de conhecimento:', {
      query: userQuery.substring(0, 100) + '...',
      responseLength: aiResponse.length
    })

    // Marca o feedback como processado
    await prisma.aIFeedback.update({
      where: { id: feedbackId },
      data: {
        status: FeedbackStatus.PROCESSED,
        processedAt: new Date()
      }
    })

    // Integrar com sistema de embeddings RAG
    try {
      const { addApprovedResponse } = await import('@/lib/services/rag-service')
      // Usar IDs genéricos já que não temos contexto de usuário autenticado aqui
      await addApprovedResponse(userQuery, aiResponse, 'anonymous', 'feedback')
      console.log('✅ [RAG] Resposta aprovada adicionada à base de conhecimento')
    } catch (ragError) {
      console.error('⚠️ [RAG] Erro ao adicionar ao RAG (não crítico):', ragError)
    }
    
    console.log('✅ [LEARNING] Aprendizado automático concluído')
    
  } catch (error) {
    console.error('❌ [LEARNING] Erro no aprendizado automático:', error)
    // Se falhar, mantém como PENDING para reprocessamento manual
  }
}

// Função para marcar feedback negativo para revisão
async function markForReview(feedbackId: string) {
  try {
    await prisma.aIFeedback.update({
      where: { id: feedbackId },
      data: {
        status: FeedbackStatus.REVIEWED // Marca como revisado
      }
    })
    
    console.log('📋 [REVIEW] Feedback negativo marcado para revisão')
  } catch (error) {
    console.error('❌ [REVIEW] Erro ao marcar para revisão:', error)
  }
}

// Endpoint para recuperar estatísticas de feedback (opcional)
export async function GET() {
  try {
    console.log('📊 [FEEDBACK-STATS] Buscando estatísticas de feedback')
    
    // Busca estatísticas de feedback
    const stats = await prisma.aIFeedback.groupBy({
      by: ['feedback'],
      _count: {
        id: true
      }
    })

    const lastFeedback = await prisma.aIFeedback.findFirst({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        feedback: true,
        createdAt: true,
        status: true
      }
    })

    // Processa estatísticas
    const totalFeedbacks = stats.reduce((acc: number, stat: any) => acc + stat._count.id, 0)
    const positiveFeedbacks = stats.find((s: any) => s.feedback === 'POSITIVE')?._count.id || 0
    const negativeFeedbacks = stats.find((s: any) => s.feedback === 'NEGATIVE')?._count.id || 0

    // Taxa de aprovação
    const approvalRate = totalFeedbacks > 0 ? (positiveFeedbacks / totalFeedbacks) * 100 : 0

    const result = {
      totalFeedbacks,
      positiveFeedbacks,
      negativeFeedbacks,
      approvalRate: Math.round(approvalRate * 100) / 100, // 2 casas decimais
      lastFeedback,
      summary: {
        message: totalFeedbacks === 0 
          ? 'Nenhum feedback recebido ainda' 
          : `${positiveFeedbacks} positivos, ${negativeFeedbacks} negativos (${approvalRate.toFixed(1)}% de aprovação)`
      }
    }

    console.log('✅ [FEEDBACK-STATS] Estatísticas processadas:', result.summary.message)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ [FEEDBACK-STATS] Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    )
  }
}