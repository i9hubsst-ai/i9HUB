'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UserPlus, Loader2 } from 'lucide-react'
import { createEmployee, type EmployeeFormData } from '@/app/actions/employees'
import { validateCPF, formatCPF, formatPhone } from '@/lib/utils/validators'
import type { Company } from '@prisma/client'

interface AddEmployeeDialogProps {
  companies: Company[]
}

export function AddEmployeeDialog({ companies }: AddEmployeeDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<Partial<EmployeeFormData>>({
    nationality: 'Brasileira',
    status: 'ACTIVE'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate required fields
    if (!formData.companyId || !formData.fullName || !formData.cpf || 
        !formData.birthDate || !formData.email || !formData.employeeNumber ||
        !formData.admissionDate || !formData.contractType || !formData.position) {
      setError('Preencha todos os campos obrigatórios')
      setLoading(false)
      return
    }

    // Validate CPF
    if (!validateCPF(formData.cpf)) {
      setError('CPF inválido')
      setLoading(false)
      return
    }

    const result = await createEmployee(formData as EmployeeFormData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setOpen(false)
      setFormData({ nationality: 'Brasileira', status: 'ACTIVE' })
      setLoading(false)
    }
  }

  const updateField = (field: keyof EmployeeFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Cadastrar Funcionário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Funcionário</DialogTitle>
          <DialogDescription>
            Preencha as informações completas do colaborador
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Company Selection */}
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Select
                value={formData.companyId}
                onValueChange={(value) => updateField('companyId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Identificação Civil */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Identificação Civil</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName || ''}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Nome completo do funcionário"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={formData.cpf || ''}
                    onChange={(e) => updateField('cpf', formatCPF(e.target.value))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate || ''}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Sexo</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value: any) => updateField('gender', value)}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value: any) => updateField('maritalStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SINGLE">Solteiro(a)</SelectItem>
                      <SelectItem value="MARRIED">Casado(a)</SelectItem>
                      <SelectItem value="DIVORCED">Divorciado(a)</SelectItem>
                      <SelectItem value="WIDOWED">Viúvo(a)</SelectItem>
                      <SelectItem value="OTHER">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality || 'Brasileira'}
                    onChange={(e) => updateField('nationality', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Nome do Contato de Emergência</Label>
                  <Input
                    id="emergencyContactName"
                    value={formData.emergencyContactName || ''}
                    onChange={(e) => updateField('emergencyContactName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Telefone de Emergência</Label>
                  <Input
                    id="emergencyContactPhone"
                    value={formData.emergencyContactPhone || ''}
                    onChange={(e) => updateField('emergencyContactPhone', formatPhone(e.target.value))}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
            </div>

            {/* Vínculo Trabalhista */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Vínculo Trabalhista</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeNumber">Matrícula *</Label>
                  <Input
                    id="employeeNumber"
                    value={formData.employeeNumber || ''}
                    onChange={(e) => updateField('employeeNumber', e.target.value)}
                    placeholder="Matrícula interna"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admissionDate">Data de Admissão *</Label>
                  <Input
                    id="admissionDate"
                    type="date"
                    value={formData.admissionDate || ''}
                    onChange={(e) => updateField('admissionDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractType">Tipo de Contrato *</Label>
                  <Select
                    value={formData.contractType}
                    onValueChange={(value: any) => updateField('contractType', value)}
                  >
                    <SelectTrigger>
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
                  <Label htmlFor="workSchedule">Jornada/Turno</Label>
                  <Input
                    id="workSchedule"
                    value={formData.workSchedule || ''}
                    onChange={(e) => updateField('workSchedule', e.target.value)}
                    placeholder="Ex: 8h às 17h"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade/Obra</Label>
                  <Input
                    id="unit"
                    value={formData.unit || ''}
                    onChange={(e) => updateField('unit', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Setor/Área</Label>
                  <Input
                    id="department"
                    value={formData.department || ''}
                    onChange={(e) => updateField('department', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Cargo/Função *</Label>
                  <Input
                    id="position"
                    value={formData.position || ''}
                    onChange={(e) => updateField('position', e.target.value)}
                    placeholder="Cargo do funcionário"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cboCode">Código CBO</Label>
                  <Input
                    id="cboCode"
                    value={formData.cboCode || ''}
                    onChange={(e) => updateField('cboCode', e.target.value)}
                    placeholder="0000-00"
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="supervisor">Superior Imediato</Label>
                  <Input
                    id="supervisor"
                    value={formData.supervisor || ''}
                    onChange={(e) => updateField('supervisor', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Cadastrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
