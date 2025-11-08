/**
 * API Route: Webhook do Mercado Pago
 * POST /api/payments/webhook
 * 
 * Recebe notificações de pagamentos aprovados/pendentes/cancelados
 */

import { NextRequest, NextResponse } from 'next/server'
import { paymentClient, PlanId } from '@/lib/mercadopago'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log('Webhook recebido:', body)

    // Mercado Pago envia notificações do tipo "payment"
    if (body.type === 'payment') {
      const paymentId = body.data.id

      // Buscar informações completas do pagamento
      const payment = await paymentClient.get({ id: paymentId })

      console.log('Detalhes do pagamento:', payment)

      // Se pagamento aprovado
      if (payment.status === 'approved') {
        const userId = payment.metadata?.user_id
        const planId = payment.metadata?.plan_id as PlanId

        if (userId && planId) {
          // Atualizar usuário no banco
          await prisma.$executeRaw`
            UPDATE auth.users
            SET raw_user_meta_data = jsonb_set(
              COALESCE(raw_user_meta_data, '{}'::jsonb),
              '{plan}',
              to_jsonb(${planId}::text)
            )
            WHERE id = ${userId}::uuid
          `

          // Registrar pagamento no histórico (criar tabela se necessário)
          // await prisma.payment.create({
          //   data: {
          //     userId,
          //     planId,
          //     amount: payment.transaction_amount,
          //     status: 'approved',
          //     paymentId: String(payment.id),
          //   }
          // })

          console.log(`✅ Plano ${planId} ativado para usuário ${userId}`)
        }
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Erro no webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    )
  }
}

// Permitir POST sem validação CSRF (webhook externo)
export const dynamic = 'force-dynamic'
