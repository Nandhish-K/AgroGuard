# Authentication Setup Guide for AgroGuard

## Overview

AgroGuard now includes JWT-based authentication with support for:

- Email/Password registration and login
- Google OAuth
- Facebook OAuth
- Session persistence with local storage
- Protected routes and user profiles

---

## Backend Setup

### 1. Install Dependencies

All authentication dependencies are already in `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=False
FLASK_HOST=0.0.0.0
FLASK_PORT=5000

# Database Configuration
DATABASE_URL=sqlite:///agroguard.db

# JWT Configuration (CHANGE THESE IN PRODUCTION!)
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this
SECRET_KEY=your-flask-secret-key-change-this

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# Facebook OAuth Configuration
FACEBOOK_CLIENT_ID=your-facebook-app-id
FACEBOOK_CLIENT_SECRET=your-facebook-app-secret
FACEBOOK_REDIRECT_URI=http://localhost:5000/api/auth/facebook/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Model Configuration
MODEL_PATH=plantDisease-vgg16-best.pth
MODEL_DEVICE=cpu
```

### 3. Setup OAuth Providers

#### Google OAuth Setup:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Set Application type: "Web application"
6. Add Authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret to `.env`

#### Facebook OAuth Setup:

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app (type: Consumer)
3. Add "Facebook Login" product
4. Settings → Valid OAuth Redirect URIs: `http://localhost:5000/api/auth/facebook/callback`
5. Copy App ID and App Secret to `.env`

### 4. Run Backend

```bash
python server.py
```

The database will be automatically created on first run.

---

## Frontend Setup

### 1. Install Dependencies

```bash
cd client
npm install
```

Dependencies already added:

- `jwt-decode` - JWT token decoding
- `axios` - HTTP client (optional, using fetch API)

### 2. Run Frontend

```bash
npm run dev
```

---

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`

Register new user with email/password

```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "full_name": "John Doe",
  "username": "johndoe" // optional
}
```

#### POST `/api/auth/login`

Login with email/password

```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### GET `/api/auth/google`

Initiates Google OAuth flow (redirect)

#### GET `/api/auth/facebook`

Initiates Facebook OAuth flow (redirect)

#### GET `/api/auth/me`

Get current user info (requires Authorization header)

#### POST `/api/auth/logout`

Logout (client-side token removal)

### Disease Detection Endpoints

#### POST `/api/predict`

Predict disease (works with or without authentication)

- If authenticated: Saves to history
- If guest: Works normally without saving

#### GET `/api/history`

Get detection history (requires authentication)

---

## Features

### 1. **Email/Password Authentication**

- Strong password validation (8+ chars, uppercase, lowercase, number)
- Email format validation
- Password hashing with bcrypt
- JWT token generation

### 2. **OAuth Social Login**

- Google Sign-In with profile picture
- Facebook Sign-In with profile picture
- Automatic account creation
- Profile data sync

### 3. **User Session Management**

- JWT tokens stored in localStorage
- Token expiration (7 days default)
- Automatic token validation
- Persistent login across page reloads

### 4. **Detection History**

- Automatic history saving for authenticated users
- Pagination support
- Location tracking (optional)
- Timestamp tracking

### 5. **UI Components**

- Beautiful gradient authentication pages
- Social login buttons
- User profile in header
- Login/Logout navigation
- Responsive design

---

## Security Features

✅ Password hashing with bcrypt
✅ JWT token authentication
✅ Token expiration
✅ CORS configuration
✅ SQL injection protection (SQLAlchemy ORM)
✅ Input validation
✅ Secure password requirements

---

## Testing

### Test Email/Password Auth:

1. Go to `http://localhost:5173/register`
2. Create account with valid email/password
3. Login with credentials
4. Verify user info in header
5. Test disease detection (should save to history)
6. Logout and verify session cleared

### Test Google OAuth:

1. Click "Google" button on login page
2. Select Google account
3. Authorize the app
4. Verify redirect to home with user info

### Test Facebook OAuth:

1. Click "Facebook" button on login page
2. Login to Facebook
3. Authorize the app
4. Verify redirect to home with user info

---

## Database Schema

### Users Table

- id (Primary Key)
- email (Unique)
- username
- password_hash
- provider (email/google/facebook)
- provider_id
- full_name
- profile_picture
- is_active
- is_verified
- created_at
- updated_at
- last_login

### Detection History Table

- id (Primary Key)
- user_id (Foreign Key)
- disease
- confidence
- severity
- latitude/longitude
- location_name
- detected_at

---

## Troubleshooting

### Issue: Google OAuth not working

**Solution:**

- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- Check redirect URI matches Google Console settings
- Ensure Google+ API is enabled

### Issue: Facebook OAuth not working

**Solution:**

- Verify `FACEBOOK_CLIENT_ID` and `FACEBOOK_CLIENT_SECRET` in `.env`
- Check redirect URI in Facebook App settings
- Ensure app is not in development mode (for production)

### Issue: Token expired

**Solution:**

- User needs to login again
- Tokens expire after 7 days (configurable in `auth_utils.py`)

### Issue: Database errors

**Solution:**

```bash
# Delete old database and recreate
rm agroguard.db
python server.py  # Will recreate tables
```

---

## Production Deployment

### Important Changes for Production:

1. **Change Secret Keys**

```env
JWT_SECRET_KEY=use-strong-random-key-here
SECRET_KEY=use-different-random-key-here
```

2. **Update OAuth Redirect URIs**

```env
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
FACEBOOK_REDIRECT_URI=https://yourdomain.com/api/auth/facebook/callback
FRONTEND_URL=https://yourdomain.com
```

3. **Use PostgreSQL instead of SQLite**

```env
DATABASE_URL=postgresql://user:password@host:port/database
```

4. **Enable HTTPS**

- OAuth requires HTTPS in production
- Use SSL certificates

5. **Configure CORS**
   Update allowed origins in `server.py`

---

## Next Steps

Consider adding:

- Email verification
- Password reset functionality
- Two-factor authentication (2FA)
- User profile editing
- Account deletion
- Admin dashboard
- Rate limiting
- API throttling

---

## Support

For issues or questions:

- Check console logs (browser and backend)
- Verify environment variables
- Test with demo mode first
- Check OAuth provider documentation

---

**Version:** 2.0.0  
**Last Updated:** November 22, 2025
