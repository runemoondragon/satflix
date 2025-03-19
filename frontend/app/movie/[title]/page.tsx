'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Play, Star, Clock, Globe, Users, ChevronLeft, Camera} from 'lucide-react';
import Like from './like';
import Footer from '../../../components/Footer';

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

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const rawTitle = Array.isArray(params?.title) ? params.title[0] : params?.title || "";
  const formattedTitle = decodeURIComponent(rawTitle).replace(/-/g, " ");

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (!formattedTitle) return;

    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`/api/movie?title=${encodeURIComponent(formattedTitle)}`);
        if (!res.ok) {
          throw new Error("Movie not found");
        }
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [formattedTitle]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black/50">
        <div className="space-y-2 text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-xs">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-black/50">
        <h1 className="text-gray-400 text-sm mb-4">Movie not found</h1>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-xs text-white bg-gray-800/50 px-4 py-2 rounded-full hover:bg-gray-700/50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(https://vooomo.com/api/proxy-image?url=${encodeURIComponent(movie.backgroundUrl)})` }}
      />

      {/* Content Container */}
      <div className="w-full flex-1 flex flex-col items-center px-6 py-8">
        {/* Movie Content Card */}
        <div className="relative z-5 flex flex-col md:flex-row gap-8 w-4/5 max-w-[1000px] bg-black/60 p-6 rounded-lg shadow-lg backdrop-blur-sm">
          {/* Poster */}
          <div className="md:w-1/4">
            <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={`https://vooomo.com/api/proxy-image?url=${encodeURIComponent(movie.thumbnailUrl)}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Movie Details */}
          <div className="flex-1 space-y-4">
            {/* Title and Tags */}
            <div className="space-y-3">
              <h1 className="text-xl md:text-3xl font-bold">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 text-[10px]">
                {movie.quality && (
                  <span className="bg-blue-500 text-white px-2 py-0.5 rounded">
                    {movie.quality}
                  </span>
                )}
                {movie.genre && (
                  <span className="bg-gray-800 text-white px-2 py-0.5 rounded">
                    {movie.genre}
                  </span>
                )}
                {movie.rating && (
                  <span className="bg-orange-500 text-white px-2 py-0.5 rounded flex items-center gap-1">
                    ★ {movie.rating}
                  </span>
                )}
              </div>
            </div>

            {/* Overview */}
            <div className="grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
              <h4 className="text-xs font-medium text-gray-200">Overview</h4>
              <p className="text-gray-200">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Movie Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[10px]">
              {movie.released && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-200" />
                  <div>
                    <p className="text-gray-200">Release Date</p>
                    <p className="text-gray-200">
                      {new Date(movie.released).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              {movie.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-200" />
                  <div>
                    <p className="text-gray-200">Duration</p>
                    <p className="text-gray-200">{movie.duration} min</p>
                  </div>
                </div>
              )}
              {movie.country && (
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-gray-200" />
                  <div>
                    <p className="text-gray-200">Country</p>
                    <p className="text-gray-200">{movie.country}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="grid-cols-2 sm:grid-cols-4 gap-4 text-[10px]">
              <h3 className="text-xs font-medium text-gray-200">Cast</h3>
              <p className="text-gray-200">
                {movie.casts || 'No overview available.'}
              </p>
            </div>

            <div className="grid-cols-2 sm:grid-cols-4 gap-4 text-[10px]">
              <h3 className="text-xs font-medium text-gray-200">Prodaction</h3>
              <p className="text-gray-200">
                {movie.production || 'No Prodaction available.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              {movie?.watchLink && movie?.id ? (
                <button
                  onClick={async () => {
                    try {
                      setPaymentLoading(true);

                      // Pre-validate data before making the request
                      if (!movie.id || !movie.title || !movie.watchLink) {
                        throw new Error('Missing movie data');
                      }

                      // Prepare request data
                      const paymentData = {
                        movieId: movie.id,
                        movieTitle: movie.title,
                        amount: '0.30',
                        currency: 'USD',
                        watchLink: movie.watchLink
                      };

                      // Use AbortController for timeout
                      const controller = new AbortController();
                      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

                      const response = await fetch('/api/payments', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(paymentData),
                        signal: controller.signal
                      });

                      clearTimeout(timeoutId);

                      if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Failed to create invoice');
                      }

                      const data = await response.json();
                      
                      if (!data.checkoutLink) {
                        throw new Error('No checkout link received');
                      }

                      // Preload the checkout page
                      const preloadLink = document.createElement('link');
                      preloadLink.rel = 'preload';
                      preloadLink.as = 'document';
                      preloadLink.href = data.checkoutLink;
                      document.head.appendChild(preloadLink);

                      // Short delay to allow preload to start
                      await new Promise(resolve => setTimeout(resolve, 100));

                      // Redirect to checkout
                      window.location.href = data.checkoutLink;
                    } catch (error: any) {
                      console.error('Payment error:', error);
                      alert(error.message || 'Failed to initiate payment. Please try again.');
                    } finally {
                      setPaymentLoading(false);
                    }
                  }}
                  disabled={paymentLoading}
                  className={`flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-xs font-medium transition-all shadow-lg ${paymentLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{
                    minWidth: "140px",
                    minHeight: "40px",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#ff7f1e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    cursor: paymentLoading ? "not-allowed" : "pointer",
                  }}
                >
                  {paymentLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Watch Now
                    </>
                  )}
                </button>
              ) : (
                <div className="text-gray-400 text-xs">Loading payment options...</div>
              )}
            </div>
          </div>
        </div>

        {/* Like component */}
        <div className="relative z-4 w-4/5 max-w-[1000px] mt-5">
          {movie && <Like currentMovie={movie} excludeCurrentMovie={true} />}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-5 w-full">
        <Footer />
      </div>
    </div>
  );
}

