import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Teste simples para verificar se o modelo existe
    const testConnection = await prisma.$queryRaw`SELECT 1 as test`
    
    // Verificar se o modelo passwordResetToken está disponível
    const hasModel = typeof (prisma as any).passwordResetToken?.findMany === 'function'
    
    // Listar todas as propriedades do prisma que contêm 'password' ou 'reset'
    const prismaProps = Object.getOwnPropertyNames(prisma).filter(prop => 
      prop.toLowerCase().includes('password') || 
      prop.toLowerCase().includes('reset') || 
      prop.toLowerCase().includes('token')
    )
    
    return NextResponse.json({
      success: true,
      database_connected: !!testConnection,
      model_exists: hasModel,
      available_models: prismaProps,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}