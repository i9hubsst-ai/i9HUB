import { notFound } from 'next/navigation'
import { getCompanyById } from '@/app/actions/companies'
import { CNAESelection } from '@/components/dashboard/cnae-selection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default async function CompanyCNAEPage({
  params,
}: {
  params: { id: string }
}) {
  const company = await getCompanyById(params.id)

  if (!company) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 max-w-6xl">
      <div className="mb-6">
        <Link href={`/dashboard/companies/${params.id}`}>
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para Detalhes
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CNAEs da Empresa</h1>
        <p className="text-gray-600">
          {company.name} - {company.cnpj}
        </p>
      </div>

      <CNAESelection companyId={params.id} />
    </div>
  )
}
