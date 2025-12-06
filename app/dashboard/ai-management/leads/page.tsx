import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Users, 
  Search, 
  Download, 
  Mail, 
  Building, 
  Briefcase,
  Calendar,
  MessageSquare
} from 'lucide-react'

async function getLeads() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      company: true,
      cargo: true,
      cargoOutro: true,
      setor: true,
      setorOutro: true,
      tipoUso: true,
      segment: true,
      status: true,
      createdAt: true,
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  return leads
}

async function getLeadStats() {
  const [
    total,
    newLeads,
    activeLeads,
    bySegment
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // últimos 7 dias
        }
      }
    }),
    prisma.lead.count({
      where: {
        status: 'active'
      }
    }),
    prisma.lead.groupBy({
      by: ['segment'],
      _count: true,
      orderBy: {
        _count: {
          segment: 'desc'
        }
      },
      take: 5
    })
  ])

  return {
    total,
    newLeads,
    activeLeads,
    bySegment
  }
}

export default async function LeadsManagementPage() {
  const leads = await getLeads()
  const stats = await getLeadStats()

  const cargoLabels: Record<string, string> = {
    'engenheiro_seguranca': 'Engenheiro de Segurança',
    'tecnico_seguranca': 'Técnico de Segurança',
    'gestor_sst_rh': 'Gestor de SST / RH',
    'consultor_autonomo': 'Consultor / Autônomo',
    'empresario_diretor': 'Empresário / Diretor',
    'outro': 'Outro'
  }

  const setorLabels: Record<string, string> = {
    'industria': 'Indústria',
    'construcao_civil': 'Construção Civil',
    'servicos': 'Serviços',
    'transporte_logistica': 'Transporte e Logística',
    'energia': 'Energia / Utilities',
    'saude': 'Saúde',
    'outro': 'Outro'
  }

  const statusLabels: Record<string, { label: string, color: string }> = {
    'new': { label: 'Novo', color: 'bg-blue-100 text-blue-800' },
    'active': { label: 'Ativo', color: 'bg-green-100 text-green-800' },
    'inactive': { label: 'Inativo', color: 'bg-gray-100 text-gray-800' },
    'converted': { label: 'Convertido', color: 'bg-purple-100 text-purple-800' }
  }

  return (
    <div className="space-y-6">
      {/* Header com Estatísticas */}
      <div>
        <h2 className="text-2xl font-bold">Gestão de Leads</h2>
        <p className="text-muted-foreground">
          Visualize e gerencie todos os leads cadastrados no MA.IA
        </p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Todos os cadastros
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos (7 dias)</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newLeads}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 7 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLeads}</div>
            <p className="text-xs text-muted-foreground">
              Usando o chat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Segmento Principal</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.bySegment[0]?._count || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.bySegment[0]?.segment || 'N/A'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, email ou empresa..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar CSV
        </Button>
      </div>

      {/* Tabela de Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Leads</CardTitle>
          <CardDescription>
            Lista completa de cadastros no MA.IA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Cargo/Setor</TableHead>
                <TableHead>Tipo de Uso</TableHead>
                <TableHead className="text-center">Mensagens</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {lead.email}
                      </div>
                      {lead.phone && (
                        <div className="text-muted-foreground">{lead.phone}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {lead.company && (
                      <div className="flex items-center gap-1 text-sm">
                        <Building className="w-3 h-3 text-muted-foreground" />
                        {lead.company}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <div>{lead.cargoOutro || cargoLabels[lead.cargo || ''] || '-'}</div>
                      <div className="text-muted-foreground">
                        {lead.setorOutro || setorLabels[lead.setor || ''] || '-'}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {lead.tipoUso?.replace('_', ' ') || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary">
                      {lead._count.messages}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={statusLabels[lead.status || 'new'].color}
                    >
                      {statusLabels[lead.status || 'new'].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
