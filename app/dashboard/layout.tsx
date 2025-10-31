import { getCurrentUser, getUserDisplayRole } from '@/lib/auth'
import { UserNav } from '@/components/dashboard/user-nav'
import { ChatbotDialog } from '@/components/dashboard/chatbot-dialog'
import { MAIAHeaderButton } from '@/components/dashboard/maia-header-button'
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

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
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
            <MAIAHeaderButton />
            <UserNav user={{ 
              email: user.email!, 
              name: user.user_metadata?.name,
              role: userRole.label 
            }} />
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
  )
}
