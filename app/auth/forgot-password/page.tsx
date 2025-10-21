'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { resetPassword } from '@/app/actions/auth'

export default function ForgotPasswordPage() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await resetPassword(formData)
      if (result?.error) {
        setError(result.error)
      } else if (result?.success) {
        setSuccess(true)
      }
    } catch (err) {
      setError('Erro ao enviar email de recuperação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <Image
            src="/images/hubsst-logo.png"
            alt="HUBSST Logo"
            width={120}
            height={120}
            priority
            className="drop-shadow-lg"
          />
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-primary">
              Recuperar Senha
            </CardTitle>
            <CardDescription className="text-center">
              Digite seu email para receber instruções
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="bg-accent/10 text-accent-foreground px-4 py-3 rounded-lg text-sm text-center">
                Email enviado! Verifique sua caixa de entrada para resetar sua senha.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Email de Recuperação'}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link 
              href="/auth/login" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Voltar para o login
            </Link>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Desenvolvido por HUBSST © 2025</p>
        </div>
      </div>
    </div>
  )
}
