-- SOLUÇÃO ALTERNATIVA: Desabilitar RLS completamente para company-assets
-- Use isso se as políticas não funcionarem

-- Primeiro, certifique-se de que o bucket existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('company-assets', 'company-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Remover todas as políticas existentes
DROP POLICY IF EXISTS "Public read access for company assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload company assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update company assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete company assets" ON storage.objects;

-- Desabilitar RLS no bucket (permite tudo)
-- ATENÇÃO: Isso remove restrições de segurança. Use apenas para testar.
UPDATE storage.buckets 
SET public = true 
WHERE id = 'company-assets';

-- Criar políticas permissivas (permite tudo para authenticated)
CREATE POLICY "Allow all for authenticated users"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'company-assets')
WITH CHECK (bucket_id = 'company-assets');

-- Permitir leitura pública
CREATE POLICY "Public read access"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'company-assets');
