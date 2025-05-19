import { NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = 'dd586b55363145358eda9fd7d837f2dd';
const SPOTIFY_CLIENT_SECRET = '0bae8f6a1bf5433db0d43739830441db';
const SPOTIFY_REDIRECT_URI = 'https://localhost:3000/api/auth/spotify/callback';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/');
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: SPOTIFY_REDIRECT_URI,
      }),
    });

    const data = await tokenResponse.json();
    // Here you would typically store the token and user info in your session or database
    // For now, we'll just redirect to the home page
    return NextResponse.redirect('/');
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.redirect('/');
  }
}
