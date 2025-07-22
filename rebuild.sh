#!/bin/bash

echo "🧹 Cleaning up Docker cache and containers..."

# Stop and remove all containers
docker-compose down --volumes --remove-orphans

# Remove all unused containers, networks, images, and build cache
docker system prune -af --volumes

# Remove specific images if they exist
docker rmi autparthub-app 2>/dev/null || echo "autparthub-app image not found"
docker rmi car-parts-project-backend 2>/dev/null || echo "backend image not found"
docker rmi car-parts-project-frontend 2>/dev/null || echo "frontend image not found"

echo "🔨 Rebuilding containers from scratch..."

# Build and start containers
docker-compose build --no-cache
docker-compose up -d

echo "✅ Rebuild complete! Check the logs with: docker-compose logs -f"