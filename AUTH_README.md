# Authentication System - Stafet Website Editor

## Overview

The Stafet website editor now includes a robust JWT-based authentication system that replaces the previous placeholder login. This system provides secure admin access to the website editing features.

## Admin Credentials

**Email:** `admin@stafet.com`  
**Password:** `Stafet@123`

## Security Features

### Backend Security
- **Password Hashing**: Uses bcryptjs with 12 salt rounds
- **JWT Tokens**: 30-minute expiration with server-side validation
- **Token Verification**: Backend validates tokens on each protected request
- **Secure Storage**: Admin credentials stored with hashed passwords

### Frontend Security
- **JWT Storage**: Tokens stored in localStorage
- **Automatic Token Refresh**: Periodic validation (every 5 minutes)
- **Session Management**: Automatic logout on token expiration
- **Protected Routes**: Middleware redirects unauthorized users

## API Endpoints

### Authentication Endpoints (`/api/auth/`)

#### POST `/login`
Login with email and password.

**Request:**
```json
{
  "email": "admin@stafet.com",
  "password": "Stafet@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "admin-1",
    "email": "admin@stafet.com",
    "status": "approved"
  }
}
```

#### GET `/verify`
Verify current JWT token.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "admin": {
    "id": "admin-1",
    "email": "admin@stafet.com",
    "status": "approved"
  }
}
```

#### POST `/change-password`
Change admin password (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "currentPassword": "Stafet@123",
  "newPassword": "NewPassword@456"
}
```

## Frontend Integration

### AuthContext
The `AuthContext` provides authentication state management:

```tsx
const { isAuthenticated, login, logout, adminInfo } = useAuth();

// Login
const success = await login({
  email: "admin@stafet.com",
  password: "Stafet@123"
});

// Check authentication status
const isValid = await checkAuth();

// Logout
logout();
```

### Protected Components
Use the `requireAuth()` function to protect admin-only components:

```tsx
const { requireAuth } = useAuth();

useEffect(() => {
  requireAuth(); // Redirects to login if not authenticated
}, []);
```

## File Structure

```
edit back/
├── src/
│   ├── controllers/
│   │   └── authController.js      # Authentication logic
│   ├── middleware/
│   │   ├── auth.js               # JWT middleware
│   │   └── validation.js         # Input validation
│   ├── routes/
│   │   └── auth.js              # Authentication routes
│   └── server.js                # Main server file
├── data/
│   └── admins.json              # Admin data with hashed passwords
└── .env                         # Environment variables

edit front/
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication context
│   ├── app/admin/login/
│   │   └── page.tsx            # Login page
│   └── lib/
│       └── api.ts              # API client with auth
```

## Environment Variables

Add to `edit back/.env`:

```env
JWT_SECRET=stafet_jwt_secret_key_2025_very_secure_random_string
```

## Migration from Old System

The old placeholder system has been completely replaced:

### Before:
- Hardcoded username/password check in frontend
- No real security
- Simple localStorage flag

### After:
- Backend JWT authentication
- Bcrypt password hashing
- Secure token-based sessions
- Server-side validation

## Development Usage

1. Start the backend server:
```bash
cd "edit back"
npm run dev
```

2. Start the frontend:
```bash
cd "edit front"
npm run dev
```

3. Navigate to: `http://localhost:3000/admin/login`
4. Use the admin credentials to log in
5. Access admin features with proper authentication

## Security Considerations

1. **Password Security**: Passwords are hashed with bcrypt (12 rounds)
2. **Token Expiration**: JWT tokens expire after 30 minutes
3. **Environment Variables**: JWT secret should be secure in production
4. **HTTPS**: Use HTTPS in production for token security
5. **Rate Limiting**: Consider adding rate limiting for login attempts

## Future Enhancements

- Multi-admin support
- Role-based permissions
- Password reset functionality
- Login attempt monitoring
- Remember me functionality
- Two-factor authentication
