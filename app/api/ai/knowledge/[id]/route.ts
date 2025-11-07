import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return NextResponse.json({ error: 'Apenas administradores podem editar documentos' }, { status: 403 })
    }

    const { id } = await context.params
    const body = await request.json()
    const { title, description, category, sourceUrl } = body

    // Validar campos obrigatórios
    if (!title || !category) {
      return NextResponse.json(
        { error: 'Título e categoria são obrigatórios' },
        { status: 400 }
      )
    }

    // Atualizar documento
    const updatedDocument = await prisma.knowledgeSource.update({
      where: { id },
      data: {
        title,
        description,
        category,
        sourceUrl: sourceUrl || null,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      document: updatedDocument,
    })
  } catch (error) {
    console.error('Erro ao atualizar documento:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar documento' },
      { status: 500 }
    )
  }
}
