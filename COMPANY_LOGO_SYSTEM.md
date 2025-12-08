# Sistema de Logo de Empresas

Este documento descreve a implementação do sistema de upload e exibição de logos para empresas.

## Configuração do Storage

### 1. Criar bucket no Supabase

Execute o arquivo SQL para criar o bucket e as políticas:

```sql
-- Arquivo: prisma/storage-company-assets.sql
```

Ou crie manualmente via Supabase Dashboard:
1. Acesse Storage no painel do Supabase
2. Crie um novo bucket chamado `company-assets`
3. Marque como **público**
4. Configure as políticas de acesso conforme o SQL

### 2. Estrutura de Arquivos

Os logos são armazenados em:
```
company-assets/
  company-logos/
    {companyId}-{timestamp}.{ext}
```

## Funcionalidades

### Upload de Logo

- **Localização**: Aba "Logo" no formulário de edição de empresa
- **Formatos aceitos**: JPG, PNG, WEBP, SVG
- **Tamanho máximo**: 5MB
- **Preview**: Exibe preview antes e depois do upload
- **Substituição**: Ao fazer novo upload, o logo antigo é deletado automaticamente

### Exibição do Logo

O logo é exibido nas seguintes telas:

1. **Listagem de Empresas** (`/dashboard/companies`)
   - Logo em miniatura (48x48px) ao lado do nome
   - Fallback para ícone Building2 se não houver logo

2. **Detalhes da Empresa** (`/dashboard/companies/[id]`)
   - Logo maior (64x64px) no cabeçalho
   - Fallback para ícone Building2 se não houver logo

### Remoção de Logo

- Botão "Remover" na aba de logo
- Confirmação via AlertDialog
- Remove do storage e limpa referência no banco

## Server Actions

### `uploadCompanyLogo(companyId, formData)`

Faz upload do logo para o Supabase Storage:
- Valida tipo e tamanho do arquivo
- Verifica permissões do usuário
- Remove logo anterior se existir
- Atualiza registro no banco com URL pública

### `deleteCompanyLogo(companyId)`

Remove o logo da empresa:
- Verifica permissões
- Deleta arquivo do storage
- Limpa campo `logo` no banco

## Schema

O campo `logo` já existe no modelo Company:

```prisma
model Company {
  // ...
  logo String?
  // ...
}
```

Armazena a URL pública do logo no Supabase Storage.

## Componentes

### `CompanyLogoUpload`

Componente client-side para upload/remoção de logo:
- Preview do logo atual ou placeholder
- Input de arquivo com validação
- Botões de upload e remoção
- Feedback de loading durante operações

**Props:**
- `companyId`: ID da empresa
- `currentLogo`: URL do logo atual (opcional)

## Segurança

- Upload restrito a usuários autenticados
- Validação de permissões (usuário deve ser membro da empresa)
- Validação de tipo e tamanho de arquivo
- Storage com políticas RLS configuradas
