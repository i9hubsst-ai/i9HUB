'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Upload, Trash2, User } from 'lucide-react'
import { uploadEmployeePhoto, deleteEmployeePhoto } from '@/app/actions/employee-photo'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface EmployeePhotoUploadProps {
  employeeId: string
  currentPhoto?: string | null
  employeeName: string
}

export function EmployeePhotoUpload({ employeeId, currentPhoto, employeeName }: EmployeePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentPhoto || null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    console.log('[Component] Arquivo selecionado:', file.name, file.type, file.size)

    // Preview local
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setIsUploading(true)
    const formData = new FormData()
    formData.append('photo', file)

    console.log('[Component] Iniciando upload para funcionário:', employeeId)
    const result = await uploadEmployeePhoto(employeeId, formData)
    console.log('[Component] Resultado:', result)
    
    if (result.error) {
      console.error('[Component] Erro no upload:', result.error)
      setError(result.error)
      setPreview(currentPhoto || null)
      setIsUploading(false)
    } else if (result.photoUrl) {
      console.log('[Component] Upload bem-sucedido, URL:', result.photoUrl)
      setPreview(result.photoUrl) // Atualizar preview com a URL real
      setIsUploading(false)
      // Não fazer refresh automático para evitar erros
    } else {
      setError('Upload realizado mas URL não retornada')
      setIsUploading(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    setError(null)
    const result = await deleteEmployeePhoto(employeeId)
    
    if (result.error) {
      setError(result.error)
      setIsDeleting(false)
    } else {
      setPreview(null)
      setIsDeleting(false)
      // Não fazer refresh automático para evitar erros
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foto do Funcionário</CardTitle>
        <CardDescription>
          Faça upload da foto de {employeeName} (JPG, PNG ou WEBP, máx 5MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mensagem de erro */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          {/* Preview */}
          <div className="w-48 h-48 border-2 border-dashed border-muted-foreground/25 rounded-full flex items-center justify-center overflow-hidden bg-muted/5">
            {preview ? (
              <Image
                src={preview}
                alt={`Foto de ${employeeName}`}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Sem foto</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Label htmlFor="photo-upload">
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  document.getElementById('photo-upload')?.click()
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Enviando...' : preview ? 'Alterar Foto' : 'Fazer Upload'}
              </Button>
            </Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {preview && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? 'Removendo...' : 'Remover'}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar remoção</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja remover a foto de {employeeName}? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? 'Removendo...' : 'Remover'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
