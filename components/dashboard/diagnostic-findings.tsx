'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'

interface DiagnosticFindingsProps {
  assessment: any
}

export function DiagnosticFindings({ assessment }: DiagnosticFindingsProps) {
  // Mock findings data
  const findings = [
    {
      id: '1',
      severity: 'HIGH',
      severityLabel: 'Alta',
      severityClass: 'bg-red-600 text-white',
      title: 'Não Conformidade',
      reference: 'A CIPA está devidamente constituída e atuante?',
      description: 'Reuniões da CIPA estão ocorrendo de forma irregular, sem registro em ata.',
      section: 'CIPA e Participação dos Trabalhadores',
    },
    {
      id: '2',
      severity: 'MEDIUM',
      severityLabel: 'Média',
      severityClass: 'bg-yellow-600 text-white',
      title: 'Oportunidade',
      reference: 'O inventário de riscos está completo e atualizado?',
      description: 'O inventário de riscos não inclui os novos equipamentos adquiridos no último trimestre.',
      section: 'PGR e Gerenciamento de Riscos',
    },
    {
      id: '3',
      severity: 'HIGH',
      severityLabel: 'Alta',
      severityClass: 'bg-red-600 text-white',
      title: 'Não Conformidade',
      reference: 'A brigada de emergência está treinada?',
      description: 'O treinamento da brigada de emergência está vencido há mais de 6 meses.',
      section: 'Preparação para Emergências',
    },
  ]

  return (
    <div className="space-y-4">
      {findings.map((finding) => (
        <Card key={finding.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Badge className={finding.severityClass}>
                    {finding.severityLabel}
                  </Badge>
                  <h3 className="font-semibold">{finding.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Ref: {finding.reference}
                </p>
                <CardTitle className="text-base">{finding.description}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Seção: {finding.section}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
