import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { getEmployeeById } from '@/app/actions/employees'
import { getCompanies } from '@/app/actions/companies'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EmployeeEditForm } from '@/components/dashboard/employee-edit-form'

export const dynamic = 'force-dynamic'

export default async function EditEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getEmployeeById(id)
  const companiesResult = await getCompanies()

  if (result.error || !result.employee) {
    notFound()
  }

  const employee = result.employee
  const companies = companiesResult.companies || []

  return (
    <div className="p-8 space-y-6">
      <Link href={`/dashboard/employees/${id}`}>
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-primary">Editar Funcionário</h1>
        <p className="text-muted-foreground">
          Atualize as informações do colaborador
        </p>
      </div>

      <EmployeeEditForm employee={employee} companies={companies} />
    </div>
  )
}
