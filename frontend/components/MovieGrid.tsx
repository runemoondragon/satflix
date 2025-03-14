'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Movie {
  id: string;
  title: string;
  released: string;
  thumbnailUrl: string;
  genre?: string;
  quality?: string;
  rating?: string;
}

interface MovieSection {
  title: string;
  movies: Movie[];
  loading: boolean;
}

interface Filters {
  genre: string;
  quality: string;
  rating: string;
  year: string;
}

export default function MovieGrid() {
  const [sections, setSections] = useState<MovieSection[]>([
    { title: 'New Releases', movies: [], loading: true },
    { title: 'Top Searches', movies: [], loading: true },
    { title: 'Action Movies', movies: [], loading: true },
    { title: 'Drama Movies', movies: [], loading: true },
    { title: 'Top Rated', movies: [], loading: true }
  ]);
  
  const [activeFilters, setActiveFilters] = useState<Filters>({
    genre: '',
    quality: '',
    rating: '',
    year: ''
  });

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter()

  useEffect(() => {
    // Listen for filter updates from Navigation component
    const handleNavigation = (e: CustomEvent) => {
      const newFilters = e.detail?.filters as Filters
      if (newFilters) {
        setActiveFilters(newFilters)
        setIsFilterActive(Object.values(newFilters).some(value => value !== ''))
      }
    }

    window.addEventListener('updateFilters' as any, handleNavigation)
    return () => window.removeEventListener('updateFilters' as any, handleNavigation)
  }, [])

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/movies')
        if (!res.ok) throw new Error('Failed to fetch movies')
        const allMovies = await res.json()
        
        if (!Array.isArray(allMovies)) {
          throw new Error('Invalid response format')
        }

        if (isFilterActive) {
          // Apply user filters
          const filtered = allMovies.filter(movie => {
            if (activeFilters.genre && !movie.genre?.includes(activeFilters.genre)) {
              return false;
            }
            if (activeFilters.quality && movie.quality !== activeFilters.quality) {
              return false;
            }
            if (activeFilters.rating) {
              const minRating = parseFloat(activeFilters.rating)
              const movieRating = parseFloat(movie.rating || '0')
              if (isNaN(movieRating) || movieRating < minRating) {
                return false;
              }
            }
            if (activeFilters.year) {
              const movieYear = movie.released ? new Date(movie.released).getFullYear().toString() : ''
              if (movieYear !== activeFilters.year) {
                return false;
              }
            }
            return true;
          });
          setFilteredMovies(filtered)
        } else {
          // Use categorized view
          const usedMovieIds = new Set<string>()
          const updatedSections = sections.map(section => {
            let availableMovies = allMovies.filter(movie => !usedMovieIds.has(movie.id))
            let filteredMovies: Movie[] = []

            switch (section.title) {
              case 'New Releases':
                filteredMovies = availableMovies
                  .sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime())
                  .slice(0, 14)
                break;
              case 'Top Searches':
                filteredMovies = availableMovies.slice(0, 21)
                break;
              case 'Action Movies':
                filteredMovies = availableMovies
                  .filter(movie => movie.genre?.includes('Action'))
                  .slice(0, 21)
                break;
              case 'Drama Movies':
                filteredMovies = availableMovies
                  .filter(movie => movie.genre?.includes('Drama'))
                  .slice(0, 21)
                break;
              case 'Top Rated':
                filteredMovies = availableMovies
                  .sort((a, b) => (parseFloat(b.rating || '0') - parseFloat(a.rating || '0')))
                  .slice(0, 21)
                break;
            }

            filteredMovies.forEach(movie => usedMovieIds.add(movie.id))
            return {
              ...section,
              movies: filteredMovies,
              loading: false
            }
          })
          setSections(updatedSections)
        }
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [activeFilters, isFilterActive])

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/placeholder.jpg'
  }

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <div
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
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (isFilterActive) {
    return (
      <div className="py-8 px-8">
        <h2 className="text-xl font-semibold mb-6 text-white">Search Results</h2>
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-7 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[253px] text-gray-500">
            <p className="text-sm">No movies found matching your filters</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-12 py-8">
      {sections.map((section) => (
        <div key={section.title} className="px-8">
          <h2 className="text-xl font-semibold mb-6 text-white">{section.title}</h2>
          {section.loading ? (
            <div className="flex justify-center items-center h-[253px]">
              <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : section.movies.length > 0 ? (
            <div className="grid grid-cols-7 gap-4">
              {section.movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[253px] text-gray-500">
              <p className="text-sm">No movies found in this category</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}