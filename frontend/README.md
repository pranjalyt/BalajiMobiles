# Balaji Enterprises Frontend

React + Vite frontend for Balaji Enterprises used mobile buy/sell platform.

## Features

- 🏠 Beautiful landing page with hero section
- 📱 Phone listing with filters and sorting
- 🛒 Shopping cart with localStorage
- 💬 WhatsApp checkout integration
- 🔐 Admin dashboard with authentication
- 📸 Cloudinary image upload
- 🎨 Tailwind CSS styling
- ✨ AOS scroll animations
- 📱 Fully responsive design

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)
- Supabase account and project
- Cloudinary account

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Run development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build locally
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── PhoneCard.jsx
│   ├── CategoryCard.jsx
│   ├── TestimonialCarousel.jsx
│   └── FloatingWhatsApp.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Listing.jsx
│   ├── PhoneDetail.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   └── Admin.jsx
├── services/           # API and external services
│   ├── api.js         # Backend API client
│   └── supabase.js    # Supabase client
├── utils/             # Utility functions
│   ├── cartUtils.js   # Cart management
│   ├── whatsappUtils.js  # WhatsApp integration
│   └── cloudinaryUtils.js # Image upload
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Environment Variables

See `docs/ENV_VARIABLES.md` for detailed setup instructions.

Required variables:
- `VITE_API_URL` - Backend API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anon key
- `VITE_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `VITE_CLOUDINARY_UPLOAD_PRESET` - Cloudinary upload preset
- `VITE_ADMIN_WHATSAPP` - Admin WhatsApp number

## Deployment

See `docs/DEPLOYMENT.md` for complete deployment guide.

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Features Guide

### Cart System
- Uses localStorage for persistence
- Supports quantity management
- Automatic total calculation
- Cart badge in navbar

### WhatsApp Checkout
- Pre-fills message with order details
- Includes customer name and phone
- Opens WhatsApp web/app automatically

### Admin Dashboard
- Supabase authentication
- Add/edit/delete phones
- Upload images to Cloudinary
- Mark phones as sold
- View all phones (including sold)

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Supabase** - Authentication
- **AOS** - Scroll animations
- **Cloudinary** - Image hosting

## License

MIT
