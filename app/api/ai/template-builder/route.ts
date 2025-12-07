import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
// import { buildAIContext } from '@/lib/services/rag-service' // Temporariamente desabilitado

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

interface TemplateBuilderRequest {
  name: string
  description: string
  type: 'NR12' | 'NR35' | 'ISO45001' | 'ISO14001' | 'IMSST' | 'CUSTOM'
  context?: string
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Apenas administradores podem gerar templates via IA' },
        { status: 403 }
      )
    }

    const body: TemplateBuilderRequest = await request.json()
    const { name, description, type, context } = body

    if (!name || !description || !type) {
      return NextResponse.json(
        { error: 'Nome, descrição e tipo são obrigatórios' },
        { status: 400 }
      )
    }

    // Buscar contexto normativo relevante via RAG
    let ragContext = ''
    let consultedStandards: string[] = []
    
    try {
      // Construir query de busca baseada no tipo e descrição
      const searchQuery = `${name} ${description} ${type}`
      
      // Buscar apenas normas MTE relevantes (temporariamente desabilitado)
      // ragContext = await buildAIContext(searchQuery, {
      //   includeStandards: true,
      //   includeTemplates: false,
      //   includeAssessments: false,
      //   maxTokens: 2000 // Limite para não sobrecarregar o prompt
      // })

      // Extrair quais normas foram consultadas (para metadata) - temporariamente desabilitado
      // const nrMatches = ragContext.match(/NR-\d+/g)
      // if (nrMatches) {
      //   consultedStandards = [...new Set(nrMatches)] // Remover duplicatas
      // }
    } catch (error) {
      console.log('Aviso: Não foi possível buscar contexto RAG:', error)
      // Continuar sem contexto RAG se houver erro (graceful degradation)
    }

    const systemPrompt = `Você é um especialista em Segurança e Saúde no Trabalho (SST) no Brasil. Sua tarefa é gerar templates de diagnóstico detalhados e tecnicamente precisos para avaliações de SST.

${ragContext ? `## CONTEXTO NORMATIVO RELEVANTE:\n${ragContext}\n\nIMPORTANTE: Use as informações do contexto normativo acima para fundamentar suas perguntas e referências.\n\n` : ''}Um template consiste em:
- **Seções**: Agrupamentos lógicos de perguntas (ex: "Gestão de Riscos", "CIPA")
- **Perguntas**: Cada pergunta tem:
  - text: Texto da pergunta claro e objetivo
  - type: "BOOLEAN" (Sim/Não) ou "SCORE" (1-5)
  - weight: Peso de 1-10 (importância da pergunta)
  - reference: Referência normativa (ex: "NR-12 item 12.3.1")
  - requiresJustification: true/false - se a pergunta exige que o usuário forneça uma justificativa textual para qualquer resposta
  - requiresEvidence: true/false - se a pergunta exige que o usuário anexe evidências (fotos/documentos) para qualquer resposta

IMPORTANTE:
- Gere SEMPRE entre 20-30 perguntas no total, distribuídas entre 4-6 seções
- Use pesos maiores (7-10) para itens críticos de segurança
- Use pesos menores (3-5) para itens de documentação
- Mix equilibrado de BOOLEAN e SCORE (cerca de 60% BOOLEAN, 40% SCORE)
- Use requiresJustification=true em perguntas onde a explicação da resposta é importante (ex: não conformidades, itens críticos)
- Use requiresEvidence=true em perguntas onde é necessário comprovar com documentos/fotos (ex: treinamentos, certificados, equipamentos)`

    const userPrompt = `Gere um template de diagnóstico SST com as seguintes características:

**Nome**: ${name}
**Descrição**: ${description}
**Tipo**: ${type}
${context ? `**Contexto adicional**: ${context}` : ''}

Retorne APENAS um JSON válido no seguinte formato (sem markdown, sem explicações):

{
  "sections": [
    {
      "title": "Nome da Seção",
      "description": "Descrição breve da seção",
      "order": 1,
      "questions": [
        {
          "text": "Texto da pergunta?",
          "type": "BOOLEAN",
          "weight": 8,
          "reference": "NR-XX item X.X.X",
          "requiresJustification": true,
          "requiresEvidence": false
        }
      ]
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

    const generatedTemplate = JSON.parse(content)

    // Validar estrutura básica
    if (!generatedTemplate.sections || !Array.isArray(generatedTemplate.sections)) {
      return NextResponse.json(
        { error: 'Template gerado tem formato inválido' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      template: {
        name,
        description,
        type,
        sections: generatedTemplate.sections
      },
      metadata: {
        ragEnabled: ragContext.length > 0,
        consultedStandards: consultedStandards,
        generatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Erro ao gerar template via IA:', error)
    return NextResponse.json(
      { error: 'Erro ao gerar template via IA' },
      { status: 500 }
    )
  }
}
