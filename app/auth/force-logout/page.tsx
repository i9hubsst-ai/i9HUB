'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ForceLogoutPage() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      
      // Fazer logout no Supabase
      await supabase.auth.signOut()
      
      // Limpar localStorage/sessionStorage
      localStorage.clear()
      sessionStorage.clear()
      
      // Aguardar um pouco e redirecionar
      setTimeout(() => {
        window.location.href = '/auth/login'
      }, 500)
      
    } catch (error) {
      console.error('Erro no logout:', error)
      // Forçar redirect mesmo com erro
      window.location.href = '/auth/login'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Logout do Sistema</CardTitle>
          <CardDescription>
            Clique no botão abaixo para sair do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Sair do Sistema
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}