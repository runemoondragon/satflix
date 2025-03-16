'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Movie {
  id: string;
  title: string;
  overview: string;
  rating: string;
  quality: string;
  thumbnailUrl: string;
  backgroundUrl: string;
  genre: string;
  released: string;
  duration: string;
  country: string;
  casts: string;
  watchLink: string;
  production?: string;
}

interface LikeProps {
  currentMovie: Movie;
  excludeCurrentMovie: boolean;
}

export default function Like({ currentMovie, excludeCurrentMovie }: LikeProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/movies')
        if (!res.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data = await res.json()

        if (!Array.isArray(data)) {
          throw new Error('Invalid response format')
        }

        // Filter movies by date range (2010-2025)
        const recentMovies = data.filter(movie => {
          const releaseYear = movie.released ? new Date(movie.released).getFullYear() : 0;
          return releaseYear >= 2000 && releaseYear <= 2025;
        });

        // Progressive filtering
        let filteredMovies: Movie[] = []
        const targetCount = 10

        // Step 1: Exact matches (same genre and similar rating)
        filteredMovies = recentMovies.filter(movie => {
          if (excludeCurrentMovie && movie.id === currentMovie.id) return false
          
          // Match genre
          if (!movie.genre?.includes(currentMovie.genre)) return false
          
          // Match rating within ±0.5
          const currentRating = parseFloat(currentMovie.rating)
          const movieRating = parseFloat(movie.rating)
          if (Math.abs(currentRating - movieRating) > 0.5) return false
          
          return true
        })

        // Step 2: If needed, add movies with same genre but wider rating range
        if (filteredMovies.length < targetCount) {
          const remainingCount = targetCount - filteredMovies.length
          const sameGenreMovies = recentMovies.filter(movie => {
            if (excludeCurrentMovie && movie.id === currentMovie.id) return false
            if (filteredMovies.some(m => m.id === movie.id)) return false
            return movie.genre?.includes(currentMovie.genre)
          }).slice(0, remainingCount)

          filteredMovies = [...filteredMovies, ...sameGenreMovies]
        }

        // Step 3: If still needed, add movies with similar rating
        if (filteredMovies.length < targetCount) {
          const remainingCount = targetCount - filteredMovies.length
          const similarRatingMovies = recentMovies.filter(movie => {
            if (excludeCurrentMovie && movie.id === currentMovie.id) return false
            if (filteredMovies.some(m => m.id === movie.id)) return false
            
            const currentRating = parseFloat(currentMovie.rating)
            const movieRating = parseFloat(movie.rating)
            return Math.abs(currentRating - movieRating) <= 1
          }).slice(0, remainingCount)

          filteredMovies = [...filteredMovies, ...similarRatingMovies]
        }

        // Step 4: If still not enough, add any remaining movies
        if (filteredMovies.length < targetCount) {
          const remainingCount = targetCount - filteredMovies.length
          const anyMovies = recentMovies.filter(movie => {
            if (excludeCurrentMovie && movie.id === currentMovie.id) return false
            return !filteredMovies.some(m => m.id === movie.id)
          }).slice(0, remainingCount)

          filteredMovies = [...filteredMovies, ...anyMovies]
        }

        setMovies(filteredMovies.slice(0, targetCount))
      } catch (error) {
        console.error('Error fetching similar movies:', error)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarMovies()
  }, [currentMovie, excludeCurrentMovie])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.jpg'
  }

  return (
    <div className="relative pb-20">
      <h2 className="text-xl font-semibold mb-6 text-white">You May Also Like</h2>
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => router.push(`/movie/${encodeURIComponent(movie.title)}`)}
              className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 focus:outline-none cursor-pointer"
              style={{ width: '183px', height: '253px' }}
            >
              <div className="relative w-full h-full">
                {movie.thumbnailUrl ? (
                  <img 
                    src={movie.thumbnailUrl}
                    alt={movie.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-md">
                    <span className="text-gray-400 text-xs">No Image</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 flex flex-col justify-end">
                  <h3 className="text-white text-xs font-medium truncate mb-1">{movie.title}</h3>
                  <div className="flex items-center justify-between text-gray-300 text-[10px] mt-1">
                    <span>{movie.genre || 'Unknown'}</span>
                    <span>{movie.released ? new Date(movie.released).getFullYear() : 'N/A'}</span>
                  </div>
                  {movie.rating && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                      ★ {movie.rating}
                    </div>
                  )}
                  {movie.quality && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                      {movie.quality}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
          <p className="text-sm">No similar movies found</p>
        </div>
      )}
    </div>
  )
}