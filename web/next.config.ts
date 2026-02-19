import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["lucide-react"],
  images: {
    loader: "custom",
    loaderFile: "./src/lib/sanityImageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  /* Si tu as d'autres options, garde-les, mais vire la partie 'experimental: { turbo: ... }' */
};

export default nextConfig;