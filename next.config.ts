import type { NextConfig } from "next";

const BACKEND_URL = "https://tcellxfreedom-git-227323021876.europe-west1.run.app";

const nextConfig: NextConfig = {
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
