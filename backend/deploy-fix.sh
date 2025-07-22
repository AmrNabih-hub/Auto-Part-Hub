#!/bin/bash

# Deployment fix script for Laravel Docker deployment
# This script addresses common Composer and Docker deployment issues

set -e  # Exit on any error

echo "🚀 Starting deployment fix process..."

# 1. Clean up any existing build artifacts
echo "🧹 Cleaning up build artifacts..."
rm -rf vendor/
rm -rf bootstrap/cache/*.php
rm -rf storage/framework/cache/*
rm -rf storage/framework/sessions/*
rm -rf storage/framework/views/*

# 2. Ensure composer.lock exists
if [ ! -f "composer.lock" ]; then
    echo "⚠️  composer.lock not found. Generating..."
    composer install --no-scripts --no-dev
else
    echo "✅ composer.lock found"
fi

# 3. Validate composer.json
echo "🔍 Validating composer.json..."
composer validate --no-check-publish

# 4. Clear composer cache
echo "🗑️  Clearing composer cache..."
composer clear-cache

# 5. Install dependencies with error handling
echo "📦 Installing dependencies..."
composer install \
    --no-dev \
    --no-scripts \
    --no-interaction \
    --prefer-dist \
    --optimize-autoloader \
    --ignore-platform-reqs || {
    echo "❌ Composer install failed. Trying with verbose output..."
    composer install \
        --no-dev \
        --no-scripts \
        --no-interaction \
        --prefer-dist \
        --optimize-autoloader \
        --ignore-platform-reqs \
        --verbose
}

# 6. Generate optimized autoloader
echo "⚡ Generating optimized autoloader..."
composer dump-autoload --no-dev --optimize

# 7. Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p storage/app/public
mkdir -p storage/framework/cache
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p bootstrap/cache

# 8. Set proper permissions
echo "🔐 Setting proper permissions..."
chmod -R 755 storage/
chmod -R 755 bootstrap/cache/

# 9. Create minimal .env if not exists
if [ ! -f ".env" ]; then
    echo "📝 Creating minimal .env file..."
    cat > .env << EOF
APP_NAME=Laravel
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error

DB_CONNECTION=sqlite
DB_DATABASE=/tmp/database.sqlite

CACHE_STORE=array
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=array
SESSION_LIFETIME=120

MAIL_MAILER=log
EOF
fi

echo "✅ Deployment preparation completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Build Docker image: docker build -t your-app ."
echo "2. Or use the optimized Dockerfile: docker build -f Dockerfile.optimized -t your-app ."
echo "3. Run container: docker run -p 80:80 your-app"
echo ""
echo "🔧 If you still encounter issues, try:"
echo "- Use Dockerfile.optimized for multi-stage build"
echo "- Increase Docker memory limit"
echo "- Check platform compatibility with --platform linux/amd64"