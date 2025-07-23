# Auto-Part-Hub

A modern React web app marketplace for car parts.

## 🚫 Important: No Docker

**This project does NOT use Docker.** If you encounter Docker-related errors during deployment:

1. **Use nixpacks** (see `nixpacks.toml`)
2. **Use native Node.js + PHP deployment**
3. **DO NOT auto-generate Dockerfiles**

## Deployment

### Railway
- Uses `nixpacks` builder (configured in `railway.toml`)
- Automatically detects Node.js and PHP

### Vercel
- Uses `buildCommand: npm run build` (configured in `vercel.json`)
- Deploys static frontend

### Other Platforms
- Use native Node.js runtime
- Run `npm run build` for frontend
- Use PHP 8.2+ for backend

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Backend setup
cd backend
composer install
php artisan serve
```

## Files that prevent Docker usage

- `NO_DOCKER` - Explicit indicator
- `.dockerignore` - Blocks Docker builds
- `nixpacks.toml` - Alternative build configuration
- `railway.toml` - Railway-specific non-Docker config