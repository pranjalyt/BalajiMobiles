#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🛑 Stopping all development servers...${NC}\n"

# Function to kill process on a port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        echo -e "${GREEN}✅ Stopped process on port $port (PID: $pid)${NC}"
        kill -9 $pid 2>/dev/null
    else
        echo -e "${YELLOW}ℹ️  No process found on port $port${NC}"
    fi
}

# Kill processes on ports 5173 (frontend) and 8000 (backend)
kill_port 5173
kill_port 8000

echo -e "\n${GREEN}✨ All servers stopped!${NC}"

