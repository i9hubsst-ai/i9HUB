'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin, getUserRole } from '@/lib/auth'
import { Role, MembershipStatus } from '@prisma/client'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getResetPasswordUrl } from '@/lib/utils/url'
import { generatePasswordResetLink } from '@/lib/services/password-reset-service'

export async function inviteUser(companyId: string, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  const role = await getUserRole(user.id, companyId)

  if (!isAdmin && role !== 'COMPANY_ADMIN') {
    return { error: 'Apenas administradores podem convidar usuários' }
  }

  const email = formData.get('email') as string
  const userRole = formData.get('role') as Role

  if (!email || !userRole) {
    return { error: 'Email e função são obrigatórios' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Email inválido. Use o formato: usuario@empresa.com' }
  }

  try {
    const supabaseAdmin = createAdminClient()
    
    // Check if user already exists in Supabase Auth
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    let targetUser = existingUsers?.users.find(u => u.email?.toLowerCase() === email.toLowerCase())

    // Check if there's already a membership for this email/company
    if (targetUser) {
      const existingMembership = await prisma.membership.findUnique({
        where: {
          userId_companyId: {
            userId: targetUser.id,
            companyId,
          }
        }
      })

      if (existingMembership) {
        if (existingMembership.status === 'INVITED') {
          return { error: 'Este usuário já tem um convite pendente para esta empresa' }
        }
        return { error: 'Este usuário já está associado a esta empresa' }
      }
    }

    // If user doesn't exist, invite them via Supabase
    if (!targetUser) {
      const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: {
          invited_by: user.id,
          company_id: companyId,
        }
      })

      if (inviteError) {
        console.error('Erro ao enviar convite Supabase:', inviteError)
        return { error: 'Erro ao enviar convite por email' }
      }

      targetUser = inviteData.user
    }

    // Create membership with INVITED status
    const membership = await prisma.membership.create({
      data: {
        userId: targetUser.id,
        companyId,
        role: userRole,
        status: 'INVITED',
      }
    })

    revalidatePath(`/dashboard/companies/${companyId}`)
    revalidatePath('/dashboard/users')
    return { success: true, membership }
  } catch (error) {
    console.error('Erro ao convidar usuário:', error)
    return { error: 'Erro ao convidar usuário' }
  }
}

export async function resendInvite(membershipId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const membership = await prisma.membership.findUnique({
      where: { id: membershipId }
    })

    if (!membership) {
      return { error: 'Membro não encontrado' }
    }

    if (membership.status !== 'INVITED') {
      return { error: 'Apenas convites pendentes podem ser reenviados' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, membership.companyId)

    if (!isAdmin && role !== 'COMPANY_ADMIN') {
      return { error: 'Sem permissão para reenviar convites' }
    }

    // Get user email from Supabase
    const supabaseAdmin = createAdminClient()
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(membership.userId)

    if (!authUser.user?.email) {
      return { error: 'Email do usuário não encontrado' }
    }

    // For users with status INVITED that haven't confirmed their email yet,
    // we need to delete and recreate them to resend the invite email
    // This is necessary because Supabase's inviteUserByEmail fails with "email_exists" 
    // for users that haven't confirmed yet
    
    // Check if user has confirmed their email
    if (!authUser.user.email_confirmed_at) {
      // User hasn't confirmed yet - delete and recreate to resend invite
      const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(membership.userId)
      
      if (deleteError) {
        console.error('Erro ao preparar reenvio:', deleteError)
        return { error: 'Erro ao preparar reenvio de convite' }
      }

      // Recreate user with same email
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        authUser.user.email,
        {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          data: {
            invited_by: user.id,
            company_id: membership.companyId,
          }
        }
      )

      if (createError) {
        console.error('Erro ao reenviar convite:', createError)
        return { error: 'Erro ao reenviar convite por email' }
      }

      // Update membership with new user ID
      await prisma.membership.update({
        where: { id: membershipId },
        data: { userId: newUser.user!.id }
      })

      revalidatePath(`/dashboard/companies/${membership.companyId}`)
      revalidatePath('/dashboard/users')
      return { success: true }
    }

    // User has confirmed email - they should login normally
    return { error: 'Este usuário já confirmou o email. Ele deve fazer login normalmente.' }
  } catch (error) {
    console.error('Erro ao reenviar convite:', error)
    return { error: 'Erro ao reenviar convite' }
  }
}

export async function updateUserRole(membershipId: string, newRole: Role) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const membership = await prisma.membership.findUnique({
      where: { id: membershipId }
    })

    if (!membership) {
      return { error: 'Membro não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, membership.companyId)

    if (!isAdmin && role !== 'COMPANY_ADMIN') {
      return { error: 'Sem permissão para alterar funções' }
    }

    const updated = await prisma.membership.update({
      where: { id: membershipId },
      data: { role: newRole }
    })

    revalidatePath(`/dashboard/companies/${membership.companyId}`)
    revalidatePath('/dashboard/users')
    return { success: true, membership: updated }
  } catch (error) {
    console.error('Erro ao atualizar função:', error)
    return { error: 'Erro ao atualizar função' }
  }
}

export async function removeUserFromCompany(membershipId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const membership = await prisma.membership.findUnique({
      where: { id: membershipId }
    })

    if (!membership) {
      return { error: 'Membro não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, membership.companyId)

    if (!isAdmin && role !== 'COMPANY_ADMIN') {
      return { error: 'Sem permissão para remover usuários' }
    }

    await prisma.membership.delete({
      where: { id: membershipId }
    })

    revalidatePath(`/dashboard/companies/${membership.companyId}`)
    revalidatePath('/dashboard/users')
    return { success: true }
  } catch (error) {
    console.error('Erro ao remover usuário:', error)
    return { error: 'Erro ao remover usuário' }
  }
}

export async function updateUserProfile(userId: string, data: { name?: string; email?: string }) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { error: 'Não autorizado' }
  }

  // Only allow updating own profile or if Platform Admin
  const isAdmin = await isPlatformAdmin(currentUser.id)
  if (!isAdmin && currentUser.id !== userId) {
    return { error: 'Você só pode editar seu próprio perfil' }
  }

  try {
    const supabaseAdmin = createAdminClient()
    
    // Update user in Supabase Auth
    const updateData: any = {}
    
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        return { error: 'Email inválido' }
      }
      updateData.email = data.email
    }
    
    if (data.name) {
      updateData.user_metadata = { name: data.name }
    }

    const { data: updatedUser, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      updateData
    )

    if (error) {
      console.error('Erro ao atualizar usuário no Supabase:', error)
      return { error: 'Erro ao atualizar perfil' }
    }

    revalidatePath('/dashboard/users')
    return { success: true, user: updatedUser }
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error)
    return { error: 'Erro ao atualizar perfil' }
  }
}

export async function getCompanyUsers(companyId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  const role = await getUserRole(user.id, companyId)

  if (!isAdmin && !role) {
    return { error: 'Sem permissão para acessar usuários desta empresa' }
  }

  try {
    const memberships = await prisma.membership.findMany({
      where: { companyId },
      include: {
        company: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const supabaseAdmin = createAdminClient()
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers()

    const usersWithDetails = memberships.map(membership => {
      const authUser = authUsers?.users.find(u => u.id === membership.userId)
      return {
        ...membership,
        email: authUser?.email,
        name: authUser?.user_metadata?.name,
      }
    })

    return { success: true, users: usersWithDetails }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return { error: 'Erro ao buscar usuários' }
  }
}

export async function getAllUsers() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)

  try {
    let memberships

    if (isAdmin) {
      memberships = await prisma.membership.findMany({
        include: {
          company: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      const userMemberships = await prisma.membership.findMany({
        where: {
          userId: user.id,
          status: 'ACTIVE'
        },
        select: {
          companyId: true
        }
      })

      const companyIds = userMemberships.map(m => m.companyId)

      memberships = await prisma.membership.findMany({
        where: {
          companyId: {
            in: companyIds
          }
        },
        include: {
          company: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    const supabaseAdmin = createAdminClient()
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers()

    // Get all platform admins to override their role display
    const platformAdmins = await prisma.platformAdmin.findMany({
      select: {
        userId: true
      }
    })
    const platformAdminIds = new Set(platformAdmins.map(pa => pa.userId))

    const usersWithDetails = memberships.map(membership => {
      const authUser = authUsers?.users.find(u => u.id === membership.userId)
      
      // If user is a platform admin, override their role for display
      const effectiveRole = platformAdminIds.has(membership.userId) 
        ? 'PLATFORM_ADMIN' as Role
        : membership.role

      return {
        ...membership,
        role: effectiveRole,
        email: authUser?.email,
        name: authUser?.user_metadata?.name,
      }
    })

    return { success: true, users: usersWithDetails }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error)
    return { error: 'Erro ao buscar usuários' }
  }
}

export async function makePlatformAdmin(userId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores da plataforma podem promover usuários' }
  }

  try {
    const admin = await prisma.platformAdmin.create({
      data: {
        userId,
      }
    })

    revalidatePath('/dashboard/users')
    return { success: true, admin }
  } catch (error) {
    console.error('Erro ao promover usuário:', error)
    return { error: 'Este usuário já é administrador da plataforma' }
  }
}

export async function resetUserPassword(userId: string, companyId?: string) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    return { error: 'Não autorizado' }
  }

  // Verificar se o usuário atual tem permissão para resetar senhas
  const isAdmin = await isPlatformAdmin(currentUser.id)
  
  if (!isAdmin && companyId) {
    const role = await getUserRole(currentUser.id, companyId)
    if (role !== 'COMPANY_ADMIN') {
      return { error: 'Apenas administradores podem resetar senhas de usuários' }
    }
  } else if (!isAdmin) {
    return { error: 'Apenas administradores podem resetar senhas de usuários' }
  }

  try {
    const supabaseAdmin = createAdminClient()
    
    // Buscar o usuário no Supabase
    const { data: userData, error: getUserError } = await supabaseAdmin.auth.admin.getUserById(userId)
    
    if (getUserError || !userData?.user) {
      return { error: 'Usuário não encontrado' }
    }

    const user = userData.user

    if (!user.email) {
      return { error: 'Email do usuário não encontrado' }
    }

    // Usar serviço customizado para garantir URL correta
    const resetResult = await generatePasswordResetLink(user.email)
    
    if (!resetResult.success) {
      return { error: resetResult.error || 'Erro ao gerar link de recuperação' }
    }

    revalidatePath('/dashboard/users')
    return { 
      success: true, 
      message: `Email de recuperação enviado para ${user.email}. Link gerado com sucesso.` 
    }
  } catch (error) {
    console.error('Erro ao resetar senha:', error)
    return { error: 'Erro interno do servidor' }
  }
}
