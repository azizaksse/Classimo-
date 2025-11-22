import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly pin the workspace root to avoid Turbopack choosing parent dirs.
    root: __dirname,
  },
};

export default nextConfig;
