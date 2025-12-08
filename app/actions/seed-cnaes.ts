'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { isPlatformAdmin } from '@/lib/auth'

// CNAEs comuns do Brasil com graus de risco conforme NR-04
const cnaes = [
  // Grau de Risco 1 (Leve)
  { codigo: '6201-5/00', descricao: 'Desenvolvimento de programas de computador sob encomenda', grauRisco: 1 },
  { codigo: '6202-3/00', descricao: 'Desenvolvimento e licenciamento de programas de computador customizáveis', grauRisco: 1 },
  { codigo: '6203-1/00', descricao: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis', grauRisco: 1 },
  { codigo: '6204-0/00', descricao: 'Consultoria em tecnologia da informação', grauRisco: 1 },
  { codigo: '6311-9/00', descricao: 'Tratamento de dados, provedores de serviços de aplicação e serviços de hospedagem na internet', grauRisco: 1 },
  { codigo: '6421-2/00', descricao: 'Bancos comerciais', grauRisco: 1 },
  { codigo: '6422-1/00', descricao: 'Bancos múltiplos, com carteira comercial', grauRisco: 1 },
  { codigo: '6423-9/00', descricao: 'Caixas econômicas', grauRisco: 1 },
  { codigo: '6440-9/00', descricao: 'Arrendamento mercantil', grauRisco: 1 },
  { codigo: '6450-6/00', descricao: 'Sociedades de capitalização', grauRisco: 1 },
  { codigo: '6461-1/00', descricao: 'Holdings de instituições financeiras', grauRisco: 1 },
  { codigo: '6462-0/00', descricao: 'Holdings de instituições não-financeiras', grauRisco: 1 },
  { codigo: '6911-7/01', descricao: 'Serviços advocatícios', grauRisco: 1 },
  { codigo: '6920-6/01', descricao: 'Atividades de contabilidade', grauRisco: 1 },
  { codigo: '7020-4/00', descricao: 'Atividades de consultoria em gestão empresarial', grauRisco: 1 },
  { codigo: '7111-1/00', descricao: 'Serviços de arquitetura', grauRisco: 1 },
  { codigo: '7112-0/00', descricao: 'Serviços de engenharia', grauRisco: 1 },
  { codigo: '8511-2/00', descricao: 'Educação infantil - creche', grauRisco: 1 },
  { codigo: '8512-1/00', descricao: 'Educação infantil - pré-escola', grauRisco: 1 },
  { codigo: '8513-9/00', descricao: 'Ensino fundamental', grauRisco: 1 },
  { codigo: '8520-1/00', descricao: 'Ensino médio', grauRisco: 1 },
  { codigo: '8531-7/00', descricao: 'Educação superior - graduação', grauRisco: 1 },
  
  // Grau de Risco 2 (Médio)
  { codigo: '4711-3/01', descricao: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - hipermercados', grauRisco: 2 },
  { codigo: '4711-3/02', descricao: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - supermercados', grauRisco: 2 },
  { codigo: '4712-1/00', descricao: 'Comércio varejista de mercadorias em geral, com predominância de produtos alimentícios - minimercados, mercearias e armazéns', grauRisco: 2 },
  { codigo: '4713-0/01', descricao: 'Lojas de departamentos ou magazines', grauRisco: 2 },
  { codigo: '4721-1/02', descricao: 'Padaria e confeitaria com predominância de revenda', grauRisco: 2 },
  { codigo: '4729-6/99', descricao: 'Comércio varejista de produtos alimentícios em geral ou especializado em produtos alimentícios não especificados anteriormente', grauRisco: 2 },
  { codigo: '4741-5/00', descricao: 'Comércio varejista de tintas e materiais para pintura', grauRisco: 2 },
  { codigo: '4742-3/00', descricao: 'Comércio varejista de material elétrico', grauRisco: 2 },
  { codigo: '4744-0/01', descricao: 'Comércio varejista de ferragens e ferramentas', grauRisco: 2 },
  { codigo: '4751-2/01', descricao: 'Comércio varejista especializado de equipamentos e suprimentos de informática', grauRisco: 2 },
  { codigo: '4753-9/00', descricao: 'Comércio varejista especializado de eletrodomésticos e equipamentos de áudio e vídeo', grauRisco: 2 },
  { codigo: '4754-7/01', descricao: 'Comércio varejista de móveis', grauRisco: 2 },
  { codigo: '4755-5/01', descricao: 'Comércio varejista de tecidos', grauRisco: 2 },
  { codigo: '4761-0/01', descricao: 'Comércio varejista de livros', grauRisco: 2 },
  { codigo: '4771-7/01', descricao: 'Comércio varejista de produtos farmacêuticos, sem manipulação de fórmulas', grauRisco: 2 },
  { codigo: '4772-5/00', descricao: 'Comércio varejista de cosméticos, produtos de perfumaria e de higiene pessoal', grauRisco: 2 },
  { codigo: '4781-4/00', descricao: 'Comércio varejista de artigos do vestuário e acessórios', grauRisco: 2 },
  { codigo: '4782-2/01', descricao: 'Comércio varejista de calçados', grauRisco: 2 },
  { codigo: '5611-2/01', descricao: 'Restaurantes e similares', grauRisco: 2 },
  { codigo: '5611-2/03', descricao: 'Lanchonetes, casas de chá, de sucos e similares', grauRisco: 2 },
  { codigo: '5620-1/01', descricao: 'Fornecimento de alimentos preparados preponderantemente para empresas', grauRisco: 2 },
  { codigo: '5620-1/02', descricao: 'Serviços de alimentação para eventos e recepções - bufê', grauRisco: 2 },
  { codigo: '5620-1/03', descricao: 'Cantinas - serviços de alimentação privativos', grauRisco: 2 },
  { codigo: '8610-1/01', descricao: 'Atividades de atendimento hospitalar, exceto pronto-socorro e unidades para atendimento a urgências', grauRisco: 2 },
  { codigo: '8630-5/01', descricao: 'Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos', grauRisco: 2 },
  { codigo: '8630-5/02', descricao: 'Atividade médica ambulatorial com recursos para realização de exames complementares', grauRisco: 2 },
  { codigo: '8630-5/03', descricao: 'Atividade médica ambulatorial restrita a consultas', grauRisco: 2 },
  { codigo: '8640-2/01', descricao: 'Laboratórios de anatomia patológica e citológica', grauRisco: 2 },
  { codigo: '8640-2/02', descricao: 'Laboratórios clínicos', grauRisco: 2 },
  
  // Grau de Risco 3 (Grave)
  { codigo: '1011-2/01', descricao: 'Frigorífico - abate de bovinos', grauRisco: 3 },
  { codigo: '1011-2/02', descricao: 'Frigorífico - abate de equinos', grauRisco: 3 },
  { codigo: '1012-1/01', descricao: 'Frigorífico - abate de suínos', grauRisco: 3 },
  { codigo: '1013-9/01', descricao: 'Frigorífico - abate de aves', grauRisco: 3 },
  { codigo: '1031-7/00', descricao: 'Fabricação de conservas de frutas', grauRisco: 3 },
  { codigo: '1033-3/01', descricao: 'Fabricação de sucos concentrados de frutas, hortaliças e legumes', grauRisco: 3 },
  { codigo: '1041-4/00', descricao: 'Fabricação de óleos vegetais em bruto, exceto óleo de milho', grauRisco: 3 },
  { codigo: '1042-2/00', descricao: 'Fabricação de óleos vegetais refinados, exceto óleo de milho', grauRisco: 3 },
  { codigo: '1051-1/00', descricao: 'Preparação do leite', grauRisco: 3 },
  { codigo: '1052-0/00', descricao: 'Fabricação de laticínios', grauRisco: 3 },
  { codigo: '1053-8/00', descricao: 'Fabricação de sorvetes e outros gelados comestíveis', grauRisco: 3 },
  { codigo: '1061-9/01', descricao: 'Beneficiamento de arroz', grauRisco: 3 },
  { codigo: '1062-7/00', descricao: 'Fabricação de produtos do arroz', grauRisco: 3 },
  { codigo: '1065-1/00', descricao: 'Fabricação de amidos e féculas de vegetais', grauRisco: 3 },
  { codigo: '1066-0/00', descricao: 'Fabricação de alimentos para animais', grauRisco: 3 },
  { codigo: '1071-6/00', descricao: 'Fabricação de açúcar em bruto', grauRisco: 3 },
  { codigo: '1072-4/01', descricao: 'Fabricação de açúcar de cana refinado', grauRisco: 3 },
  { codigo: '1091-1/01', descricao: 'Fabricação de produtos de panificação industrial', grauRisco: 3 },
  { codigo: '1092-9/00', descricao: 'Fabricação de biscoitos e bolachas', grauRisco: 3 },
  { codigo: '1093-7/01', descricao: 'Fabricação de produtos derivados do cacau e de chocolates', grauRisco: 3 },
  { codigo: '1094-5/00', descricao: 'Fabricação de massas alimentícias', grauRisco: 3 },
  { codigo: '1095-3/00', descricao: 'Fabricação de especiarias, molhos, temperos e condimentos', grauRisco: 3 },
  { codigo: '1096-1/00', descricao: 'Fabricação de alimentos e pratos prontos', grauRisco: 3 },
  { codigo: '1099-6/99', descricao: 'Fabricação de produtos alimentícios não especificados anteriormente', grauRisco: 3 },
  { codigo: '4120-4/00', descricao: 'Construção de edifícios', grauRisco: 3 },
  { codigo: '4211-1/01', descricao: 'Construção de rodovias e ferrovias', grauRisco: 3 },
  { codigo: '4212-0/00', descricao: 'Construção de obras-de-arte especiais', grauRisco: 3 },
  { codigo: '4213-8/00', descricao: 'Obras de urbanização - ruas, praças e calçadas', grauRisco: 3 },
  { codigo: '4221-9/01', descricao: 'Construção de barragens e represas para geração de energia elétrica', grauRisco: 3 },
  { codigo: '4222-7/01', descricao: 'Construção de redes de abastecimento de água, coleta de esgoto e construções correlatas, exceto obras de irrigação', grauRisco: 3 },
  { codigo: '4223-5/00', descricao: 'Construção de redes de transportes por dutos, exceto para água e esgoto', grauRisco: 3 },
  { codigo: '4292-8/01', descricao: 'Montagem de estruturas metálicas', grauRisco: 3 },
  { codigo: '4299-5/01', descricao: 'Construção de instalações esportivas e recreativas', grauRisco: 3 },
  { codigo: '4299-5/99', descricao: 'Outras obras de engenharia civil não especificadas anteriormente', grauRisco: 3 },
  
  // Grau de Risco 4 (Muito Grave)
  { codigo: '0600-0/01', descricao: 'Extração de petróleo e gás natural', grauRisco: 4 },
  { codigo: '0600-0/02', descricao: 'Extração e beneficiamento de xisto', grauRisco: 4 },
  { codigo: '0600-0/03', descricao: 'Extração e beneficiamento de areias betuminosas', grauRisco: 4 },
  { codigo: '0710-3/01', descricao: 'Extração de minério de ferro', grauRisco: 4 },
  { codigo: '0721-9/01', descricao: 'Extração de minério de alumínio', grauRisco: 4 },
  { codigo: '0722-7/01', descricao: 'Extração de minério de estanho', grauRisco: 4 },
  { codigo: '0723-5/01', descricao: 'Extração de minério de manganês', grauRisco: 4 },
  { codigo: '0724-3/01', descricao: 'Extração de minério de metais preciosos', grauRisco: 4 },
  { codigo: '0725-1/00', descricao: 'Extração de minerais radioativos', grauRisco: 4 },
  { codigo: '0729-4/01', descricao: 'Extração de minérios de nióbio e titânio', grauRisco: 4 },
  { codigo: '0729-4/02', descricao: 'Extração de minério de tungstênio', grauRisco: 4 },
  { codigo: '0729-4/03', descricao: 'Extração de minério de níquel', grauRisco: 4 },
  { codigo: '0729-4/04', descricao: 'Extração de minérios de cobre, chumbo, zinco e outros minerais metálicos não-ferrosos não especificados anteriormente', grauRisco: 4 },
  { codigo: '1921-7/00', descricao: 'Fabricação de produtos do refino de petróleo', grauRisco: 4 },
  { codigo: '1922-5/01', descricao: 'Fabricação de produtos petroquímicos básicos', grauRisco: 4 },
  { codigo: '1922-5/02', descricao: 'Fabricação de intermediários para plastificantes, resinas e fibras', grauRisco: 4 },
  { codigo: '2011-8/00', descricao: 'Fabricação de cloro e álcalis', grauRisco: 4 },
  { codigo: '2012-6/00', descricao: 'Fabricação de intermediários para fertilizantes', grauRisco: 4 },
  { codigo: '2013-4/00', descricao: 'Fabricação de adubos e fertilizantes', grauRisco: 4 },
  { codigo: '2014-2/00', descricao: 'Fabricação de gases industriais', grauRisco: 4 },
  { codigo: '2019-3/01', descricao: 'Elaboração de combustíveis nucleares', grauRisco: 4 },
  { codigo: '2019-3/99', descricao: 'Fabricação de outros produtos químicos inorgânicos não especificados anteriormente', grauRisco: 4 },
  { codigo: '2021-5/00', descricao: 'Fabricação de produtos petroquímicos básicos', grauRisco: 4 },
  { codigo: '2022-3/00', descricao: 'Fabricação de intermediários para plastificantes, resinas e fibras', grauRisco: 4 },
  { codigo: '2029-1/00', descricao: 'Fabricação de produtos químicos orgânicos não especificados anteriormente', grauRisco: 4 },
  { codigo: '2031-2/00', descricao: 'Fabricação de resinas termoplásticas', grauRisco: 4 },
  { codigo: '2032-1/00', descricao: 'Fabricação de resinas termofixas', grauRisco: 4 },
  { codigo: '2033-9/00', descricao: 'Fabricação de elastômeros', grauRisco: 4 },
  { codigo: '2040-1/00', descricao: 'Fabricação de fibras artificiais e sintéticas', grauRisco: 4 },
  { codigo: '2051-7/00', descricao: 'Fabricação de defensivos agrícolas', grauRisco: 4 },
  { codigo: '2052-5/00', descricao: 'Fabricação de desinfestantes domissanitários', grauRisco: 4 },
  { codigo: '2061-4/00', descricao: 'Fabricação de sabões e detergentes sintéticos', grauRisco: 4 },
  { codigo: '2062-2/00', descricao: 'Fabricação de produtos de limpeza e polimento', grauRisco: 4 },
  { codigo: '2063-1/00', descricao: 'Fabricação de cosméticos, produtos de perfumaria e de higiene pessoal', grauRisco: 4 },
  { codigo: '2071-1/00', descricao: 'Fabricação de tintas, vernizes, esmaltes e lacas', grauRisco: 4 },
  { codigo: '2072-0/00', descricao: 'Fabricação de tintas de impressão', grauRisco: 4 },
  { codigo: '2073-8/00', descricao: 'Fabricação de impermeabilizantes, solventes e produtos afins', grauRisco: 4 },
  { codigo: '2091-6/00', descricao: 'Fabricação de adesivos e selantes', grauRisco: 4 },
  { codigo: '2092-4/01', descricao: 'Fabricação de pólvoras, explosivos e detonantes', grauRisco: 4 },
  { codigo: '2092-4/02', descricao: 'Fabricação de artigos pirotécnicos', grauRisco: 4 },
  { codigo: '2092-4/03', descricao: 'Fabricação de fósforos de segurança', grauRisco: 4 },
  { codigo: '2093-2/00', descricao: 'Fabricação de aditivos de uso industrial', grauRisco: 4 },
  { codigo: '2094-1/00', descricao: 'Fabricação de catalisadores', grauRisco: 4 },
  { codigo: '2099-1/01', descricao: 'Fabricação de chapas, filmes, papéis e outros materiais e produtos químicos para fotografia', grauRisco: 4 },
  { codigo: '2099-1/99', descricao: 'Fabricação de outros produtos químicos não especificados anteriormente', grauRisco: 4 },
  { codigo: '2410-6/00', descricao: 'Produção de ferro-gusa', grauRisco: 4 },
  { codigo: '2421-1/00', descricao: 'Produção de semi-acabados de aço', grauRisco: 4 },
  { codigo: '2422-0/00', descricao: 'Produção de laminados planos de aço', grauRisco: 4 },
  { codigo: '2423-8/00', descricao: 'Produção de laminados longos de aço', grauRisco: 4 },
  { codigo: '2424-6/01', descricao: 'Produção de arames de aço', grauRisco: 4 },
  { codigo: '2424-6/02', descricao: 'Produção de relaminados, trefilados e perfilados de aço', grauRisco: 4 },
  { codigo: '2431-9/00', descricao: 'Produção de tubos de aço com costura', grauRisco: 4 },
  { codigo: '2439-4/00', descricao: 'Produção de outros tubos de ferro e aço', grauRisco: 4 },
  { codigo: '2441-5/01', descricao: 'Produção de alumínio e suas ligas em formas primárias', grauRisco: 4 },
  { codigo: '2441-5/02', descricao: 'Produção de laminados de alumínio', grauRisco: 4 },
  { codigo: '2442-3/00', descricao: 'Metalurgia dos metais preciosos', grauRisco: 4 },
  { codigo: '2443-1/00', descricao: 'Metalurgia do cobre', grauRisco: 4 },
]

export async function seedCNAEs() {
  try {
    const user = await getCurrentUser()
    if (!user || !isPlatformAdmin(user.id)) {
      return { error: 'Não autorizado. Apenas administradores da plataforma.' }
    }

    let inserted = 0
    let updated = 0

    for (const cnae of cnaes) {
      const existing = await prisma.cNAE.findUnique({
        where: { codigo: cnae.codigo },
      })

      if (existing) {
        await prisma.cNAE.update({
          where: { codigo: cnae.codigo },
          data: {
            descricao: cnae.descricao,
            grauRisco: cnae.grauRisco,
            ativo: true,
          },
        })
        updated++
      } else {
        await prisma.cNAE.create({
          data: {
            codigo: cnae.codigo,
            descricao: cnae.descricao,
            grauRisco: cnae.grauRisco,
            ativo: true,
          },
        })
        inserted++
      }
    }

    // Estatísticas
    const stats = cnaes.reduce((acc, cnae) => {
      acc[cnae.grauRisco] = (acc[cnae.grauRisco] || 0) + 1
      return acc
    }, {} as Record<number, number>)

    return {
      success: true,
      message: `Seed concluído: ${inserted} CNAEs inseridos, ${updated} atualizados`,
      stats: {
        grau1: stats[1] || 0,
        grau2: stats[2] || 0,
        grau3: stats[3] || 0,
        grau4: stats[4] || 0,
      },
    }
  } catch (error) {
    console.error('Erro ao fazer seed de CNAEs:', error)
    return { error: 'Erro ao fazer seed de CNAEs' }
  }
}
