'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface AssessmentStatusChartProps {
  data: {
    inProgress: number
    completed: number
    pending: number
  }
}

const COLORS = {
  inProgress: '#f59e0b', // amber
  completed: '#10b981', // green
  pending: '#6b7280', // gray
}

export function AssessmentStatusChart({ data }: AssessmentStatusChartProps) {
  const chartData = [
    { name: 'Em Andamento', value: data.inProgress, color: COLORS.inProgress },
    { name: 'Concluídos', value: data.completed, color: COLORS.completed },
    { name: 'Pendentes', value: data.pending, color: COLORS.pending },
  ].filter(item => item.value > 0) // Remove itens com valor 0

  const total = data.inProgress + data.completed + data.pending

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Status dos Diagnósticos</CardTitle>
          <CardDescription>Distribuição por status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Nenhum diagnóstico criado ainda
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status dos Diagnósticos</CardTitle>
        <CardDescription>Distribuição por status</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value} diagnósticos`, '']}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
