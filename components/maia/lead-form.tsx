'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Zap, Loader2 } from 'lucide-react'

export default function LeadForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    phone: '',
    wantsFree: false,
    wantsPro: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar')
      }

      // Redirecionar para página de obrigado
      router.push(`/maia/obrigado?email=${encodeURIComponent(formData.email)}`)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar cadastro')
      setLoading(false)
    }
  }

  return (
    <Card className="border-2 border-blue-200 shadow-2xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome e Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                E-mail corporativo <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="seu@email.com.br"
              />
            </div>
          </div>

          {/* Cargo e Empresa */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Cargo / Função <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Ex: Engenheiro de Segurança"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Empresa <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Nome da empresa"
              />
            </div>
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Telefone / WhatsApp
            </label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="(00) 00000-0000"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4 bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <p className="font-semibold text-gray-700 mb-3">Qual é seu interesse?</p>
            
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={formData.wantsFree}
                onChange={(e) => setFormData({...formData, wantsFree: e.target.checked})}
                className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-sm group-hover:text-blue-600 transition-colors">
                <strong>Desejo testar a versão gratuita</strong> do MA.IA (50 consultas/mês)
              </span>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={formData.wantsPro}
                onChange={(e) => setFormData({...formData, wantsPro: e.target.checked})}
                className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-600"
              />
              <span className="text-sm group-hover:text-blue-600 transition-colors">
                <strong>Tenho interesse na versão profissional</strong> (R$ 29,90/mês com recursos avançados)
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={loading}
            size="lg" 
            className="w-full text-lg h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-xl"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Cadastrar e Acessar o MA.IA
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Ao se cadastrar, você concorda com nossos{' '}
            <a href="#" className="underline hover:text-blue-600">Termos de Uso</a> e{' '}
            <a href="#" className="underline hover:text-blue-600">Política de Privacidade</a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
