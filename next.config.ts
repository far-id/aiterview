import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // Required to avoid trying to load 'fs' for @react-pdf/renderer
      path: false,
    };
    return config;
  },
};

export default nextConfig;
