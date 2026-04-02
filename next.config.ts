import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        // Sitehaus R2 CDN — product images
        protocol: "https",
        hostname: "pub-e3a41d59838143ca8205596b891ba184.r2.dev",
      },
      {
        // Legacy OneHealth WordPress images
        protocol: "https",
        hostname: "onehealthclinics.com",
      },
    ],
  },
};

export default nextConfig;
