# EcoTech

Plataforma para descarte correto de resíduos eletrônicos e marketplace de eletrônicos
recondicionados em Montenegro/RS. Ajuda a localizar pontos de coleta no mapa e conecta
compradores e vendedores de equipamentos com nova vida útil.

## Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS (componentes shadcn/radix), React Router, Leaflet (mapa) e Sonner (toasts).
- **Backend:** Node.js + Express 5 + SQLite (arquitetura em camadas: rotas → controllers → services → repositories).
- **Serviços externos:** Supabase (formulário de contato) e Nodemailer/Mailtrap (notificação por e-mail no backend).

## Como rodar

### Frontend

```bash
npm install
cp .env.example .env   # preencha com as chaves do Supabase
npm run dev            # http://localhost:8080
```

### Backend

```bash
cd backend
npm install
npm run dev            # http://localhost:3000 (schema e seed do SQLite rodam automaticamente)
```

## Estrutura

```
src/                 # frontend (páginas, componentes, integrações)
backend/
  routes/            # definição dos endpoints
  controllers/       # tratamento de requisição/resposta
  services/          # regras de negócio e validações
  repositories/      # acesso ao SQLite
  database/          # schema.sql, seed.sql e banco.db
supabase/migrations/ # tabelas usadas pelo formulário de contato
```

## Scripts úteis

- `npm run build` — build de produção do frontend
- `npm run lint` — ESLint
- `npm test` — Vitest
