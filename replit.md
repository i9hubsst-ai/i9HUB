# i9HUBSST - Replit Project Documentation

## Project Overview

**i9HUBSST** is a comprehensive SaaS platform for Occupational Health and Safety (SST) Management in Brazil, featuring:

- Multi-tenant architecture with row-level security (RLS)
- IMSST maturity diagnostic system (5 dimensions, 25 questions)
- AI-powered assessment generation and action plan creation using OpenAI
- Role-based access control (5 user roles)
- Dashboard with analytics and reporting capabilities

## Current Status (January 2025)

### ✅ Completed
- Project structure with Next.js 15 + TypeScript + Tailwind CSS
- Prisma database schema (11 models: companies, memberships, assessments, questions, etc.)
- HUBSST branding (navy blue #1e3a5f + lime green #84cc16)
- Seed script with 2 demo companies, 5 IMSST dimensions, 25 questions
- shadcn/ui components integrated (button, card, input, sidebar, etc.)
- Core pages:
  - Landing page with logo
  - Login page (auth/login)
  - Dashboard with stats cards
  - Diagnostics page with IMSST info
  - Companies management page
  - Users management page
  - Action plans page
- Dashboard layout with sidebar navigation
- README with comprehensive setup instructions

### 🔄 In Progress
- Supabase authentication integration (awaiting user credentials)
- OpenAI API integration for AI assistants (awaiting API key)

### ⏳ Pending
- Database migration to Supabase (waiting for DATABASE_URL)
- User registration and invitation system
- Full diagnostic flow implementation (answer questions → calculate scores → generate report)
- PDF report generation with radar charts
- Row Level Security (RLS) policies in Supabase
- Real-time AI assistant integration

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
NEXT_PUBLIC_SUPABASE_URL=<pending>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<pending>
SUPABASE_SERVICE_ROLE_KEY=<pending>
DATABASE_URL=<configured>
OPENAI_API_KEY=<pending>
SESSION_SECRET=<configured>
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
- Theme: Navy blue primary (#1e3a5f) + Lime green accent (#84cc16)
- Focus: SST compliance for Brazilian companies
- Target: SMBs needing structured SST management

## Recent Changes

- **2025-01-20**: Initial project setup complete
  - Created database schema with multi-tenant architecture
  - Implemented core page structure (dashboard, diagnostics, companies, users, actions)
  - Integrated HUBSST branding and logo
  - Configured Next.js workflow on port 5000
  - Created comprehensive seed script for demo data

## Known Issues

- Supabase credentials not yet configured (waiting for user)
- Authentication endpoints not yet implemented
- Diagnostic submission API not connected to database
- PDF generation pending implementation
- OpenAI integration pending API key

## Notes

- All database operations use Prisma ORM for type safety
- RLS policies must be configured in Supabase dashboard after credentials setup
- The system supports both Portuguese and English interfaces (currently PT-BR only)
- AI features require valid OpenAI API key
