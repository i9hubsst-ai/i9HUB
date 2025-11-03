import { getCurrentUserProfile } from '@/app/actions/users'
import { ProfileForm } from '@/components/dashboard/profile-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function ProfilePage() {
  const result = await getCurrentUserProfile()

  if (result.error || !result.profile) {
    return (
      <div className="p-8">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{result.error || 'Erro ao carregar perfil'}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      {/* Back button */}
      <div>
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para Dashboard
          </Button>
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-primary">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e foto de perfil</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        <ProfileForm profile={result.profile} />
      </div>
    </div>
  )
}
