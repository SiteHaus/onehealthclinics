import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        // Sitehaus R2 CDN — product images (staging)
        protocol: "https",
        hostname: "cdn.staging.commerce.sitehaus.dev",
      },
      {
        // Sitehaus R2 CDN — product images (production)
        protocol: "https",
        hostname: "cdn.commerce.sitehaus.dev",
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
