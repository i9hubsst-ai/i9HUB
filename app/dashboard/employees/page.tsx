import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Building2, Briefcase, UserPlus } from 'lucide-react'
import { getEmployees } from '@/app/actions/employees'
import { getCompanies } from '@/app/actions/companies'
import { AddEmployeeDialog } from '@/components/dashboard/add-employee-dialog'
import { EmployeesList } from '@/components/dashboard/employees-list'

export default async function EmployeesPage() {
  const result = await getEmployees()
  const companiesResult = await getCompanies()

  if (result.error) {
    return (
      <div className="p-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const employees = result.employees || []
  const companies = companiesResult.companies || []

  // Statistics
  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'ACTIVE').length,
    clt: employees.filter(e => e.contractType === 'CLT').length,
    companies: new Set(employees.map(e => e.companyId)).size,
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Funcionários</h1>
          <p className="text-muted-foreground">
            Gerencie o cadastro completo dos colaboradores ({stats.total} total)
          </p>
        </div>
        <AddEmployeeDialog companies={companies} />
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <Users className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-1">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total de Funcionários</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-green-100 text-green-700">
                <UserPlus className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-1">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
                <Briefcase className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-1">{stats.clt}</div>
            <p className="text-xs text-muted-foreground">Regime CLT</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-orange-100 text-orange-700">
                <Building2 className="h-4 w-4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary mb-1">{stats.companies}</div>
            <p className="text-xs text-muted-foreground">Empresas</p>
          </CardContent>
        </Card>
      </div>

      {/* Employees List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Funcionários</h2>
        <EmployeesList employees={employees} />
      </div>
    </div>
  )
}
