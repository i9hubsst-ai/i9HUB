'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { updateEmployee } from '@/app/actions/employees'
import { validateCPF, formatCPF, formatPhone } from '@/lib/utils/validators'

export function EditEmployeeDialog({ employee, open, onOpenChange }: any) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<any>({})

  useEffect(() => {
    if (employee && open) {
      const formatDate = (date: string) => date?.split('T')[0] || ''
      setData({
        companyId: employee.company.id,
        fullName: employee.fullName,
        cpf: employee.cpf,
        birthDate: formatDate(employee.birthDate),
        gender: employee.gender,
        maritalStatus: employee.maritalStatus,
        nationality: employee.nationality || 'Brasileira',
        email: employee.email,
        phone: employee.phone || '',
        emergencyContactName: employee.emergencyContactName || '',
        emergencyContactPhone: employee.emergencyContactPhone || '',
        employeeNumber: employee.employeeNumber,
        admissionDate: formatDate(employee.admissionDate),
        contractType: employee.contractType,
        workSchedule: employee.workSchedule || '',
        unit: employee.unit || '',
        department: employee.department || '',
        position: employee.position,
        cboCode: employee.cboCode || '',
        supervisor: employee.supervisor || '',
        status: employee.status,
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
      onOpenChange(false)
      setLoading(false)
    }
  }

  const u = (field: string, value: any) => setData((prev: any) => ({ ...prev, [field]: value }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
          <DialogDescription>Atualize as informações do colaborador</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 py-4">
            {/* Company Display (readonly) */}
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Input 
                id="company" 
                value={employee?.company?.name || ''} 
                disabled 
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                A empresa não pode ser alterada após o cadastro
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Identificação Civil</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><Label>Nome Completo *</Label><Input value={data.fullName || ''} onChange={(e) => u('fullName', e.target.value)} /></div>
                <div><Label>CPF *</Label><Input value={formatCPF(data.cpf || '')} onChange={(e) => u('cpf', e.target.value)} maxLength={14} /></div>
                <div><Label>Data de Nascimento *</Label><Input type="date" value={data.birthDate || ''} onChange={(e) => u('birthDate', e.target.value)} /></div>
                <div><Label>Sexo</Label><Select value={data.gender} onValueChange={(v) => u('gender', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="MALE">Masculino</SelectItem><SelectItem value="FEMALE">Feminino</SelectItem><SelectItem value="OTHER">Outro</SelectItem></SelectContent></Select></div>
                <div><Label>Estado Civil</Label><Select value={data.maritalStatus} onValueChange={(v) => u('maritalStatus', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="SINGLE">Solteiro(a)</SelectItem><SelectItem value="MARRIED">Casado(a)</SelectItem><SelectItem value="DIVORCED">Divorciado(a)</SelectItem><SelectItem value="WIDOWED">Viúvo(a)</SelectItem></SelectContent></Select></div>
                <div className="col-span-2"><Label>Nacionalidade</Label><Input value={data.nationality || ''} onChange={(e) => u('nationality', e.target.value)} /></div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Contato</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>E-mail *</Label><Input type="email" value={data.email || ''} onChange={(e) => u('email', e.target.value)} /></div>
                <div><Label>Telefone</Label><Input value={formatPhone(data.phone || '')} onChange={(e) => u('phone', e.target.value)} /></div>
                <div><Label>Contato de Emergência</Label><Input value={data.emergencyContactName || ''} onChange={(e) => u('emergencyContactName', e.target.value)} /></div>
                <div><Label>Telefone de Emergência</Label><Input value={formatPhone(data.emergencyContactPhone || '')} onChange={(e) => u('emergencyContactPhone', e.target.value)} /></div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-4">Vínculo Trabalhista</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Matrícula *</Label><Input value={data.employeeNumber || ''} onChange={(e) => u('employeeNumber', e.target.value)} /></div>
                <div><Label>Data de Admissão *</Label><Input type="date" value={data.admissionDate || ''} onChange={(e) => u('admissionDate', e.target.value)} /></div>
                <div><Label>Tipo de Contrato *</Label><Select value={data.contractType} onValueChange={(v) => u('contractType', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="CLT">CLT</SelectItem><SelectItem value="INTERN">Estágio</SelectItem><SelectItem value="OUTSOURCED">Terceirizado</SelectItem><SelectItem value="TEMPORARY">Temporário</SelectItem><SelectItem value="AUTONOMOUS">Autônomo</SelectItem></SelectContent></Select></div>
                <div><Label>Jornada/Turno</Label><Input value={data.workSchedule || ''} onChange={(e) => u('workSchedule', e.target.value)} /></div>
                <div><Label>Unidade/Obra</Label><Input value={data.unit || ''} onChange={(e) => u('unit', e.target.value)} /></div>
                <div><Label>Setor/Área</Label><Input value={data.department || ''} onChange={(e) => u('department', e.target.value)} /></div>
                <div><Label>Cargo/Função *</Label><Input value={data.position || ''} onChange={(e) => u('position', e.target.value)} /></div>
                <div><Label>Código CBO</Label><Input value={data.cboCode || ''} onChange={(e) => u('cboCode', e.target.value)} /></div>
                <div className="col-span-2"><Label>Superior Imediato</Label><Input value={data.supervisor || ''} onChange={(e) => u('supervisor', e.target.value)} /></div>
              </div>
            </div>
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md mb-4">{error}</div>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
