const fs = require('fs');
const { glob } = require('glob');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Since we don't have the exact tools and categories structure, we'll create a simpler version
const SITE_URL = 'https://aether-nexus.vercel.app';
const PAGES_DIR = 'pages';
const EXCLUDED_PATHS = [
  '/_app.js',
  '/_document.js',
  '/_error.js',
  '/api',
  '/404',
  '/500',
  '/sitemap.xml',
  '/robots.txt'
];

// Static pages that should be in sitemap
const STATIC_PATHS = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/best-tools', changefreq: 'weekly', priority: 0.9 },
  { url: '/categories', changefreq: 'weekly', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/terms', changefreq: 'yearly', priority: 0.6 },
  { url: '/privacy', changefreq: 'yearly', priority: 0.6 }
];

// Generate sitemap
async function generateSitemap() {
  try {
    // Get all pages
    const pages = await glob.sync(`${PAGES_DIR}/**/*.{js,jsx,ts,tsx,mdx}`);
    
    // Filter and format pages
    const pagePaths = pages
      .map(page => {
        const path = page
          .replace(PAGES_DIR, '')
          .replace(/\.(js|jsx|ts|tsx|mdx)$/, '')
          .replace(/\[/g, ':')
          .replace(/]/g, '')
          .replace(/index$/, '');
        
        return path || '/';
      })
      .filter(path => !EXCLUDED_PATHS.some(excluded => path.startsWith(excluded)));

    // Combine all routes
    const allRoutes = [
      ...STATIC_PATHS,
      ...pagePaths.map(path => ({
        url: path,
        changefreq: 'weekly',
        priority: path === '/' ? 1.0 : 0.5
      }))
    ];

    // Create sitemap
    const stream = new SitemapStream({ hostname: SITE_URL });
    const result = await streamToPromise(Readable.from(allRoutes).pipe(stream));
    
    // Write sitemap to file
    fs.writeFileSync('public/sitemap.xml', result.toString());
    console.log('Sitemap generated successfully!');
    
    // Generate robots.txt
    const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
    
    fs.writeFileSync('public/robots.txt', robotsTxt);
    console.log('robots.txt generated successfully!');
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();