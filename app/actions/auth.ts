'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { getBaseUrl, getCallbackUrl, getResetPasswordUrl } from '@/lib/utils/url'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email e senha são obrigatórios' }
  }

  try {
    console.log('Iniciando processo de login para:', email)
    
    // Primeiro faz logout para garantir que não há sessão ativa
    await supabase.auth.signOut()
    
    console.log('Logout realizado, tentando login...')

    // Tenta fazer login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    console.log('Resultado do login:', error ? 'Erro' : 'Sucesso')

    if (error) {
      if (error.message?.includes('Invalid login credentials')) {
        return { error: 'Email ou senha inválidos' }
      }
      return { error: error.message || 'Erro desconhecido' }
    }

    if (data.session) {
      revalidatePath('/dashboard', 'layout')
      redirect('/dashboard')
    }
    
    return { error: 'Erro ao criar sessão' }
  } catch (err) {
    console.error('Error during login:', err)
    return { error: 'Erro ao fazer login. Tente novamente.' }
  }

    // Tenta fazer login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (error as any)?.message || 'Erro desconhecido'
      if (errorMessage.includes('Invalid login credentials')) {
        return { error: 'Email ou senha inválidos' }
      }
      return { error: errorMessage }
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Validação dos campos obrigatórios
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  
  if (!email || !password || !name) {
    return { error: 'Todos os campos são obrigatórios' }
  }

  // Validação básica de email
  if (!email.includes('@')) {
    return { error: 'E-mail inválido' }
  }

  const data = {
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: getCallbackUrl(),
    }
  }

  const { data: authData, error: authError } = await supabase.auth.signUp(data)

  if (authError) {
    if (authError.message?.includes('email')) {
      return { error: 'Este e-mail já está em uso' }
    }
    return { error: authError.message || 'Erro desconhecido' }
  }

  if (authData.user) {
    const companyName = formData.get('companyName') as string
    const companyCnpj = formData.get('companyCnpj') as string

    if (companyName && companyCnpj) {
      // Validação básica do CNPJ (remove caracteres especiais)
      const cleanCnpj = companyCnpj.replace(/[^\d]/g, '')
      console.log('CNPJ limpo:', cleanCnpj)
      
      if (cleanCnpj.length !== 14) {
        return { error: 'CNPJ inválido' }
      }

      try {
        console.log('Procurando empresa existente...')
        // Verifica se já existe empresa com este CNPJ
        const existingCompany = await prisma.company.findUnique({
          where: { cnpj: cleanCnpj }
        })
        console.log('Empresa encontrada:', existingCompany)

        let companyId;
        let isNewCompany = false;

        if (existingCompany) {
          console.log('Usando empresa existente')
          // Se a empresa já existe, usa ela
          companyId = existingCompany.id;
        } else {
          console.log('Criando nova empresa')
          isNewCompany = true;
          // Se não existe, cria uma nova
          const newCompany = await prisma.company.create({
            data: {
              name: companyName,
              cnpj: cleanCnpj,
            }
          });
          companyId = newCompany.id;
          console.log('Nova empresa criada:', newCompany)
        }

        console.log('Verificando membership existente...')
        // Verifica se o usuário já tem vínculo com esta empresa
        const existingMembership = await prisma.membership.findFirst({
          where: {
            userId: authData.user.id,
            companyId: companyId
          }
        });
        console.log('Membership encontrado:', existingMembership)

        if (existingMembership) {
          return { error: 'Você já está vinculado a esta empresa' }
        }

        console.log('Criando novo membership...')
        // Cria o vínculo do usuário com a empresa
        const membership = await prisma.membership.create({
          data: {
            userId: authData.user.id,
            companyId: companyId,
            role: isNewCompany ? 'COMPANY_ADMIN' : 'EMPLOYER',
            status: 'ACTIVE',
          }
        })
        console.log('Membership criado:', membership)
      } catch (err) {
        console.error('Erro ao criar empresa:', err)
        return { error: 'Erro ao criar empresa. Por favor, tente novamente.' }
      }
    }
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/login')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  // Usar o URL atual do site de forma dinâmica
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                  'https://i9hubsst-i9hubssts-projects.vercel.app'
  
  const redirectUrl = `${baseUrl}/auth/callback?type=recovery&next=/auth/login`

  console.log('🔐 RESET PASSWORD: Iniciando para email:', email)
  console.log('🔐 RESET PASSWORD: Base URL:', baseUrl)
  console.log('🔐 RESET PASSWORD: Redirect URL será:', redirectUrl)

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    console.error('❌ Erro no reset password:', error)
    return { error: error.message || 'Erro desconhecido' }
  }

  console.log('✅ Reset password enviado com sucesso')
  return { success: true }
}

export async function updatePassword(formData: FormData) {
  console.log('🔐 UPDATE PASSWORD: Iniciando atualização de senha')
  
  try {
    const supabase = await createClient()
    const password = formData.get('password') as string

    console.log('🔐 UPDATE PASSWORD: Password recebido:', password ? `${password.length} chars` : 'null')

    // Verificar se há sessão ativa
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    console.log('🔐 UPDATE PASSWORD: Sessão atual:', { 
      hasSession: !!session, 
      hasUser: !!session?.user,
      userId: session?.user?.id,
      sessionError: sessionError?.message
    })

    if (!session) {
      console.log('🔴 UPDATE PASSWORD: Nenhuma sessão ativa')
      return { error: 'Sessão expirada. Solicite um novo link de recuperação.' }
    }

    if (!password || password.length < 6) {
      console.log('🔴 UPDATE PASSWORD: Senha inválida')
      return { error: 'Senha deve ter pelo menos 6 caracteres' }
    }

    console.log('🟡 UPDATE PASSWORD: Tentando atualizar senha...')
    const { error } = await supabase.auth.updateUser({
      password: password
    })

    if (error) {
      console.error('🔴 UPDATE PASSWORD: Erro na atualização:', error)
      return { error: error.message || 'Erro ao atualizar senha' }
    }

    console.log('🟢 UPDATE PASSWORD: Senha atualizada com sucesso')
    revalidatePath('/', 'layout')
    redirect('/dashboard')
    
  } catch (error) {
    console.error('🔴 UPDATE PASSWORD: Exception:', error)
    return { error: 'Erro interno do servidor' }
  }
}
