# Como Limpar Cache do Vercel

Se o erro "WITHIN GROUP" persistir após deploys, o cache do Vercel pode estar corrompido.

## Solução 1: Via Dashboard (Recomendado)

1. Acesse: https://vercel.com/i9hubssts-projects/i9hubsst
2. Vá em **Settings** → **General**
3. Role até **Build & Development Settings**
4. Clique em **Redeploy** (último deployment)
5. Marque: **"Clear Cache and Redeploy"**
6. Clique em **Redeploy**

## Solução 2: Via CLI (Alternativa)

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Login
vercel login

# Fazer deploy forçado sem cache
vercel --prod --force
```

## Solução 3: Deletar e Recriar Deployment

Se nada funcionar:
1. Settings → General → **Delete Project**
2. Recriar projeto no Vercel
3. Conectar ao repositório GitHub
4. Configurar variáveis de ambiente novamente

## Por que isso acontece?

O Vercel cacheia o Prisma Client gerado. Se o schema muda mas o cache não é invalidado, 
o código antigo (com groupBy) ainda é executado mesmo com código novo no GitHub.

## Verificar se funcionou

Após redeploy, verifique os logs:
- ✅ Deve mostrar: `✔ Generated Prisma Client`
- ✅ Não deve mostrar erro "WITHIN GROUP"
