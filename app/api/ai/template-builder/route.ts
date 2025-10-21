import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    const systemPrompt = `Você é um especialista em Segurança e Saúde no Trabalho (SST) no Brasil. Sua tarefa é gerar templates de diagnóstico detalhados e tecnicamente precisos para avaliações de SST.

Um template consiste em:
- **Seções**: Agrupamentos lógicos de perguntas (ex: "Gestão de Riscos", "CIPA")
- **Perguntas**: Cada pergunta tem:
  - text: Texto da pergunta claro e objetivo
  - type: "BOOLEAN" (Sim/Não) ou "SCORE" (1-5)
  - weight: Peso de 1-10 (importância da pergunta)
  - reference: Referência normativa (ex: "NR-12 item 12.3.1")
  - requiresJustification: true se resposta negativa/baixa exige justificativa

IMPORTANTE:
- Gere SEMPRE entre 20-30 perguntas no total, distribuídas entre 4-6 seções
- Use pesos maiores (7-10) para itens críticos de segurança
- Use pesos menores (3-5) para itens de documentação
- Mix equilibrado de BOOLEAN e SCORE (cerca de 60% BOOLEAN, 40% SCORE)
- Perguntas BOOLEAN devem ter requiresJustification: true
- Perguntas SCORE com peso ≥7 devem ter requiresJustification: true`

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
          "requiresJustification": true
        }
      ]
    }
  ]
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    })

    const content = completion.choices[0].message.content
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
