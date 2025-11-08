/**
 * Configuração do Mercado Pago
 * Sistema de pagamentos para MA.IA
 */

import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

// Inicializar cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
  }
})

export const mercadoPagoClient = client
export const paymentClient = new Payment(client)
export const preferenceClient = new Preference(client)

// Planos disponíveis
export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'BRL',
    messagesLimit: 50,
    features: [
      '50 mensagens por mês',
      'Respostas sobre NRs',
      'Histórico de 7 dias'
    ]
  },
  PRO: {
    id: 'pro',
    name: 'Profissional',
    price: 97,
    currency: 'BRL',
    messagesLimit: 1000,
    features: [
      'Tudo do Free +',
      '1.000 mensagens por mês',
      'Templates personalizados',
      'Upload de documentos',
      'Histórico ilimitado',
      'Suporte prioritário'
    ]
  },
  BUSINESS: {
    id: 'business',
    name: 'Empresarial',
    price: 297,
    currency: 'BRL',
    messagesLimit: 5000,
    features: [
      'Tudo do Pro +',
      '5.000 mensagens por mês',
      'Multi-usuário (até 5)',
      'API de integração',
      'Onboarding dedicado',
      'SLA de resposta'
    ]
  }
} as const

export type PlanId = keyof typeof PLANS
