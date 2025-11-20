# Deployment Guide

Complete guide to deploying Balaji Mobiles to production.

## Prerequisites

Before deploying, ensure you have:
- [ ] Supabase account and project created
- [ ] Cloudinary account and unsigned upload preset configured
- [ ] GitHub repository (for Vercel deployment)
- [ ] Render account (for backend)
- [ ] Vercel account (for frontend)

---

## Step 1: Set Up Supabase Database

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Wait for project to be ready

2. **Run Database Schema:**
   - Go to **SQL Editor** in Supabase dashboard
   - Copy contents of `database/schema.sql`
   - Paste and run the SQL
   - Verify the `phones` table was created

3. **Create Admin User:**
   - Go to **Authentication** → **Users**
   - Click **Add user**
   - Enter email and password for admin access
   - Save credentials securely

4. **Get API Credentials:**
   - Go to **Settings** → **API**
   - Copy **Project URL**, **anon key**, and **JWT Secret**
   - You'll need these for environment variables

---

## Step 2: Set Up Cloudinary

1. **Create Account:**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free account

2. **Create Upload Preset:**
   - Go to **Settings** → **Upload**
   - Click **Add upload preset**
   - Name it (e.g., "balaji_mobiles")
   - Set **Signing Mode** to **Unsigned**
   - Set **Folder** to "phones" (optional)
   - Save preset

3. **Get Credentials:**
   - Go to **Dashboard**
   - Copy **Cloud Name** and your **Upload Preset** name

---

## Step 3: Deploy Backend to Render

1. **Push Code to GitHub:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create Render Web Service:**
   - Go to [render.com](https://render.com)
   - Click **New** → **Web Service**
   - Connect your GitHub repository
   - Select the `backend` directory

3. **Configure Service:**
   - **Name:** balaji-mobiles-api
   - **Environment:** Python 3
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan:** Free

4. **Add Environment Variables:**
   Go to **Environment** tab and add:
   ```
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your_supabase_anon_key
   SUPABASE_JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://your-app.vercel.app
   ```

5. **Deploy:**
   - Click **Create Web Service**
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://balaji-mobiles-api.onrender.com`)

---

## Step 4: Deploy Frontend to Vercel

1. **Push Code to GitHub:**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial frontend commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Select the `frontend` directory

3. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variables:**
   Go to **Settings** → **Environment Variables** and add:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   VITE_ADMIN_WHATSAPP=917906829339
   ```

5. **Deploy:**
   - Click **Deploy**
   - Wait for deployment to complete
   - Your app will be live at `https://your-app.vercel.app`

---

## Step 5: Update CORS Settings

1. **Update Backend CORS:**
   - Go to Render dashboard
   - Update `FRONTEND_URL` environment variable with your Vercel URL
   - Redeploy the service

2. **Test Connection:**
   - Visit your Vercel URL
   - Check browser console for any CORS errors
   - Verify API calls are working

---

## Step 6: Test the Application

1. **Test Public Features:**
   - [ ] Home page loads correctly
   - [ ] Can browse phones
   - [ ] Can view phone details
   - [ ] Can add to cart
   - [ ] Cart persists on refresh
   - [ ] WhatsApp checkout works

2. **Test Admin Features:**
   - [ ] Can login at `/admin`
   - [ ] Can add new phone with images
   - [ ] Images upload to Cloudinary
   - [ ] Can edit phone details
   - [ ] Can mark phone as sold
   - [ ] Sold phones don't appear in public listing

---

## Step 7: Add Sample Data (Optional)

If you want to add sample phones:

1. Login to admin panel
2. Add 5-10 sample phones with:
   - Real-looking names (iPhone 12, Samsung S21, etc.)
   - Realistic prices
   - Good descriptions
   - Multiple images (use placeholder images or generate with AI)

---

## Troubleshooting

### Backend Issues

**Problem:** Backend not starting
- Check Render logs for errors
- Verify all environment variables are set
- Ensure `requirements.txt` has all dependencies

**Problem:** Database connection fails
- Verify Supabase credentials
- Check if Supabase project is active
- Ensure database schema was run

### Frontend Issues

**Problem:** API calls failing
- Check if backend URL is correct in `VITE_API_URL`
- Verify CORS is configured correctly
- Check browser console for errors

**Problem:** Images not uploading
- Verify Cloudinary credentials
- Check if upload preset is set to "Unsigned"
- Check browser console for upload errors

### Authentication Issues

**Problem:** Can't login to admin
- Verify admin user exists in Supabase Auth
- Check JWT secret is correct
- Ensure email/password are correct

---

## Monitoring

### Render (Backend)
- Check logs: Dashboard → Logs
- Monitor usage: Dashboard → Metrics
- Free tier: 750 hours/month

### Vercel (Frontend)
- Check deployments: Dashboard → Deployments
- Monitor analytics: Dashboard → Analytics
- Free tier: Unlimited bandwidth

### Supabase (Database)
- Check usage: Dashboard → Settings → Usage
- Free tier: 500MB database, 2GB bandwidth

---

## Updating the Application

### Backend Updates
```bash
git add .
git commit -m "Update message"
git push
```
Render will auto-deploy on push.

### Frontend Updates
```bash
git add .
git commit -m "Update message"
git push
```
Vercel will auto-deploy on push.

---

## Custom Domain (Optional)

### Vercel
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed

### Render
1. Go to **Settings** → **Custom Domain**
2. Add your domain
3. Update DNS records as instructed

---

## Backup Strategy

1. **Database:** Supabase provides automatic backups
2. **Images:** Cloudinary stores all uploaded images
3. **Code:** Stored in GitHub repository

---

## Cost Estimate

All services have generous free tiers:

- **Supabase:** Free (500MB DB, 2GB bandwidth)
- **Cloudinary:** Free (25 credits/month, ~25GB storage)
- **Render:** Free (750 hours/month)
- **Vercel:** Free (unlimited bandwidth)

**Total Monthly Cost: ₹0** (on free tiers)
