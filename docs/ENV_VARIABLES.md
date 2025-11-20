# Environment Variables

This document lists all required environment variables for both backend and frontend.

## Backend (.env)

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
SUPABASE_JWT_SECRET=your_supabase_jwt_secret_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### How to Get Supabase Credentials:

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_KEY`
5. Go to **Settings** → **API** → **JWT Settings**
   - Copy **JWT Secret** → `SUPABASE_JWT_SECRET`

---

## Frontend (.env)

Create a `.env` file in the `frontend/` directory with the following variables:

```env
# Backend API URL
VITE_API_URL=http://localhost:8000

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset

# Admin WhatsApp Number (with country code, no spaces)
VITE_ADMIN_WHATSAPP=917906829339
```

### How to Get Cloudinary Credentials:

1. Go to [cloudinary.com](https://cloudinary.com) and create a free account
2. Go to **Dashboard**
3. Copy **Cloud Name** → `VITE_CLOUDINARY_CLOUD_NAME`
4. Go to **Settings** → **Upload** → **Upload presets**
5. Click **Add upload preset**
6. Set **Signing Mode** to **Unsigned**
7. Copy the preset name → `VITE_CLOUDINARY_UPLOAD_PRESET`

---

## Production Environment Variables

### Vercel (Frontend)

Add these in your Vercel project settings:

```
VITE_API_URL=https://your-backend.onrender.com
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
VITE_ADMIN_WHATSAPP=917906829339
```

### Render (Backend)

Add these in your Render web service settings:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-app.vercel.app
```

---

## Security Notes

- **Never commit `.env` files to Git**
- The `.env.example` files are safe to commit (they contain no real credentials)
- Keep your JWT secret secure - it's used to verify admin authentication
- The Supabase anon key is safe to expose in frontend code (it's public)
- Use environment-specific URLs (localhost for dev, production URLs for prod)
