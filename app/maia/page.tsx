import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Bot,
  FileText,
  Brain,
  Clock
} from 'lucide-react'

export default function MaiaLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 text-center">
        <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <Sparkles className="w-3 h-3 mr-1" />
          Primeira IA de Segurança do Trabalho do Brasil
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MA.IA - Sua Assistente<br />de Segurança do Trabalho
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Responda suas dúvidas sobre NRs, crie documentos de SST e 
          automatize processos com Inteligência Artificial especializada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/pricing">
              Começar Grátis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="text-lg px-8">
            <Link href="/auth/login">
              Já tenho conta
            </Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          ✅ Sem cartão de crédito • ✅ 50 mensagens grátis • ✅ Cancele quando quiser
        </p>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Tudo que você precisa em SST
          </h2>
          <p className="text-muted-foreground">
            Poderosa, inteligente e fácil de usar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Bot className="w-10 h-10 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Chat Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tire dúvidas sobre NRs, regulamentações e boas práticas em tempo real
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <FileText className="w-10 h-10 text-purple-600 mb-2" />
              <CardTitle className="text-lg">Templates Prontos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gere documentos, checklists e relatórios personalizados automaticamente
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Brain className="w-10 h-10 text-green-600 mb-2" />
              <CardTitle className="text-lg">Base de Conhecimento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acesso a todas NRs atualizadas e normas técnicas relevantes
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-colors">
            <CardHeader>
              <Clock className="w-10 h-10 text-orange-600 mb-2" />
              <CardTitle className="text-lg">Economia de Tempo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Reduza horas de pesquisa para minutos com respostas precisas
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Por que MA.IA?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <Shield className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Confiável</h3>
                <p className="text-sm text-blue-100">
                  Baseada em fontes oficiais e normas técnicas
                </p>
              </div>
              <div>
                <Zap className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Rápida</h3>
                <p className="text-sm text-blue-100">
                  Respostas em segundos, não em horas
                </p>
              </div>
              <div>
                <CheckCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Prática</h3>
                <p className="text-sm text-blue-100">
                  Soluções prontas para implementar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Quem usa MA.IA?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Técnicos de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Consulta rápida de NRs</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Criação de documentos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Checklists de inspeção</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engenheiros de SST</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Análise de riscos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Laudos técnicos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Planos de ação</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Empresas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Conformidade legal</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Treinamentos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Gestão de SESMT</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-2 border-primary">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para começar?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se aos profissionais de SST que já estão usando IA 
              para trabalhar de forma mais inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/pricing">
                  Experimentar Grátis
                  <Sparkles className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link href="/dashboard">
                  Ver Plataforma Completa (i9HUBSST)
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              💡 A MA.IA faz parte do ecossistema i9HUBSST - Plataforma completa de Gestão SST
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 i9HUBSST - MA.IA. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="/maia" className="text-sm text-muted-foreground hover:text-foreground">
                MA.IA Chat
              </Link>
              <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Preços
              </Link>
              <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
                Login
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                i9HUBSST
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
