'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TermsOfService() {
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
          <h1 className="text-orange-500 font-bold">Vooomo</h1>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        <article className="prose prose-orange mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Terms of Service
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to Vooomo ("the Platform"). By accessing or using our services, you agree to abide by these Terms of Service. If you do not agree, please refrain from using the Platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Nature of Service</h2>
            <p className="text-gray-700">
              Btiflix provides an aggregation service that connects users with publicly available movie streaming links. We do not host or store any content; we only redirect users to third-party sources.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Users must be at least 18 years old or have parental consent.</li>
              <li>Users are responsible for ensuring that they comply with local laws regarding online streaming.</li>
              <li>Users may not use the Platform for illegal activities, including copyright infringement.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Fees & Payments</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>The Platform charges a small fee for directing users to a seamless streaming experience.</li>
              <li>Payments are made via Bitcoin Lightning, and transactions are final and non-refundable.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>The Platform does not own or control the content available through third-party links.</li>
              <li>Any copyright claims should be directed to the respective content owners.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>The Platform is not responsible for the content, reliability, or security of third-party streaming websites.</li>
              <li>Users acknowledge that they use third-party links at their own risk.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. Modifications & Termination</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>We reserve the right to modify these Terms of Service at any time.</li>
              <li>Violation of these terms may result in account termination.</li>
            </ul>
          </section>

          <section className="mt-12 bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Legal Disclaimer</h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Vooomo acts as an intermediary, providing links to third-party streaming services. We do not host, distribute, or modify any copyrighted content. Users access third-party sites at their own discretion, and the Platform assumes no responsibility for the legality or quality of the content provided by these sites.
              </p>
              <p>
                If a content owner believes their rights are being infringed, they may request removal of redirection or discuss a partnership agreement for legal content distribution.
              </p>
              <p>
                Users should ensure they comply with applicable copyright laws in their jurisdiction. The Platform shall not be liable for any claims arising from misuse of third-party content.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
} 