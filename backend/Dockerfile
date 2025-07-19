# Build Stage
FROM composer:2.7 AS build

WORKDIR /var/www

COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-scripts

COPY . .

# Production Stage
FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    nginx \
    supervisor \
    bash \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    mysql-client \
    sqlite-dev

RUN docker-php-ext-install pdo pdo_mysql pdo_sqlite pdo_pgsql mbstring exif pcntl bcmath gd intl zip

WORKDIR /var/www
COPY --from=build /var/www /var/www
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

RUN chown -R www-data:www-data /var/www

EXPOSE 9000
CMD ["php-fpm"] 