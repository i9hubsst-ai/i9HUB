-- =============================================
-- REESTRUTURAÇÃO: ActionPlan → ActionPlanTask
-- =============================================
-- Converte estrutura de "10 planos" para "1 plano com 10 tarefas"

-- PASSO 1: Criar novos ENUMs
DO $$ BEGIN
  CREATE TYPE "ActionPlanStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- PASSO 2: Criar tabela de tarefas
CREATE TABLE IF NOT EXISTS "action_plan_tasks" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "number" TEXT NOT NULL,
  "actionPlanId" TEXT NOT NULL,
  
  -- Campos 5W2H
  "what" TEXT NOT NULL,
  "why" TEXT,
  "where" TEXT,
  "when" TEXT,
  "who" TEXT,
  "how" TEXT,
  "howMuch" TEXT,
  
  -- Controle
  "priority" INTEGER NOT NULL DEFAULT 2,
  "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
  "dueDate" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  
  -- Rastreamento
  "reference" TEXT,
  "createdBy" TEXT NOT NULL,
  "assignedTo" TEXT,
  
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- PASSO 3: Backup da tabela antiga
CREATE TABLE IF NOT EXISTS "action_plans_backup" AS 
SELECT * FROM "action_plans";

-- PASSO 3.5: Limpar tabela action_plans (vamos recriar tudo do backup)
DELETE FROM "action_plans";

-- PASSO 4: Migrar dados do backup
-- Para cada assessment, criar 1 ActionPlan e mover registros do backup para tasks
DO $$
DECLARE
  assessment_record RECORD;
  new_plan_id TEXT;
  plan_number TEXT;
  plan_counter INTEGER := 1;
  old_plan RECORD;
  task_counter INTEGER;
BEGIN
  -- Para cada assessment que tem action plans no backup
  FOR assessment_record IN 
    SELECT DISTINCT ON ("assessmentId") "assessmentId", "companyId", "createdAt"
    FROM "action_plans_backup"
    ORDER BY "assessmentId", "createdAt"
  LOOP
    -- Gerar número do plano (PA00001, PA00002, ...)
    plan_number := 'PA' || LPAD(plan_counter::TEXT, 5, '0');
    new_plan_id := gen_random_uuid()::TEXT;
    
    -- Buscar primeiro action plan do backup para pegar dados
    SELECT * INTO old_plan
    FROM "action_plans_backup"
    WHERE "assessmentId" = assessment_record."assessmentId"
    ORDER BY "createdAt"
    LIMIT 1;
    
    -- Criar o ActionPlan consolidado na tabela limpa
    INSERT INTO "action_plans" (
      "id", "assessmentId", "companyId",
      "title", "description",
      "createdBy", "ownerUserId", "aiGenerated",
      "createdAt", "updatedAt", "status"
    )
    VALUES (
      new_plan_id,
      assessment_record."assessmentId",
      assessment_record."companyId",
      COALESCE(old_plan."title", 'Plano de Ação'),
      'Plano de ação gerado a partir do diagnóstico',
      old_plan."createdBy",
      old_plan."ownerUserId",
      old_plan."aiGenerated",
      old_plan."createdAt",
      CURRENT_TIMESTAMP,
      old_plan."status"
    );
    
    -- Converter cada ActionPlan antigo em ActionPlanTask
    task_counter := 1;
    FOR old_plan IN 
      SELECT * FROM "action_plans_backup"
      WHERE "assessmentId" = assessment_record."assessmentId"
      ORDER BY "priority", "createdAt"
    LOOP
      INSERT INTO "action_plan_tasks" (
        "id", "number", "actionPlanId",
        "what", "why", "where", "when", "who", "how", "howMuch",
        "priority", "status", "dueDate", "completedAt",
        "reference", "createdBy", "assignedTo",
        "createdAt", "updatedAt"
      )
      VALUES (
        gen_random_uuid()::TEXT,
        LPAD(task_counter::TEXT, 3, '0'),
        new_plan_id,
        COALESCE(old_plan."what", old_plan."title"),
        old_plan."why",
        old_plan."where",
        old_plan."when",
        old_plan."who",
        old_plan."how",
        old_plan."howMuch",
        old_plan."priority",
        CASE old_plan."status"
          WHEN 'PENDING' THEN 'PENDING'::"TaskStatus"
          WHEN 'IN_PROGRESS' THEN 'IN_PROGRESS'::"TaskStatus"
          WHEN 'DONE' THEN 'COMPLETED'::"TaskStatus"
          WHEN 'CANCELLED' THEN 'CANCELLED'::"TaskStatus"
          ELSE 'PENDING'::"TaskStatus"
        END,
        old_plan."dueDate",
        CASE WHEN old_plan."status" = 'DONE' THEN old_plan."updatedAt" ELSE NULL END,
        old_plan."reference",
        old_plan."createdBy",
        old_plan."ownerUserId",
        old_plan."createdAt",
        old_plan."updatedAt"
      );
      
      task_counter := task_counter + 1;
    END LOOP;
    
    plan_counter := plan_counter + 1;
  END LOOP;
END $$;

-- PASSO 4.5: Adicionar colunas novas à tabela action_plans (após recriar dados)
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "number" TEXT;
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "title" TEXT;
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "objective" TEXT;
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "startDate" TIMESTAMP(3);
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "endDate" TIMESTAMP(3);

-- PASSO 4.6: Atualizar os valores de number e title nos planos criados
DO $$
DECLARE
  plan_record RECORD;
  plan_counter INTEGER := 1;
BEGIN
  FOR plan_record IN 
    SELECT "id", "assessmentId" FROM "action_plans" ORDER BY "createdAt"
  LOOP
    UPDATE "action_plans"
    SET 
      "number" = 'PA' || LPAD(plan_counter::TEXT, 5, '0'),
      "title" = 'Plano de Ação - ' || COALESCE(
        (SELECT "title" FROM "assessments" WHERE "id" = plan_record."assessmentId"),
        'Sem título'
      ),
      "objective" = 'Implementar ações corretivas identificadas no diagnóstico',
      "startDate" = CURRENT_TIMESTAMP
    WHERE "id" = plan_record."id";
    
    plan_counter := plan_counter + 1;
  END LOOP;
END $$;

-- PASSO 5: Alterar estrutura de action_plans (remover campos 5W2H antigos)
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "what";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "why";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "where";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "when";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "who";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "how";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "howMuch";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "title" CASCADE;
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "reference";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "dueDate";
ALTER TABLE "action_plans" DROP COLUMN IF EXISTS "priority";

-- PASSO 6: Adicionar novos campos a action_plans
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "title" TEXT NOT NULL DEFAULT 'Plano de Ação';
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "objective" TEXT;
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "startDate" TIMESTAMP(3);
ALTER TABLE "action_plans" ADD COLUMN IF NOT EXISTS "endDate" TIMESTAMP(3);

-- PASSO 7: Alterar tipo do campo status
-- Primeiro, remover o DEFAULT antigo
ALTER TABLE "action_plans" ALTER COLUMN "status" DROP DEFAULT;

-- Alterar o tipo da coluna
ALTER TABLE "action_plans" ALTER COLUMN "status" TYPE "ActionPlanStatus" USING 
  CASE "status"::TEXT
    WHEN 'PENDING' THEN 'DRAFT'::"ActionPlanStatus"
    WHEN 'IN_PROGRESS' THEN 'IN_PROGRESS'::"ActionPlanStatus"
    WHEN 'DONE' THEN 'COMPLETED'::"ActionPlanStatus"
    WHEN 'CANCELLED' THEN 'CANCELLED'::"ActionPlanStatus"
    ELSE 'DRAFT'::"ActionPlanStatus"
  END;

-- Adicionar novo DEFAULT
ALTER TABLE "action_plans" ALTER COLUMN "status" SET DEFAULT 'DRAFT'::"ActionPlanStatus";

-- PASSO 8: Adicionar constraints e índices
CREATE INDEX IF NOT EXISTS "action_plan_tasks_actionPlanId_idx" ON "action_plan_tasks"("actionPlanId");
CREATE INDEX IF NOT EXISTS "action_plan_tasks_status_idx" ON "action_plan_tasks"("status");
CREATE INDEX IF NOT EXISTS "action_plan_tasks_priority_idx" ON "action_plan_tasks"("priority");

-- PASSO 9: Adicionar FK
ALTER TABLE "action_plan_tasks" 
  ADD CONSTRAINT "action_plan_tasks_actionPlanId_fkey" 
  FOREIGN KEY ("actionPlanId") 
  REFERENCES "action_plans"("id") 
  ON DELETE CASCADE 
  ON UPDATE CASCADE;

-- PASSO 10: Tornar campo number unique em action_plans
ALTER TABLE "action_plans" ADD CONSTRAINT "action_plans_number_key" UNIQUE ("number");

-- PASSO 11: Dropar enum antigo (após garantir que não é usado)
DROP TYPE IF EXISTS "ActionStatus" CASCADE;

-- Comentários
COMMENT ON TABLE "action_plan_tasks" IS 'Tarefas individuais de um plano de ação (5W2H)';
COMMENT ON COLUMN "action_plans"."number" IS 'Número único do plano (PA00001, PA00002, ...)';
COMMENT ON COLUMN "action_plan_tasks"."number" IS 'Número sequencial da tarefa dentro do plano (001, 002, ...)';

-- Mensagem de sucesso
DO $$
BEGIN
  RAISE NOTICE '✅ Migração concluída com sucesso!';
  RAISE NOTICE '📊 Backup criado em: action_plans_backup';
  RAISE NOTICE '📋 Nova estrutura: ActionPlan → ActionPlanTask';
END $$;
