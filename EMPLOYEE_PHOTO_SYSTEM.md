# Sistema de Fotos de Funcionários - i9HUBSST

## Visão Geral

Sistema completo para upload e gerenciamento de fotos de funcionários, integrado ao módulo de RH do i9HUBSST. Permite identificação visual dos colaboradores e melhora a experiência de usuário no sistema.

## Arquitetura

### Componentes Principais

1. **Modelo de Dados** (`prisma/schema.prisma`)
   - Campo `photo` (String?, opcional) adicionado ao modelo `Employee`
   - Armazena URL pública da foto no Supabase Storage
   - Migração aplicada em: 2024

2. **Server Actions** (`app/actions/employee-photo.ts`)
   - `uploadEmployeePhoto`: Upload de nova foto
   - `deleteEmployeePhoto`: Remoção de foto existente
   - Utiliza Service Role Key do Supabase (bypassa RLS)
   - Validações: tipo de arquivo, tamanho (max 5MB), permissões

3. **Componente de Upload** (`components/dashboard/employee-photo-upload.tsx`)
   - Preview circular da foto (ou placeholder)
   - Upload com preview local instantâneo
   - Botões de alterar/remover foto
   - Dialog de confirmação para remoção
   - Mensagens de erro inline

4. **Formulário de Edição** (`components/dashboard/employee-edit-form.tsx`)
   - Aba dedicada para foto (5ª aba)
   - Integrado ao formulário de edição com tabs
   - Separado do fluxo de dados principais do formulário

5. **Página de Detalhes** (`app/dashboard/employees/[id]/page.tsx`)
   - Exibe foto no header do funcionário
   - Foto circular com borda
   - Fallback para ícone quando sem foto

6. **Página de Edição** (`app/dashboard/employees/[id]/edit/page.tsx`)
   - Rota completa de edição com abas
   - Botão de voltar e salvar alterações
   - Navegação entre abas: Identificação, Contato, Vínculo, Foto, Adicional

## Storage no Supabase

### Configuração

**Bucket**: `company-assets` (reutilizado)
**Caminho**: `employee-photos/`
**Formato dos arquivos**: `{employeeId}-{timestamp}.{ext}`

### Tipos de Arquivo Permitidos
- image/jpeg
- image/jpg
- image/png
- image/webp

### Tamanho Máximo
- 5MB por arquivo

### Permissões (RLS)
- Usa Service Role Key para bypassar RLS
- Verifica permissões em nível de aplicação:
  - Platform Admin: acesso total
  - Company Admin/Member: apenas funcionários da própria empresa

## Fluxo de Upload

1. **Seleção do Arquivo**
   - Input file com accept específico
   - Validação de tipo e tamanho no cliente

2. **Preview Local**
   - FileReader para preview instantâneo
   - Exibição em container circular

3. **Upload ao Servidor**
   - FormData com arquivo
   - Server Action valida novamente
   - Verifica permissões do usuário
   - Upload para Supabase Storage

4. **Atualização do Banco**
   - URL pública salva no campo `photo`
   - Foto antiga removida do storage (se existir)
   - Revalidação da página

5. **Feedback ao Usuário**
   - Loading states durante upload
   - Mensagens de erro descritivas
   - Atualização automática da UI

## Segurança

### Validações Implementadas

1. **Autenticação**
   ```typescript
   const user = await getCurrentUser()
   if (!user) return { error: 'Não autorizado' }
   ```

2. **Autorização**
   ```typescript
   const isAdmin = await isPlatformAdmin(user.id)
   const isMember = employee.company.memberships.length > 0
   if (!isAdmin && !isMember) return { error: 'Sem permissão' }
   ```

3. **Validação de Arquivo**
   - Tipos permitidos (whitelist)
   - Tamanho máximo
   - Verificação MIME type

4. **Isolamento de Dados**
   - Verifica companyId do funcionário
   - Confirma membership antes de permitir ação

## Estrutura de Rotas

```
/dashboard/employees/[id]           → Ver detalhes (com foto)
/dashboard/employees/[id]/edit      → Editar (5 abas, incluindo foto)
```

## Integração com Sistema Existente

### Compatibilidade
- Reutiliza bucket `company-assets` (mesma infra de logos)
- Mesmo padrão de Service Role Key
- Logs consistentes com formato `[Photo Upload]`
- Tratamento de erros padronizado

### Multi-Tenancy
- Respeita isolamento por empresa
- CPF único por empresa (permite mesmo funcionário em múltiplas empresas)
- Foto vinculada ao registro específico (não ao CPF)

## Manutenção e Limpeza

### Gestão de Armazenamento

**Fotos antigas são automaticamente removidas quando:**
1. Nova foto é enviada (substitui a anterior)
2. Usuário remove a foto manualmente
3. Funcionário é excluído (via ON DELETE CASCADE da empresa)

**Órfãos potenciais:**
- Se update falhar após upload bem-sucedido
- Recomendação: job periódico para limpar arquivos sem referência

## Exemplos de Uso

### Upload de Foto
```typescript
const formData = new FormData()
formData.append('photo', file)
const result = await uploadEmployeePhoto(employeeId, formData)
```

### Remoção de Foto
```typescript
const result = await deleteEmployeePhoto(employeeId)
```

### Exibição com Fallback
```tsx
{employee.photo ? (
  <Image src={employee.photo} alt={name} width={80} height={80} />
) : (
  <User className="h-12 w-12" />
)}
```

## Melhorias Futuras

### Possíveis Expansões
1. **Redimensionamento automático** (otimização de tamanho)
2. **Crop de imagem** (interface para recorte)
3. **Thumbnails** (versões menores para listagens)
4. **Galeria de histórico** (manter fotos antigas)
5. **Reconhecimento facial** (integração com controle de acesso)
6. **Sync com Active Directory** (importar fotos corporativas)
7. **Compressão automática** (reduzir uso de storage)
8. **CDN** (cache e distribuição global)

### Otimizações Técnicas
- [ ] Lazy loading de imagens em listagens
- [ ] Placeholder blur (Next.js Image)
- [ ] WebP como formato preferencial
- [ ] Batch operations (múltiplos uploads)

## Troubleshooting

### Problemas Comuns

**Erro: "Configuração de storage incorreta"**
- Verificar `SUPABASE_SERVICE_ROLE_KEY` no .env
- Confirmar permissões do bucket

**Erro: "Tipo de arquivo não permitido"**
- Validar MIME type do arquivo
- Verificar extensão do arquivo

**Foto não aparece após upload**
- Verificar URL pública no banco
- Confirmar políticas de acesso ao bucket
- Testar URL diretamente no navegador

**Erro 403 ao acessar foto**
- Verificar políticas RLS do bucket
- Confirmar bucket está público
- Checar CORS do Supabase

## Referências

- Supabase Storage: https://supabase.com/docs/guides/storage
- Next.js Image: https://nextjs.org/docs/api-reference/next/image
- Prisma Schema: https://www.prisma.io/docs/concepts/components/prisma-schema

---

**Autor**: Sistema i9HUBSST
**Data**: Janeiro 2025
**Versão**: 1.0
