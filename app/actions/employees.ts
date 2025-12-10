'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin, getUserRole } from '@/lib/auth'
import type { Gender, MaritalStatus, ContractType, MembershipStatus } from '@prisma/client'

/**
 * IMPORTANTE: Sistema Multi-Empresa de Funcionários
 * 
 * Este módulo suporta os seguintes cenários:
 * 
 * 1. MESMO CPF EM MÚLTIPLAS EMPRESAS:
 *    - Um funcionário pode ter registros em várias empresas simultaneamente
 *    - Constraint: @@unique([companyId, cpf]) permite isso
 *    - Cada empresa tem seu próprio vínculo empregatício independente
 * 
 * 2. INATIVAÇÃO/REATIVAÇÃO:
 *    - Status ACTIVE: Funcionário ativo na empresa
 *    - Status INACTIVE: Funcionário inativo (saiu, demitido, etc)
 *    - Pode ser REATIVADO editando o registro e mudando status para ACTIVE
 *    - Histórico completo é preservado (nunca deletamos funcionários)
 * 
 * 3. TRANSFERÊNCIA ENTRE EMPRESAS:
 *    - Cenário: Funcionário sai da Empresa A e vai para Empresa B
 *    - Processo: 
 *      a) Inativar na Empresa A (status = INACTIVE)
 *      b) Criar novo registro na Empresa B (status = ACTIVE)
 *    - Ambos os registros são mantidos para histórico
 */

export type EmployeeFormData = {
  companyId: string
  fullName: string
  cpf: string
  birthDate: string
  gender?: Gender
  maritalStatus?: MaritalStatus
  nationality?: string
  email: string
  phone?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  employeeNumber: string
  admissionDate: string
  contractType: ContractType
  workSchedule?: string
  unit?: string
  department?: string
  position: string
  cboCode?: string
  supervisor?: string
  status?: MembershipStatus
}

export async function createEmployee(data: EmployeeFormData) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, data.companyId)

    if (!isAdmin && role !== 'COMPANY_ADMIN') {
      return { error: 'Sem permissão para cadastrar funcionários' }
    }

    const employee = await prisma.employee.create({
      data: {
        companyId: data.companyId,
        fullName: data.fullName,
        cpf: data.cpf.replace(/\D/g, ''),
        birthDate: new Date(data.birthDate),
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality || 'Brasileira',
        email: data.email,
        phone: data.phone,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        employeeNumber: data.employeeNumber,
        admissionDate: new Date(data.admissionDate),
        contractType: data.contractType,
        workSchedule: data.workSchedule,
        unit: data.unit,
        department: data.department,
        position: data.position,
        cboCode: data.cboCode,
        supervisor: data.supervisor,
        status: data.status || 'ACTIVE',
      },
    })

    revalidatePath('/dashboard/employees')
    revalidatePath(`/dashboard/companies/${data.companyId}`)
    return { success: true, employee }
  } catch (error: any) {
    console.error('Erro ao criar funcionário:', error)
    
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('cpf')) {
        return { error: 'CPF já cadastrado nesta empresa' }
      }
      if (error.meta?.target?.includes('employeeNumber')) {
        return { error: 'Matrícula já cadastrada nesta empresa' }
      }
    }
    
    return { error: 'Erro ao cadastrar funcionário' }
  }
}

export async function updateEmployee(id: string, data: EmployeeFormData) {
  console.log('[UPDATE EMPLOYEE] 🔵 Iniciando updateEmployee para ID:', id)
  
  const user = await getCurrentUser()
  if (!user) {
    console.log('[UPDATE EMPLOYEE] ❌ Usuário não autenticado')
    return { error: 'Não autorizado' }
  }

  console.log('[UPDATE EMPLOYEE] ✅ Usuário autenticado:', user.id)

  try {
    console.log('[UPDATE EMPLOYEE] 🔍 Buscando funcionário no banco...')
    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      console.log('[UPDATE EMPLOYEE] ❌ Funcionário não encontrado')
      return { error: 'Funcionário não encontrado' }
    }

    console.log('[UPDATE EMPLOYEE] ✅ Funcionário encontrado, companyId:', employee.companyId)

    console.log('[UPDATE EMPLOYEE] 🔍 Verificando permissões...')
    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, employee.companyId)

    console.log('[UPDATE EMPLOYEE] 👤 isAdmin:', isAdmin, 'role:', role)

    if (!isAdmin && role !== 'COMPANY_ADMIN') {
      console.log('[UPDATE EMPLOYEE] ❌ Sem permissão')
      return { error: 'Sem permissão para editar funcionários' }
    }

    console.log('[UPDATE EMPLOYEE] 💾 Atualizando funcionário no banco...')
    const updated = await prisma.employee.update({
      where: { id },
      data: {
        fullName: data.fullName,
        cpf: data.cpf.replace(/\D/g, ''),
        birthDate: new Date(data.birthDate),
        gender: data.gender,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality || 'Brasileira',
        email: data.email,
        phone: data.phone,
        emergencyContactName: data.emergencyContactName,
        emergencyContactPhone: data.emergencyContactPhone,
        employeeNumber: data.employeeNumber,
        admissionDate: new Date(data.admissionDate),
        contractType: data.contractType,
        workSchedule: data.workSchedule,
        unit: data.unit,
        department: data.department,
        position: data.position,
        cboCode: data.cboCode,
        supervisor: data.supervisor,
        status: data.status || 'ACTIVE',
      },
    })

    console.log('[UPDATE EMPLOYEE] ✅ Funcionário atualizado com sucesso')
    console.log('[UPDATE EMPLOYEE] 🔄 Revalidando paths...')
    revalidatePath('/dashboard/employees')
    revalidatePath(`/dashboard/companies/${employee.companyId}`)
    console.log('[UPDATE EMPLOYEE] ✅ Paths revalidados, retornando sucesso')
    return { success: true, employee: updated }
  } catch (error: any) {
    console.error('[UPDATE EMPLOYEE] ❌ Erro fatal ao atualizar funcionário:', error)
    
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('cpf')) {
        console.log('[UPDATE EMPLOYEE] ❌ Erro: CPF duplicado')
        return { error: 'CPF já cadastrado nesta empresa' }
      }
      if (error.meta?.target?.includes('employeeNumber')) {
        console.log('[UPDATE EMPLOYEE] ❌ Erro: Matrícula duplicada')
        return { error: 'Matrícula já cadastrada nesta empresa' }
      }
    }
    
    console.log('[UPDATE EMPLOYEE] ❌ Erro genérico')
    return { error: 'Erro ao atualizar funcionário' }
  }
}

/**
 * Inativa um funcionário alterando seu status para INACTIVE
 * 
 * IMPORTANTE: 
 * - Não deleta o registro, apenas muda o status
 * - Preserva todo o histórico e relacionamentos
 * - Pode ser REATIVADO editando o funcionário e mudando status para ACTIVE
 * - Útil para: demissões, afastamentos, transferências entre empresas
 * 
 * Para transferir funcionário entre empresas:
 * 1. Inativar na empresa atual com esta função
 * 2. Criar novo registro na nova empresa (o CPF pode ser repetido)
 */
export async function inactivateEmployee(id: string, status: 'ACTIVE' | 'INACTIVE' = 'INACTIVE') {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      return { error: 'Funcionário não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, employee.companyId)

    if (!isAdmin && role !== 'COMPANY_ADMIN') {
      return { error: 'Sem permissão para alterar status de funcionários' }
    }

    await prisma.employee.update({
      where: { id },
      data: { status },
    })

    revalidatePath('/dashboard/employees')
    revalidatePath(`/dashboard/companies/${employee.companyId}`)
    revalidatePath(`/dashboard/employees/${id}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao alterar status do funcionário:', error)
    return { error: 'Erro ao alterar status do funcionário' }
  }
}

/**
 * Deleta permanentemente um funcionário
 * 
 * ATENÇÃO: Use com cuidado!
 * - Deleta o registro permanentemente
 * - Pode quebrar relacionamentos se o funcionário tiver vínculos em outros módulos
 * - RECOMENDAÇÃO: Use inactivateEmployee() ao invés desta função na maioria dos casos
 */
export async function deleteEmployee(id: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado' }
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    })

    if (!employee) {
      return { error: 'Funcionário não encontrado' }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, employee.companyId)

    if (!isAdmin && role !== 'COMPANY_ADMIN') {
      return { error: 'Sem permissão para excluir funcionários' }
    }

    await prisma.employee.delete({
      where: { id },
    })

    revalidatePath('/dashboard/employees')
    revalidatePath(`/dashboard/companies/${employee.companyId}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir funcionário:', error)
    return { error: 'Erro ao excluir funcionário' }
  }
}

export async function getEmployees(companyId?: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado', employees: [] }
  }

  try {
    const isAdmin = await isPlatformAdmin(user.id)

    let employees

    if (isAdmin && !companyId) {
      employees = await prisma.employee.findMany({
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          fullName: 'asc',
        },
      })
    } else if (companyId) {
      const role = await getUserRole(user.id, companyId)
      if (!isAdmin && !role) {
        return { error: 'Sem permissão para visualizar funcionários', employees: [] }
      }

      employees = await prisma.employee.findMany({
        where: {
          companyId,
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          fullName: 'asc',
        },
      })
    } else {
      const memberships = await prisma.membership.findMany({
        where: {
          userId: user.id,
          status: 'ACTIVE',
        },
        select: {
          companyId: true,
        },
      })

      const companyIds = memberships.map(m => m.companyId)

      employees = await prisma.employee.findMany({
        where: {
          companyId: {
            in: companyIds,
          },
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          fullName: 'asc',
        },
      })
    }

    return { employees }
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error)
    return { error: 'Erro ao buscar funcionários', employees: [] }
  }
}

export async function getEmployeeById(id: string) {
  const user = await getCurrentUser()
  if (!user) {
    return { error: 'Não autorizado', employee: null }
  }

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (!employee) {
      return { error: 'Funcionário não encontrado', employee: null }
    }

    const isAdmin = await isPlatformAdmin(user.id)
    const role = await getUserRole(user.id, employee.companyId)

    if (!isAdmin && !role) {
      return { error: 'Sem permissão para visualizar este funcionário', employee: null }
    }

    return { employee }
  } catch (error) {
    console.error('Erro ao buscar funcionário:', error)
    return { error: 'Erro ao buscar funcionário', employee: null }
  }
}
