#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting Balaji Enterprises Development Servers...${NC}\n"

# Function to kill process on a port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo -e "${YELLOW}⚠️  Killing process on port $port (PID: $pid)${NC}"
        kill -9 $pid 2>/dev/null
        sleep 1
    fi
}

# Kill any existing processes on ports 5173 (frontend) and 8000 (backend)
echo -e "${YELLOW}Checking for existing processes...${NC}"
kill_port 5173
kill_port 8000
echo ""

# Check if virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo -e "${RED}❌ Backend virtual environment not found!${NC}"
    echo -e "${YELLOW}Please run: cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}⚠️  Frontend node_modules not found. Installing dependencies...${NC}"
    cd frontend
    npm install
    cd ..
fi

# Function to handle cleanup on script exit
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down servers...${NC}"
    kill_port 5173
    kill_port 8000
    exit 0
}

# Trap Ctrl+C and call cleanup
trap cleanup SIGINT SIGTERM

# Start backend server
echo -e "${GREEN}📦 Starting backend server on port 8000...${NC}"
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Check if backend started successfully
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}❌ Backend server failed to start!${NC}"
    echo -e "${YELLOW}Check backend.log for errors${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend server started (PID: $BACKEND_PID)${NC}\n"

# Start frontend server
echo -e "${GREEN}🎨 Starting frontend server on port 5173...${NC}"
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait a moment for frontend to start
sleep 2

# Check if frontend started successfully
if ! kill -0 $FRONTEND_PID 2>/dev/null; then
    echo -e "${RED}❌ Frontend server failed to start!${NC}"
    echo -e "${YELLOW}Check frontend.log for errors${NC}"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

echo -e "${GREEN}✅ Frontend server started (PID: $FRONTEND_PID)${NC}\n"

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ Both servers are running!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}📱 Frontend: http://localhost:5173${NC}"
echo -e "${GREEN}🔧 Backend:  http://localhost:8000${NC}"
echo -e "${GREEN}📚 API Docs: http://localhost:8000/docs${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# Keep script running and monitor processes
while true; do
    # Check if processes are still running
    if ! kill -0 $BACKEND_PID 2>/dev/null; then
        echo -e "\n${RED}❌ Backend server stopped unexpectedly!${NC}"
        kill $FRONTEND_PID 2>/dev/null
        cleanup
    fi
    if ! kill -0 $FRONTEND_PID 2>/dev/null; then
        echo -e "\n${RED}❌ Frontend server stopped unexpectedly!${NC}"
        kill $BACKEND_PID 2>/dev/null
        cleanup
    fi
    sleep 2
done

