# Configuração da API Gemini (Google AI)

## Visão Geral
O i9HUBSST usa a API Gemini do Google para recursos de IA, incluindo:
- Revisão de templates de diagnóstico
- Geração de relatórios
- Sugestões inteligentes

## Configuração da Chave da API

### 1. Obter a Chave da API
1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie um novo projeto ou selecione um existente
3. Gere uma nova chave de API
4. Copie a chave gerada (formato: `AIza...`)

### 2. Configurar Localmente

Adicione no arquivo `.env.local`:
```env
GEMINI_API_KEY=sua_chave_aqui
```

### 3. Configurar no Vercel (Produção)

#### Via Dashboard Vercel:
1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** → **Environment Variables**
3. Adicione a variável:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Sua chave da API Gemini
   - **Environments**: Selecione Production, Preview e Development

#### Via CLI Vercel:
```bash
vercel env add GEMINI_API_KEY
# Cole a chave quando solicitado
# Selecione os ambientes (Production, Preview, Development)
```

### 4. Redeploy

Após adicionar a variável de ambiente, faça um novo deploy:
```bash
git commit --allow-empty -m "Trigger redeploy para aplicar GEMINI_API_KEY"
git push
```

Ou via dashboard: **Deployments** → **...** → **Redeploy**

## Verificação da Configuração

### Endpoint de Diagnóstico
Acesse como administrador:
```
GET /api/ai/check-config
```

Resposta esperada:
```json
{
  "geminiApiKey": "Configurada (✓)",
  "geminiApiKeyLength": 39,
  "nodeEnv": "production",
  "vercelEnv": "production"
}
```

### Teste Manual
Execute no terminal local:
```bash
node -e "console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Configurado' : '❌ Não configurado')"
```

## Solução de Problemas

### Erro: "Configuração de IA não encontrada"
- **Causa**: `GEMINI_API_KEY` não está definida
- **Solução**: Configure a variável no Vercel e faça redeploy

### Erro: "API key não válida"
- **Causa**: Chave incorreta ou expirada
- **Solução**: Gere uma nova chave no Google AI Studio

### Erro: "Limite de uso atingido"
- **Causa**: Quota da API esgotada (código 429 - RESOURCE_EXHAUSTED)
- **Solução**: 
  - **Imediato**: Aguarde alguns segundos e tente novamente (o erro mostra o tempo de retry)
  - **Curto prazo**: Aguarde o reset da quota por minuto (60 segundos)
  - **Longo prazo**: Aguarde o reset da quota diária (00:00 UTC)
  - **Definitivo**: Atualize para o plano pago no Google Cloud
  - **Alternativa**: Use o modelo `gemini-1.5-flash` em vez de `gemini-2.0-flash-exp`

### Erro: "Modelo indisponível"
- **Causa**: Modelo `gemini-2.0-flash-exp` não acessível
- **Solução**: Verifique se sua conta tem acesso ao modelo experimental

## Modelos Utilizados

### Atual: gemini-1.5-flash
- Modelo estável e confiável
- Suporta JSON estruturado
- Limites generosos no free tier
- Ideal para análise de templates SST

### Experimental: gemini-2.0-flash-exp
⚠️ **Atenção**: Este modelo tem limites muito baixos no free tier e pode esgotar rapidamente.
- Melhor performance em alguns casos
- Limites mais restritos (0 após esgotamento)
- Use apenas em contas pagas

Para usar o modelo experimental, altere em:
- `app/api/ai/template-reviewer/route.ts`
- `app/api/ai/template-builder/route.ts`
- `app/api/ai/report-writer/route.ts`

```typescript
model: 'gemini-2.0-flash-exp'
```

## Custo e Limites

### Free Tier (Google AI Studio)
**gemini-1.5-flash**:
- 15 requisições por minuto
- 1 milhão de tokens por minuto
- 1,500 requisições por dia

**gemini-2.0-flash-exp** (experimental):
- Limites muito restritos
- Não recomendado para produção no free tier
- Pode esgotar rapidamente

### Paid Tier (Google Cloud)
- Consulte [preços atualizados](https://ai.google.dev/pricing)
- Limites configuráveis por projeto
- Recomendado para produção com alto volume

## Segurança

⚠️ **NUNCA** commite a chave da API no código
- Use apenas variáveis de ambiente
- Não exponha a chave no frontend
- Mantenha `.env.local` no `.gitignore`

## Referências

- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
