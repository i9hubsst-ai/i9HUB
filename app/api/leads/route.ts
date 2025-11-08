import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validação de campos obrigatórios expandidos
    const requiredFields = ['name', 'email', 'company', 'cargo', 'setor', 'tipoUso', 'tipoAcesso']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Campos obrigatórios faltando: ${missingFields.join(', ')}` },
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

    // Validação de consentimento
    if (!data.consentimento) {
      return NextResponse.json(
        { error: 'É necessário autorizar o contato para participar do pré-lançamento' },
        { status: 400 }
      )
    }

    // Validação de desafios
    if (!Array.isArray(data.desafios) || data.desafios.length === 0) {
      return NextResponse.json(
        { error: 'Selecione pelo menos 1 desafio atual' },
        { status: 400 }
      )
    }

    if (data.desafios.length > 3) {
      return NextResponse.json(
        { error: 'Selecione no máximo 3 desafios' },
        { status: 400 }
      )
    }

    // Verificar se email já existe
    const existingLead = await prisma.lead.findUnique({
      where: { email: data.email }
    })

    if (existingLead) {
      // Ao invés de erro, retorna o lead existente para criar sessão
      return NextResponse.json({
        success: true,
        leadId: existingLead.id,
        email: existingLead.email,
        name: existingLead.name,
        alreadyRegistered: true,
        message: 'Bem-vindo de volta! Você já está cadastrado.'
      })
    }

    // Segmentação automática baseada no cargo
    let segment = 'tecnico' // padrão
    
    if (data.cargo === 'engenheiro_seguranca') {
      segment = 'engenheiro'
    } else if (data.cargo === 'gestor_sst_rh' || data.cargo === 'empresario_diretor') {
      segment = 'gestor'
    } else if (data.cargo === 'consultor_autonomo') {
      segment = 'consultor'
    }

    // Criar lead no banco com todos os novos campos
    const lead = await prisma.lead.create({
      data: {
        // 1. Informações Básicas
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company,
        cargo: data.cargo,
        cargoOutro: data.cargoOutro || null,
        
        // 2. Segmento
        setor: data.setor,
        setorOutro: data.setorOutro || null,
        
        // 3. Desafios (salvar como JSON string)
        desafios: JSON.stringify(data.desafios),
        desafiosOutro: data.desafiosOutro || null,
        
        // 4. Interesse
        tipoUso: data.tipoUso,
        
        // 5. Tipo de Acesso
        tipoAcesso: data.tipoAcesso,
        
        // 6. Expectativa
        expectativa: data.expectativa || null,
        
        // 7. Consentimento
        consentimento: data.consentimento,
        
        // Metadata
        segment,
        source: 'landing-maia',
        status: 'new'
      }
    })

    console.log('✅ Lead criado:', { 
      id: lead.id, 
      email: lead.email,
      cargo: lead.cargo,
      setor: lead.setor,
      tipoAcesso: lead.tipoAcesso,
      segment: lead.segment 
    })

    // TODO: Enviar email de boas-vindas via Resend com link para chat MA.IA
    // await sendWelcomeEmail(lead)
    
    // TODO: Webhook para planilha Google ou CRM
    // await sendToWebhook(lead)

    // Retornar sucesso
    return NextResponse.json({ 
      success: true, 
      leadId: lead.id,
      message: 'Cadastro realizado com sucesso! Você receberá um email com instruções para acessar o MA.IA.',
      tipoAcesso: lead.tipoAcesso
    })

  } catch (error) {
    console.error('❌ Erro ao criar lead:', error)
    
    return NextResponse.json(
      { error: 'Erro ao processar cadastro. Tente novamente.' },
      { status: 500 }
    )
  }
}

