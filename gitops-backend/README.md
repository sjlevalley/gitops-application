# GitOps Backend API

A Node.js/Express backend service for the GitOps application.

## Features

- RESTful API endpoints
- Health check endpoint
- CORS enabled
- Security headers with Helmet
- Request logging with Morgan
- Environment-based configuration

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/status` - Service status
- `GET /api/applications` - List applications
- `GET /api/deployments` - List deployments

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start production server
npm start

# Run tests
npm test
```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3001)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password

## Docker

```bash
# Build image
docker build -t gitops-backend .

# Run container
docker run -p 3001:3001 gitops-backend
```

## Kubernetes

This service is deployed using Kustomize manifests in the `k8s/` directory.
