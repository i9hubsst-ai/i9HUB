import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createPlatformAdmin() {
  console.log('🔧 Configurando administrador da plataforma...')

  try {
    // Verificar se já existe um admin
    const existingAdmin = await prisma.platformAdmin.findFirst()
    if (existingAdmin) {
      console.log('✅ Já existe um administrador da plataforma configurado')
      return
    }

    // Criar o registro do admin para o email i9.hubsst@gmail.com
    // Nota: Usamos um userId temporário que será atualizado quando o usuário fizer login
    const adminRecord = await prisma.platformAdmin.create({
      data: {
        userId: 'i9.hubsst@gmail.com' // Usamos o email como identificador temporário
      }
    })

    console.log('✅ Administrador da plataforma configurado:', adminRecord)
    console.log('� Email do admin:', 'i9.hubsst@gmail.com')
    console.log('💡 O admin pode agora fazer login normalmente ou usar "Esqueci minha senha"')

  } catch (error) {
    console.error('❌ Erro ao configurar admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createPlatformAdmin()