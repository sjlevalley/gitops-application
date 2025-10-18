#!/bin/bash

# GitOps Application Local Development Setup Script

set -e

echo "🚀 Setting up GitOps Application for local development..."

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

# Build and start services
echo "🔨 Building and starting services with hot reloading..."
echo "📦 Starting database and frontend in background..."
docker-compose -f docker-compose.dev.yml up --build -d database frontend

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Start backend in foreground so you can see logs
echo "🚀 Starting backend in foreground (you'll see logs here)..."
echo "💡 Press Ctrl+C to stop the backend (database and frontend will keep running)"
echo "💡 Use 'docker-compose -f docker-compose.dev.yml down' to stop all services"
echo ""
docker-compose -f docker-compose.dev.yml up --build backend

echo ""
echo "✅ Setup complete! Your GitOps application is now running:"
echo "   🌐 Frontend: http://localhost:3000"
echo "   🔧 Backend API: http://localhost:3001"
echo "   🗄️  Database: localhost:5432"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose -f docker-compose.dev.yml logs -f"
echo "   Stop services: docker-compose -f docker-compose.dev.yml down"
echo "   Restart services: docker-compose -f docker-compose.dev.yml restart"
echo "   Rebuild services: docker-compose -f docker-compose.dev.yml up --build"
echo ""
echo "🔥 Hot reloading is enabled! Changes to your code will update automatically."
echo ""
echo "🔧 Database connection details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: gitops_db"
echo "   Username: gitops_user"
echo "   Password: gitops_password"
