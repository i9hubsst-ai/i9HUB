'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Edit, Ban, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { inactivateEmployee } from '@/app/actions/employees'
import { useRouter } from 'next/navigation'

interface Employee {
  id: string
  fullName: string
  cpf: string
  employeeNumber: string
  position: string
  department: string | null
  admissionDate: Date
  status: string
}

interface EmployeesTableProps {
  employees: Employee[]
  companyId: string
}

export function EmployeesTable({ employees, companyId }: EmployeesTableProps) {
  const [inactivateId, setInactivateId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleInactivate = async () => {
    if (!inactivateId) return
    setLoading(true)

    const result = await inactivateEmployee(inactivateId)
    
    if (!result.error) {
      setInactivateId(null)
      router.refresh()
    } else {
      alert(result.error)
    }
    setLoading(false)
  }
  if (employees.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Nenhum funcionário cadastrado</p>
        <Link href={`/dashboard/employees?companyId=${companyId}`}>
          <Button variant="outline" className="mt-4">
            Cadastrar Primeiro Funcionário
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {employees.length} {employees.length === 1 ? 'funcionário cadastrado' : 'funcionários cadastrados'}
        </p>
        <Link href={`/dashboard/employees?companyId=${companyId}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Ir para Gestão de Funcionários
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Matrícula</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Admissão</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-mono text-sm">{employee.employeeNumber}</TableCell>
                <TableCell className="font-medium">{employee.fullName}</TableCell>
                <TableCell className="font-mono text-sm">
                  {employee.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department || '-'}</TableCell>
                <TableCell className="text-sm">
                  {format(new Date(employee.admissionDate), 'dd/MM/yyyy', { locale: ptBR })}
                </TableCell>
                <TableCell>
                  <Badge variant={employee.status === 'ACTIVE' ? 'default' : 'secondary'}>
                    {employee.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/employees/${employee.id}`}>
                      <Button variant="ghost" size="sm" title="Ver detalhes">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      disabled={employee.status === 'INACTIVE'}
                      title={employee.status === 'INACTIVE' ? 'Já inativo' : 'Inativar funcionário'}
                      onClick={() => setInactivateId(employee.id)}
                    >
                      <Ban className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Inactivate Confirmation Dialog */}
      <AlertDialog open={!!inactivateId} onOpenChange={(open) => !open && setInactivateId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Inativação</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                Tem certeza que deseja inativar este funcionário? O registro será mantido no sistema mas o status será alterado para <strong>Inativo</strong>.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-3">
                <p className="text-sm text-blue-900 font-medium">ℹ️ Importante:</p>
                <ul className="text-sm text-blue-800 mt-1 space-y-1 list-disc list-inside">
                  <li>O funcionário pode ser <strong>reativado</strong> a qualquer momento editando o registro</li>
                  <li>Todo o histórico é preservado</li>
                  <li>Para transferir entre empresas: inative aqui e cadastre na nova empresa</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleInactivate} disabled={loading}>
              {loading ? 'Inativando...' : 'Inativar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
