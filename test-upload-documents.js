// Script para testar upload de documentos
const fs = require('fs')

console.log('🧪 TESTE DE UPLOAD DE DOCUMENTOS')
console.log('=================================')

const testDocumentUpload = async () => {
  try {
    console.log('\n📄 Criando arquivo de teste...')
    
    // Criar um arquivo de texto simples para teste
    const testContent = `Norma Regulamentadora NR-12 - SEGURANÇA NO TRABALHO EM MÁQUINAS E EQUIPAMENTOS

12.1 Esta Norma Regulamentadora e seus anexos definem referências técnicas, princípios fundamentais e medidas de proteção para garantir a saúde e a integridade física dos trabalhadores e estabelece requisitos mínimos para a prevenção de acidentes e doenças do trabalho nas fases de projeto e de utilização de máquinas e equipamentos de todos os tipos, e ainda à sua fabricação, importação, comercialização, exposição e cessão a qualquer título, em todas as atividades econômicas, sem prejuízo da observância do disposto nas demais Normas Regulamentadoras aprovadas pela Portaria MTb n.º 3.214, de 8 de junho de 1978, nas normas técnicas oficiais e, na ausência ou omissão dessas, nas normas internacionais aplicáveis.

12.2 Esta Norma Regulamentadora não se aplica a:
a) máquinas e equipamentos movidos a força humana ou animal;
b) máquinas e equipamentos que possuam norma regulamentadora específica no Ministério do Trabalho e Emprego.

Teste de documento para upload na base de conhecimento.`
    
    const fileName = 'test-nr12.txt'
    fs.writeFileSync(fileName, testContent)
    console.log('✅ Arquivo de teste criado:', fileName)
    
    console.log('\n🚀 Fazendo upload via API...')
    
    // Criar FormData para o upload
    const FormData = require('form-data')
    const formData = new FormData()
    
    const fileBuffer = fs.readFileSync(fileName)
    formData.append('documents', fileBuffer, {
      filename: fileName,
      contentType: 'text/plain'
    })
    
    // Fazer requisição de upload
    const fetch = (await import('node-fetch')).default
    const response = await fetch('https://i9hubsst.vercel.app/api/ai/documents', {
      method: 'POST',
      body: formData,
      headers: {
        ...formData.getHeaders()
      }
    })
    
    console.log('📄 Status da resposta:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('❌ Erro na resposta:', errorText)
      throw new Error(`Upload falhou: ${response.status} - ${errorText}`)
    }
    
    const result = await response.json()
    console.log('✅ UPLOAD BEM-SUCEDIDO!')
    console.log('📊 Resultado:', JSON.stringify(result, null, 2))
    
    console.log('\n🔍 DETALHES:')
    console.log(`- Arquivos enviados: ${result.total}`)
    console.log(`- Uploads bem-sucedidos: ${result.uploaded}`)
    
    if (result.results) {
      result.results.forEach((file, index) => {
        console.log(`  ${index + 1}. ${file.filename}: ${file.status}`)
        if (file.error) {
          console.log(`     Erro: ${file.error}`)
        }
      })
    }
    
    // Limpar arquivo de teste
    fs.unlinkSync(fileName)
    console.log('🧹 Arquivo de teste removido')
    
  } catch (error) {
    console.error('❌ ERRO NO TESTE:', error.message)
    console.log('\n🔍 DIAGNÓSTICO:')
    console.log('- Verifique se o servidor está rodando (npm run dev)')
    console.log('- Confirme se você tem privilégios de admin')
    console.log('- Verifique se a tabela KnowledgeDocument existe no banco')
    console.log('- Confirme se o diretório uploads/knowledge existe')
    
    // Tentar limpar arquivo se existir
    try {
      if (fs.existsSync('test-nr12.txt')) {
        fs.unlinkSync('test-nr12.txt')
        console.log('🧹 Arquivo de teste removido após erro')
      }
    } catch (cleanupError) {
      console.log('⚠️ Não foi possível remover arquivo de teste')
    }
  }
}

// Instalar dependências se necessário
try {
  require('form-data')
} catch (error) {
  console.log('❌ form-data não instalado. Instalando...')
  require('child_process').execSync('npm install form-data', { stdio: 'inherit' })
}

try {
  require('node-fetch')
} catch (error) {
  console.log('❌ node-fetch não instalado. Instalando...')
  require('child_process').execSync('npm install node-fetch@2', { stdio: 'inherit' })
}

// Executar teste
testDocumentUpload()