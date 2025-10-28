# Verificação de Configuração do Supabase

## Problema Identificado
O reset de senha ainda está direcionando para `localhost:3000` mesmo com URL hardcoded.

## Possíveis Causas

### 1. **Configuração Site URL no Supabase Dashboard**
O Supabase pode estar usando a configuração do próprio dashboard.

**Solução:**
1. Acesse: https://app.supabase.com/project/zgnzobnearxgakhvxxyp/settings/general
2. Vá em **Settings → General → Configuration**
3. Verifique/Atualize:
   - **Site URL**: `https://i9hubsst.vercel.app`
   - **Additional Redirect URLs**: Adicione `https://i9hubsst.vercel.app/auth/callback`

### 2. **Cache do Supabase**
O Supabase pode estar fazendo cache da configuração anterior.

**Solução:**
- Aguardar alguns minutos após alterar as configurações
- Ou reiniciar o projeto no dashboard do Supabase

### 3. **Configuração de Auth Providers**
Verificar se há configurações específicas nos providers.

## URLs que Devem Estar Configuradas no Supabase

```
Site URL: https://i9hubsst.vercel.app

Additional Redirect URLs:
- https://i9hubsst.vercel.app/auth/callback
- https://i9hubsst.vercel.app/auth/callback?type=recovery&next=/auth/reset-password
```

## Teste Após Configuração
1. Atualizar configurações no Supabase Dashboard
2. Aguardar 5-10 minutos para propagação
3. Testar reset de senha novamente
4. Verificar se o link no email agora aponta para `https://i9hubsst.vercel.app`