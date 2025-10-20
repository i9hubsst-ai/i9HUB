import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar dados existentes (opcional - comentar se não quiser limpar)
  console.log('🗑️  Limpando dados existentes...')
  await prisma.auditLog.deleteMany()
  await prisma.actionPlan.deleteMany()
  await prisma.assessmentScore.deleteMany()
  await prisma.assessmentAnswer.deleteMany()
  await prisma.assessment.deleteMany()
  await prisma.question.deleteMany()
  await prisma.iMSSTDimension.deleteMany()
  await prisma.modulePermission.deleteMany()
  await prisma.membership.deleteMany()
  await prisma.platformAdmin.deleteMany()
  await prisma.company.deleteMany()

  // 1. Criar empresas
  console.log('🏢 Criando empresas demo...')
  const empresa1 = await prisma.company.create({
    data: {
      name: 'TechSafety Indústria Ltda',
      cnpj: '12.345.678/0001-90',
    },
  })

  const empresa2 = await prisma.company.create({
    data: {
      name: 'SafeWork Serviços e Consultoria',
      cnpj: '98.765.432/0001-10',
    },
  })

  console.log('✓ Empresas criadas')

  // 2. Criar dimensões IMSST
  console.log('📊 Criando dimensões IMSST...')
  const dimensoes = await Promise.all([
    prisma.iMSSTDimension.create({
      data: {
        name: 'Liderança e Comprometimento',
        description: 'Avalia o envolvimento da alta direção e liderança com a SST',
        order: 1,
      },
    }),
    prisma.iMSSTDimension.create({
      data: {
        name: 'Processos e Procedimentos',
        description: 'Avalia a documentação e padronização dos processos de SST',
        order: 2,
      },
    }),
    prisma.iMSSTDimension.create({
      data: {
        name: 'Conformidade Legal',
        description: 'Avalia o atendimento às Normas Regulamentadoras e legislação SST',
        order: 3,
      },
    }),
    prisma.iMSSTDimension.create({
      data: {
        name: 'Capacitação e Treinamento',
        description: 'Avalia os programas de treinamento e conscientização em SST',
        order: 4,
      },
    }),
    prisma.iMSSTDimension.create({
      data: {
        name: 'Dados e Indicadores',
        description: 'Avalia a coleta, análise e uso de dados para melhoria contínua',
        order: 5,
      },
    }),
  ])

  console.log('✓ Dimensões criadas')

  // 3. Criar perguntas para cada dimensão
  console.log('❓ Criando perguntas do diagnóstico...')
  const perguntasPorDimensao = [
    // Liderança e Comprometimento
    [
      'A alta direção participa ativamente das reuniões e decisões relacionadas à SST?',
      'Existem metas e objetivos claros de SST comunicados a toda a organização?',
      'A liderança aloca recursos adequados (financeiros, humanos, tecnológicos) para SST?',
      'Há um responsável designado pela alta direção para coordenar as ações de SST?',
      'A cultura de segurança é promovida e incentivada por todos os níveis de liderança?',
    ],
    // Processos e Procedimentos
    [
      'Existem procedimentos operacionais padrão (POPs) documentados para atividades de risco?',
      'Os processos de SST são revisados e atualizados periodicamente?',
      'Há um sistema de gestão de SST implementado (ex: ISO 45001, OHSAS)?',
      'Os procedimentos de emergência e evacuação estão documentados e são testados regularmente?',
      'Existe um processo formal para análise de riscos antes de novas atividades?',
    ],
    // Conformidade Legal
    [
      'A empresa mantém um inventário atualizado de todas as NRs aplicáveis?',
      'São realizadas auditorias internas para verificar conformidade legal?',
      'Todos os documentos legais exigidos (PPRA, PCMSO, LTCAT, etc.) estão atualizados?',
      'Há um processo para monitorar mudanças na legislação de SST?',
      'As não conformidades legais identificadas são tratadas com planos de ação?',
    ],
    // Capacitação e Treinamento
    [
      'Todos os colaboradores recebem treinamento de integração em SST na admissão?',
      'Há um cronograma de treinamentos periódicos e reciclagens em SST?',
      'Os treinamentos são registrados e há controle de certificações?',
      'Existem programas de conscientização contínua sobre segurança no trabalho?',
      'A eficácia dos treinamentos é avaliada através de testes ou indicadores?',
    ],
    // Dados e Indicadores
    [
      'A empresa registra e monitora indicadores como taxa de frequência e gravidade de acidentes?',
      'Existe um sistema para registro e investigação de acidentes e incidentes?',
      'Os dados de SST são analisados regularmente para identificar tendências?',
      'Há dashboards ou relatórios periódicos de SST para a gestão?',
      'As lições aprendidas dos acidentes são compartilhadas e usadas para melhorias?',
    ],
  ]

  for (let i = 0; i < dimensoes.length; i++) {
    const perguntas = perguntasPorDimensao[i]
    for (let j = 0; j < perguntas.length; j++) {
      await prisma.question.create({
        data: {
          dimensionId: dimensoes[i].id,
          text: perguntas[j],
          type: 'LIKERT',
          weight: 1.0,
          order: j + 1,
        },
      })
    }
  }

  console.log('✓ Perguntas criadas (25 perguntas no total)')

  console.log('\n✅ Seed concluído com sucesso!')
  console.log('\n📋 Resumo:')
  console.log(`   - ${(await prisma.company.count())} empresas`)
  console.log(`   - ${(await prisma.iMSSTDimension.count())} dimensões IMSST`)
  console.log(`   - ${(await prisma.question.count())} perguntas`)
}

main()
  .catch((e) => {
    console.error('❌ Erro durante seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
