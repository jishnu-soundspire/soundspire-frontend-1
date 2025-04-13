'use client';

import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Carousel from '@/components/Carousel';
import ArtistCard from '@/components/ArtistCard';
import ReviewCard from '@/components/ReviewCard';
import GenreCard from '@/components/GenreCard';

// ... (keep all the existing dummy data)

export default function ExplorePage() {
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
        <section className="mb-12">
          <div className="mx-40">
            <Carousel images={[
              '/images/placeholder.jpg',
              '/images/placeholder.jpg', 
              '/images/placeholder  .jpg'
            ]} />
          </div>
        </section>

        {/* Suggested Artists */}
        <section className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-200">
            Suggested Artists
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {[
              {
                name: "Artist 1",
                imageUrl: "/images/placeholder.jpg",
                followers: 1000000,
                genres: ["Pop", "R&B"]
              },
              {
                name: "Artist 2", 
                imageUrl: "/images/placeholder.jpg",
                followers: 750000,
                genres: ["Rock", "Alternative"]
              },
              {
                name: "Artist 3",
                imageUrl: "/images/placeholder.jpg", 
                followers: 500000,
                genres: ["Hip Hop", "Rap"]
              }
            ].map((artist: {
              name: string;
              imageUrl: string;
              followers: number;
              genres: string[];
            }, index: number) => (
              <ArtistCard key={index} {...artist} />
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-200">
            Latest Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                albumName: "Album 1",
                artistName: "Artist 1",
                coverImage: "/images/placeholder.jpg",
                reviewText: "Great album!",
                rating: 4.5
              },
              {
                albumName: "Album 2",
                artistName: "Artist 2", 
                coverImage: "/images/placeholder.jpg",
                reviewText: "Solid release",
                rating: 4.0
              },
              {
                albumName: "Album 3",
                artistName: "Artist 3",
                coverImage: "/images/placeholder.jpg",
                reviewText: "Masterpiece",
                rating: 5.0
              }
            ].map((review: {
              albumName: string;
              artistName: string;
              coverImage: string;
              reviewText: string;
              rating: number;
            }, index: number) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>

        {/* Discover by Genre */}
        <section className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white transition-colors duration-200">
            Discover by Genre
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Rock",
                imageUrl: "/images/placeholder.jpg",
                color: "bg-red-500"
              },
              {
                name: "Hip Hop",
                imageUrl: "/images/placeholder.jpg",
                color: "bg-blue-500"
              },
              {
                name: "Jazz",
                imageUrl: "/images/placeholder.jpg",
                color: "bg-yellow-500"
              },
              {
                name: "Electronic",
                imageUrl: "/images/placeholder.jpg",
                color: "bg-purple-500"
              }
            ].map((genre: {
              name: string;
              imageUrl: string;
              color: string;
            }, index: number) => (
              <GenreCard key={index} {...genre} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 