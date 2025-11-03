import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Proxy to your Express backend
      },
    ];
  },
};

export default nextConfig;
