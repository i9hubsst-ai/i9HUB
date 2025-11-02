# Configuração do Supabase Storage para Documentos AI

## Criar Bucket de Storage

Para que o upload de documentos na **Gestão de IA** funcione, você precisa criar um bucket no Supabase Storage.

### Passos:

1. **Acesse o Supabase Dashboard**
   - Vá para: https://supabase.com/dashboard/project/zgnzobnearxgakhvxxyp/storage/buckets
   - (Substitua o ID do projeto se necessário)

2. **Criar Bucket "documents"**
   - Clique em **"New bucket"**
   - **Name**: `documents`
   - **Public**: ❌ **Desmarque** (bucket privado)
   - Clique em **"Create bucket"**

3. **Configurar Políticas de Acesso (RLS)**

   Vá em **Storage** → **Policies** → Bucket **documents** e adicione as seguintes políticas:

   **Política 1: Upload (INSERT)**
   ```sql
   CREATE POLICY "Platform admins can upload documents"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (
     bucket_id = 'documents' 
     AND (storage.foldername(name))[1] = 'knowledge'
     AND EXISTS (
       SELECT 1 FROM "PlatformAdmin" 
       WHERE "userId" = auth.uid()
     )
   );
   ```

   **Política 2: Download (SELECT)**
   ```sql
   CREATE POLICY "Platform admins can read documents"
   ON storage.objects FOR SELECT
   TO authenticated
   USING (
     bucket_id = 'documents'
     AND EXISTS (
       SELECT 1 FROM "PlatformAdmin" 
       WHERE "userId" = auth.uid()
     )
   );
   ```

   **Política 3: Delete**
   ```sql
   CREATE POLICY "Platform admins can delete documents"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (
     bucket_id = 'documents'
     AND EXISTS (
       SELECT 1 FROM "PlatformAdmin" 
       WHERE "userId" = auth.uid()
     )
   );
   ```

4. **Variável de Ambiente (se necessário)**

   No **Vercel**, verifique se existe a variável:
   - `SUPABASE_SERVICE_ROLE_KEY` (para admin API access)
   
   Você pode encontrar essa chave em:
   **Supabase Dashboard** → **Settings** → **API** → **service_role (secret)**

## Estrutura de Pastas

Os documentos serão salvos em:
```
documents/
  └── knowledge/
      ├── 1698765432_exemplo.pdf
      ├── 1698765433_normas.docx
      └── ...
```

## Teste

1. Acesse `/dashboard/ai-management`
2. Vá na aba **"Documentos de Conhecimento"**
3. Clique em **"Upload de Documentos"**
4. Selecione um arquivo PDF, TXT, DOC ou DOCX
5. Aguarde o upload e processamento

## Tipos de Arquivo Suportados

- ✅ `.pdf` - Documentos PDF
- ✅ `.txt` - Arquivos de texto
- ✅ `.doc` - Word (antigo)
- ✅ `.docx` - Word (novo)

**Limite**: 10MB por arquivo

## Troubleshooting

### Erro: "Storage API not available"
- Verifique se o bucket "documents" foi criado
- Confirme que as políticas RLS foram aplicadas

### Erro: "Permission denied"
- Verifique se você é Platform Admin
- Confirme que as políticas RLS incluem verificação de PlatformAdmin

### Erro: "Bucket not found"
- O nome do bucket deve ser exatamente **"documents"** (sem espaços, lowercase)
