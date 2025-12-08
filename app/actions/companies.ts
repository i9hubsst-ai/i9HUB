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

export async function getCompanyMembers(companyId: string) {
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
    const memberships = await prisma.membership.findMany({
      where: {
        companyId,
        status: 'ACTIVE'
      },
      select: {
        userId: true,
        role: true,
        employee: {
          select: {
            id: true,
            fullName: true,
            email: true,
            position: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Fetch user data from Supabase
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    
    const members = await Promise.all(
      memberships.map(async (membership) => {
        const { data: userData } = await supabase.auth.admin.getUserById(membership.userId)
        
        return {
          userId: membership.userId,
          name: membership.employee?.fullName || userData?.user?.user_metadata?.full_name || userData?.user?.email || 'Usuário',
          email: membership.employee?.email || userData?.user?.email || '',
          role: membership.role,
          position: membership.employee?.position
        }
      })
    )

    return { success: true, members }
  } catch (error) {
    console.error('Erro ao buscar membros:', error)
    return { error: 'Erro ao buscar membros da empresa' }
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

// ============= NOVAS FUNÇÕES COMPLETAS =============

interface CompanyCompleteData {
  // Dados Institucionais
  name: string
  razaoSocial?: string
  cnpj: string
  inscricaoEstadual?: string
  inscricaoMunicipal?: string
  naturezaJuridica?: string
  ramoAtividade?: string
  cnaePrincipal?: string
  cnaesSecundarios?: string[]
  dataFundacao?: string
  
  // Endereço
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
  
  // Contatos
  telefone?: string
  telefone2?: string
  email?: string
  emailInstitucional?: string
  
  // Responsáveis
  responsavelLegal?: string
  responsavelLegalCargo?: string
  responsavelLegalEmail?: string
  responsavelLegalTelefone?: string
  
  responsavelTecnicoSST?: string
  responsavelTecnicoCargo?: string
  responsavelTecnicoRegistro?: string
  responsavelTecnicoEmail?: string
  responsavelTecnicoTelefone?: string
  
  // SST
  grauRisco?: string
  temSesmt?: boolean
  numeroFuncionarios?: number
  numeroTurnos?: number
  jornada?: string
  
  // Complementares
  logo?: string
  descricaoNegocio?: string
  missao?: string
  visao?: string
  valores?: string
  observacoes?: string
}

export async function updateCompanyComplete(companyId: string, data: CompanyCompleteData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  const isAdmin = await isPlatformAdmin(user.id)
  const role = await getUserRole(user.id, companyId)

  if (!isAdmin && role !== 'COMPANY_ADMIN') {
    return { error: 'Sem permissão para editar esta empresa' }
  }

  if (!data.name || !data.cnpj) {
    return { error: 'Nome e CNPJ são obrigatórios' }
  }

  try {
    const company = await prisma.company.update({
      where: { id: companyId },
      data: {
        ...data,
        dataFundacao: data.dataFundacao ? new Date(data.dataFundacao) : null,
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
