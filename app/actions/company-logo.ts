'use server'

import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function uploadCompanyLogo(companyId: string, formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Não autorizado' }
    }

    const file = formData.get('logo') as File
    if (!file) {
      return { error: 'Nenhum arquivo foi enviado' }
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      return { error: 'Tipo de arquivo não permitido. Use: JPG, PNG, WEBP ou SVG' }
    }

    // Validar tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return { error: 'Arquivo muito grande. Tamanho máximo: 5MB' }
    }

    // Verificar se empresa existe e usuário tem acesso
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        memberships: {
          where: { userId: user.id }
        }
      }
    })

    if (!company || company.memberships.length === 0) {
      return { error: 'Empresa não encontrada ou sem permissão' }
    }

    // Upload para Supabase Storage
    const supabase = await createClient()
    const fileExt = file.name.split('.').pop()
    const fileName = `${companyId}-${Date.now()}.${fileExt}`
    const filePath = `company-logos/${fileName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError, data } = await supabase.storage
      .from('company-assets')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return { error: 'Erro ao fazer upload da imagem' }
    }

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('company-assets')
      .getPublicUrl(filePath)

    // Deletar logo antiga se existir
    if (company.logo) {
      const oldPath = company.logo.split('/company-assets/')[1]
      if (oldPath) {
        await supabase.storage
          .from('company-assets')
          .remove([oldPath])
      }
    }

    // Atualizar empresa com novo logo
    await prisma.company.update({
      where: { id: companyId },
      data: { logo: publicUrl }
    })

    return { success: true, logoUrl: publicUrl }
  } catch (error) {
    console.error('Error uploading company logo:', error)
    return { error: 'Erro ao processar upload' }
  }
}

export async function deleteCompanyLogo(companyId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Não autorizado' }
    }

    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        memberships: {
          where: { userId: user.id }
        }
      }
    })

    if (!company || company.memberships.length === 0) {
      return { error: 'Empresa não encontrada ou sem permissão' }
    }

    if (!company.logo) {
      return { error: 'Empresa não possui logo' }
    }

    // Deletar do storage
    const supabase = await createClient()
    const oldPath = company.logo.split('/company-assets/')[1]
    if (oldPath) {
      await supabase.storage
        .from('company-assets')
        .remove([oldPath])
    }

    // Remover referência no banco
    await prisma.company.update({
      where: { id: companyId },
      data: { logo: null }
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting company logo:', error)
    return { error: 'Erro ao deletar logo' }
  }
}
