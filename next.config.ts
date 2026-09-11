import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      { source: '/marketplace', destination: '/marketplace.html' },
      { source: '/uzalus-ia', destination: '/uzalus-ia.html' },
    ];
  },
};

export default nextConfig;
