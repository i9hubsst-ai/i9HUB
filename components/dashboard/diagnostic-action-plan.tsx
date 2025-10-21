'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface DiagnosticActionPlanProps {
  assessment: any
}

export function DiagnosticActionPlan({ assessment }: DiagnosticActionPlanProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold">Plano de Ação</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Será implementado nas próximas etapas. 
              Aqui você poderá gerar e aprovar sugestões de ações da IA baseadas nos achados do diagnóstico.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
