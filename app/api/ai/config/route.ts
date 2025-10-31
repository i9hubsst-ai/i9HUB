import { NextRequest } from 'next/server'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response('Não autorizado', { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return new Response('Acesso negado', { status: 403 })
    }

    // Buscar configuração atual
    let config = await prisma.aIConfiguration.findFirst({
      where: { isActive: true }
    })

    // Se não existir, criar com valores padrão
    if (!config) {
      // Prompt adicional vazio inicialmente - admin pode personalizar
      const defaultAdditionalPrompt = ""

      config = await prisma.aIConfiguration.create({
        data: {
          systemPrompt: defaultAdditionalPrompt,
          temperature: 0.7,
          maxTokens: 2000,
          isActive: true
        }
      })
    }

    // Buscar documentos associados
    const documents = await prisma.knowledgeDocument.findMany({
      where: { status: { in: ['PROCESSING', 'READY', 'ERROR'] } },
      orderBy: { uploadedAt: 'desc' },
      select: {
        id: true,
        filename: true,
        uploadedAt: true,
        size: true,
        status: true,
        pages: true
      }
    })

    return Response.json({
      systemPrompt: config.systemPrompt,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      documents
    })
  } catch (error) {
    console.error('Erro ao carregar configuração AI:', error)
    return new Response('Erro interno', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return new Response('Não autorizado', { status: 401 })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    if (!isAdmin) {
      return new Response('Acesso negado', { status: 403 })
    }

    const { systemPrompt, temperature, maxTokens } = await request.json()

    // Validações
    if (systemPrompt === undefined || systemPrompt === null) {
      return new Response('Prompt do sistema é obrigatório (pode ser vazio)', { status: 400 })
    }

    if (temperature < 0 || temperature > 2) {
      return new Response('Temperatura deve estar entre 0 e 2', { status: 400 })
    }

    if (maxTokens < 100 || maxTokens > 4000) {
      return new Response('Max tokens deve estar entre 100 e 4000', { status: 400 })
    }

    // Desativar configuração atual
    await prisma.aIConfiguration.updateMany({
      where: { isActive: true },
      data: { isActive: false }
    })

    // Criar nova configuração (pode ser vazio)
    await prisma.aIConfiguration.create({
      data: {
        systemPrompt: systemPrompt.trim(),
        temperature,
        maxTokens,
        isActive: true,
        updatedBy: user.id
      }
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Erro ao salvar configuração AI:', error)
    return new Response('Erro interno', { status: 500 })
  }
}