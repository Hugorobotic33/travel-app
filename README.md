# Travel App

Este proyecto es una aplicación de experiencias de viaje construida con Laravel, React, Inertia.js y Material UI.

## Requisitos
- PHP >= 8.1
- Composer
- Node.js >= 18
- NPM o Yarn
- MySQL o PostgreSQL

## Instalación

1. **Clona el repositorio:**
   ```sh
   git clone <url-del-repo> travel-app
   cd travel-app
   ```

2. **Instala dependencias de PHP:**
   ```sh
   composer install
   ```

3. **Instala dependencias de JavaScript:**
   ```sh
   npm install
   # o
   yarn install
   ```

4. **Copia el archivo de entorno y configura tus variables:**
   ```sh
   cp .env.example .env
   # Edita .env con tus credenciales de base de datos y correo
   ```

5. **Genera la clave de la aplicación:**
   ```sh
   php artisan key:generate
   ```

6. **Ejecuta las migraciones y seeders:**
   ```sh
   php artisan migrate --seed
   ```

7. **Compila los assets:**
   ```sh
   npm run dev
   # o para producción
   npm run build
   ```

8. **Inicia el servidor de desarrollo:**
   ```sh
   php artisan serve
   ```

9. **Accede a la app:**
   Abre [http://localhost:8000](http://localhost:8000) en tu navegador.

## Funcionalidades principales
- Registro e inicio de sesión de usuarios
- Listado y detalle de experiencias
- Filtros por fecha y cantidad de personas
- Reservación de experiencias (requiere login)
- Listado de reservaciones del usuario
- Panel de administración básico (opcional)

## Notas
- Puedes modificar los seeders para agregar más experiencias o actividades.
- El frontend usa React + Inertia.js + Material UI.

---

