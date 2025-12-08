import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { 
  Building2, 
  Users, 
  UserCog, 
  MapPin, 
  Wrench, 
  AlertTriangle, 
  HardHat, 
  FileText,
  ArrowRight,
  ListChecks
} from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

interface CadastroCard {
  title: string
  description: string
  icon: any
  href: string
  color: string
  adminOnly?: boolean
}

const cadastrosConfig: CadastroCard[] = [
  {
    title: 'Gestão de Usuários',
    description: 'Gerenciar usuários do sistema e suas permissões',
    icon: Users,
    href: '/dashboard/users',
    color: 'text-blue-600 bg-blue-100',
    adminOnly: true
  },
  {
    title: 'Gestão de Funcionários',
    description: 'Cadastro e gerenciamento de funcionários',
    icon: UserCog,
    href: '/dashboard/employees',
    color: 'text-green-600 bg-green-100'
  },
  {
    title: 'Gestão de Empresas',
    description: 'Cadastro e gerenciamento de empresas',
    icon: Building2,
    href: '/dashboard/companies',
    color: 'text-purple-600 bg-purple-100',
    adminOnly: true
  },
  {
    title: 'CNAEs',
    description: 'Gerenciar códigos CNAE e graus de risco',
    icon: ListChecks,
    href: '/dashboard/cadastros/cnaes',
    color: 'text-blue-600 bg-blue-100',
    adminOnly: true
  },
  {
    title: 'Clientes',
    description: 'Gerenciar clientes e contratos',
    icon: Users,
    href: '/dashboard/clients',
    color: 'text-orange-600 bg-orange-100'
  },
  {
    title: 'Áreas e Setores',
    description: 'Cadastro de áreas e setores da empresa',
    icon: MapPin,
    href: '/dashboard/areas',
    color: 'text-cyan-600 bg-cyan-100'
  },
  {
    title: 'Cargos e Funções',
    description: 'Definir cargos e funções dos colaboradores',
    icon: Wrench,
    href: '/dashboard/positions',
    color: 'text-indigo-600 bg-indigo-100'
  },
  {
    title: 'Fornecedores',
    description: 'Cadastro de fornecedores de EPIs e serviços',
    icon: Building2,
    href: '/dashboard/suppliers',
    color: 'text-teal-600 bg-teal-100'
  },
  {
    title: 'Equipamentos e Máquinas',
    description: 'Cadastro de equipamentos e máquinas',
    icon: Wrench,
    href: '/dashboard/equipment',
    color: 'text-amber-600 bg-amber-100'
  },
  {
    title: 'Agentes de Risco',
    description: 'Cadastro de agentes físicos, químicos e biológicos',
    icon: AlertTriangle,
    href: '/dashboard/risk-agents',
    color: 'text-red-600 bg-red-100'
  },
  {
    title: 'EPIs (Catálogo Base)',
    description: 'Catálogo base de EPIs disponíveis',
    icon: HardHat,
    href: '/dashboard/epi-catalog',
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    title: 'Tabelas de Normas e NRs',
    description: 'Gerenciar normas regulamentadoras',
    icon: FileText,
    href: '/dashboard/standards',
    color: 'text-slate-600 bg-slate-100'
  }
]

export default async function CadastrosPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const isAdmin = await isPlatformAdmin(user.id)

  // Filtrar cadastros baseado em permissões
  const visibleCadastros = cadastrosConfig.filter(cadastro => {
    if (cadastro.adminOnly && !isAdmin) {
      return false
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Cadastros</h1>
        <p className="text-muted-foreground">
          Gerencie todos os cadastros do sistema de forma centralizada
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCadastros.map((cadastro) => {
          const Icon = cadastro.icon
          return (
            <Link key={cadastro.href} href={cadastro.href}>
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${cadastro.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <CardTitle className="text-lg mt-4">{cadastro.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {cadastro.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <FileText className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Sobre os Cadastros</h3>
            <p className="text-sm text-muted-foreground">
              Os cadastros são a base do sistema. Mantenha-os atualizados para garantir 
              relatórios precisos e conformidade com as normas de SST.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
