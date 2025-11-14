#!/bin/bash

# AgroGuard Quick Start Script for macOS/Linux
# This script starts both the backend and frontend

echo ""
echo "========================================"
echo "  AgroGuard - Quick Start Script"
echo "========================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python3 is not installed"
    echo "Please install Python 3.8+ using:"
    echo "  brew install python3  (macOS)"
    echo "  apt-get install python3  (Linux)"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed"
    echo "Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

echo "[OK] Python found:"
python3 --version

echo "[OK] Node.js found:"
node --version

echo ""
echo "Starting AgroGuard..."
echo ""

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install/upgrade pip
echo "Installing dependencies (first time only)..."
pip install --upgrade pip > /dev/null 2>&1
pip install -r requirements.txt > /dev/null 2>&1

# Start backend
echo "Launching Backend Server..."
python server.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Navigate to client and start frontend
cd client

echo "Installing frontend dependencies (first time only)..."
npm install > /dev/null 2>&1

echo "Launching Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "  AgroGuard is Running!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

echo ""
echo "AgroGuard stopped"
