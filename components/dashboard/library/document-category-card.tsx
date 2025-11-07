'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, FileCheck, Scale, Target, BookOpen, FileSpreadsheet } from 'lucide-react'

interface DocumentCategoryCardProps {
  category: string
  count: number
  onClick: () => void
}

const categoryIcons = {
  NORMA: FileCheck,
  PROCEDIMENTO: FileText,
  LEI: Scale,
  BENCHMARKING: Target,
  REGULAMENTO: BookOpen,
  MANUAL: FileSpreadsheet
}

const categoryLabels = {
  NORMA: 'Normas Regulamentadoras',
  PROCEDIMENTO: 'Procedimentos',
  LEI: 'Leis',
  BENCHMARKING: 'Benchmarking',
  REGULAMENTO: 'Regulamentos',
  MANUAL: 'Manuais'
}

const categoryDescriptions = {
  NORMA: 'NRs do MTE e normas técnicas',
  PROCEDIMENTO: 'Procedimentos operacionais e instruções',
  LEI: 'Legislação trabalhista e previdenciária',
  BENCHMARKING: 'Melhores práticas do mercado',
  REGULAMENTO: 'Regulamentos internos e portarias',
  MANUAL: 'Manuais técnicos e guias'
}

const categoryColors = {
  NORMA: 'bg-blue-100 text-blue-700 border-blue-300',
  PROCEDIMENTO: 'bg-green-100 text-green-700 border-green-300',
  LEI: 'bg-purple-100 text-purple-700 border-purple-300',
  BENCHMARKING: 'bg-orange-100 text-orange-700 border-orange-300',
  REGULAMENTO: 'bg-indigo-100 text-indigo-700 border-indigo-300',
  MANUAL: 'bg-cyan-100 text-cyan-700 border-cyan-300'
}

export function DocumentCategoryCard({ category, count, onClick }: DocumentCategoryCardProps) {
  const Icon = categoryIcons[category as keyof typeof categoryIcons] || FileText
  const label = categoryLabels[category as keyof typeof categoryLabels] || category
  const description = categoryDescriptions[category as keyof typeof categoryDescriptions]
  const colorClass = categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-700'

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all hover:scale-105 border"
      onClick={onClick}
    >
      <CardHeader className="pb-1 pt-3 px-3">
        <div className="flex items-center justify-between gap-2">
          <div className={`p-1.5 rounded ${colorClass}`}>
            <Icon className="h-4 w-4" />
          </div>
          <Badge variant="secondary" className="text-xs font-semibold px-2 py-0">
            {count}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-3 pb-3">
        <CardTitle className="text-sm mb-0.5 leading-tight">{label}</CardTitle>
        <p className="text-xs text-muted-foreground leading-tight">{description}</p>
      </CardContent>
    </Card>
  )
}
