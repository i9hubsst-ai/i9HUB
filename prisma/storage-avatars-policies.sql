-- Políticas de RLS para upload de avatares no bucket documents

-- 1. Permitir que usuários autenticados façam upload de seus próprios avatares
CREATE POLICY "Usuários podem fazer upload de seus avatares"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = (storage.filename(name)::text LIKE auth.uid()::text || '%')
);

-- 2. Permitir que usuários autenticados atualizem seus próprios avatares
CREATE POLICY "Usuários podem atualizar seus avatares"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = substring(storage.filename(name) from 1 for 36)
)
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = substring(storage.filename(name) from 1 for 36)
);

-- 3. Permitir que usuários autenticados deletem seus próprios avatares
CREATE POLICY "Usuários podem deletar seus avatares"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND auth.uid()::text = substring(storage.filename(name) from 1 for 36)
);

-- 4. Permitir leitura pública dos avatares (para exibição)
CREATE POLICY "Avatares são publicamente acessíveis"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);
