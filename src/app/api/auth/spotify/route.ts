import { NextResponse } from 'next/server';

const SPOTIFY_CLIENT_ID = 'dd586b55363145358eda9fd7d837f2dd';
const SPOTIFY_REDIRECT_URI = 'https://localhost:3000/api/auth/spotify/callback';

export async function GET() {
  const scope = 'user-read-email user-read-private';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scope)}`;
  return NextResponse.redirect(authUrl);
}
