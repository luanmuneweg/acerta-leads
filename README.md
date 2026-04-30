# Acerta Leads

Lead management SPA built as a technical assessment for a frontend developer position at Acerta.

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [TanStack Table](https://tanstack.com/table)
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Axios](https://axios-http.com)
- [Sonner](https://sonner.emilkowal.ski)

## Architecture

```
src/
├── features/leads/       # Leads feature
│   ├── adapters/         # Transforms data between API ↔ form
│   ├── components/       # Feature components
│   ├── hooks/            # Encapsulated useQuery / useMutation
│   ├── pages/            # Feature pages
│   ├── schemas/          # Zod validation schemas
│   ├── services/         # Static API class (LeadsApi)
│   └── types/            # Feature DTOs and enums
├── components/
│   ├── ui/               # shadcn primitives
│   ├── form/             # Inputs and selects with encapsulated RHF Controller
│   ├── buttons/          # ButtonDefault
│   ├── table/            # TableDefault
│   ├── stepper/          # Form progress indicator
│   ├── modals/           # ConfirmDialog
│   └── layouts/          # AppLayout and AppHeader
├── lib/
│   ├── masks/            # CPF and phone masks
│   ├── schemas/          # CPF schema
│   └── variables/        # Environment variable parsing with Zod
├── services/api/         # Global Axios instance
└── types/enums/          # Centralized QueryKeys
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

### 3. Start the frontend

```bash
npm run dev
```

Open: [http://localhost:3001](http://localhost:3001)

## Environment Variables

| Variable       | Description                    | Default                 |
| -------------- | ------------------------------ | ----------------------- |
| `PORT`         | Development server port        | `3001`                  |
| `VITE_API_URL` | Base API URL                   | `http://localhost:3333` |

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the development server                 |
| `npm run build`   | Type-check + generate production build       |
| `npm run preview` | Serve the production build locally           |
| `npm run lint`    | Run ESLint with no warnings                  |
| `npm run format`  | Format all code with Prettier                |

## Commit Convention

The project uses [Conventional Commits](https://www.conventionalcommits.org) validated via commitlint on the `commit-msg` hook. The `pre-commit` hook runs ESLint + Prettier on staged files via lint-staged.
