import Image from "next/image";

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
            className="drop-shadow-2xl"
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
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-left">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">
            ⚙️ Configuração Necessária
          </h3>
          <p className="text-yellow-700">
            Para ativar todas as funcionalidades, configure as credenciais do Supabase e OpenAI nas variáveis de ambiente.
          </p>
          <p className="text-sm text-yellow-600 mt-2">
            Veja o arquivo <code className="bg-yellow-100 px-2 py-1 rounded">.env.example</code> para referência.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors">
            Fazer Login
          </button>
          <button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg transition-colors">
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
}
