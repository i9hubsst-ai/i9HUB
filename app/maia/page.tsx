import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MessageSquare,
  Shield, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Target,
  BookOpen,
  BarChart3,
  GraduationCap,
  Store,
  ShieldCheck,
  ListChecks,
  FileText,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  Globe
} from 'lucide-react'

export default function MaiaLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Fixo */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-20 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HUBSST
              </div>
            </Link>
            <Badge variant="outline" className="hidden md:flex bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 text-blue-700 px-3 py-1">
              <Brain className="w-4 h-4 mr-2" />
              <span className="font-semibold">MA.IA – Módulo Avançado de Inteligência Artificial</span>
            </Badge>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#sobre" className="text-muted-foreground hover:text-blue-600 transition-colors">Sobre</a>
            <a href="#recursos" className="text-muted-foreground hover:text-blue-600 transition-colors">Recursos</a>
            <a href="#planos" className="text-muted-foreground hover:text-blue-600 transition-colors">Planos</a>
            <a href="#cadastro" className="text-muted-foreground hover:text-blue-600 transition-colors">Contato</a>
          </nav>

          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/50">
            <Link href="/auth/login">
              <MessageSquare className="w-4 h-4 mr-2" />
              Acessar o Chat
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section - Primeira Dobra */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
        
        <div className="container relative px-4 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Coluna Esquerda - Texto */}
            <div className="space-y-8 text-center lg:text-left">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Módulo Avançado de Inteligência Artificial
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                Conheça o{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  MA.IA
                </span>
                {' '}— o cérebro inteligente da Segurança do Trabalho.
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Um chat de <strong className="text-foreground">Inteligência Artificial</strong> desenvolvido para{' '}
                <strong className="text-foreground">engenheiros e técnicos em SST</strong>.
                <br /><br />
                Tire dúvidas, consulte normas, crie análises e receba respostas com base em{' '}
                <strong className="text-blue-600">regulamentações reais</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="text-lg h-14 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl shadow-green-500/50">
                  <Link href="#cadastro">
                    <Zap className="w-5 h-5 mr-2" />
                    Experimente Grátis Agora
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 border-2 hover:bg-blue-50">
                  <Link href="#sobre">
                    Acesso Antecipado ao HUBSST
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Grátis para começar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Sem cartão de crédito</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-muted-foreground">Cancele quando quiser</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Mockup do Chat GRANDE */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl rounded-full" />
              <Card className="relative border-4 border-blue-100 shadow-2xl shadow-blue-500/20 overflow-hidden">
                <CardHeader className="border-b-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center ring-4 ring-white/30">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-white">MA.IA</CardTitle>
                      <p className="text-blue-100 text-sm mt-1">Inteligência que pensa como o engenheiro</p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-white/80 ml-2">Online</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6 bg-gray-50 min-h-[400px]">
                  {/* Mensagem do Usuário */}
                  <div className="flex justify-end animate-fade-in">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-4 max-w-[85%] shadow-lg">
                      <p className="font-medium">Quais são os requisitos da NR-12 para proteção de máquinas e equipamentos?</p>
                    </div>
                  </div>
                  
                  {/* Resposta do MA.IA */}
                  <div className="flex justify-start animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-tl-sm px-5 py-4 max-w-[85%] shadow-lg">
                      <p className="text-gray-900 font-medium mb-3">
                        📋 A NR-12 estabelece requisitos mínimos para proteção de máquinas. Os principais são:
                      </p>
                      <ul className="space-y-2 text-gray-700 ml-4">
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Proteções fixas e móveis adequadas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Dispositivos de segurança certificados</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                          <span>Sistema de parada de emergência acessível</span>
                        </li>
                      </ul>
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                          <BookOpen className="w-3 h-3" />
                          Baseado em: NR-12 atualizada 2024
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex justify-start">
                    <div className="bg-gray-200 rounded-full px-4 py-2 flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o HUBSST */}
      <section id="sobre" className="py-24 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Texto Institucional */}
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                Plataforma Completa
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Sobre o HUBSST
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                O HUBSST é uma <strong className="text-foreground">plataforma SaaS completa</strong> para gestão de 
                Segurança e Saúde no Trabalho, integrada à Inteligência Artificial MA.IA.
                <br /><br />
                Reúne módulos avançados para <strong className="text-foreground">Compliance, PGR, EPI, Riscos, 
                Inspeções e Treinamentos</strong>, oferecendo automação, controle e relatórios integrados.
              </p>
            </div>

            {/* Lista de Benefícios com Ícones */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Compliance Automatizado</h3>
                  <p className="text-sm text-muted-foreground">Mantenha-se atualizado com todas as NRs</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Planos de Ação Inteligentes</h3>
                  <p className="text-sm text-muted-foreground">Geração automática com 5W2H</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Integração com Normas NR</h3>
                  <p className="text-sm text-muted-foreground">Base de conhecimento sempre atualizada</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-orange-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dashboards Analíticos</h3>
                  <p className="text-sm text-muted-foreground">Visualize métricas e indicadores</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-red-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Treinamentos</h3>
                  <p className="text-sm text-muted-foreground">Gestão completa de capacitações</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-indigo-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Store className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Marketplace de Serviços</h3>
                  <p className="text-sm text-muted-foreground">Conecte-se com fornecedores</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conheça o Chat MA.IA */}
      <section id="recursos" className="py-24 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              O primeiro assistente inteligente especializado em Segurança do Trabalho
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Conheça o Chat MA.IA
            </h2>
            <p className="text-xl text-muted-foreground italic">
              "Inteligência que pensa como o engenheiro."
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: BookOpen,
                title: 'Consulta instantânea às NRs e NBRs',
                desc: 'Acesso direto às normas regulamentadoras atualizadas com interpretação contextual',
                color: 'blue'
              },
              {
                icon: ShieldCheck,
                title: 'Sugestão de medidas corretivas',
                desc: 'Recomendações técnicas baseadas em boas práticas e experiência acumulada',
                color: 'green'
              },
              {
                icon: ListChecks,
                title: 'Criação de planos 5W2H',
                desc: 'Planos de ação estruturados automaticamente com What, Why, Who, Where, When, How, How Much',
                color: 'purple'
              },
              {
                icon: FileText,
                title: 'Geração de relatórios automáticos',
                desc: 'Documentação profissional em minutos, pronta para apresentação e arquivo',
                color: 'orange'
              },
              {
                icon: Brain,
                title: 'Aprendizado contínuo',
                desc: 'Evolução constante com base em casos reais e feedback dos profissionais',
                color: 'pink'
              },
              {
                icon: Zap,
                title: 'Respostas instantâneas',
                desc: 'Economia de horas de pesquisa e análise com respostas precisas em segundos',
                color: 'yellow'
              },
            ].map((feature, i) => (
              <Card key={i} className="border-2 hover:border-blue-400 hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Versões Disponíveis */}
          <div className="mt-16 text-center">
            <Badge variant="outline" className="bg-white border-2 border-blue-300 text-blue-700 px-4 py-2 text-base">
              📣 Versões disponíveis: Gratuita • Profissional • Corporativa
            </Badge>
          </div>
        </div>
      </section>

      {/* Continua na próxima parte... */}
      <section id="cadastro" className="py-24 bg-white">
        <div className="container px-4 text-center">
          <p className="text-muted-foreground">Seção de cadastro será implementada em seguida...</p>
        </div>
      </section>

      {/* Footer Temporário */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container px-4 text-center">
          <p className="text-gray-400">© 2025 HUBSST - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  )
}
