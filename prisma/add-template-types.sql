-- Script para criar tabela de tipos de template e popular com dados padrão

-- Criar tabela
CREATE TABLE IF NOT EXISTS "template_type_configs" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_type_configs_pkey" PRIMARY KEY ("id")
);

-- Criar índice único no código
CREATE UNIQUE INDEX IF NOT EXISTS "template_type_configs_code_key" ON "template_type_configs"("code");

-- Popular com tipos padrão
INSERT INTO "template_type_configs" ("id", "code", "name", "description", "order", "createdAt", "updatedAt") 
VALUES 
    (gen_random_uuid()::text, 'NR12', 'NR-12 - Segurança em Máquinas', 'Norma Regulamentadora sobre segurança no trabalho em máquinas e equipamentos', 1, NOW(), NOW()),
    (gen_random_uuid()::text, 'NR35', 'NR-35 - Trabalho em Altura', 'Norma Regulamentadora sobre trabalho em altura', 2, NOW(), NOW()),
    (gen_random_uuid()::text, 'ISO45001', 'ISO 45001 - Gestão de SST', 'Sistema de gestão de saúde e segurança ocupacional', 3, NOW(), NOW()),
    (gen_random_uuid()::text, 'ISO14001', 'ISO 14001 - Gestão Ambiental', 'Sistema de gestão ambiental', 4, NOW(), NOW()),
    (gen_random_uuid()::text, 'IMSST', 'IMSST - Maturidade SST', 'Índice de Maturidade do Sistema de Segurança do Trabalho', 5, NOW(), NOW()),
    (gen_random_uuid()::text, 'CUSTOM', 'Personalizado', 'Template customizado criado pelo usuário', 99, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;
