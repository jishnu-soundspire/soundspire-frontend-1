# Google OAuth Setup Guide for SoundSpire

## Overview
This document outlines the process of setting up Google OAuth authentication for the SoundSpire application, including the problems encountered and their solutions.

## Prerequisites
- A Google Cloud Platform account
- Next.js application with TypeScript
- Basic understanding of OAuth 2.0 flow
- mkcert and OpenSSL installed for local HTTPS development

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
   - Authorized JavaScript origins: `https://localhost:3000`
   - Authorized redirect URIs: `https://localhost:3000/api/auth/google/callback`

### Problem 1: Missing Environment Variables
**Error**: The OAuth client was not found (Error 401: invalid_client)

**Solution**:
1. Create a `.env.local` file in the frontend directory
2. Add the following environment variables:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_BASE_URL=https://localhost:3000
NEXTAUTH_URL=https://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```
3. Replace the placeholder values with actual credentials from Google Cloud Console
4. Restart the Next.js development server

## Step 2: Setting Up HTTPS for Local Development

### Problem 2: HTTPS Required for OAuth
**Issue**: Google OAuth requires HTTPS for redirect URLs in production and strongly recommends it for development

**Solution**:
1. Generate local SSL certificates using mkcert:
```bash
mkcert -install
mkcert localhost
```
2. Create a custom server (`server.js`) to handle HTTPS:
```javascript
const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

app.prepare().then(() => {
  https.createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  }).listen(3000, () => {
    console.log('> Ready on https://localhost:3000');
  });
});
```
3. Update `package.json` scripts:
```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

## Step 3: Implementing OAuth Flow

### Backend Implementation
1. Created the following API routes:
   - `/api/auth/google` - Initiates OAuth flow
   - `/api/auth/google/callback` - Handles OAuth callback
   - `/api/auth/logout` - Handles user logout
   - `/api/auth/session` - Manages user session

### Problem 3: Missing Auth Utilities
**Error**: Module not found: '@/lib/auth'

**Solution**:
1. Created `frontend/src/lib/auth.ts` with the `generateState` function:
```typescript
import { randomBytes } from 'crypto';

export function generateState(): string {
  return randomBytes(32).toString('hex');
}
```

### Problem 4: Incorrect Redirect After Login
**Issue**: After successful login, users were redirected to the home page instead of the explore page

**Solution**:
Modified the callback route to redirect to `/explore`:
```typescript
const response = NextResponse.redirect(`${FRONTEND_URL}/explore`);
```

## Step 4: Frontend Integration

### Auth Context Setup
1. Created `AuthContext.tsx` to manage authentication state
2. Implemented login and logout functionality
3. Added session checking and route protection

### Problem 5: No Logout Button
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

### Problem 6: Home Page Access While Logged In
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
6. HTTPS for all OAuth communications
7. Secure storage of SSL certificates
8. Regular rotation of OAuth credentials

## Testing the Implementation
1. Start the development server with HTTPS:
```bash
npm run dev
```
2. Navigate to `https://localhost:3000`
3. Accept the security warning for the self-signed certificate
4. Click "Login with Google"
5. Select a Google account
6. Verify redirection to explore page
7. Test logout functionality
8. Verify automatic redirection when accessing home page while logged in

## Troubleshooting
1. If OAuth fails:
   - Check environment variables
   - Verify redirect URIs in Google Cloud Console
   - Check browser console for errors
   - Ensure HTTPS is working correctly
2. If session issues occur:
   - Clear browser cookies
   - Restart development server
   - Check cookie settings in production
3. If HTTPS issues occur:
   - Verify SSL certificates are in place
   - Check certificate paths in server.js
   - Ensure mkcert is properly installed

## Future Improvements
1. Add refresh token rotation
2. Implement session persistence
3. Add error handling UI
4. Support multiple OAuth providers
5. Add user profile management
6. Implement proper certificate management for production
7. Add rate limiting for OAuth endpoints 