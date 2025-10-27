import KnowledgeBaseUpload from '@/components/dashboard/knowledge-base-upload'

export default function KnowledgeBasePage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">
        Base de Conhecimento
      </h1>
      
      <div className="grid gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Upload de Documentos
          </h2>
          <KnowledgeBaseUpload />
        </div>
      </div>
    </div>
  )
}