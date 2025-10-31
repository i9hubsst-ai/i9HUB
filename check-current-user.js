// Script para verificar o status do usuário atual
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkCurrentUser() {
  try {
    console.log('🔍 VERIFICANDO USUÁRIOS E MEMBERSHIPS')
    console.log('================================')
    
    // Buscar todos os usuários
    const users = await prisma.user.findMany({
      include: {
        memberships: {
          include: {
            company: true
          }
        }
      }
    })
    
    console.log(`\n📊 Total de usuários: ${users.length}`)
    
    for (const user of users) {
      console.log(`\n👤 Usuário: ${user.email}`)
      console.log(`   - ID: ${user.id}`)
      console.log(`   - Nome: ${user.name || 'Não definido'}`)
      console.log(`   - Platform Admin: ${user.isPlatformAdmin ? 'SIM' : 'NÃO'}`)
      console.log(`   - Memberships: ${user.memberships.length}`)
      
      user.memberships.forEach((membership, index) => {
        console.log(`     ${index + 1}. Empresa: ${membership.company.name}`)
        console.log(`        - Role: ${membership.role}`)
        console.log(`        - Ativo: ${membership.isActive ? 'SIM' : 'NÃO'}`)
      })
    }
    
    console.log('\n✅ Verificação concluída!')
    
  } catch (error) {
    console.error('❌ Erro:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkCurrentUser()