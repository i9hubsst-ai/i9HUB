'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Mail, ArrowRight, Home, MessageSquare } from 'lucide-react'

function ObrigadoContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <>
      {/* Ícone de Sucesso */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-6 shadow-2xl shadow-green-500/30 animate-bounce">
          <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        
        <Badge className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm px-4 py-1">
          ✅ Cadastro Realizado
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Cadastro Realizado com Sucesso!
        </h1>
        
        <p className="text-2xl text-gray-700 font-semibold mb-2">
          Bem-vindo ao futuro da Segurança do Trabalho! 🎉
        </p>
        
        {email && (
          <p className="text-muted-foreground">
            Enviamos um e-mail de confirmação para <strong>{email}</strong>
          </p>
        )}
      </div>

      {/* Card Informativo */}
      <Card className="mb-8 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Próximos Passos</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Confirme seu e-mail clicando no link que enviamos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Acesse o MA.IA gratuitamente e comece a usar agora</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Nossa equipe entrará em contato em até 24 horas úteis</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          size="lg"
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl shadow-blue-500/30 h-14 text-lg"
          asChild
        >
          <Link href="/auth/login">
            <MessageSquare className="w-5 h-5 mr-2" />
            Acessar o MA.IA Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </Button>

        <Button 
          size="lg"
          variant="outline"
          className="flex-1 border-2 h-14 text-lg"
          asChild
        >
          <Link href="/maia">
            <Home className="w-5 h-5 mr-2" />
            Voltar para Homepage
          </Link>
        </Button>
      </div>

      {/* Informação Adicional */}
      <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
        <p className="text-sm text-center text-muted-foreground">
          💡 <strong>Dica:</strong> Enquanto aguarda, explore nossos recursos e entenda como o MA.IA pode revolucionar a gestão de SST na sua empresa.
        </p>
      </div>

      {/* Texto de Suporte */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Dúvidas ou precisa de ajuda?{' '}
          <a href="mailto:contato@hubsst.com.br" className="text-blue-600 hover:underline font-semibold">
            Entre em contato
          </a>
        </p>
      </div>
    </>
  )
}

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      {/* Header Simples */}
      <header className="border-b bg-white/80 backdrop-blur-md py-4">
        <div className="container px-4">
          <Link href="/maia" className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            HUBSST
          </Link>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container px-4 py-24">
        <div className="max-w-2xl mx-auto">
          <Suspense fallback={
            <div className="text-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          }>
            <ObrigadoContent />
          </Suspense>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="border-t bg-white/80 backdrop-blur-md py-8 mt-24">
        <div className="container px-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              © 2025 HUBSST - Todos os direitos reservados
            </p>
            <p className="text-xs text-gray-500">
              MAIA Equipamentos e Serviços Industriais LTDA
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
