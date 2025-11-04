'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface FindingsCategoryChartProps {
  data: Array<{
    category: string
    count: number
    severity: 'HIGH' | 'MEDIUM' | 'LOW'
  }>
}

const SEVERITY_COLORS = {
  HIGH: '#ef4444', // red
  MEDIUM: '#f59e0b', // amber
  LOW: '#eab308', // yellow
}

export function FindingsCategoryChart({ data }: FindingsCategoryChartProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Achados por Categoria</CardTitle>
          <CardDescription>Top 5 categorias com mais achados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Nenhum achado registrado ainda
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achados por Categoria</CardTitle>
        <CardDescription>Top 5 categorias com mais achados</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              type="category" 
              dataKey="category" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              width={120}
            />
            <Tooltip 
              formatter={(value: number) => [`${value} achados`, 'Total']}
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="count" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={SEVERITY_COLORS[entry.severity] || 'hsl(var(--primary))'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
