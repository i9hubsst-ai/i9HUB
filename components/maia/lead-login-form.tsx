'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { createLeadSession } from '@/lib/services/lead-session'

export function LeadLoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setError('Por favor, insira um e-mail válido')
        setIsLoading(false)
        return
      }

      // Verificar se o lead existe
      const response = await fetch('/api/leads/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 404) {
          setError('Este e-mail não está cadastrado. Por favor, preencha o formulário completo abaixo.')
        } else {
          setError(data.error || 'Erro ao verificar e-mail')
        }
        setIsLoading(false)
        return
      }

      // Lead encontrado! Criar sessão e redirecionar
      if (data.leadId) {
        createLeadSession(data.leadId, data.email, data.name)
        setSuccess(`Bem-vindo de volta, ${data.name?.split(' ')[0]}! Redirecionando...`)
        
        setTimeout(() => {
          router.push('/maia/chat')
        }, 1500)
      }
    } catch (err) {
      setError('Erro ao processar solicitação. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Já fez o cadastro?
          </h3>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail para acessar o chat MA.IA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="existing-email" className="sr-only">
              E-mail
            </Label>
            <Input
              id="existing-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || !!success}
              className="text-base"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !email || !!success}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verificando...
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Redirecionando...
              </>
            ) : (
              <>
                Acessar Chat
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-4 pt-4 border-t border-green-200">
          <p className="text-xs text-center text-muted-foreground">
            Primeira vez aqui? Preencha o formulário completo abaixo para se cadastrar.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
