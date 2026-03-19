import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    localPatterns: [
      {
        pathname: "/img/**",
      },
      {
        pathname: "/uploads/**",
      },
      {
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
