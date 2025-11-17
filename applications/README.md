# Applications Directory

This directory contains the source code for all applications. **Kubernetes manifests are stored in the `gitops-kubernetes` repository** following GitOps best practices.

## Directory Structure

```
applications/
├── voting-app/                 # Demo voting application (source code)
├── todo-app/                   # Todo management application (source code)
├── blog-app/                   # Blog platform (future)
└── ecommerce-app/              # E-commerce store (future)
```

## Available Applications

### 1. Voting App (Demo)
- **Path**: `applications/voting-app/`
- **Description**: Complete microservices demo with Docker Hub images
- **Components**: Vote frontend, Result frontend, Worker, Redis, PostgreSQL
- **Access**: 
  - Vote App: `http://<master-ip>:30001`
  - Result App: `http://<master-ip>:30002`
- **Images**: Docker Hub (`dockersamples/examplevotingapp_*`)

### 2. Todo Management App
- **Source Code Path**: `applications/todo-app/`
- **K8s Manifests Path**: `gitops-kubernetes/applications/todo-app/k8s/overlays/`
- **Description**: Modern todo management application
- **Components**: Next.js frontend, Express backend, PostgreSQL database
- **Environments**: dev, staging, prod
- **Access**: 
  - Frontend: `http://<master-ip>:3000`
  - Backend API: `http://<master-ip>:3001`
- **Images**: Custom built

### 3. Blog Platform (Future)
- **Path**: `applications/blog-app/`
- **Status**: Placeholder for future implementation
- **Description**: Modern blog platform

### 4. E-commerce Store (Future)
- **Path**: `applications/ecommerce-app/`
- **Status**: Placeholder for future implementation
- **Description**: Full-featured e-commerce platform

## Deployment Methods

Kubernetes manifests and ArgoCD configurations are in the `gitops-kubernetes` repository. See that repository for deployment instructions.

### Method 1: Application Selector Script
```bash
./scripts/select-application.sh
```

### Method 2: GitOps via ArgoCD
All deployments are managed through the `gitops-kubernetes` repository using ArgoCD.

## Adding New Applications

1. Create a new directory under `applications/` with your source code
2. Add Kubernetes manifests to `gitops-kubernetes/applications/`
3. Update `applications-config.yaml` in `gitops-kubernetes`
4. Update `argocd-applicationset.yaml` in `gitops-kubernetes` if using dynamic deployment
5. Update `scripts/select-application.sh` for the selector

## Configuration

The `applications-config.yaml` file (in `gitops-kubernetes`) defines all available applications and their properties. This file is used by:
- Application selector script
- Documentation generation
- ArgoCD ApplicationSet

## Best Practices

1. **Isolation**: Each application should be self-contained
2. **Naming**: Use consistent naming conventions
3. **Documentation**: Include README.md in each application directory
4. **Environment Support**: Support multiple environments where applicable
5. **Resource Management**: Set appropriate resource limits and requests
