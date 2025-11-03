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
  Sparkles
} from 'lucide-react'

interface ActionPlan5W2HProps {
  id: string
  prioridade: 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  prazo: number // dias restantes
  what: string
  why: string
  where: string
  when: string
  who: string
  how: string
  howMuch: string
  referencia: string
  origem: string
  onUpdate?: (id: string, updates: Partial<ActionPlan5W2HProps>) => void
  onDelete?: (id: string) => void
}

interface ActionPlanCardProps extends ActionPlan5W2HProps {
  
}

export function ActionPlanCard({ 
  id,
  prioridade,
  status,
  prazo,
  what,
  why,
  where,
  when,
  who,
  how,
  howMuch,
  referencia,
  origem,
  onUpdate,
  onDelete
}: ActionPlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({ who, how, howMuch })

  const priorityConfig = {
    HIGH: { label: 'Alta', color: 'bg-red-100 text-red-800 border-red-300', icon: '🔴' },
    MEDIUM: { label: 'Média', color: 'bg-orange-100 text-orange-800 border-orange-300', icon: '🟡' },
    LOW: { label: 'Baixa', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: '🟢' }
  }

  const statusConfig = {
    PENDING: { label: 'Não iniciada', color: 'bg-gray-100 text-gray-800', icon: Clock },
    IN_PROGRESS: { label: 'Em andamento', color: 'bg-blue-100 text-blue-800', icon: ClipboardList },
    COMPLETED: { label: 'Concluída', color: 'bg-green-100 text-green-800', icon: CheckCircle }
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
    setEditedData({ who, how, howMuch })
    setIsEditing(false)
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      {/* Cabeçalho */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
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
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
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
          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Por quê?</h4>
              <p className="text-sm text-gray-700 italic">{why}</p>
              <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Gerado por IA
              </p>
            </div>
          </div>

          {/* 3. ONDE (Where) */}
          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <MapPin className="h-5 w-5 text-purple-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-purple-900 mb-1">Onde?</h4>
              <p className="text-sm text-gray-700">{where}</p>
            </div>
          </div>

          {/* 4. QUANDO (When) */}
          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <Calendar className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-orange-900 mb-1">Quando?</h4>
              <p className="text-sm text-gray-700">{when}</p>
            </div>
          </div>

          {/* 5. QUEM (Who) - Editável */}
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
            <User className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-green-900 mb-1">Quem?</h4>
              {isEditing ? (
                <Input
                  value={editedData.who}
                  onChange={(e) => setEditedData({ ...editedData, who: e.target.value })}
                  className="text-sm"
                  placeholder="Responsável pela execução"
                />
              ) : (
                <p className="text-sm text-gray-700">{who}</p>
              )}
            </div>
          </div>

          {/* 6. COMO (How) - Editável */}
          <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
            <ClipboardList className="h-5 w-5 text-indigo-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-indigo-900 mb-1">Como?</h4>
              {isEditing ? (
                <Textarea
                  value={editedData.how}
                  onChange={(e) => setEditedData({ ...editedData, how: e.target.value })}
                  className="text-sm min-h-[80px]"
                  placeholder="Descrição do método de execução"
                />
              ) : (
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{how}</p>
              )}
            </div>
          </div>

          {/* 7. QUANTO (How Much) - Editável */}
          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <DollarSign className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-900 mb-1">Quanto?</h4>
              {isEditing ? (
                <Input
                  value={editedData.howMuch}
                  onChange={(e) => setEditedData({ ...editedData, howMuch: e.target.value })}
                  className="text-sm"
                  placeholder="Custo estimado (ex: R$ 5.000,00)"
                />
              ) : (
                <p className="text-sm text-gray-700 font-semibold">{howMuch}</p>
              )}
            </div>
          </div>

          {/* Rodapé com Referência e Origem */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Referência:</span> {referencia}
              {origem && (
                <span className="ml-2">
                  • <span className="font-medium">Origem:</span> {origem}
                </span>
              )}
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center gap-2 pt-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} className="gap-1">
                  <Save className="h-3 w-3" />
                  Salvar
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel} className="gap-1">
                  <X className="h-3 w-3" />
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="gap-1">
                  <Edit className="h-3 w-3" />
                  Editar
                </Button>
                {onDelete && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(id)}
                    className="gap-1"
                  >
                    <X className="h-3 w-3" />
                    Excluir
                  </Button>
                )}
              </>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
