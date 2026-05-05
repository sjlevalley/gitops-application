# Trino Analytics Frontend

Minimal **Next.js 15** app used with Docker Compose: shows coordinator **`/v1/info`** (server-side via `TRINO_URL`) and links to Trino’s Web UI on the host.

## Development (without Docker)

Start Trino first (e.g. `docker compose up trino` from repo root), then:

```bash
cd src/frontend
npm install
set TRINO_URL=http://localhost:8080
set NEXT_PUBLIC_TRINO_UI=http://localhost:8080
npm run dev
```

(On Linux/macOS use `export` instead of `set`.)

## Docker

Built by `docker compose` from the parent directory; see `Dockerfile` (standalone output).

## Planned (not implemented here yet)

Monaco editor, catalog browser, AI assistant, exports — see parent `README.md`.
