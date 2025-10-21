'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DiagnosticAuditProps {
  assessment: any
}

export function DiagnosticAudit({ assessment }: DiagnosticAuditProps) {
  // Mock audit log data
  const auditLogs = [
    {
      id: '1',
      user: 'Ana Beatriz',
      action: 'Criou o diagnóstico',
      details: 'Diagnóstico Anual de Maturidade SST 2024',
      timestamp: '01/05/2024 09:00',
    },
    {
      id: '2',
      user: 'Carlos Silva',
      action: 'Respondeu à pergunta',
      details: 'Seção: Governança, Pergunta: q1-1, Resposta: 4',
      timestamp: '10/05/2024 14:20',
    },
    {
      id: '3',
      user: 'Mariana Costa',
      action: 'Adicionou evidência',
      details: 'Pergunta: q1-1, Arquivo: ata_reuniao.pdf',
      timestamp: '10/05/2024 14:22',
    },
    {
      id: '4',
      user: 'IA (Sistema)',
      action: 'Gerou achado (NC)',
      details: 'Achado find-3 gerado para pergunta q5-1.',
      timestamp: '12/05/2024 11:05',
    },
    {
      id: '5',
      user: 'João Pereira',
      action: 'Gerou plano de ação com IA',
      details: 'Plano de ação para 3 achados.',
      timestamp: '15/05/2024 10:00',
    },
    {
      id: '6',
      user: 'João Pereira',
      action: 'Aprovou tarefa do plano',
      details: 'Tarefa: Agendar treinamento da brigada.',
      timestamp: '15/05/2024 10:05',
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Log de Auditoria</CardTitle>
          <p className="text-sm text-muted-foreground">
            Histórico de todas as ações realizadas neste diagnóstico.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Usuário</th>
                  <th className="text-left p-3 text-sm font-medium">Ação</th>
                  <th className="text-left p-3 text-sm font-medium">Detalhes</th>
                  <th className="text-right p-3 text-sm font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 text-sm font-medium">{log.user}</td>
                    <td className="p-3 text-sm">{log.action}</td>
                    <td className="p-3 text-sm text-muted-foreground">{log.details}</td>
                    <td className="p-3 text-sm text-right text-muted-foreground">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
