'use client'

import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface DiagnosticSectionsProps {
  assessment: any
}

export function DiagnosticSections({ assessment }: DiagnosticSectionsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-3">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-semibold">Seções & Perguntas</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Esta funcionalidade será implementada nas próximas etapas. 
              Aqui você poderá responder as perguntas do diagnóstico organizadas por seção.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
