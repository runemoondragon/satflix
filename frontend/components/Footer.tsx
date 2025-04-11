import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-black/60 backdrop-blur-sm border-t border-gray-800 py-6 mt-auto">
      <div className="max-w-[2000px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-orange-500 font-bold text-lg mb-2">VOOOMO</h3>
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} Vooomo. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <Link href="/" className="text-gray-400 hover:text-orange-500 transition-colors">
              App
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-orange-500 transition-colors">
            Terms of service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
            Contact
            </Link>
            <Link href="/our-case" className="text-gray-400 hover:text-orange-500 transition-colors">
            Our Case
            </Link>
            <Link href="https://invest.vooomo.com/" target="_blank" className="text-gray-400 hover:text-orange-500 transition-colors">
            Docs
            </Link>
            <Link href="/fyi" className="text-gray-400 hover:text-orange-500 transition-colors">
              FYI
            </Link>
          </div>

          {/* Social Links 
          <div className="flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="mailto:contact@btiflix.com"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
} 