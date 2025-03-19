'use client';

import React, { useState } from 'react';
import { ArrowLeft, FileText, Code, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Documentation() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('whitepaper');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-10 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
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

      {/* Documentation Content */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-orange mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Documentation
          </h1>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('whitepaper')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'whitepaper'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <FileText className="w-4 h-4" />
              White Paper
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'technical'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              <Code className="w-4 h-4" />
              Technical Architecture
            </button>
          </div>

          {/* White Paper Content */}
          {activeTab === 'whitepaper' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Introduction</h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">The Evolution of Streaming & Its Challenges</h3>
                <p className="text-gray-700 mb-4">
                  The global movie streaming industry has experienced explosive growth, reaching a market valuation of over $100 billion, with projections to exceed $300 billion by 2030. However, the industry is fraught with inefficiencies, including high subscription costs, geo-restrictions, and revenue losses due to piracy.
                </p>
                <p className="text-gray-700">
                  Despite the rise of digital rights management (DRM) and anti-piracy efforts, illegal streaming platforms continue to thrive by monetizing user traffic through intrusive advertising, malware, and data exploitation. These platforms operate in a legal gray area, profiting at the expense of legitimate content creators. Users, on the other hand, often turn to piracy due to the high costs of subscriptions, limited payment methods, and geographic restrictions imposed by major streaming services.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Our Solution</h3>
                <p className="text-gray-700">
                  We introduce a Bitcoin Lightning-powered movie streaming aggregator that provides a solution for individuals who lack access to traditional subscription-based models. By offering a seamless, pay-per-view experience, we make premium content accessible without the need for long-term commitments or credit cards. Leveraging Bitcoin's Lightning Network, we enable microtransactions that are instant, low-cost, and globally accessible.
                </p>
                <p className="text-gray-700">
                  Our model simultaneously discourages piracy, increases revenue for content owners, and enhances accessibility for users worldwide. Unlike traditional streaming platforms, our system removes chargebacks, processing fees, and reliance on financial intermediaries, creating a fair and transparent ecosystem for all stakeholders.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Business Model</h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">How Our Platform Operates</h3>
                <p className="text-gray-700 mb-4">
                  Our platform functions as a content aggregator that redirects users to legitimate or free streaming sources, ensuring content owners can monetize their media without relying on traditional advertising models.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <div className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Pay-Per-Stream Model</h4>
                      <p className="text-sm text-gray-600">Users pay a small fee in Bitcoin via the Lightning Network for instant access to a movie or TV show.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Revenue Sharing for Content Owners</h4>
                      <p className="text-sm text-gray-600">Creators and studios receive instant micropayments for every stream.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Redirection Mechanism</h4>
                      <p className="text-sm text-gray-600">Our AI-powered system bypasses piracy site ads and takes users directly to the content.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900">Content Owner Integrations</h4>
                      <p className="text-sm text-gray-600">Rights holders can integrate via API partnerships for seamless revenue collection.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Business Roadmap</h3>
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-3">Phase 1: Redirection (Demonstration Mode)</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                      <li>Proof of Concept & Market Validation</li>
                      <li>User Adoption & Payment Testing</li>
                      <li>Scalability Assessment</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-3">Phase 2: Integration with Major Streaming Platforms</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                      <li>API Partnerships with Netflix, Amazon Prime, & Others</li>
                      <li>Strategic Revenue Model Adjustments</li>
                      <li>Regulatory Compliance Enhancements</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-3">Phase 3: Direct Content Owner Integrations</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                      <li>Onboarding Independent Filmmakers & Studios</li>
                      <li>Micropayment-Based Licensing for DRM</li>
                      <li>Expansion into Exclusive Content Distribution</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-3">Phase 4: Decentralized Hosting & Governance</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                      <li>Decentralized Indexing & Storage Solutions</li>
                      <li>Community-Governed Content Approval & Revenue Distribution</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Technical Architecture Content */}
          {activeTab === 'technical' && (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Architecture Breakdown</h2>
                <p className="text-gray-700">
                  This breakdown outlines the key technical components, infrastructure, and architecture needed to support the platform's content redirection, payment system, and future decentralized evolution.
                </p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Core Components</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-4">The platform consists of three main layers:</p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Frontend</h4>
                        <p className="text-sm text-gray-600">User interface for browsing & paying for streams</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Backend</h4>
                        <p className="text-sm text-gray-600">API-driven logic for search, redirection, payments & analytics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">Infrastructure</h4>
                        <p className="text-sm text-gray-600">Hosting, database, and payment routing</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Technology Stack</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-4">Frontend Stack</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Framework: Next.js (React-based SSR)</li>
                      <li>• State Management: React Context API</li>
                      <li>• Payment Handling: BTCPay Server API</li>
                      <li>• UI Framework: TailwindCSS</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h4 className="font-medium text-gray-900 mb-4">Backend Stack</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Node.js with Express.js</li>
                      <li>• PostgreSQL Database</li>
                      <li>• Redis Caching</li>
                      <li>• BTCPay Server & LNDHub</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">API Endpoints</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-4 font-medium text-gray-900">Endpoint</th>
                        <th className="text-left py-2 px-4 font-medium text-gray-900">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="py-2 px-4 font-mono text-orange-600">GET /api/movies</td>
                        <td className="py-2 px-4 text-gray-600">Fetches available movies & filters</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-mono text-orange-600">GET /api/movie/:id</td>
                        <td className="py-2 px-4 text-gray-600">Fetches details for a single movie</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-mono text-orange-600">POST /api/pay</td>
                        <td className="py-2 px-4 text-gray-600">Processes Lightning payments & redirects users</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-4 font-mono text-orange-600">GET /api/revenue/:contentOwnerId</td>
                        <td className="py-2 px-4 text-gray-600">Fetches earnings for content owners</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Final Vision</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-gray-700 mb-4">A frictionless streaming payment platform that:</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Disrupts piracy by removing its revenue model
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Creates a fair monetization system for content owners
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Provides users with a seamless, ad-free movie experience
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Leverages Bitcoin Lightning for instant, low-cost payments
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <span className="text-green-500 font-bold">✓</span>
                      Becomes a decentralized, censorship-resistant streaming marketplace
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 