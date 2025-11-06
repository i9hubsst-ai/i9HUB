/**
 * Script para testar acesso ao bucket 'documents' no Supabase
 * Verifica se as políticas RLS estão configuradas corretamente
 */

import { createClient } from '@supabase/supabase-js'

async function testBucket() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis SUPABASE não configuradas')
    return
  }

  console.log('🔗 Conectando ao Supabase...')
  console.log('URL:', supabaseUrl)
  console.log('Key type:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SERVICE_ROLE' : 'ANON')

  const supabase = createClient(supabaseUrl, supabaseKey)

  // 1. Listar buckets
  console.log('\n📦 Listando buckets...')
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  
  if (bucketsError) {
    console.error('❌ Erro ao listar buckets:', bucketsError)
  } else {
    console.log('✅ Buckets encontrados:', buckets?.map(b => b.name))
    
    const documentsBucket = buckets?.find(b => b.name === 'documents')
    if (documentsBucket) {
      console.log('✅ Bucket "documents" existe!')
      console.log('   - ID:', documentsBucket.id)
      console.log('   - Public:', documentsBucket.public)
    } else {
      console.error('❌ Bucket "documents" NÃO encontrado')
    }
  }

  // 2. Tentar listar arquivos no bucket 'documents'
  console.log('\n📂 Listando arquivos em "documents/knowledge/"...')
  const { data: files, error: filesError } = await supabase.storage
    .from('documents')
    .list('knowledge', { limit: 10 })

  if (filesError) {
    console.error('❌ Erro ao listar arquivos:', filesError)
    console.error('   Código:', filesError.message)
  } else {
    console.log('✅ Arquivos encontrados:', files?.length || 0)
    if (files && files.length > 0) {
      files.forEach(f => console.log('   -', f.name))
    } else {
      console.log('   (pasta vazia)')
    }
  }

  // 3. Testar upload de arquivo teste
  console.log('\n📤 Testando upload...')
  const testContent = 'Teste de upload - ' + new Date().toISOString()
  const testFileName = `knowledge/test_${Date.now()}.txt`

  const { error: uploadError } = await supabase.storage
    .from('documents')
    .upload(testFileName, testContent, {
      contentType: 'text/plain',
      upsert: false
    })

  if (uploadError) {
    console.error('❌ Erro no upload:', uploadError)
    console.error('   Mensagem:', uploadError.message)
    
    if (uploadError.message.includes('new row violates row-level security policy')) {
      console.error('\n⚠️  PROBLEMA: Políticas RLS bloqueando upload!')
      console.error('   Solução: Configure as políticas corretas no Supabase Storage')
    } else if (uploadError.message.includes('Bucket not found')) {
      console.error('\n⚠️  PROBLEMA: Bucket "documents" não existe!')
      console.error('   Solução: Crie o bucket no Supabase Dashboard')
    }
  } else {
    console.log('✅ Upload realizado com sucesso!')
    console.log('   Arquivo:', testFileName)
    
    // Limpar arquivo de teste
    console.log('\n🗑️  Limpando arquivo de teste...')
    await supabase.storage.from('documents').remove([testFileName])
    console.log('✅ Arquivo removido')
  }

  console.log('\n✅ Teste concluído!')
}

testBucket().catch(console.error)
