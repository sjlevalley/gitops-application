# Local Development Guide

This guide will help you run the GitOps application locally using Docker Compose. We provide two different setups: **Development** (with hot reloading) and **Production Testing**.

## Prerequisites

- Docker and Docker Compose installed
- Git (to clone the repository)

## 🚀 Quick Start

### Development Mode (Recommended for coding)
**Features**: Hot module reloading, faster development cycle

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd gitops-application
   ```

2. **Run the development setup script**:
   ```bash
   chmod +x scripts/dev-setup.sh
   ./scripts/dev-setup.sh
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000 (with hot reloading)
   - Backend API: http://localhost:3001 (with auto-restart)
   - Database: localhost:5432

### Production Testing Mode
**Features**: Production-like environment, optimized builds

1. **Run the production testing script**:
   ```bash
   chmod +x scripts/prod-test.sh
   ./scripts/prod-test.sh
   ```

2. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:5432

## Manual Setup

If you prefer to set up manually:

### Development Mode
1. **Create environment file**:
   ```bash
   cp env.example .env
   ```

2. **Start services with hot reloading**:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build -d
   ```

3. **Check service status**:
   ```bash
   docker-compose -f docker-compose.dev.yml ps
   ```

### Production Testing Mode
1. **Create environment file**:
   ```bash
   cp env.example .env
   ```

2. **Start services in production mode**:
   ```bash
   docker-compose up --build -d
   ```

3. **Check service status**:
   ```bash
   docker-compose ps
   ```

## 🔄 Development vs Production Testing

### Development Mode (`docker-compose.dev.yml`)
- **Hot Module Reloading**: ✅ Frontend and backend auto-reload on code changes
- **Build Speed**: Faster builds, no production optimizations
- **Dependencies**: Includes dev dependencies (nodemon, etc.)
- **Use Case**: Active development, coding, debugging
- **Performance**: Slower runtime, more memory usage
- **File Watching**: Real-time file changes detection

### Production Testing Mode (`docker-compose.yml`)
- **Hot Module Reloading**: ❌ Requires container rebuild for changes
- **Build Speed**: Slower builds, full production optimizations
- **Dependencies**: Production dependencies only
- **Use Case**: Testing production-like behavior, performance testing
- **Performance**: Optimized runtime, less memory usage
- **File Watching**: No file watching, static builds

## Services

### Database (PostgreSQL)
- **Port**: 5432
- **Database**: gitops_db
- **Username**: gitops_user
- **Password**: gitops_password
- **Initialization**: Automatically runs SQL scripts from `gitops-database/init/`

### Backend API (Node.js/Express)
- **Port**: 3001
- **Health Check**: http://localhost:3001/health
- **API Endpoints**:
  - `GET /api/todos` - List all todos
  - `POST /api/todos` - Create a new todo
  - `PUT /api/todos/:id` - Update a todo
  - `DELETE /api/todos/:id` - Delete a todo

### Frontend (Next.js)
- **Port**: 3000
- **URL**: http://localhost:3000
- **Features**: Todo management interface with real-time updates

## Development Commands

### Development Mode Commands
```bash
# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Restart services
docker-compose -f docker-compose.dev.yml restart

# Rebuild services
docker-compose -f docker-compose.dev.yml up --build

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production Testing Commands
```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Rebuild services
docker-compose up --build

# Stop services
docker-compose down
```

### Service-Specific Commands
```bash
# View logs for specific service (works with both modes)
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend
docker-compose -f docker-compose.dev.yml logs -f database

# Restart specific service
docker-compose -f docker-compose.dev.yml restart backend
```

### Database Access

Connect to the PostgreSQL database:
```bash
# Using Docker
docker-compose exec database psql -U gitops_user -d gitops_db

# Using local psql client
psql -h localhost -p 5432 -U gitops_user -d gitops_db
```

### Stop Services
```bash
# Development mode - Stop services (keeps data)
docker-compose -f docker-compose.dev.yml down

# Development mode - Stop and remove volumes (deletes data)
docker-compose -f docker-compose.dev.yml down -v

# Production testing mode - Stop services (keeps data)
docker-compose down

# Production testing mode - Stop and remove volumes (deletes data)
docker-compose down -v
```

## Environment Variables

The application uses the following environment variables (defined in `.env`):

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gitops_db
DB_USER=gitops_user
DB_PASSWORD=gitops_password

# Backend Configuration
NODE_ENV=development
PORT=3001

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Database Schema

The database includes the following tables:

- **users** - User accounts and authentication
- **applications** - GitOps applications being managed
- **deployments** - Deployment history and status
- **deployment_logs** - Detailed deployment logs
- **todos** - Todo items for the application

## Troubleshooting

### Services won't start
1. Check if ports 3000, 3001, and 5432 are available
2. Ensure Docker is running
3. Check logs: `docker-compose logs`

### Database connection issues
1. Wait for database to fully initialize (can take 30-60 seconds)
2. Check database logs: `docker-compose logs database`
3. Verify environment variables in `.env`

### Frontend not connecting to backend
1. Check if backend is running: `curl http://localhost:3001/health`
2. Verify `NEXT_PUBLIC_API_URL` in `.env`
3. Check browser developer tools for network errors

### Cleanup
To completely clean up the local development environment:
```bash
# Development mode cleanup
chmod +x scripts/dev-cleanup.sh
./scripts/dev-cleanup.sh

# Production testing mode cleanup
docker-compose down -v
docker volume prune -f
```

## Production Deployment

This local setup is for development only. For production deployment, use the Kubernetes manifests in the `k8s/` directory.

## Contributing

1. Make your changes
2. Test locally using this setup
3. Ensure all services start and work correctly
4. Submit your pull request
