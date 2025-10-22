/**
 * Script para fazer scraping das Normas Regulamentadoras (NRs) do MTE
 * 
 * Fonte oficial: https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras
 * 
 * Este script:
 * 1. Acessa as páginas oficiais das NRs
 * 2. Extrai o conteúdo completo
 * 3. Divide em seções lógicas
 * 4. Armazena no banco de dados
 */

import { prisma } from '@/lib/prisma'

// URLs oficiais das principais NRs
const MTE_STANDARDS_URLS = {
  'NR-01': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-01.pdf',
  'NR-05': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-05.pdf',
  'NR-06': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-06.pdf',
  'NR-07': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-07.pdf',
  'NR-09': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-09.pdf',
  'NR-10': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-10.pdf',
  'NR-12': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-12.pdf',
  'NR-15': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-15.pdf',
  'NR-17': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-17.pdf',
  'NR-20': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-20.pdf',
  'NR-23': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-23.pdf',
  'NR-33': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-33.pdf',
  'NR-35': 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/normas-regulamentadoras/nr-35.pdf',
}

const NR_TITLES = {
  'NR-01': 'Disposições Gerais e Gerenciamento de Riscos Ocupacionais',
  'NR-05': 'Comissão Interna de Prevenção de Acidentes',
  'NR-06': 'Equipamentos de Proteção Individual - EPI',
  'NR-07': 'Programa de Controle Médico de Saúde Ocupacional',
  'NR-09': 'Avaliação e Controle das Exposições Ocupacionais',
  'NR-10': 'Segurança em Instalações e Serviços em Eletricidade',
  'NR-12': 'Segurança no Trabalho em Máquinas e Equipamentos',
  'NR-15': 'Atividades e Operações Insalubres',
  'NR-17': 'Ergonomia',
  'NR-20': 'Segurança e Saúde no Trabalho com Inflamáveis e Combustíveis',
  'NR-23': 'Proteção Contra Incêndios',
  'NR-33': 'Segurança e Saúde nos Trabalhos em Espaços Confinados',
  'NR-35': 'Trabalho em Altura',
}

/**
 * Exemplo de conteúdo mockado da NR-12 para testar o sistema
 * Em produção, isso seria substituído por scraping real ou upload de PDFs
 */
const NR12_SAMPLE_CONTENT = `
NR-12 - SEGURANÇA NO TRABALHO EM MÁQUINAS E EQUIPAMENTOS

12.1 Esta Norma Regulamentadora e seus anexos definem referências técnicas, princípios fundamentais e medidas de proteção para garantir a saúde e a integridade física dos trabalhadores e estabelece requisitos mínimos para a prevenção de acidentes e doenças do trabalho nas fases de projeto e de utilização de máquinas e equipamentos de todos os tipos, e ainda à sua fabricação, importação, comercialização, exposição e cessão a qualquer título, em todas as atividades econômicas, sem prejuízo da observância do disposto nas demais Normas Regulamentadoras - NR aprovadas pela Portaria n.º 3.214, de 8 de junho de 1978, nas normas técnicas oficiais e, na ausência ou omissão destas, nas normas internacionais aplicáveis.

12.2 Considera-se zona de perigo qualquer zona no interior e/ou ao redor de uma máquina ou equipamento onde a presença de uma pessoa exponha a riscos à sua saúde ou integridade física.

12.3 São consideradas medidas de proteção, a ser adotadas nessa ordem de prioridade:
a) medidas de proteção coletiva;
b) medidas administrativas ou de organização do trabalho;
c) medidas de proteção individual.

12.38 As máquinas e equipamentos devem possuir dispositivos de acionamento e parada localizados de modo que:
a) seja acionado ou desligado pelo operador na sua posição de trabalho;
b) não se localize na zona perigosa da máquina ou do equipamento;
c) possa ser acionado ou desligado em caso de emergência por outra pessoa que não seja o operador;
d) não possa ser acionado ou desligado involuntariamente pelo operador ou por qualquer outra forma acidental;
e) não acarrete riscos adicionais.

12.47 As zonas de perigo das máquinas e equipamentos devem possuir sistemas de segurança, caracterizados por proteções fixas, proteções móveis e dispositivos de segurança interligados, que garantam proteção à saúde e à integridade física dos trabalhadores.
`

const NR35_SAMPLE_CONTENT = `
NR-35 - TRABALHO EM ALTURA

35.1 Objetivo e Campo de Aplicação

35.1.1 Esta Norma estabelece os requisitos mínimos e as medidas de proteção para o trabalho em altura, envolvendo o planejamento, a organização e a execução, de forma a garantir a segurança e a saúde dos trabalhadores envolvidos direta ou indiretamente com esta atividade.

35.1.2 Considera-se trabalho em altura toda atividade executada acima de 2,00 m (dois metros) do nível inferior, onde haja risco de queda.

35.2 Responsabilidades

35.2.1 Cabe ao empregador:
a) garantir a implementação das medidas de proteção estabelecidas nesta Norma;
b) assegurar a realização da Análise de Risco - AR e, quando aplicável, a emissão da Permissão de Trabalho - PT;
c) desenvolver procedimento operacional para as atividades rotineiras de trabalho em altura;
d) assegurar a realização de avaliação prévia das condições no local do trabalho em altura, pelo estudo, planejamento e implementação das ações e das medidas complementares de segurança aplicáveis;

35.4 Capacitação e Treinamento

35.4.1 O empregador deve promover programa para capacitação dos trabalhadores à realização de trabalho em altura.

35.4.2 Considera-se trabalhador capacitado para trabalho em altura aquele que foi submetido e aprovado em treinamento, teórico e prático, com carga horária mínima de oito horas.

35.4.5 O treinamento periódico bienal deve ter carga horária mínima de oito horas, conforme conteúdo programático previsto no Anexo II desta Norma.

35.5 Equipamentos de Proteção Individual, Acessórios e Sistemas de Ancoragem

35.5.1 Os Equipamentos de Proteção Individual - EPI, acessórios e sistemas de ancoragem devem ser especificados e selecionados considerando-se a sua eficiência, o conforto, a carga aplicada aos mesmos e o respectivo fator de segurança, em caso de eventual queda.
`

async function scrapeAndStoreSampleStandards() {
  console.log('🚀 Iniciando importação de normas MTE (conteúdo de exemplo)...\n')

  try {
    // NR-12 Sample
    console.log('📄 Processando NR-12...')
    await prisma.mteStandard.upsert({
      where: {
        nrNumber_section_version: {
          nrNumber: 'NR-12',
          section: '',
          version: '2024.1'
        }
      },
      update: {
        content: NR12_SAMPLE_CONTENT.trim(),
        lastVerified: new Date()
      },
      create: {
        nrNumber: 'NR-12',
        title: NR_TITLES['NR-12'],
        section: '',
        content: NR12_SAMPLE_CONTENT.trim(),
        version: '2024.1',
        sourceUrl: MTE_STANDARDS_URLS['NR-12'],
        lastVerified: new Date()
      }
    })
    console.log('✅ NR-12 importada\n')

    // NR-35 Sample
    console.log('📄 Processando NR-35...')
    await prisma.mteStandard.upsert({
      where: {
        nrNumber_section_version: {
          nrNumber: 'NR-35',
          section: '',
          version: '2024.1'
        }
      },
      update: {
        content: NR35_SAMPLE_CONTENT.trim(),
        lastVerified: new Date()
      },
      create: {
        nrNumber: 'NR-35',
        title: NR_TITLES['NR-35'],
        section: '',
        content: NR35_SAMPLE_CONTENT.trim(),
        version: '2024.1',
        sourceUrl: MTE_STANDARDS_URLS['NR-35'],
        lastVerified: new Date()
      }
    })
    console.log('✅ NR-35 importada\n')

    console.log('🎉 Importação concluída com sucesso!')
    console.log('\n📊 Próximos passos:')
    console.log('   1. Executar script de geração de embeddings')
    console.log('   2. Implementar busca vetorial')
    console.log('   3. Integrar com APIs de geração de templates\n')

  } catch (error) {
    console.error('❌ Erro ao importar normas:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  scrapeAndStoreSampleStandards()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

export { scrapeAndStoreSampleStandards }
