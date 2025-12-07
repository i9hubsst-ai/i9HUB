import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
// import { buildAIContext } from '@/lib/services/rag-service' // Temporariamente desabilitado

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

interface ReportWriterRequest {
  assessmentId: string
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const body: ReportWriterRequest = await request.json()
    const { assessmentId } = body

    if (!assessmentId) {
      return NextResponse.json(
        { error: 'assessmentId é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar assessment com findings e scores
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
      include: {
        company: { select: { name: true, cnpj: true } },
        template: { select: { name: true, type: true } },
        findings: {
          orderBy: [{ severity: 'desc' }, { createdAt: 'asc' }]
        },
        scores: {
          include: {
            section: { select: { title: true } }
          }
        }
      }
    })

    if (!assessment) {
      return NextResponse.json(
        { error: 'Diagnóstico não encontrado' },
        { status: 404 }
      )
    }

    // Verificar permissões
    const isAdmin = await isPlatformAdmin(user.id)
    const membership = await prisma.membership.findFirst({
      where: {
        userId: user.id,
        companyId: assessment.companyId,
        status: 'ACTIVE'
      }
    })

    if (!isAdmin && !membership) {
      return NextResponse.json(
        { error: 'Sem permissão para gerar relatório deste diagnóstico' },
        { status: 403 }
      )
    }

    // Preparar dados para a IA
    const findingsSummary = assessment.findings.map(f => ({
      severity: f.severity,
      section: f.sectionTitle,
      question: f.questionText,
      value: f.value,
      justification: f.justification,
      reference: f.reference
    }))

    const scoresSummary = assessment.scores.map(s => ({
      section: s.section.title,
      weightedScore: s.weightedScore,
      level: s.level
    }))

    // Buscar contexto normativo relevante via RAG
    let ragContext = ''
    let consultedStandards: string[] = []
    
    try {
      // Construir query baseada nos achados mais graves e no tipo de template
      const highSeverityFindings = assessment.findings
        .filter(f => f.severity === 'HIGH')
        .slice(0, 5) // Pegar top 5 mais graves
      
      const searchQueries = [
        `${assessment.template?.name || ''} ${assessment.template?.type || ''}`,
        ...highSeverityFindings.map(f => `${f.sectionTitle} ${f.questionText}`)
      ]
      
      const searchQuery = searchQueries.join(' ')
      
      // Buscar apenas normas MTE relevantes (temporariamente desabilitado)
      // ragContext = await buildAIContext(searchQuery, {
      //   includeStandards: true,
      //   includeTemplates: false,
      //   includeAssessments: false,
      //   maxTokens: 2500 // Limite maior para planos de ação
      // })

      // Extrair quais normas foram consultadas (temporariamente desabilitado)
      // const nrMatches = ragContext.match(/NR-\d+/g)
      // if (nrMatches) {
      //   consultedStandards = [...new Set(nrMatches)]
      // }
    } catch (error) {
      console.log('Aviso: Não foi possível buscar contexto RAG:', error)
      // Continuar sem contexto RAG se houver erro (graceful degradation)
    }

    const systemPrompt = `Você é um consultor especialista em Segurança e Saúde no Trabalho (SST) no Brasil. Sua tarefa é analisar diagnósticos de SST e gerar:

${ragContext ? `## CONTEXTO NORMATIVO RELEVANTE:\n${ragContext}\n\nIMPORTANTE: Use as informações do contexto normativo acima para fundamentar suas recomendações e referências nas ações.\n\n` : ''}

1. **Resumo Executivo**: Análise clara e objetiva da situação geral da empresa
2. **Plano de Ação Priorizado**: Lista de ações corretivas organizadas por prioridade

Para cada ação do plano, forneça:
- title: Título claro e acionável (ex: "Implementar programa de treinamento NR-12")
- description: Descrição detalhada da ação (2-3 frases)
- priority: HIGH, MEDIUM ou LOW
- estimatedDays: Prazo estimado em dias
- reference: Referência normativa relacionada
- relatedFindingIds: IDs dos achados que esta ação resolve (se aplicável)

IMPORTANTE:
- Priorize ações de alta severidade (HIGH findings)
- Ações devem ser específicas, mensuráveis e realistas
- Agrupe achados similares em uma única ação quando possível
- Use linguagem técnica mas acessível`

    const userPrompt = `Analise o diagnóstico SST e gere um relatório com resumo executivo e plano de ação:

**Empresa**: ${assessment.company.name} (${assessment.company.cnpj})
**Template**: ${assessment.template?.name || 'N/A'}
**Score Geral**: ${assessment.overallScore?.toFixed(1) || 'N/A'}/100 (Nível ${assessment.overallLevel || 'N/A'})

**Achados (${assessment.findings.length} total):**
${findingsSummary.map((f, i) => `
${i + 1}. [${f.severity}] ${f.section}
   Pergunta: ${f.question}
   Resposta: ${f.value}
   ${f.justification ? `Justificativa: ${f.justification}` : ''}
   ${f.reference ? `Ref: ${f.reference}` : ''}
`).join('\n')}

**Scores por Seção:**
${scoresSummary.map(s => `- ${s.section}: ${s.weightedScore.toFixed(1)}/100 (Nível ${s.level})`).join('\n')}

Retorne APENAS um JSON válido no seguinte formato (sem markdown, sem explicações):

{
  "executiveSummary": "Análise geral da situação da empresa em 3-5 parágrafos",
  "actionPlan": [
    {
      "title": "Título da ação",
      "description": "Descrição detalhada da ação corretiva",
      "priority": "HIGH",
      "estimatedDays": 30,
      "reference": "NR-XX item X.X.X"
    }
  ]
}`

    const response = await genai.models.generateContent({
      model: 'gemini-1.5-flash',
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
      contents: userPrompt,
    })

    const content = response.text
    if (!content) {
      return NextResponse.json(
        { error: 'IA não retornou conteúdo' },
        { status: 500 }
      )
    }

    const report = JSON.parse(content)

    // Validar estrutura básica
    if (!report.executiveSummary || !report.actionPlan || !Array.isArray(report.actionPlan)) {
      return NextResponse.json(
        { error: 'Relatório gerado tem formato inválido' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      report: {
        executiveSummary: report.executiveSummary,
        actionPlan: report.actionPlan,
        metadata: {
          assessmentId,
          companyName: assessment.company.name,
          overallScore: assessment.overallScore,
          overallLevel: assessment.overallLevel,
          findingsCount: assessment.findings.length,
          ragEnabled: ragContext.length > 0,
          consultedStandards: consultedStandards,
          generatedAt: new Date().toISOString()
        }
      }
    })

  } catch (error) {
    console.error('Erro ao gerar relatório via IA:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar relatório via IA' },
      { status: 500 }
    )
  }
}
