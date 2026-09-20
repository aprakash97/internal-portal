import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https',
      },
      {
        protocol: 'https',
        hostname: 'mockmind-api.uifaces.co',
      },
      {
        protocol: 'https',
        hostname: 'ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'r7f39czs4t.ufs.sh',
      },
    ],
  },
};

export default nextConfig;
