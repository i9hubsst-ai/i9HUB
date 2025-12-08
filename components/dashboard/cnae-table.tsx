'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Search, Edit, Trash2, Loader2 } from 'lucide-react'
import { getAllCNAEs } from '@/app/actions/companies'
import { deleteCNAE } from '@/app/actions/cnaes'
import Link from 'next/link'

interface CNAE {
  id: string
  codigo: string
  descricao: string
  grauRisco: number
  ativo: boolean
}

const riskColors: Record<number, { bg: string; text: string; label: string }> = {
  1: { bg: 'bg-green-100', text: 'text-green-800', label: 'Leve' },
  2: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Médio' },
  3: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Grave' },
  4: { bg: 'bg-red-100', text: 'text-red-800', label: 'Muito Grave' },
}

export function CNAETable() {
  const [cnaes, setCNAEs] = useState<CNAE[]>([])
  const [filteredCNAEs, setFilteredCNAEs] = useState<CNAE[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    loadCNAEs()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = cnaes.filter(
        cnae =>
          cnae.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cnae.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCNAEs(filtered)
    } else {
      setFilteredCNAEs(cnaes)
    }
  }, [searchTerm, cnaes])

  async function loadCNAEs() {
    setLoading(true)
    try {
      const result = await getAllCNAEs()
      if (result.success && result.cnaes) {
        setCNAEs(result.cnaes)
        setFilteredCNAEs(result.cnaes)
      }
    } catch (error) {
      console.error('Erro ao carregar CNAEs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return

    setDeleting(true)
    try {
      const result = await deleteCNAE(deleteId)
      if (result.success) {
        await loadCNAEs()
        setDeleteId(null)
      } else {
        alert(result.error || 'Erro ao deletar CNAE')
      }
    } catch (error) {
      console.error('Erro ao deletar CNAE:', error)
      alert('Erro ao deletar CNAE')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Busca */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por código ou descrição..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-gray-500">
          {filteredCNAEs.length} {filteredCNAEs.length === 1 ? 'CNAE' : 'CNAEs'}
        </div>
      </div>

      {/* Tabela */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="w-[150px]">Grau de Risco</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px] text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCNAEs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  {searchTerm ? 'Nenhum CNAE encontrado' : 'Nenhum CNAE cadastrado'}
                </TableCell>
              </TableRow>
            ) : (
              filteredCNAEs.map((cnae) => (
                <TableRow key={cnae.id}>
                  <TableCell className="font-medium">{cnae.codigo}</TableCell>
                  <TableCell>{cnae.descricao}</TableCell>
                  <TableCell>
                    <Badge className={`${riskColors[cnae.grauRisco].bg} ${riskColors[cnae.grauRisco].text}`}>
                      Grau {cnae.grauRisco}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={cnae.ativo ? 'default' : 'secondary'}>
                      {cnae.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/cadastros/cnaes/${cnae.id}/editar`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(cnae.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este CNAE? Esta ação não pode ser desfeita.
              {cnaes.find(c => c.id === deleteId) && (
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="font-medium">{cnaes.find(c => c.id === deleteId)?.codigo}</p>
                  <p className="text-sm">{cnaes.find(c => c.id === deleteId)?.descricao}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
