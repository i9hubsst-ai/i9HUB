'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  User, 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  Edit, 
  Save,
  X,
  AlertTriangle,
  Target,
  MapPin,
  DollarSign,
  Trash2
} from 'lucide-react'

interface ActionPlanTaskCardProps {
  id: string
  number: string
  what: string
  why: string | null
  where: string | null
  when: string | null
  who: string | null
  how: string | null
  howMuch: string | null
  prioridade: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  prazo: number // dias restantes
  reference: string | null
  onUpdate?: (id: string, updates: any) => void
  onDelete?: (id: string) => void
}

export function ActionPlanCard({ 
  id,
  number,
  what,
  why,
  where,
  when,
  who,
  how,
  howMuch,
  prioridade,
  status,
  prazo,
  reference,
  onUpdate,
  onDelete
}: ActionPlanTaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({ 
    who: who || '', 
    how: how || '', 
    howMuch: howMuch || '' 
  })

  const priorityConfig = {
    HIGH: { label: 'Alta', color: 'bg-red-100 text-red-800 border-red-300', icon: '🔴' },
    MEDIUM: { label: 'Média', color: 'bg-orange-100 text-orange-800 border-orange-300', icon: '🟡' },
    LOW: { label: 'Baixa', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '🟢' }
  }

  const statusConfig = {
    PENDING: { label: 'Não iniciada', color: 'bg-gray-100 text-gray-800', icon: Clock },
    IN_PROGRESS: { label: 'Em andamento', color: 'bg-blue-100 text-blue-800', icon: ClipboardList },
    COMPLETED: { label: 'Concluída', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    CANCELLED: { label: 'Cancelada', color: 'bg-red-100 text-red-800', icon: X }
  }

  const currentPriority = priorityConfig[prioridade]
  const currentStatus = statusConfig[status]
  const StatusIcon = currentStatus.icon

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(id, editedData)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedData({ who: who || '', how: how || '', howMuch: howMuch || '' })
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
    if (onUpdate) {
      onUpdate(id, { status: newStatus })
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      {/* Cabeçalho */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="outline" className="text-xs font-mono font-bold bg-slate-100 text-slate-700 border-slate-300">
                {number}
              </Badge>
              <Badge className={`${currentPriority.color} border text-xs font-semibold`}>
                {currentPriority.icon} {currentPriority.label}
              </Badge>
              <Badge className={`${currentStatus.color} text-xs`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {currentStatus.label}
              </Badge>
              {prazo > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {prazo} dias
                </Badge>
              )}
            </div>
            <CardTitle className="text-base font-semibold text-gray-900 leading-snug">
              {what}
            </CardTitle>
            {reference && (
              <p className="text-xs text-muted-foreground mt-1">
                Ref: {reference}
              </p>
            )}
          </div>
          <div className="flex gap-1 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Corpo Expandido - 5W2H */}
      {isExpanded && (
        <CardContent className="pt-0 space-y-4">
          {/* 1. O QUÊ (What) */}
          <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
            <Target className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-teal-900 mb-1">O quê?</h4>
              <p className="text-sm text-gray-700">{what}</p>
            </div>
          </div>

          {/* 2. POR QUÊ (Why) */}
          {why && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900 mb-1">Por quê?</h4>
                <p className="text-sm text-gray-700">{why}</p>
              </div>
            </div>
          )}

          {/* 3. ONDE (Where) */}
          {where && (
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <MapPin className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-purple-900 mb-1">Onde?</h4>
                <p className="text-sm text-gray-700">{where}</p>
              </div>
            </div>
          )}

          {/* 4. QUANDO (When) */}
          {when && (
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <Calendar className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-orange-900 mb-1">Quando?</h4>
                <p className="text-sm text-gray-700">{when}</p>
              </div>
            </div>
          )}

          {/* 5. QUEM (Who) - EDITÁVEL */}
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <User className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-green-900 mb-1">Quem?</h4>
              {isEditing ? (
                <Input
                  value={editedData.who}
                  onChange={(e) => setEditedData({ ...editedData, who: e.target.value })}
                  placeholder="Responsável pela tarefa"
                  className="mt-1"
                />
              ) : (
                <p className="text-sm text-gray-700">{who || 'Não definido'}</p>
              )}
            </div>
          </div>

          {/* 6. COMO (How) - EDITÁVEL */}
          <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <ClipboardList className="h-5 w-5 text-indigo-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-indigo-900 mb-1">Como?</h4>
              {isEditing ? (
                <Textarea
                  value={editedData.how}
                  onChange={(e) => setEditedData({ ...editedData, how: e.target.value })}
                  placeholder="Método de execução"
                  className="mt-1"
                  rows={3}
                />
              ) : (
                <p className="text-sm text-gray-700">{how || 'Não definido'}</p>
              )}
            </div>
          </div>

          {/* 7. QUANTO (How Much) - EDITÁVEL */}
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <DollarSign className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-900 mb-1">Quanto custa?</h4>
              {isEditing ? (
                <Input
                  value={editedData.howMuch}
                  onChange={(e) => setEditedData({ ...editedData, howMuch: e.target.value })}
                  placeholder="Custo estimado (ex: R$ 5.000,00)"
                  className="mt-1"
                />
              ) : (
                <p className="text-sm text-gray-700">{howMuch || 'Não estimado'}</p>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex gap-2">
              {status === 'PENDING' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleStatusChange('IN_PROGRESS')}
                >
                  Iniciar
                </Button>
              )}
              {status === 'IN_PROGRESS' && (
                <Button 
                  size="sm" 
                  variant="default"
                  onClick={() => handleStatusChange('COMPLETED')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Concluir
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Salvar
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => onDelete && onDelete(id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
