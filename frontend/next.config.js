/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'f.woowoowoowoo.net', // Allow images from woowoowoowoo.net
      'placeholder.com',     // For placeholder images
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.woowoowoowoo.net',
        pathname: '/**',
      },
    ],
  },
  // Other Next.js config options can go here
};

module.exports = nextConfig; 