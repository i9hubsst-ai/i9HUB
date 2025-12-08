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
  Palette,
  BookOpen
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface MenuItem {
  icon: any
  label: string
  href: string
  adminOnly?: boolean
}

const menuStructure: MenuItem[] = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    href: '/dashboard' 
  },
  {
    icon: BarChart3,
    label: 'Diagnósticos',
    href: '/dashboard/diagnostics-module'
  },
  {
    icon: ShieldCheck,
    label: 'Gerenciamento de Riscos',
    href: '/dashboard/risk-management'
  },
  {
    icon: HardHat,
    label: 'Gestão de EPIs',
    href: '/dashboard/epi-management'
  },
  {
    icon: Building,
    label: 'Gestão de Obras',
    href: '/dashboard/construction-management'
  },
  {
    icon: Target,
    label: 'Planos de Ação',
    href: '/dashboard/action-plans-management'
  },
  {
    icon: Search,
    label: 'Inspeções e Medições',
    href: '/dashboard/inspections-management'
  },
  {
    icon: BarChart,
    label: 'Relatórios',
    href: '/dashboard/reports-management'
  },
  {
    icon: GraduationCap,
    label: 'Treinamentos',
    href: '/dashboard/training-management'
  },
  {
    icon: Database,
    label: 'Cadastros',
    href: '/dashboard/cadastros'
  },
  {
    icon: BookOpen,
    label: 'Biblioteca de Conhecimento',
    href: '/dashboard/knowledge-base'
  },
  {
    icon: Settings,
    label: 'Configurações',
    href: '/dashboard/settings'
  }
]

function MenuItemComponent({ 
  item, 
  onLinkClick, 
  isCollapsed = false 
}: { 
  item: MenuItem
  onLinkClick?: () => void
  isCollapsed?: boolean
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onLinkClick}
      className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-sidebar-accent transition-colors text-sm"
      title={isCollapsed ? item.label : undefined}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span 
        className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
          isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
        }`}
      >
        {item.label}
      </span>
    </Link>
  )
}

function SidebarContent({ onLinkClick, isCollapsed = false }: { onLinkClick?: () => void, isCollapsed?: boolean }) {
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

  // Filtrar itens visíveis
  const visibleMenuItems = menuStructure.filter(shouldShowItem)

  return (
    <>
      {/* Logo */}
      <div className={`py-4 border-b border-sidebar-border ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <Link href="/dashboard" className="flex items-center gap-2 justify-center" onClick={onLinkClick}>
          <Image
            src="/images/hubsst-logo.png"
            alt="HUBSST"
            width={32}
            height={32}
            className="brightness-0 invert"
          />
          <span 
            className={`font-bold text-lg whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}
          >
            HUBSST
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 space-y-0.5 overflow-y-auto ${isCollapsed ? 'p-2' : 'p-3'}`}>
        {visibleMenuItems.map((item, index) => (
          <MenuItemComponent 
            key={index} 
            item={item} 
            onLinkClick={onLinkClick}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
    </>
  )
}

export function DesktopSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <aside 
      className={`hidden md:flex fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground flex-col transition-all duration-300 z-50 border-r border-sidebar-border shadow-lg ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <SidebarContent isCollapsed={!isExpanded} />
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