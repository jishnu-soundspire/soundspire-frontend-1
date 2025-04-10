'use client';

import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { FaSpotify, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isDarkMode } = useTheme();
  const { login, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/explore');
    }
  }, [user, router]);

  const handleGoogleLogin = async () => {
    try {
      await login('google');
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleSpotifyLogin = async () => {
    try {
      await login('spotify');
    } catch (error) {
      console.error('Spotify login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* For Artists Button */}
      <div className="absolute top-4 right-4">
        <button className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-colors duration-200">
          For Artists
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            SoundSpire
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Your music discovery platform
          </p>
        </div>

        {/* Login Options */}
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={handleSpotifyLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#1DB954] hover:bg-[#1DB954]/90 text-white font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSpotify className="text-xl" />
            {isLoading ? 'Loading...' : 'Continue with Spotify'}
          </button>

          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-gray-700 font-semibold border border-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaGoogle className="text-xl" />
            {isLoading ? 'Loading...' : 'Continue with Google'}
          </button>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          By continuing, you agree to SoundSpire's{' '}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}
