'use server'

import { getCurrentUser, isPlatformAdmin, getUserRole } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function uploadEmployeePhoto(employeeId: string, formData: FormData) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      console.error('[Photo Upload] Usuário não autenticado')
      return { error: 'Não autorizado' }
    }

    console.log('[Photo Upload] Usuário:', user.id, 'Funcionário:', employeeId)

    const file = formData.get('photo') as File
    if (!file) {
      console.error('[Photo Upload] Nenhum arquivo enviado')
      return { error: 'Nenhum arquivo foi enviado' }
    }

    console.log('[Photo Upload] Arquivo:', file.name, 'Tipo:', file.type, 'Tamanho:', file.size)

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      console.error('[Photo Upload] Tipo não permitido:', file.type)
      return { error: 'Tipo de arquivo não permitido. Use: JPG, PNG ou WEBP' }
    }

    // Validar tamanho (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      console.error('[Photo Upload] Arquivo muito grande:', file.size)
      return { error: 'Arquivo muito grande. Tamanho máximo: 5MB' }
    }

    // Verificar se funcionário existe e buscar companyId
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        company: {
          include: {
            memberships: {
              where: { userId: user.id }
            }
          }
        }
      }
    })

    console.log('[Photo Upload] Funcionário encontrado:', !!employee)

    if (!employee) {
      console.error('[Photo Upload] Funcionário não encontrado:', employeeId)
      return { error: 'Funcionário não encontrado' }
    }

    // Verificar permissão - admin da plataforma OU membro da empresa
    const isAdmin = await isPlatformAdmin(user.id)
    const isMember = employee.company.memberships.length > 0
    
    console.log('[Photo Upload] É admin da plataforma:', isAdmin)
    console.log('[Photo Upload] Tem membership na empresa:', isMember)

    if (!isAdmin && !isMember) {
      console.error('[Photo Upload] Usuário sem permissão')
      return { error: 'Você não tem permissão para editar este funcionário' }
    }

    console.log('[Photo Upload] Permissão concedida:', isAdmin ? 'como admin' : 'como membro')

    // Upload para Supabase Storage usando Service Role (bypassa RLS)
    const { createClient: createServiceClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    if (!supabaseServiceKey) {
      console.error('[Photo Upload] SUPABASE_SERVICE_ROLE_KEY não configurada')
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
    const fileName = `${employeeId}-${Date.now()}.${fileExt}`
    const filePath = `employee-photos/${fileName}`

    console.log('[Photo Upload] Preparando upload com service role:', filePath)

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log('[Photo Upload] Buffer criado, tamanho:', buffer.length)

    const { error: uploadError, data } = await supabaseAdmin.storage
      .from('company-assets')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('[Photo Upload] Erro no upload:', uploadError)
      return { error: `Erro ao fazer upload: ${uploadError.message}` }
    }

    console.log('[Photo Upload] Upload bem-sucedido:', data)

    // Obter URL pública
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('company-assets')
      .getPublicUrl(filePath)

    console.log('[Photo Upload] URL pública:', publicUrl)

    // Deletar foto antiga se existir
    if ((employee as any).photo) {
      const oldPath = (employee as any).photo.split('/company-assets/')[1]
      if (oldPath) {
        console.log('[Photo Upload] Deletando foto antiga:', oldPath)
        const { error: deleteError } = await supabaseAdmin.storage
          .from('company-assets')
          .remove([oldPath])
        
        if (deleteError) {
          console.warn('[Photo Upload] Erro ao deletar foto antiga:', deleteError)
        }
      }
    }

    // Atualizar funcionário com nova foto
    console.log('[Photo Upload] Atualizando funcionário no banco')
    await prisma.employee.update({
      where: { id: employeeId },
      data: { photo: publicUrl } as any
    })

    console.log('[Photo Upload] Sucesso! Foto atualizada')
    return { success: true, photoUrl: publicUrl }
  } catch (error) {
    console.error('[Photo Upload] Erro fatal:', error)
    return { error: `Erro ao processar upload: ${error instanceof Error ? error.message : 'Erro desconhecido'}` }
  }
}

export async function deleteEmployeePhoto(employeeId: string) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { error: 'Não autorizado' }
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        company: {
          include: {
            memberships: {
              where: { userId: user.id }
            }
          }
        }
      }
    })

    if (!employee) {
      return { error: 'Funcionário não encontrado' }
    }

    // Verificar permissão
    const isAdmin = await isPlatformAdmin(user.id)
    const isMember = employee.company.memberships.length > 0

    if (!isAdmin && !isMember) {
      return { error: 'Você não tem permissão para editar este funcionário' }
    }

    if (!(employee as any).photo) {
      return { error: 'Funcionário não possui foto' }
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
    
    const oldPath = (employee as any).photo.split('/company-assets/')[1]
    if (oldPath) {
      await supabaseAdmin.storage
        .from('company-assets')
        .remove([oldPath])
    }

    // Remover referência no banco
    await prisma.employee.update({
      where: { id: employeeId },
      data: { photo: null } as any
    })

    return { success: true }
  } catch (error) {
    console.error('Error deleting employee photo:', error)
    return { error: 'Erro ao deletar foto' }
  }
}
