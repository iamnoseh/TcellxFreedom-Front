import type { NextConfig } from "next";

const BACKEND_URL = "http://localhost:3055";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.103'],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
