import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
  // Add any custom rewrites here if needed
  async rewrites() {
    return [];
  },
};

export default nextConfig;
