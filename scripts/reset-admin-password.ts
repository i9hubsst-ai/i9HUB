import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Chave de serviço (admin)

async function resetAdminPassword() {
  console.log('🔐 Resetando senha do admin...')
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    // Resetar senha do usuário admin
    const { data, error } = await supabase.auth.admin.updateUserById(
      'USER_ID_AQUI', // Precisamos encontrar o ID do usuário
      {
        password: 'AdminPass123!', // Senha temporária forte
        email_confirm: true
      }
    )

    if (error) {
      console.error('❌ Erro ao resetar senha:', error.message)
      return
    }

    console.log('✅ Senha resetada com sucesso!')
    console.log('📧 Email: i9.hubsst@gmail.com')
    console.log('🔑 Senha temporária: AdminPass123!')
    console.log('⚠️  Lembre-se de alterar a senha após o primeiro login')

  } catch (error) {
    console.error('❌ Erro:', error)
  }
}

resetAdminPassword()