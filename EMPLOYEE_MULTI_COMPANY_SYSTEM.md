# Sistema Multi-Empresa de Gerenciamento de Funcionários

## Visão Geral

O i9HUBSST implementa um sistema robusto de gerenciamento de funcionários que suporta múltiplas empresas, permitindo que um mesmo funcionário possa ter vínculos em diferentes empresas simultaneamente ou sequencialmente.

## Características Principais

### 1. Multi-Empresa (Mesmo CPF em Empresas Diferentes)

**Schema Prisma:**
```prisma
model Employee {
  // ...
  @@unique([companyId, cpf])
  @@unique([companyId, employeeNumber])
}
```

**Suporta:**
- ✅ Funcionário trabalhando em múltiplas empresas simultaneamente
- ✅ Transferência de funcionário entre empresas
- ✅ Histórico completo de vínculos empregatícios
- ✅ CPF único apenas **dentro de cada empresa**

**Exemplos de Uso:**

#### Exemplo 1: Funcionário em Múltiplas Empresas Simultaneamente
```
João Silva (CPF: 111.222.333-44)

Empresa A (Construtora ABC):
- Matrícula: 0001
- Cargo: Engenheiro Civil
- Status: ACTIVE

Empresa B (Consultoria XYZ):
- Matrícula: 0023  
- Cargo: Consultor SST
- Status: ACTIVE
```

#### Exemplo 2: Transferência Entre Empresas
```
Maria Santos (CPF: 222.333.444-55)

1. Trabalhou na Empresa A:
   - Período: 01/2023 a 06/2024
   - Status: INACTIVE (saiu da empresa)
   - Histórico preservado

2. Agora trabalha na Empresa B:
   - Admissão: 07/2024
   - Status: ACTIVE
   - Novo vínculo criado
```

### 2. Sistema de Status (Inativação/Reativação)

**Estados Possíveis:**
- `ACTIVE` - Funcionário ativo e trabalhando
- `INACTIVE` - Funcionário inativo (desligado, afastado, etc.)

**Fluxos Suportados:**

#### Fluxo 1: Inativação
1. Usuário clica no botão "Inativar" (🚫) na tabela
2. Dialog de confirmação exibe informações sobre:
   - Preservação do histórico
   - Possibilidade de reativação
   - Uso para transferências entre empresas
3. Confirmação altera `status = INACTIVE`
4. Funcionário permanece no banco mas não é contado como ativo

#### Fluxo 2: Reativação
1. Usuário acessa "Editar" no funcionário inativo
2. No formulário, altera campo "Status" de "Inativo" para "Ativo"
3. Salva o formulário
4. Funcionário volta a ser `status = ACTIVE`

**Casos de Uso:**
- ✅ Funcionário afastado por doença que retorna
- ✅ Erro ao inativar (reversão rápida)
- ✅ Funcionário readmitido na mesma empresa
- ✅ Recontratação temporária

### 3. Transferência Entre Empresas (Passo a Passo)

**Cenário:** Transferir José Silva da Empresa A para Empresa B

**Processo:**

1. **Na Empresa A:**
   - Acessar detalhes da Empresa A
   - Localizar José Silva na tabela de funcionários
   - Clicar no botão "Inativar" (🚫)
   - Confirmar inativação
   - Resultado: José Silva fica com `status = INACTIVE` na Empresa A

2. **Na Empresa B:**
   - Acessar página de Funcionários
   - Clicar em "Cadastrar Funcionário"
   - Preencher formulário com:
     - Empresa: Empresa B
     - CPF: (mesmo CPF de José Silva)
     - Nome: José Silva
     - Nova matrícula, cargo, etc.
   - Salvar
   - Resultado: Novo registro criado com `status = ACTIVE` na Empresa B

3. **Resultado Final:**
   - José Silva tem 2 registros no sistema:
     - Empresa A: INACTIVE (histórico preservado)
     - Empresa B: ACTIVE (vínculo atual)

## Arquitetura Técnica

### Constraints de Banco de Dados

```sql
-- CPF é único apenas DENTRO de cada empresa
UNIQUE (company_id, cpf)

-- Matrícula é única apenas DENTRO de cada empresa  
UNIQUE (company_id, employee_number)

-- Um usuário pode ter apenas 1 vínculo por empresa
UNIQUE (company_id, user_id)
```

### Actions Principais

#### `createEmployee(data)`
- Cria novo funcionário
- Valida CPF e matrícula únicos na empresa
- Permite mesmo CPF em empresas diferentes
- Status padrão: ACTIVE

#### `updateEmployee(id, data)`
- Atualiza dados do funcionário
- Permite alterar status (ACTIVE ↔ INACTIVE)
- Usado para reativação de funcionários

#### `inactivateEmployee(id)`
- Altera status para INACTIVE
- Preserva todos os dados e relacionamentos
- Não deleta o registro
- Revalida cache das páginas

#### `deleteEmployee(id)` ⚠️
- **NÃO RECOMENDADO** para uso normal
- Deleta permanentemente o registro
- Pode quebrar relacionamentos
- Use `inactivateEmployee()` ao invés

## Interface do Usuário

### Tabela de Funcionários (Company Details)

**Campos Exibidos:**
- Matrícula
- Nome Completo
- CPF (formatado)
- Cargo
- Departamento
- Data de Admissão
- Status (Badge: Verde=Ativo, Cinza=Inativo)

**Ações:**
- ✏️ **Editar**: Abre formulário de edição
- 🚫 **Inativar**: Altera status para INACTIVE (desabilitado se já inativo)

### Formulário de Edição

**Campo Status:**
- Select com opções: "Ativo" | "Inativo"
- Tooltip: "Use 'Inativo' para funcionários desligados ou afastados. Pode ser reativado posteriormente."
- Permite alternar entre estados
- Reativação é feita apenas mudando o select

### Dialog de Confirmação de Inativação

**Informações Exibidas:**
- Explicação do que acontece ao inativar
- Caixa de informação destacada com:
  - Possibilidade de reativação
  - Preservação do histórico
  - Instruções para transferência entre empresas

## Boas Práticas

### ✅ Fazer

1. **Inativar ao invés de deletar** funcionários
2. **Criar novo registro** ao transferir entre empresas
3. **Preservar histórico** mantendo registros inativos
4. **Usar campo Status** para gerenciar estado do vínculo
5. **Validar CPF** apenas dentro da empresa atual

### ❌ Evitar

1. **Deletar funcionários** com histórico
2. **Tentar usar mesmo userId** em múltiplas empresas
3. **Reutilizar matrícula** de funcionário inativo na mesma empresa
4. **Modificar CPF** de funcionário existente

## Relatórios e Contagens

**Funcionários Ativos:**
```typescript
employees.filter(e => e.status === 'ACTIVE').length
```

**Histórico Completo:**
```typescript
employees.length // Inclui ativos e inativos
```

**Por Tipo de Contrato:**
```typescript
employees.filter(e => 
  e.status === 'ACTIVE' && 
  e.contractType === 'CLT'
).length
```

## Casos de Uso Detalhados

### Caso 1: Funcionário com Erro Cadastral
**Problema:** Funcionário inativado por engano

**Solução:**
1. Editar funcionário
2. Alterar Status para "Ativo"
3. Salvar

### Caso 2: Funcionário Afastado Temporariamente
**Problema:** Funcionário em licença médica de 6 meses

**Solução:**
1. Inativar funcionário
2. Quando retornar: Editar e reativar
3. Histórico completo preservado

### Caso 3: Grupo Empresarial com Múltiplas Empresas
**Problema:** Funcionário presta serviço para 3 empresas do grupo

**Solução:**
1. Criar registro na Empresa A
2. Criar registro na Empresa B (mesmo CPF)
3. Criar registro na Empresa C (mesmo CPF)
4. Todas com status ACTIVE
5. Cada empresa gerencia independentemente

### Caso 4: Demissão e Recontratação
**Problema:** Funcionário demitido em 2023 foi recontratado em 2024

**Solução Opção 1 (Novo vínculo):**
1. Manter registro antigo como INACTIVE
2. Criar novo registro com nova matrícula
3. Histórico separado de cada contratação

**Solução Opção 2 (Mesmo vínculo):**
1. Reativar registro existente
2. Atualizar data de admissão
3. Histórico contínuo

## Segurança e Permissões

**Quem pode inativar/reativar:**
- Platform Admin (todas as empresas)
- Company Admin (apenas sua empresa)

**Quem NÃO pode:**
- Engineers
- Employers
- Viewers

**Validações:**
- Verifica se usuário tem permissão na empresa
- Valida existência do funcionário
- Revalida cache após alterações

## Monitoramento e Auditoria

**Eventos para AuditLog:**
- Criação de funcionário
- Inativação de funcionário
- Reativação (via update)
- Tentativas de acesso não autorizado

**Métricas Importantes:**
- Taxa de inativação por empresa
- Tempo médio de vínculo ativo
- Funcionários com múltiplos vínculos
- Reativações por período

## Migrations e Dados Históricos

**Ao adicionar novas empresas:**
- Funcionários existentes permanecem vinculados à empresa original
- Novos vínculos devem ser criados explicitamente

**Ao mesclar empresas:**
1. Inativar funcionários na empresa antiga
2. Criar novos registros na empresa mesclada
3. Preservar ambos os históricos

## Referências Técnicas

**Arquivos Principais:**
- `/app/actions/employees.ts` - Business logic
- `/components/dashboard/employees-table.tsx` - Tabela de funcionários
- `/components/dashboard/edit-employee-dialog.tsx` - Formulário de edição
- `/prisma/schema.prisma` - Modelo de dados

**Enums Relacionados:**
- `MembershipStatus`: ACTIVE | INACTIVE | INVITED
- `ContractType`: CLT | INTERN | OUTSOURCED | TEMPORARY | AUTONOMOUS
- `Gender`: MALE | FEMALE | OTHER
- `MaritalStatus`: SINGLE | MARRIED | DIVORCED | WIDOWED

---

**Última atualização:** Dezembro 2024  
**Versão do Sistema:** i9HUBSST v1.0
