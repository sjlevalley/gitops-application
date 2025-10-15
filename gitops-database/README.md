# GitOps Database

PostgreSQL database for the GitOps application.

## Schema

### Tables

- **users** - User accounts and authentication
- **applications** - GitOps applications being managed
- **deployments** - Deployment history and status
- **deployment_logs** - Detailed deployment logs

### Key Features

- Automatic timestamp management with triggers
- JSON metadata support for deployments
- Comprehensive indexing for performance
- Foreign key relationships for data integrity

## Initialization

The database is automatically initialized with:

1. Schema creation
2. Initial application data
3. Performance indexes
4. Update triggers
5. User permissions

## Environment Variables

- `POSTGRES_DB` - Database name (default: gitops_db)
- `POSTGRES_USER` - Database user (default: gitops_user)
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_INITDB_ARGS` - Additional init arguments

## Kubernetes Deployment

This database is deployed using Kustomize manifests with:

- Persistent volume for data storage
- ConfigMap for initialization scripts
- Secret for database credentials
- Service for internal communication

## Backup and Recovery

For production deployments, consider:

- Regular automated backups
- Point-in-time recovery
- Cross-region replication
- Monitoring and alerting
