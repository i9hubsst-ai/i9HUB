import { Building2, LayoutDashboard, BarChart3, FileText, Users, Bot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BarChart3, label: 'Diagnósticos', href: '/dashboard/diagnostics' },
    { icon: FileText, label: 'Planos de Ação', href: '/dashboard/actions' },
    { icon: Users, label: 'Usuários', href: '/dashboard/users' },
    { icon: Building2, label: 'Empresas', href: '/dashboard/companies' },
  ]

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-primary-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/dashboard" className="flex items-center gap-3">
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

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-colors">
            <Bot className="h-5 w-5" />
            <span className="font-medium">Assistente IA</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
