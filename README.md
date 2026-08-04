# Mounty — Test Task

Monorepo: landing page (Vite + React + TypeScript + Tailwind CSS v4) and a
minimal admin panel backend (Fastify + Prisma + SQLite) for managing FAQ and
Послуги content.

```
frontend/   Vite + React + TS — public landing page + /admin panel
backend/    Fastify + TS + Prisma — auth (fixed admin) + FAQ/Послуги CRUD
```

## Quick start (Docker Compose — recommended)

1. Copy the backend env template and fill in real secrets:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Required values in `backend/.env`:
   - `ADMIN_USERNAME` — admin login (single fixed user, no registration)
   - `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password, generate with:
     ```bash
     node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
     ```
   - `JWT_SECRET` — any random string
   - `COOKIE_SECURE` — leave `false` unless this is served over HTTPS

2. Build and start both services:

   ```bash
   docker compose up -d --build
   ```

3. Open [http://localhost:8080](http://localhost:8080) — the frontend's nginx
   proxies `/api/*` to the backend (same-origin, no CORS involved).

4. Admin panel: [http://localhost:8080/admin](http://localhost:8080/admin),
   log in with the credentials from step 1.

Stop everything:

```bash
docker compose down
```

Data (SQLite file) persists in a named Docker volume (`backend_data`) across
restarts. Remove it with `docker compose down -v` to fully reset.

## Local development (without Docker)

### Frontend

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build
npm run lint
```

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in ADMIN_USERNAME / ADMIN_PASSWORD_HASH / JWT_SECRET
npm run prisma:migrate
npm run dev             # http://localhost:4000
```

When running both outside Docker, the frontend dev server (`:5173`) and the
backend (`:4000`) are on different origins, so the backend's CORS config
(`CORS_ORIGIN`, defaults to `http://localhost:5173`) handles that — no proxy
needed locally.

## Running services individually with plain Docker

```bash
# Backend
cd backend
docker build -t mounty-backend .
docker run -d -p 4000:4000 --env-file .env -v mounty_backend_data:/app/data --name mounty-backend mounty-backend

# Frontend
cd frontend
docker build -t mounty-frontend .
docker run -d -p 8080:80 \
  -e BACKEND_HOST=host.docker.internal \
  -e BACKEND_PORT=4000 \
  --name mounty-frontend mounty-frontend
```

Note: the frontend's nginx config is an envsubst template — `BACKEND_HOST`
and `BACKEND_PORT` must be set or nginx will fail to start (empty
`proxy_pass` target). Docker Compose sets these automatically; when running
the frontend container standalone, point them at wherever your backend is
actually reachable from the container.
