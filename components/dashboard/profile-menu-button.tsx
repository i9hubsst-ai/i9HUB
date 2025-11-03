'use client'

import { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ProfileForm } from './profile-form'
import { getCurrentUserProfile } from '@/app/actions/users'
import { Loader2 } from 'lucide-react'

export function ProfileMenuButton() {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const loadProfile = async () => {
    setLoading(true)
    const result = await getCurrentUserProfile()
    if (result.success && result.profile) {
      setProfile(result.profile)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (open && !profile) {
      loadProfile()
    }
  }, [open])

  return (
    <>
      <DropdownMenuItem onSelect={(e) => {
        e.preventDefault()
        setOpen(true)
      }}>
        <User className="mr-2 h-4 w-4" />
        <span>Meu Perfil</span>
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Meu Perfil</DialogTitle>
          </DialogHeader>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : profile ? (
            <div className="space-y-4 pb-4">
              <ProfileForm profile={profile} onSuccess={() => {
                setOpen(false)
                setProfile(null) // Reset para recarregar na próxima abertura
              }} />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
