# Sistema de Auto-Update da Base de Conhecimento

## Visão Geral

O i9HUBSST possui um sistema automatizado para manter as Normas Regulamentadoras (NRs) e outros documentos sempre atualizados.

## Arquitetura

### 1. Modos de Documento

O sistema suporta três modos de documentos:

- **LOCAL_PDF**: Upload manual de PDF pelo admin
- **EXTERNAL_LINK**: Link externo para referência (não processado pela IA)
- **AUTO_SYNC**: URL oficial que é baixada e sincronizada automaticamente

### 2. Frequências de Sincronização

Documentos AUTO_SYNC podem ter três frequências:

- **DAILY**: Verificação diária (24 horas)
- **WEEKLY**: Verificação semanal (7 dias) - **PADRÃO**
- **MONTHLY**: Verificação mensal (30 dias)

### 3. Endpoints

#### `/api/ai/knowledge/sync` (POST)
Sincroniza um documento a partir de URL:

```typescript
POST /api/ai/knowledge/sync
{
  "sourceUrl": "https://www.gov.br/trabalho-e-emprego/pt-br/...",
  "category": "NORMA",
  "title": "NR-12 - Segurança no Trabalho em Máquinas e Equipamentos",
  "description": "Norma sobre segurança em máquinas",
  "syncFrequency": "WEEKLY"
}
```

**Processo:**
1. Baixa PDF da URL fornecida
2. Extrai texto com pdf-parse
3. Divide em chunks de 1500 caracteres
4. Gera embeddings com OpenAI
5. Salva no Supabase Storage
6. Armazena embeddings no PostgreSQL
7. Atualiza `lastSyncAt`

#### `/api/ai/knowledge/sync?sourceId=xxx` (GET)
Força re-sincronização de documento existente.

#### `/api/ai/knowledge/upload-manual` (POST)
Upload manual de PDF (apenas admin):

```typescript
POST /api/ai/knowledge/upload-manual
FormData:
  - file: PDF file
  - category: "NORMA"
  - title: "Documento Interno"
  - description: "Descrição"
```

#### `/api/ai/knowledge/auto-update` (GET)
Cron job que atualiza todos os documentos AUTO_SYNC que precisam de sincronização.

**Header requerido:**
```
Authorization: Bearer {CRON_SECRET}
```

### 4. Cron Job (Vercel Cron)

Configurado em `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/ai/knowledge/auto-update",
      "schedule": "0 3 * * 0"
    }
  ]
}
```

**Schedule:** Todo domingo às 3:00 AM (horário UTC)

**Formato cron:** `minute hour day month weekday`
- `0 3 * * 0` = 3:00 AM aos domingos

### 5. Variáveis de Ambiente

Adicionar ao `.env.local` e Vercel:

```bash
# Secret para proteger endpoint de cron
CRON_SECRET=seu-secret-aqui-mude-em-producao

# URL base da aplicação (para chamadas internas)
NEXTAUTH_URL=https://seu-dominio.com
```

### 6. Storage no Supabase

Documentos são salvos em:

```
knowledge-base/
├── auto-sync/
│   ├── NORMA/
│   │   ├── nr-12-seguranca-maquinas.pdf
│   │   └── nr-35-trabalho-altura.pdf
│   └── LEI/
│       └── lei-6514-seguranca-medicina.pdf
└── uploads/
    └── PROCEDIMENTO/
        └── procedimento-interno.pdf
```

### 7. Schema do Banco

```prisma
model KnowledgeSource {
  id            String       @id @default(cuid())
  title         String
  description   String?
  category      String
  
  // Auto-Sync
  mode          DocumentMode @default(LOCAL_PDF)
  sourceUrl     String?      // URL oficial
  lastSyncAt    DateTime?    // Última sincronização
  syncFrequency String?      // DAILY, WEEKLY, MONTHLY
  
  // Storage
  storagePath   String?
  fileSize      Int?
  
  isActive      Boolean      @default(true)
  companyId     String?      // null = GLOBAL
  
  embeddings    KnowledgeEmbedding[]
  
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

enum DocumentMode {
  LOCAL_PDF
  EXTERNAL_LINK
  AUTO_SYNC
}
```

## Fluxo de Uso

### Adicionar NR para Auto-Sync

1. Admin acessa Biblioteca
2. Clica em "Adicionar Documento"
3. Seleciona modo "Auto-Sync"
4. Preenche:
   - Categoria: NORMA
   - Título: NR-12 - Segurança em Máquinas
   - URL oficial do MTE
   - Frequência: WEEKLY
5. Sistema baixa e processa imediatamente
6. Cron job mantém atualizado automaticamente

### Como o Cron Funciona

1. **Todo domingo 3:00 AM:**
   - Vercel chama `/api/ai/knowledge/auto-update`
   
2. **Endpoint verifica:**
   ```sql
   SELECT * FROM KnowledgeSource
   WHERE mode = 'AUTO_SYNC'
     AND isActive = true
     AND (
       lastSyncAt IS NULL OR
       (syncFrequency = 'DAILY' AND lastSyncAt < NOW() - INTERVAL '1 day') OR
       (syncFrequency = 'WEEKLY' AND lastSyncAt < NOW() - INTERVAL '7 days') OR
       (syncFrequency = 'MONTHLY' AND lastSyncAt < NOW() - INTERVAL '30 days')
     )
   ```

3. **Para cada documento:**
   - Chama `/api/ai/knowledge/sync` (POST)
   - Baixa PDF atualizado
   - Remove embeddings antigos
   - Gera novos embeddings
   - Atualiza `lastSyncAt`

4. **Aguarda 2 segundos** entre cada documento

5. **Retorna relatório:**
   ```json
   {
     "success": true,
     "timestamp": "2025-06-15T03:00:00Z",
     "total": 15,
     "updated": 14,
     "failed": 1,
     "errors": [
       {
         "documentId": "clx...",
         "error": "URL não acessível"
       }
     ]
   }
   ```

## Vantagens do Sistema

✅ **NRs sempre atualizadas** automaticamente do site oficial do MTE  
✅ **IA tem acesso ao conteúdo** via RAG (embeddings locais)  
✅ **Rastreabilidade** com `lastSyncAt` e histórico  
✅ **Flexibilidade** com três modos de documento  
✅ **Economia de trabalho manual** - admin não precisa fazer upload repetido  
✅ **Fonte oficial preservada** - link para MTE mantido  

## Monitoramento

### Logs no Vercel

Ver execuções do cron em: `Vercel Dashboard > Project > Logs > Filter by "/api/ai/knowledge/auto-update"`

### Verificar Última Sincronização

```sql
SELECT 
  title,
  category,
  syncFrequency,
  lastSyncAt,
  NOW() - lastSyncAt as "tempo_desde_sync"
FROM "KnowledgeSource"
WHERE mode = 'AUTO_SYNC'
ORDER BY lastSyncAt DESC;
```

### Forçar Re-Sync Manual

```bash
curl -X GET \
  "https://seu-dominio.com/api/ai/knowledge/sync?sourceId=clx..." \
  -H "Content-Type: application/json"
```

## Próximos Passos

- [ ] Adicionar notificações por email quando sync falha
- [ ] Dashboard de monitoramento de syncs
- [ ] Comparação de versões (diff) entre syncs
- [ ] Webhook para notificar quando MTE atualiza NR
- [ ] Cache inteligente para evitar downloads desnecessários
- [ ] Suporte para outros formatos (DOCX, HTML)

## Troubleshooting

### Cron não executando

1. Verificar `CRON_SECRET` no Vercel
2. Verificar schedule em `vercel.json`
3. Verificar logs no Vercel Dashboard

### Documento não sincronizando

1. Verificar `sourceUrl` é acessível
2. Verificar `isActive = true`
3. Verificar `lastSyncAt` e `syncFrequency`
4. Forçar sync manual via GET

### Embeddings duplicados

1. Verificar se endpoint `/sync` está deletando embeddings antigos
2. Rodar query de limpeza:
```sql
DELETE FROM "KnowledgeEmbedding"
WHERE "sourceId" IN (
  SELECT id FROM "KnowledgeSource" 
  WHERE mode = 'AUTO_SYNC'
);
```
3. Re-sincronizar documentos

---

**Documentação criada em:** 2025-06-15  
**Última atualização:** 2025-06-15
