# GitOps Application Repository

This repository contains the complete GitOps application stack with frontend, backend, and database components.

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Components

### Frontend (`gitops-frontend/`)
- **Technology**: Next.js 15 with React 19
- **Features**: Modern UI with dark/light mode, responsive design
- **Port**: 3000

### Backend (`gitops-backend/`)
- **Technology**: Node.js with Express
- **Features**: RESTful API, health checks, database integration
- **Port**: 3001

### Database (`gitops-database/`)
- **Technology**: PostgreSQL 15
- **Features**: Schema management, initialization scripts
- **Port**: 5432

## GitOps Structure

```
k8s/
├── base/                    # Base Kubernetes manifests
│   ├── frontend/           # Frontend deployment & service
│   ├── backend/            # Backend deployment & service
│   └── database/           # Database deployment, service, PVC
└── overlays/               # Environment-specific configurations
    ├── dev/                # Development environment
    ├── staging/            # Staging environment
    └── prod/               # Production environment
```

## Quick Start

### 1. Build and Deploy

```bash
# Build Docker images
docker build -f docker/frontend.Dockerfile -t gitops-frontend:latest .
docker build -f docker/backend.Dockerfile -t gitops-backend:latest .

# Deploy to development
kubectl apply -k k8s/overlays/dev/

# Deploy to staging
kubectl apply -k k8s/overlays/staging/

# Deploy to production
kubectl apply -k k8s/overlays/prod/
```

### 2. Verify Deployment

```bash
# Check pods
kubectl get pods -n gitops-application-dev

# Check services
kubectl get services -n gitops-application-dev

# Port forward for testing
kubectl port-forward -n gitops-application-dev svc/dev-gitops-frontend-service 3000:80
kubectl port-forward -n gitops-application-dev svc/dev-gitops-backend-service 3001:3001
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
- `GET /api/applications` - List applications
- `GET /api/deployments` - List deployments

### Frontend
- `GET /` - Main application
- Theme toggle in navbar

## Development

### Local Development

```bash
# Frontend
cd gitops-frontend
npm install
npm run dev

# Backend
cd gitops-backend
npm install
npm run dev
```

### Database Schema

The database is automatically initialized with:
- Users table
- Applications table
- Deployments table
- Deployment logs table

## GitOps Best Practices

1. **Base Configuration**: All common configurations in `k8s/base/`
2. **Environment Overlays**: Environment-specific changes in `k8s/overlays/`
3. **Image Management**: Different image tags per environment
4. **Resource Scaling**: Appropriate resource limits per environment
5. **Secrets Management**: Kubernetes secrets for sensitive data

## CI/CD Integration

This repository is designed to work with:
- **ArgoCD** for GitOps deployment
- **GitHub Actions** for CI/CD pipelines
- **Docker Registry** for image storage

## Security

- Non-root containers
- Resource limits
- Health checks
- Secrets management
- Network policies (can be added)

## Monitoring

- Health check endpoints
- Kubernetes liveness/readiness probes
- Structured logging
- Metrics endpoints (can be added)
