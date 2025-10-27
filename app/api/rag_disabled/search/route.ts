/**
 * API endpoint para busca semântica RAG
 * 
 * POST /api/rag/search
 * Body: { query: string, options?: RAGSearchOptions }
 */

import { NextRequest, NextResponse } from 'next/server'
import { searchKnowledge, searchMteStandards, findRelatedStandards } from '@/lib/services/rag-service'
import { getCurrentUser } from '@/lib/auth'

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
    const { query, options = {}, searchType = 'general' } = body

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query inválida' },
        { status: 400 }
      )
    }

    let results

    switch (searchType) {
      case 'standards':
        results = await searchMteStandards(query, options)
        break
      
      case 'related':
        results = await findRelatedStandards(query, options.limit)
        break
      
      case 'general':
      default:
        results = await searchKnowledge(query, options)
        break
    }

    return NextResponse.json({
      success: true,
      query,
      results,
      count: results.length
    })

  } catch (error) {
    console.error('Erro na API de busca RAG:', error)
    return NextResponse.json(
      { error: 'Erro ao realizar busca semântica' },
      { status: 500 }
    )
  }
}
