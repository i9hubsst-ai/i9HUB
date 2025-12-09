'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { updateEmployee } from '@/app/actions/employees'
import { validateCPF, formatCPF, formatPhone } from '@/lib/utils/validators'
import { EmployeePhotoUpload } from './employee-photo-upload'

interface EmployeeEditFormProps {
  employee: any
  companies: any[]
}

export function EmployeeEditForm({ employee, companies }: EmployeeEditFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return ''
    if (typeof date === 'string') return date.split('T')[0]
    if (date instanceof Date) return date.toISOString().split('T')[0]
    return ''
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    const data = {
      companyId: formData.get('companyId') as string,
      fullName: formData.get('fullName') as string,
      cpf: (formData.get('cpf') as string).replace(/\D/g, ''),
      birthDate: formData.get('birthDate') as string,
      gender: (formData.get('gender') as string) || undefined,
      maritalStatus: (formData.get('maritalStatus') as string) || undefined,
      nationality: formData.get('nationality') as string || 'Brasileira',
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || undefined,
      emergencyContactName: formData.get('emergencyContactName') as string || undefined,
      emergencyContactPhone: formData.get('emergencyContactPhone') as string || undefined,
      employeeNumber: formData.get('employeeNumber') as string,
      admissionDate: formData.get('admissionDate') as string,
      contractType: formData.get('contractType') as string,
      workSchedule: formData.get('workSchedule') as string || undefined,
      unit: formData.get('unit') as string || undefined,
      department: formData.get('department') as string || undefined,
      position: formData.get('position') as string,
      cboCode: formData.get('cboCode') as string || undefined,
      supervisor: formData.get('supervisor') as string || undefined,
      status: formData.get('status') as string || 'ACTIVE',
    } as any

    // Validate CPF
    if (!validateCPF(data.cpf)) {
      setError('CPF inválido')
      setIsSubmitting(false)
      return
    }

    try {
      const result = await updateEmployee(employee.id, data)
      
      if (result.error) {
        setError(result.error)
        setIsSubmitting(false)
        return
      }
      
      router.push(`/dashboard/employees/${employee.id}`)
      router.refresh()
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error)
      setError('Erro ao atualizar funcionário')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="identification" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="identification">Identificação</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="employment">Vínculo</TabsTrigger>
          <TabsTrigger value="photo">Foto</TabsTrigger>
          <TabsTrigger value="additional">Adicional</TabsTrigger>
        </TabsList>

        {/* Aba 1: Identificação Civil */}
        <TabsContent value="identification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identificação Civil</CardTitle>
              <CardDescription>Dados pessoais e documentos do funcionário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo *</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  defaultValue={employee.fullName}
                  className="bg-white h-11"
                  placeholder="Nome completo do funcionário"
                  required 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input 
                    id="cpf" 
                    name="cpf" 
                    defaultValue={formatCPF(employee.cpf)}
                    className="bg-white h-11"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input 
                    id="birthDate" 
                    name="birthDate" 
                    type="date"
                    defaultValue={formatDate(employee.birthDate)}
                    className="bg-white h-11"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Sexo</Label>
                  <Select name="gender" defaultValue={employee.gender || ''}>
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select name="maritalStatus" defaultValue={employee.maritalStatus || ''}>
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

                <div className="space-y-2">
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <Input 
                    id="nationality" 
                    name="nationality" 
                    defaultValue={employee.nationality || 'Brasileira'}
                    className="bg-white h-11"
                    placeholder="Ex: Brasileira"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 2: Contato */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>Dados de comunicação e contatos de emergência</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    defaultValue={employee.email}
                    className="bg-white h-11"
                    placeholder="email@exemplo.com"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    defaultValue={employee.phone ? formatPhone(employee.phone) : ''}
                    className="bg-white h-11"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="border-t pt-5 mt-5">
                <h3 className="text-lg font-semibold mb-4">Contato de Emergência</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Nome do Contato</Label>
                    <Input 
                      id="emergencyContactName" 
                      name="emergencyContactName"
                      defaultValue={employee.emergencyContactName || ''}
                      className="bg-white h-11"
                      placeholder="Nome da pessoa de contato"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactPhone">Telefone de Emergência</Label>
                    <Input 
                      id="emergencyContactPhone" 
                      name="emergencyContactPhone"
                      defaultValue={employee.emergencyContactPhone ? formatPhone(employee.emergencyContactPhone) : ''}
                      className="bg-white h-11"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 3: Vínculo Trabalhista */}
        <TabsContent value="employment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vínculo Trabalhista</CardTitle>
              <CardDescription>Informações contratuais e organizacionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="companyId">Empresa *</Label>
                <Select name="companyId" defaultValue={employee.companyId} disabled>
                  <SelectTrigger className="bg-muted h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  A empresa não pode ser alterada após o cadastro
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="employeeNumber">Matrícula *</Label>
                  <Input 
                    id="employeeNumber" 
                    name="employeeNumber"
                    defaultValue={employee.employeeNumber}
                    className="bg-white h-11"
                    placeholder="Número da matrícula"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admissionDate">Data de Admissão *</Label>
                  <Input 
                    id="admissionDate" 
                    name="admissionDate" 
                    type="date"
                    defaultValue={formatDate(employee.admissionDate)}
                    className="bg-white h-11"
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select name="status" defaultValue={employee.status || 'ACTIVE'}>
                    <SelectTrigger className="bg-white h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Ativo</SelectItem>
                      <SelectItem value="INACTIVE">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="contractType">Tipo de Contrato *</Label>
                  <Select name="contractType" defaultValue={employee.contractType} required>
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
                  <Label htmlFor="position">Cargo/Função *</Label>
                  <Input 
                    id="position" 
                    name="position"
                    defaultValue={employee.position}
                    className="bg-white h-11"
                    placeholder="Cargo do funcionário"
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="department">Setor/Área</Label>
                  <Input 
                    id="department" 
                    name="department"
                    defaultValue={employee.department || ''}
                    className="bg-white h-11"
                    placeholder="Departamento"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unidade/Obra</Label>
                  <Input 
                    id="unit" 
                    name="unit"
                    defaultValue={employee.unit || ''}
                    className="bg-white h-11"
                    placeholder="Local de trabalho"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workSchedule">Jornada/Turno</Label>
                  <Input 
                    id="workSchedule" 
                    name="workSchedule"
                    defaultValue={employee.workSchedule || ''}
                    className="bg-white h-11"
                    placeholder="Ex: 08:00-17:00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 4: Foto */}
        <TabsContent value="photo" className="space-y-4">
          <EmployeePhotoUpload 
            employeeId={employee.id}
            currentPhoto={employee.photo}
            employeeName={employee.fullName}
          />
        </TabsContent>

        {/* Aba 5: Informações Adicionais */}
        <TabsContent value="additional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>Dados complementares do funcionário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="cboCode">Código CBO</Label>
                  <Input 
                    id="cboCode" 
                    name="cboCode"
                    defaultValue={employee.cboCode || ''}
                    className="bg-white h-11"
                    placeholder="Código CBO"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supervisor">Superior Imediato</Label>
                  <Input 
                    id="supervisor" 
                    name="supervisor"
                    defaultValue={employee.supervisor || ''}
                    className="bg-white h-11"
                    placeholder="Nome do supervisor"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  )
}
