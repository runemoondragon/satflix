import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Movie {
  id: string;
  title: string;
  thumbnailUrl: string;
  genre: string;
  rating: string;
  released: string;
}

interface SearchResultsProps {
  results: Movie[];
  isLoading: boolean;
  onClose: () => void;
}

export default function SearchResults({ results, isLoading, onClose }: SearchResultsProps) {
  if (!isLoading && results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
      {isLoading ? (
        <div className="p-4 text-center text-gray-400">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent rounded-full" />
          <p className="mt-2 text-sm">Searching...</p>
        </div>
      ) : (
        <div className="py-2">
          {results.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors"
              onClick={onClose}
            >
              <div className="relative w-12 h-16 flex-shrink-0">
                <Image
                  src={movie.thumbnailUrl || '/placeholder.jpg'}
                  alt={movie.title}
                  fill
                  className="object-cover rounded"
                  sizes="48px"
                />
              </div>
              <div className="flex-grow min-w-0">
                <h4 className="text-sm font-medium text-white truncate">{movie.title}</h4>
                <p className="text-xs text-gray-400 truncate">{movie.genre}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-orange-500">★ {movie.rating}</span>
                  <span className="text-xs text-gray-400">{movie.released}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 