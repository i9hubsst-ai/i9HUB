import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Users, Calendar, FileText, ArrowLeft } from 'lucide-react'
import { getCompanyById } from '@/app/actions/companies'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function CompanyDetailPage({ params }: { params: { id: string } }) {
  const result = await getCompanyById(params.id)

  if (result.error || !result.company) {
    notFound()
  }

  const company = result.company

  return (
    <div className="p-8 space-y-6">
      <Link href="/dashboard/companies">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Empresas
        </Button>
      </Link>

      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-4 rounded-lg">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">{company.name}</h1>
          <p className="text-muted-foreground">CNPJ: {company.cnpj}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary" />
              <div className="text-3xl font-bold">{company._count.memberships}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Diagnósticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-primary" />
              <div className="text-3xl font-bold">{company._count.assessments}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Planos de Ação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div className="text-3xl font-bold">{company._count.actionPlans}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Diagnósticos Recentes</CardTitle>
            <CardDescription>Últimos 5 diagnósticos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            {company.assessments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum diagnóstico realizado ainda</p>
            ) : (
              <ul className="space-y-3">
                {company.assessments.map((assessment) => (
                  <li key={assessment.id} className="border-b pb-2 last:border-0">
                    <div className="font-medium">{assessment.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Status: {assessment.status} • {new Date(assessment.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Membros da Equipe</CardTitle>
            <CardDescription>Usuários com acesso à empresa</CardDescription>
          </CardHeader>
          <CardContent>
            {company.memberships.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum membro cadastrado ainda</p>
            ) : (
              <ul className="space-y-3">
                {company.memberships.map((membership) => (
                  <li key={membership.id} className="border-b pb-2 last:border-0">
                    <div className="font-medium">{membership.userId}</div>
                    <div className="text-sm text-muted-foreground">
                      {membership.role} • {membership.status}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
