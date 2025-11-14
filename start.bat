@echo off
REM AgroGuard Quick Start Script for Windows
REM This script starts both the backend and frontend

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   AgroGuard - Quick Start Script
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if !errorlevel! neq 0 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if !errorlevel! neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Python found: 
python --version

echo [OK] Node.js found:
node --version

echo.
echo Starting AgroGuard...
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    if !errorlevel! neq 0 (
        echo [ERROR] Failed to create virtual environment
        pause
        exit /b 1
    )
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install/upgrade pip
echo Installing dependencies (first time only)...
pip install --upgrade pip >nul 2>&1
pip install -r requirements.txt >nul 2>&1

REM Start backend in new window
echo Launching Backend Server...
start "AgroGuard Backend" python server.py

REM Wait for backend to start
timeout /t 3 /nobreak

REM Navigate to client and start frontend
cd client
echo Installing frontend dependencies (first time only)...
npm install >nul 2>&1

echo Launching Frontend Server...
start "AgroGuard Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   AgroGuard is Starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window
echo (Backend and Frontend will continue running)
echo.
pause

exit /b 0
