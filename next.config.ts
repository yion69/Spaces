import type { NextConfig } from "next";

/**
 * @type {import('next').NextConfig}
 */

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
      ignoreDuringBuilds: true,
    },
    reactStrictMode: false,
    images: {
      domains: ['i.pravatar.cc', 'images.unsplash.com','avatars.githubusercontent.com', 'placecats.com'], // Add allowed image domains here
    },
};

export default nextConfig;
