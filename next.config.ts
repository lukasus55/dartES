import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // REQUIRED for GitHub Pages
  images: {
    unoptimized: true, // Needed if you use the <Image> component on static sites
  },
  basePath: process.env.PAGES_BASE_PATH
};

export default nextConfig;
