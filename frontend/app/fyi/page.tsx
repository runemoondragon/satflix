'use client';

import React from 'react';
import { ArrowLeft, Shield, X, MousePointer, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FYI() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-10 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <h1 className="text-orange-500 font-bold">BTIFLIX</h1>
        </div>
      </div>

      {/* FYI Content */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        <article className="prose prose-orange mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            FYI: How Our Redirection System Works & Why You Need Us
          </h1>

          <div className="bg-orange-50 border border-orange-100 rounded-lg p-6 mb-8">
            <p className="text-gray-700">
            When you access a movie through our platform, we redirect you directly to the movie player on a third-party site, bypassing the layers of intrusive ads, trackers, and spam that usually make accessing free streaming content frustrating.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Why This Matters</h2>
            <p className="text-gray-600 mb-6">
              Most free streaming sites are filled with:
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="p-2 bg-red-100 rounded-lg">
                  <X className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Endless Pop-Ups & Ads</h3>
                  <p className="text-sm text-gray-600">Slowing down your browsing experience and making navigation difficult.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Shield className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Hundreds of Trackers</h3>
                  <p className="text-sm text-gray-600">Monitoring your behavior, collecting data, and exposing you to potential security risks.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="p-2 bg-red-100 rounded-lg">
                  <MousePointer className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Confusing Interfaces</h3>
                  <p className="text-sm text-gray-600">Designed to push misleading clicks, fake download buttons, and unwanted subscriptions.</p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              We eliminate this chaos and frustration by taking you straight to the content.
            </p>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">A Heads-Up About Pop-Ups</h2>
            </div>

            <p className="text-gray-700 mb-6">
              While our redirection system bypass and removes most of the barriers, some third-party sites may still hidden one more pop-up on a play button. If this happens:
            </p>

            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Simply close the pop-up and proceed to play the movie.
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <span className="text-green-500 font-bold">✓</span>
                Once you're on the page, you can explore the site and see firsthand why using our platform makes the experience so much smoother.
              </li>
            </ul>
          </section>

          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-gray-700 text-sm italic">
              We exist to streamline access, protect your privacy, and remove unnecessary hurdles.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
} 