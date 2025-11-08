import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * POST /api/leads/check
 * Verifica se um email já está cadastrado como lead
 * Usado para "login rápido" de leads retornando
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validação de email
    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Buscar lead por email
    const lead = await prisma.lead.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    })

    if (!lead) {
      return NextResponse.json(
        { error: 'Email não encontrado. Por favor, faça o cadastro completo.' },
        { status: 404 }
      )
    }

    // Lead encontrado! Retornar dados para criar sessão
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      name: lead.name,
      email: lead.email,
      registeredAt: lead.createdAt
    })
  } catch (error) {
    console.error('Erro ao verificar lead:', error)
    return NextResponse.json(
      { error: 'Erro ao processar solicitação' },
      { status: 500 }
    )
  }
}
