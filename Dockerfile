# 1. Imagen base con PHP y extensiones requeridas
FROM php:8.2-fpm AS base

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y \
       git zip unzip libzip-dev libpng-dev libonig-dev curl libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring zip exif pcntl \
    && rm -rf /var/lib/apt/lists/*

# 2. Dependencias de PHP usando imagen oficial de Composer
FROM composer:2.5 AS dependencies

WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --optimize-autoloader --no-scripts

# 3. Etapa de frontend con Node 18 (soporte Web Crypto)
FROM node:18 AS frontend

WORKDIR /var/www/html
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# 4. Imagen de producción con Nginx + Supervisor
FROM base AS production

WORKDIR /var/www/html

# Instalar Nginx y Supervisor
RUN apt-get update \
    && apt-get install -y nginx supervisor \
    && rm -rf /var/lib/apt/lists/*

# Copiar configuración de Nginx y Supervisor desde tu carpeta docker/
COPY docker/nginx.conf /etc/nginx/sites-available/default
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copiar dependencias y código
COPY --from=dependencies /var/www/html/vendor ./vendor
COPY --from=frontend     /var/www/html/public ./public
COPY --from=frontend     /var/www/html/resources/js ./resources/js
COPY --from=frontend     /var/www/html/resources/css ./resources/css
COPY . .

# Optimizar Laravel
RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache \
    && composer dump-autoload --optimize
    
# Ajustar permisos
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 755 storage bootstrap/cache

# Exponer puerto HTTP
EXPOSE 80

# Arrancar ambos procesos (Nginx + PHP-FPM) con Supervisor
# CMD ["/usr/bin/supervisord", "-n"]
CMD ["sh", "-c", "php artisan migrate --force && php artisan db:seed --force && /usr/bin/supervisord -n"]

