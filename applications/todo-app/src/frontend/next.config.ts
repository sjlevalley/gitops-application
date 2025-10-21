import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only use standalone output in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
  }),
  // Enable polling for file watching in Docker containers
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
