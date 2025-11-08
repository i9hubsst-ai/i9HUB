import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET - Recupera histórico de mensagens do lead
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const leadId = searchParams.get('leadId')

    if (!leadId) {
      return NextResponse.json(
        { error: 'leadId é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar mensagens do lead
    const messages = await prisma.chatMessage.findMany({
      where: { leadId },
      orderBy: { createdAt: 'asc' },
      take: 100 // Limitar a 100 mensagens mais recentes
    })

    return NextResponse.json({ messages })
  } catch (error) {
    console.error('Erro ao buscar mensagens:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar histórico' },
      { status: 500 }
    )
  }
}

/**
 * POST - Salva nova mensagem do chat
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { leadId, role, content, tokens, model } = body

    // Validações
    if (!leadId || !role || !content) {
      return NextResponse.json(
        { error: 'leadId, role e content são obrigatórios' },
        { status: 400 }
      )
    }

    if (!['user', 'assistant'].includes(role)) {
      return NextResponse.json(
        { error: 'role deve ser "user" ou "assistant"' },
        { status: 400 }
      )
    }

    // Verificar se o lead existe
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    })

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead não encontrado' },
        { status: 404 }
      )
    }

    // Salvar mensagem
    const message = await prisma.chatMessage.create({
      data: {
        leadId,
        role,
        content,
        tokens: tokens || null,
        model: model || null
      }
    })

    return NextResponse.json({ 
      success: true, 
      messageId: message.id 
    })
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar mensagem' },
      { status: 500 }
    )
  }
}
