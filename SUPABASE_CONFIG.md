# Configuração do Supabase para Confirmação de Email

Para que os links de confirmação de email funcionem corretamente no Replit, você precisa configurar a URL de redirect no painel do Supabase.

## ⚙️ Passos para Configurar

### 1. Acesse o Painel do Supabase
- Vá para [https://supabase.com/dashboard](https://supabase.com/dashboard)
- Faça login e selecione seu projeto

### 2. Configure a URL de Redirect
1. No menu lateral, clique em **Authentication** → **URL Configuration**
2. Na seção **Redirect URLs**, adicione esta URL:
   ```
   https://839c63d9-dbb8-437d-83b2-ef0aa41ae08a-00-3nwxw68s56w08.riker.replit.dev/auth/callback
   ```
3. Clique em **Save** ou **Add URL**

### 3. Configurações de Email (Opcional)
Se quiser personalizar os emails de confirmação:
1. Vá em **Authentication** → **Email Templates**
2. Edite o template "Confirm signup"
3. A variável `{{ .ConfirmationURL }}` será substituída automaticamente pela URL correta

## 🔄 Como Funciona

**Fluxo de Confirmação:**
1. Usuário se registra no sistema
2. Supabase envia email com link de confirmação
3. Link aponta para: `https://[seu-projeto].replit.dev/auth/callback?code=...`
4. Sistema processa o código e redireciona para o dashboard

## ✅ Testando

Após configurar:
1. Faça um novo registro em `/auth/register`
2. Verifique seu email
3. Clique no link de confirmação
4. Você deve ser redirecionado automaticamente para o dashboard

## ❓ Problemas Comuns

### "localhost:3000" no Link
- **Causa:** URL de redirect não configurada no Supabase
- **Solução:** Adicione a URL acima nas configurações

### "ERR_CONNECTION_REFUSED"
- **Causa:** Link apontando para localhost
- **Solução:** Verifique se a variável `NEXT_PUBLIC_SITE_URL` está configurada corretamente

### Email Não Chega
- **Verifique:** Pasta de spam
- **Verifique:** Email Templates no Supabase estão habilitados
- **Teste:** Peça para reenviar o email de confirmação

## 🔒 Segurança

- A URL de callback é segura e processa apenas tokens válidos do Supabase
- Tokens expiram após uso
- Não há risco de acesso não autorizado

## 📝 Notas

- Se você mudar o domínio do Replit, precisará atualizar a URL de redirect no Supabase
- A variável `NEXT_PUBLIC_SITE_URL` já está configurada nas Secrets do Replit
