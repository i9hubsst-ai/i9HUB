import { KnowledgeBaseClient } from './knowledge-base-client'
import { getKnowledgeDocuments, getDocumentCategoryCounts } from '@/app/actions/knowledge'
import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function KnowledgeBasePage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  const isAdmin = await isPlatformAdmin(user.id)

  const [documentsResult, countsResult] = await Promise.all([
    getKnowledgeDocuments(),
    getDocumentCategoryCounts()
  ])

  const documents = documentsResult.success ? documentsResult.documents : []
  const counts = countsResult.success ? countsResult.counts : {}

  return (
    <KnowledgeBaseClient 
      documents={documents || []} 
      categoryCounts={counts || {}}
      isAdmin={isAdmin}
    />
  )
}