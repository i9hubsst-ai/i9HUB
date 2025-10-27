# i9HUBSST AI Agent Instructions

This document provides essential context for AI agents working with the i9HUBSST codebase - a SaaS platform for Occupational Health and Safety Management.

## Architecture Overview

### Core Components
- **Frontend**: Next.js 15 App Router + React + TypeScript
- **Backend**: Server Actions in `/app/actions/` handle business logic
- **Auth**: Supabase Auth + custom role system (see `lib/auth.ts`)
- **Data Layer**: Prisma ORM + Supabase PostgreSQL with Row Level Security
- **UI**: Tailwind CSS + shadcn/ui components in `/components/ui/`

### Key Patterns

1. **Authentication Flow**
   - All authenticated routes are under `/app/dashboard/`
   - User roles: PLATFORM_ADMIN, COMPANY_ADMIN, ENGINEER, EMPLOYER, VIEWER
   - Check permissions using `lib/auth.ts` helpers like `getUserRole()` and `isPlatformAdmin()`

2. **Server Actions**
   - Business logic lives in `/app/actions/` as server functions
   - Always validate user permissions before data operations
   - Use revalidatePath() after mutations to refresh data
   ```typescript
   // Example pattern from assessments.ts
   const user = await getCurrentUser()
   if (!user) return { error: 'Não autorizado' }
   const role = await getUserRole(user.id, companyId)
   ```

3. **Data Model**
   - Multi-tenant design with Company as root entity
   - Memberships link Users to Companies with roles
   - Strong usage of TypeScript types from Prisma schema
   - Always include audit fields (createdAt, updatedAt)

4. **Error Handling**
   - Server actions return { error? } or { success, data } objects
   - Use try/catch blocks for database operations
   - Validate inputs with proper error messages in Portuguese

## Development Workflow

1. **Local Setup**
   - Requires Supabase project and credentials
   - Optional: OpenAI API key for AI features
   - Run Prisma migrations before starting server

2. **Adding Features**
   - Create server action in appropriate `/app/actions/` file
   - Add UI components in `/components/dashboard/`
   - Update Prisma schema if needed
   - Follow existing patterns for auth checks and error handling

## Common Pitfalls

- Always check user permissions before data operations
- Remember to revalidatePath() after mutations
- Use proper typing from Prisma schema
- Keep Portuguese as default language for user messages
- Consider multi-tenant implications in queries (filter by companyId)

## Integration Points

1. **Supabase**
   - Auth handled via `lib/supabase/` utilities
   - Row Level Security enforced at database level
   - See `SUPABASE_CONFIG.md` for setup details

2. **OpenAI**
   - AI features in `/app/api/ai/` endpoints
   - Template suggestions use embeddings (see `lib/services/embedding-service.ts`)

Remember to check existing implementations in similar components when adding new features. The codebase follows consistent patterns that should be maintained.