import { Suspense } from 'react'
import { getCurrentUser } from '@/lib/auth'
import { isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SeedCNAEsButton } from '@/components/dashboard/seed-cnaes-button'

export default async function AdminSeedPage() {
  const user = await getCurrentUser()
  
  if (!user || !isPlatformAdmin(user.id)) {
    redirect('/dashboard')
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Administração do Sistema</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Seed de CNAEs</h2>
          <p className="text-gray-600 mb-6">
            Popula o banco de dados com os códigos CNAE oficiais brasileiros e seus respectivos graus de risco conforme NR-04.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">O que será inserido:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Grau 1 (Leve): 22 CNAEs - Tecnologia, Educação, Consultoria</li>
              <li>• Grau 2 (Médio): 28 CNAEs - Comércio, Alimentação, Saúde</li>
              <li>• Grau 3 (Grave): 34 CNAEs - Indústria Alimentícia, Construção</li>
              <li>• Grau 4 (Muito Grave): 66 CNAEs - Mineração, Química, Siderurgia</li>
            </ul>
            <p className="text-sm text-blue-700 mt-3 font-medium">Total: 150 CNAEs</p>
          </div>
          
          <Suspense fallback={<div>Carregando...</div>}>
            <SeedCNAEsButton />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
