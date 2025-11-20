#!/bin/bash

# Balaji Enterprises - Quick Setup Script for Mac
# This script sets up your .env files and starts the application

echo "🚀 Setting up Balaji Enterprises..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get JWT Secret
echo "${YELLOW}⚠️  IMPORTANT: I need your Supabase JWT Secret${NC}"
echo "To get it:"
echo "1. Go to https://supabase.com/dashboard/project/hqqdbkossxixgvkvlapp/settings/api"
echo "2. Scroll down to 'JWT Settings'"
echo "3. Copy the 'JWT Secret' (long string)"
echo ""
read -p "Paste your JWT Secret here: " JWT_SECRET
echo ""

# Create backend .env
echo "${BLUE}📝 Creating backend .env file...${NC}"
cat > backend/.env << EOF
# Supabase Configuration
SUPABASE_URL=https://hqqdbkossxixgvkvlapp.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcWRia29zc3hpeGd2a3ZsYXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjA1OTQsImV4cCI6MjA3OTE5NjU5NH0.aozBL7ap9LBtYohnhb2oKHDFm90gofGKz5hjxPwBvyM
SUPABASE_JWT_SECRET=$JWT_SECRET

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
EOF

# Create frontend .env
echo "${BLUE}📝 Creating frontend .env file...${NC}"
cat > frontend/.env << EOF
# Backend API URL
VITE_API_URL=http://localhost:8000

# Supabase Configuration
VITE_SUPABASE_URL=https://hqqdbkossxixgvkvlapp.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcWRia29zc3hpeGd2a3ZsYXBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjA1OTQsImV4cCI6MjA3OTE5NjU5NH0.aozBL7ap9LBtYohnhb2oKHDFm90gofGKz5hjxPwBvyM

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=ds3duvuzh
VITE_CLOUDINARY_UPLOAD_PRESET=phones_unsigned

# Admin WhatsApp Number (with country code, no spaces)
VITE_ADMIN_WHATSAPP=917906829339
EOF

echo "${GREEN}✅ Environment files created!${NC}"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "${YELLOW}⚠️  Python 3 not found. Installing...${NC}"
    brew install python@3.11
fi

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "${YELLOW}⚠️  Node.js not found. Installing...${NC}"
    brew install node
fi

echo "${BLUE}📦 Setting up backend...${NC}"
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

# Activate virtual environment and install dependencies
source venv/bin/activate
pip install -q -r requirements.txt

echo "${GREEN}✅ Backend ready!${NC}"
echo ""

cd ..

echo "${BLUE}📦 Setting up frontend...${NC}"
cd frontend

# Install npm dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "${GREEN}✅ Frontend ready!${NC}"
echo ""

cd ..

echo "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "${BLUE}To start the application:${NC}"
echo ""
echo "1️⃣  Start Backend (in this terminal):"
echo "   ${YELLOW}cd backend && source venv/bin/activate && uvicorn app.main:app --reload${NC}"
echo ""
echo "2️⃣  Start Frontend (in a NEW terminal):"
echo "   ${YELLOW}cd frontend && npm run dev${NC}"
echo ""
echo "3️⃣  Open in browser:"
echo "   ${YELLOW}http://localhost:5173${NC}"
echo ""
