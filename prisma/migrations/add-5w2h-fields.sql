-- Adicionar campos 5W2H à tabela action_plans
ALTER TABLE action_plans 
ADD COLUMN IF NOT EXISTS "what" TEXT,
ADD COLUMN IF NOT EXISTS "why" TEXT,
ADD COLUMN IF NOT EXISTS "where" TEXT,
ADD COLUMN IF NOT EXISTS "when" TEXT,
ADD COLUMN IF NOT EXISTS "who" TEXT,
ADD COLUMN IF NOT EXISTS "how" TEXT,
ADD COLUMN IF NOT EXISTS "howMuch" TEXT;

-- Atualizar comentários nas colunas existentes
COMMENT ON COLUMN action_plans.title IS 'O QUÊ (What)';
COMMENT ON COLUMN action_plans.description IS 'COMO (How) - detalhamento';
COMMENT ON COLUMN action_plans."dueDate" IS 'QUANDO (When)';
