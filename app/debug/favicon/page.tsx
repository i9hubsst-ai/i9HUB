import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Debug Favicon - i9HUBSST',
  description: 'Página de diagnóstico de favicons'
}

export default function FaviconDebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🔍 Diagnóstico de Favicons</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Instruções</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Abra o Console do Navegador (F12 ou Ctrl+Shift+I)</li>
            <li>Vá para a aba "Console"</li>
            <li>Procure por mensagens começando com "🔍 [FAVICON DEBUG]"</li>
            <li>Verifique os logs detalhados sobre os favicons</li>
            <li>Vá para a aba "Network" e filtre por "icon" ou "favicon"</li>
            <li>Recarregue a página com Ctrl+Shift+R (hard reload)</li>
          </ol>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Favicons Esperados</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-mono text-sm">/favicon.ico</p>
              <p className="text-sm text-gray-600">Formato ICO, múltiplos tamanhos</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <p className="font-mono text-sm">/favicon.svg</p>
              <p className="text-sm text-gray-600">Formato SVG vetorial</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <p className="font-mono text-sm">/apple-touch-icon.png</p>
              <p className="text-sm text-gray-600">Ícone para dispositivos Apple</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Testes Visuais</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">favicon.ico</h3>
              <img 
                src="/favicon.ico" 
                alt="Favicon ICO" 
                className="w-16 h-16 border"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid red'
                  img.alt = 'ERRO: Não carregou'
                }}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid green'
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Borda verde = Carregou | Borda vermelha = Erro
              </p>
            </div>

            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">favicon.svg</h3>
              <img 
                src="/favicon.svg" 
                alt="Favicon SVG" 
                className="w-16 h-16 border"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid red'
                  img.alt = 'ERRO: Não carregou'
                }}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid green'
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Borda verde = Carregou | Borda vermelha = Erro
              </p>
            </div>

            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">apple-touch-icon.png</h3>
              <img 
                src="/apple-touch-icon.png" 
                alt="Apple Touch Icon" 
                className="w-16 h-16 border"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid red'
                  img.alt = 'ERRO: Não carregou'
                }}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid green'
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Borda verde = Carregou | Borda vermelha = Erro
              </p>
            </div>

            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">favicon-16x16.png</h3>
              <img 
                src="/favicon-16x16.png" 
                alt="Favicon 16x16" 
                className="w-16 h-16 border"
                style={{ imageRendering: 'pixelated' }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid red'
                  img.alt = 'ERRO: Não carregou'
                }}
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.border = '2px solid green'
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Borda verde = Carregou | Borda vermelha = Erro
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Links Diretos</h2>
          <div className="space-y-2">
            <a 
              href="/favicon.ico" 
              target="_blank" 
              className="block text-blue-600 hover:underline font-mono text-sm"
            >
              /favicon.ico
            </a>
            <a 
              href="/favicon.svg" 
              target="_blank" 
              className="block text-blue-600 hover:underline font-mono text-sm"
            >
              /favicon.svg
            </a>
            <a 
              href="/apple-touch-icon.png" 
              target="_blank" 
              className="block text-blue-600 hover:underline font-mono text-sm"
            >
              /apple-touch-icon.png
            </a>
            <a 
              href="/favicon-16x16.png" 
              target="_blank" 
              className="block text-blue-600 hover:underline font-mono text-sm"
            >
              /favicon-16x16.png
            </a>
            <a 
              href="/favicon-96x96.png" 
              target="_blank" 
              className="block text-blue-600 hover:underline font-mono text-sm"
            >
              /favicon-96x96.png
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Clique nos links acima para verificar se os arquivos existem e são acessíveis.
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2 text-yellow-800">⚠️ Problema Comum: Cache</h2>
          <p className="text-yellow-700 mb-4">
            Se os arquivos carregam aqui mas não aparecem na aba do navegador, o problema é cache.
          </p>
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-yellow-800">Soluções:</p>
            <ul className="list-disc list-inside space-y-1 text-yellow-700">
              <li>Feche TODAS as abas do site e abra novamente</li>
              <li>Use Ctrl+Shift+Delete para limpar cache e cookies</li>
              <li>Teste em modo anônimo/privado</li>
              <li>Teste em outro navegador</li>
              <li>Adicione um parâmetro na URL: ?v=2 (force refresh)</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <Link 
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Voltar para Home
          </Link>
          
          <Link 
            href="/maia"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Ir para MA.IA
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            🔄 Recarregar Página
          </button>
        </div>
      </div>
    </div>
  )
}
