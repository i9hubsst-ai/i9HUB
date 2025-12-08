'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react'
import { uploadCompanyLogo, deleteCompanyLogo } from '@/app/actions/company-logo'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

interface CompanyLogoUploadProps {
  companyId: string
  currentLogo?: string | null
}

export function CompanyLogoUpload({ companyId, currentLogo }: CompanyLogoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentLogo || null)
  const router = useRouter()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview local
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload
    setIsUploading(true)
    const formData = new FormData()
    formData.append('logo', file)

    const result = await uploadCompanyLogo(companyId, formData)
    
    if (result.error) {
      alert(result.error)
      setPreview(currentLogo || null)
    } else {
      alert('Logo atualizado com sucesso!')
      router.refresh()
    }
    
    setIsUploading(false)
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteCompanyLogo(companyId)
    
    if (result.error) {
      alert(result.error)
    } else {
      setPreview(null)
      alert('Logo removido com sucesso!')
      router.refresh()
    }
    
    setIsDeleting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logo da Empresa</CardTitle>
        <CardDescription>
          Faça upload da logo da empresa (JPG, PNG, WEBP ou SVG, máx 5MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          {/* Preview */}
          <div className="w-48 h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center overflow-hidden bg-muted/5">
            {preview ? (
              <Image
                src={preview}
                alt="Logo da empresa"
                width={192}
                height={192}
                className="object-contain w-full h-full p-2"
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Sem logo</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Label htmlFor="logo-upload">
              <Button
                type="button"
                variant="outline"
                disabled={isUploading}
                onClick={() => document.getElementById('logo-upload')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Enviando...' : preview ? 'Alterar Logo' : 'Fazer Upload'}
              </Button>
            </Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/svg+xml"
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
                      Tem certeza que deseja remover a logo da empresa? Esta ação não pode ser desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Confirmar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          <p className="text-xs text-muted-foreground text-center max-w-md">
            A logo será exibida na listagem de empresas e no topo do painel de gestão
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
