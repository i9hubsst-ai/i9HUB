import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validação de campos obrigatórios
    if (!data.name || !data.email || !data.role || !data.company) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, email, cargo e empresa' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Verificar se email já existe
    const existingLead = await prisma.lead.findUnique({
      where: { email: data.email }
    })

    if (existingLead) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 409 }
      )
    }

    // Segmentação automática baseada no cargo
    let segment = 'tecnico' // padrão
    const roleLower = data.role.toLowerCase()
    
    if (roleLower.includes('engenheiro') || roleLower.includes('eng.')) {
      segment = 'engenheiro'
    } else if (
      roleLower.includes('gerente') || 
      roleLower.includes('diretor') || 
      roleLower.includes('gestor') ||
      roleLower.includes('coordenador')
    ) {
      segment = 'gestor'
    }

    // Criar lead no banco
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        role: data.role,
        company: data.company,
        wantsFree: data.wantsFree || false,
        wantsPro: data.wantsPro || false,
        segment,
        source: 'landing-maia',
        status: 'new'
      }
    })

    console.log('✅ Lead criado:', { 
      id: lead.id, 
      email: lead.email, 
      segment: lead.segment 
    })

    // TODO: Enviar email de boas-vindas via Resend
    // await sendWelcomeEmail(lead)

    // Retornar sucesso
    return NextResponse.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Cadastro realizado com sucesso!' 
    })

  } catch (error) {
    console.error('❌ Erro ao criar lead:', error)
    
    return NextResponse.json(
      { error: 'Erro ao processar cadastro. Tente novamente.' },
      { status: 500 }
    )
  }
}
