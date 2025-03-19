/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['f.woowoowoowoo.net', 'vooomo.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.woowoowoowoo.net',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  }
};

module.exports = nextConfig;
