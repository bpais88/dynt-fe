import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dynt.ai",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },

      {
        protocol: "https",
        hostname: "cdn-logos.gocardless.com",
      },
    ],
  },
};

export default nextConfig;
