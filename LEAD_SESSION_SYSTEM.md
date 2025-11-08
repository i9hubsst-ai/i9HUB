# Sistema de Sessão para Leads - MA.IA Pré-Lançamento

## 📋 Visão Geral

O sistema permite que **leads** (não-clientes) acessem o chat MA.IA **sem necessidade de login tradicional**, mantendo histórico de conversas persistido.

---

## 🔄 Fluxo Completo

### 1️⃣ **Primeira Visita** (Novo Lead)

```
Usuário acessa /maia
    ↓
Preenche formulário de cadastro (7 seções)
    ↓
POST /api/leads (salva no banco)
    ↓
Retorna { leadId, email, name }
    ↓
createLeadSession() → Salva em localStorage
    {
      leadId: "clxxx...",
      email: "user@company.com",
      name: "João Silva",
      createdAt: "2025-11-08T...",
      expiresAt: "2025-12-08T..." // 30 dias
    }
    ↓
Redireciona para /maia/obrigado
    ↓
Clica "Usar MA.IA Grátis" → /maia/chat
    ↓
Chat carrega histórico vazio
    ↓
Mostra mensagem de boas-vindas personalizada
```

### 2️⃣ **Segunda Visita** (Lead Retornando)

```
Usuário acessa /maia/chat
    ↓
useEffect() → getLeadSession()
    ↓
Verifica localStorage
    ↓
Sessão encontrada e válida?
    ├─ SIM:
    │   ↓
    │   Busca histórico: GET /api/maia/chat?leadId=xxx
    │   ↓
    │   Carrega mensagens anteriores
    │   ↓
    │   Usuário continua de onde parou ✅
    │
    └─ NÃO:
        ↓
        Redireciona para /maia#cadastro
        (precisa se cadastrar novamente)
```

---

## 💾 Estrutura de Dados

### Lead (Prisma Schema)

```prisma
model Lead {
  id            String   @id @default(cuid())
  name          String
  email         String   @unique
  phone         String?
  company       String
  cargo         String
  setor         String
  // ... outros campos
  createdAt     DateTime @default(now())
}
```

### ChatMessage (Novo)

```prisma
model ChatMessage {
  id        String   @id @default(cuid())
  leadId    String   // FK para Lead
  role      String   // "user" | "assistant"
  content   String   @db.Text
  tokens    Int?
  model     String?
  createdAt DateTime @default(now())
  
  @@index([leadId])
  @@index([createdAt])
}
```

### LeadSession (LocalStorage)

```typescript
interface LeadSession {
  leadId: string        // Referência ao Lead no banco
  email: string         // Email do lead
  name: string          // Nome para personalização
  createdAt: string     // ISO timestamp
  expiresAt: string     // +30 dias
}
```

---

## 🔐 Segurança e Validações

### ✅ O que SIM fazemos:

1. **Validar leadId existe** antes de salvar mensagem
2. **Verificar expiração** da sessão (30 dias)
3. **Limitar histórico** a 100 mensagens por lead
4. **Armazenar apenas essencial** no localStorage

### ❌ O que NÃO fazemos (por ser pré-lançamento):

1. ❌ Autenticação via senha/token
2. ❌ Confirmação de email
3. ❌ Rate limiting agressivo
4. ❌ Criptografia de mensagens

---

## 📡 APIs Criadas

### `GET /api/maia/chat?leadId={id}`

Retorna histórico de mensagens do lead.

**Resposta:**
```json
{
  "messages": [
    {
      "id": "msg_xxx",
      "role": "user",
      "content": "Quais são os requisitos da NR-12?",
      "createdAt": "2025-11-08T10:30:00Z"
    },
    {
      "id": "msg_yyy",
      "role": "assistant",
      "content": "A NR-12 estabelece...",
      "createdAt": "2025-11-08T10:30:05Z"
    }
  ]
}
```

### `POST /api/maia/chat`

Salva nova mensagem no histórico.

**Request:**
```json
{
  "leadId": "clxxx...",
  "role": "user",
  "content": "Como fazer APR?",
  "tokens": 15,
  "model": "gpt-4"
}
```

**Resposta:**
```json
{
  "success": true,
  "messageId": "msg_zzz"
}
```

---

## 🎯 Casos de Uso

### Caso 1: Lead novo cadastra e usa chat

✅ **Funciona perfeitamente**
- Cadastro → Sessão criada → Chat disponível
- Mensagens salvas no banco
- Pode fechar navegador e voltar

### Caso 2: Lead retorna após 1 semana

✅ **Funciona perfeitamente**
- Sessão ainda válida (30 dias)
- Histórico carregado automaticamente
- Continua conversando

### Caso 3: Lead limpa localStorage

⚠️ **Precisa se cadastrar novamente**
- Sessão perdida
- Redireciona para `/maia#cadastro`
- **Histórico anterior permanece no banco** (vinculado ao email)
- Possível recuperar depois

### Caso 4: Lead tenta acessar chat sem cadastro

🚫 **Bloqueado**
- `getLeadSession()` retorna `null`
- Redireciona automático para `/maia#cadastro`

### Caso 5: Sessão expirou (>30 dias)

🔄 **Renovação necessária**
- Sistema detecta expiração
- Limpa localStorage
- Redireciona para cadastro

---

## 🚀 Migração Futura para Cliente

Quando o lead **converter** e virar cliente HUBSST:

```typescript
// 1. Criar usuário na plataforma
const user = await createUser(lead.email, password)

// 2. Vincular histórico do chat
await prisma.lead.update({
  where: { id: leadId },
  data: { 
    userId: user.id,
    status: 'converted',
    convertedAt: new Date()
  }
})

// 3. Migrar mensagens para conta do usuário
await prisma.chatMessage.updateMany({
  where: { leadId },
  data: { userId: user.id } // Nova coluna a criar
})

// 4. Limpar sessão temporária
clearLeadSession()

// 5. Criar sessão autenticada
createAuthSession(user)
```

---

## 📊 Vantagens do Sistema

### ✅ **Para o Lead:**
- ✨ Zero fricção - sem senha, sem confirmação
- 💬 Histórico persistente
- 📱 Funciona em qualquer dispositivo (mesmo localStorage)
- ⏱️ Acesso imediato após cadastro

### ✅ **Para o Negócio:**
- 📈 Maior conversão (menos barreiras)
- 💾 Dados de uso do chat (engajamento)
- 🎯 Segmentação por cargo/setor
- 🔄 Fácil migração para cliente

### ✅ **Para Desenvolvimento:**
- 🛠️ Simples de implementar
- 🔒 Seguro o suficiente para pré-lançamento
- 📊 Métricas claras de uso
- 🚀 Escalável

---

## 📝 Limitações Conhecidas

1. **LocalStorage limitado**
   - Se usuário usar navegador anônimo → perde sessão
   - Se limpar dados → precisa recadastrar
   
2. **Sem sincronização cross-device**
   - Sessão é por navegador
   - Histórico está no banco, mas precisa mesmo leadId

3. **Sem recuperação de senha**
   - Porque não tem senha! 😄
   - Se perder sessão, recadastra (email único)

4. **Limite de 30 dias**
   - Após expirare, precisa novo cadastro
   - Histórico antigo permanece no banco

---

## 🔧 Próximos Passos

### Curto Prazo:
- [ ] Adicionar botão "Limpar histórico" no chat
- [ ] Mostrar nome do lead no header
- [ ] Contador de mensagens disponíveis

### Médio Prazo:
- [ ] Integrar IA real (OpenAI/Gemini)
- [ ] Sistema de sugestões automáticas
- [ ] Export de conversas (PDF)

### Longo Prazo:
- [ ] Migração automática lead → cliente
- [ ] Multi-device sync (opcional)
- [ ] Chat voice (transcrição)

---

## 🎨 UX Flow Diagram

```
┌─────────────┐
│  Landing    │
│  /maia      │
└──────┬──────┘
       │
       │ Clica "Testar Grátis"
       ↓
┌─────────────┐
│ Formulário  │
│ 7 seções    │
└──────┬──────┘
       │
       │ Submit
       ↓
┌─────────────┐
│ API Leads   │
│ + Session   │
└──────┬──────┘
       │
       │ leadId saved
       ↓
┌─────────────┐
│ Obrigado    │
│ /obrigado   │
└──────┬──────┘
       │
       │ Clica "Usar MA.IA"
       ↓
┌─────────────┐
│   Chat      │
│  /maia/chat │◄──── Retorna direto (sessão ativa)
└─────────────┘
```

---

## 💡 Conclusão

Este sistema oferece **experiência fluida de onboarding** sem comprometer segurança básica, ideal para **captura e engajamento de leads** no pré-lançamento do MA.IA.

Quando o produto evoluir para versão paga, o histórico e dados já estarão prontos para migração! 🚀
