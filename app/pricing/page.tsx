/**
 * Página de Preços - MA.IA
 */

'use client'

import { useState } from 'react'
import { Check, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Experimente gratuitamente',
    features: [
      '50 mensagens por mês',
      'Respostas sobre NRs',
      'Histórico de 7 dias',
      'Suporte por email'
    ],
    cta: 'Começar Grátis',
    popular: false
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 97,
    description: 'Para técnicos e profissionais',
    features: [
      'Tudo do Free +',
      '1.000 mensagens por mês',
      'Templates personalizados',
      'Upload de documentos',
      'Histórico ilimitado',
      'Suporte prioritário'
    ],
    cta: 'Assinar Agora',
    popular: true
  },
  {
    id: 'business',
    name: 'Empresarial',
    price: 297,
    description: 'Para empresas e consultorias',
    features: [
      'Tudo do Pro +',
      '5.000 mensagens por mês',
      'Multi-usuário (até 5)',
      'API de integração',
      'Onboarding dedicado',
      'SLA de resposta'
    ],
    cta: 'Assinar Agora',
    popular: false
  }
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleSelectPlan = async (planId: string) => {
    if (planId === 'free') {
      router.push('/auth/register')
      return
    }

    setLoading(planId)

    try {
      const response = await fetch('/api/payments/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar pagamento')
      }

      // Redirecionar para checkout do Mercado Pago
      window.location.href = data.initPoint

    } catch (error) {
      console.error('Erro:', error)
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Erro ao processar pagamento',
        variant: 'destructive'
      })
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4" variant="secondary">
          <Sparkles className="w-3 h-3 mr-1" />
          Primeira IA de SST do Brasil
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Planos e Preços
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Escolha o plano ideal para suas necessidades. Comece grátis e faça upgrade quando precisar.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary">Mais Popular</Badge>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">
                    {plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground">/mês</span>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loading !== null}
                >
                  {loading === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    plan.cta
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ ou Garantia */}
      <div className="container mx-auto px-4 pb-16 text-center">
        <p className="text-sm text-muted-foreground">
          💳 Pagamento 100% seguro via Mercado Pago • 🔒 Cancele quando quiser
        </p>
      </div>
    </div>
  )
}
