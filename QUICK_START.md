# 🚀 Quick Start Guide - Authentication System

## ⚡ 5-Minute Setup (No OAuth)

### Step 1: Setup Environment (30 seconds)

Create `.env` file in project root:

```env
JWT_SECRET_KEY=my-super-secret-jwt-key-12345
SECRET_KEY=my-flask-secret-key-67890
DATABASE_URL=sqlite:///agroguard.db
FRONTEND_URL=http://localhost:5173
```

### Step 2: Install Backend Dependencies (2 minutes)

```bash
cd c:\disease-detection
pip install -r requirements.txt
```

### Step 3: Install Frontend Dependencies (1 minute)

```bash
cd c:\disease-detection\client
npm install
```

### Step 4: Start Backend (30 seconds)

**Option A - Direct:**

```bash
cd c:\disease-detection
python server.py
```

**Option B - Batch File:**

```bash
start_backend.bat
```

### Step 5: Start Frontend (30 seconds)

**Option A - Direct:**

```bash
cd c:\disease-detection\client
npm run dev
```

**Option B - Batch File:**

```bash
start_frontend.bat
```

### Step 6: Test It! (30 seconds)

1. Open http://localhost:5173
2. Click "Register"
3. Create account:
   - Email: `test@example.com`
   - Password: `Test1234`
   - Name: `Test User`
4. Click "Create Account"
5. You're logged in! ✅

---

## 🎯 What You Can Do Now

### As a Registered User:

✅ **Detect Diseases** - Upload leaf images  
✅ **View History** - All detections saved automatically  
✅ **Profile Display** - Your name shows in header  
✅ **Persistent Login** - Stay logged in across sessions

### Guest Users (Not Logged In):

✅ **Detect Diseases** - Works without account  
❌ **View History** - Not saved (login required)

---

## 🔑 Quick Commands Reference

### Backend Commands

```bash
# Start server
python server.py

# Check imports
python -c "from models import User; print('✅ Models OK')"

# Create .env from example
copy .env.example .env

# Install dependencies
pip install -r requirements.txt
```

### Frontend Commands

```bash
# Start dev server
npm run dev

# Install dependencies
npm install

# Build for production
npm run build
```

### Database Commands

```bash
# Delete database (reset)
del agroguard.db

# Server will recreate on next start
python server.py
```

---

## 🧪 Quick Test Checklist

- [ ] Register works
- [ ] Login works
- [ ] Profile shows in header
- [ ] Logout works
- [ ] Detect disease (logged in) - saves to history
- [ ] Detect disease (guest) - works but doesn't save

---

## 🌐 OAuth Setup (Optional - 10 minutes)

### Google OAuth:

1. **Get Credentials:**

   - Go to https://console.cloud.google.com/
   - Create project → Credentials → OAuth 2.0
   - Add redirect: `http://localhost:5000/api/auth/google/callback`

2. **Add to .env:**

```env
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback
```

3. **Restart backend**

4. **Test:**
   - Click "Sign in with Google" on login page

### Facebook OAuth:

1. **Get Credentials:**

   - Go to https://developers.facebook.com/
   - Create app → Add Facebook Login
   - Add redirect: `http://localhost:5000/api/auth/facebook/callback`

2. **Add to .env:**

```env
FACEBOOK_CLIENT_ID=your-app-id-here
FACEBOOK_CLIENT_SECRET=your-app-secret-here
FACEBOOK_REDIRECT_URI=http://localhost:5000/api/auth/facebook/callback
```

3. **Restart backend**

4. **Test:**
   - Click "Sign in with Facebook" on login page

---

## 🐛 Troubleshooting

### Backend won't start:

```bash
# Check dependencies
pip list | findstr "flask PyJWT bcrypt"

# Reinstall if needed
pip install -r requirements.txt
```

### Frontend won't start:

```bash
# Clear and reinstall
cd client
rmdir /s /q node_modules
npm install
npm run dev
```

### Database errors:

```bash
# Reset database
del agroguard.db
python server.py
```

### "Module not found" errors:

```bash
# Backend
pip install flask flask-sqlalchemy PyJWT bcrypt authlib

# Frontend
cd client
npm install jwt-decode axios
```

---

## 📍 Important URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health
- **Login:** http://localhost:5173/login
- **Register:** http://localhost:5173/register

---

## 📝 API Quick Reference

### Authentication

```bash
# Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123",
  "full_name": "John Doe"
}

# Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123"
}

# Get current user (requires token)
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_TOKEN_HERE

# Get history (requires token)
GET http://localhost:5000/api/history
Authorization: Bearer YOUR_TOKEN_HERE
```

### Disease Detection

```bash
# Predict (works with or without auth)
POST http://localhost:5000/api/predict
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE (optional)

{
  "image": "base64_encoded_image_here"
}
```

---

## 🎨 Customization Quick Tips

### Change Token Expiry:

Edit `auth_utils.py`:

```python
JWT_EXPIRATION_HOURS = 24 * 7  # Change 7 to desired days
```

### Change Password Requirements:

Edit `auth_utils.py` → `validate_password()` function

### Change Frontend Colors:

Edit `client/src/styles/auth.css`:

```css
.auth-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change gradient colors here */
}
```

---

## 📚 Next Steps

1. ✅ **Complete Basic Setup** - Register and login working
2. ⏳ **Configure OAuth** - Google/Facebook login (optional)
3. ⏳ **Test All Features** - Use AUTHENTICATION_CHECKLIST.md
4. ⏳ **Deploy** - Set up production environment

---

## 💡 Pro Tips

- **Development:** Use email/password auth (faster to test)
- **Production:** Add OAuth for better UX
- **Security:** Change secret keys before deployment
- **Database:** Switch to PostgreSQL for production
- **HTTPS:** Required for OAuth in production

---

## 📞 Need Help?

- **Detailed Setup:** See `AUTH_SETUP_GUIDE.md`
- **Flow Diagrams:** See `AUTHENTICATION_FLOWS.md`
- **Complete Checklist:** See `AUTHENTICATION_CHECKLIST.md`
- **Summary:** See `AUTHENTICATION_SUMMARY.md`

---

## ✨ Success Indicators

You'll know setup is complete when:

✅ Backend starts without errors  
✅ Frontend shows at localhost:5173  
✅ Can register new user  
✅ Can login with credentials  
✅ Profile shows in header  
✅ Disease detection saves to history

---

**Quick Start Version:** 1.0  
**Estimated Time:** 5 minutes (no OAuth) / 15 minutes (with OAuth)  
**Difficulty:** Easy  
**Last Updated:** November 22, 2025
