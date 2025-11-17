# Todo Management Application

A modern todo management application built with Next.js, Express, and PostgreSQL, designed for GitOps deployment.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Components

### Frontend (`src/frontend/`)
- **Technology**: Next.js 15 with React 19
- **Features**: Modern UI with dark/light mode, responsive design
- **Port**: 3000

### Backend (`src/backend/`)
- **Technology**: Node.js with Express
- **Features**: RESTful API, health checks, database integration
- **Port**: 3001

### Database (`src/database/`)
- **Technology**: PostgreSQL 15
- **Features**: Schema management, initialization scripts
- **Port**: 5432

## Directory Structure

```
todo-app/
├── src/                          # Source code
│   ├── frontend/                 # Next.js frontend
│   ├── backend/                  # Express backend
│   └── database/                 # Database init scripts
├── docker/                       # Docker files
│   ├── frontend.Dockerfile
│   └── backend.Dockerfile
├── docker-compose.yml            # Production-like environment
├── docker-compose.dev.yml        # Development environment
├── env.example                   # Environment variables template
├── LOCAL_DEVELOPMENT.md          # Local development guide
├── dev-setup.sh                  # Development setup script
├── dev-cleanup.sh                # Development cleanup script
└── prod-test.sh                  # Production testing script
```

**Note**: Kubernetes manifests are stored in the `gitops-kubernetes` repository at `applications/todo-app/k8s/`

## Quick Start

### 1. Environment Setup

```bash
# Copy the environment template
cp env.example .env

# Edit the .env file with your actual values
nano .env
```

### 2. Docker Development

```bash
# Development environment with hot reloading
docker-compose -f docker-compose.dev.yml up -d

# Production-like environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 3. Kubernetes Deployment

Kubernetes manifests are in the `gitops-kubernetes` repository. For deployment instructions, see that repository.

```bash
# Build Docker images
docker build -f docker/frontend.Dockerfile -t todo-frontend:latest src/frontend/
docker build -f docker/backend.Dockerfile -t todo-backend:latest src/backend/

# Kubernetes deployment is managed via GitOps in the gitops-kubernetes repository
```

### 4. Verify Deployment

```bash
# Check pods
kubectl get pods -n todo-app-dev

# Check services
kubectl get services -n todo-app-dev

# Port forward for testing
kubectl port-forward -n todo-app-dev svc/dev-todo-frontend-service 3000:80
kubectl port-forward -n todo-app-dev svc/dev-todo-backend-service 3001:3001
```

## Environment Differences

| Environment | Replicas | Resources | Storage | Image Tags |
|-------------|----------|-----------|---------|------------|
| **Dev**     | 1        | Minimal   | 5Gi     | dev-latest |
| **Staging** | 2        | Medium    | 20Gi    | staging-latest |
| **Prod**    | 3        | High      | 100Gi   | v1.0.0 |

## API Endpoints

### Backend API
- `GET /health` - Health check
- `GET /api/status` - Service status
- `GET /api/todos` - List todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Frontend
- `GET /` - Main application
- Theme toggle in navbar

## Development

### Local Development

```bash
# Frontend
cd src/frontend
npm install
npm run dev

# Backend
cd src/backend
npm install
npm run dev
```

### Database Schema

The database is automatically initialized with:
- Users table
- Todos table
- Todo categories table

## GitOps Integration

This application is designed to work with:
- **ArgoCD** for GitOps deployment
- **GitHub Actions** for CI/CD pipelines
- **Docker Registry** for image storage

## Security

- Non-root containers
- Resource limits
- Health checks
- Environment variable management (no hardcoded secrets)
- Network policies (can be added)

## Monitoring

- Health check endpoints
- Kubernetes liveness/readiness probes
- Structured logging
- Metrics endpoints (can be added)
