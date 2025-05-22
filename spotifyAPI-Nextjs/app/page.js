
'use client';

/**
 * Home page component that integrates with Spotify API to display user's playlists.
 * Handles authentication state and playlist data fetching.
 */

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

// Initialize Spotify Web API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

/**
 * Home component that serves as the main page of the application.
 * Manages authentication state and displays either a login button or user's playlists.
 */
export default function Home() {
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);

  // Fetch user's playlists when session is available
  useEffect(() => {
    if (session && session.accessToken) {
      spotifyApi.setAccessToken(session.accessToken);
      spotifyApi.getUserPlaylists().then(
        function(data) {
          setPlaylists(data.body.items);
        },
        function(err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }, [session]);

  // Show login screen if user is not authenticated
  if (!session) {
    // Show user's playlists and profile information when authenticated
  return (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Welcome to Spotify Integration</h1>
        <button
          onClick={() => signIn('spotify')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in with Spotify
        </button>
      </div>
    );
  }

  // Show user's playlists and profile information when authenticated
  return (
    <div className="min-h-screen p-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <img
              src={playlist.images[0]?.url || '/placeholder.png'}
              alt={playlist.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{playlist.name}</h2>
            <p className="text-gray-400">{playlist.tracks.total} tracks</p>
          </div>
        ))}
      </div>
    </div>
  );
}
