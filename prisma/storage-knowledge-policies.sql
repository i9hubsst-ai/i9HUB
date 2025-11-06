-- Políticas RLS para bucket 'documents' - pasta 'knowledge/'
-- Execute no SQL Editor do Supabase Dashboard

-- 1. REMOVER POLÍTICAS ANTIGAS (se existirem)
DROP POLICY IF EXISTS "Platform admins can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Platform admins can read documents" ON storage.objects;
DROP POLICY IF EXISTS "Platform admins can delete documents" ON storage.objects;

-- 2. CRIAR POLÍTICAS CORRETAS
-- Importante: Converter auth.uid() para TEXT pois userId é String no Prisma

-- Política 1: Upload (INSERT)
CREATE POLICY "Platform admins can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'knowledge'
  AND EXISTS (
    SELECT 1 FROM platform_admins 
    WHERE "userId" = auth.uid()::text
  )
);

-- Política 2: Download (SELECT)
CREATE POLICY "Platform admins can read documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents'
  AND EXISTS (
    SELECT 1 FROM platform_admins 
    WHERE "userId" = auth.uid()::text
  )
);

-- Política 3: Delete
CREATE POLICY "Platform admins can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents'
  AND EXISTS (
    SELECT 1 FROM platform_admins 
    WHERE "userId" = auth.uid()::text
  )
);

-- 4. VERIFICAR POLÍTICAS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%Platform admin%';
