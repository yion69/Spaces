import type { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: false
};

export default nextConfig;
