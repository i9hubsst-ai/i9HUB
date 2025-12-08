'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { seedCNAEs } from '@/app/actions/seed-cnaes'
import { CheckCircle2, AlertCircle, Loader2, Database } from 'lucide-react'

export function SeedCNAEsButton() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    message?: string
    stats?: { grau1: number; grau2: number; grau3: number; grau4: number }
    error?: string
  } | null>(null)

  async function handleSeed() {
    setLoading(true)
    setResult(null)

    try {
      const response = await seedCNAEs()
      setResult(response)
    } catch (error) {
      console.error(error)
      setResult({ error: 'Erro inesperado ao executar seed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={handleSeed}
        disabled={loading}
        size="lg"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Executando seed...
          </>
        ) : (
          <>
            <Database className="mr-2 h-5 w-5" />
            Executar Seed de CNAEs
          </>
        )}
      </Button>

      {result && (
        <div
          className={`rounded-lg p-4 ${
            result.error
              ? 'bg-red-50 border border-red-200'
              : 'bg-green-50 border border-green-200'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.error ? (
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
            )}
            <div className="flex-1">
              <p
                className={`font-medium ${
                  result.error ? 'text-red-900' : 'text-green-900'
                }`}
              >
                {result.error || result.message}
              </p>
              {result.stats && (
                <div className="mt-3 text-sm text-green-800 space-y-1">
                  <p className="font-medium">CNAEs por grau de risco:</p>
                  <ul className="ml-4 space-y-0.5">
                    <li>• Grau 1 (Leve): {result.stats.grau1}</li>
                    <li>• Grau 2 (Médio): {result.stats.grau2}</li>
                    <li>• Grau 3 (Grave): {result.stats.grau3}</li>
                    <li>• Grau 4 (Muito Grave): {result.stats.grau4}</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
