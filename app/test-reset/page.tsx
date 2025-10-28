import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestResetPage() {
  return (
    <div className="p-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Informações de Reset de Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">URLs que devem ser geradas:</h3>
            <code className="text-xs bg-blue-50 px-2 py-1 rounded block">
              https://i9hubsst.vercel.app/auth/callback?type=recovery&next=/auth/reset-password
            </code>
          </div>
          
          <div className="space-y-2">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-semibold text-yellow-800">🔧 URL Hardcoded Implementada</h4>
              <p className="text-sm text-yellow-700 mt-1">
                O sistema agora usa URL hardcoded para garantir que sempre direcione para produção.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <h4 className="font-semibold text-green-800">✅ Próximos Passos</h4>
              <ol className="text-sm text-green-700 mt-1 list-decimal list-inside space-y-1">
                <li>Aguarde o deploy das alterações</li>
                <li>Teste o reset de senha através do dashboard</li>
                <li>Verifique se o link recebido por email está correto</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}