#!/bin/bash

# GitOps Application Production Testing Script

set -e

echo "🚀 Setting up GitOps Application for production testing..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. You can modify it if needed."
fi

# Build and start services in production mode
echo "🔨 Building and starting services in production mode..."
docker-compose up --build -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

echo ""
echo "✅ Production testing setup complete! Your GitOps application is now running:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   🔧 Backend API: http://localhost:3001"
echo "   🗄️  Database: localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Rebuild services: docker-compose up --build"
echo ""
echo "⚠️  Production mode: No hot reloading. Changes require rebuilding containers."
echo ""
echo "🔧 Database connection details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: gitops_db"
echo "   Username: gitops_user"
echo "   Password: gitops_password"
