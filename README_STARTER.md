# 🚀 Quick Start Guide

## Starting the Development Servers

### Option 1: Using the Starter Script (Recommended)

Simply run from the project root:

```bash
./start.sh
```

This will:
- ✅ Kill any existing processes on ports 5173 and 8000
- ✅ Start the backend server on port 8000
- ✅ Start the frontend server on port 5173
- ✅ Show you the URLs to access both servers
- ✅ Handle cleanup when you press Ctrl+C

### Option 2: Manual Start

If you prefer to start servers manually:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Stopping the Servers

### Using the Stop Script:
```bash
./stop.sh
```

### Manual Stop:
- Press `Ctrl+C` in each terminal
- Or use: `lsof -ti:5173 -ti:8000 | xargs kill -9`

## Access URLs

Once started, you can access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```bash
./stop.sh
```

### Backend Virtual Environment Not Found
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Dependencies Not Found
```bash
cd frontend
npm install
```

### Logs
Check the log files if something goes wrong:
- `backend.log` - Backend server logs
- `frontend.log` - Frontend server logs


How to use
Start both servers:

./start.sh

Stop all servers:

./stop.sh

Or press Ctrl+C when running start.sh
