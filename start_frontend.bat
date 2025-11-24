@echo off
echo ================================================
echo    AgroGuard - Plant Disease Detection
echo    Starting Frontend Development Server
echo ================================================
echo.

echo [1/2] Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found! Please install Node.js 16+
    pause
    exit /b 1
)

cd client

echo.
echo [2/2] Starting Vite development server...
echo Frontend will be available at: http://localhost:5173
echo.
echo Press CTRL+C to stop the server
echo.

npm run dev

pause
