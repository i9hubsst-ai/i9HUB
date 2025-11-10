import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Users, Bot, Bell, Activity, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

type SettingsCard = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  href: string
  color: string
  badge?: string
}

const settingsCards: SettingsCard[] = [
  {
    icon: Palette,
    title: 'Aparência e Identidade Visual',
    description: 'Personalize cores, logo e identidade visual da plataforma',
    href: '/dashboard/settings/appearance',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    icon: Users,
    title: 'Papéis e Permissões',
    description: 'Gerencie usuários, funções e níveis de acesso',
    href: '/dashboard/settings/roles',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: Bot,
    title: 'Integrações',
    description: 'Conecte sistemas externos e APIs',
    href: '/dashboard/settings/integrations',
    color: 'text-green-600 bg-green-100'
  },
  {
    icon: Bell,
    title: 'Notificações e Alertas',
    description: 'Configure alertas, lembretes e notificações',
    href: '/dashboard/settings/notifications',
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    icon: Activity,
    title: 'Logs de Atividade',
    description: 'Visualize histórico e auditoria de ações',
    href: '/dashboard/settings/logs',
    color: 'text-orange-600 bg-orange-100'
  }
]

export default async function SettingsPage() {
  const user = await getCurrentUser()
  const isAdmin = user ? await isPlatformAdmin(user.id) : false

  // Adiciona Gestão de IA apenas para admins
  const cards = isAdmin 
    ? [
        ...settingsCards,
        {
          icon: Bot,
          title: 'Gestão de IA',
          description: 'Configure prompts, documentos e gerencie a inteligência artificial',
          href: '/dashboard/ai-management',
          color: 'text-indigo-600 bg-indigo-100',
          badge: 'Admin'
        }
      ]
    : settingsCards

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie todas as configurações e personalizações da plataforma
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.href} href={card.href}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${card.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {card.badge && (
                      <span className="px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-primary font-medium">
                    Acessar
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Informações Adicionais */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">💡 Dica</CardTitle>
          <CardDescription>
            As configurações permitem personalizar a plataforma de acordo com as necessidades da sua empresa.
            Algumas opções podem requerer permissões de administrador.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
