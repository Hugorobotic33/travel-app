## Multi-stage Dockerfile for Laravel + Inertia.js + React

# 1. Base image with PHP and necessary extensions
FROM php:8.1-fpm AS base

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    curl \
    libpq-dev \
 && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# 2. Composer dependencies stage
FROM base AS dependencies

# Copy composer files and install production dependencies
COPY composer.json composer.lock ./
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
 && composer install --no-dev --optimize-autoloader --no-scripts

# 3. Node.js stage for frontend build
FROM node:16 AS frontend

WORKDIR /var/www/html
# Install Node dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app and build assets
COPY . .
RUN npm run build

# 4. Final production image
FROM base AS production

WORKDIR /var/www/html

# Copy over PHP dependencies
COPY --from=dependencies /var/www/html/vendor ./vendor

# Copy built frontend assets
COPY --from=frontend /var/www/html/public ./public
COPY --from=frontend /var/www/html/resources/js ./resources/js
COPY --from=frontend /var/www/html/resources/css ./resources/css

# Copy application source
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html/storage

# Expose PHP-FPM port
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]
