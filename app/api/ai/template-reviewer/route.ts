import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
})

interface TemplateReviewRequest {
  templateId: string
  focusArea?: string
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Iniciando revisão de template via IA...')
    
    // Verificar API key primeiro
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY não configurada')
      return NextResponse.json(
        { error: 'Configuração de IA não encontrada. Entre em contato com o suporte.' },
        { status: 500 }
      )
    }
    console.log('✅ API Key configurada')

    const user = await getCurrentUser()
    if (!user) {
      console.log('❌ Usuário não autenticado')
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    console.log('✅ Usuário autenticado:', user.id)

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      console.log('❌ Usuário não é admin')
      return NextResponse.json(
        { error: 'Apenas administradores podem revisar templates via IA' },
        { status: 403 }
      )
    }
    console.log('✅ Usuário é admin')

    const body: TemplateReviewRequest = await request.json()
    const { templateId, focusArea } = body
    console.log('📋 Template ID:', templateId)

    if (!templateId) {
      console.log('❌ Template ID não fornecido')
      return NextResponse.json(
        { error: 'ID do template é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar template completo do banco
    console.log('🔍 Buscando template no banco de dados...')
    const template = await prisma.diagnosticTemplate.findUnique({
      where: { id: templateId },
      include: {
        sections: {
          include: {
            questions: {
              where: { active: true },
              orderBy: { createdAt: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!template) {
      console.log('❌ Template não encontrado')
      return NextResponse.json(
        { error: 'Template não encontrado' },
        { status: 404 }
      )
    }

    console.log(`✅ Template encontrado: ${template.name}`)
    console.log(`   Seções: ${template.sections.length}`)
    console.log(`   Perguntas totais: ${template.sections.reduce((acc, s) => acc + s.questions.length, 0)}`)

    const systemPrompt = `Você é um consultor especialista em Segurança e Saúde no Trabalho (SST) no Brasil com vasta experiência em auditorias, diagnósticos e conformidade normativa.

Sua tarefa é revisar templates de diagnóstico SST e sugerir melhorias técnicas e práticas.

Ao revisar, considere:
- **Completude**: Todas as áreas importantes foram cobertas?
- **Qualidade das perguntas**: Perguntas claras, objetivas e sem ambiguidade?
- **Referências normativas**: Citações corretas e atualizadas?
- **Pesos**: Pesos adequados refletindo a criticidade de cada item?
- **Justificativa/Evidência**: Flags configurados corretamente para perguntas que exigem comprovação?
- **Estrutura**: Seções lógicas e bem organizadas?
- **Redundância**: Perguntas duplicadas ou sobrepostas?

Retorne sugestões específicas e acionáveis no formato JSON.`

    const templateSummary = {
      name: template.name,
      description: template.description,
      type: template.type,
      sectionsCount: template.sections.length,
      questionsCount: template.sections.reduce((sum, s) => sum + s.questions.length, 0),
      sections: template.sections.map(section => ({
        title: section.title,
        questionsCount: section.questions.length,
        questions: section.questions.map(q => ({
          text: q.text,
          type: q.type,
          weight: q.weight,
          reference: q.reference,
          requiresJustification: q.requiresJustification,
          requiresEvidence: q.requiresEvidence
        }))
      }))
    }

    const userPrompt = `Revise o seguinte template de diagnóstico SST e forneça sugestões de melhoria:

**Template:**
${JSON.stringify(templateSummary, null, 2)}

${focusArea ? `**Área de foco específica:** ${focusArea}` : ''}

Retorne APENAS um JSON válido no seguinte formato (sem markdown, sem explicações):

{
  "overallAssessment": "Avaliação geral do template (2-3 frases)",
  "strengths": ["Ponto forte 1", "Ponto forte 2"],
  "suggestions": [
    {
      "type": "add_question" | "modify_question" | "remove_question" | "add_section" | "reorganize" | "update_reference",
      "priority": "high" | "medium" | "low",
      "category": "Categoria da sugestão",
      "description": "Descrição detalhada da sugestão",
      "sectionTitle": "Título da seção afetada (se aplicável)",
      "currentQuestion": "Texto da pergunta atual (se aplicável)",
      "suggestedQuestion": {
        "text": "Novo texto sugerido",
        "type": "BOOLEAN" | "SCORE",
        "weight": 5,
        "reference": "NR-XX item X.X",
        "requiresJustification": true,
        "requiresEvidence": false
      }
    }
  ]
}`

    console.log('🤖 Chamando IA com modelo gemini-1.5-flash...')
    
    let response
    try {
      response = await genai.models.generateContent({
        model: 'gemini-1.5-flash',
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
        },
        contents: userPrompt,
      })
    } catch (aiError) {
      console.error('❌ Erro na chamada da IA:', aiError)
      throw aiError
    }

    console.log('📦 Resposta recebida:', { hasText: !!response?.text, type: typeof response })

    const content = response.text
    if (!content) {
      console.error('IA não retornou conteúdo. Resposta completa:', JSON.stringify(response, null, 2))
      return NextResponse.json(
        { error: 'IA não retornou conteúdo' },
        { status: 500 }
      )
    }

    console.log('✅ Conteúdo recebido, tamanho:', content.length)

    let reviewResult
    try {
      reviewResult = JSON.parse(content)
    } catch (error) {
      console.error('Erro ao parsear JSON da IA:', content)
      return NextResponse.json(
        { error: 'Resposta da IA não é um JSON válido' },
        { status: 500 }
      )
    }

    // Validar estrutura básica
    if (!reviewResult.suggestions || !Array.isArray(reviewResult.suggestions)) {
      return NextResponse.json(
        { error: 'Resultado da revisão tem formato inválido' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      templateId: template.id,
      templateName: template.name,
      review: reviewResult
    })

  } catch (error) {
    console.error('❌ Erro ao revisar template via IA:', error)
    
    // Mensagem de erro mais específica
    let errorMessage = 'Erro ao revisar template via IA'
    if (error instanceof Error) {
      console.error('Detalhes do erro:', error.message)
      console.error('Stack:', error.stack)
      
      // Erros específicos da API do Gemini
      if (error.message.includes('API key')) {
        errorMessage = 'Erro de configuração da API. Verifique a chave GEMINI_API_KEY.'
      } else if (error.message.includes('quota') || error.message.includes('limit') || error.message.includes('429')) {
        errorMessage = 'Limite de uso da API atingido. Tente novamente em alguns segundos ou aguarde o reset da quota diária.'
      } else if (error.message.includes('RESOURCE_EXHAUSTED')) {
        errorMessage = 'Limite de requisições excedido. Por favor, aguarde alguns minutos e tente novamente.'
      } else if (error.message.includes('model')) {
        errorMessage = 'Modelo de IA indisponível. Tente novamente mais tarde.'
      } else if (error.message.includes('timeout')) {
        errorMessage = 'A requisição demorou muito. Tente novamente.'
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
