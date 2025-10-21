/**
 * Data Migration Script: Link Memberships to Employees
 * 
 * This script associates existing membership records with employee records
 * by matching email and company. It synchronizes the relationship in both directions.
 * 
 * Run with: npx tsx scripts/link-memberships-employees.ts
 */

import { prisma } from '../lib/prisma'
import { createAdminClient } from '../lib/supabase/admin'

interface MigrationResult {
  totalMemberships: number
  linkedCount: number
  conflicts: Array<{
    userId: string
    email: string
    companyId: string
    reason: string
  }>
  errors: Array<{
    userId: string
    error: string
  }>
}

async function linkMembershipsToEmployees(): Promise<MigrationResult> {
  const result: MigrationResult = {
    totalMemberships: 0,
    linkedCount: 0,
    conflicts: [],
    errors: []
  }

  try {
    console.log('🔄 Starting migration: Linking memberships to employees...\n')

    // Get all memberships
    const memberships = await prisma.membership.findMany({
      where: {
        employeeId: null // Only process unlinked memberships
      },
      include: {
        company: true
      }
    })

    result.totalMemberships = memberships.length
    console.log(`📊 Found ${memberships.length} unlinked memberships\n`)

    // Get Supabase admin client to fetch user emails
    const supabaseAdmin = createAdminClient()
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers()

    for (const membership of memberships) {
      try {
        // Get user email from Supabase Auth
        const authUser = authUsers?.users.find(u => u.id === membership.userId)
        
        if (!authUser?.email) {
          result.errors.push({
            userId: membership.userId,
            error: 'User email not found in Supabase Auth'
          })
          continue
        }

        const userEmail = authUser.email.toLowerCase()

        // Find matching employee by email and company
        const matchingEmployees = await prisma.employee.findMany({
          where: {
            companyId: membership.companyId,
            email: {
              equals: userEmail,
              mode: 'insensitive'
            }
          }
        })

        if (matchingEmployees.length === 0) {
          console.log(`⚠️  No employee found for ${userEmail} at ${membership.company.name}`)
          continue
        }

        if (matchingEmployees.length > 1) {
          result.conflicts.push({
            userId: membership.userId,
            email: userEmail,
            companyId: membership.companyId,
            reason: `Multiple employees found (${matchingEmployees.length}) with same email`
          })
          console.log(`❌ CONFLICT: ${matchingEmployees.length} employees with email ${userEmail}`)
          continue
        }

        const employee = matchingEmployees[0]

        // Update membership with employeeId
        await prisma.membership.update({
          where: { id: membership.id },
          data: { employeeId: employee.id }
        })

        // Update employee with userId if not set
        if (!employee.userId) {
          await prisma.employee.update({
            where: { id: employee.id },
            data: { userId: membership.userId }
          })
        }

        result.linkedCount++
        console.log(`✅ Linked ${authUser.user_metadata?.name || userEmail} → ${employee.fullName}`)

      } catch (error) {
        result.errors.push({
          userId: membership.userId,
          error: error instanceof Error ? error.message : String(error)
        })
        console.error(`❌ Error processing membership ${membership.id}:`, error)
      }
    }

    console.log('\n📈 Migration Summary:')
    console.log(`   Total memberships processed: ${result.totalMemberships}`)
    console.log(`   Successfully linked: ${result.linkedCount}`)
    console.log(`   Conflicts: ${result.conflicts.length}`)
    console.log(`   Errors: ${result.errors.length}`)

    if (result.conflicts.length > 0) {
      console.log('\n⚠️  Conflicts (require manual resolution):')
      result.conflicts.forEach(c => {
        console.log(`   - ${c.email} at company ${c.companyId}: ${c.reason}`)
      })
    }

    if (result.errors.length > 0) {
      console.log('\n❌ Errors:')
      result.errors.forEach(e => {
        console.log(`   - User ${e.userId}: ${e.error}`)
      })
    }

  } catch (error) {
    console.error('\n💥 Fatal error during migration:', error)
    throw error
  }

  return result
}

// Run migration
linkMembershipsToEmployees()
  .then((result) => {
    console.log('\n✅ Migration completed!')
    process.exit(result.errors.length > 0 ? 1 : 0)
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error)
    process.exit(1)
  })
