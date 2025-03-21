'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '../../components/Footer';

export default function OurCase() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
          <h1 className="text-orange-500 font-bold">Vooomo</h1>
        </div>
      </div>

      {/* Letter Content */}
      <div className="max-w-3xl mx-auto px-6 py-24 flex-grow">
        <article className="prose prose-orange mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            A Love Letter to the Lawmakers and Content Owners: Why We Should Exist
          </h1>
          
          <p className="text-gray-700 mb-8">Dear Guardians of Creativity and Digital Fairness,</p>

          <p className="text-gray-700 mb-6">
            We exist because the world of content consumption is broken. Not by the creators, nor by the rightful owners—but by a system that rewards piracy and punishes accessibility.
          </p>

          <p className="text-gray-700 mb-6">
            For too long, legitimate content owners have been forced to fight an endless battle against piracy—cease-and-desist letters, lawsuits, takedowns, domain seizures—only to see new pirate sites emerge the very next day.
          </p>

          <p className="text-gray-700 mb-6">And why?</p>

          <p className="text-gray-700 mb-6">
            Because the true problem has never been piracy itself, but the economic model that fuels it.
          </p>

          <p className="text-gray-700 mb-6">
            Piracy exists because users want affordable, instant access to content, and traditional platforms have failed to provide that at a global scale. Subscription fees, geo-restrictions, and outdated licensing models leave millions of potential viewers out in the cold, forcing them to turn to free ad-funded piracy sites that profit not from creativity, but from exploitation.
          </p>

          <p className="text-gray-700 mb-6">
            These sites do not pay creators, do not compensate filmmakers, and do not care about artistic integrity.
          </p>

          <p className="text-gray-700 mb-6">
            They profit from clickbait ads, malware injections, and tracking systems that exploit users' data. They turn the hard work of artists and production teams into fuel for their advertising revenue engines—all while legitimate content owners watch their earnings disappear.
          </p>

          <p className="text-gray-700 mb-6">But what if we told you there's another way?</p>

          <p className="text-gray-700 mb-8">
            What if we told you we could dismantle piracy—not by legal fights, but by making it financially unviable?
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-6">
            We Are Not the Enemy. We Are the Disruption Piracy Never Expected.
          </h2>

          <p className="text-gray-700 mb-6">
            We exist to starve piracy from the inside—by removing its primary source of income.
          </p>

          <ul className="list-none space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-orange-500">💡</span>
              <span className="text-gray-700">We bypass pirate sites' ad revenue, making their business model unsustainable.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500">💡</span>
              <span className="text-gray-700">We redirect users directly to the content, skipping the ad walls, malware traps, and data theft.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-500">💡</span>
              <span className="text-gray-700">We make pirated content unprofitable while proving that users are willing to pay per stream—legally.</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Why This Benefits You, the Content Owners & Industry Leaders
          </h2>

          <ul className="list-none space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-green-500">✔</span>
              <span className="text-gray-700">Increased Revenue – Instead of losing viewers to piracy, we convert them into paying customers through microtransactions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500">✔</span>
              <span className="text-gray-700">Expanded Audience – People who can't access expensive subscriptions can now pay per movie, per episode, per experience.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500">✔</span>
              <span className="text-gray-700">Traffic Control & Data Insights – You can see where your audience is coming from, track engagement, and control how your content is accessed.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500">✔</span>
              <span className="text-gray-700">A Flexible Business Model – Work with us, or take over the traffic yourself. If you want the revenue, we give it to you. If you want full control, we hand it over.</span>
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 mb-6">
            The Choice Is Yours, But the Outcome Is Inevitable
          </h2>

          <div className="space-y-2 mb-8 text-gray-700">
            <p>We do not force anyone to work with us.</p>
            <p>We do not claim ownership over any content.</p>
            <p>We do not steal. We do not infringe.</p>
            <p>We redirect traffic. We facilitate payments. We give content owners a path to reclaim what piracy has stolen from them.</p>
          </div>

          <p className="text-gray-700 mb-6">
            So, if you wish us gone—if you, as a content owner or policymaker, believe we should not exist—then ask yourself this:
          </p>

          <ul className="list-none space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-blue-500">🔹</span>
              <span className="text-gray-700">Would you rather let piracy thrive, unchecked, profiting from your hard work?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500">🔹</span>
              <span className="text-gray-700">Would you rather keep fighting the same legal battles over and over, with no end in sight?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500">🔹</span>
              <span className="text-gray-700">Or would you rather stand with us, take back control, uno reverse, and reclaim what's rightfully yours?</span>
            </li>
          </ul>
          
          <p className="text-gray-700 mb-6">
            Because whether you embrace us or not, piracy will not stop. Why fight a losing battle when you can make piracy work in your favor?
          </p>
          <p className="text-gray-700 mb-6">
          Let us flip the script—instead of piracy sites profiting off your content, we ensure that you collect revenue from every view. 
          </p>
          <p className="text-gray-700 mb-8">
            A future where creators, filmmakers, and streaming platforms thrive—without middlemen, without exploitation, and without borders.
          </p>

          <p className="text-gray-700 mb-6">
            We should exist because we do what no one else is willing to do—we break the financial incentives of piracy and redirect them to the rightful owners.
          </p>

          <div className="mt-12 text-gray-700">
            <p>With all respect and a vision for a better digital future,</p>
            <p className="mt-4">Your Reluctant Ally in the Fight Against Piracy,</p>
            <p className="font-bold text-orange-500 mt-2">VOOOMO</p>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
} 