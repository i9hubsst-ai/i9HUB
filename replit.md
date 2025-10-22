## Overview
i9HUBSST is a comprehensive SaaS platform for Occupational Health and Safety (SST) Management in Brazil. Its core purpose is to provide a multi-tenant solution for businesses to manage their SST compliance, featuring an IMSST maturity diagnostic system, AI-powered assessment generation, and action plan creation. The platform aims to streamline SST processes, improve compliance, and offer valuable insights through analytics and reporting, targeting SMBs in Brazil.

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

## System Architecture

### UI/UX Decisions
The platform utilizes a clean light palette with a teal accent, reduced typography (text-sm base), and smaller border radii (0.375rem) for a modern, uncluttered look. Chart colors are distinct for better data visualization. The design prioritizes SST compliance for Brazilian companies and targets SMBs.

### Technical Implementations
- **Authentication System**: Supabase integrated for login, registration, password reset, and email confirmation.
- **Multi-Tenant Security**: Implemented at the application level with active membership validation on all server actions to ensure data isolation. A separate Supabase admin client with a service role key manages user invitations securely. All evidence upload/deletion actions enforce strict tenant isolation.
- **User Management**: Comprehensive CRUD for users, including invitation by email, role assignment (Platform Admin, Company Admin, Engineer, Employer, Viewer), profile editing, and removal. Gravatar integration for user photos.
- **Company Management**: Complete CRUD for company records with CNPJ validation and role-based permissions.
- **Employee Management**: Full CRUD for employee records, adhering to Brazilian compliance fields (CPF validation, formatted fields) with role-based permissions.
- **Diagnostic Template System**: Comprehensive template management with DRAFT/PUBLISHED workflow, AI-powered template generation and AI-assisted review/improvement via Google Gemini, and full CRUD for templates, sections, and questions. Each question can be configured with `requiresJustification` and `requiresEvidence` flags to control whether users must provide textual justifications and/or upload evidence files for any response. Templates can be reviewed by AI for suggestions on completeness, quality, references, and structure.
- **Diagnostic Assessment Flow**: Complete diagnostic workflow with streamlined answer flow: simple questions (without justification/evidence requirements) auto-save immediately with success feedback; questions requiring justification/evidence display input fields first, then save via a single "Salvar Resposta" button that becomes "Atualizar Resposta" after first save to allow editing. Template-driven justification and evidence requirements are configured per question via requiresJustification/requiresEvidence flags. Secure evidence upload (documents/photos) is gated on saved answers and linked to specific responses. Badge indicators show requirements before answering. The interface features a 6-tab layout with renamed "Perguntas & Respostas" section (previously "Seções & Perguntas").
- **Evidence Management**: Secure file upload system with multi-tenant authorization, supporting images, PDFs, and Office documents (max 10MB). Currently uses base64 data URLs (planned migration to Supabase Storage).
- **Data Visualization**: Radar charts (using Recharts) for displaying IMSST maturity scores.
- **Dashboard**: Provides real-time statistics on companies, assessments, users, and action plans.
- **AI Features**: Google Gemini API integrated for AI-powered diagnostic template generation and template review/improvement suggestions with 60 requests/min free tier. The AI can analyze existing templates and suggest improvements for completeness, clarity, proper referencing, and structural organization.

### Feature Specifications
- **IMSST Maturity Diagnostic**: 5 dimensions, 25 questions, with score calculation.
- **Role-Based Access Control**: 5 distinct user roles with varying levels of access and multi-company capabilities.
- **PDF Report Generation**: Planned feature for generating reports with radar charts.
- **Row Level Security (RLS)**: Planned implementation in Supabase for enhanced data isolation.

### System Design Choices
- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Radix UI, Lucide icons.
- **Backend**: Next.js Server Actions.
- **Database**: Supabase PostgreSQL.
- **ORM**: Prisma 6.17.1.
- **Authentication**: Supabase Auth.
- **Data Model**: Key entities include `companies`, `memberships`, `platform_admins`, `imsst_dimensions`, `imsst_questions`, `assessments`, `assessment_answers`, `assessment_scores`, `action_plans`, and `audit_logs`.
- **Security**: Application-level authorization is prioritized for faster iteration, with plans to integrate RLS. All assessment operations enforce ACTIVE membership.

## External Dependencies
- **Supabase**: Backend-as-a-Service for database (PostgreSQL), authentication, and storage.
- **OpenAI API**: For AI-powered assessment generation and action plan creation.
- **Recharts**: JavaScript charting library for data visualization (radar charts).
- **Prisma**: ORM for database interaction.
- **shadcn/ui**: UI component library.
- **Radix UI**: Low-level UI component library.
- **Lucide icons**: Icon library.
- **Next.js**: React framework for frontend and backend (Server Actions).
- **Tailwind CSS**: Utility-first CSS framework.
- **React-PDF / jsPDF**: Libraries planned for PDF report generation.