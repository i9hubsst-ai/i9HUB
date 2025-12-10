import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  User, 
  ArrowLeft, 
  Edit, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  MapPin, 
  IdCard,
  UserCheck,
  Clock,
  Shield
} from 'lucide-react'
import { getEmployeeById } from '@/app/actions/employees'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { EmployeeActions } from '@/components/dashboard/employee-actions'

export const dynamic = 'force-dynamic'

export default async function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getEmployeeById(id)

  if (result.error || !result.employee) {
    notFound()
  }

  const employee = result.employee

  // Format data
  const formatCPF = (cpf: string) => cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  const formatPhone = (phone: string) => {
    if (phone.length === 11) return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  const contractTypeLabels: Record<string, string> = {
    CLT: 'CLT',
    INTERN: 'Estágio',
    OUTSOURCED: 'Terceirizado',
    TEMPORARY: 'Temporário',
    AUTONOMOUS: 'Autônomo',
  }

  const genderLabels: Record<string, string> = {
    MALE: 'Masculino',
    FEMALE: 'Feminino',
    OTHER: 'Outro',
  }

  const maritalStatusLabels: Record<string, string> = {
    SINGLE: 'Solteiro(a)',
    MARRIED: 'Casado(a)',
    DIVORCED: 'Divorciado(a)',
    WIDOWED: 'Viúvo(a)',
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Link href="/dashboard/employees">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Funcionários
          </Button>
        </Link>

        <div className="flex gap-2">
          <Link href={`/dashboard/employees/${id}/edit`}>
            <Button className="gap-2">
              <Edit className="h-4 w-4" />
              Editar Funcionário
            </Button>
          </Link>
          
          <EmployeeActions 
            employeeId={id}
            employeeName={employee.fullName}
            currentStatus={employee.status}
          />
        </div>
      </div>

      {/* Employee Header */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          {(employee as any).photo ? (
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src={(employee as any).photo}
                alt={employee.fullName}
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="bg-primary/10 p-4 rounded-lg">
              <User className="h-12 w-12 text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-primary">{employee.fullName}</h1>
            <Badge variant={employee.status === 'ACTIVE' ? 'default' : 'secondary'}>
              {employee.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{employee.position}</p>
          <p className="text-muted-foreground">Matrícula: {employee.employeeNumber}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Empresa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              <div className="text-sm font-semibold">{employee.company.name}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tipo de Contrato
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <div className="text-sm font-semibold">{contractTypeLabels[employee.contractType]}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data de Admissão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-primary" />
              <div className="text-sm font-semibold">
                {format(new Date(employee.admissionDate), 'dd/MM/yyyy', { locale: ptBR })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Departamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-primary" />
              <div className="text-sm font-semibold">{employee.department || 'Não informado'}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Identificação Civil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IdCard className="h-5 w-5" />
              Identificação Civil
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">CPF</p>
                <p className="font-medium">{formatCPF(employee.cpf)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                <p className="font-medium">
                  {format(new Date(employee.birthDate), 'dd/MM/yyyy', { locale: ptBR })}
                </p>
              </div>
              {employee.gender && (
                <div>
                  <p className="text-sm text-muted-foreground">Sexo</p>
                  <p className="font-medium">{genderLabels[employee.gender]}</p>
                </div>
              )}
              {employee.maritalStatus && (
                <div>
                  <p className="text-sm text-muted-foreground">Estado Civil</p>
                  <p className="font-medium">{maritalStatusLabels[employee.maritalStatus]}</p>
                </div>
              )}
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">Nacionalidade</p>
                <p className="font-medium">{employee.nationality}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">E-mail</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="font-medium">{employee.email}</p>
                </div>
              </div>
              {employee.phone && (
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{formatPhone(employee.phone)}</p>
                  </div>
                </div>
              )}
              {employee.emergencyContactName && (
                <>
                  <div className="border-t pt-3 mt-3">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">Contato de Emergência</p>
                    <div>
                      <p className="text-sm text-muted-foreground">Nome</p>
                      <p className="font-medium">{employee.emergencyContactName}</p>
                    </div>
                  </div>
                  {employee.emergencyContactPhone && (
                    <div>
                      <p className="text-sm text-muted-foreground">Telefone de Emergência</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{formatPhone(employee.emergencyContactPhone)}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Vínculo Trabalhista */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Vínculo Trabalhista
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Matrícula</p>
                <p className="font-medium">{employee.employeeNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Admissão</p>
                <p className="font-medium">
                  {format(new Date(employee.admissionDate), 'dd/MM/yyyy', { locale: ptBR })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Contrato</p>
                <p className="font-medium">{contractTypeLabels[employee.contractType]}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={employee.status === 'ACTIVE' ? 'default' : 'secondary'}>
                  {employee.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
              {employee.workSchedule && (
                <div>
                  <p className="text-sm text-muted-foreground">Jornada/Turno</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{employee.workSchedule}</p>
                  </div>
                </div>
              )}
              {employee.cboCode && (
                <div>
                  <p className="text-sm text-muted-foreground">Código CBO</p>
                  <p className="font-medium">{employee.cboCode}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Informações Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {employee.unit && (
                <div>
                  <p className="text-sm text-muted-foreground">Unidade/Obra</p>
                  <p className="font-medium">{employee.unit}</p>
                </div>
              )}
              {employee.department && (
                <div>
                  <p className="text-sm text-muted-foreground">Setor/Área</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Cargo/Função</p>
                <p className="font-medium">{employee.position}</p>
              </div>
              {employee.supervisor && (
                <div>
                  <p className="text-sm text-muted-foreground">Superior Imediato</p>
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{employee.supervisor}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Company Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Empresa Vinculada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">{employee.company.name}</p>
              <p className="text-sm text-muted-foreground">Vínculo empregatício ativo nesta empresa</p>
            </div>
            <Link href={`/dashboard/companies/${employee.companyId}`}>
              <Button variant="outline" size="sm">
                Ver Empresa
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
