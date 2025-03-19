'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Home, Film, Tv, Search, Filter, ChevronDown, Menu, X } from 'lucide-react';
import SearchResults from './SearchResults';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';

const GENRES = [
  'Action', 'Action & Adventure', 'Adventure', 'Animation', 'Biography', 
  'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Kids', 'Music', 'Mystery', 'News', 'Reality', 'Romance',
  'Sci-Fi & Fantasy', 'Science Fiction', 'Soap', 'Talk', 'Thriller',
  'TV Movie', 'War', 'War & Politics', 'Western'
];

const QUALITY_OPTIONS = ['HD', '4K', 'SD'];
const RATING_OPTIONS = ['9+', '8+', '7+', '6+', '5+'];
const YEARS = Array.from({ length: 25 }, (_, i) => (new Date().getFullYear() - i).toString());

interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string;
  rating: string;
  released: string;
}

export default function Navigation() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState({
    genre: '',
    quality: '',
    rating: '',
    year: ''
  });

  // Handle click outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        const response = await fetch(`/api/movies?q=${encodeURIComponent(query)}&limit=5`);
        if (!response.ok) throw new Error('Search failed');
        
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    []
  );

  // Handle search input
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    
    if (value.trim()) {
      setIsSearching(true);
      debouncedSearch(value);
    } else {
      setSearchResults([]);
    }
  };

  // Handle movie selection
  const handleMovieSelect = (movie: Movie) => {
    setSearch('');
    setSearchResults([]);
    // Use the movie title for navigation with the correct URL format
    const encodedTitle = encodeURIComponent(movie.title);
    router.push(`/movie/${encodedTitle}`);
  };

  // Apply filters and search with debounce
  useEffect(() => {
    const applyFilters = () => {
      const formattedFilters = {
        ...filters,
        genre: filters.genre,
        quality: filters.quality.toUpperCase(),
        rating: filters.rating ? filters.rating.replace(/[^0-9]/g, '') : '',
        year: filters.year
      };

      const event = new CustomEvent('updateFilters', {
        detail: { 
          filters: formattedFilters
        }
      });
      window.dispatchEvent(event);
    };

    const debounceTimer = setTimeout(applyFilters, 300);
    return () => clearTimeout(debounceTimer);
  }, [filters]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const filterButton = document.getElementById('filter-button');
      const filterDropdown = document.getElementById('filter-dropdown');
      
      if (isFilterOpen && filterButton && filterDropdown) {
        if (!filterButton.contains(event.target as Node) && !filterDropdown.contains(event.target as Node)) {
          setIsFilterOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  // Handle click outside mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 text-xs">
            <Link href="/" className="hover:text-orange-500 transition-colors flex items-center gap-2">
              <Home className="w-3 h-3" />
              <span>Home</span>
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2">
              <Film className="w-3 h-3" />
              <span>Movies</span>
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors flex items-center gap-2">
              <Tv className="w-3 h-3" />
              <span>TV Shows</span>
            </Link>
          </div>

          {/* Search and Filter Section */}
          <div className="flex items-center gap-2 flex-1 md:flex-none md:ml-6 justify-end md:justify-start">
            <div className="relative w-full max-w-[200px] md:w-64" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search titles..."
                value={search}
                onChange={handleSearchInput}
                className="w-full bg-gray-800/50 text-xs pl-8 pr-4 py-1.5 rounded-full border border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
              />
              {(isSearching || searchResults.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-400">
                      <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                      <p className="mt-2 text-xs">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => handleMovieSelect(movie)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-800 transition-colors flex items-center gap-3"
                        >
                          <div className="relative w-8 h-12 flex-shrink-0">
                            <img
                              src={movie.thumbnailUrl || '/placeholder.jpg'}
                              alt={movie.title}
                              className="absolute inset-0 w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-xs font-medium text-white truncate">{movie.title}</h4>
                            <p className="text-xs text-gray-400 truncate">{movie.genre}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-orange-500">★ {movie.rating}</span>
                              <span className="text-xs text-gray-400">{movie.released}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                id="filter-button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 text-xs bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700 hover:border-orange-500 transition-colors"
              >
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline">Filters</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div id="filter-dropdown" className="absolute right-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-4 text-xs">
                  {/* Genre Filter */}
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Genre</label>
                    <select
                      value={filters.genre}
                      onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
                      className="w-full bg-gray-800 rounded-md px-2 py-1.5 border border-gray-700 focus:border-orange-500 transition-colors"
                    >
                      <option value="">All Genres</option>
                      {GENRES.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Year</label>
                    <select
                      value={filters.year}
                      onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                      className="w-full bg-gray-800 rounded-md px-2 py-1.5 border border-gray-700 focus:border-orange-500 transition-colors"
                    >
                      <option value="">All Years</option>
                      {YEARS.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quality Filter */}
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Quality</label>
                    <div className="flex gap-2">
                      {QUALITY_OPTIONS.map((quality) => (
                        <button
                          key={quality}
                          onClick={() => setFilters({ ...filters, quality: filters.quality === quality ? '' : quality })}
                          className={`px-2 py-1 rounded-md border ${
                            filters.quality === quality
                              ? 'bg-orange-500 border-orange-600'
                              : 'bg-gray-800 border-gray-700 hover:border-orange-500'
                          } transition-colors`}
                        >
                          {quality}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mb-4">
                    <label className="block text-gray-400 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {RATING_OPTIONS.map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setFilters({ ...filters, rating: filters.rating === rating ? '' : rating })}
                          className={`px-2 py-1 rounded-md border ${
                            filters.rating === rating
                              ? 'bg-orange-500 border-orange-600'
                              : 'bg-gray-800 border-gray-700 hover:border-orange-500'
                          } transition-colors`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                  <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-center py-1.5 rounded-md transition-colors"
                    >
                      Filter
                    </button>
                    <button
                      onClick={() => setFilters({ genre: '', quality: '', rating: '', year: '' })}
                      className="flex-1 bg-gray-800 hover:bg-gray-700 text-center py-1.5 rounded-md transition-colors"
                    >
                      Reset Filters
                    </button>
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          className={`
            fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            w-64 bg-gray-900 shadow-lg transition-transform duration-200 ease-in-out z-50 md:hidden
          `}
        >
          <div className="p-4 space-y-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Film className="w-4 h-4" />
              <span>Movies</span>
            </Link>
            <Link 
              href="#" 
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Tv className="w-4 h-4" />
              <span>TV Shows</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </nav>
  );
}
