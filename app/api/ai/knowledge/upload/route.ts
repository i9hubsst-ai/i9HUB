import { NextResponse } from 'next/server'import { NextResponse } from 'next/server'import { NextResponse } from 'next/server'

import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

import { prisma } from '@/lib/prisma'import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'import { getCurrentUser, isPlatformAdmin } from '@/lib/auth'

import { createClient } from '@/lib/supabase/server'

import { processPdfForEmbedding, extractPdfMetadata } from '@/lib/services/pdf-service'import { prisma } from '@/lib/prisma'import { prisma } from '@/lib/prisma'



const VALID_CATEGORIES = [import { createClient } from '@/lib/supabase/server'import { createClient } from '@/lib/supabase/server'

  'NORMA',

  'PROCEDIMENTO',import { processPdfForEmbedding, extractPdfMetadata } from '@/lib/services/pdf-service'import { processPdfForEmbedding, extractPdfMetadata } from '@/lib/services/pdf-service'

  'LEI',

  'BENCHMARKING',

  'MTE_STANDARD',

  'ISO_STANDARD',const VALID_CATEGORIES = [const VALID_CATEGORIES = [

  'REGULAMENTO',

  'MANUAL',  'NORMA',  'NORMA',

  'DOCUMENT'

] as const  'PROCEDIMENTO',  'PROCEDIMENTO',



/**  'LEI',  'LEI',

 * POST /api/ai/knowledge/upload

 * Upload manual de PDF para biblioteca  'BENCHMARKING',  'BENCHMARKING',

 * Apenas admin pode executar

 */  'MTE_STANDARD',  'MTE_STANDARD',

export async function POST(request: Request) {

  console.log('📤 [Upload] Iniciando upload de documento...')  'ISO_STANDARD',  'ISO_STANDARD',

  

  try {  'REGULAMENTO',  'REGULAMENTO',

    const user = await getCurrentUser()

    if (!user) {  'MANUAL',  'MANUAL',

      return NextResponse.json(

        { error: 'Não autorizado' },  'DOCUMENT'  'DOCUMENT'

        { status: 401 }

      )] as const] as const

    }



    // Verificar se é admin

    const isAdmin = await isPlatformAdmin(user.id)export async function POST(request: Request) {export async function POST(request: Request) {

    if (!isAdmin) {

      console.log('❌ [Upload] Usuário não é admin')  console.log('📤 [Upload] Iniciando upload de documento...')  console.log('📤 [Upload] Iniciando upload de documento...')

      return NextResponse.json(

        { error: 'Apenas administradores podem fazer upload de documentos' },    

        { status: 403 }

      )  try {  try {

    }

    const user = await getCurrentUser()    const user = await getCurrentUser()

    console.log('✅ [Upload] Admin verificado')

    if (!user) {    if (!user) {

    const formData = await request.formData()

    const file = formData.get('file') as File      return NextResponse.json(      return NextResponse.json(

    const category = formData.get('category') as string

    const title = formData.get('title') as string        { error: 'Não autorizado' },        { error: 'Não autorizado' },

    const description = formData.get('description') as string | null

        { status: 401 }        { status: 401 }

    if (!file || !category || !title) {

      return NextResponse.json(      )      )

        { error: 'Arquivo, categoria e título são obrigatórios' },

        { status: 400 }    }    }

      )

    }



    // Validar categoria    // Verificar se é admin    // Verificar se é admin

    if (!VALID_CATEGORIES.includes(category as any)) {

      return NextResponse.json(    const isAdmin = await isPlatformAdmin(user.id)    const isAdmin = await isPlatformAdmin(user.id)

        { error: `Categoria inválida. Opções: ${VALID_CATEGORIES.join(', ')}` },

        { status: 400 }    if (!isAdmin) {    if (!isAdmin) {

      )

    }      console.log('❌ [Upload] Usuário não é admin')      console.log('❌ [Upload] Usuário não é admin')



    // Validar tipo de arquivo      return NextResponse.json(      return NextResponse.json(

    if (file.type !== 'application/pdf') {

      return NextResponse.json(        { error: 'Apenas administradores podem fazer upload de documentos' },        { error: 'Apenas administradores podem fazer upload de documentos' },

        { error: 'Apenas arquivos PDF são permitidos' },

        { status: 400 }        { status: 403 }        { status: 403 }

      )

    }      )      )



    console.log(`📄 [Upload] Arquivo: ${file.name}, Categoria: ${category}`)    }    }



    // Upload do arquivo para o Supabase Storage

    const buffer = await file.arrayBuffer()

    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`    console.log('✅ [Upload] Admin verificado')    console.log('✅ [Upload] Admin verificado')

    const filePath = `knowledge-base/uploads/${category}/${fileName}`



    const supabase = await createClient()

    const { error: uploadError } = await supabase.storage    const formData = await request.formData()    const formData = await request.formData()

      .from('pdfs')

      .upload(filePath, buffer, {    const file = formData.get('file') as File    const file = formData.get('file') as File

        contentType: 'application/pdf',

        upsert: false    const category = formData.get('category') as string    const category = formData.get('category') as string

      })

    const title = formData.get('title') as string    const title = formData.get('title') as string

    if (uploadError) {

      console.error('❌ [Upload] Erro no storage:', uploadError)    const description = formData.get('description') as string | null    const description = formData.get('description') as string | null

      throw new Error('Erro no upload: ' + uploadError.message)

    }



    console.log('✅ [Upload] Arquivo salvo no storage')    if (!file || !category || !title) {    if (!file || !category || !title) {



    // Extrair metadata do PDF      return NextResponse.json(      return NextResponse.json(

    const metadata = await extractPdfMetadata(buffer)

    console.log(`📊 [Upload] Metadata: ${metadata?.pages} páginas`)        { error: 'Arquivo, categoria e título são obrigatórios' },        { error: 'Arquivo, categoria e título são obrigatórios' },



    // Processar PDF: extrair texto e gerar embeddings        { status: 400 }        { status: 400 }

    console.log('🔄 [Upload] Processando PDF...')

    const { fullText, embeddings } = await processPdfForEmbedding(buffer)      )      )



    console.log(`✅ [Upload] ${embeddings.length} embeddings gerados`)    }    }



    // Salvar documento na tabela KnowledgeSource

    const source = await prisma.knowledgeSource.create({

      data: {    // Validar categoria    // Validar categoria

        type: 'PDF',

        mode: 'LOCAL_PDF',    if (!VALID_CATEGORIES.includes(category as any)) {    if (!VALID_CATEGORIES.includes(category as any)) {

        title,

        description: description || null,      return NextResponse.json(      return NextResponse.json(

        category,

        content: fullText,        { error: `Categoria inválida. Opções: ${VALID_CATEGORIES.join(', ')}` },        { error: `Categoria inválida. Opções: ${VALID_CATEGORIES.join(', ')}` },

        fileKey: filePath,

        createdBy: user.id,        { status: 400 }        { status: 400 }

        companyId: 'GLOBAL', // Documentos de biblioteca são globais

        isActive: true,      )      )

      }

    })    }    }



    console.log(`✅ [Upload] KnowledgeSource criado: ${source.id}`)



    // Salvar cada embedding na tabela KnowledgeEmbedding    // Validar tipo de arquivo    // Validar tipo de arquivo

    const embeddingRecords = await Promise.all(

      embeddings.map((item, index) =>    if (file.type !== 'application/pdf') {    if (file.type !== 'application/pdf') {

        prisma.knowledgeEmbedding.create({

          data: {      return NextResponse.json(      return NextResponse.json(

            sourceType: category as any,

            sourceId: source.id,        { error: 'Apenas arquivos PDF são permitidos' },        { error: 'Apenas arquivos PDF são permitidos' },

            content: item.text,

            embedding: `[${item.embedding.join(',')}]`, // Formato pgvector        { status: 400 }        { status: 400 }

            metadata: {

              documentTitle: title,      )      )

              category,

              chunkIndex: index,    }    }

              totalChunks: embeddings.length,

              pages: metadata?.pages || 0,

              fileName: file.name,

            },    console.log(`📄 [Upload] Arquivo: ${file.name}, Categoria: ${category}`)    console.log(`📄 [Upload] Arquivo: ${file.name}, Categoria: ${category}`)

          }

        })

      )

    )    // Upload do arquivo para o Supabase Storage    // Upload do arquivo para o Supabase Storage



    console.log(`✅ [Upload] ${embeddingRecords.length} embeddings salvos no banco`)    const buffer = await file.arrayBuffer()    const buffer = await file.arrayBuffer()



    return NextResponse.json({    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

      success: true,

      document: {    const filePath = `knowledge-base/${category}/${fileName}`    const filePath = `knowledge-base/${category}/${fileName}`

        id: source.id,

        title: source.title,

        category: source.category,

        mode: source.mode,    const supabase = await createClient()    const supabase = await createClient()

        fileKey: source.fileKey,

        pages: metadata?.pages || 0,    const { error: uploadError } = await supabase.storage    const { error: uploadError } = await supabase.storage

        embeddingsCount: embeddingRecords.length,

      }      .from('pdfs')      .from('pdfs')

    })

          .upload(filePath, buffer, {      .upload(filePath, buffer, {

  } catch (error: any) {

    console.error('❌ [Upload] Erro ao processar PDF:', error)        contentType: 'application/pdf',        contentType: 'application/pdf',

    return NextResponse.json(

      { error: error.message || 'Erro ao processar arquivo' },        upsert: false        upsert: false

      { status: 500 }

    )      })      })

  }

}


    if (uploadError) {    if (uploadError) {

      console.error('❌ [Upload] Erro no storage:', uploadError)      console.error('❌ [Upload] Erro no storage:', uploadError)

      throw new Error('Erro no upload: ' + uploadError.message)      throw new Error('Erro no upload: ' + uploadError.message)

    }    }



    console.log('✅ [Upload] Arquivo salvo no storage')    console.log('✅ [Upload] Arquivo salvo no storage')



    // Extrair metadata do PDF    // Extrair metadata do PDF

    const metadata = await extractPdfMetadata(buffer)    const metadata = await extractPdfMetadata(buffer)

    console.log(`📊 [Upload] Metadata: ${metadata?.pages} páginas`)    console.log(`📊 [Upload] Metadata: ${metadata?.pages} páginas`)



    // Processar PDF: extrair texto e gerar embeddings    // Processar PDF: extrair texto e gerar embeddings

    console.log('🔄 [Upload] Processando PDF...')    console.log('🔄 [Upload] Processando PDF...')

    const { fullText, embeddings } = await processPdfForEmbedding(buffer)    const { fullText, embeddings } = await processPdfForEmbedding(buffer)



    console.log(`✅ [Upload] ${embeddings.length} embeddings gerados`)    console.log(`✅ [Upload] ${embeddings.length} embeddings gerados`)



    // Salvar documento na tabela KnowledgeSource    // Salvar documento na tabela KnowledgeSource

    const source = await prisma.knowledgeSource.create({    const source = await prisma.knowledgeSource.create({

      data: {      data: {

        type: 'PDF',        type: 'PDF',

        title,        title,

        description: description || null,        description: description || null,

        category,        category,

        content: fullText,        content: fullText,

        fileKey: filePath,        fileKey: filePath,

        createdBy: user.id,        createdBy: user.id,

        companyId: 'GLOBAL', // Documentos de biblioteca são globais        companyId: 'GLOBAL', // Documentos de biblioteca são globais

        isActive: true,        isActive: true,

      }      }

    })    })



    console.log(`✅ [Upload] KnowledgeSource criado: ${source.id}`)    console.log(`✅ [Upload] KnowledgeSource criado: ${source.id}`)

    

    // Salvar cada embedding na tabela KnowledgeEmbedding    if (!companyId) {

    const embeddingRecords = await Promise.all(      return NextResponse.json(

      embeddings.map((item, index) =>        { error: 'Usuário não possui empresa associada' },

        prisma.knowledgeEmbedding.create({        { status: 400 }

          data: {      )

            sourceType: category as any,    }

            sourceId: source.id,

            content: item.text,    // Upload do arquivo para o Supabase Storage

            embedding: `[${item.embedding.join(',')}]`, // Formato pgvector    const buffer = await file.arrayBuffer()

            metadata: {    const fileName = `${Date.now()}_${file.name}`

              documentTitle: title,    const filePath = `knowledge-base/${companyId}/${fileName}`

              category,

              chunkIndex: index,    const { error: uploadError } = await supabase.storage

              totalChunks: embeddings.length,      .from('pdfs')

              pages: metadata?.pages || 0,      .upload(filePath, buffer)

              fileName: file.name,

            },    if (uploadError) {

          }      throw new Error('Erro no upload: ' + uploadError.message)

        })    }

      )

    )    // Extrair texto do PDF e gerar embedding

    const { data: pdfUrl } = supabase.storage

    console.log(`✅ [Upload] ${embeddingRecords.length} embeddings salvos no banco`)      .from('pdfs')

      .getPublicUrl(filePath)

    return NextResponse.json({

      success: true,    // Extrair texto do PDF (temporariamente desabilitado)

      document: {    const pdfText = 'PDF text extraction temporarily disabled'

        id: source.id,

        title: source.title,    // Gerar embedding (temporariamente desabilitado)  

        category: source.category,    // const embedding = null

        fileKey: source.fileKey,    

        pages: metadata?.pages || 0,    // Salvar no banco

        embeddingsCount: embeddingRecords.length,    const source = await prisma.knowledgeSource.create({

      }      data: {

    })        type: 'PDF',

            title,

  } catch (error: any) {        category,

    console.error('❌ [Upload] Erro ao processar PDF:', error)        content: pdfText,

    return NextResponse.json(        fileKey: filePath,

      { error: error.message || 'Erro ao processar arquivo' },        // embedding, // Temporariamente removido - precisa definir no schema

      { status: 500 }        createdBy: user.id,

    )        companyId

  }      }

}    })


    return NextResponse.json(source)
  } catch (error) {
    console.error('Erro ao processar PDF:', error)
    return NextResponse.json(
      { error: 'Erro ao processar arquivo' },
      { status: 500 }
    )
  }
}