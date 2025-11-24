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
  { url: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() },
  { url: '/best-tools', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
  { url: '/categories', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/blog', changefreq: 'daily', priority: 0.9, lastmod: new Date().toISOString() },
  { url: '/about', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/contact', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/terms', changefreq: 'yearly', priority: 0.6, lastmod: new Date('2025-01-01').toISOString() },
  { url: '/privacy', changefreq: 'yearly', priority: 0.6, lastmod: new Date('2025-01-01').toISOString() }
];

// Generate sitemap
async function generateSitemap() {
  try {
    // Get all pages
    const pages = await glob.sync(`${PAGES_DIR}/**/*.{js,jsx,ts,tsx,mdx}`, {
      ignore: ['**/node_modules/**', '**/.next/**', '**/out/**', '**/public/**']
    });
    
    // Filter and format pages
    // Process dynamic pages (blog posts, tools, etc.)
    const dynamicPages = [];
    
    // Add blog posts
    const blogPosts = await glob.sync(`${PAGES_DIR}/blog/**/*.{js,jsx,ts,tsx,mdx}`);
    blogPosts.forEach(post => {
      const path = post
        .replace(PAGES_DIR, '')
        .replace(/\.(js|jsx|ts|tsx|mdx)$/, '');
      
      if (!EXCLUDED_PATHS.some(excluded => path.startsWith(excluded))) {
        dynamicPages.push({
          url: path,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString()
        });
      }
    });
    
    // Process other dynamic pages
    const otherPages = await glob.sync([
      `${PAGES_DIR}/**/*.{js,jsx,ts,tsx,mdx}`,
      `!${PAGES_DIR}/_*.{js,jsx,ts,tsx,mdx}`,
      `!${PAGES_DIR}/api/**/*`,
      `!${PAGES_DIR}/blog/**/*`
    ]);
    
    const pagePaths = otherPages
      .map(page => {
        const path = page
          .replace(PAGES_DIR, '')
          .replace(/\.(js|jsx|ts|tsx|mdx)$/, '')
          .replace(/\[/g, ':')
          .replace(/]/g, '')
          .replace(/index$/, '');
        
        return path ? {
          url: path,
          changefreq: 'weekly',
          priority: path.split('/').length <= 2 ? 0.7 : 0.6,
          lastmod: new Date().toISOString()
        } : null;
      })
      .filter(Boolean)
      .filter(page => !EXCLUDED_PATHS.some(excluded => page.url.startsWith(excluded)));

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