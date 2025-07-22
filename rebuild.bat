@echo off
echo 🧹 Cleaning up Docker cache and containers...

REM Stop and remove all containers
docker-compose down --volumes --remove-orphans

REM Remove all unused containers, networks, images, and build cache
docker system prune -af --volumes

REM Remove specific images if they exist
docker rmi autparthub-app 2>nul || echo autparthub-app image not found
docker rmi car-parts-project-backend 2>nul || echo backend image not found
docker rmi car-parts-project-frontend 2>nul || echo frontend image not found

echo 🔨 Rebuilding containers from scratch...

REM Build and start containers
docker-compose build --no-cache
docker-compose up -d

echo ✅ Rebuild complete! Check the logs with: docker-compose logs -f
pause