import { NextResponse } from 'next/server';
import { generateState } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const state = generateState();
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`;
    
    const scope = encodeURIComponent('email profile');
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;
    
    const response = NextResponse.redirect(googleAuthUrl);
    
    // Store state in a cookie for validation during callback
    response.cookies.set('oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 10 // 10 minutes
    });
    
    return response;
  } catch (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login?error=oauth_failed`);
  }
} 