'use client';

import Navbar from '@/components/Navbar';
import Carousel from '@/components/Carousel';
import ArtistCard from '@/components/ArtistCard';
import ReviewCard from '@/components/ReviewCard';
import GenreCard from '@/components/GenreCard';

// ... (keep all the existing dummy data)

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-20 pb-12">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search for artists, albums, or songs..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-200"
          />
        </div>

        {/* Featured Carousel */}
        <section className="mb-12">
          <div className="mx-40">
            <Carousel images={[
              '/images/placeholder.jpg',
              '/images/placeholder.jpg', 
              '/images/placeholder.jpg'
            ]} />
          </div>
        </section>

        {/* Suggested Artists */}
        <section className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">
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
          <h2 className="text-2xl font-bold mb-6 text-white">
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
                reviewText: "Amazing work",
                rating: 5.0
              }
            ].map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </section>

        {/* Genres */}
        <section className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">
            Popular Genres
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Pop", imageUrl: "/images/placeholder.jpg" },
              { name: "Rock", imageUrl: "/images/placeholder.jpg" },
              { name: "Hip Hop", imageUrl: "/images/placeholder.jpg" },
              { name: "R&B", imageUrl: "/images/placeholder.jpg" },
              { name: "Electronic", imageUrl: "/images/placeholder.jpg" },
              { name: "Jazz", imageUrl: "/images/placeholder.jpg" },
              { name: "Classical", imageUrl: "/images/placeholder.jpg" },
              { name: "Country", imageUrl: "/images/placeholder.jpg" },
              { name: "Metal", imageUrl: "/images/placeholder.jpg" },
              { name: "Folk", imageUrl: "/images/placeholder.jpg" },
              { name: "Blues", imageUrl: "/images/placeholder.jpg" },
              { name: "Reggae", imageUrl: "/images/placeholder.jpg" }
            ].map((genre, index) => (
              <GenreCard key={index} {...genre} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 