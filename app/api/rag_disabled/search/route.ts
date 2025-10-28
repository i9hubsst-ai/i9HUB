/**
 * API endpoint para busca semântica - RAG DESABILITADO
 * Migrado para usar Gemini AI em vez de busca vetorial
 * 
 * POST /api/rag_disabled/search
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query inválida' },
        { status: 400 }
      )
    }

    // RAG desabilitado - retornar mensagem informativa
    return NextResponse.json({
      success: true,
      message: 'Busca RAG foi migrada para Gemini AI. Use o chat AI para consultas.',
      query,
      results: [],
      count: 0,
      deprecated: true,
      suggestion: 'Use o endpoint /api/ai/chat para consultas assistidas por IA.'
    })

  } catch (error) {
    console.error('Erro na API de busca RAG (desabilitada):', error)
    return NextResponse.json(
      { error: 'Serviço RAG desabilitado. Use o chat AI.' },
      { status: 410 }
    )
  }
}
