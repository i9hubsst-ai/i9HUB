'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import { createLeadSession } from '@/lib/services/lead-session'

const CARGOS = [
  { value: 'engenheiro_seguranca', label: 'Engenheiro de Segurança' },
  { value: 'tecnico_seguranca', label: 'Técnico de Segurança' },
  { value: 'gestor_sst_rh', label: 'Gestor de SST / RH' },
  { value: 'consultor_autonomo', label: 'Consultor / Autônomo' },
  { value: 'empresario_diretor', label: 'Empresário / Diretor' },
  { value: 'outro', label: 'Outro' },
]

const SETORES = [
  { value: 'industria', label: 'Indústria' },
  { value: 'construcao_civil', label: 'Construção Civil' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'transporte_logistica', label: 'Transporte e Logística' },
  { value: 'energia', label: 'Energia / Utilities' },
  { value: 'saude', label: 'Saúde' },
  { value: 'outro', label: 'Outro' },
]

const DESAFIOS = [
  { value: 'cumprimento_nrs', label: 'Cumprimento das NRs e conformidade legal' },
  { value: 'gestao_pgr', label: 'Gestão do PGR / PPRA / PCMSO' },
  { value: 'controle_epis', label: 'Controle de EPIs' },
  { value: 'treinamentos', label: 'Treinamentos e capacitação de colaboradores' },
  { value: 'gestao_riscos', label: 'Gestão de riscos e incidentes' },
  { value: 'auditorias', label: 'Auditorias e relatórios' },
  { value: 'integracao_sistemas', label: 'Integração entre equipes e sistemas' },
  { value: 'outro', label: 'Outro' },
]

const TIPOS_USO = [
  { value: 'uso_proprio', label: 'Para uso próprio (consultas e análises técnicas)' },
  { value: 'atender_clientes', label: 'Para atender clientes (consultoria ou perícia)' },
  { value: 'implantar_empresa', label: 'Para implantar na empresa onde trabalho' },
  { value: 'revender', label: 'Para revender / representar comercialmente' },
  { value: 'apenas_conhecer', label: 'Apenas para conhecer o sistema' },
]

const TIPOS_ACESSO = [
  { value: 'gratuito', label: 'Versão Gratuita', desc: 'Chat básico, consultas limitadas' },
  { value: 'profissional', label: 'Versão Profissional', desc: 'Relatórios, planos de ação e análises completas' },
  { value: 'corporativo', label: 'Versão Corporativa', desc: 'Multiusuário e integração com módulos HUBSST' },
]

export default function LeadForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    // 1. Informações Básicas
    name: '',
    email: '',
    phone: '',
    company: '',
    cargo: '',
    cargoOutro: '',
    
    // 2. Segmento
    setor: '',
    setorOutro: '',
    
    // 3. Desafios (até 3)
    desafios: [] as string[],
    desafiosOutro: '',
    
    // 4. Interesse
    tipoUso: '',
    
    // 5. Tipo de Acesso
    tipoAcesso: '',
    
    // 6. Expectativa
    expectativa: '',
    
    // 7. Consentimento
    consentimento: false,
  })

  const handleDesafioToggle = (value: string) => {
    setFormData(prev => {
      const current = prev.desafios
      const isSelected = current.includes(value)
      
      if (isSelected) {
        return { ...prev, desafios: current.filter(d => d !== value) }
      } else {
        if (current.length >= 3) {
          setError('Você pode selecionar no máximo 3 desafios')
          setTimeout(() => setError(''), 3000)
          return prev
        }
        return { ...prev, desafios: [...current, value] }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validações
      if (!formData.name || !formData.email || !formData.company || !formData.cargo || !formData.setor || !formData.tipoUso || !formData.tipoAcesso) {
        setError('Por favor, preencha todos os campos obrigatórios')
        setIsLoading(false)
        return
      }

      if (!formData.consentimento) {
        setError('Você precisa autorizar o contato para participar do pré-lançamento')
        setIsLoading(false)
        return
      }

      if (formData.desafios.length === 0) {
        setError('Selecione pelo menos 1 desafio atual em SST')
        setIsLoading(false)
        return
      }

      // Enviar para API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar lead')
      }

      // Criar sessão local para o lead (não requer login)
      if (data.leadId) {
        createLeadSession(data.leadId, formData.email, formData.name)
      }

      // Redirecionar para página de obrigado
      window.location.href = `/maia/obrigado?email=${encodeURIComponent(formData.email)}&tipo=${formData.tipoAcesso}`
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar formulário')
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-2 border-blue-200 shadow-2xl">
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Informações Básicas */}
          <div className="space-y-4">
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="text-xl font-bold text-gray-900">1. Informações Básicas</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome completo *</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone / WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="company">Empresa *</Label>
                <Input
                  id="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Nome da sua empresa"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Cargo / Função *</Label>
              <div className="grid md:grid-cols-2 gap-3 mt-2">
                {CARGOS.map((cargo) => (
                  <label key={cargo.value} className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-blue-50 transition-colors">
                    <input
                      type="radio"
                      name="cargo"
                      value={cargo.value}
                      checked={formData.cargo === cargo.value}
                      onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                      className="w-4 h-4 text-blue-600"
                      required
                    />
                    <span className="text-sm">{cargo.label}</span>
                  </label>
                ))}
              </div>
              {formData.cargo === 'outro' && (
                <Input
                  type="text"
                  value={formData.cargoOutro}
                  onChange={(e) => setFormData({ ...formData, cargoOutro: e.target.value })}
                  placeholder="Especifique seu cargo"
                  className="mt-2"
                />
              )}
            </div>
          </div>

          {/* 2. Segmento de Atuação */}
          <div className="space-y-4">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="text-xl font-bold text-gray-900">2. Segmento de Atuação</h3>
              <p className="text-sm text-gray-600 mt-1">Em qual setor sua empresa atua principalmente?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {SETORES.map((setor) => (
                <label key={setor.value} className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg hover:bg-purple-50 transition-colors">
                  <input
                    type="radio"
                    name="setor"
                    value={setor.value}
                    checked={formData.setor === setor.value}
                    onChange={(e) => setFormData({ ...formData, setor: e.target.value })}
                    className="w-4 h-4 text-purple-600"
                    required
                  />
                  <span className="text-sm">{setor.label}</span>
                </label>
              ))}
            </div>
            {formData.setor === 'outro' && (
              <Input
                type="text"
                value={formData.setorOutro}
                onChange={(e) => setFormData({ ...formData, setorOutro: e.target.value })}
                placeholder="Especifique o setor"
                className="mt-2"
              />
            )}
          </div>

          {/* 3. Desafios Atuais */}
          <div className="space-y-4">
            <div className="border-l-4 border-green-600 pl-4">
              <h3 className="text-xl font-bold text-gray-900">3. Desafios Atuais em SST</h3>
              <p className="text-sm text-gray-600 mt-1">Quais são seus principais desafios hoje? (Selecione até 3 opções)</p>
            </div>

            <div className="space-y-2">
              {DESAFIOS.map((desafio) => (
                <label key={desafio.value} className="flex items-start gap-3 cursor-pointer p-3 border rounded-lg hover:bg-green-50 transition-colors">
                  <Checkbox
                    checked={formData.desafios.includes(desafio.value)}
                    onCheckedChange={() => handleDesafioToggle(desafio.value)}
                    className="mt-0.5"
                  />
                  <span className="text-sm">{desafio.label}</span>
                </label>
              ))}
            </div>
            {formData.desafios.includes('outro') && (
              <Input
                type="text"
                value={formData.desafiosOutro}
                onChange={(e) => setFormData({ ...formData, desafiosOutro: e.target.value })}
                placeholder="Descreva seu desafio"
                className="mt-2"
              />
            )}
            <p className="text-xs text-gray-500">Selecionados: {formData.desafios.length}/3</p>
          </div>

          {/* 4. Interesse na Plataforma */}
          <div className="space-y-4">
            <div className="border-l-4 border-orange-600 pl-4">
              <h3 className="text-xl font-bold text-gray-900">4. Interesse na Plataforma</h3>
              <p className="text-sm text-gray-600 mt-1">Como pretende utilizar o MA.IA e o HUBSST?</p>
            </div>

            <div className="space-y-2">
              {TIPOS_USO.map((tipo) => (
                <label key={tipo.value} className="flex items-center gap-3 cursor-pointer p-3 border rounded-lg hover:bg-orange-50 transition-colors">
                  <input
                    type="radio"
                    name="tipoUso"
                    value={tipo.value}
                    checked={formData.tipoUso === tipo.value}
                    onChange={(e) => setFormData({ ...formData, tipoUso: e.target.value })}
                    className="w-4 h-4 text-orange-600"
                    required
                  />
                  <span className="text-sm">{tipo.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 5. Tipo de Acesso Desejado */}
          <div className="space-y-4">
            <div className="border-l-4 border-indigo-600 pl-4">
              <h3 className="text-xl font-bold text-gray-900">5. Tipo de Acesso Desejado</h3>
              <p className="text-sm text-gray-600 mt-1">Selecione o tipo de acesso que deseja testar:</p>
            </div>

            <div className="space-y-3">
              {TIPOS_ACESSO.map((tipo) => (
                <label key={tipo.value} className="flex items-start gap-3 cursor-pointer p-4 border-2 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <input
                    type="radio"
                    name="tipoAcesso"
                    value={tipo.value}
                    checked={formData.tipoAcesso === tipo.value}
                    onChange={(e) => setFormData({ ...formData, tipoAcesso: e.target.value })}
                    className="w-4 h-4 text-indigo-600 mt-1"
                    required
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-sm block">{tipo.label}</span>
                    <span className="text-xs text-gray-600">{tipo.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 6. Expectativa */}
          <div className="space-y-4">
            <div className="border-l-4 border-pink-600 pl-4">
              <h3 className="text-xl font-bold text-gray-900">6. Expectativa</h3>
              <p className="text-sm text-gray-600 mt-1">O que você mais gostaria que o MA.IA fizesse por você ou pela sua empresa?</p>
            </div>

            <Textarea
              value={formData.expectativa}
              onChange={(e) => setFormData({ ...formData, expectativa: e.target.value })}
              placeholder="Descreva suas expectativas e necessidades..."
              rows={4}
              className="resize-none"
            />
          </div>

          {/* 7. Autorização e Consentimento */}
          <div className="space-y-4">
            <div className="border-l-4 border-gray-600 pl-4">
              <h3 className="text-xl font-bold text-gray-900">7. Autorização e Acesso</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <Checkbox
                  checked={formData.consentimento}
                  onCheckedChange={(checked) => setFormData({ ...formData, consentimento: checked as boolean })}
                  className="mt-1"
                  required
                />
                <span className="text-sm text-gray-700">
                  <strong>Concordo</strong> e autorizo o contato da equipe HUBSST para apresentação do sistema completo e futuras oportunidades. 
                  Desejo receber novidades e materiais técnicos sobre SST e tecnologia.
                </span>
              </label>
            </div>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Botão de Envio */}
          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full h-14 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                🚀 Quero Participar do Pré-Lançamento e Acessar o MA.IA
              </>
            )}
          </Button>

          {/* Nota de Privacidade */}
          <p className="text-xs text-center text-gray-500">
            Seus dados estão protegidos conforme a LGPD. 
            Leia nossa{' '}
            <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
            {' '}e{' '}
            <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
