import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return Response.json({ isAdmin: false })
    }

    const isAdmin = await isPlatformAdmin(user.id)
    
    return Response.json({ isAdmin })
  } catch (error) {
    console.error('Erro ao verificar admin:', error)
    return Response.json({ isAdmin: false })
  }
}