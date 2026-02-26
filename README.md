# Booze Monorepo

## Product Overview

- Onboard users and define base preferences
- Recommend alcohol to existing users
- Recommendation algorithm based on user input
- Track drinking and grades
- Display taste distribution ratios

## Product Goal

Build the first top 5 important mobile screens.

---

## Technical Overview

Monorepo with Yarn workspaces. Apps and shared packages under `@booze/` scope.

```bash
yarn install
yarn prettier-lint:all   # Format and lint all packages
cd apps/app-booze-mobile && yarn start   # Start mobile app
cd apps/app-booze-api && yarn dev        # Start API
```

---

## Monorepo Standards

### Workspace Layout

```
booze/
├── apps/                    # Deployable applications
│   ├── app-booze-api/       # Express API
│   ├── app-booze-mobile/    # Expo / React Native
│   ├── app-booze-web/       # Web app
│   └── app-booze-db/        # DB scripts, backup, restore
├── packages/
│   ├── client/              # cl-* packages (UI, client)
│   ├── server/              # se-* packages (backend, services)
│   ├── iso/                 # iso-* packages (isomorphic)
│   └── dev/                 # dv-* packages (dev tools)
└── package.json
```

### Package Naming Prefixes

| Prefix | Location | Purpose | Examples |
|--------|----------|---------|----------|
| `app-` | `apps/` | Deployable applications | `app-booze-api`, `app-booze-mobile`, `app-booze-web`, `app-booze-db` |
| `cl-` | `packages/client/` | Client-side UI components, web/mobile libs | `cl-button`, `cl-select`, `cl-table`, `cl-slider` |
| `se-` | `packages/server/` | Server-side services, DB, auth, external APIs | `se-db`, `se-eodhd`, `se-logger`, `se-apple-auth` |
| `iso-` | `packages/iso/` | Isomorphic (shared client + server) | `iso-business-types`, `iso-auth-utils`, `iso-http-client` |
| `dv-` | `packages/dev/` | Development tools (lint, deploy, env, SSH) | `dv-prettier-lint`, `dv-cd`, `dv-monorepo`, `dv-env` |

### Package Scope

All packages use the `@booze/` scope:

```json
{
  "name": "@booze/cl-button",
  "name": "@booze/se-db",
  "name": "@booze/app-booze-api"
}
```

### Workspace References

Use `workspace:*` for internal dependencies:

```json
{
  "dependencies": {
    "@booze/se-db": "workspace:*",
    "@booze/iso-business-types": "workspace:*"
  },
  "devDependencies": {
    "@booze/dv-prettier-lint": "workspace:*"
  }
}
```

---

## Infrastructure

### Deployment

- **Tool**: `@booze/dv-cd` — Continuous deployment to Digital Ocean droplets
- **Commands**: `yarn release`, `yarn release-rollback` (from app directory)
- **Config**: `.env.production` in each app (not committed)

### Environment

- **Dev**: `.env.dev` or `.env` (per app)
- **Production**: `.env.production` (symlinked to `.env` during release)
- **Validation**: `@booze/dv-env` for env symlink checks

### Dev Tools

| Package | Purpose |
|---------|---------|
| `@booze/dv-prettier-lint` | ESLint + Prettier configs, `prettier-lint` script |
| `@booze/dv-cd` | Deploy to droplet, Docker build, rollback |
| `@booze/dv-monorepo` | Monorepo root detection, dev server runner |
| `@booze/dv-env` | Environment validation |
| `@booze/dv-ssh` | SSH utilities |
| `@booze/dv-files` | File sync utilities |
| `@booze/dv-docker` | Docker helpers |
| `@booze/dv-disk` | Disk management |

---

## Quick Commands

```bash
# Root
yarn install
yarn prettier-lint:all

# Apps
cd apps/app-booze-mobile && yarn start
cd apps/app-booze-api && yarn dev
cd apps/app-booze-mobile && yarn start --web
```

---

## Adding New Packages

### New App

1. Create `apps/app-booze-{name}/` with `package.json`:

   ```json
   {
     "name": "@booze/app-booze-{name}",
     "version": "1.0.0",
     "private": true
   }
   ```

2. Add to `package.json` workspaces if needed (already covered by `apps/*`).

### New Client Package

1. Create `packages/client/cl-{name}/` with `package.json`:

   ```json
   {
     "name": "@booze/cl-{name}",
     "version": "1.0.0",
     "main": "src/index.js",
     "exports": { ".": "./src/index.js" },
     "scripts": { "prettier-lint": "dv-prettier-lint-runner" },
     "devDependencies": { "@booze/dv-prettier-lint": "workspace:*" }
   }
   ```

### New Server Package

1. Create `packages/server/se-{name}/` with `package.json`:

   ```json
   {
     "name": "@booze/se-{name}",
     "version": "1.0.0",
     "main": "src/index.js",
     "scripts": { "prettier-lint": "dv-prettier-lint-runner" },
     "devDependencies": { "@booze/dv-prettier-lint": "workspace:*" }
   }
   ```

### New Dev Package

1. Create `packages/dev/dv-{name}/` with `package.json`:

   ```json
   {
     "name": "@booze/dv-{name}",
     "version": "1.0.0",
     "main": "src/index.js",
     "scripts": { "prettier-lint": "dv-prettier-lint-runner" },
     "devDependencies": { "@booze/dv-prettier-lint": "workspace:*" }
   }
   ```

---

## App READMEs

- **app-booze-api**: [README](apps/app-booze-api/README.md) — API endpoints, routes, middlewares, error handling
- **app-booze-mobile**: [README](apps/app-booze-mobile/README.md) — Pages, components, routes, layouts, hooks, assets
- **app-booze-db**: [README](apps/app-booze-db/README.md) — MongoDB, backup, restore
