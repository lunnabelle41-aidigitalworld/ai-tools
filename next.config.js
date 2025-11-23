/** @type {import('next').NextConfig} */
const path = require('path');
const webpack = require('webpack');

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const nextConfig = {
  images: {
    domains: ['www.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons/**',
      },
      {
        protocol: 'https',
        hostname: '**', // This allows all domains - consider being more specific for production
      },
    ],
  },
  experimental: {
    // Removed optimizeCss as it's causing build performance issues
    optimizePackageImports: ['three', 'd3', 'framer-motion'],
  },
  // Enable SWC minification
  swcMinify: true,
  // Enable static optimization for all pages
  reactStrictMode: true,
  // Enable production browser source maps
  productionBrowserSourceMaps: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  // Increase static generation timeout and limit concurrent builds
  staticPageGenerationTimeout: 300, // 5 minutes
  // Remove the webpack configuration that's causing conflicts with Turbopack
  async headers() {
    return [
      // Security headers for all routes
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      // API CORS headers
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        ]
      }
    ]
  }
}

module.exports = nextConfig