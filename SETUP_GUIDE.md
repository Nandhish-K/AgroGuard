# AgroGuard Setup & Installation Guide

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Application](#running-the-application)
5. [Testing the System](#testing-the-system)
6. [Deployment](#deployment)

---

## 🖥️ System Requirements

### Minimum Requirements

- **OS**: Windows 10+, macOS 10.13+, or Linux
- **CPU**: Intel Core i5 or equivalent
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB for dependencies and model
- **Internet**: Only needed for initial setup

### Software Requirements

- **Python**: 3.8 or higher
- **Node.js**: 16.x or higher
- **npm**: 7.x or higher

### Check Installed Versions

```bash
python --version
node --version
npm --version
```

---

## 🔧 Backend Setup

### Step 1: Navigate to Project Directory

```bash
cd c:\disease-detection
```

### Step 2: Create Virtual Environment

**On Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### Step 3: Upgrade pip

```bash
python -m pip install --upgrade pip
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

This will install:

- Flask (web framework)
- PyTorch (deep learning)
- TorchVision (computer vision)
- Pillow (image processing)
- Flask-CORS (cross-origin support)

### Step 5: Verify Model File

Ensure `plantDisease-vgg16-best.pth` exists in the root directory:

```bash
# Windows
dir | find "plantDisease"

# macOS/Linux
ls | grep plant
```

### Step 6: Test Backend

Start the server:

```bash
python server.py
```

You should see:

```
WARNING in werkzeug: Running on http://0.0.0.0:5000
```

**Test the API** (open another terminal):

```bash
# Windows
curl http://localhost:5000/api/health

# macOS/Linux
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "status": "healthy",
  "model_loaded": true,
  "timestamp": "2024-10-26T..."
}
```

### Common Backend Issues

**Issue**: `ModuleNotFoundError: No module named 'torch'`

```bash
# Solution: Reinstall torch
pip install torch==2.0.1 --index-url https://download.pytorch.org/whl/cpu
```

**Issue**: Port 5000 already in use

```bash
# Solution: Use different port in server.py
app.run(port=5001)
```

**Issue**: Model file not found

```bash
# Solution: Ensure plantDisease-vgg16-best.pth is in root directory
# Copy if in different location
copy \path\to\model\plantDisease-vgg16-best.pth .
```

---

## 🎨 Frontend Setup

### Step 1: Navigate to Client Directory

```bash
cd client
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs:

- React 19
- React Router DOM
- Vite (build tool)
- ESLint (code quality)

### Step 3: Verify Installation

```bash
npm list react
npm list react-dom
```

### Step 4: Check Configuration

Verify `vite.config.js` exists:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
```

### Step 5: Start Development Server

```bash
npm run dev
```

You should see:

```
VITE v7.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Common Frontend Issues

**Issue**: Port 5173 already in use

```bash
# Vite will automatically use next available port
# Check the output for the correct URL
```

**Issue**: Dependencies not installed

```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

**Issue**: Module not found errors

```bash
# Verify all component files exist
# Check file paths are correct (case-sensitive on Linux)
```

---

## 🚀 Running the Application

### Terminal 1: Start Backend

```bash
# Navigate to project root
cd c:\disease-detection

# Activate virtual environment
venv\Scripts\activate

# Start server
python server.py
```

Wait for: `Running on http://0.0.0.0:5000`

### Terminal 2: Start Frontend

```bash
# Navigate to client
cd client

# Start dev server
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Access the Application

Open your browser and go to:

```
http://localhost:5173
```

You should see:

- AgroGuard header with leaf logo
- "Protect Your Plants" title
- Image upload interface
- "Take Photo" and upload buttons

---

## 🧪 Testing the System

### Test 1: Upload an Image

1. Find a plant leaf image on your computer
2. Drag and drop into the upload area OR click to select
3. Click "Detect Disease" button
4. Wait for results (usually 1-3 seconds)

### Test 2: Take a Photo

1. Click "Take Photo" button
2. Allow camera permission when prompted
3. Position a leaf in the frame
4. Click "Capture Photo"
5. Click "Detect Disease"

### Test 3: Verify Backend Connection

If backend is running:

- Results display with disease name, confidence, etc.
- Can see full treatment and prevention information

If backend is NOT running:

- Demo mode kicks in after 1.5 seconds
- Shows sample results
- Message shown about backend not available

### Test 4: Check All Features

- [ ] Image upload works
- [ ] Camera capture works
- [ ] Results display correctly
- [ ] Can scroll through treatment info
- [ ] Print button works
- [ ] Copy button works
- [ ] Responsive design on mobile
- [ ] No console errors

---

## 📦 Building for Production

### Frontend Build

```bash
cd client
npm run build
```

Creates optimized files in `client/dist/`

### Backend Optimization

```bash
# Install gunicorn for production
pip install gunicorn

# Run with gunicorn
gunicorn --workers 4 --bind 0.0.0.0:5000 server:app
```

---

## 🌐 Deployment Options

### Option 1: Local Network

```bash
# Make backend accessible to others on network
# Edit server.py:
app.run(host='0.0.0.0', port=5000, debug=False)

# Frontend can connect to:
# http://<your-ip>:5000
```

### Option 2: Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.10-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY server.py .
COPY plantDisease-vgg16-best.pth .

CMD ["python", "server.py"]
```

Build and run:

```bash
docker build -t agroguard-backend .
docker run -p 5000:5000 agroguard-backend
```

### Option 3: Cloud Deployment (Azure)

```bash
# Login to Azure
az login

# Create resource group
az group create --name myResourceGroup --location eastus

# Create App Service plan
az appservice plan create --name myPlan --resource-group myResourceGroup

# Create web app
az webapp create --resource-group myResourceGroup --plan myPlan --name myAppName

# Deploy
az webapp deployment source config-zip --resource-group myResourceGroup --name myAppName --src release.zip
```

---

## 📝 Environment Configuration

### .env File (Optional)

Create `.env` in root directory:

```env
# Flask Configuration
FLASK_ENV=production
FLASK_DEBUG=False
FLASK_HOST=0.0.0.0
FLASK_PORT=5000

# Model Configuration
MODEL_PATH=plantDisease-vgg16-best.pth
MODEL_DEVICE=cpu

# CORS Configuration
CORS_ORIGINS=http://localhost:5173,http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

### Load Configuration

Update `server.py`:

```python
from dotenv import load_dotenv
load_dotenv()

import os
model_path = os.getenv('MODEL_PATH', 'plantDisease-vgg16-best.pth')
```

---

## 🔍 Verification Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 16+ installed
- [ ] Virtual environment created
- [ ] Dependencies installed (pip)
- [ ] Dependencies installed (npm)
- [ ] Model file present
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can access http://localhost:5173
- [ ] Can upload image and get results
- [ ] Camera feature works
- [ ] Results display correctly

---

## 📞 Troubleshooting

### Everything works locally but not on network

1. Check firewall allows port 5000
2. Use machine IP instead of localhost
3. Update CORS settings
4. Check network connectivity

### Slow predictions

1. Using CPU? GPU support coming soon
2. First prediction slower due to model loading
3. Large images take longer
4. System resources low? Close other apps

### Memory issues

1. Run on machine with more RAM
2. Use smaller images
3. Process images one at a time
4. Use GPU for faster processing

---

## 📚 Additional Resources

- **PyTorch Docs**: https://pytorch.org/docs/
- **Flask Docs**: https://flask.palletsprojects.com/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/

---

## ✅ Next Steps

1. [Read Main README](./README.md)
2. [Review API Documentation](#api-endpoints-in-readme)
3. [Explore the Code](#project-structure)
4. [Deploy to Production](#deployment)

---

**Need Help?**

- Check console for error messages
- Review logs in terminal output
- Verify all files are in correct locations
- Ensure all dependencies are installed
