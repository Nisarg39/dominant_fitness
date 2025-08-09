import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
