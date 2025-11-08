/**
 * Página de Falha no Pagamento
 */

import { XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-orange-50">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Pagamento Não Aprovado</CardTitle>
          <CardDescription>
            Não foi possível processar seu pagamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Isso pode ter acontecido por diversos motivos:
          </p>
          
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Saldo insuficiente</li>
            <li>Dados incorretos</li>
            <li>Problema temporário</li>
          </ul>

          <div className="space-y-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/pricing">
                Tentar Novamente
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/dashboard">
                Voltar ao Painel
              </Link>
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Precisa de ajuda? Entre em contato com nosso suporte.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
