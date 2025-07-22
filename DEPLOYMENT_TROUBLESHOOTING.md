# Docker Deployment Troubleshooting Guide

## Issue: Composer Install Fails During Docker Build

### Root Causes and Solutions

#### 1. **Missing composer.lock File**
**Problem**: No `composer.lock` file leads to dependency resolution during build
**Solution**: 
```bash
cd backend
composer install --no-scripts
```
This generates the `composer.lock` file needed for reproducible builds.

#### 2. **Composer Scripts Execution**
**Problem**: Laravel's post-autoload scripts try to run during build without proper environment
**Solutions**:
- Use `--no-scripts` flag consistently
- Use `--no-plugins` to avoid plugin issues
- Use multi-stage builds to separate dependency installation

#### 3. **Memory Issues**
**Problem**: Composer runs out of memory during dependency resolution
**Solutions**:
- Set `COMPOSER_MEMORY_LIMIT=-1` in Dockerfile
- Use `--ignore-platform-reqs` for platform compatibility

#### 4. **Platform Compatibility**
**Problem**: Platform-specific dependencies cause issues
**Solutions**:
- Use `--ignore-platform-reqs` during install
- Specify platform in Docker build: `--platform linux/amd64`

### Recommended Dockerfile Improvements

#### Option 1: Fix Current Dockerfile
Replace the problematic RUN command with:
```dockerfile
RUN composer clear-cache && \
    composer validate --no-check-publish && \
    composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts --no-plugins || \
    (echo "Composer install failed, trying with verbose output:" && \
     composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts --no-plugins --verbose)
```

#### Option 2: Use Multi-Stage Build (Recommended)
Use the provided `Dockerfile.optimized` which:
- Separates dependency installation from application setup
- Handles composer issues in isolation
- Provides better caching and smaller final image

### Build Commands

#### Standard Build
```bash
cd backend
docker build -t car-parts-backend .
```

#### Using Optimized Dockerfile
```bash
cd backend
docker build -f Dockerfile.optimized -t car-parts-backend .
```

#### With Platform Specification
```bash
cd backend
docker build --platform linux/amd64 -t car-parts-backend .
```

### Pre-Build Checklist

1. **✅ Ensure composer.lock exists**
   ```bash
   cd backend && composer install --no-scripts
   ```

2. **✅ Validate composer.json**
   ```bash
   cd backend && composer validate --no-check-publish
   ```

3. **✅ Clear composer cache**
   ```bash
   cd backend && composer clear-cache
   ```

4. **✅ Test local install**
   ```bash
   cd backend && composer install --no-dev --no-scripts
   ```

### Common Error Messages and Solutions

#### "process did not complete successfully: exit code: 1"
- **Cause**: Generic composer failure
- **Solution**: Add verbose output and error handling to identify specific issue

#### "Your requirements could not be resolved"
- **Cause**: Dependency conflicts or platform issues
- **Solution**: Use `--ignore-platform-reqs` and ensure composer.lock exists

#### "Package X is not available"
- **Cause**: Network issues or repository problems
- **Solution**: Clear composer cache and retry with `--prefer-dist`

#### "Class not found" errors
- **Cause**: Autoloader not properly generated
- **Solution**: Run `composer dump-autoload --optimize` after install

### Environment Variables for Composer

Add these to your Dockerfile:
```dockerfile
ENV COMPOSER_MEMORY_LIMIT=-1
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_NO_INTERACTION=1
ENV COMPOSER_PREFER_STABLE=1
```

### Docker Build Optimization

1. **Use .dockerignore**: Exclude unnecessary files from build context
2. **Layer caching**: Copy composer files before application code
3. **Multi-stage builds**: Separate build and runtime environments
4. **Minimize layers**: Combine related RUN commands

### Testing the Fix

1. **Run the deployment fix script**:
   ```bash
   cd backend
   chmod +x deploy-fix.sh
   ./deploy-fix.sh
   ```

2. **Build with optimized Dockerfile**:
   ```bash
   docker build -f Dockerfile.optimized -t car-parts-backend .
   ```

3. **Test the container**:
   ```bash
   docker run -p 80:80 car-parts-backend
   ```

### Additional Resources

- [Composer Documentation](https://getcomposer.org/doc/)
- [Docker Multi-stage Builds](https://docs.docker.com/develop/dev-best-practices/dockerfile_best-practices/#use-multi-stage-builds)
- [Laravel Deployment](https://laravel.com/docs/deployment)

### Support

If issues persist:
1. Check Docker logs: `docker logs <container-id>`
2. Run with verbose output: Add `--verbose` to composer commands
3. Test locally first: Ensure composer install works outside Docker
4. Check platform compatibility: Use `--platform linux/amd64` if on ARM