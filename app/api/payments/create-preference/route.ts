/**
 * API Route: Criar preferência de pagamento no Mercado Pago
 * POST /api/payments/create-preference
 */

import { NextRequest, NextResponse } from 'next/server'
import { preferenceClient, PLANS, PlanId } from '@/lib/mercadopago'
import { getCurrentUser } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { planId } = await req.json() as { planId: PlanId }

    if (!planId || !PLANS[planId]) {
      return NextResponse.json(
        { error: 'Plano inválido' },
        { status: 400 }
      )
    }

    const plan = PLANS[planId]

    if (plan.price === 0) {
      return NextResponse.json(
        { error: 'Plano gratuito não requer pagamento' },
        { status: 400 }
      )
    }

    // Criar preferência de pagamento
    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: plan.id,
            title: `MA.IA - Plano ${plan.name}`,
            description: plan.features.join(' • '),
            quantity: 1,
            currency_id: plan.currency,
            unit_price: plan.price,
          }
        ],
        payer: {
          email: user.email || '',
          name: user.user_metadata?.full_name || 'Usuário',
        },
        back_urls: {
          success: `${process.env.NEXTAUTH_URL}/payment/success?plan=${planId}`,
          failure: `${process.env.NEXTAUTH_URL}/payment/failure`,
          pending: `${process.env.NEXTAUTH_URL}/payment/pending`,
        },
        auto_return: 'approved',
        notification_url: `${process.env.NEXTAUTH_URL}/api/payments/webhook`,
        metadata: {
          user_id: user.id,
          plan_id: planId,
        },
      }
    })

    return NextResponse.json({
      success: true,
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    })

  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}
