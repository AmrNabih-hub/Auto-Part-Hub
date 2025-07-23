#!/bin/bash

echo "🚀 Deploying without Docker..."
echo "================================"

# Ensure we're not using Docker
if command -v docker &> /dev/null; then
    echo "⚠️  Docker detected but will NOT be used for this deployment"
fi

echo "📦 Installing dependencies..."
npm ci

echo "🏗️  Building frontend..."
npm run build

echo "🔧 Setting up backend..."
cd backend
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
cd ..

echo "✅ Deployment ready! Use nixpacks or native deployment."
echo "🚫 DO NOT use Docker for this project."