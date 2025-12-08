'use client'

import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Search, X, Plus, Shield, AlertCircle, ExternalLink } from 'lucide-react'
import { getAllCNAEs } from '@/app/actions/companies'
import Link from 'next/link'

interface CNAE {
  id: string
  codigo: string
  descricao: string
  grauRisco: number
  ativo: boolean
}

interface CNAEFormTabProps {
  companyId: string
  initialCNAEs?: Array<{ cnaeId: string; isPrincipal: boolean }>
  onCNAEsChange?: (cnaeIds: string[], principalCnaeId: string | null) => void
}

export function CNAEFormTab({ companyId, initialCNAEs = [], onCNAEsChange }: CNAEFormTabProps) {
  const [allCNAEs, setAllCNAEs] = useState<CNAE[]>([])
  const [selectedCNAEs, setSelectedCNAEs] = useState<CNAE[]>([])
  const [principalCnaeId, setPrincipalCnaeId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCNAEs, setFilteredCNAEs] = useState<CNAE[]>([])
  const [loading, setLoading] = useState(true)

  const riskColors: Record<number, { bg: string; text: string; label: string }> = {
    1: { bg: 'bg-green-100', text: 'text-green-800', label: 'Leve' },
    2: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Médio' },
    3: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Grave' },
    4: { bg: 'bg-red-100', text: 'text-red-800', label: 'Muito Grave' },
  }

  useEffect(() => {
    loadCNAEs()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = allCNAEs.filter(
        cnae =>
          !selectedCNAEs.find(sc => sc.id === cnae.id) &&
          (cnae.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cnae.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredCNAEs(filtered.slice(0, 10))
    } else {
      setFilteredCNAEs([])
    }
  }, [searchTerm, allCNAEs, selectedCNAEs])

  useEffect(() => {
    if (onCNAEsChange) {
      const cnaeIds = selectedCNAEs.map(c => c.id)
      onCNAEsChange(cnaeIds, principalCnaeId || null)
    }
  }, [selectedCNAEs, principalCnaeId])

  async function loadCNAEs() {
    setLoading(true)
    try {
      const result = await getAllCNAEs()
      if (result.success && result.cnaes) {
        setAllCNAEs(result.cnaes)
      }
    } catch (error) {
      console.error('Erro ao carregar CNAEs:', error)
    } finally {
      setLoading(false)
    }
  }

  function addCNAE(cnae: CNAE) {
    setSelectedCNAEs([...selectedCNAEs, cnae])
    setSearchTerm('')
    setFilteredCNAEs([])
    
    // Se é o primeiro CNAE, marcar como principal
    if (selectedCNAEs.length === 0) {
      setPrincipalCnaeId(cnae.id)
    }
  }

  function removeCNAE(cnaeId: string) {
    setSelectedCNAEs(selectedCNAEs.filter(c => c.id !== cnaeId))
    
    // Se remover o principal, limpar
    if (principalCnaeId === cnaeId) {
      setPrincipalCnaeId('')
    }
  }

  const principalCnae = selectedCNAEs.find(c => c.id === principalCnaeId)

  if (loading) {
    return <div className="text-center p-8 text-gray-500">Carregando CNAEs...</div>
  }

  return (
    <div className="space-y-6">
      {/* Informação do Grau de Risco */}
      {principalCnae && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">CNAE Principal</p>
              <p className="text-xs text-blue-700">
                {principalCnae.codigo} - {principalCnae.descricao}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <Badge className={`${riskColors[principalCnae.grauRisco].bg} ${riskColors[principalCnae.grauRisco].text}`}>
                Grau {principalCnae.grauRisco} - {riskColors[principalCnae.grauRisco].label}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Adicionar CNAE */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Adicionar CNAE</Label>
          <Link href="/dashboard/cadastros/cnaes/novo" target="_blank">
            <Button type="button" variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Cadastrar Novo CNAE
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por código ou descrição do CNAE..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Lista de sugestões */}
          {filteredCNAEs.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-64 overflow-y-auto">
              {filteredCNAEs.map(cnae => (
                <button
                  key={cnae.id}
                  type="button"
                  onClick={() => addCNAE(cnae)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{cnae.codigo}</p>
                      <p className="text-xs text-gray-600">{cnae.descricao}</p>
                    </div>
                    <Badge className={`${riskColors[cnae.grauRisco].bg} ${riskColors[cnae.grauRisco].text} text-xs`}>
                      Grau {cnae.grauRisco}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {/* Se não encontrar, sugerir cadastro */}
          {searchTerm && filteredCNAEs.length === 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Nenhum CNAE encontrado com "{searchTerm}"
                </p>
                <Link href="/dashboard/cadastros/cnaes/novo" target="_blank">
                  <Button type="button" size="sm" variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Cadastrar Novo CNAE
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabela de CNAEs Selecionados */}
      {selectedCNAEs.length > 0 ? (
        <div className="space-y-2">
          <Label>CNAEs da Empresa ({selectedCNAEs.length})</Label>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-[120px]">Grau de Risco</TableHead>
                  <TableHead className="w-[100px]">Principal</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedCNAEs.map(cnae => (
                  <TableRow key={cnae.id}>
                    <TableCell className="font-medium">{cnae.codigo}</TableCell>
                    <TableCell className="text-sm">{cnae.descricao}</TableCell>
                    <TableCell>
                      <Badge className={`${riskColors[cnae.grauRisco].bg} ${riskColors[cnae.grauRisco].text}`}>
                        Grau {cnae.grauRisco}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant={principalCnaeId === cnae.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPrincipalCnaeId(cnae.id)}
                      >
                        {principalCnaeId === cnae.id ? '✓ Principal' : 'Marcar'}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCNAE(cnae.id)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {!principalCnaeId && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              <AlertCircle className="h-4 w-4" />
              <span>Selecione qual é o CNAE principal da empresa</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed">
          <p className="text-gray-500">Nenhum CNAE adicionado ainda</p>
          <p className="text-sm text-gray-400 mt-1">Use a busca acima para adicionar CNAEs</p>
        </div>
      )}
    </div>
  )
}
