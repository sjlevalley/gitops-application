# Trino Analytics

A modern data exploration UI built on Trino, designed as a free/open-source alternative to Starburst. This application provides a web-based SQL query interface with AI assistance for querying public datasets.

## Features

- **SQL Editor**: Monaco-based editor with syntax highlighting and autocomplete
- **Catalog Browser**: Explore TPC-H, TPC-DS, and other data sources
- **AI Assistant**: Natural language to SQL conversion
- **Query History**: Save and reuse queries
- **Result Visualization**: Basic charts from query results
- **Export**: Download results as CSV, JSON, or Parquet

## Architecture

```
┌──────────────┐     ┌─────────────────┐     ┌─────────────┐
│  Frontend    │────►│  Trino          │────►│ PostgreSQL  │
│  Next.js     │     │  :8080          │     │  :5432      │
│  :3000       │     └────────┬────────┘     └─────────────┘
└──────────────┘              │
                              ├──────────────►┌─────────────┐
                              │               │ MySQL       │
                              │               │ :3306       │
                              │               └─────────────┘
                              │
                              └──► tpch, tpcds (in-process connectors)
```

## Data Sources

- **TPC-H** / **TPC-DS**: Benchmark connectors (`tpch`, `tpcds` catalogs)
- **postgres**: PostgreSQL 16 (`demo` database, sample `public.sales` table)
- **mysql**: MySQL 8.4 (`demo` database, sample `events` table)
- **Future**: S3 / Iceberg / other connectors via extra catalog `.properties` files

### Demo database credentials (Compose only — not for production)

| Service    | Host (from Trino) | DB    | User        | Password    | Host port |
|------------|-------------------|-------|-------------|-------------|-----------|
| PostgreSQL | `postgres`        | demo  | trino_demo  | trino_demo  | 5433      |
| MySQL      | `mysql`           | demo  | trino_demo  | trino_demo  | 3307      |

Root MySQL password (host tools only): `trino_root`.

## Quick Start

### Docker Compose (Trino + frontend)

From this directory:

```bash
docker compose up --build
```

- **Frontend:** http://localhost:3000  
- **Trino:** http://localhost:8080 (Web UI: `/ui`)
- **PostgreSQL** (optional, from host): `localhost:5433`
- **MySQL** (optional, from host): `localhost:3307`

Trino waits for PostgreSQL and MySQL to be healthy before starting.

**Example SQL in Trino UI:**

```sql
SELECT * FROM postgres.public.sales;
SELECT * FROM mysql.demo.events;
```

### Local Development (frontend only)

```bash
# Terminal 1 — databases + Trino (from this directory)
docker compose up postgres mysql trino

# Terminal 2 — frontend
cd src/frontend
npm install
set TRINO_URL=http://localhost:8080
set NEXT_PUBLIC_TRINO_UI=http://localhost:8080
npm run dev
```

(On Linux/macOS use `export` instead of `set`.)

### Kubernetes Deployment

The Kubernetes manifests are in the `gitops-kubernetes` repository.

## Current Structure

```
trino-analytics/
├── README.md
├── docker-compose.yml
├── src/
│   ├── frontend/           # Next.js 15 minimal shell (Dockerfile, App Router)
│   └── trino/
│       ├── catalogs/       # Mounted at /etc/trino/catalog in the container
│       │   ├── tpch.properties
│       │   ├── tpcds.properties
│       │   ├── postgres.properties
│       │   └── mysql.properties
│       └── init/           # DB seed scripts (first init only)
│           ├── postgres/
│           └── mysql/
└── ...
```

## Next Steps

1. Expand the Next.js UI (SQL editor, catalogs, etc.)
2. Add AI integration for natural language queries
3. Create Kubernetes manifests for GitOps deployment

See the `gitops-kubernetes` repository for deployment configuration.
