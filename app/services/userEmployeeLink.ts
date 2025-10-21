'use server'

import { prisma } from '@/lib/prisma'
import { createAdminClient } from '@/lib/supabase/admin'
import type { Role } from '@prisma/client'

/**
 * User-Employee Linking Service
 * Centralizes the relationship between Supabase Auth users and Employee records
 */

interface EmployeeData {
  fullName: string
  cpf: string
  birthDate: Date | string
  gender?: string
  maritalStatus?: string
  nationality?: string
  email: string
  phone?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  employeeNumber: string
  admissionDate: Date | string
  contractType: string
  workSchedule?: string
  unit?: string
  department?: string
  position: string
  cboCode?: string
  supervisor?: string
}

/**
 * Creates or links a user with employee data
 * Used in invite flow: membership + optional employee
 */
export async function linkOrCreateUserWithEmployee(
  userId: string,
  companyId: string,
  role: Role,
  employeeData?: EmployeeData
) {
  try {
    const result = await prisma.$transaction(async (tx) => {
      let employeeId: string | undefined = undefined

      // If employee data provided, create or update employee record
      if (employeeData) {
        const normalizedEmail = employeeData.email.toLowerCase()

        // Check for existing employee by email
        const existingEmployee = await tx.employee.findFirst({
          where: {
            companyId,
            email: { equals: normalizedEmail, mode: 'insensitive' }
          }
        })

        if (existingEmployee) {
          // Update existing employee with userId
          const updated = await tx.employee.update({
            where: { id: existingEmployee.id },
            data: {
              userId,
              fullName: employeeData.fullName,
              phone: employeeData.phone,
            }
          })
          employeeId = updated.id
        } else {
          // Create new employee
          const created = await tx.employee.create({
            data: {
              companyId,
              userId,
              fullName: employeeData.fullName,
              cpf: employeeData.cpf,
              birthDate: new Date(employeeData.birthDate),
              gender: employeeData.gender as any,
              maritalStatus: employeeData.maritalStatus as any,
              nationality: employeeData.nationality || 'Brasileira',
              email: normalizedEmail,
              phone: employeeData.phone,
              emergencyContactName: employeeData.emergencyContactName,
              emergencyContactPhone: employeeData.emergencyContactPhone,
              employeeNumber: employeeData.employeeNumber,
              admissionDate: new Date(employeeData.admissionDate),
              contractType: employeeData.contractType as any,
              workSchedule: employeeData.workSchedule,
              unit: employeeData.unit,
              department: employeeData.department,
              position: employeeData.position,
              cboCode: employeeData.cboCode,
              supervisor: employeeData.supervisor
            }
          })
          employeeId = created.id
        }
      }

      // Create or update membership
      const membership = await tx.membership.upsert({
        where: {
          userId_companyId: { userId, companyId }
        },
        create: {
          userId,
          companyId,
          role,
          employeeId,
          status: 'INVITED'
        },
        update: {
          employeeId,
          role
        }
      })

      return { membership, employeeId }
    })

    return { success: true, ...result }
  } catch (error) {
    console.error('Error linking user with employee:', error)
    return { error: 'Erro ao criar vínculo usuário-funcionário' }
  }
}

/**
 * Sync employee data from Supabase Auth user
 * Propagates name/email from Auth to Employee
 */
export async function syncEmployeeFromUser(userId: string, companyId?: string) {
  try {
    const supabaseAdmin = createAdminClient()
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(userId)

    if (!authUser?.user) {
      return { error: 'Usuário não encontrado no Supabase' }
    }

    const email = authUser.user.email
    const name = authUser.user.user_metadata?.name

    if (!email) {
      return { error: 'Email do usuário não encontrado' }
    }

    // Find employees linked to this user
    const where: any = { userId }
    if (companyId) where.companyId = companyId

    const employees = await prisma.employee.findMany({ where })

    // Update each employee
    for (const employee of employees) {
      await prisma.employee.update({
        where: { id: employee.id },
        data: {
          email: email.toLowerCase(),
          fullName: name || employee.fullName
        }
      })
    }

    return { success: true, updated: employees.length }
  } catch (error) {
    console.error('Error syncing employee from user:', error)
    return { error: 'Erro ao sincronizar dados do funcionário' }
  }
}

/**
 * Sync user data from employee
 * Propagates name/email from Employee to Supabase Auth
 */
export async function syncUserFromEmployee(employeeId: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId }
    })

    if (!employee?.userId) {
      return { error: 'Funcionário não tem userId associado' }
    }

    const supabaseAdmin = createAdminClient()
    
    await supabaseAdmin.auth.admin.updateUserById(employee.userId, {
      email: employee.email,
      user_metadata: {
        name: employee.fullName
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Error syncing user from employee:', error)
    return { error: 'Erro ao sincronizar dados do usuário' }
  }
}
