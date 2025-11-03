-- Execute este script no Supabase SQL Editor para permitir acesso público aos avatares

-- 1. Permitir leitura pública da pasta avatars
CREATE POLICY IF NOT EXISTS "Public read access to avatars"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- 2. Permitir upload de avatares por usuários autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- 3. Permitir update de avatares por usuários autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can update avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- 4. Permitir delete de avatares por usuários autenticados
CREATE POLICY IF NOT EXISTS "Authenticated users can delete avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);

-- Verificar políticas criadas
SELECT * FROM storage.policies WHERE bucket_id = 'documents';
