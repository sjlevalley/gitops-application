# Applications Directory

This directory contains all the applications that can be deployed via ArgoCD. Each application is organized in its own subdirectory with its Kubernetes manifests.

## Directory Structure

```
applications/
├── applications-config.yaml    # Configuration for all available applications
├── voting-app/                 # Demo voting application
├── todo-app/                   # Todo management application
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
- **Path**: `applications/todo-app/k8s/overlays/`
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

### Method 1: Application Selector Script
```bash
./scripts/select-application.sh
```

### Method 2: Individual Application Manifests
```bash
# Deploy voting app
kubectl apply -f argocd-voting-app.yaml

# Deploy todo app
kubectl apply -f argocd-todo-app-dev.yaml
```

### Method 3: ApplicationSet (Dynamic)
```bash
# Deploy all applications dynamically
kubectl apply -f argocd-applicationset.yaml
```

## Adding New Applications

1. Create a new directory under `applications/`
2. Add your Kubernetes manifests
3. Update `applications-config.yaml`
4. Update `argocd-applicationset.yaml` if using dynamic deployment
5. Update `scripts/select-application.sh` for the selector

## Configuration

The `applications-config.yaml` file defines all available applications and their properties. This file is used by:
- Application selector script
- Documentation generation
- Future automation tools

## Best Practices

1. **Isolation**: Each application should be self-contained
2. **Naming**: Use consistent naming conventions
3. **Documentation**: Include README.md in each application directory
4. **Environment Support**: Support multiple environments where applicable
5. **Resource Management**: Set appropriate resource limits and requests
