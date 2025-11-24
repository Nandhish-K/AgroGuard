# 🔐 Authentication Flow Diagrams

## 1. Email/Password Registration Flow

```
USER                    FRONTEND                  BACKEND                   DATABASE
  |                        |                         |                          |
  |--[1] Fill Form-------->|                         |                          |
  |    (email, password)   |                         |                          |
  |                        |                         |                          |
  |--[2] Click Register--->|                         |                          |
  |                        |                         |                          |
  |                        |--[3] Validate Form------|                          |
  |                        |    (client-side)        |                          |
  |                        |                         |                          |
  |                        |--[4] POST /auth/register|                          |
  |                        |    {email, password}    |                          |
  |                        |                         |                          |
  |                        |                         |--[5] Validate Email------|
  |                        |                         |--[6] Check Exists------->|
  |                        |                         |<-[7] User Not Found------|
  |                        |                         |                          |
  |                        |                         |--[8] Hash Password-------|
  |                        |                         |    (bcrypt)              |
  |                        |                         |                          |
  |                        |                         |--[9] Create User-------->|
  |                        |                         |<-[10] User Created-------|
  |                        |                         |                          |
  |                        |                         |--[11] Generate JWT-------|
  |                        |                         |     (7 day expiry)       |
  |                        |                         |                          |
  |                        |<-[12] Return Token------|                          |
  |                        |    {token, user}        |                          |
  |                        |                         |                          |
  |                        |--[13] Store Token-------|                          |
  |                        |    (localStorage)       |                          |
  |                        |                         |                          |
  |                        |--[14] Set User State----|                          |
  |                        |    (AuthContext)        |                          |
  |                        |                         |                          |
  |<-[15] Redirect to Home-|                         |                          |
  |                        |                         |                          |
```

---

## 2. Email/Password Login Flow

```
USER                    FRONTEND                  BACKEND                   DATABASE
  |                        |                         |                          |
  |--[1] Enter Credentials>|                         |                          |
  |    (email, password)   |                         |                          |
  |                        |                         |                          |
  |--[2] Click Login------>|                         |                          |
  |                        |                         |                          |
  |                        |--[3] POST /auth/login---|                          |
  |                        |    {email, password}    |                          |
  |                        |                         |                          |
  |                        |                         |--[4] Find User by Email->|
  |                        |                         |<-[5] User Found----------|
  |                        |                         |                          |
  |                        |                         |--[6] Verify Password-----|
  |                        |                         |    (bcrypt.checkpw)      |
  |                        |                         |                          |
  |                        |                         |--[7] Update Last Login-->|
  |                        |                         |<-[8] Updated-------------|
  |                        |                         |                          |
  |                        |                         |--[9] Generate JWT--------|
  |                        |                         |                          |
  |                        |<-[10] Return Token------|                          |
  |                        |    {token, user}        |                          |
  |                        |                         |                          |
  |                        |--[11] Store Token-------|                          |
  |                        |    (localStorage)       |                          |
  |                        |                         |                          |
  |<-[12] Redirect to Home-|                         |                          |
  |                        |                         |                          |
```

---

## 3. Google OAuth Flow

```
USER               FRONTEND            BACKEND           GOOGLE              DATABASE
  |                   |                   |                 |                   |
  |--[1] Click------->|                   |                 |                   |
  | "Sign in Google"  |                   |                 |                   |
  |                   |                   |                 |                   |
  |                   |--[2] Redirect---->|                 |                   |
  |                   |  /auth/google     |                 |                   |
  |                   |                   |                 |                   |
  |                   |                   |--[3] Build URL--|                   |
  |                   |                   |   (OAuth params)|                   |
  |                   |                   |                 |                   |
  |<--[4] Redirect to Google-------------|                 |                   |
  |                   |                   |                 |                   |
  |                   |                   |                 |                   |
  |--[5] Login to Google Account-------->|                 |                   |
  |                   |                   |                 |                   |
  |--[6] Authorize App------------------>|                 |                   |
  |                   |                   |                 |                   |
  |<--[7] Redirect with code-------------|                 |                   |
  |   to /auth/google/callback           |                 |                   |
  |                   |                   |                 |                   |
  |                   |                   |<-[8] Receive----|                   |
  |                   |                   |    auth code    |                   |
  |                   |                   |                 |                   |
  |                   |                   |--[9] Exchange-->|                   |
  |                   |                   |   code for token|                   |
  |                   |                   |<-[10] Access---|                   |
  |                   |                   |      token      |                   |
  |                   |                   |                 |                   |
  |                   |                   |--[11] Get Info->|                   |
  |                   |                   |<-[12] Profile---|                   |
  |                   |                   |  (email, name)  |                   |
  |                   |                   |                 |                   |
  |                   |                   |--[13] Find/Create User------------>|
  |                   |                   |<-[14] User Data---------------------|
  |                   |                   |                 |                   |
  |                   |                   |--[15] Generate JWT------------------|
  |                   |                   |                 |                   |
  |<--[16] Redirect to frontend----------|                 |                   |
  |   /auth/callback?token=xxx           |                 |                   |
  |                   |                   |                 |                   |
  |                   |--[17] Extract Token|                 |                   |
  |                   |--[18] Store Token--|                 |                   |
  |                   |--[19] Fetch User---|                 |                   |
  |                   |                   |                 |                   |
  |<-[20] Show Home---|                   |                 |                   |
  |                   |                   |                 |                   |
```

---

## 4. Protected Route Access Flow

```
USER               FRONTEND            BACKEND           DATABASE
  |                   |                   |                 |
  |--[1] Click------->|                   |                 |
  | "View History"    |                   |                 |
  |                   |                   |                 |
  |                   |--[2] Get Token----|                 |
  |                   |  (localStorage)   |                 |
  |                   |                   |                 |
  |                   |--[3] GET /api/history---------------|
  |                   |  Authorization: Bearer <token>      |
  |                   |                   |                 |
  |                   |                   |--[4] Extract----|
  |                   |                   |     Token       |
  |                   |                   |                 |
  |                   |                   |--[5] Decode-----|
  |                   |                   |   & Verify JWT  |
  |                   |                   |                 |
  |                   |                   |--[6] Get User-->|
  |                   |                   |<-[7] User-------|
  |                   |                   |                 |
  |                   |                   |--[8] Query----->|
  |                   |                   |   History       |
  |                   |                   |<-[9] Results----|
  |                   |                   |                 |
  |                   |<-[10] Return Data-|                 |
  |                   |  {history: [...]} |                 |
  |                   |                   |                 |
  |<-[11] Display-----|                   |                 |
  |      History      |                   |                 |
  |                   |                   |                 |
```

---

## 5. Disease Detection with History

```
USER               FRONTEND            BACKEND           DATABASE
  |                   |                   |                 |
  |--[1] Upload------>|                   |                 |
  |     Image         |                   |                 |
  |                   |                   |                 |
  |--[2] Click------->|                   |                 |
  | "Detect Disease"  |                   |                 |
  |                   |                   |                 |
  |                   |--[3] Get Token----|                 |
  |                   |  (if logged in)   |                 |
  |                   |                   |                 |
  |                   |--[4] POST /api/predict-------------|
  |                   |  Authorization: Bearer <token>     |
  |                   |  {image: base64}  |                |
  |                   |                   |                 |
  |                   |                   |--[5] Verify-----|
  |                   |                   |   Token (optional)|
  |                   |                   |                 |
  |                   |                   |--[6] Run Model--|
  |                   |                   |   (VGG16)       |
  |                   |                   |                 |
  |                   |                   |--[7] Get Results|
  |                   |                   |   (disease,     |
  |                   |                   |    confidence)  |
  |                   |                   |                 |
  |                   |                   |--[8] IF USER--->|
  |                   |                   |   Save History  |
  |                   |                   |<-[9] Saved------|
  |                   |                   |                 |
  |                   |<-[10] Return------|                 |
  |                   |   Results         |                 |
  |                   |   {disease, ...}  |                 |
  |                   |                   |                 |
  |<-[11] Display-----|                   |                 |
  |      Results      |                   |                 |
  |                   |                   |                 |
```

---

## 6. Logout Flow

```
USER               FRONTEND            BACKEND
  |                   |                   |
  |--[1] Click------->|                   |
  |     Logout        |                   |
  |                   |                   |
  |                   |--[2] Clear Token--|
  |                   |  (localStorage)   |
  |                   |                   |
  |                   |--[3] Clear State--|
  |                   |  (AuthContext)    |
  |                   |                   |
  |                   |--[4] POST /logout-|
  |                   |  (optional API)   |
  |                   |                   |
  |<-[5] Redirect-----|                   |
  |     to Home       |                   |
  |                   |                   |
```

---

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              AuthContext (Global State)              │  │
│  │  - user                                               │  │
│  │  - token                                              │  │
│  │  - login()                                            │  │
│  │  - register()                                         │  │
│  │  - logout()                                           │  │
│  │  - loginWithGoogle()                                  │  │
│  │  - loginWithFacebook()                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                         ▲                                   │
│                         │                                   │
│    ┌────────────────────┼────────────────────┐             │
│    │                    │                    │             │
│    ▼                    ▼                    ▼             │
│  ┌─────┐           ┌────────┐          ┌──────────┐       │
│  │Login│           │Register│          │  Header  │       │
│  │Page │           │  Page  │          │Component │       │
│  └─────┘           └────────┘          └──────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ HTTP Requests
                          │ (with JWT token)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Flask App                          │  │
│  │  - CORS enabled                                       │  │
│  │  - Session management                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                   │
│    ┌────────────────────┼────────────────────┐             │
│    │                    │                    │             │
│    ▼                    ▼                    ▼             │
│  ┌─────────┐      ┌──────────┐        ┌──────────┐        │
│  │  Auth   │      │  OAuth   │        │  Models  │        │
│  │ Utils   │      │  Config  │        │  (User,  │        │
│  │(JWT,    │      │(Google,  │        │ History) │        │
│  │bcrypt)  │      │Facebook) │        └──────────┘        │
│  └─────────┘      └──────────┘              │              │
│                                              │              │
└──────────────────────────────────────────────┼──────────────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │   SQLite DB      │
                                    │  - users         │
                                    │  - detection_    │
                                    │    history       │
                                    └──────────────────┘
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Lifecycle                     │
└─────────────────────────────────────────────────────────────┘

[1] APP STARTS
     │
     ├─> Check localStorage for token
     │
     ├─> IF token exists AND valid
     │    │
     │    ├─> Fetch user info from /api/auth/me
     │    │
     │    └─> Set user state in AuthContext
     │
     └─> ELSE
          │
          └─> User is guest (not logged in)

[2] USER LOGS IN
     │
     ├─> Credentials sent to backend
     │
     ├─> Backend returns JWT token + user data
     │
     ├─> Token stored in localStorage
     │
     └─> User state updated in AuthContext

[3] USER NAVIGATES
     │
     ├─> AuthContext provides user state to all components
     │
     ├─> Header shows user info OR login buttons
     │
     └─> Protected routes check authentication

[4] USER MAKES API CALL
     │
     ├─> Get token from localStorage
     │
     ├─> Add to Authorization header
     │
     └─> Backend validates token

[5] TOKEN EXPIRES
     │
     ├─> API returns 401 Unauthorized
     │
     ├─> Frontend detects expired token
     │
     ├─> Clear localStorage
     │
     ├─> Redirect to login
     │
     └─> Show "Session expired" message

[6] USER LOGS OUT
     │
     ├─> Clear localStorage
     │
     ├─> Clear AuthContext state
     │
     └─> Redirect to home
```

---

## Security Validation Points

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Checkpoints                      │
└─────────────────────────────────────────────────────────────┘

[FRONTEND]
  ├─> Email format validation (regex)
  ├─> Password strength check
  │    ├─> Minimum 8 characters
  │    ├─> Uppercase letter
  │    ├─> Lowercase letter
  │    └─> Number
  ├─> Token validation (expiry check)
  └─> HTTPS in production

[BACKEND]
  ├─> Email format validation
  ├─> Password hashing (bcrypt)
  ├─> JWT signature verification
  ├─> Token expiry check
  ├─> SQL injection protection (ORM)
  ├─> CORS policy enforcement
  └─> Input sanitization

[DATABASE]
  ├─> Unique email constraint
  ├─> Foreign key constraints
  ├─> Password stored as hash only
  └─> Indexed queries for performance
```

---

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      Error Scenarios                         │
└─────────────────────────────────────────────────────────────┘

[Registration Errors]
  ├─> Email already exists → 409 Conflict
  ├─> Invalid email format → 400 Bad Request
  ├─> Weak password → 400 Bad Request
  └─> Server error → 500 Internal Server Error

[Login Errors]
  ├─> Invalid credentials → 401 Unauthorized
  ├─> Account disabled → 403 Forbidden
  ├─> Missing fields → 400 Bad Request
  └─> Server error → 500 Internal Server Error

[OAuth Errors]
  ├─> Missing email permission → Redirect with error
  ├─> User cancels → Redirect to login
  ├─> Invalid credentials → Redirect with error
  └─> Network error → Show error message

[Protected Route Errors]
  ├─> No token → 401 Unauthorized
  ├─> Invalid token → 401 Unauthorized
  ├─> Expired token → 401 Unauthorized
  └─> User not found → 401 Unauthorized
```

---

**Document Version:** 1.0  
**Last Updated:** November 22, 2025  
**Purpose:** Visual reference for authentication flow
