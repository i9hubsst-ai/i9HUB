import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { getCompanyById, updateCompany } from '@/app/actions/companies'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getCompanyById(id)

  if (result.error || !result.company) {
    notFound()
  }

  const company = result.company

  async function handleSubmit(formData: FormData) {
    'use server'
    
    const result = await updateCompany(id, formData)
    
    if (result.success) {
      redirect(`/dashboard/companies/${id}`)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <Link href={`/dashboard/companies/${id}`}>
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-primary">Editar Empresa</h1>
        <p className="text-muted-foreground">
          Atualize as informações da empresa
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>
            Preencha os campos abaixo para atualizar os dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Empresa *</Label>
              <Input
                id="name"
                name="name"
                defaultValue={company.name}
                placeholder="Ex: Empresa ABC Ltda"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                name="cnpj"
                defaultValue={company.cnpj}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Salvar Alterações
              </Button>
              <Link href={`/dashboard/companies/${id}`} className="flex-1">
                <Button type="button" variant="outline" className="w-full">
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
