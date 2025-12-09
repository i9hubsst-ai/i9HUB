-- SOLUÇÃO DEFINITIVA: Desabilitar RLS completamente para company-assets
-- Este script remove todas as restrições de segurança para permitir upload

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "Public read access for company assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload company assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update company assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete company assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow all for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Public read access" ON storage.objects;

-- Garantir que o bucket existe e é público
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-assets', 'company-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- IMPORTANTE: Criar uma política super permissiva que permite TUDO
CREATE POLICY "company-assets-all-access"
ON storage.objects
AS PERMISSIVE
FOR ALL
TO public
USING (bucket_id = 'company-assets')
WITH CHECK (bucket_id = 'company-assets');

