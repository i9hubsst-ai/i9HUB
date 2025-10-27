import { NextResponse } from 'next/server'
import { getCurrentUser, getUserPrimaryCompanyId } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/client'
// import { extractPdfText, generateEmbedding } from '@/lib/services/pdf-service' // Temporariamente desabilitado

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const supabase = createClient()
    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string
    const title = formData.get('title') as string

    if (!file || !category || !title) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const companyId = await getUserPrimaryCompanyId(user.id)
    
    if (!companyId) {
      return NextResponse.json(
        { error: 'Usuário não possui empresa associada' },
        { status: 400 }
      )
    }

    // Upload do arquivo para o Supabase Storage
    const buffer = await file.arrayBuffer()
    const fileName = `${Date.now()}_${file.name}`
    const filePath = `knowledge-base/${companyId}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('pdfs')
      .upload(filePath, buffer)

    if (uploadError) {
      throw new Error('Erro no upload: ' + uploadError.message)
    }

    // Extrair texto do PDF e gerar embedding
    const { data: pdfUrl } = supabase.storage
      .from('pdfs')
      .getPublicUrl(filePath)

    // Extrair texto do PDF (temporariamente desabilitado)
    const pdfText = 'PDF text extraction temporarily disabled'

    // Gerar embedding (temporariamente desabilitado)  
    // const embedding = null
    
    // Salvar no banco
    const source = await prisma.knowledgeSource.create({
      data: {
        type: 'PDF',
        title,
        category,
        content: pdfText,
        fileKey: filePath,
        // embedding, // Temporariamente removido - precisa definir no schema
        createdBy: user.id,
        companyId
      }
    })

    return NextResponse.json(source)
  } catch (error) {
    console.error('Erro ao processar PDF:', error)
    return NextResponse.json(
      { error: 'Erro ao processar arquivo' },
      { status: 500 }
    )
  }
}