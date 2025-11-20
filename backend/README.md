# Balaji Mobiles Backend

FastAPI backend for Balaji Mobiles used mobile buy/sell platform.

## Features

- RESTful API for phone listings
- Supabase database integration
- JWT authentication for admin routes
- CORS enabled for frontend
- Automatic API documentation

## Setup

1. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Mac/Linux
# or
venv\Scripts\activate  # On Windows
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Configure environment variables:**
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

4. **Run the server:**
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

### Public Endpoints
- `GET /` - Health check
- `GET /phones` - Get all available phones
- `GET /phones/{id}` - Get phone by ID

### Admin Endpoints (Require Authentication)
- `POST /phones` - Create new phone
- `PUT /phones/{id}` - Update phone
- `DELETE /phones/{id}` - Mark phone as sold

## Deployment

### Render (Free Tier)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Configure:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables in Render dashboard
5. Deploy!

## Environment Variables

See `.env.example` for required variables.
