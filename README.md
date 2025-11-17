# GitOps Application Repository

This repository contains the source code for applications that are deployed via ArgoCD using GitOps principles. **Kubernetes manifests are stored in a separate repository** (`gitops-kubernetes`) following GitOps best practices.

## Repository Structure

```
gitops-application/
├── applications/                    # Application source code
│   ├── README.md                   # Applications overview
│   ├── todo-app/                   # Todo management application
│   │   ├── src/                    # Source code (frontend, backend, database)
│   │   ├── docker/                 # Docker files
│   │   ├── docker-compose.yml      # Local development
│   │   └── README.md               # Application-specific documentation
│   └── voting-app/                 # Demo voting application
│       └── README.md               # Application documentation
├── scripts/                        # Utility scripts
│   └── select-application.sh       # Application selector
├── notes/                          # Documentation
└── README.md                       # This file
```

## Related Repositories

- **gitops-kubernetes**: Contains all Kubernetes manifests and ArgoCD configurations
- **gitops-infra**: Contains infrastructure setup and configuration

## Available Applications

### 1. Todo Management App
- **Path**: `applications/todo-app/`
- **Description**: Modern todo management application with Next.js, Express, and PostgreSQL
- **Components**: Frontend (Next.js), Backend (Express), Database (PostgreSQL)
- **Environments**: dev, staging, prod
- **Access**: Frontend (port 3000), Backend API (port 3001)

### 2. Voting App (Demo)
- **Path**: `applications/voting-app/`
- **Description**: Complete microservices demo with Docker Hub images
- **Components**: Vote frontend, Result frontend, Worker, Redis, PostgreSQL
- **Access**: Vote App (port 30001), Result App (port 30002)

## Quick Start

### Option 1: Application Selector (Recommended)
```bash
./scripts/select-application.sh
```

### Option 2: Deploy via GitOps Kubernetes Repository
Kubernetes manifests are in the `gitops-kubernetes` repository. See that repository for deployment instructions.

### Option 3: ArgoCD ApplicationSet
The ArgoCD ApplicationSet configuration is in the `gitops-kubernetes` repository.

## Development

### Local Development
Each application has its own development setup. See the individual application README files:

- [Todo App Development](applications/todo-app/README.md)
- [Voting App Development](applications/voting-app/README.md)

### Adding New Applications

1. Create a new directory under `applications/` with your source code
2. Add Kubernetes manifests to the `gitops-kubernetes` repository
3. Update `applications/applications-config.yaml` in `gitops-kubernetes`
4. Update `argocd-applicationset.yaml` in `gitops-kubernetes` if using dynamic deployment
5. Update `scripts/select-application.sh` for the selector

## GitOps Best Practices

1. **Application Isolation**: Each application is self-contained
2. **Environment Management**: Support for multiple environments
3. **Source of Truth**: Git repository is the single source of truth
4. **Automated Deployment**: ArgoCD monitors and deploys changes
5. **Configuration Management**: Environment-specific configurations

## Documentation

- [Applications Overview](applications/README.md)
- [ArgoCD Installation](notes/02-argocd-installation.md)
- [CI/CD Pipeline Setup](notes/03-cicd-pipeline-setup.md)
- [Secrets Management](notes/05-secrets-management-setup.md)
- [Monitoring Setup](notes/06-monitoring-setup.md)

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