'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Building2, Briefcase, Eye, User } from 'lucide-react'
import { formatCPF, formatPhone } from '@/lib/utils/validators'
import Link from 'next/link'
import Image from 'next/image'

type Employee = {
  id: string
  fullName: string
  cpf: string
  email: string
  phone: string | null
  photo: string | null
  position: string
  department: string | null
  contractType: string
  status: string
  company: {
    id: string
    name: string
  }
}

interface EmployeesListProps {
  employees: Employee[]
}

export function EmployeesList({ employees }: EmployeesListProps) {
  const contractTypeLabels: Record<string, string> = {
    CLT: 'CLT',
    INTERN: 'Estágio',
    OUTSOURCED: 'Terceirizado',
    TEMPORARY: 'Temporário',
    AUTONOMOUS: 'Autônomo',
  }

  const statusConfig: Record<string, { label: string; color: string }> = {
    ACTIVE: { label: 'Ativo', color: 'bg-green-100 text-green-700' },
    INVITED: { label: 'Convite Pendente', color: 'bg-yellow-100 text-yellow-700' },
    INACTIVE: { label: 'Inativo', color: 'bg-gray-100 text-gray-700' },
  }

  if (employees.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Nenhum funcionário cadastrado ainda.</p>
          <p className="text-sm mt-2">Clique em &quot;Cadastrar Funcionário&quot; para adicionar o primeiro.</p>
        </div>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4">
        {employees.map((employee) => (
          <Card key={employee.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  {employee.photo ? (
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-teal-200">
                      <Image
                        src={employee.photo}
                        alt={employee.fullName}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-primary">{employee.fullName}</h3>
                      <Badge className={statusConfig[employee.status]?.color || 'bg-gray-100'}>
                        {statusConfig[employee.status]?.label || employee.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      CPF: {formatCPF(employee.cpf)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {employee.email}
                  </div>
                  {employee.phone && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {formatPhone(employee.phone)}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    {employee.company.name}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-3 w-3" />
                    {employee.position}
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {contractTypeLabels[employee.contractType] || employee.contractType}
                  </Badge>
                  {employee.department && (
                    <Badge variant="outline" className="text-xs">
                      {employee.department}
                    </Badge>
                  )}
                </div>
              </div>

              <Link href={`/dashboard/employees/${employee.id}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Eye className="h-4 w-4" />
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
