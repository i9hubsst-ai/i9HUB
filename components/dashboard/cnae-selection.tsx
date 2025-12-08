'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2, Search, Shield, AlertCircle } from 'lucide-react'
import { getAllCNAEs, getCompanyCNAEs, updateCompanyCNAEs } from '@/app/actions/companies'

interface CNAE {
  id: string
  codigo: string
  descricao: string
  grauRisco: number
  ativo: boolean
}

interface CompanyCNAE {
  id: string
  companyId: string
  cnaeId: string
  isPrincipal: boolean
  cnae: CNAE
}

interface CNAESelectionProps {
  companyId: string
  onUpdate?: () => void
}

export function CNAESelection({ companyId, onUpdate }: CNAESelectionProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [allCNAEs, setAllCNAEs] = useState<CNAE[]>([])
  const [selectedCNAEs, setSelectedCNAEs] = useState<Set<string>>(new Set())
  const [principalCnaeId, setPrincipalCnaeId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const riskColors: Record<number, { bg: string; text: string; label: string }> = {
    1: { bg: 'bg-green-100', text: 'text-green-800', label: 'Leve' },
    2: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Médio' },
    3: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Grave' },
    4: { bg: 'bg-red-100', text: 'text-red-800', label: 'Muito Grave' },
  }

  useEffect(() => {
    loadData()
  }, [companyId])

  async function loadData() {
    setLoading(true)
    try {
      const [cnaesResult, companyCnaesResult] = await Promise.all([
        getAllCNAEs(),
        getCompanyCNAEs(companyId)
      ])

      if (cnaesResult.success && cnaesResult.cnaes) {
        setAllCNAEs(cnaesResult.cnaes)
      }

      if (companyCnaesResult.success && companyCnaesResult.companyCnaes) {
        const cnaeIds = companyCnaesResult.companyCnaes.map((cc: CompanyCNAE) => cc.cnaeId) as string[]
        const selected = new Set<string>(cnaeIds)
        setSelectedCNAEs(selected)
        
        const principal = companyCnaesResult.companyCnaes.find((cc: CompanyCNAE) => cc.isPrincipal)
        if (principal) {
          setPrincipalCnaeId(principal.cnaeId)
        }
      }
    } catch (err) {
      console.error(err)
      setError('Erro ao carregar CNAEs')
    } finally {
      setLoading(false)
    }
  }

  function toggleCNAE(cnaeId: string) {
    const newSelected = new Set(selectedCNAEs)
    if (newSelected.has(cnaeId)) {
      newSelected.delete(cnaeId)
      // Se remover o CNAE principal, limpar a seleção
      if (principalCnaeId === cnaeId) {
        setPrincipalCnaeId('')
      }
    } else {
      newSelected.add(cnaeId)
      // Se é o primeiro, marcar como principal
      if (newSelected.size === 1) {
        setPrincipalCnaeId(cnaeId)
      }
    }
    setSelectedCNAEs(newSelected)
  }

  async function handleSubmit() {
    if (selectedCNAEs.size === 0) {
      setError('Selecione pelo menos um CNAE')
      return
    }

    if (!principalCnaeId) {
      setError('Selecione o CNAE principal')
      return
    }

    setSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await updateCompanyCNAEs(
        companyId,
        Array.from(selectedCNAEs),
        principalCnaeId
      )

      if (result.error) {
        setError(result.error)
      } else {
        setSuccess(`CNAEs atualizados! Grau de risco da empresa: ${result.grauRisco}`)
        if (onUpdate) {
          onUpdate()
        }
      }
    } catch (err) {
      console.error(err)
      setError('Erro ao salvar CNAEs')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredCNAEs = allCNAEs.filter(cnae =>
    cnae.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cnae.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const groupedCNAEs = filteredCNAEs.reduce((acc, cnae) => {
    if (!acc[cnae.grauRisco]) {
      acc[cnae.grauRisco] = []
    }
    acc[cnae.grauRisco].push(cnae)
    return acc
  }, {} as Record<number, CNAE[]>)

  const selectedCNAEsList = allCNAEs.filter(cnae => selectedCNAEs.has(cnae.id))
  const principalCnae = allCNAEs.find(cnae => cnae.id === principalCnaeId)

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Informações e CNAE Principal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            CNAE Principal e Grau de Risco
          </CardTitle>
          <CardDescription>
            O CNAE principal determina automaticamente o grau de risco da empresa conforme NR-04
          </CardDescription>
        </CardHeader>
        <CardContent>
          {principalCnae ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-blue-900">{principalCnae.codigo}</p>
                  <p className="text-sm text-blue-700">{principalCnae.descricao}</p>
                </div>
                <Badge className={`${riskColors[principalCnae.grauRisco].bg} ${riskColors[principalCnae.grauRisco].text} px-3 py-1`}>
                  Grau {principalCnae.grauRisco} - {riskColors[principalCnae.grauRisco].label}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Selecione CNAEs e defina qual é o principal para determinar o grau de risco
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CNAEs Selecionados */}
      {selectedCNAEsList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>CNAEs Selecionados ({selectedCNAEsList.length})</CardTitle>
            <CardDescription>
              Marque qual é o CNAE principal da empresa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={principalCnaeId} onValueChange={setPrincipalCnaeId}>
              <div className="space-y-2">
                {selectedCNAEsList.map(cnae => (
                  <div
                    key={cnae.id}
                    className={`flex items-center justify-between p-3 border rounded-lg ${
                      cnae.id === principalCnaeId ? 'bg-blue-50 border-blue-300' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <RadioGroupItem value={cnae.id} id={`principal-${cnae.id}`} />
                      <Label htmlFor={`principal-${cnae.id}`} className="flex-1 cursor-pointer">
                        <span className="font-medium">{cnae.codigo}</span>
                        <span className="text-sm text-gray-600 ml-2">{cnae.descricao}</span>
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${riskColors[cnae.grauRisco].bg} ${riskColors[cnae.grauRisco].text}`}>
                        Grau {cnae.grauRisco}
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCNAE(cnae.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Busca e Seleção */}
      <Card>
        <CardHeader>
          <CardTitle>Selecionar CNAEs</CardTitle>
          <CardDescription>
            Busque e selecione todos os CNAEs que a empresa possui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Buscar por código ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[1, 2, 3, 4].map(grau => {
                const cnaes = groupedCNAEs[grau] || []
                if (cnaes.length === 0) return null

                return (
                  <div key={grau} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={`${riskColors[grau].bg} ${riskColors[grau].text}`}>
                        Grau {grau} - {riskColors[grau].label}
                      </Badge>
                      <span className="text-sm text-gray-500">({cnaes.length})</span>
                    </div>
                    <div className="space-y-1 pl-4">
                      {cnaes.map(cnae => (
                        <div
                          key={cnae.id}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded"
                        >
                          <Checkbox
                            id={`cnae-${cnae.id}`}
                            checked={selectedCNAEs.has(cnae.id)}
                            onCheckedChange={() => toggleCNAE(cnae.id)}
                          />
                          <Label
                            htmlFor={`cnae-${cnae.id}`}
                            className="flex-1 cursor-pointer text-sm"
                          >
                            <span className="font-medium">{cnae.codigo}</span>
                            <span className="text-gray-600 ml-2">{cnae.descricao}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mensagens */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={submitting || selectedCNAEs.size === 0}
          size="lg"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar CNAEs'
          )}
        </Button>
      </div>
    </div>
  )
}
