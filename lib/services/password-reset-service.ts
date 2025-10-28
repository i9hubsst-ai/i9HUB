import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Função customizada para gerar links de recuperação de senha
 * com URL de produção garantida, independente das configurações do Supabase
 */
export async function generatePasswordResetLink(email: string): Promise<{ success: boolean; link?: string; error?: string }> {
  try {
    const supabaseAdmin = createAdminClient()
    
    // Gerar o link usando o método admin
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: 'https://i9hubsst.vercel.app/auth/callback?type=recovery&next=/auth/reset-password',
      }
    })

    if (error) {
      console.error('❌ Erro ao gerar link:', error)
      return { success: false, error: error.message }
    }

    let generatedLink = data?.properties?.action_link
    
    // Se o link gerado ainda contém localhost, forçar a substituição
    if (generatedLink && generatedLink.includes('localhost')) {
      console.log('🔄 Link original contém localhost:', generatedLink)
      generatedLink = generatedLink.replace(/http:\/\/localhost:3000/g, 'https://i9hubsst.vercel.app')
      console.log('✅ Link corrigido:', generatedLink)
    }

    console.log('🔗 Link final para reset:', generatedLink)

    // Simular envio de email personalizado (se necessário)
    // Aqui você poderia usar um serviço de email como SendGrid, Resend, etc.
    
    return { 
      success: true, 
      link: generatedLink 
    }
    
  } catch (error) {
    console.error('❌ Erro inesperado:', error)
    return { success: false, error: 'Erro interno do servidor' }
  }
}

/**
 * Função para enviar email de reset personalizado (opcional)
 * Pode ser usado se o Supabase não estiver enviando corretamente
 */
export async function sendCustomPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
  try {
    // Aqui você implementaria o envio via serviço de email
    // Por exemplo: SendGrid, Resend, Nodemailer, etc.
    
    console.log(`📧 Enviando email de reset para: ${email}`)
    console.log(`🔗 Link: ${resetLink}`)
    
    // Por enquanto, apenas log (o Supabase ainda enviará o email padrão)
    return true
    
  } catch (error) {
    console.error('❌ Erro ao enviar email personalizado:', error)
    return false
  }
}