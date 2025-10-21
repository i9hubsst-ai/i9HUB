'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin, getUserRole } from '@/lib/auth'
import { Role } from '@prisma/client'

export async function createCompany(formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores da plataforma podem criar empresas' }
  }

  const name = formData.get('name') as string
  const cnpj = formData.get('cnpj') as string

  if (!name || !cnpj) {
    return { error: 'Nome e CNPJ são obrigatórios' }
  }

  try {
    const company = await prisma.company.create({
      data: {
        name,
        cnpj,
      }
    })

    revalidatePath('/dashboard/companies')
    return { success: true, company }
  } catch (error) {
    console.error('Erro ao criar empresa:', error)
    return { error: 'Erro ao criar empresa. Verifique se o CNPJ já não está cadastrado.' }
  }
}

export async function updateCompany(companyId: string, formData: FormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  const role = await getUserRole(user.id, companyId)

  if (!isAdmin && role !== 'COMPANY_ADMIN') {
    return { error: 'Sem permissão para editar esta empresa' }
  }

  const name = formData.get('name') as string
  const cnpj = formData.get('cnpj') as string

  if (!name || !cnpj) {
    return { error: 'Nome e CNPJ são obrigatórios' }
  }

  try {
    const company = await prisma.company.update({
      where: { id: companyId },
      data: {
        name,
        cnpj,
      }
    })

    revalidatePath('/dashboard/companies')
    revalidatePath(`/dashboard/companies/${companyId}`)
    return { success: true, company }
  } catch (error) {
    console.error('Erro ao atualizar empresa:', error)
    return { error: 'Erro ao atualizar empresa' }
  }
}

export async function deleteCompany(companyId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  if (!isAdmin) {
    return { error: 'Apenas administradores da plataforma podem deletar empresas' }
  }

  try {
    await prisma.company.delete({
      where: { id: companyId }
    })

    revalidatePath('/dashboard/companies')
    return { success: true }
  } catch (error) {
    console.error('Erro ao deletar empresa:', error)
    return { error: 'Erro ao deletar empresa' }
  }
}

export async function getCompanies() {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)

  try {
    let companies

    if (isAdmin) {
      companies = await prisma.company.findMany({
        include: {
          _count: {
            select: {
              memberships: true,
              assessments: true,
              actionPlans: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      const memberships = await prisma.membership.findMany({
        where: {
          userId: user.id,
          status: 'ACTIVE'
        },
        include: {
          company: {
            include: {
              _count: {
                select: {
                  memberships: true,
                  assessments: true,
                  actionPlans: true,
                }
              }
            }
          }
        }
      })

      companies = memberships.map(m => m.company)
    }

    return { success: true, companies }
  } catch (error) {
    console.error('Erro ao buscar empresas:', error)
    return { error: 'Erro ao buscar empresas' }
  }
}

export async function getCompanyById(companyId: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  const role = await getUserRole(user.id, companyId)

  if (!isAdmin && !role) {
    return { error: 'Sem permissão para acessar esta empresa' }
  }

  try {
    const company = await prisma.company.findUnique({
      where: { id: companyId },
      include: {
        memberships: {
          include: {
            company: true
          }
        },
        assessments: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        },
        _count: {
          select: {
            memberships: true,
            assessments: true,
            actionPlans: true,
          }
        }
      }
    })

    if (!company) {
      return { error: 'Empresa não encontrada' }
    }

    return { success: true, company }
  } catch (error) {
    console.error('Erro ao buscar empresa:', error)
    return { error: 'Erro ao buscar empresa' }
  }
}
