#!/bin/bash
set -e
# Build and deploy the production stack
cp .env.production backend/.env
cp backend/nginx.conf backend/nginx.prod.conf

docker compose -f docker-compose.prod.yml build

docker compose -f docker-compose.prod.yml up -d

echo "Deployment complete." 