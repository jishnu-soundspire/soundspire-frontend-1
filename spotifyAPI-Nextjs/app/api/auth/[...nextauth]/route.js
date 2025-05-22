/**
 * NextAuth configuration for Spotify OAuth authentication.
 * This file sets up the authentication flow with Spotify's OAuth service,
 * handling token management and session configuration.
 */

import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

// Define required Spotify API permission scopes
const scopes = [
  'user-read-email',            // Read user's email address
  'playlist-read-private',       // Access user's private playlists
  'playlist-read-collaborative', // Access user's collaborative playlists
  'user-read-currently-playing', // Read user's currently playing track
  'user-read-playback-state'    // Read user's playback state
].join(' ');

// Configuration options for NextAuth
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'your-default-secret-do-not-use-in-production',
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    },
    state: {
      name: 'next-auth.state',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(scopes)}`
    })
  ],
  // Callback functions to handle authentication flow
  callbacks: {
    // Callback to handle JWT token creation and updates
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }
      return token;
    },
    // Callback to customize session object
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };