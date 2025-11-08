/**
 * Lead Session Service
 * Gerencia sessões temporárias para leads que acessam o chat MA.IA
 * sem necessidade de login completo
 */

const LEAD_SESSION_KEY = 'maia_lead_session'

export interface LeadSession {
  leadId: string
  email: string
  name: string
  createdAt: string
  expiresAt: string
}

/**
 * Cria uma sessão de lead após cadastro no formulário
 */
export function createLeadSession(leadId: string, email: string, name: string): LeadSession {
  const session: LeadSession = {
    leadId,
    email,
    name,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(LEAD_SESSION_KEY, JSON.stringify(session))
  }

  return session
}

/**
 * Recupera a sessão atual do lead
 */
export function getLeadSession(): LeadSession | null {
  if (typeof window === 'undefined') return null

  try {
    const sessionStr = localStorage.getItem(LEAD_SESSION_KEY)
    if (!sessionStr) return null

    const session: LeadSession = JSON.parse(sessionStr)

    // Verifica se expirou
    if (new Date(session.expiresAt) < new Date()) {
      clearLeadSession()
      return null
    }

    return session
  } catch (error) {
    console.error('Erro ao recuperar sessão do lead:', error)
    return null
  }
}

/**
 * Remove a sessão do lead
 */
export function clearLeadSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LEAD_SESSION_KEY)
  }
}

/**
 * Verifica se há uma sessão ativa
 */
export function hasActiveSession(): boolean {
  return getLeadSession() !== null
}

/**
 * Atualiza dados da sessão
 */
export function updateLeadSession(updates: Partial<LeadSession>): void {
  const current = getLeadSession()
  if (!current) return

  const updated = { ...current, ...updates }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(LEAD_SESSION_KEY, JSON.stringify(updated))
  }
}
