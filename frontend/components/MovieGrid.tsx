'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Image from 'next/image'
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
  const [sections, setSections] = useState<MovieSection[]>(() => {
    // Try to get initial data from cookie
    const cachedData = Cookies.get('movieSections')
    if (cachedData) {
      try {
        return JSON.parse(cachedData)
      } catch (e) {
        console.error('Error parsing cached movie data:', e)
      }
    }
    
    // Default sections if no cache
    return [
      { title: 'New Releases', movies: [], loading: true },
      { title: 'Top Searches', movies: [], loading: true },
      { title: 'Action Movies', movies: [], loading: true },
      { title: 'Drama Movies', movies: [], loading: true },
      { title: 'Top Rated', movies: [], loading: true }
    ]
  });
  
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
          // Apply user filters without date restriction for searches
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
            
            // Apply date restriction for all sections
            availableMovies = availableMovies.filter(movie => {
              const releaseYear = movie.released ? new Date(movie.released).getFullYear() : 0;
              return releaseYear >= 2015 && releaseYear <= 2025;
            });
            
            let filteredMovies: Movie[] = []

            switch (section.title) {
              case 'New Releases':
                filteredMovies = availableMovies
                  .filter(movie => !movie.genre?.includes('Horror'))
                  .sort((a, b) => {
                    // First sort by date (newest first)
                    const dateComparison = new Date(b.released).getTime() - new Date(a.released).getTime();
                    
                    // If dates are equal, sort by rating (highest first)
                    if (dateComparison === 0) {
                      return (parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
                    }
                    
                    return dateComparison;
                  })
                  .slice(0, 14)
                break;
              case 'Top Searches':
                filteredMovies = availableMovies
                  .sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime()) // Sort by newest first
                  .slice(0, 21)
                break;
              case 'Action Movies':
                filteredMovies = availableMovies
                  .filter(movie => movie.genre?.includes('Action'))
                  .sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime()) // Sort by newest first
                  .slice(0, 21)
                break;
              case 'Drama Movies':
                filteredMovies = availableMovies
                  .filter(movie => movie.genre?.includes('Drama'))
                  .sort((a, b) => new Date(b.released).getTime() - new Date(a.released).getTime()) // Sort by newest first
                  .slice(0, 21)
                break;
              case 'Top Rated':
                filteredMovies = availableMovies
                  .sort((a, b) => {
                    // First sort by rating
                    const ratingDiff = parseFloat(b.rating || '0') - parseFloat(a.rating || '0');
                    
                    // If ratings are equal, sort by date (newest first)
                    if (ratingDiff === 0) {
                      return new Date(b.released).getTime() - new Date(a.released).getTime();
                    }
                    
                    return ratingDiff;
                  })
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
          
          // Save to cookie if not using filters
          if (!isFilterActive) {
            try {
              Cookies.set('movieSections', JSON.stringify(updatedSections), {
                expires: 1/24, // Expires in 1 hour
                sameSite: 'strict'
              })
            } catch (e) {
              console.error('Error caching movie data:', e)
            }
          }
          
          setSections(updatedSections)
        }
      } catch (error) {
        console.error("Error fetching movies:", error)
        
        // If error occurs and we have cached data, keep using it
        const cachedData = Cookies.get('movieSections')
        if (cachedData && !isFilterActive) {
          try {
            const parsedCache = JSON.parse(cachedData)
            setSections(parsedCache)
          } catch (e) {
            console.error('Error parsing cached movie data:', e)
          }
        }
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
      className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 focus:outline-none cursor-pointer w-[140px] sm:w-[160px] md:w-[183px] h-[200px] sm:h-[220px] md:h-[253px]"
    >
      <div className="relative w-full h-full">
        {movie.thumbnailUrl ? (
          <img
            src={`https://vooomo.com/api/proxy-image?url=${encodeURIComponent(movie.thumbnailUrl)}`}
            alt={movie.title}
            onError={handleImageError}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded-md">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-2 left-2 right-2">
            <h3 className="text-white text-xs sm:text-sm font-medium line-clamp-2 mb-1">{movie.title}</h3>
            <div className="flex flex-wrap gap-1">
              {movie.rating && (
                <span className="bg-orange-500/90 text-white px-1 py-0.5 rounded text-[8px] sm:text-[10px]">
                  ★ {movie.rating}
                </span>
              )}
              {movie.quality && (
                <span className="bg-blue-500/90 text-white px-1 py-0.5 rounded text-[8px] sm:text-[10px]">
                  {movie.quality}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {isFilterActive ? (
        // Filtered View
        <div className="space-y-6">
          <h2 className="text-lg md:text-xl font-semibold">Search Results</h2>
          {filteredMovies.length > 0 ? (
            <div className="overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 justify-items-center">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No movies found matching your filters.</p>
          )}
        </div>
      ) : (
        // Categorized View
        <div className="space-y-8">
          {sections.map(section => (
            <div key={section.title} className="space-y-4">
              <h2 className="text-lg md:text-xl font-semibold">{section.title}</h2>
              {section.loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              ) : (
                <div className="overflow-hidden">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 md:gap-4 justify-items-center">
                    {section.movies.map(movie => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
