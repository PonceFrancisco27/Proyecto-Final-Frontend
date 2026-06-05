# Realtime Spotify Clone

Proyecto migrado a **Tailwind CSS v4** con Vite v6.

## Cambios realizados (v3 → v4)

- ✅ `tailwindcss` actualizado a v4
- ✅ Añadido `@tailwindcss/vite` como plugin de Vite
- ✅ Eliminado `postcss.config.js` (ya no necesario)
- ✅ Eliminado `tailwind.config.js` (configuración movida a `index.css` con `@theme`)
- ✅ `vite.config.ts` actualizado con el plugin de Tailwind v4
- ✅ `index.css` migrado: `@tailwind base/components/utilities` → `@import "tailwindcss"`
- ✅ Colores y variables del tema migrados a `@theme {}`
- ✅ Vite actualizado a v6

## Requisitos previos

- Node.js 18+
- MongoDB Atlas o MongoDB local
- Cuenta en Clerk (autenticación)
- Cuenta en Cloudinary (imágenes/audio)

## Configuración

### Backend

```bash
cd backend
cp .env.sample .env
# Edita .env con tus credenciales
npm install
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.sample .env
# Edita .env con tu Clerk Publishable Key
npm install
npm run dev
```

## Variables de entorno

### Backend `.env`
```
PORT=5000
MONGODB_URI=tu_mongodb_uri
ADMIN_EMAIL=tu_email
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
```

### Frontend `.env`
```
VITE_CLERK_PUBLISHABLE_KEY=tu_clerk_key
```
