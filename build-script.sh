#!/bin/bash
set -e

echo "🚫 DOCKER IS DISABLED FOR THIS PROJECT"
echo "========================================"

# Check if Docker is being attempted
if [ -f "Dockerfile" ]; then
    echo "❌ ERROR: Dockerfile detected! This project does not use Docker."
    echo "Please use nixpacks or native deployment instead."
    exit 1
fi

# Check for Docker environment
if [ "$DOCKER_BUILDKIT" = "1" ] || [ -n "$BUILDKIT_HOST" ]; then
    echo "❌ ERROR: Docker BuildKit detected! This project does not use Docker."
    echo "Please configure your deployment platform to use nixpacks."
    exit 1
fi

echo "✅ No Docker detected. Proceeding with nixpacks build..."

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm ci --prefer-offline --no-audit

# Install PHP dependencies
echo "📦 Installing PHP dependencies..."
cd backend
composer install --no-dev --optimize-autoloader --no-interaction
cd ..

# Build frontend
echo "🏗️ Building frontend..."
npm run build

echo "✅ Build completed successfully without Docker!"