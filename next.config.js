/** @type {import('next').NextConfig} */
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
    optimizeCss: true,
    optimizePackageImports: ['three', 'd3', 'framer-motion'],
  },
  // Enable SWC minification
  swcMinify: true,
  // Enable static HTML export
  output: 'standalone',
  // Enable static optimization for all pages
  reactStrictMode: true,
  // Enable production browser source maps
  productionBrowserSourceMaps: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // Add GLSL support
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });

    // Add Three.js and WebGL optimizations
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/examples/jsm/controls/OrbitControls': 'three/examples/jsm/controls/OrbitControls.js',
        'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader.js',
      };
    }

    return config;
  },
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
