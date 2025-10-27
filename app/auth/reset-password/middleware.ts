import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Verifica se tem o cookie de recuperação
  const hasRecoveryCookie = request.cookies.get('auth_recovery')

  // Se não tiver o cookie, redireciona para login
  if (!hasRecoveryCookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/auth/reset-password',
}