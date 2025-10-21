'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createCompany } from '@/app/actions/companies'

export default function NewCompanyPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await createCompany(formData)
      if (result.error) {
        setError(result.error)
      } else {
        router.push('/dashboard/companies')
      }
    } catch (err) {
      setError('Erro ao criar empresa. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <Link href="/dashboard/companies">
        <Button variant="ghost" size="sm" className="mb-6 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar para Empresas
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Nova Empresa</CardTitle>
          <CardDescription>
            Cadastre uma nova empresa no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nome da empresa"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                name="cnpj"
                type="text"
                placeholder="00.000.000/0000-00"
                required
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground">
                Digite apenas números ou no formato XX.XXX.XXX/XXXX-XX
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Criando...' : 'Criar Empresa'}
              </Button>
              <Link href="/dashboard/companies" className="flex-1">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
