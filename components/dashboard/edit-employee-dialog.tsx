'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Edit } from 'lucide-react'
import { updateEmployee } from '@/app/actions/employees'
import { validateCPF, formatCPF, formatPhone } from '@/lib/utils/validators'
import { useRouter } from 'next/navigation'

interface EditEmployeeDialogProps {
  employee: any
  trigger?: 'button' | 'icon'
  defaultOpen?: boolean
}

export function EditEmployeeDialog({ employee, trigger = 'button', defaultOpen = false }: EditEmployeeDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(defaultOpen)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>({})

  useEffect(() => {
    if (employee && open) {
      const formatDate = (date: string | Date | null | undefined) => {
        if (!date) return ''
        if (typeof date === 'string') return date.split('T')[0]
        if (date instanceof Date) return date.toISOString().split('T')[0]
        return ''
      }
      setData({
        companyId: employee.company.id,
        fullName: employee.fullName || '',
        cpf: employee.cpf || '',
        birthDate: formatDate(employee.birthDate),
        gender: employee.gender || '',
        maritalStatus: employee.maritalStatus || '',
        nationality: employee.nationality || 'Brasileira',
        email: employee.email || '',
        phone: employee.phone || '',
        emergencyContactName: employee.emergencyContactName || '',
        emergencyContactPhone: employee.emergencyContactPhone || '',
        employeeNumber: employee.employeeNumber || '',
        admissionDate: formatDate(employee.admissionDate),
        contractType: employee.contractType || '',
        workSchedule: employee.workSchedule || '',
        unit: employee.unit || '',
        department: employee.department || '',
        position: employee.position || '',
        cboCode: employee.cboCode || '',
        supervisor: employee.supervisor || '',
        status: employee.status || 'ACTIVE',
      })
    }
  }, [employee, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate required fields
    if (!data.companyId || !data.fullName || !data.cpf || 
        !data.birthDate || !data.email || !data.employeeNumber ||
        !data.admissionDate || !data.contractType || !data.position) {
      setError('Preencha todos os campos obrigatórios')
      setLoading(false)
      return
    }

    // Validate CPF
    if (!validateCPF(data.cpf)) {
      setError('CPF inválido')
      setLoading(false)
      return
    }

    const result = await updateEmployee(employee.id, data)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setOpen(false)
      setLoading(false)
      router.refresh()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = (field: string, value: any) => setData((prev: any) => ({ ...prev, [field]: value }))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger === 'button' ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
      )}
      
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Funcionário</DialogTitle>
          <DialogDescription>Atualize as informações do colaborador</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Company Display (readonly) */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">Empresa *</Label>
              <Input 
                id="company" 
                value={employee?.company?.name || ''} 
                disabled 
                className="bg-muted h-11"
              />
              <p className="text-xs text-muted-foreground">
                A empresa não pode ser alterada após o cadastro
              </p>
            </div>

            {/* Identificação Civil */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-5 text-primary">Identificação Civil</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-3 space-y-2">
                  <Label className="text-sm font-medium">Nome Completo *</Label>
                  <Input 
                    value={data.fullName || ''} 
                    onChange={(e) => u('fullName', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Nome completo do funcionário"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">CPF *</Label>
                  <Input 
                    value={formatCPF(data.cpf || '')} 
                    onChange={(e) => u('cpf', e.target.value)} 
                    maxLength={14}
                    className="bg-white h-11"
                    placeholder="000.000.000-00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Data de Nascimento *</Label>
                  <Input 
                    type="date" 
                    value={data.birthDate || ''} 
                    onChange={(e) => u('birthDate', e.target.value)}
                    className="bg-white h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Sexo</Label>
                  <Select value={data.gender} onValueChange={(v) => u('gender', v)}>
                    <SelectTrigger className="bg-white h-11">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Masculino</SelectItem>
                      <SelectItem value="FEMALE">Feminino</SelectItem>
                      <SelectItem value="OTHER">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Estado Civil</Label>
                  <Select value={data.maritalStatus} onValueChange={(v) => u('maritalStatus', v)}>
                    <SelectTrigger className="bg-white h-11">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SINGLE">Solteiro(a)</SelectItem>
                      <SelectItem value="MARRIED">Casado(a)</SelectItem>
                      <SelectItem value="DIVORCED">Divorciado(a)</SelectItem>
                      <SelectItem value="WIDOWED">Viúvo(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Nacionalidade</Label>
                  <Input 
                    value={data.nationality || ''} 
                    onChange={(e) => u('nationality', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Ex: Brasileira"
                  />
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-5 text-primary">Contato</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">E-mail *</Label>
                  <Input 
                    type="email" 
                    value={data.email || ''} 
                    onChange={(e) => u('email', e.target.value)}
                    className="bg-white h-11"
                    placeholder="email@exemplo.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Telefone</Label>
                  <Input 
                    value={formatPhone(data.phone || '')} 
                    onChange={(e) => u('phone', e.target.value)}
                    className="bg-white h-11"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contato de Emergência</Label>
                  <Input 
                    value={data.emergencyContactName || ''} 
                    onChange={(e) => u('emergencyContactName', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Nome do contato"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Telefone de Emergência</Label>
                  <Input 
                    value={formatPhone(data.emergencyContactPhone || '')} 
                    onChange={(e) => u('emergencyContactPhone', e.target.value)}
                    className="bg-white h-11"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Vínculo Trabalhista */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-5 text-primary">Vínculo Trabalhista</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Matrícula *</Label>
                  <Input 
                    value={data.employeeNumber || ''} 
                    onChange={(e) => u('employeeNumber', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Número da matrícula"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Data de Admissão *</Label>
                  <Input 
                    type="date" 
                    value={data.admissionDate || ''} 
                    onChange={(e) => u('admissionDate', e.target.value)}
                    className="bg-white h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Tipo de Contrato *</Label>
                  <Select value={data.contractType} onValueChange={(v) => u('contractType', v)}>
                    <SelectTrigger className="bg-white h-11">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CLT">CLT</SelectItem>
                      <SelectItem value="INTERN">Estágio</SelectItem>
                      <SelectItem value="OUTSOURCED">Terceirizado</SelectItem>
                      <SelectItem value="TEMPORARY">Temporário</SelectItem>
                      <SelectItem value="AUTONOMOUS">Autônomo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status *</Label>
                  <Select value={data.status} onValueChange={(v) => u('status', v)}>
                    <SelectTrigger className="bg-white h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Ativo</SelectItem>
                      <SelectItem value="INACTIVE">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use "Inativo" para funcionários desligados ou afastados
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Jornada/Turno</Label>
                  <Input 
                    value={data.workSchedule || ''} 
                    onChange={(e) => u('workSchedule', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Ex: 08:00-17:00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Unidade/Obra</Label>
                  <Input 
                    value={data.unit || ''} 
                    onChange={(e) => u('unit', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Local de trabalho"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Setor/Área</Label>
                  <Input 
                    value={data.department || ''} 
                    onChange={(e) => u('department', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Departamento"
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-sm font-medium">Cargo/Função *</Label>
                  <Input 
                    value={data.position || ''} 
                    onChange={(e) => u('position', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Cargo do funcionário"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Código CBO</Label>
                  <Input 
                    value={data.cboCode || ''} 
                    onChange={(e) => u('cboCode', e.target.value)}
                    className="bg-white h-11"
                    placeholder="CBO"
                  />
                </div>
                
                <div className="md:col-span-3 space-y-2">
                  <Label className="text-sm font-medium">Superior Imediato</Label>
                  <Input 
                    value={data.supervisor || ''} 
                    onChange={(e) => u('supervisor', e.target.value)}
                    className="bg-white h-11"
                    placeholder="Nome do supervisor"
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-4 rounded-md mb-4">
              {error}
            </div>
          )}

          <DialogFooter className="gap-2 pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)} 
              disabled={loading}
              className="h-11 px-6"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="h-11 px-6"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
