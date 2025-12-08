import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CNAEForm } from '@/components/dashboard/cnae-form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default async function NewCNAEPage() {
  const user = await getCurrentUser()
  
  if (!user || !isPlatformAdmin(user.id)) {
    redirect('/dashboard')
  }

  return (
    <div className="container mx-auto py-10 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard/cadastros/cnaes">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para CNAEs
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Novo CNAE</h1>
        <p className="text-gray-600">
          Cadastre um novo código CNAE no sistema
        </p>
      </div>

      <CNAEForm />
    </div>
  )
}
