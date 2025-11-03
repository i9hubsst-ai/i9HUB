import { getCurrentUser, getUserDisplayRole, isPlatformAdmin } from '@/lib/auth'
import { UserNav } from '@/components/dashboard/user-nav'
import { ChatbotDialog } from '@/components/dashboard/chatbot-dialog'
import { redirect } from 'next/navigation'
import { MobileSidebar, DesktopSidebar } from '@/components/dashboard/mobile-sidebar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  const userRole = await getUserDisplayRole(user.id)
  const isAdmin = await isPlatformAdmin(user.id)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content - com padding left para não ficar sob o sidebar */}
      <div className="md:pl-16">
        <main className="flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6">
            {/* Mobile menu button */}
            <MobileSidebar />
            
            {/* Desktop logo/title - hidden on mobile */}
            <div className="hidden md:block">
              {/* Empty space for consistency */}
            </div>
            
            {/* Header buttons and user nav */}
            <div className="flex items-center gap-3">
              <UserNav 
                user={{ 
                  email: user.email!, 
                  name: user.user_metadata?.name,
                  role: userRole.label,
                  avatar_url: user.user_metadata?.avatar_url || null
                }}
                isAdmin={isAdmin}
              />
            </div>
          </header>
        
          {/* Page Content */}
          <div className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </div>
        </main>
        
        {/* Chatbot flutuante */}
        <ChatbotDialog />
      </div>
    </div>
  )
}
