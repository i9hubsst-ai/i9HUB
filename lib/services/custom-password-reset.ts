import { createAdminClient } from '@/lib/supabase/admin'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

/**
 * Serviço independente para reset de senha
 * Não depende das sessões do Supabase
 */

interface ResetToken {
  id: string
  userId: string
  token: string
  email: string
  expiresAt: Date
  used: boolean
}

/**
 * Gera um token único para reset de senha
 */
export async function generateResetToken(email: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const supabaseAdmin = createAdminClient()
    
    // Verificar se o usuário existe no Supabase
    const { data: users, error } = await supabaseAdmin.auth.admin.listUsers()
    
    if (error) {
      console.error('❌ Erro ao listar usuários:', error)
      return { success: false, error: 'Erro interno do servidor' }
    }

    const user = users.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
    
    if (!user) {
      console.log('🔍 Usuário não encontrado para email:', email)
      // Por segurança, sempre retornamos sucesso mesmo se o email não existir
      return { success: true }
    }

    // Gerar token único
    const token = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

    // Salvar token no banco de dados
    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        email,
        expiresAt,
        used: false
      }
    })

    console.log('✅ Token de reset gerado:', { email, token: token.substring(0, 8) + '...' })

    return { success: true, token }

  } catch (error) {
    console.error('❌ Erro ao gerar token:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

/**
 * Valida um token de reset
 */
export async function validateResetToken(token: string): Promise<{ valid: boolean; email?: string; userId?: string; error?: string }> {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    })

    if (!resetToken) {
      return { valid: false, error: 'Token inválido' }
    }

    if (resetToken.used) {
      return { valid: false, error: 'Token já foi utilizado' }
    }

    if (resetToken.expiresAt < new Date()) {
      return { valid: false, error: 'Token expirado' }
    }

    return { 
      valid: true, 
      email: resetToken.email, 
      userId: resetToken.userId 
    }

  } catch (error) {
    console.error('❌ Erro ao validar token:', error)
    return { valid: false, error: 'Erro interno do servidor' }
  }
}

/**
 * Reseta a senha usando o token
 */
export async function resetPasswordWithToken(token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Validar token
    const validation = await validateResetToken(token)
    
    if (!validation.valid) {
      return { success: false, error: validation.error }
    }

    const supabaseAdmin = createAdminClient()

    // Atualizar senha no Supabase
    const { error } = await supabaseAdmin.auth.admin.updateUserById(
      validation.userId!,
      { password: newPassword }
    )

    if (error) {
      console.error('❌ Erro ao atualizar senha no Supabase:', error)
      return { success: false, error: 'Erro ao atualizar senha' }
    }

    // Marcar token como usado
    await prisma.passwordResetToken.update({
      where: { token },
      data: { used: true }
    })

    console.log('✅ Senha resetada com sucesso para:', validation.email)

    return { success: true }

  } catch (error) {
    console.error('❌ Erro ao resetar senha:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

/**
 * Envia email de reset customizado
 */
export async function sendResetEmail(email: string, token: string): Promise<boolean> {
  try {
    const resetUrl = `https://i9hubsst.vercel.app/auth/reset-password-custom?token=${token}`
    
    console.log(`📧 Email de reset deveria ser enviado para: ${email}`)
    console.log(`🔗 URL de reset: ${resetUrl}`)
    
    // Aqui você implementaria o envio de email com um serviço como:
    // - Resend
    // - SendGrid
    // - Nodemailer
    // - etc.
    
    // Por enquanto, apenas log
    return true
    
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error)
    return false
  }
}