'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getCurrentUser, isPlatformAdmin, getUserRole } from '@/lib/auth'
import type { Gender, MaritalStatus, ContractType, MembershipStatus } from '@prisma/client'

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
      return { error: 'Sem permissão para editar funcionários' }
    }

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

    revalidatePath('/dashboard/employees')
    revalidatePath(`/dashboard/companies/${employee.companyId}`)
    return { success: true, employee: updated }
  } catch (error: any) {
    console.error('Erro ao atualizar funcionário:', error)
    
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('cpf')) {
        return { error: 'CPF já cadastrado nesta empresa' }
      }
      if (error.meta?.target?.includes('employeeNumber')) {
        return { error: 'Matrícula já cadastrada nesta empresa' }
      }
    }
    
    return { error: 'Erro ao atualizar funcionário' }
  }
}

export async function inactivateEmployee(id: string) {
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
      data: { status: 'INACTIVE' },
    })

    revalidatePath('/dashboard/employees')
    revalidatePath(`/dashboard/companies/${employee.companyId}`)
    return { success: true }
  } catch (error) {
    console.error('Erro ao inativar funcionário:', error)
    return { error: 'Erro ao inativar funcionário' }
  }
}

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
