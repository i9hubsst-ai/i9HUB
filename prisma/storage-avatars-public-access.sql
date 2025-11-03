-- Execute este script no Supabase SQL Editor para permitir acesso público aos avatares
-- IMPORTANTE: Se as políticas já existirem, você verá um erro. Ignore-o ou delete as políticas antigas primeiro.

-- 1. Permitir leitura pública da pasta avatars
CREATE POLICY "Public read access to avatars"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- 2. Permitir upload de avatares por usuários autenticados  
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- 3. Permitir update de avatares por usuários autenticados
CREATE POLICY "Authenticated users can update avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- 4. Permitir delete de avatares por usuários autenticados
CREATE POLICY "Authenticated users can delete avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- Verificar políticas criadas
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'storage' 
AND tablename = 'objects';
