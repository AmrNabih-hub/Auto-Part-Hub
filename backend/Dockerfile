# Use PHP 8.3 FPM Alpine as base image
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    bash \
    curl \
    netcat-openbsd \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    mysql-client \
    sqlite-dev \
    git \
    unzip

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        pdo_sqlite \
        pdo_pgsql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        intl \
        zip

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy composer files first for better caching
COPY composer.json composer.lock ./

# Create basic Laravel directory structure
RUN mkdir -p app bootstrap config database public resources routes storage tests \
    && mkdir -p storage/app storage/framework storage/logs \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views \
    && mkdir -p bootstrap/cache

# Copy essential Laravel files needed for composer scripts
COPY artisan ./
COPY bootstrap/ ./bootstrap/
COPY routes/ ./routes/
COPY config/ ./config/
COPY app/ ./app/
COPY database/ ./database/

# Create a minimal .env file for composer scripts
RUN echo "APP_NAME=Laravel" > .env \
    && echo "APP_ENV=production" >> .env \
    && echo "APP_KEY=" >> .env \
    && echo "APP_DEBUG=false" >> .env \
    && echo "APP_URL=http://localhost" >> .env

# Install PHP dependencies with scripts (now that all files are in place)
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copy the rest of the application (this will overwrite the minimal .env)
COPY . .

# Ensure artisan is executable
RUN chmod +x artisan

# Copy and make entrypoint script executable (file should now be available from COPY . .)
RUN chmod +x docker-entrypoint.sh \
    && cp docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

# Create necessary directories and copy configurations
RUN mkdir -p /etc/supervisor/conf.d \
    && cp nginx.conf /etc/nginx/nginx.conf \
    && cp supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set proper permissions
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage \
    && chmod -R 755 /var/www/bootstrap/cache \
    && chmod -R 775 /var/www/storage

# Create log directories
RUN mkdir -p /var/log/supervisor /var/log/nginx \
    && touch /var/log/nginx/access.log \
    && touch /var/log/nginx/error.log

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/api/health || exit 1

# Set entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]

# Start supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]