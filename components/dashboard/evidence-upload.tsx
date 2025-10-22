'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, File, Image as ImageIcon, FileText, Loader2 } from 'lucide-react'
import { uploadEvidence, deleteEvidence } from '@/app/actions/evidence'

interface Evidence {
  id: string
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
  uploadedAt: Date
}

interface EvidenceUploadProps {
  assessmentId: string
  answerId: string
  existingEvidences?: Evidence[]
  disabled?: boolean
}

export function EvidenceUpload({ 
  assessmentId, 
  answerId, 
  existingEvidences = [],
  disabled = false 
}: EvidenceUploadProps) {
  const [evidences, setEvidences] = useState<Evidence[]>(existingEvidences)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="h-4 w-4" />
    }
    if (mimeType === 'application/pdf') {
      return <FileText className="h-4 w-4" />
    }
    return <File className="h-4 w-4" />
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setUploading(true)
    setError('')

    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadEvidence(assessmentId, answerId, formData)

    if (result.error) {
      setError(result.error)
    } else if (result.evidence) {
      setEvidences([...evidences, result.evidence as Evidence])
    }

    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (evidenceId: string) => {
    if (!confirm('Deseja realmente excluir esta evidência?')) return

    const result = await deleteEvidence(evidenceId, assessmentId)

    if (result.error) {
      setError(result.error)
    } else {
      setEvidences(evidences.filter(e => e.id !== evidenceId))
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Evidências (Fotos/Documentos)
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || uploading}
          className="gap-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="h-3 w-3" />
              Upload
            </>
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      {evidences.length > 0 && (
        <div className="space-y-2">
          {evidences.map((evidence) => (
            <div
              key={evidence.id}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 text-xs"
            >
              {getFileIcon(evidence.mimeType)}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{evidence.fileName}</p>
                <p className="text-gray-500">{formatFileSize(evidence.fileSize)}</p>
              </div>
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = evidence.fileUrl
                  link.download = evidence.fileName
                  if (evidence.mimeType.startsWith('image/') || evidence.mimeType === 'application/pdf') {
                    const win = window.open()
                    if (win) {
                      win.document.write(`
                        <html>
                          <head>
                            <title>${evidence.fileName}</title>
                            <style>
                              body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f3f4f6; }
                              img { max-width: 100%; max-height: 100vh; object-fit: contain; }
                              iframe { width: 100vw; height: 100vh; border: none; }
                            </style>
                          </head>
                          <body>
                            ${evidence.mimeType.startsWith('image/') 
                              ? `<img src="${evidence.fileUrl}" alt="${evidence.fileName}" />`
                              : `<iframe src="${evidence.fileUrl}"></iframe>`
                            }
                          </body>
                        </html>
                      `)
                    }
                  } else {
                    link.click()
                  }
                }}
                className="text-teal-600 hover:text-teal-700 underline text-xs font-medium"
              >
                Ver
              </button>
              {!disabled && (
                <button
                  onClick={() => handleDelete(evidence.id)}
                  className="text-red-600 hover:text-red-700 p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500">
        Formatos aceitos: Imagens, PDF, Word, Excel (máx. 10MB)
      </p>
    </div>
  )
}
