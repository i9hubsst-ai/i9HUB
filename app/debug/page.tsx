import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getBaseUrl, getCallbackUrl, getResetPasswordUrl } from '@/lib/utils/url'

export default function DebugPage() {
  const configs = {
    'NEXT_PUBLIC_SITE_URL': process.env.NEXT_PUBLIC_SITE_URL,
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NODE_ENV': process.env.NODE_ENV,
    'VERCEL_ENV': process.env.VERCEL_ENV,
    'VERCEL_URL': process.env.VERCEL_URL,
  }

  const generatedUrls = {
    'Base URL': getBaseUrl(),
    'Callback URL': getCallbackUrl(),
    'Reset Password URL': getResetPasswordUrl(),
  }

  return (
    <div className="p-8 space-y-6">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>🔗 URLs Geradas pela Aplicação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(generatedUrls).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <div className="font-semibold text-sm mb-1">{key}:</div>
                <code className="text-xs bg-blue-50 px-2 py-1 rounded block break-all">
                  {value}
                </code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}