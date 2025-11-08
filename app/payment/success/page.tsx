/**
 * Página de Sucesso do Pagamento
 */

import { Suspense } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

function SuccessContent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Pagamento Aprovado! 🎉</CardTitle>
          <CardDescription>
            Seu plano foi ativado com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Agora você tem acesso completo aos recursos do seu plano.
            Comece a usar a MA.IA agora mesmo!
          </p>
          
          <div className="space-y-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/chat">
                Começar a Usar
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">
                Ver Meu Painel
              </Link>
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Você receberá um email de confirmação em breve.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
