'use client'

import { useState } from 'react'
import { User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ProfileForm } from './profile-form'

interface ProfileDialogProps {
  profile: {
    id: string
    email?: string | null
    name: string
    phone: string
    avatar_url: string | null
    created_at?: string
  }
}

export function ProfileDialog({ profile }: ProfileDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen(true)}
        className="w-full justify-start gap-2"
      >
        <User className="h-4 w-4" />
        Meu Perfil
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Meu Perfil</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <ProfileForm profile={profile} onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
