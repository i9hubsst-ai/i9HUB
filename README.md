# i9HUBSST - Plataforma de Gestão de Segurança e Saúde do Trabalho

![HUBSST Logo](public/images/hubsst-logo.png)

Uma plataforma SaaS completa para gestão de SST com diagnóstico IMSST, assistente de IA integrado e controle multiempresa.

## 🚀 Funcionalidades

### ✅ Implementado (MVP)
- ✓ Autenticação multiempresa com Supabase
- ✓ Sistema de papéis (PlatformAdmin, CompanyAdmin, Engineer, Employer, Viewer)
- ✓ Gestão de empresas e CNPJ
- ✓ Diagnóstico IMSST com 5 dimensões de maturidade
- ✓ Cálculo automático de pontuação e níveis (1-5)
- ✓ Assistente de IA integrado (OpenAI)
- ✓ Geração de planos de ação personalizados
- ✓ Interface responsiva com branding HUBSST
- ✓ Row Level Security (RLS) no Supabase

### 🔜 Próximas Fases
- Comparativo histórico de diagnósticos
- Dashboard executivo consolidado
- Relatórios PDF com gráficos radar
- Marketplace de treinamentos
- Módulo de gestão de EPIs

## 🛠️ Stack Técnica

- **Frontend**: Next.js 15 + React + TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Backend**: Next.js Server Actions
- **Banco de Dados**: Supabase PostgreSQL
- **ORM**: Prisma
- **Autenticação**: Supabase Auth
- **IA**: OpenAI API
- **Validação**: Zod
- **Relatórios**: React-PDF / jsPDF

## 📋 Pré-requisitos

1. **Conta Supabase** (gratuita)
   - Acesse https://supabase.com
   - Crie um novo projeto
   - Anote as credenciais do projeto

2. **Chave OpenAI API** (opcional para MVP básico)
   - Acesse https://platform.openai.com
   - Crie uma API key

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e preencha as credenciais:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role

# Database (connection string do Supabase)
DATABASE_URL=postgresql://postgres:[sua-senha]@db.xxx.supabase.co:5432/postgres

# OpenAI (opcional)
OPENAI_API_KEY=sua-chave-openai

# Session Secret
SESSION_SECRET=sua-chave-secreta-aleatoria
```

### 2. Como encontrar as credenciais do Supabase

1. Acesse https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **API**:
   - **Project URL** = `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** = `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (clique em "reveal") = `SUPABASE_SERVICE_ROLE_KEY`
4. Vá em **Settings** → **Database** → **Connection String** → **URI**:
   - Copie a URL completa = `DATABASE_URL`

### 3. Configurar Banco de Dados

```bash
# Gerar Prisma Client
npx prisma generate

# Criar tabelas no banco
npx prisma db push

# (Opcional) Inserir dados de demonstração
npm run seed
```

### 4. Instalar Dependências

```bash
npm install
```

### 5. Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em http://localhost:5000

## 📊 Estrutura do Banco de Dados

### Principais Entidades

- **companies**: Empresas cadastradas (nome, CNPJ)
- **memberships**: Vínculos usuário-empresa-papel
- **platform_admins**: Administradores da plataforma
- **module_permissions**: Permissões por módulo para Employers
- **imsst_dimensions**: Dimensões de maturidade SST
- **imsst_questions**: Perguntas do diagnóstico
- **assessments**: Avaliações/diagnósticos
- **assessment_answers**: Respostas dos diagnósticos
- **assessment_scores**: Pontuações calculadas
- **action_plans**: Planos de ação gerados

## 👥 Papéis e Permissões

| Papel | Descrição | Múltiplas Empresas |
|-------|-----------|-------------------|
| **PlatformAdmin** | Administrador global, acesso total | ✓ Todas |
| **CompanyAdmin** | Gerencia uma empresa específica | ✗ Uma apenas |
| **Engineer** | Aplica diagnósticos e gera relatórios | ✓ Múltiplas |
| **Employer** | Funcionário com acesso limitado por módulo | ✗ Uma apenas |
| **Viewer** | Visualização apenas, sem edição | ✓ Múltiplas |

## 🔐 Segurança

- ✓ Row Level Security (RLS) ativo em todas as tabelas
- ✓ Autenticação via Supabase Auth
- ✓ Validação de dados com Zod
- ✓ Isolamento de dados por empresa (company_id)
- ✓ Audit logs para rastreabilidade

## 🧪 Dados de Seed

O sistema inclui dados de demonstração:

- 1 PlatformAdmin (admin@hubsst.com)
- 2 empresas demo
- 1 CompanyAdmin por empresa
- 2 Engineers multiempresa
- 2 Employers (um por empresa)
- 1 Viewer
- 5 dimensões IMSST com 25 perguntas

## 📦 Deploy

### Replit

O projeto está configurado para executar no Replit:

1. Configure as variáveis de ambiente no Replit Secrets
2. O servidor iniciará automaticamente na porta 5000

### Vercel / Outras Plataformas

```bash
# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 📝 Licença

Este projeto é proprietário e confidencial.

## 🆘 Suporte

Para suporte, entre em contato: suporte@i9hubsst.com.br

---

Desenvolvido com ❤️ pela equipe HUBSST
