#!/bin/bash

# GitOps Application Local Development Cleanup Script

set -e

echo "🧹 Cleaning up GitOps Application local development environment..."

# Stop and remove containers
echo "🛑 Stopping and removing containers..."
docker-compose -f docker-compose.dev.yml down

# Remove volumes (this will delete all database data)
read -p "🗑️  Do you want to remove database volumes? This will delete all data. (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Removing database volumes..."
    docker-compose -f docker-compose.dev.yml down -v
    docker volume prune -f
fi

# Remove images
read -p "🖼️  Do you want to remove Docker images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🖼️  Removing Docker images..."
    docker-compose -f docker-compose.dev.yml down --rmi all
fi

# Remove .env file
read -p "📝 Do you want to remove the .env file? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "📝 Removing .env file..."
    rm -f .env
fi

echo "✅ Cleanup complete!"
