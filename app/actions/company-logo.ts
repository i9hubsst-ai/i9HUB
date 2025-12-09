'use server'

import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'

export async function uploadCompanyLogo(companyId: string, formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      console.error('[Logo Upload] Usuário não autenticado')
      return { error: 'Não autorizado' }
    }

    console.log('[Logo Upload] Usuário:', user.id, 'Empresa:', companyId)

    const file = formData.get('logo') as File
    if (!file) {
      console.error('[Logo Upload] Nenhum arquivo enviado')
      return { error: 'Nenhum arquivo foi enviado' }
    }

    console.log('[Logo Upload] Arquivo:', file.name, 'Tipo:', file.type, 'Tamanho:', file.size)

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml']
    if (!allowedTypes.includes(file.type)) {
      console.error('[Logo Upload] Tipo não permitido:', file.type)
      return { error: 'Tipo de arquivo não permitido. Use: JPG, PNG, WEBP ou SVG' }
    }

    // Validar tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.error('[Logo Upload] Arquivo muito grande:', file.size)
      return { error: 'Arquivo muito grande. Tamanho máximo: 5MB' }
    }

    // Verificar se empresa existe
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        memberships: {
          where: { userId: user.id }
        }
      }
    })

    console.log('[Logo Upload] Empresa encontrada:', !!company, 'Memberships:', company?.memberships.length)

    if (!company) {
      console.error('[Logo Upload] Empresa não encontrada:', companyId)
      return { error: 'Empresa não encontrada' }
    }

    // Verificar se é admin da plataforma OU membro da empresa
    const isAdmin = await isPlatformAdmin(user.id)
    console.log('[Logo Upload] É admin da plataforma:', isAdmin)
    console.log('[Logo Upload] Tem membership na empresa:', company.memberships.length > 0)

    if (!isAdmin && company.memberships.length === 0) {
      console.error('[Logo Upload] Usuário sem permissão para empresa:', companyId)
      return { error: 'Você não tem permissão para editar esta empresa' }
    }

    console.log('[Logo Upload] Permissão concedida:', isAdmin ? 'como admin' : 'como membro')

    // Upload para Supabase Storage usando Service Role (bypassa RLS)
    const { createClient: createServiceClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    if (!supabaseServiceKey) {
      console.error('[Logo Upload] SUPABASE_SERVICE_ROLE_KEY não configurada')
      return { error: 'Configuração de storage incorreta' }
    }
    
    // Usar service role para bypassar RLS
    const supabaseAdmin = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${companyId}-${Date.now()}.${fileExt}`
    const filePath = `company-logos/${fileName}`

    console.log('[Logo Upload] Preparando upload com service role:', filePath)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log('[Logo Upload] Buffer criado, tamanho:', buffer.length)

    const { error: uploadError, data } = await supabaseAdmin.storage
      .from('company-assets')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('[Logo Upload] Erro no upload:', uploadError)
      return { error: `Erro ao fazer upload: ${uploadError.message}` }
    }

    console.log('[Logo Upload] Upload bem-sucedido:', data)

    // Obter URL pública
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('company-assets')
      .getPublicUrl(filePath)

    console.log('[Logo Upload] URL pública:', publicUrl)

    // Deletar logo antiga se existir
    if (company.logo) {
      const oldPath = company.logo.split('/company-assets/')[1]
      if (oldPath) {
        console.log('[Logo Upload] Deletando logo antiga:', oldPath)
        const { error: deleteError } = await supabaseAdmin.storage
          .from('company-assets')
          .remove([oldPath])
        
        if (deleteError) {
          console.warn('[Logo Upload] Erro ao deletar logo antiga:', deleteError)
        }
      }
    }

    // Atualizar empresa com novo logo
    console.log('[Logo Upload] Atualizando empresa no banco')
    await prisma.company.update({
      where: { id: companyId },
      data: { logo: publicUrl }
    })

    console.log('[Logo Upload] Sucesso! Logo atualizado')
    return { success: true, logoUrl: publicUrl }
  } catch (error) {
    console.error('[Logo Upload] Erro fatal:', error)
    return { error: `Erro ao processar upload: ${error instanceof Error ? error.message : 'Erro desconhecido'}` }
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

    if (!company) {
      return { error: 'Empresa não encontrada' }
    }

    // Verificar se é admin da plataforma ou membro da empresa
    const isAdmin = await isPlatformAdmin(user.id)

    if (!isAdmin && company.memberships.length === 0) {
      return { error: 'Você não tem permissão para editar esta empresa' }
    }

    if (!company.logo) {
      return { error: 'Empresa não possui logo' }
    }

    // Deletar do storage usando Service Role (bypassa RLS)
    const { createClient: createServiceClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    const supabaseAdmin = createServiceClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    const oldPath = company.logo.split('/company-assets/')[1]
    if (oldPath) {
      await supabaseAdmin.storage
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
