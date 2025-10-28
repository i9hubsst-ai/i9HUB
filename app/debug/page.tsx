import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DebugPage() {
  const configs = {
    'NEXT_PUBLIC_SITE_URL': process.env.NEXT_PUBLIC_SITE_URL,
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NODE_ENV': process.env.NODE_ENV,
    'VERCEL_ENV': process.env.VERCEL_ENV,
    'VERCEL_URL': process.env.VERCEL_URL,
  }

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Debug - Configurações de Ambiente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(configs).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2">
                <span className="font-mono text-sm">{key}:</span>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {value || 'undefined'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold mb-2">URL de Reset Esperada:</h3>
            <code className="text-sm break-all">
              {process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?type=recovery&next=/auth/reset-password
            </code>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}