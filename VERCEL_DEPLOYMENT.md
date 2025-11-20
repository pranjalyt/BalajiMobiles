# Vercel Deployment Guide

Yes, your project can be hosted on Vercel! Here's how to deploy both the frontend and backend.

## Project Structure

- **Frontend**: React + Vite (✅ Perfect for Vercel)
- **Backend**: FastAPI (✅ Can be deployed on Vercel using serverless functions)

## Option 1: Deploy Frontend Only (Recommended for Start)

If your backend is already hosted elsewhere (or you want to deploy it separately):

### Steps:

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings → Environment Variables
   - Add these variables:
     ```
     VITE_API_URL=https://your-backend-url.com
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     VITE_ADMIN_WHATSAPP=917906829339
     VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
     VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
     ```

5. **Redeploy** after adding environment variables:
   ```bash
   vercel --prod
   ```

## Option 2: Deploy Both Frontend + Backend on Vercel

### Frontend Deployment (Same as above)

### Backend Deployment (FastAPI as Serverless Functions)

1. **Create `vercel.json` in the root directory**:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "backend/app/main.py",
         "use": "@vercel/python"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "backend/app/main.py"
       }
     ]
   }
   ```

2. **Create `api/index.py`** (Vercel serverless function wrapper):
   ```python
   from backend.app.main import app
   
   # Vercel expects the handler
   handler = app
   ```

3. **Update `backend/app/main.py`** to work with Vercel:
   ```python
   from fastapi import FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   from app.routers import phones
   
   app = FastAPI()
   
   # CORS configuration
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],  # In production, specify your frontend URL
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   
   app.include_router(phones.router)
   
   # For Vercel
   @app.get("/")
   async def root():
       return {"message": "Balaji Mobiles API"}
   ```

4. **Set Backend Environment Variables** in Vercel:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-service-key
   ```

5. **Deploy**:
   ```bash
   vercel
   ```

## Option 3: Separate Deployments (Recommended)

**Frontend on Vercel** + **Backend on Railway/Render/Fly.io**

This is often easier because:
- Frontend: Vercel handles React/Vite perfectly
- Backend: Railway/Render/Fly.io are better for long-running FastAPI apps

### Frontend on Vercel:
1. Deploy frontend folder to Vercel
2. Set `VITE_API_URL` to your backend URL

### Backend on Railway/Render:
1. Deploy backend separately
2. Get the backend URL
3. Update frontend's `VITE_API_URL` environment variable

## Current Vercel Configuration

Your `frontend/vercel.json` is already set up correctly for a React SPA:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

This ensures all routes are handled by React Router.

## Environment Variables Checklist

Make sure these are set in Vercel:

**Frontend:**
- `VITE_API_URL` - Your backend API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key
- `VITE_ADMIN_WHATSAPP` - WhatsApp number
- `VITE_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET` - Cloudinary upload preset

**Backend (if deploying on Vercel):**
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase service role key

## Quick Deploy Commands

```bash
# Frontend only
cd frontend
vercel

# With production flag
vercel --prod

# Link to existing project
vercel link
```

## Notes

- ✅ Frontend works perfectly on Vercel
- ✅ Backend can work on Vercel but consider alternatives for better performance
- ✅ Environment variables are automatically injected during build
- ✅ Vercel handles HTTPS, CDN, and auto-deployments from Git

## Recommended Setup

**Best Practice:**
- Frontend: Vercel (free tier is generous)
- Backend: Railway or Render (better for FastAPI, also have free tiers)

This gives you the best of both worlds!

