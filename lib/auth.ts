import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Role } from '@prisma/client'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}

export async function getUserMemberships(userId: string) {
  return await prisma.membership.findMany({
    where: {
      userId,
      status: 'ACTIVE'
    },
    include: {
      company: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function isPlatformAdmin(userId: string): Promise<boolean> {
  const admin = await prisma.platformAdmin.findUnique({
    where: { userId }
  })
  return !!admin
}

export async function getUserRole(userId: string, companyId: string): Promise<Role | null> {
  const membership = await prisma.membership.findUnique({
    where: {
      userId_companyId: {
        userId,
        companyId
      }
    }
  })
  
  return membership?.role ?? null
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireRole(userId: string, companyId: string, allowedRoles: Role[]) {
  const role = await getUserRole(userId, companyId)
  const isAdmin = await isPlatformAdmin(userId)
  
  if (isAdmin) return true
  
  if (!role || !allowedRoles.includes(role)) {
    throw new Error('Insufficient permissions')
  }
  
  return true
}

export async function getUserDisplayRole(userId: string): Promise<{ role: Role | 'PLATFORM_ADMIN', label: string }> {
  // Check if user is Platform Admin first
  const isAdmin = await isPlatformAdmin(userId)
  
  if (isAdmin) {
    return {
      role: 'PLATFORM_ADMIN',
      label: 'Admin da Plataforma'
    }
  }
  
  // Get the user's primary membership (most recent active one)
  const memberships = await getUserMemberships(userId)
  
  if (memberships.length === 0) {
    return {
      role: 'VIEWER',
      label: 'Sem Acesso'
    }
  }
  
  // Use the first membership's role
  const primaryRole = memberships[0].role
  
  const roleLabels: Record<Role, string> = {
    PLATFORM_ADMIN: 'Admin da Plataforma',
    COMPANY_ADMIN: 'Admin da Empresa',
    ENGINEER: 'Engenheiro SST',
    EMPLOYER: 'Empregador',
    VIEWER: 'Visualizador'
  }
  
  return {
    role: primaryRole,
    label: roleLabels[primaryRole]
  }
}
