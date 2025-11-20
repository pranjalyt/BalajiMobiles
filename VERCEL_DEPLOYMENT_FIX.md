# Vercel Deployment Fix - Frontend → Backend Routing

This guide fixes the 404 NOT_FOUND errors when deploying the frontend on Vercel and connecting to a HuggingFace Space backend.

## ✅ What Was Fixed

1. **Backend CORS Configuration**: Fixed invalid wildcard pattern `"https://*.vercel.app"` (FastAPI doesn't support wildcards). Now uses dynamic origin list from environment variables.

2. **Frontend API Fallback**: Updated fallback port from `8000` to `7860` to match HuggingFace Space port.

3. **Backend Multi-Origin Support**: Backend now reads multiple frontend URLs from environment variables to support:
   - Production Vercel domain
   - Preview deployments
   - Local development

## 🔧 Required Environment Variables

### Frontend (Vercel Dashboard)

Go to **Project → Settings → Environment Variables** and add:

| Variable | Value | Environments |
|----------|-------|--------------|
| `VITE_API_URL` | `https://<your-huggingface-space>.hf.space` | Production, Preview, Development |
| `VITE_SUPABASE_URL` | Your Supabase project URL | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key | Production, Preview, Development |
| `VITE_ADMIN_WHATSAPP` | `917906829339` | Production, Preview, Development |
| `VITE_CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | Production, Preview, Development |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Your Cloudinary upload preset | Production, Preview, Development |

**Important**: 
- Replace `<your-huggingface-space>` with your actual HuggingFace Space name
- Add `VITE_API_URL` for **all environments** (Production, Preview, Development)
- After adding variables, **trigger a new deployment**

### Backend (HuggingFace Space Secrets)

Go to your HuggingFace Space → **Settings → Secrets** and ensure:

| Variable | Description |
|----------|-------------|
| `FRONTEND_URL` | Your production Vercel domain (e.g., `https://your-app.vercel.app`) |
| `ADDITIONAL_FRONTEND_URLS` | (Optional) Comma-separated list of additional domains:<br>`https://your-app-git-main.vercel.app,https://your-app-abc123.vercel.app` |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Your Supabase service role key |
| `SUPABASE_JWT_SECRET` | Your Supabase JWT secret |

**Note**: The backend automatically includes:
- `FRONTEND_URL`
- `http://localhost:5173` (dev)
- `http://localhost:3000` (dev)
- Any URLs in `ADDITIONAL_FRONTEND_URLS`
- `VERCEL_URL` if set (Vercel automatically sets this)

## 📋 Deployment Checklist

### Step 1: Verify Backend is Live

1. Open your HuggingFace Space URL: `https://<space>.hf.space`
2. Check `/docs` endpoint: `https://<space>.hf.space/docs`
3. Verify `/health` endpoint: `https://<space>.hf.space/health`
4. If unreachable, check HuggingFace Space logs

### Step 2: Set Frontend Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `VITE_API_URL` with your HuggingFace Space URL
3. Add all other required `VITE_*` variables
4. **Select all environments** (Production, Preview, Development)
5. Save

### Step 3: Set Backend Environment Variables

1. Go to HuggingFace Space → Settings → Secrets
2. Set `FRONTEND_URL` to your Vercel production domain
3. (Optional) Set `ADDITIONAL_FRONTEND_URLS` for preview deployments
4. Ensure all Supabase secrets are set

### Step 4: Redeploy

**Frontend (Vercel)**:
```bash
# Option 1: Via Vercel Dashboard
# Go to Deployments → Click "Redeploy" on latest deployment

# Option 2: Via CLI
cd frontend
vercel --prod
```

**Backend (HuggingFace)**:
- Push changes to your repository (HuggingFace auto-deploys)
- Or manually trigger rebuild in HuggingFace Space settings

### Step 5: Verify Deployment

1. **Frontend**: Open your Vercel domain
2. **Backend**: Open `https://<space>.hf.space/docs`
3. **Test API Call**: 
   - Open browser DevTools → Network tab
   - Navigate to homepage or browse phones page
   - Check that API calls go to `https://<space>.hf.space/phones` (not relative paths)
   - Verify responses return 200 OK (not 404)

## 🔍 Troubleshooting

### Issue: Still getting 404 on API calls

**Check 1**: Verify environment variable is set
- Open Vercel Dashboard → Deployments → Latest → Build Logs
- Check that `VITE_API_URL` is present in build
- If missing, add it and redeploy

**Check 2**: Verify API calls use correct URL
- Open DevTools → Network tab
- Look for failed requests
- If URL is `https://your-frontend/phones` (relative), env var not being used
- If URL is `https://<space>.hf.space/phones` but returns 404, check backend logs

**Check 3**: Check CORS errors
- If you see CORS errors in console, verify:
  - `FRONTEND_URL` in HuggingFace matches your Vercel domain exactly
  - `ADDITIONAL_FRONTEND_URLS` includes preview deployment URLs
  - Backend logs show allowed origins

### Issue: CORS errors

1. Verify `FRONTEND_URL` in HuggingFace matches your Vercel domain
2. For preview deployments, add them to `ADDITIONAL_FRONTEND_URLS`:
   ```
   https://your-app-git-main.vercel.app,https://your-app-abc123.vercel.app
   ```
3. Check backend logs for CORS-related errors
4. Verify backend `/health` endpoint returns correct CORS headers

### Issue: Backend not reachable

1. Check HuggingFace Space status (should be "Running")
2. Check HuggingFace Space logs for errors
3. Verify `/docs` endpoint is accessible
4. Check that port 7860 is exposed (configured in `space.yaml`)

## 📝 Example Configuration

### Vercel Environment Variables
```
VITE_API_URL=https://balaji-enterprises-backend.hf.space
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_WHATSAPP=917906829339
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-preset
```

### HuggingFace Space Secrets
```
FRONTEND_URL=https://balaji-enterprises.vercel.app
ADDITIONAL_FRONTEND_URLS=https://balaji-enterprises-git-main.vercel.app
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
```

## ✅ Verification Steps

After deployment, verify:

1. ✅ Frontend loads without errors
2. ✅ Backend `/docs` is accessible
3. ✅ API calls in Network tab show correct backend URL
4. ✅ `/phones` endpoint returns data (not 404)
5. ✅ No CORS errors in console
6. ✅ Phone listings load on homepage
7. ✅ Browse phones page works

## 📚 Additional Notes

- **Vite Environment Variables**: Must use `VITE_` prefix to be exposed to client
- **CORS Wildcards**: FastAPI doesn't support `*.vercel.app` wildcards, so we use explicit origin lists
- **Preview Deployments**: Each Vercel preview gets a unique URL - add them to `ADDITIONAL_FRONTEND_URLS` if needed
- **Local Development**: Fallback to `localhost:7860` for local dev (matches HuggingFace port)

## 🚀 Quick Deploy Commands

```bash
# Frontend (from frontend directory)
vercel --prod

# Check backend health
curl https://<space>.hf.space/health

# Check backend docs
open https://<space>.hf.space/docs
```

