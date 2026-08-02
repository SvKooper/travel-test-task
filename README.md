# Mounty — Test Task

Landing page (Vite + React + TypeScript + Tailwind CSS v4).

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build to dist/
npm run lint
```

## Docker

Build and run the production build in a container (Vite build served by nginx).

### Using Docker Compose (recommended)

```bash
docker compose up -d --build
```

The app will be available at [http://localhost:8080](http://localhost:8080).

Stop it with:

```bash
docker compose down
```

### Using plain Docker

```bash
docker build -t mounty-test-task .
docker run -d -p 8080:80 --name mounty-test-task mounty-test-task
```

The app will be available at [http://localhost:8080](http://localhost:8080).

Stop and remove the container:

```bash
docker stop mounty-test-task && docker rm mounty-test-task
```
