# Configuração de Upload de Avatares - Supabase Storage

## Problema Identificado

Erro ao fazer upload de avatar:
```
Error [StorageApiError]: new row violates row-level security policy
status: 400, statusCode: '403'
```

## Solução: Adicionar Políticas RLS para Avatares

### Opção 1: Usar Admin Client (Recomendado - Implementado)

O código foi atualizado para usar `createAdminClient()` que bypassa as políticas RLS automaticamente.

### Opção 2: Adicionar Políticas RLS Específicas (Alternativa)

Se preferir usar client normal e adicionar políticas específicas, execute no **Supabase SQL Editor**:

```sql
-- Política 1: Permitir upload de avatares (INSERT)
CREATE POLICY "Users can upload their own avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND (storage.filename(name))::text LIKE auth.uid()::text || '%'
);

-- Política 2: Permitir atualização de avatares (UPDATE)
CREATE POLICY "Users can update their own avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND substring((storage.filename(name))::text from 1 for 36) = auth.uid()::text
);

-- Política 3: Permitir deleção de avatares (DELETE)
CREATE POLICY "Users can delete their own avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
  AND substring((storage.filename(name))::text from 1 for 36) = auth.uid()::text
);

-- Política 4: Permitir leitura pública (SELECT)
CREATE POLICY "Avatars are publicly readable"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'documents' 
  AND (storage.foldername(name))[1] = 'avatars'
);
```

## Estrutura de Arquivos

```
documents/
  ├── knowledge/        (documentos AI - admin only)
  └── avatars/          (fotos de perfil - usuários autenticados)
      ├── user-id-123-timestamp.jpg
      ├── user-id-456-timestamp.png
      └── ...
```

## Formato dos Nomes de Arquivo

- Padrão: `{userId}-{timestamp}.{ext}`
- Exemplo: `550e8400-e29b-41d4-a716-446655440000-1699012345678.jpg`

## Validações Implementadas

- ✅ Tipos permitidos: JPG, PNG, GIF, WEBP
- ✅ Tamanho máximo: 2MB
- ✅ Nome único por usuário/timestamp
- ✅ Upload usando Admin Client (bypassa RLS)

## Status Atual

✅ **Implementado**: Upload usando `createAdminClient()` do Supabase que tem permissões completas e não é bloqueado por RLS.

Não é necessário adicionar políticas RLS se usar Admin Client.
