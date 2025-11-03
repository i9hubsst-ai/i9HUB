-- Script SIMPLIFICADO - Execute apenas esta linha no Supabase SQL Editor
-- Esta é a política ESSENCIAL para que os avatares sejam visíveis

CREATE POLICY "avatars_public_read"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);
