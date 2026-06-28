# FlowIQ Frontend

Next.js web application for the [FlowIQ](https://github.com/YevheniiaDem/flowiq-backend) platform — Ukrainian FOP financial management UI.

## Related repositories

| Repository | Role |
|------------|------|
| [flowiq-backend](https://github.com/YevheniiaDem/flowiq-backend) | REST API + **documentation hub** |
| **flowiq-frontend** (this repo) | Web UI |
| [flowiq-automation](https://github.com/YevheniiaDem/flowiq-automation) | E2E/API tests |

**Developer handbook:** [flowiq-backend/docs/DEVELOPER_HANDBOOK.md](https://github.com/YevheniiaDem/flowiq-backend/blob/main/docs/DEVELOPER_HANDBOOK.md)

## Quick start

```bash
npm ci
cp .env.local.example .env.local   # if present, or create manually
npm run dev
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

Open http://localhost:3000 — backend must be running ([backend setup](https://github.com/YevheniiaDem/flowiq-backend#quick-start)).

**Demo login:** `demo@flowiq.ai` / `demo123`

## Tech stack

Next.js 16 · React 19 · TypeScript · Tailwind 4 · Axios · shadcn/ui · Vitest

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server (:3000) |
| `npm run build` | Production build + TypeScript check |
| `npm run lint` | ESLint |
| `npm test` | Vitest (local; not in CI yet) |

## CI

GitHub Actions `frontend-ci.yml` — lint + build on push/PR to **`master`**.

## Documentation

Frontend architecture and routing are documented in the backend repo:

- [Frontend architecture](https://github.com/YevheniiaDem/flowiq-backend/blob/main/docs/architecture/frontend-architecture.md)
- [Frontend routing](https://github.com/YevheniiaDem/flowiq-backend/blob/main/docs/frontend/routing.md)
- [Contributing](https://github.com/YevheniiaDem/flowiq-backend/blob/main/CONTRIBUTING.md)

## License

Proprietary — All Rights Reserved.
