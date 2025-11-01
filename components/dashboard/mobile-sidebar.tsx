'use client'

import { 
  Building2, 
  LayoutDashboard, 
  BarChart3, 
  FileText, 
  Users, 
  Bot, 
  UserCog, 
  Layers, 
  Menu, 
  X,
  ShieldCheck,
  ClipboardList,
  HardHat,
  AlertTriangle,
  Building,
  Search,
  GraduationCap,
  Target,
  BarChart,
  Settings,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  FileCheck,
  Calendar,
  TrendingUp,
  Wrench,
  MapPin,
  Camera,
  Clipboard,
  Eye,
  Gauge,
  Download,
  Award,
  Database,
  Bell,
  Activity,
  Palette
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface MenuItem {
  icon: any
  label: string
  href?: string
  adminOnly?: boolean
  children?: MenuItem[]
}

const menuStructure: MenuItem[] = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    href: '/dashboard' 
  },
  {
    icon: Eye,
    label: 'Visão Geral',
    href: '/dashboard/overview'
  },
  {
    icon: BarChart3,
    label: 'Diagnósticos',
    children: [
      { icon: FileText, label: 'Novo Diagnóstico', href: '/dashboard/diagnostics/new' },
      { icon: FileCheck, label: 'Histórico de Diagnósticos', href: '/dashboard/diagnostics' },
      { icon: BarChart, label: 'Relatórios de Diagnóstico', href: '/dashboard/diagnostics/reports' },
      { icon: Layers, label: 'Modelos de Diagnóstico', href: '/dashboard/diagnostics/templates' }
    ]
  },
  {
    icon: ShieldCheck,
    label: 'Gerenciamento de Riscos',
    children: [
      { icon: AlertTriangle, label: 'Cadastro e Avaliação de Riscos', href: '/dashboard/risks/assessment' },
      { icon: Database, label: 'Base de Agentes (Físicos/Químicos/Biológicos)', href: '/dashboard/risks/agents' },
      { icon: Layers, label: 'Medidas de Prevenção e Controles', href: '/dashboard/risks/prevention' },
      { icon: Target, label: 'Planos de Mitigação', href: '/dashboard/risks/mitigation' },
      { icon: FileText, label: 'Documentos Técnicos (PGR, PCMSO, PCMAT)', href: '/dashboard/risks/documents' },
      { icon: Clipboard, label: 'Registros de Inspeções e Incidentes', href: '/dashboard/risks/inspections' },
      { icon: Layers, label: 'Modelos de PGR e Documentos', href: '/dashboard/risks/templates' }
    ]
  },
  {
    icon: HardHat,
    label: 'Gestão de EPIs',
    children: [
      { icon: Database, label: 'Catálogo de EPIs e Fornecedores', href: '/dashboard/epi/catalog' },
      { icon: FileCheck, label: 'Entregas e Devoluções', href: '/dashboard/epi/delivery' },
      { icon: Calendar, label: 'Controle de CA e Validade', href: '/dashboard/epi/control' },
      { icon: Bell, label: 'Alertas e Reposição', href: '/dashboard/epi/alerts' },
      { icon: FileText, label: 'Termos de Recebimento', href: '/dashboard/epi/terms' },
      { icon: Layers, label: 'Modelos de Documentos de EPI', href: '/dashboard/epi/templates' }
    ]
  },
  {
    icon: TrendingUp,
    label: 'Gestão de Riscos',
    children: [
      { icon: Gauge, label: 'Matriz de Riscos', href: '/dashboard/risk-management/matrix' },
      { icon: Target, label: 'Classificação e Priorização', href: '/dashboard/risk-management/classification' },
      { icon: TrendingUp, label: 'Exposição e Tendências', href: '/dashboard/risk-management/trends' },
      { icon: BarChart, label: 'Relatórios de Risco', href: '/dashboard/risk-management/reports' }
    ]
  },
  {
    icon: Building,
    label: 'Gestão de Obras',
    children: [
      { icon: MapPin, label: 'Planejamento de Obras e Frentes', href: '/dashboard/construction/planning' },
      { icon: FileCheck, label: 'Permissões de Trabalho (PT)', href: '/dashboard/construction/permits' },
      { icon: ClipboardList, label: 'Checklists (Andaimes/Escadas/Linhas)', href: '/dashboard/construction/checklists' },
      { icon: Users, label: 'Integração de Terceiros', href: '/dashboard/construction/integration' },
      { icon: Camera, label: 'Registros Fotográficos e Relatórios', href: '/dashboard/construction/reports' },
      { icon: Layers, label: 'Modelos de Relatórios de Obra', href: '/dashboard/construction/templates' }
    ]
  },
  {
    icon: Target,
    label: 'Planos de Ação',
    children: [
      { icon: Target, label: 'Minhas Ações', href: '/dashboard/actions/my' },
      { icon: FileText, label: 'Todas as Ações', href: '/dashboard/actions' },
      { icon: Bell, label: 'Alertas e Prazos', href: '/dashboard/actions/alerts' },
      { icon: Calendar, label: 'Cronogramas e Status', href: '/dashboard/actions/schedule' }
    ]
  },
  {
    icon: Search,
    label: 'Inspeções e Medições',
    children: [
      { icon: ClipboardList, label: 'Checklists', href: '/dashboard/inspections/checklists' },
      { icon: Eye, label: 'Inspeções em Campo', href: '/dashboard/inspections/field' },
      { icon: Gauge, label: 'Medições Ambientais e Ocupacionais', href: '/dashboard/inspections/measurements' },
      { icon: AlertTriangle, label: 'Não Conformidades', href: '/dashboard/inspections/non-compliance' },
      { icon: BarChart, label: 'Relatórios de Inspeção', href: '/dashboard/inspections/reports' },
      { icon: Layers, label: 'Modelos de Checklists e Relatórios', href: '/dashboard/inspections/templates' }
    ]
  },
  {
    icon: BarChart,
    label: 'Relatórios',
    children: [
      { icon: Gauge, label: 'Painéis e Indicadores', href: '/dashboard/reports/dashboards' },
      { icon: FileText, label: 'Relatórios Técnicos', href: '/dashboard/reports/technical' },
      { icon: Download, label: 'Exportações (PDF/Excel)', href: '/dashboard/reports/exports' },
      { icon: TrendingUp, label: 'Comparativos de Desempenho', href: '/dashboard/reports/performance' }
    ]
  },
  {
    icon: GraduationCap,
    label: 'Treinamentos',
    children: [
      { icon: GraduationCap, label: 'Cursos', href: '/dashboard/training/courses' },
      { icon: Target, label: 'Trilhas', href: '/dashboard/training/tracks' },
      { icon: Award, label: 'Certificações', href: '/dashboard/training/certifications' },
      { icon: Calendar, label: 'Reciclagens', href: '/dashboard/training/refresher' },
      { icon: Layers, label: 'Modelos de Certificados', href: '/dashboard/training/templates' }
    ]
  },
  {
    icon: Database,
    label: 'Cadastros',
    children: [
      { icon: Building2, label: 'Empresas', href: '/dashboard/companies' },
      { icon: Users, label: 'Usuários', href: '/dashboard/users' },
      { icon: Users, label: 'Clientes', href: '/dashboard/clients' },
      { icon: UserCog, label: 'Funcionários', href: '/dashboard/employees' },
      { icon: MapPin, label: 'Áreas e Setores', href: '/dashboard/areas' },
      { icon: Wrench, label: 'Cargos e Funções', href: '/dashboard/positions' },
      { icon: Building2, label: 'Fornecedores', href: '/dashboard/suppliers' },
      { icon: Wrench, label: 'Equipamentos e Máquinas', href: '/dashboard/equipment' },
      { icon: AlertTriangle, label: 'Agentes de Risco', href: '/dashboard/risk-agents' },
      { icon: HardHat, label: 'EPIs (Catálogo Base)', href: '/dashboard/epi-catalog' },
      { icon: FileText, label: 'Tabelas de Normas e NRs', href: '/dashboard/standards' }
    ]
  },
  {
    icon: Settings,
    label: 'Configurações',
    children: [
      { icon: Palette, label: 'Aparência e Identidade Visual', href: '/dashboard/settings/appearance' },
      { icon: Users, label: 'Papéis e Permissões', href: '/dashboard/settings/roles' },
      { icon: Bot, label: 'Integrações', href: '/dashboard/settings/integrations' },
      { icon: Bell, label: 'Notificações e Alertas', href: '/dashboard/settings/notifications' },
      { icon: Activity, label: 'Logs de Atividade', href: '/dashboard/settings/logs' },
      { icon: Bot, label: 'Gestão de IA', href: '/dashboard/ai-management', adminOnly: true }
    ]
  }
]

function MenuItemComponent({ item, onLinkClick, level = 0 }: { item: MenuItem, onLinkClick?: () => void, level?: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  const paddingLeft = level * 12 + 16 // Indentação baseada no nível

  if (hasChildren) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors text-left`}
            style={{ paddingLeft: `${paddingLeft}px` }}
          >
            <Icon className="h-5 w-5 flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {isOpen ? 
              <ChevronDown className="h-4 w-4 flex-shrink-0" /> : 
              <ChevronRight className="h-4 w-4 flex-shrink-0" />
            }
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1">
          {item.children?.map((child, index) => (
            <MenuItemComponent 
              key={index} 
              item={child} 
              onLinkClick={onLinkClick} 
              level={level + 1}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={onLinkClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors`}
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span>{item.label}</span>
      </Link>
    )
  }

  return null
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se usuário é admin
    fetch('/api/auth/check-admin')
      .then(res => res.json())
      .then(data => {
        setIsAdmin(data.isAdmin)
        setIsLoading(false)
      })
      .catch(() => {
        setIsAdmin(false)
        setIsLoading(false)
      })
  }, [])

  // Renderizar item apenas se não for adminOnly OU se for admin
  const shouldShowItem = (item: MenuItem) => {
    return !item.adminOnly || isAdmin
  }

  // Filtrar recursivamente mantendo estrutura
  const visibleMenuItems = menuStructure.map(item => {
    if (item.children) {
      return {
        ...item,
        children: item.children.filter(shouldShowItem)
      }
    }
    return item
  }).filter(shouldShowItem)

  return (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={onLinkClick}>
          <Image
            src="/images/hubsst-logo.png"
            alt="HUBSST"
            width={40}
            height={40}
            className="brightness-0 invert"
          />
          <span className="font-bold text-xl">HUBSST</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {visibleMenuItems.map((item, index) => (
          <MenuItemComponent 
            key={index} 
            item={item} 
            onLinkClick={onLinkClick}
          />
        ))}
      </nav>
    </>
  )
}

export function DesktopSidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-sidebar text-sidebar-foreground flex-col">
      <SidebarContent />
    </aside>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground">
          <div className="flex flex-col h-full">
            <SidebarContent onLinkClick={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}