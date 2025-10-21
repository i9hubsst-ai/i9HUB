import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle } from 'lucide-react'

async function setupFirstAdmin() {
  'use server'
  
  const user = await getCurrentUser()
  if (!user) {
    redirect('/auth/login')
  }

  try {
    // Verificar se já existe algum admin
    const adminCount = await prisma.platformAdmin.count()
    
    if (adminCount > 0) {
      redirect('/dashboard')
    }

    // Criar primeiro admin
    await prisma.platformAdmin.create({
      data: {
        userId: user.id
      }
    })

    redirect('/dashboard')
  } catch (error) {
    console.error('Erro ao criar admin:', error)
    redirect('/setup?error=true')
  }
}

export default async function SetupPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const adminCount = await prisma.platformAdmin.count()
  const isAlreadyAdmin = await prisma.platformAdmin.findUnique({
    where: { userId: user.id }
  })

  if (isAlreadyAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <CheckCircle2 className="h-6 w-6" />
              <CardTitle>Você já é Administrador</CardTitle>
            </div>
            <CardDescription>
              Você já possui acesso completo ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href="/dashboard">Ir para o Dashboard</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (adminCount > 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2 text-amber-600 mb-2">
              <AlertCircle className="h-6 w-6" />
              <CardTitle>Acesso Negado</CardTitle>
            </div>
            <CardDescription>
              O sistema já possui um administrador cadastrado. Entre em contato para obter permissões.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <a href="/dashboard">Voltar</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Configuração Inicial</CardTitle>
          <CardDescription>
            Nenhum administrador encontrado. Configure o primeiro administrador do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>Usuário logado:</strong><br />
              {user.email}
            </p>
          </div>
          
          <form action={setupFirstAdmin}>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
              Tornar-me Administrador
            </Button>
          </form>

          <p className="text-xs text-gray-500 text-center">
            Ao clicar, você será registrado como o administrador da plataforma e terá acesso completo ao sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
