import type { NextConfig } from "next";

const repo = "simpnify-v2-demo";

const nextConfig: NextConfig = {
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  images: { unoptimized: true },
  // Demo mode: don't let type or lint errors block builds.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
