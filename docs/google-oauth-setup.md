# Google OAuth Setup Guide for SoundSpire

## Overview
This document outlines the process of setting up Google OAuth authentication for the SoundSpire application, including the problems encountered and their solutions.

## Prerequisites
- A Google Cloud Platform account
- Next.js application with TypeScript
- Basic understanding of OAuth 2.0 flow

## Step 1: Google Cloud Console Setup

### Creating OAuth 2.0 Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth client ID"
5. Configure the OAuth consent screen if not already done
6. Set up the OAuth client:
   - Application type: Web application
   - Name: "SoundSpire"
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`

### Problem 1: Missing Environment Variables
**Error**: The OAuth client was not found (Error 401: invalid_client)

**Solution**:
1. Create a `.env.local` file in the frontend directory
2. Add the following environment variables:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```
3. Replace the placeholder values with actual credentials from Google Cloud Console
4. Restart the Next.js development server

## Step 2: Implementing OAuth Flow

### Backend Implementation
1. Created the following API routes:
   - `/api/auth/google` - Initiates OAuth flow
   - `/api/auth/google/callback` - Handles OAuth callback
   - `/api/auth/logout` - Handles user logout
   - `/api/auth/session` - Manages user session

### Problem 2: Missing Auth Utilities
**Error**: Module not found: '@/lib/auth'

**Solution**:
1. Created `frontend/src/lib/auth.ts` with the `generateState` function:
```typescript
import { randomBytes } from 'crypto';

export function generateState(): string {
  return randomBytes(32).toString('hex');
}
```

### Problem 3: Incorrect Redirect After Login
**Issue**: After successful login, users were redirected to the home page instead of the explore page

**Solution**:
Modified the callback route to redirect to `/explore`:
```typescript
const response = NextResponse.redirect(`${FRONTEND_URL}/explore`);
```

## Step 3: Frontend Integration

### Auth Context Setup
1. Created `AuthContext.tsx` to manage authentication state
2. Implemented login and logout functionality
3. Added session checking and route protection

### Problem 4: No Logout Button
**Issue**: Users couldn't log out from the explore page

**Solution**:
Added a logout button to the Navbar component:
```typescript
const { logout } = useAuth();
// ...
<button
  onClick={logout}
  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
>
  Logout
</button>
```

### Problem 5: Home Page Access While Logged In
**Issue**: Users could still access the login page while logged in

**Solution**:
Added automatic redirection in the home page:
```typescript
useEffect(() => {
  if (user) {
    router.push('/explore');
  }
}, [user, router]);
```

## Security Considerations
1. Using httpOnly cookies for storing user data
2. Implementing CSRF protection with state parameter
3. Secure cookie settings (sameSite: 'lax', secure in production)
4. Environment variables for sensitive data
5. Proper error handling in OAuth flow

## Testing the Implementation
1. Start the development server
2. Navigate to the home page
3. Click "Login with Google"
4. Select a Google account
5. Verify redirection to explore page
6. Test logout functionality
7. Verify automatic redirection when accessing home page while logged in

## Troubleshooting
1. If OAuth fails:
   - Check environment variables
   - Verify redirect URIs in Google Cloud Console
   - Check browser console for errors
2. If session issues occur:
   - Clear browser cookies
   - Restart development server
   - Check cookie settings in production

## Future Improvements
1. Add refresh token rotation
2. Implement session persistence
3. Add error handling UI
4. Support multiple OAuth providers
5. Add user profile management 