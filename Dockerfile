## Multi-stage Dockerfile para Laravel + Inertia.js + React

# 1. Imagen base con PHP y extensiones requeridas
FROM php:8.1-fpm AS base

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y \
       git \
       zip \
       unzip \
       libzip-dev \
       libpng-dev \
       libonig-dev \
       curl \
       libpq-dev \
    && docker-php-ext-install \
       pdo \
       pdo_mysql \
       mbstring \
       zip \
       exif \
       pcntl \
    && rm -rf /var/lib/apt/lists/*

# 2. Etapa de dependencias usando la imagen oficial de Composer
FROM composer:2.5 AS dependencies

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 3. Etapa de frontend con Node 18 (soporte nativo de Web Crypto)
FROM node:18 AS frontend

WORKDIR /var/www/html

# Instalar dependencias de JS
COPY package.json package-lock.json ./
RUN npm ci

# Copiar código y compilar assets
COPY . .
RUN npm run build

# 4. Imagen final de producción
FROM base AS production

WORKDIR /var/www/html

# Copiar dependencias de PHP
COPY --from=dependencies /var/www/html/vendor ./vendor

# Copiar activos compilados
COPY --from=frontend /var/www/html/public ./public
COPY --from=frontend /var/www/html/resources/js ./resources/js
COPY --from=frontend /var/www/html/resources/css ./resources/css

# Copiar el resto de la aplicación
COPY . .

# Ajustar permisos de almacenamiento y caches
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 755 storage bootstrap/cache

# Exponer puerto de PHP-FPM
EXPOSE 9000

# Arrancar PHP-FPM
CMD ["php-fpm"]
