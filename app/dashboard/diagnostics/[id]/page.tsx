import { notFound } from 'next/navigation'
import { getAssessmentById } from '@/app/actions/assessments'
import { DiagnosticTabs } from '@/components/dashboard/diagnostic-tabs'
import { BackToDiagnostics } from '@/components/dashboard/back-to-diagnostics'

export const revalidate = 0

export default async function DiagnosticDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const result = await getAssessmentById(id)

  if (result.error || !result.assessment) {
    notFound()
  }

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <BackToDiagnostics />
        <h1 className="text-3xl font-bold text-primary">
          {result.assessment.title}
        </h1>
      </div>

      <DiagnosticTabs assessment={result.assessment} />
    </div>
  )
}
