'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Tag, Clock } from 'lucide-react'
import { DiagnosticResume } from './diagnostic-resume'
import { DiagnosticSections } from './diagnostic-sections'
import { DiagnosticFindings } from './diagnostic-findings'
import { DiagnosticActionPlan5W2H } from './diagnostic-action-plan-5w2h'
import { DiagnosticEvidence } from './diagnostic-evidence'
import { DiagnosticAudit } from './diagnostic-audit'

interface DiagnosticTabsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assessment: any
}

const tabs = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'sections', label: 'Perguntas & Respostas' },
  { id: 'achados', label: 'Achados' },
  { id: 'plano', label: 'Plano de Ação' },
  { id: 'evidencias', label: 'Evidências' },
  { id: 'auditoria', label: 'Auditoria' },
]

const statusConfig: Record<string, { label: string; className: string }> = {
  DRAFT: { label: 'Rascunho', className: 'bg-gray-100 text-gray-800' },
  IN_PROGRESS: { label: 'Em andamento', className: 'bg-blue-100 text-blue-800' },
  SUBMITTED: { label: 'Submetido', className: 'bg-yellow-100 text-yellow-800' },
  SCORED: { label: 'Pontuado', className: 'bg-purple-100 text-purple-800' },
  COMPLETED: { label: 'Concluído', className: 'bg-green-100 text-green-800' },
}

export function DiagnosticTabs({ assessment }: DiagnosticTabsProps) {
  const [activeTab, setActiveTab] = useState('resumo')
  
  const status = statusConfig[assessment.status] || statusConfig.DRAFT

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="border-b border-border">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary hover:border-muted-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Info Card */}
      {activeTab === 'resumo' && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Autor</p>
                  <p className="font-medium">
                    {assessment.createdByUser?.name || assessment.createdByUser?.email || 'Usuário'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Criado em</p>
                  <p className="font-medium">
                    {new Date(assessment.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Atualizado em</p>
                  <p className="font-medium">
                    {new Date(assessment.updatedAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={status.className}>{status.label}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'resumo' && <DiagnosticResume assessment={assessment} />}
        {activeTab === 'sections' && <DiagnosticSections assessment={assessment} />}
        {activeTab === 'achados' && <DiagnosticFindings assessment={assessment} />}
        {activeTab === 'plano' && <DiagnosticActionPlan5W2H assessment={assessment} />}
        {activeTab === 'evidencias' && <DiagnosticEvidence assessment={assessment} />}
        {activeTab === 'auditoria' && <DiagnosticAudit assessment={assessment} />}
      </div>
    </div>
  )
}
