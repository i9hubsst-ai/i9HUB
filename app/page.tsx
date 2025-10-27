import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <Image
            src="/images/hubsst-logo.png"
            alt="HUBSST Logo"
            width={300}
            height={300}
            priority
            className="drop-shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          i9HUBSST
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground">
          Plataforma de Gestão de Segurança e Saúde do Trabalho
        </p>
        
        <div className="bg-card border border-border rounded-lg p-6 space-y-4 text-left">
          <h2 className="text-2xl font-semibold text-primary">Funcionalidades Principais</h2>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">✓</span>
              <span>Diagnóstico de Maturidade IMSST com 5 dimensões</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">✓</span>
              <span>Assistente de IA integrado para orientações SST</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">✓</span>
              <span>Gestão Multiempresa com controle de papéis e permissões</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">✓</span>
              <span>Planos de ação personalizados gerados por IA</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">✓</span>
              <span>Relatórios em PDF com gráficos radar de maturidade</span>
            </li>
          </ul>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors">
              Fazer Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg transition-colors">
              Criar Conta
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
