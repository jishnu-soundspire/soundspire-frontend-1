'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/Carousel';
import ArtistCard from '@/components/ArtistCard';
import ReviewCard from '@/components/ReviewCard';
import GenreCard from '@/components/GenreCard';

// Dummy data for demonstration
const carouselImages = [
  '/images/placeholder.jpg',
  '/images/placeholder.jpg',
  '/images/placeholder.jpg',
  '/images/placeholder.jpg',
];

const suggestedArtists = [
  { name: 'Artist 1', imageUrl: '/images/placeholder.jpg', genre: 'Pop' },
  { name: 'Artist 2', imageUrl: '/images/placeholder.jpg', genre: 'Rock' },
  { name: 'Artist 3', imageUrl: '/images/placeholder.jpg', genre: 'Jazz' },
  { name: 'Artist 4', imageUrl: '/images/placeholder.jpg', genre: 'Hip Hop' },
  { name: 'Artist 5', imageUrl: '/images/placeholder.jpg', genre: 'Electronic' },
  { name: 'Artist 6', imageUrl: '/images/placeholder.jpg', genre: 'Classical' },
  { name: 'Artist 7', imageUrl: '/images/placeholder.jpg', genre: 'R&B' },
];

const reviews = [
  {
    albumName: 'Album 1',
    artistName: 'Artist 1',
    coverImage: '/images/placeholder.jpg',
    rating: 4.5,
    reviewText: 'An amazing album that pushes boundaries...',
  },
  {
    albumName: 'Album 2',
    artistName: 'Artist 2',
    coverImage: '/images/placeholder.jpg',
    rating: 4.0,
    reviewText: 'A solid release with memorable tracks...',
  },
  {
    albumName: 'Album 3',
    artistName: 'Artist 3',
    coverImage: '/images/placeholder.jpg',
    rating: 4.8,
    reviewText: 'A masterpiece that defines the genre...',
  },
  {
    albumName: 'Album 4',
    artistName: 'Artist 4',
    coverImage: '/images/placeholder.jpg',
    rating: 4.2,
    reviewText: 'An innovative approach to modern music...',
  },
];

const genres = [
  { name: 'Pop', imageUrl: '/images/placeholder.jpg', color: '#FF4081' },
  { name: 'Rock', imageUrl: '/images/placeholder.jpg', color: '#7C4DFF' },
  { name: 'Hip Hop', imageUrl: '/images/placeholder.jpg', color: '#FF6E40' },
  { name: 'Electronic', imageUrl: '/images/placeholder.jpg', color: '#18FFFF' },
  { name: 'Jazz', imageUrl: '/images/placeholder.jpg', color: '#69F0AE' },
  { name: 'Classical', imageUrl: '/images/placeholder.jpg', color: '#FFD740' },
  { name: 'R&B', imageUrl: '/images/placeholder.jpg', color: '#E040FB' },
  { name: 'Metal', imageUrl: '/images/placeholder.jpg', color: '#FF5252' },
  { name: 'Folk', imageUrl: '/images/placeholder.jpg', color: '#8D6E63' },
];

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for artists, albums, or songs..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
          />
        </div>

        {/* Featured Carousel */}
        <section className="mb-12 mx-40">
          <Carousel images={carouselImages} />
        </section>

        {/* Suggested Artists */}
        <section className="mb-12 mx-5">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-200">
            Suggested Artists
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {suggestedArtists.map((artist, index) => (
              <ArtistCard key={index} {...artist} />
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-12 mx-5">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-200">
            Latest Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>

        {/* Discover by Genre */}
        <section className="mb-12 mx-5">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-200">
            Discover by Genre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre, index) => (
              <GenreCard key={index} {...genre} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
