import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Plus, Users, Calendar, FileText } from 'lucide-react'
import { getCompanies } from '@/app/actions/companies'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function CompaniesPage() {
  const result = await getCompanies()

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

  const companies = result.companies || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Empresas</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as empresas cadastradas no sistema
          </p>
        </div>
        <Link href="/dashboard/companies/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Empresa
          </Button>
        </Link>
      </div>

      {companies.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma empresa encontrada</CardTitle>
            <CardDescription>
              Comece criando sua primeira empresa no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/companies/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira Empresa
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base truncate">{company.name}</CardTitle>
                    <CardDescription className="text-xs">CNPJ: {company.cnpj}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Users className="h-3 w-3" />
                      <span className="text-xs">Usuários</span>
                    </div>
                    <div className="font-semibold text-sm">{company._count.memberships}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Calendar className="h-3 w-3" />
                      <span className="text-xs">Diagnósticos</span>
                    </div>
                    <div className="font-semibold text-sm">{company._count.assessments}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <FileText className="h-3 w-3" />
                      <span className="text-xs">Ações</span>
                    </div>
                    <div className="font-semibold text-sm">{company._count.actionPlans}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/dashboard/companies/${company.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs">
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
