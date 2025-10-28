# 🔗 Integração Supabase + Vercel - Guia Completo

## 🎯 **Objetivo**
Resolver definitivamente o problema de URLs de reset de senha configurando a integração oficial entre Supabase e Vercel.

## 📋 **Passos para Integração**

### **1. Acesse o Vercel Dashboard**
- URL: https://vercel.com/dashboard
- Vá ao projeto: **i9hubsst**

### **2. Configure a Integração**
1. **Settings → Integrations**
2. **Browse Marketplace**
3. **Procure "Supabase"**
4. **Add Integration**

### **3. Conecte o Projeto Supabase**
1. **Authorize** a integração
2. **Select Supabase Project**: `zgnzobnearxgakhvxxyp`
3. **Configure Environment Variables**:
   - Marque todas as opções
   - Incluir `NEXT_PUBLIC_SUPABASE_URL`
   - Incluir `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Incluir `SUPABASE_SERVICE_ROLE_KEY`

### **4. Configurações Automáticas**
A integração automaticamente configurará:
- ✅ URLs de produção corretas
- ✅ Variáveis de ambiente sincronizadas
- ✅ Deploy hooks para mudanças no Supabase
- ✅ Site URL no Supabase = URL do Vercel

## 🚀 **Vantagens da Integração**

### **Automação**
- Configuração automática de URLs
- Sincronização de credenciais
- Deploy automático em mudanças

### **Segurança**
- Variáveis de ambiente gerenciadas automaticamente
- Rotação de chaves simplificada
- Isolamento por ambiente (preview/production)

### **Conveniência**
- Dashboard unificado
- Logs centralizados
- Troubleshooting simplificado

## 🔧 **Após a Integração**

### **1. Verificar Configurações**
- Acesse: https://i9hubsst.vercel.app/debug
- Confirme que `NEXT_PUBLIC_SITE_URL` está correto

### **2. Testar Reset de Senha**
- Use a funcionalidade no dashboard
- Verifique se o link no email aponta para `i9hubsst.vercel.app`

### **3. Cleanup (Opcional)**
- Remover variáveis manuais se duplicadas
- Limpar arquivos `.env` locais desnecessários

## 💡 **Alternativa: Solução Manual Implementada**

Caso a integração não seja possível, já implementamos:

1. **Serviço Customizado**: `/lib/services/password-reset-service.ts`
2. **Substituição de URLs**: Força produção mesmo se Supabase gerar localhost
3. **Logs Detalhados**: Para troubleshooting

## 🎯 **Próximos Passos**

1. **Configure a integração** seguindo os passos acima
2. **Teste a funcionalidade** após a integração
3. **Se houver problemas**, o serviço customizado já está ativo como fallback

A integração Supabase + Vercel é a **solução mais elegante e robusta** para este problema! 🚀