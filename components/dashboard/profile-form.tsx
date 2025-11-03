'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera, Loader2 } from 'lucide-react'
import { uploadAvatar, updateCurrentUserProfile } from '@/app/actions/users'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface ProfileFormProps {
  profile: {
    id: string
    email?: string | null
    name: string
    phone: string
    avatar_url: string | null
    created_at?: string
  }
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url)
  const { toast } = useToast()
  const router = useRouter()

  console.log('👤 Profile Form - Avatar URL inicial:', profile.avatar_url)
  console.log('👤 Profile Form - Avatar URL state:', avatarUrl)

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingAvatar(true)
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const result = await uploadAvatar(formData)

      console.log('🖼️ Resultado do upload:', result)

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: result.error,
        })
      } else if (result.avatarUrl) {
        // Adicionar cache bust na URL para forçar reload da imagem
        const newAvatarUrl = result.avatarUrl + '?t=' + Date.now()
        console.log('🖼️ Nova URL do avatar:', newAvatarUrl)
        setAvatarUrl(newAvatarUrl)
        toast({
          title: 'Sucesso',
          description: 'Foto atualizada com sucesso',
        })
        // Dar um tempo para o storage processar antes de refresh
        setTimeout(() => {
          console.log('🔄 Fazendo refresh da página...')
          router.refresh()
        }, 500)
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao fazer upload da foto',
      })
    } finally {
      setIsUploadingAvatar(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdatingProfile(true)

    try {
      const formData = new FormData(e.currentTarget)
      const result = await updateCurrentUserProfile(formData)

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: result.error,
        })
      } else {
        toast({
          title: 'Sucesso',
          description: 'Perfil atualizado com sucesso',
        })
        router.refresh()
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Erro ao atualizar perfil',
      })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : profile.email?.[0]?.toUpperCase() || 'U'

  return (
    <>
      {/* Avatar Card */}
      <Card>
        <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
          <CardDescription>Atualize sua foto de perfil (máx. 2MB)</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-24 w-24" key={avatarUrl || 'no-avatar'}>
            <AvatarImage 
              src={avatarUrl || undefined} 
              alt={profile.name}
              onError={(e) => {
                console.error('❌ Erro ao carregar imagem:', avatarUrl)
              }}
              onLoad={() => {
                console.log('✅ Imagem carregada com sucesso:', avatarUrl)
              }}
            />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <input
              type="file"
              id="avatar-upload"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={isUploadingAvatar}
            />
            <Label htmlFor="avatar-upload">
              <Button
                type="button"
                variant="outline"
                disabled={isUploadingAvatar}
                onClick={() => document.getElementById('avatar-upload')?.click()}
                className="gap-2"
              >
                {isUploadingAvatar ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4" />
                    Alterar Foto
                  </>
                )}
              </Button>
            </Label>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG, GIF ou WEBP (máx. 2MB)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>Atualize suas informações de perfil</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email || ''}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground">
                O email não pode ser alterado
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                defaultValue={profile.name}
                required
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={profile.phone}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="submit"
                disabled={isUpdatingProfile}
                className="gap-2"
              >
                {isUpdatingProfile && <Loader2 className="h-4 w-4 animate-spin" />}
                Salvar Alterações
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
