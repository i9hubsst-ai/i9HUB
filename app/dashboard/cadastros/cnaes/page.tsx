import { Suspense } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus, ArrowLeft } from 'lucide-react'
import { CNAETable } from '@/components/dashboard/cnae-table'

export default async function CNAEManagementPage() {
  const user = await getCurrentUser()
  
  if (!user || !isPlatformAdmin(user.id)) {
    redirect('/dashboard')
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/dashboard/cadastros">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Cadastros
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gerenciamento de CNAEs</h1>
          <p className="text-gray-600">
            Cadastre, edite e remova códigos CNAE do sistema
          </p>
        </div>
        <Link href="/dashboard/cadastros/cnaes/novo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo CNAE
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div className="text-center p-8">Carregando...</div>}>
        <CNAETable />
      </Suspense>
    </div>
  )
}
