# Users Filter

Listagem de usuários com filtros combinados (busca por nome/email, gender, faixa etária) e ordenação de colunas, construída com Vite, React, TypeScript, Chakra UI, Zod e React Hook Form.

## Stack

- Vite + React + TypeScript
- Chakra UI (v3)
- Zod + React Hook Form (validação do dropdown de filtros)
- Fake API em memória com delay simulado de 2s

## Arquitetura

Organização feature-based em `src/features/users`:

- `api/` — dados mockados e serviço com filtro + delay simulado
- `types/` — contratos de domínio
- `hooks/` — `useUsers`, `usePagination`, `useSort`
- `components/` — tabela, paginação, busca e dropdown de filtros
- `schemas/` — validação Zod dos filtros
- `pages/` — página orquestradora

## Rodando localmente

\`\`\`bash
npm install
npm run dev
\`\`\`
