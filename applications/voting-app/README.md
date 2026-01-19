# Voting App - Official Docker Example

This directory contains references to the official Docker Voting App example deployed on Kubernetes. The actual Kubernetes manifests are sourced from the [official Docker repository](https://github.com/dockersamples/example-voting-app/tree/main/k8s-specifications).

This application demonstrates a complete microservices architecture with frontend, backend, and database components.

## Architecture

- **Vote Frontend**: Python Flask web app for voting (Cats vs Dogs)
- **Result Frontend**: Node.js web app showing voting results
- **Worker**: Node.js background service processing votes
- **Redis**: In-memory database for vote queue
- **PostgreSQL**: Persistent database for storing results

## Deployment

### Recommended: Deploy via ArgoCD (GitOps)

The recommended way to deploy this application is through ArgoCD using the official Docker specifications:

1. **Install ArgoCD** (follow the ArgoCD installation guide)
2. **Create the application** using the ArgoCD configuration in `gitops-application/notes/02-argocd-installation.md`
3. **Access the application** at the NodePort URLs

### Alternative: Direct kubectl deployment

If you want to deploy manually, use the official Docker repository:

```bash
# Clone the official Docker voting app repository
git clone https://github.com/dockersamples/example-voting-app.git
cd example-voting-app

# Deploy using the official Kubernetes specifications
kubectl apply -f k8s-specifications/

# Check deployment status
kubectl get pods
kubectl get services
```

### Note about Local Manifests

The `k8s/` directory in this repository contains a copy of the official Docker voting app manifests for reference. However, for the most up-to-date and official specifications, always use the [official Docker repository](https://github.com/dockersamples/example-voting-app/tree/main/k8s-specifications).

### Access the Application

The application will be accessible via NodePort services. Replace `<MASTER_IP>` with your Kubernetes master node's public IP:

- **Vote App**: `http://<MASTER_IP>:30001`
- **Result App**: `http://<MASTER_IP>:30002`

**To get your master node's IP:**
```bash
# From master node
curl -s http://169.254.169.254/latest/meta-data/public-ipv4

# Or check your Terraform output/AWS console
```

### Testing the Application

1. **Vote**: Go to the vote app and click on "Cats" or "Dogs"
2. **View Results**: Go to the result app to see the voting results
3. **Check Logs**: Use `kubectl logs -f deployment/worker` to see vote processing

## Useful Commands

```bash
# Check all pods
kubectl get pods

# Check all services
kubectl get services

# Check logs
kubectl logs -f deployment/vote
kubectl logs -f deployment/result
kubectl logs -f deployment/worker

# Scale the vote app
kubectl scale deployment vote --replicas=3

# Delete the application
kubectl delete -f .
```

## Troubleshooting

### If pods are not starting:
```bash
# Check pod status
kubectl describe pod <pod-name>

# Check events
kubectl get events --sort-by=.metadata.creationTimestamp
```

### If services are not accessible:
```bash
# Check service endpoints
kubectl get endpoints

# Check if NodePort is open in security groups
# Ensure ports 30001 and 30002 are open
```

## Components

| Component | Image | Port | Service Type |
|-----------|-------|------|--------------|
| Vote | dockersamples/examplevotingapp_vote:before | 80 | NodePort (30001) |
| Result | dockersamples/examplevotingapp_result:before | 80 | NodePort (30002) |
| Worker | dockersamples/examplevotingapp_worker | - | None |
| Redis | redis:alpine | 6379 | ClusterIP |
| PostgreSQL | postgres:15-alpine | 5432 | ClusterIP |

## Local k8s Directory

The `k8s/` directory contains a reference copy of the Kubernetes manifests from the official Docker repository. These are provided for:

- **Reference and comparison** with the official specifications
- **Local development** and testing
- **Understanding the application structure**

**⚠️ Important**: For production deployments and ArgoCD usage, always use the official Docker repository as the source of truth. The local manifests may become outdated.

## Source Repository

This application is based on the official Docker Voting App example:

- **GitHub Repository**: [dockersamples/example-voting-app](https://github.com/dockersamples/example-voting-app)
- **Kubernetes Specifications**: [k8s-specifications directory](https://github.com/dockersamples/example-voting-app/tree/main/k8s-specifications)
- **Documentation**: [Official README](https://github.com/dockersamples/example-voting-app/blob/main/README.md)
