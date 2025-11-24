@echo off
echo ================================================
echo    AgroGuard - Plant Disease Detection
echo    Starting Backend Server with Authentication
echo ================================================
echo.

echo [1/3] Checking Python...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python not found! Please install Python 3.8+
    pause
    exit /b 1
)

echo.
echo [2/3] Checking dependencies...
python -c "import flask, flask_sqlalchemy, jwt, bcrypt, authlib" 2>nul
if %errorlevel% neq 0 (
    echo WARNING: Some dependencies missing. Installing...
    pip install -r requirements.txt
)

echo.
echo [3/3] Starting Flask server...
echo Server will be available at: http://localhost:5000
echo API Documentation: http://localhost:5000
echo Health Check: http://localhost:5000/api/health
echo.
echo Press CTRL+C to stop the server
echo.

python server.py

pause
