# AGENTS.md

## Cursor Cloud specific instructions

### Monorepo overview

Yarn 4.9.2 workspaces monorepo (`booze-monorepo`) with three apps and shared packages. See `README.md` for top-level commands.

| Service | Path | Dev command | Port |
|---------|------|-------------|------|
| API backend | `apps/app-booze-api` | `node src/index.js` (with env vars below) | 3001 |
| Web dashboard | `apps/app-booze-web` | `npx vite --host 0.0.0.0 --port 3000` | 3000 |
| Mobile app | `apps/app-booze-mobile` | `yarn start` (Expo) | 8081 |

### Starting MongoDB (required for the API)

MongoDB 8.0 is installed system-wide. Start it before running the API:

```bash
sudo mongod --dbpath /data/db --bind_ip 127.0.0.1 --port 27017 --fork --logpath /var/log/mongodb/mongod.log
```

No authentication is needed for local development.

### Starting the API backend

The API needs these environment variables (no `.env` file is checked in):

```bash
MONGO_HOST=localhost MONGO_PORT=27017 MONGO_DATABASE=markets_data \
NODE_ENV=development API_PORT=3001 FRONTEND_URL=http://localhost:3000 \
node src/index.js
```

Run from `apps/app-booze-api`. Do **not** use `yarn dev` — that script expects an SSH tunnel to a remote server.

### Lint

```bash
yarn prettier-lint:all   # from repo root
```

Some server packages (`se-db`, `se-eodhd`, `se-eodhd-cache`, `se-list`) have pre-existing ESLint v9 flat-config compatibility errors (they still use `.eslintrc` with `env` key). This is a known issue; Prettier passes everywhere.

### Gotchas

- The rename commit (`d070686`) accidentally deleted API route and controller files. They have been restored in a follow-up commit on this branch.
- `node-cron` is imported by `@booze/se-db` but was missing from its `package.json`. It is installed at the workspace root level to satisfy this dependency via hoisting.
- `mongoose` is listed as a root `devDependency` and is consumed by `@booze/se-db` through hoisting — do not remove it from the root `package.json`.
- The web dashboard proxies `/api` requests to `http://localhost:3001` via Vite config, so the API must be running for the dashboard to fetch data.
