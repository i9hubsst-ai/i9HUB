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
  Palette,
  BookOpen
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

function MenuItemComponent({ item, onLinkClick, level = 0, isCollapsed = false }: { item: MenuItem, onLinkClick?: () => void, level?: number, isCollapsed?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = item.icon
  const hasChildren = item.children && item.children.length > 0
  const iconWidth = 16 // Largura fixa para alinhamento
  const paddingLeft = level === 0 ? 12 : (level * 12 + 12)

  if (hasChildren) {
    // Se o item tem href E children, renderiza o link + botão de expandir
    if (item.href) {
      return (
        <div>
          <div className="flex items-center gap-1">
            <Link
              href={item.href}
              onClick={onLinkClick}
              className={`flex-1 flex items-center gap-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sm`}
              style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '4px' }}
              title={isCollapsed ? item.label : undefined}
            >
              <div className="flex items-center justify-center" style={{ width: `${iconWidth}px` }}>
                <Icon className="h-4 w-4 flex-shrink-0" />
              </div>
              {!isCollapsed && <span className="flex-1">{item.label}</span>}
            </Link>
            {!isCollapsed && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
              >
                {isOpen ? 
                  <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" /> : 
                  <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                }
              </button>
            )}
          </div>
          {isOpen && (
            <div className="space-y-0.5">
              {item.children?.map((child, index) => (
                <MenuItemComponent 
                  key={index} 
                  item={child} 
                  onLinkClick={onLinkClick} 
                  level={level + 1}
                  isCollapsed={isCollapsed}
                />
              ))}
            </div>
          )}
        </div>
      )
    }
    
    // Se tem apenas children (sem href), usa o comportamento original
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={`w-full flex items-center gap-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-left text-sm`}
            style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '12px' }}
          >
            <div className="flex items-center justify-center" style={{ width: `${iconWidth}px` }}>
              <Icon className="h-4 w-4 flex-shrink-0" />
            </div>
            {!isCollapsed && <span className="flex-1">{item.label}</span>}
            {!isCollapsed && (isOpen ? 
              <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" /> : 
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-0.5">
          {item.children?.map((child, index) => (
            <MenuItemComponent 
              key={index} 
              item={child} 
              onLinkClick={onLinkClick} 
              level={level + 1}
              isCollapsed={isCollapsed}
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
        className={`flex items-center gap-2 py-2 rounded-lg hover:bg-sidebar-accent transition-colors text-sm`}
        style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '12px' }}
        title={isCollapsed ? item.label : undefined}
      >
        <div className="flex items-center justify-center" style={{ width: `${iconWidth}px` }}>
          <Icon className="h-4 w-4 flex-shrink-0" />
        </div>
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    )
  }

  return null
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
      <div className={`py-4 border-b border-sidebar-border ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <Link href="/dashboard" className="flex items-center gap-2 justify-center" onClick={onLinkClick}>
          <Image
            src="/images/hubsst-logo.png"
            alt="HUBSST"
            width={32}
            height={32}
            className="brightness-0 invert"
          />
          {!isCollapsed && <span className="font-bold text-lg">HUBSST</span>}
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