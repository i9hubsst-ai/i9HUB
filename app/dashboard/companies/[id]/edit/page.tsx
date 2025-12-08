import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { getCompanyById } from '@/app/actions/companies'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CompanyEditForm } from '@/components/dashboard/company-edit-form'

export const dynamic = 'force-dynamic'

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getCompanyById(id)

  if (result.error || !result.company) {
    notFound()
  }

  const company = result.company

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

      <CompanyEditForm company={company} />
    </div>
  )
}
