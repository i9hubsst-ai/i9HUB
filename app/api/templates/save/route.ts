import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface SaveTemplateRequest {
  name: string
  description: string
  type: string
  sections: Array<{
    title: string
    description: string | null
    order: number
    questions: Array<{
      text: string
      type: 'BOOLEAN' | 'SCORE'
      weight: number
      reference: string | null
      requiresJustification: boolean
    }>
  }>
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
        { error: 'Apenas administradores podem salvar templates' },
        { status: 403 }
      )
    }

    const body: SaveTemplateRequest = await request.json()
    const { name, description, type, sections } = body

    if (!name || !description || !sections || sections.length === 0) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    // Criar template com seções e perguntas
    const template = await prisma.diagnosticTemplate.create({
      data: {
        name,
        description,
        type: type as any,
        status: 'DRAFT',
        createdBy: user.id,
        sections: {
          create: sections.map((section, idx) => ({
            title: section.title,
            order: section.order || idx + 1,
            questions: {
              create: section.questions.map((question) => ({
                text: question.text,
                type: question.type,
                weight: question.weight,
                reference: question.reference,
                requiresJustification: question.requiresJustification
              }))
            }
          }))
        }
      },
      include: {
        sections: {
          include: {
            questions: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      templateId: template.id,
      template
    })

  } catch (error) {
    console.error('Erro ao salvar template:', error)
    return NextResponse.json(
      { error: 'Erro ao salvar template' },
      { status: 500 }
    )
  }
}
