# Solução Definitiva para Avatar - Tornar Pasta Avatars Pública

## Problema
As signed URLs estão sendo geradas mas as imagens não aparecem devido a:
1. CORS pode estar bloqueando
2. Signed URLs podem estar expirando no cliente
3. Complexidade desnecessária

## Solução: Tornar pasta `avatars/` pública

### Passos no Supabase Dashboard:

1. **Acesse Storage Policies**
   - Vá para: https://supabase.com/dashboard/project/zgnzobnearxgakhvxxyp/storage/policies
   - Selecione o bucket: **documents**

2. **Adicionar Política de Leitura Pública para Avatars**

   Clique em **"New Policy"** e adicione:

   ```sql
   -- Nome: Public access to avatars folder
   -- Target roles: public
   -- Operation: SELECT
   
   CREATE POLICY "Avatars são publicamente acessíveis"
   ON storage.objects FOR SELECT
   TO public
   USING (
     bucket_id = 'documents' 
     AND (storage.foldername(name))[1] = 'avatars'
   );
   ```

3. **Adicionar Política de Upload para Usuários Autenticados**

   ```sql
   CREATE POLICY "Usuários podem fazer upload de avatares"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (
     bucket_id = 'documents' 
     AND (storage.foldername(name))[1] = 'avatars'
   );
   ```

4. **Adicionar Política de Update**

   ```sql
   CREATE POLICY "Usuários podem atualizar avatares"
   ON storage.objects FOR UPDATE
   TO authenticated
   USING (
     bucket_id = 'documents' 
     AND (storage.foldername(name))[1] = 'avatars'
   );
   ```

5. **Adicionar Política de Delete**

   ```sql
   CREATE POLICY "Usuários podem deletar seus avatares"
   ON storage.objects FOR DELETE
   TO authenticated
   USING (
     bucket_id = 'documents' 
     AND (storage.foldername(name))[1] = 'avatars'
   );
   ```

## Alternativa Mais Simples

Se as políticas acima forem complexas, você pode simplesmente:

1. Criar um novo bucket chamado **"avatars"**
2. Marcar como **PÚBLICO**
3. Atualizar o código para usar bucket 'avatars' ao invés de 'documents/avatars/'

## Após configurar

1. Remover o código de fallback para signed URL
2. Usar apenas getPublicUrl()
3. Testar upload novamente

Com a pasta pública, as URLs serão do tipo:
```
https://zgnzobnearxgakhvxxyp.supabase.co/storage/v1/object/public/documents/avatars/user-id-timestamp.png
```

E funcionarão instantaneamente sem necessidade de tokens ou assinaturas.
