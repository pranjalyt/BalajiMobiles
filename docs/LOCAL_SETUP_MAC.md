# Local Deployment Guide - Mac

Complete guide to run Balaji Mobiles on your Mac for development and testing.

## Prerequisites

Before starting, ensure you have:
- macOS (any recent version)
- Homebrew installed
- Internet connection

## Step 1: Install Required Software

### Install Homebrew (if not already installed)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Install Python 3.9+
```bash
brew install python@3.11
python3 --version  # Verify installation
```

### Install Node.js 18+
```bash
brew install node
node --version  # Verify installation
npm --version   # Verify npm
```

## Step 2: Set Up Supabase (Free Account)

1. **Create Supabase Account:**
   - Go to [supabase.com](https://supabase.com)
   - Sign up with GitHub/Google
   - Create a new project (choose a region close to you)
   - Wait 2-3 minutes for project setup

2. **Run Database Schema:**
   - In Supabase dashboard, go to **SQL Editor**
   - Click **New Query**
   - Copy the contents of `database/schema.sql` from your project
   - Paste and click **Run**
   - You should see "Success" message

3. **Create Admin User:**
   - Go to **Authentication** → **Users**
   - Click **Add user** → **Create new user**
   - Enter email: `admin@balajimobiles.com` (or your email)
   - Enter password: Choose a strong password
   - Click **Create user**
   - **Save these credentials!** You'll need them to login

4. **Get API Credentials:**
   - Go to **Settings** → **API**
   - Copy these three values:
     - **Project URL** (looks like `https://xxxxx.supabase.co`)
     - **anon/public key** (long string starting with `eyJ...`)
   - Go to **Settings** → **API** → **JWT Settings**
     - Copy **JWT Secret** (another long string)

## Step 3: Set Up Cloudinary (Free Account)

1. **Create Account:**
   - Go to [cloudinary.com](https://cloudinary.com)
   - Sign up for free account

2. **Create Upload Preset:**
   - Go to **Settings** (gear icon) → **Upload**
   - Scroll to **Upload presets**
   - Click **Add upload preset**
   - Set **Preset name**: `balaji_phones`
   - Set **Signing Mode**: **Unsigned**
   - Set **Folder**: `phones` (optional)
   - Click **Save**

3. **Get Credentials:**
   - Go to **Dashboard**
   - Copy **Cloud Name** (top of page)
   - Remember your preset name: `balaji_phones`

## Step 4: Set Up Backend

### Navigate to backend directory
```bash
cd ~/Documents/sites/Balaji/backend
```

### Create virtual environment
```bash
python3 -m venv venv
```

### Activate virtual environment
```bash
source venv/bin/activate
```
You should see `(venv)` in your terminal prompt.

### Install dependencies
```bash
pip install -r requirements.txt
```

### Create .env file
```bash
cp .env.example .env
```

### Edit .env file
```bash
nano .env
```

Paste this and replace with your actual values:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

### Start the backend server
```bash
uvicorn app.main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

**Keep this terminal open!** The backend is now running.

### Test the backend
Open a new terminal and run:
```bash
curl http://localhost:8000/
```

You should see:
```json
{"status":"healthy","service":"Balaji Mobiles API","version":"1.0.0"}
```

## Step 5: Set Up Frontend

### Open a NEW terminal window
```bash
cd ~/Documents/sites/Balaji/frontend
```

### Install dependencies
```bash
npm install
```

This will take 2-3 minutes.

### Create .env file
```bash
cp .env.example .env
```

### Edit .env file
```bash
nano .env
```

Paste this and replace with your actual values:
```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=balaji_phones
VITE_ADMIN_WHATSAPP=917906829339
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

### Start the frontend server
```bash
npm run dev
```

You should see:
```
  VITE v5.0.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

The browser should automatically open to `http://localhost:5173`

## Step 6: Test the Application

### Test Public Features

1. **Home Page:**
   - Visit `http://localhost:5173/`
   - You should see the hero section, categories, and featured phones
   - Scroll down to see testimonials

2. **Browse Phones:**
   - Click "Browse All Phones" or go to `http://localhost:5173/phones`
   - You should see sample phones from the database

3. **View Phone Details:**
   - Click on any phone card
   - You should see the detail page with images and specs

4. **Test Cart:**
   - Click "Add to Cart" on any phone
   - Check the cart badge in navbar (should show "1")
   - Go to cart page
   - Try changing quantity
   - Try removing items

5. **Test Checkout:**
   - Add items to cart
   - Click "Proceed to Checkout"
   - Fill in name and phone number
   - Click "Checkout on WhatsApp"
   - WhatsApp should open with pre-filled message

### Test Admin Features

1. **Login to Admin:**
   - Go to `http://localhost:5173/admin`
   - Enter the email and password you created in Supabase
   - Click "Login"

2. **Add a Phone:**
   - Click "Add New Phone"
   - Fill in all details:
     - Name: iPhone 13
     - Brand: iPhone
     - Price: 35000
     - Condition: Like New
     - Storage: 128GB
     - Battery: 92%
     - Description: Excellent condition...
   - Select 1-6 images from your computer
   - Click "Add Phone"
   - Wait for upload (images go to Cloudinary)
   - Phone should appear in the table

3. **Edit a Phone:**
   - Click "Edit" on any phone
   - Change some details
   - Click "Update Phone"

4. **Mark as Sold:**
   - Click "Mark Sold" on any phone
   - Confirm the action
   - Phone should disappear from public listing

## Troubleshooting

### Backend Issues

**Error: "ModuleNotFoundError"**
```bash
# Make sure virtual environment is activated
source venv/bin/activate
# Reinstall dependencies
pip install -r requirements.txt
```

**Error: "Connection refused" or "Database error"**
- Check your Supabase credentials in `.env`
- Verify Supabase project is active
- Make sure you ran the schema SQL

**Error: "Port 8000 already in use"**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9
# Or use a different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**Error: "npm install" fails**
```bash
# Clear npm cache
npm cache clean --force
# Try again
npm install
```

**Error: "VITE_API_URL is not defined"**
- Make sure `.env` file exists in frontend directory
- Restart the dev server after creating `.env`

**Error: "Network Error" when fetching phones**
- Make sure backend is running on port 8000
- Check `VITE_API_URL` in `.env`
- Check browser console for CORS errors

**Error: Images not uploading**
- Verify Cloudinary credentials
- Check upload preset is "Unsigned"
- Check browser console for errors

### Database Issues

**No phones showing up**
- Make sure you ran the schema SQL in Supabase
- Check Supabase dashboard → Table Editor → phones
- The sample data should be there

**Can't login to admin**
- Verify you created a user in Supabase Auth
- Check email/password are correct
- Check browser console for errors

## Stopping the Servers

### Stop Backend
In the backend terminal, press `Ctrl+C`

### Stop Frontend
In the frontend terminal, press `Ctrl+C`

### Deactivate Python Virtual Environment
```bash
deactivate
```

## Restarting Later

### Start Backend
```bash
cd ~/Documents/sites/Balaji/backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Start Frontend (in new terminal)
```bash
cd ~/Documents/sites/Balaji/frontend
npm run dev
```

## Quick Commands Reference

```bash
# Backend
cd ~/Documents/sites/Balaji/backend
source venv/bin/activate
uvicorn app.main:app --reload

# Frontend (new terminal)
cd ~/Documents/sites/Balaji/frontend
npm run dev

# View API docs
open http://localhost:8000/docs

# View app
open http://localhost:5173
```

## Next Steps

Once everything is working locally:
1. Add more phone listings through admin panel
2. Test all features thoroughly
3. Customize the design if needed
4. Follow `docs/DEPLOYMENT.md` to deploy to production

## Getting Help

If you encounter issues:
1. Check the error message in terminal
2. Check browser console (F12 → Console)
3. Verify all environment variables are set correctly
4. Make sure both backend and frontend are running
5. Check Supabase dashboard for database issues

---

**You're all set!** 🎉

Your Balaji Mobiles platform should now be running locally at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs
