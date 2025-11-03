-- Adicionar campo number ao ActionPlan
ALTER TABLE action_plans ADD COLUMN IF NOT EXISTS "number" TEXT;

-- Criar função para gerar numeração automática
CREATE OR REPLACE FUNCTION generate_action_plan_number(assessment_id_param TEXT)
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
  plan_number TEXT;
BEGIN
  -- Contar planos existentes para este assessment
  SELECT COUNT(*) + 1 INTO next_num
  FROM action_plans
  WHERE "assessmentId" = assessment_id_param;
  
  -- Formatar como PA-XXX
  plan_number := 'PA-' || LPAD(next_num::TEXT, 3, '0');
  
  RETURN plan_number;
END;
$$ LANGUAGE plpgsql;

-- Atualizar planos existentes com numeração
WITH numbered_plans AS (
  SELECT 
    id,
    "assessmentId",
    'PA-' || LPAD(ROW_NUMBER() OVER (PARTITION BY "assessmentId" ORDER BY "createdAt")::TEXT, 3, '0') as new_number
  FROM action_plans
  WHERE number IS NULL
)
UPDATE action_plans
SET number = numbered_plans.new_number
FROM numbered_plans
WHERE action_plans.id = numbered_plans.id;

-- Comentário explicativo
COMMENT ON COLUMN action_plans.number IS 'Numeração sequencial do plano de ação (PA-001, PA-002, etc)';
