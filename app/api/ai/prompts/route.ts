import { NextResponse } from 'next/server'
import { getCurrentUser, getUserPrimaryCompanyId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const companyId = await getUserPrimaryCompanyId(user.id)
    
    if (!companyId) {
      return NextResponse.json(
        { error: 'Usuário não possui empresa associada' },
        { status: 400 }
      )
    }

    const promptConfig = await prisma.aIPromptConfig.create({
      data: {
        ...data,
        createdBy: user.id,
        companyId
      }
    })

    return NextResponse.json(promptConfig)
  } catch (error) {
    console.error('Erro ao salvar prompt:', error)
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const companyId = await getUserPrimaryCompanyId(user.id)
    
    if (!companyId) {
      return NextResponse.json(
        { error: 'Usuário não possui empresa associada' },
        { status: 400 }
      )
    }

    const prompts = await prisma.aIPromptConfig.findMany({
      where: {
        companyId,
        isActive: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    return NextResponse.json(prompts)
  } catch (error) {
    console.error('Erro ao buscar prompts:', error)
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 }
    )
  }
}