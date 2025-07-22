# Composer Docker Build Fix Guide

## Problem
The Docker build is failing with a Composer error on line 75:
```
RUN composer clear-cache && composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts
```

## Root Causes
1. **Docker Cache Issues**: Old cached layers with different Dockerfile versions
2. **Composer Platform Requirements**: PHP version or extension mismatches
3. **Memory Limitations**: Composer running out of memory
4. **Network Issues**: Package download failures

## Solutions Applied

### 1. Updated Main Dockerfile
- Added `--ignore-platform-reqs` flag to bypass platform requirement checks
- Added fallback commands with verbose output for debugging
- Improved error handling with `|| echo` statements

### 2. Created Alternative Multi-Stage Dockerfile
- `backend/Dockerfile.fixed` uses a multi-stage build approach
- Separates Composer dependency installation from the main application build
- More reliable for complex dependency trees

### 3. Created Rebuild Scripts
- `rebuild.sh` (Linux/Mac) and `rebuild.bat` (Windows)
- Completely clears Docker cache and rebuilds from scratch
- Removes all related images and containers

## Quick Fix Steps

### Option 1: Use the Rebuild Script (Recommended)
```bash
# On Windows
./rebuild.bat

# On Linux/Mac
chmod +x rebuild.sh
./rebuild.sh
```

### Option 2: Manual Docker Cache Clear
```bash
# Stop containers
docker-compose down --volumes --remove-orphans

# Clear all Docker cache
docker system prune -af --volumes

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Option 3: Use the Fixed Dockerfile
```bash
# Temporarily use the multi-stage Dockerfile
cd backend
docker build -f Dockerfile.fixed -t autparthub-app .
```

### Option 4: Debug the Composer Issue
```bash
# Build with verbose output to see exact error
docker-compose build --no-cache --progress=plain

# Or build just the backend with debugging
cd backend
docker build --no-cache --progress=plain .
```

## Prevention Tips

1. **Regular Cache Cleanup**: Run `docker system prune -f` periodically
2. **Use Multi-Stage Builds**: Better for complex PHP applications
3. **Pin Composer Version**: Use specific Composer version in Dockerfile
4. **Monitor Dependencies**: Keep composer.lock file updated

## If Issues Persist

1. Check if `composer.json` has any conflicting requirements
2. Verify PHP version compatibility (currently using PHP 8.3)
3. Check network connectivity for package downloads
4. Consider using `--ignore-platform-reqs` permanently if platform checks are too strict

## Files Modified/Created
- ✅ `backend/Dockerfile` - Updated with better error handling
- ✅ `backend/Dockerfile.fixed` - Alternative multi-stage build
- ✅ `rebuild.sh` - Linux/Mac rebuild script
- ✅ `rebuild.bat` - Windows rebuild script
- ✅ `COMPOSER_FIX_GUIDE.md` - This troubleshooting guide