import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed simplificado...')

  // Criar a empresa Maia Equipamentos que será usada no teste
  console.log('🏢 Criando empresa Maia Equipamentos...')
  
  try {
    const maiaEquipamentos = await prisma.company.create({
      data: {
        name: 'Maia Equipamentos',
        cnpj: '09007316000180',
      },
    })
    console.log('✓ Empresa Maia Equipamentos criada com sucesso:', maiaEquipamentos)
  } catch (error) {
    console.log('⚠️  Empresa Maia Equipamentos já existe ou erro:', error)
  }

  // Criar outras empresas demo
  try {
    const empresa1 = await prisma.company.create({
      data: {
        name: 'TechSafety Indústria Ltda',
        cnpj: '12345678000190',
      },
    })
    console.log('✓ Empresa TechSafety criada:', empresa1)
  } catch (error) {
    console.log('⚠️  Empresa TechSafety já existe ou erro:', error)
  }

  console.log('✅ Seed concluído!')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })