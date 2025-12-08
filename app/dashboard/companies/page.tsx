import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Plus, Users, Calendar, FileText } from 'lucide-react'
import { getCompanies } from '@/app/actions/companies'
import Link from 'next/link'
import Image from 'next/image'

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
        <div className="space-y-4">
          {companies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 p-4">
                {/* Logo ou ícone */}
                <div className="flex-shrink-0">
                  {company.logo ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                      <Image
                        src={company.logo}
                        alt={`Logo ${company.name}`}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base truncate">{company.name}</h3>
                  <p className="text-xs text-muted-foreground">CNPJ: {company.cnpj}</p>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Users className="h-3.5 w-3.5" />
                      <span className="text-xs">Usuários</span>
                    </div>
                    <div className="font-semibold text-sm">{company._count.memberships}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="text-xs">Diagnósticos</span>
                    </div>
                    <div className="font-semibold text-sm">{company._count.assessments}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="text-xs">Ações</span>
                    </div>
                    <div className="font-semibold text-sm">{company._count.actionPlans}</div>
                  </div>
                </div>
                <Link href={`/dashboard/companies/${company.id}`}>
                  <Button variant="outline" size="sm" className="h-9 px-4">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
