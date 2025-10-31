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
  Settings
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { AIChatButton } from '@/components/dashboard/ai-assistant-button'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart3, label: 'Diagnósticos', href: '/dashboard/diagnostics' },
  { icon: ShieldCheck, label: 'ComplianceSST', href: '/dashboard/compliance' },
  { icon: ClipboardList, label: 'PGRsys', href: '/dashboard/pgrsys' },
  { icon: HardHat, label: 'EPIManager', href: '/dashboard/epimanager' },
  { icon: AlertTriangle, label: 'RiscoEngage', href: '/dashboard/risco' },
  { icon: Building, label: 'ObraEngage', href: '/dashboard/obra' },
  { icon: FileText, label: 'Planos de Ação', href: '/dashboard/actions' },
  { icon: Search, label: 'InspecEngage', href: '/dashboard/inspec' },
  { icon: BarChart, label: 'RelatEngage', href: '/dashboard/relatorios' },
  { icon: GraduationCap, label: 'SSTLearnEngage', href: '/dashboard/learn' },
  { icon: Layers, label: 'Templates', href: '/dashboard/templates' },
  { icon: Building2, label: 'Empresas', href: '/dashboard/companies' },
  { icon: Users, label: 'Usuários', href: '/dashboard/users' },
  { icon: UserCog, label: 'Funcionários', href: '/dashboard/employees' },
  { icon: Bot, label: 'Gestão de IA', href: '/dashboard/ai-management', adminOnly: true },
  { icon: Settings, label: 'Configurações', href: '/dashboard/configuracoes' },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Verificar se usuário é admin
    fetch('/api/auth/check-admin')
      .then(res => res.json())
      .then(data => setIsAdmin(data.isAdmin))
      .catch(() => setIsAdmin(false))
  }, [])

  const visibleMenuItems = menuItems.filter(item => 
    !item.adminOnly || (item.adminOnly && isAdmin)
  )

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
      <nav className="flex-1 p-4 space-y-2">
        {visibleMenuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors"
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* AI Chat Button */}
      <div className="p-4 border-t border-sidebar-border">
        <AIChatButton />
      </div>
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