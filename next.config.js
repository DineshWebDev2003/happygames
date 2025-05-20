/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'lh3.googleusercontent.com'],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  distDir: '.next',
  trailingSlash: true,
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // Add environment variables to be available at build time
    NEXT_PUBLIC_SKIP_AI_IN_BUILD: 'true',
  },
  experimental: {
    // Needed for Netlify deployment of standalone output
    outputFileTracingRoot: process.cwd(),
  },
};

module.exports = nextConfig; 