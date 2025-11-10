import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import LeadForm from '@/components/maia/lead-form'
import { LeadLoginForm } from '@/components/maia/lead-login-form'
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
        <div className="container flex h-20 items-center justify-between px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="text-3xl font-black text-green-700">
                HUBSST
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#sobre" className="text-muted-foreground hover:text-green-600 transition-colors">Sobre</a>
            <a href="#recursos" className="text-muted-foreground hover:text-green-600 transition-colors">Recursos</a>
            <a href="#cadastro" className="text-muted-foreground hover:text-green-600 transition-colors">Cadastro</a>
            <a href="#contato" className="text-muted-foreground hover:text-green-600 transition-colors">Contato</a>
          </nav>

          <Button asChild className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/50">
            <Link href="#cadastro">
              <MessageSquare className="w-4 h-4 mr-2" />
              Usar MA.IA Grátis
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section - Primeira Dobra */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-50 via-white to-emerald-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-3xl" />
        
        <div className="container relative px-4 py-24 md:py-32 max-w-7xl mx-auto">
          {/* Título com Imagem do Cérebro */}
          <div className="text-center space-y-6 mb-16 max-w-6xl mx-auto">
            {/* Imagem do Cérebro */}
            <div className="flex justify-center mb-8">
              <Image 
                src="/images/maia-brain.png" 
                alt="MA.IA Inteligência Artificial"
                width={200}
                height={200}
                className="object-contain"
                priority
              />
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              <span className="block mb-3">
                Conheça o{' '}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 bg-clip-text text-transparent animate-gradient">
                  MA.IA
                </span>
                {' '}—
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl">
                Módulo Avançado de Inteligência Artificial
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-semibold text-green-700 mt-4">
              O cérebro inteligente da Segurança do Trabalho.
            </p>
          </div>

          {/* Grid com Texto e Mockup */}
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Coluna Esquerda - Descrição e CTAs */}
            <div className="space-y-8 text-center lg:text-left">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Um chat de <strong className="text-foreground">Inteligência Artificial</strong> especializado em{' '}
                <strong className="text-foreground">Segurança e Saúde do Trabalho</strong>.
                <br /><br />
                Tire dúvidas sobre NRs, crie análises de risco, gere relatórios e receba respostas com base em{' '}
                <strong className="text-green-600">regulamentações reais</strong>. <strong className="text-green-600">Disponível AGORA!</strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild className="text-lg h-14 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl shadow-green-500/50">
                  <Link href="#cadastro">
                    <Zap className="w-5 h-5 mr-2" />
                    Testar MA.IA Grátis Agora
                  </Link>
                </Button>
                
                <Button size="lg" variant="outline" asChild className="text-lg h-14 px-8 border-2 hover:bg-green-50">
                  <Link href="#sobre">
                    Saiba Mais
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 text-sm text-muted-foreground justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span><strong className="text-foreground">Acesso imediato</strong> após cadastro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span><strong className="text-foreground">100% gratuito</strong> para testar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span><strong className="text-foreground">Pré-lançamento</strong> - Vagas limitadas</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita - Mockup do Chat GRANDE */}
            <div className="relative mx-auto max-w-2xl lg:max-w-none">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600/30 to-emerald-600/30 blur-3xl rounded-full" />
              <Card className="relative border-4 border-green-100 shadow-2xl shadow-green-500/20 overflow-hidden">
                <CardHeader className="border-b-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center ring-4 ring-white/30">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-white">MA.IA</CardTitle>
                      <p className="text-green-100 text-sm mt-1">Inteligência que pensa como o engenheiro</p>
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
                    <div className="bg-green-600 text-white rounded-2xl rounded-tr-sm px-5 py-4 max-w-[85%] shadow-lg">
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
                          <ShieldCheck className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Proteções fixas e móveis adequadas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>Dispositivos de segurança certificados</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
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
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Texto Institucional */}
            <div className="space-y-6">
              <Badge className="bg-green-100 text-green-700 border-green-300">
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
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-green-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Compliance Automatizado</h3>
                  <p className="text-sm text-muted-foreground">Mantenha-se atualizado com todas as NRs</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-emerald-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600" />
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
      <section id="recursos" className="py-24 bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
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
                color: 'green'
              },
              {
                icon: ShieldCheck,
                title: 'Sugestão de medidas corretivas',
                desc: 'Recomendações técnicas baseadas em boas práticas e experiência acumulada',
                color: 'emerald'
              },
              {
                icon: ListChecks,
                title: 'Criação de planos 5W2H',
                desc: 'Planos de ação estruturados automaticamente com What, Why, Who, Where, When, How, How Much',
                color: 'green'
              },
              {
                icon: FileText,
                title: 'Geração de relatórios automáticos',
                desc: 'Documentação profissional em minutos, pronta para apresentação e arquivo',
                color: 'green'
              },
              {
                icon: Brain,
                title: 'Aprendizado contínuo',
                desc: 'Evolução constante com base em casos reais e feedback dos profissionais',
                color: 'emerald'
              },
              {
                icon: Zap,
                title: 'Respostas instantâneas',
                desc: 'Economia de horas de pesquisa e análise com respostas precisas em segundos',
                color: 'green'
              },
            ].map((feature, i) => (
              <Card key={i} className="border-2 hover:border-green-400 hover:shadow-xl transition-all duration-300 group">
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

          {/* Versão Gratuita Disponível */}
          <div className="mt-16 text-center">
            <Badge variant="outline" className="bg-white border-2 border-green-300 text-green-700 px-4 py-2 text-base">
              🎉 Versão Gratuita Disponível - Comece a usar agora!
            </Badge>
          </div>
        </div>
      </section>

      {/* Seção de Cadastro */}
      <section id="cadastro" className="py-24 bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-base px-6 py-2">
              🚀 Pré-Lançamento HUBSST / MA.IA
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Participe do pré-lançamento e teste gratuitamente o MA.IA
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">
              o Módulo Avançado de Inteligência Artificial do HUBSST.
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha os dados abaixo e tenha acesso antecipado ao <strong>chat de IA especializado em Segurança do Trabalho</strong>.
            </p>
          </div>

          {/* Formulário de acesso rápido para leads já cadastrados */}
          <div className="mb-8">
            <LeadLoginForm />
          </div>

          {/* Separador */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-green-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-b from-green-50 to-emerald-50 px-4 text-sm text-muted-foreground font-medium">
                ou faça seu primeiro cadastro
              </span>
            </div>
          </div>

          {/* Formulário completo para novos leads */}
          <LeadForm />
        </div>
      </section>

      {/* Footer Profissional */}
      <footer className="bg-gray-900 text-white">
        <div className="container px-4 py-16 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Coluna 1 - Logo e Descrição */}
            <div className="md:col-span-2 space-y-6">
              <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                HUBSST
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Conectando Inteligência, Segurança e Tecnologia.
                <br /><br />
                Plataforma SaaS completa para gestão de SST integrada à Inteligência Artificial MA.IA.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div>
              <h4 className="font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre o HUBSST</a></li>
                <li><a href="#recursos" className="hover:text-white transition-colors">Recursos MA.IA</a></li>
                <li><a href="#cadastro" className="hover:text-white transition-colors">Cadastro</a></li>
              </ul>
            </div>

            {/* Coluna 3 - Legal */}
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Política de Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Linha de Separação */}
          <div className="border-t border-gray-800 pt-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 text-sm text-gray-400">
                <p className="font-semibold text-white">© 2025 MAIA Equipamentos e Serviços Industriais LTDA</p>
                <p>CNPJ: [Inserir CNPJ]</p>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>[Inserir Endereço Completo]</span>
                </p>
              </div>
              <div className="space-y-2 text-sm text-gray-400 md:text-right">
                <p className="flex items-center justify-start md:justify-end gap-2">
                  <Phone className="w-4 h-4" />
                  <span>[Inserir Telefone]</span>
                </p>
                <p className="flex items-center justify-start md:justify-end gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contato@hubsst.com.br</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
