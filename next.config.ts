import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-gif.flaticon.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
