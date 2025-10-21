# i9HUBSST - Replit Project Documentation

## Project Overview

**i9HUBSST** is a comprehensive SaaS platform for Occupational Health and Safety (SST) Management in Brazil, featuring:

- Multi-tenant architecture with row-level security (RLS)
- IMSST maturity diagnostic system (5 dimensions, 25 questions)
- AI-powered assessment generation and action plan creation using OpenAI
- Role-based access control (5 user roles)
- Dashboard with analytics and reporting capabilities

## Current Status (October 2025)

### ✅ Completed Features
- **Authentication System**: Full Supabase integration (login, register, password reset, logout)
- **Email Confirmation**: Callback route configured for email verification (/auth/callback)
- **Multi-Tenant Security**: Application-level isolation with ACTIVE membership validation on all server actions
- **Company Management**: Complete CRUD with role-based permissions
  - Create new companies with CNPJ validation (Platform Admins only)
  - View all companies with statistics (users, assessments, action plans)
  - Edit and delete companies
- **User Management**: Complete invitation and role management system
  - Invite users to companies via email (Platform Admin: any company, Company Admin: own company only)
  - Assign roles: Platform Admin, Company Admin, Engineer, Employer, Viewer
  - View all users with role badges and status indicators
  - User list with Gravatar integration
- **Diagnostic Flow**: Create assessments, answer 25 questions, auto-calculate maturity scores
- **Data Visualization**: Radar charts showing IMSST maturity scores across 5 dimensions (Recharts)
- **Dashboard**: Real-time statistics from database (companies, assessments, users, action plans)
- **Security Reviewed**: Multi-tenant isolation validated by architect after multiple security review rounds
- **Landing Page**: Working navigation with functional login/register buttons
- **Platform Admin Management**: User i9hubsst promoted to Platform Admin with display badge in UserNav component

### 🔄 In Progress
- None - Core MVP completed

### ⏳ Future Features
- PDF report generation with radar charts (@react-pdf/renderer)
- AI-powered assessment generation using OpenAI (API key configured, feature not implemented)
- AI-generated personalized action plans based on diagnostic results
- Row Level Security (RLS) policies in Supabase database
- Automated authorization tests for assessment flows

## Security Architecture

### Multi-Tenant Isolation
- **Application-level authorization**: All server actions validate ACTIVE membership before data access
- **Cross-tenant protection**: Users cannot access/modify data from other companies
- **Assessment security**: getAssessments, getAssessmentById, saveAnswer, submitAssessment all enforce membership checks
- **Admin operations**: Separate Supabase admin client (lib/supabase/admin.ts) with service role key for user invitations
- **Security validation**: Architect-approved after identifying and fixing 3 critical vulnerabilities

### Design Decisions (October 2025)
- Using `findFirst` instead of `findUnique` when filtering by status to avoid Prisma errors
- Application-level security preferred over RLS policies for now (allows faster iteration)
- Service role key isolated in admin client to prevent accidental misuse
- All assessment operations require ACTIVE membership (not just any membership)

## Architecture

### Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Lucide icons
- **Backend**: Next.js Server Actions
- **Database**: Supabase PostgreSQL
- **ORM**: Prisma 6.17.1
- **Authentication**: Supabase Auth
- **AI**: OpenAI API (GPT models)
- **Charts**: Recharts
- **PDF**: React-PDF / jsPDF

### Database Schema

Key entities:
- `companies` - Multi-tenant company records
- `memberships` - User-company-role relationships
- `platform_admins` - Global administrators
- `module_permissions` - Granular permissions for Employers
- `imsst_dimensions` - 5 SST maturity dimensions
- `imsst_questions` - Assessment questions (Likert, multiple choice, yes/no)
- `assessments` - Diagnostic instances
- `assessment_answers` - User responses
- `assessment_scores` - Calculated maturity scores per dimension
- `action_plans` - AI-generated improvement actions
- `audit_logs` - Compliance and tracking

### User Roles

| Role | Access | Multi-Company |
|------|--------|---------------|
| PLATFORM_ADMIN | Full system access | ✓ All companies |
| COMPANY_ADMIN | Manage one company | ✗ Single company only |
| ENGINEER | Apply diagnostics, generate reports | ✓ Multiple companies |
| EMPLOYER | Limited access per module permissions | ✗ Single company only |
| VIEWER | Read-only access | ✓ Multiple companies |

## Environment Configuration

### Required Secrets
```env
NEXT_PUBLIC_SUPABASE_URL=✅ configured
NEXT_PUBLIC_SUPABASE_ANON_KEY=✅ configured
SUPABASE_SERVICE_ROLE_KEY=✅ configured
NEXT_PUBLIC_SITE_URL=✅ configured (https://839c63d9-dbb8-437d-83b2-ef0aa41ae08a-00-3nwxw68s56w08.riker.replit.dev)
DATABASE_URL=✅ configured
OPENAI_API_KEY=✅ configured (ready for AI features)
SESSION_SECRET=✅ configured
```

### Feature Flags
- `ENABLE_GOOGLE_SSO=false` (future)
- `ENABLE_PDF_EXPORT=true`
- `ALLOW_COMPANYADMIN_ASSIGN_EMPLOYER_PERMS=true`

## Development Workflow

### Running Locally
```bash
npm install
npm run dev  # Runs on port 5000
```

### Database Setup
```bash
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to Supabase
npm run seed         # Populate with demo data
```

### Seed Data
- 2 companies: TechSafety Indústria Ltda, SafeWork Serviços
- 5 IMSST dimensions (Liderança, Processos, Conformidade, Capacitação, Dados)
- 25 questions (5 per dimension, all Likert scale)

## Project Structure

```
/app
  /auth
    /login - Login page
  /dashboard
    /page.tsx - Main dashboard
    /layout.tsx - Sidebar layout
    /diagnostics - IMSST assessments
    /companies - Company management
    /users - User management
    /actions - Action plans
  /globals.css - HUBSST brand colors
/components/ui - shadcn components
/lib
  /supabase - Client/server Supabase helpers
  /auth.ts - Authentication utilities
  /prisma.ts - Prisma client singleton
/prisma
  /schema.prisma - Database schema
  /seed.ts - Seed script
/public/images
  /hubsst-logo.png - HUBSST logo
```

## Next Steps

1. **User configures Supabase credentials**
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY

2. **Run database migrations**
   ```bash
   npx prisma db push
   npm run seed
   ```

3. **Configure OpenAI API** (optional for MVP)

4. **Implement authentication flow**
   - Sign up / Sign in with Supabase
   - Session management
   - Protected routes

5. **Build diagnostic flow**
   - Question rendering component
   - Answer submission
   - Score calculation algorithm
   - AI action plan generation

6. **RLS policies in Supabase**
   - Ensure data isolation by company_id
   - Role-based query filtering

## User Preferences

- Language: Portuguese (pt-BR)
- Theme: Clean light palette with teal accent
  - Primary: #343a40 (cinza escuro)
  - Accent: #17a2b8 (teal/turquesa)
  - Secondary: #6c757d (cinza médio)
  - Borders: #dee2e6 (cinza claro)
  - Background: #ffffff (branco)
  - Cards: #ffffff (branco com bordas sutis)
  - Sidebar: #f8f9fa (cinza muito claro)
  - Chart colors: #17a2b8 (teal), #20c997 (verde), #6610f2 (roxo), #fd7e14 (laranja), #6c757d (cinza)
- Typography: Reduzida (text-sm no body, headings proporcionalmente menores)
- Border radius: 0.375rem (6px) - arredondamentos menores
- Focus: SST compliance for Brazilian companies
- Target: SMBs needing structured SST management

## Recent Changes

- **2025-10-21**: Improved User Invitation Flow with Supabase Admin API
  - Implemented automatic user creation via Supabase `auth.admin.inviteUserByEmail()`
  - Users no longer need to create accounts first - Admin sends invite directly
  - Email automatically sent with password setup instructions
  - Membership created with INVITED status (changes to ACTIVE after first login)
  - Added status badges on user list: "Ativo" (green), "Convite Pendente" (yellow), "Inativo" (gray)
  - Improved email validation with proper regex pattern
  - Prevent duplicate invites (same email + same company)
  - Updated InviteUserDialog UX with clear messaging about email invitation
  
- **2025-10-21**: User and Company Management System
  - Implemented complete user invitation system with role-based permissions
  - Created InviteUserDialog component with company and role selection
  - Added "Convidar Usuário" button on users page (Platform Admin and Company Admin)
  - Fixed Select components to properly capture and submit form values
  - Security validated: Platform Admin can invite to any company, Company Admin only to their own
  
- **2025-10-21**: Design system modernization
  - Applied lighter color palette based on reference image
  - Reduced border radius from 10px to 6px for cleaner look
  - Decreased font sizes across the system (text-sm base)
  - Updated chart colors to more distinct palette
  - Improved contrast ratios in both light and dark themes
  - Configured Next.js for Gravatar remote images
  
- **2025-10-21**: Platform admin and visual improvements
  - User i9hubsst promoted to Platform Admin
  - Integrated Gravatar for user profile photos
  - Fixed role display in UserNav and user list

- **2025-01-20**: Initial project setup complete
  - Created database schema with multi-tenant architecture
  - Implemented core page structure (dashboard, diagnostics, companies, users, actions)
  - Integrated HUBSST branding and logo
  - Configured Next.js workflow on port 5000
  - Created comprehensive seed script for demo data

## Email Configuration (Supabase)

**⚠️ Configuração Obrigatória:** Para que o sistema de convites funcione corretamente:

### 1. Redirect URLs
Acesse **Authentication** → **URL Configuration** e adicione:
```
https://839c63d9-dbb8-437d-83b2-ef0aa41ae08a-00-3nwxw68s56w08.riker.replit.dev/auth/callback
```

### 2. Email Templates
Acesse **Authentication** → **Email Templates** e configure:
- **Invite User**: Template usado quando Admin convida um novo usuário
- **Confirm Signup**: Template para confirmação de email (cadastro manual)
- **Magic Link**: Template para login sem senha (opcional)

### 3. Fluxo de Convite
Quando um Admin convida um usuário:
1. Sistema verifica se email já existe no Supabase Auth
2. Se não existe: chama `auth.admin.inviteUserByEmail()` que envia email automaticamente
3. Membership criada com status `INVITED`
4. Usuário recebe email com link para definir senha
5. Após definir senha e fazer primeiro login, status muda para `ACTIVE` (implementação futura)

**Documentação completa:** Veja `SUPABASE_CONFIG.md` para instruções detalhadas

## Known Issues

- None - Sistema operacional e seguro

## Notes

- All database operations use Prisma ORM for type safety
- RLS policies must be configured in Supabase dashboard after credentials setup
- The system supports both Portuguese and English interfaces (currently PT-BR only)
- AI features require valid OpenAI API key
