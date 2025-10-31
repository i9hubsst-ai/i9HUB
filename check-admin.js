const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAdminUsers() {
  console.log('🔍 VERIFICANDO USUÁRIOS ADMIN')
  console.log('=============================\n')
  
  try {
    // 1. Verificar platform admins
    console.log('1️⃣ Verificando Platform Admins...')
    const platformAdmins = await prisma.platformAdmin.findMany()
    
    console.log(`📊 Encontrados ${platformAdmins.length} platform admins:`)
    platformAdmins.forEach((admin, index) => {
      console.log(`   ${index + 1}. User ID: ${admin.userId}`)
      console.log(`      Email: ${admin.email || 'Não informado'}`)
      console.log(`      Criado: ${admin.createdAt}`)
      console.log('')
    })
    
    // 2. Verificar usuários na tabela users
    console.log('2️⃣ Verificando usuários cadastrados...')
    const users = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
    
    console.log(`📊 Encontrados ${users.length} usuários:`)
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ID: ${user.id}`)
      console.log(`      Email: ${user.email}`)
      console.log(`      Nome: ${user.name}`)
      console.log(`      Criado: ${user.createdAt}`)
      console.log('')
    })
    
    // 3. Verificar se existe o admin principal
    console.log('3️⃣ Procurando admin principal (i9.hubsst@gmail.com)...')
    const mainAdmin = await prisma.user.findUnique({
      where: { email: 'i9.hubsst@gmail.com' }
    })
    
    if (mainAdmin) {
      console.log('✅ Admin principal encontrado:')
      console.log(`   ID: ${mainAdmin.id}`)
      console.log(`   Nome: ${mainAdmin.name}`)
      console.log(`   Email: ${mainAdmin.email}`)
      
      // Verificar se tem registro na platformAdmin
      const adminRecord = await prisma.platformAdmin.findUnique({
        where: { userId: mainAdmin.id }
      })
      
      if (adminRecord) {
        console.log('✅ Registro PlatformAdmin existe')
      } else {
        console.log('❌ Registro PlatformAdmin NÃO existe - criando...')
        await prisma.platformAdmin.create({
          data: {
            userId: mainAdmin.id,
            email: mainAdmin.email
          }
        })
        console.log('✅ Registro PlatformAdmin criado!')
      }
    } else {
      console.log('❌ Admin principal não encontrado')
      console.log('💡 Para testar os comandos, você precisa:')
      console.log('   1. Fazer login com uma conta admin')
      console.log('   2. Ou criar um usuário admin manualmente')
    }
    
  } catch (error) {
    console.error('❌ ERRO:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdminUsers()