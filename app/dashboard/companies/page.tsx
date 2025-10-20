import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, Plus, Users, Calendar } from 'lucide-react'

export default function CompaniesPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Empresas</h1>
          <p className="text-muted-foreground">
            Gerencie as empresas cadastradas no sistema
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      {/* Companies Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Demo Companies from Seed Data */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>TechSafety Indústria Ltda</CardTitle>
                  <CardDescription>CNPJ: 12.345.678/0001-90</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Usuários</span>
                </div>
                <div className="font-semibold">0</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Diagnósticos</span>
                </div>
                <div className="font-semibold">0</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Gerenciar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>SafeWork Serviços e Consultoria</CardTitle>
                  <CardDescription>CNPJ: 98.765.432/0001-10</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Usuários</span>
                </div>
                <div className="font-semibold">0</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Diagnósticos</span>
                </div>
                <div className="font-semibold">0</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Gerenciar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-800">ℹ️ Sobre as Empresas</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-700 space-y-2">
          <p>
            As empresas acima foram criadas automaticamente pelo script de seed. Execute <code className="bg-blue-100 px-2 py-0.5 rounded">npm run seed</code> para popular o banco com dados de demonstração.
          </p>
          <p>
            <strong>Próximos passos:</strong>
          </p>
          <ul className="list-disc list-inside ml-2 space-y-1">
            <li>Configure as credenciais do Supabase para autenticação</li>
            <li>Crie usuários e associe-os às empresas</li>
            <li>Defina permissões por papel (PlatformAdmin, CompanyAdmin, etc.)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
