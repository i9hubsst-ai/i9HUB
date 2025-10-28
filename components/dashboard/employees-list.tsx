'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { MoreVertical, Pencil, Trash2, Mail, Phone, Building2, Briefcase } from 'lucide-react'
import { deleteEmployee } from '@/app/actions/employees'
import { formatCPF, formatPhone } from '@/lib/utils/validators'
import { EditEmployeeDialog } from './edit-employee-dialog'

type Employee = {
  id: string
  fullName: string
  cpf: string
  email: string
  phone: string | null
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
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!deleteId) return
    setLoading(true)

    const result = await deleteEmployee(deleteId)
    
    if (!result.error) {
      setDeleteId(null)
    }
    setLoading(false)
  }

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
                  <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold">
                    {employee.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditEmployee(employee)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setDeleteId(employee.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-destructive hover:bg-destructive/90">
              {loading ? 'Excluindo...' : 'Excluir'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      {editEmployee && (
        <EditEmployeeDialog
          employee={editEmployee}
          open={!!editEmployee}
          onOpenChange={(open: boolean) => !open && setEditEmployee(null)}
        />
      )}
    </>
  )
}
