'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function uploadEvidence(
  assessmentId: string,
  answerId: string,
  formData: FormData
) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const file = formData.get('file') as File
    if (!file) {
      return { error: 'Nenhum arquivo fornecido' }
    }

    // Validar tamanho (máx 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return { error: 'Arquivo muito grande. Máximo: 10MB' }
    }

    // Validar tipo
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return { error: 'Tipo de arquivo não permitido. Use imagens, PDF ou documentos Office.' }
    }

    // Converter para base64 (temporário - posteriormente migrar para Supabase Storage)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Salvar no banco
    const evidence = await prisma.evidence.create({
      data: {
        assessmentId,
        answerId,
        fileName: file.name,
        fileUrl: dataUrl, // Temporário: será substituído por URL do Supabase Storage
        fileSize: file.size,
        mimeType: file.type,
        uploadedBy: user.id
      }
    })

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    return { success: true, evidence }
  } catch (error) {
    console.error('Erro ao fazer upload de evidência:', error)
    return { error: 'Erro ao fazer upload do arquivo' }
  }
}

export async function deleteEvidence(evidenceId: string, assessmentId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    // Verificar se o usuário tem permissão
    const evidence = await prisma.evidence.findUnique({
      where: { id: evidenceId }
    })

    if (!evidence) {
      return { error: 'Evidência não encontrada' }
    }

    if (evidence.uploadedBy !== user.id) {
      // Verificar se é admin ou tem permissão na empresa
      const assessment = await prisma.assessment.findUnique({
        where: { id: assessmentId },
        select: { companyId: true }
      })

      if (!assessment) {
        return { error: 'Diagnóstico não encontrado' }
      }

      const membership = await prisma.membership.findFirst({
        where: {
          userId: user.id,
          companyId: assessment.companyId,
          status: 'ACTIVE'
        }
      })

      if (!membership || !['COMPANY_ADMIN', 'ENGINEER'].includes(membership.role)) {
        return { error: 'Sem permissão para excluir esta evidência' }
      }
    }

    // TODO: Se estiver usando Supabase Storage, deletar arquivo de lá também

    await prisma.evidence.delete({
      where: { id: evidenceId }
    })

    revalidatePath(`/dashboard/diagnostics/${assessmentId}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir evidência:', error)
    return { error: 'Erro ao excluir evidência' }
  }
}

export async function getEvidencesByAnswer(answerId: string) {
  try {
    const evidences = await prisma.evidence.findMany({
      where: { answerId },
      orderBy: { uploadedAt: 'desc' }
    })

    return { success: true, evidences }
  } catch (error) {
    console.error('Erro ao buscar evidências:', error)
    return { error: 'Erro ao buscar evidências' }
  }
}
