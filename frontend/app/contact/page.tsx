'use client';

import React from 'react';
import { ArrowLeft, Mail, Briefcase, Users, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Contact() {
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
          <h1 className="text-orange-500 font-bold">VOOOMO</h1>
        </div>
      </div>

      {/* Contact Content */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        <article className="prose prose-orange mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-12">
            We're here to help and eager to explore opportunities for collaboration. Choose the appropriate channel below to get in touch with us.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Partnership Opportunities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Briefcase className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Partnership Opportunities</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Content owners, streaming platforms, and technology providers - let's discuss how we can work together to create a more accessible streaming ecosystem.
              </p>
              <a 
                href="mailto:partnerships@btiflix.com"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                partnerships@lbtil.com
              </a>
            </div>

            {/* Investment Opportunities */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:border-orange-200 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Investment Opportunities</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Join us in revolutionizing the streaming industry. We welcome discussions with investors who share our vision for a more equitable digital entertainment future.
              </p>
              <a 
                href="mailto:investors@btiflix.com"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                investors@lbtil.com
              </a>
            </div>
          </div>

          {/* General Inquiries */}
          <div className="mt-8 bg-gray-100 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-lg">
                <HelpCircle className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">General Inquiries</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Have questions about our service? Need technical support? Our AI is ready to assist you.
            </p>
            <div className="space-y-2">
              <a 
                href="mailto:support@lbtil.com"
                className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                support@lbtil.com
              </a>
              <p className="text-xs text-gray-500">
                Response time: 24hr
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4"></h3>
            <p className="text-gray-600 text-sm">
              Our team is available Monday through Friday, 7:00 AM - 7:00 PM UTC.
              While we strive to respond to all inquiries promptly, partnership and investment discussions may require additional time for thorough consideration.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
} 