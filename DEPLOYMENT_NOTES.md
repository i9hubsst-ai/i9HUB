# 🚀 DEPLOYMENT NOTES - VERCEL

## ⚠️ LEMBRETE IMPORTANTE
**ESTE PROJETO ESTÁ DEPLOYADO NA VERCEL - NÃO É AMBIENTE LOCAL!**

### 📍 Ambiente de Produção
- **Plataforma**: Vercel
- **URL**: Configurada na Vercel
- **Build**: Automático via git push
- **Logs**: Acessíveis via dashboard da Vercel

### 🔧 Correções Críticas Implementadas

#### 🤖 **Chat AI - Modelo Gemini**
- **Problema**: `models/gemini-1.5-flash is not found for API version v1beta`
- **Solução**: Removido prefixo `models/` do nome do modelo
- **Antes**: `google('models/gemini-1.5-flash')`
- **Depois**: `google('gemini-1.5-flash')`
- **Status**: ✅ Corrigido em 30/10/2025

#### 🔗 **Supabase Client**
- **Problema**: `createClient()` sendo tratado como síncrono
- **Solução**: Adicionado `await` nas chamadas
- **Status**: ✅ Corrigido

#### 📦 **Componentes UI**
- **Problema**: `scroll-area.tsx` vazio causando erro de módulo
- **Solução**: Implementado componente completo
- **Status**: ✅ Corrigido

### 🔧 Para Debug de Erros de Deploy:
1. **Vercel Dashboard**: Verificar logs de build/runtime
2. **Environment Variables**: Confirmar se estão configuradas
3. **Build Logs**: Analisar erros específicos na Vercel
4. **Runtime Logs**: Verificar erros em tempo real

### 🚨 NÃO CONFUNDIR:
- ❌ Não é servidor local (npm run dev)
- ❌ Não precisa parar processos Node.js
- ❌ Não é localhost:3000
- ✅ É deploy automático na Vercel
- ✅ Logs estão no dashboard da Vercel
- ✅ Mudanças são deployadas via git push

### 📋 Checklist para Erros de Deploy:
- [ ] Verificar Vercel Dashboard
- [ ] Conferir Environment Variables
- [ ] Analisar Build Logs
- [ ] Verificar Runtime Errors
- [ ] Confirmar dependências no package.json
- [ ] Validar arquivos de configuração
- [ ] Verificar nomes de modelos AI (sem prefixos desnecessários)

**SEMPRE LEMBRAR: VERCEL = PRODUÇÃO, NÃO LOCAL!**