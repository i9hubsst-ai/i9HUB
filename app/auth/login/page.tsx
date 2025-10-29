'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { login, updatePassword } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/client'
import { useSearchParams, useRouter } from 'next/navigation'

function LoginContent() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Estados para redefinição de senha
  const [isRecoveryMode, setIsRecoveryMode] = useState(false)
  const [recoveryLoading, setRecoveryLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    console.log('🟣 LOGIN: useEffect executado, verificando parâmetro recovery')
    
    // Verificar se é modo recovery (vem do callback)
    const recovery = searchParams.get('recovery')
    const email = searchParams.get('email')
    
    console.log('� LOGIN: Parâmetros:', { recovery, email })
    
    if (recovery === 'true') {
      console.log('� LOGIN: Modo recovery ativado pelo callback')
      setIsRecoveryMode(true)
      setRecoveryLoading(false)
      
      if (email) {
        setUserEmail(email)
      }
    } else {
      console.log('🔵 LOGIN: Modo login normal')
      setRecoveryLoading(false)
    }
  }, [searchParams])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    console.log('🔑 FRONTEND LOGIN: Dados do formulário:', {
      email,
      passwordLength: password?.length,
      passwordPreview: password?.substring(0, 3) + '***',
      hasEmail: !!email,
      hasPassword: !!password
    })
    
    try {
      // Chama a função de login que pode fazer redirect
      await login(formData)
      
      // Se chegou aqui, algo deu errado (deveria ter redirecionado)
      console.log('� FRONTEND LOGIN: Não houve redirect - possível erro')
      setError('Erro inesperado. Tente novamente.')
      
    } catch (err: any) {
      console.log('🔍 FRONTEND LOGIN: Exception capturada:', err)
      
      // Se for erro de redirect do Next.js, é na verdade sucesso!
      if (err?.message?.includes('NEXT_REDIRECT') || err?.digest?.includes('NEXT_REDIRECT')) {
        console.log('� FRONTEND LOGIN: Redirect capturado - login bem-sucedido!')
        // Não mostrar erro, deixar o redirect acontecer
        return
      }
      
      // Se for erro real, mostrar
      console.error('🔴 FRONTEND LOGIN: Erro real:', err)
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append("password", password)

      const result = await updatePassword(formData)

      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    } catch (err) {
      setError("Erro ao atualizar senha. Por favor, tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Loading enquanto verifica tokens
  if (recoveryLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Verificando token de recovery...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Image
            src="/images/hubsst-logo.png"
            alt="HUBSST Logo"
            width={150}
            height={150}
            priority
            className="drop-shadow-lg"
          />
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-primary">
              {isRecoveryMode ? 'Redefinir Senha' : 'Entrar no HUBSST'}
            </CardTitle>
            <CardDescription className="text-center">
              {isRecoveryMode 
                ? `Defina uma nova senha para ${userEmail}` 
                : 'Gerencie a segurança do trabalho da sua empresa'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Formulário de Login Normal */}
            {!isRecoveryMode && (
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            )}

            {/* Formulário de Redefinição de Senha */}
            {isRecoveryMode && !success && (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                    minLength={6}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Atualizando...' : 'Atualizar Senha'}
                </Button>
              </form>
            )}

            {/* Sucesso na Redefinição */}
            {isRecoveryMode && success && (
              <div className="text-center space-y-4">
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg">
                  ✅ Senha atualizada com sucesso!
                </div>
                <p className="text-sm text-gray-600">
                  Redirecionando para o dashboard...
                </p>
              </div>
            )}
          </CardContent>
          
          {!isRecoveryMode && (
            <CardFooter className="flex flex-col space-y-2">
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Esqueceu sua senha?
              </Link>
              <div className="text-sm text-center text-muted-foreground">
                Não tem uma conta?{' '}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Cadastre-se
                </Link>
              </div>
            </CardFooter>
          )}
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Desenvolvido por HUBSST © 2025</p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Carregando...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
