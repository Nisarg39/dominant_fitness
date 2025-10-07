import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better SEO
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Image optimization for better performance and SEO
  images: {
    unoptimized: false, // Enable image optimization for better SEO
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '**'
      }
    ]
  },

  // Compression for better performance
  compress: true,

  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },

  // Redirects for SEO (if needed)
  async redirects() {
    return [
      // Add any redirects here
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Add any custom rewrites here if needed
  async rewrites() {
    return [];
  },

  // Enable trailing slash for consistency
  trailingSlash: false,

  // Enable powered by header removal
  poweredByHeader: false,
};

export default nextConfig;
