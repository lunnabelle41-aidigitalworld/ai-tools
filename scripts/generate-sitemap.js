const fs = require('fs');
const { sync: globSync } = require('glob');
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
  { url: '/blog/neural-stream', changefreq: 'daily', priority: 0.9, lastmod: new Date().toISOString() },
  { url: '/ai-tools', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/ai-updates', changefreq: 'daily', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/new-tools', changefreq: 'daily', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/compare', changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/favorites', changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/suggest-tool', changefreq: 'monthly', priority: 0.6, lastmod: new Date().toISOString() },
  { url: '/about', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/contact', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/terms-of-service', changefreq: 'yearly', priority: 0.6, lastmod: new Date('2025-01-01').toISOString() },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.6, lastmod: new Date('2025-01-01').toISOString() }
];

// Generate sitemap
async function generateSitemap() {
  try {
    // Get all pages
    const pages = globSync(`${PAGES_DIR}/**/*.{js,jsx,ts,tsx,mdx}`, {
      ignore: ['**/node_modules/**', '**/.next/**', '**/out/**', '**/public/**']
    });
    
    // Process dynamic pages (blog posts, tools, etc.)
    const dynamicPages = [];
    
    // Add blog posts
    const blogPosts = globSync(`${PAGES_DIR}/blog/**/*.{js,jsx,ts,tsx,mdx}`);
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
    const otherPages = globSync(`${PAGES_DIR}/**/*.{js,jsx,ts,tsx,mdx}`, {
      ignore: [
        `${PAGES_DIR}/_*.{js,jsx,ts,tsx,mdx}`,
        `${PAGES_DIR}/api/**/*`,
        `${PAGES_DIR}/blog/**/*`
      ]
    });
    
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

    // Load blog data to extract all blog post URLs
    const blogData = fs.readFileSync('./pages/blog.tsx', 'utf8');
    const blogIds = [];
    const blogIdMatches = blogData.match(/id:\s*'([^']+)'/g) || [];
    blogIdMatches.forEach(match => {
      const id = match.match(/id:\s*'([^']+)'/)[1];
      blogIds.push(id);
    });

    // Load categories data to extract all category URLs
    const categoriesData = fs.readFileSync('./data/categories.ts', 'utf8');
    const categories = [];
    const categoryMatches = categoriesData.match(/name:\s*"([^"]+)"/g) || [];
    categoryMatches.forEach(match => {
      const categoryName = match.match(/name:\s*"([^"]+)"/)[1];
      // Skip if it's a subcategory (we'll handle those separately)
      if (!categoryName.includes('favicon') && !categoryName.includes('website')) {
        const slug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
        categories.push(slug);
      }
    });

    // Load AI tools data to extract all tool URLs
    const toolsData = fs.readFileSync('./data/tools.ts', 'utf8');
    const tools = [];
    const toolMatches = toolsData.match(/name:\s*"([^"]+)"/g) || [];
    toolMatches.forEach(match => {
      const toolName = match.match(/name:\s*"([^"]+)"/)[1];
      const slug = toolName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      tools.push(slug);
    });

    // Load AI updates data to extract all update URLs
    const aiUpdatesData = fs.readFileSync('./data/ai-updates.ts', 'utf8');
    const aiUpdates = [];
    const updateMatches = aiUpdatesData.match(/"id":\s*"([^"]+)"/g) || [];
    updateMatches.forEach(match => {
      const updateId = match.match(/"id":\s*"([^"]+)"/)[1];
      aiUpdates.push(updateId);
    });

    // Build blog post URLs
    const blogUrls = blogIds.map(id => ({
      url: `/blog/${id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }));

    // Build category URLs
    const categoryUrls = categories.map(slug => ({
      url: `/ai-tools/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }));

    // Build tool URLs
    const toolUrls = tools.map(slug => ({
      url: `/ai-tools/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }));

    // Build AI update URLs
    const aiUpdateUrls = aiUpdates.map(id => ({
      url: `/ai-updates/${id}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString()
    }));

    // Combine all routes
    const allRoutes = [
      ...STATIC_PATHS,
      ...blogUrls,
      ...categoryUrls,
      ...toolUrls,
      ...aiUpdateUrls,
      ...pagePaths
    ];

    // Remove duplicates
    const uniqueRoutes = allRoutes.filter((route, index, self) =>
      index === self.findIndex(r => r.url === route.url)
    );

    // Create sitemap
    const stream = new SitemapStream({ hostname: SITE_URL });
    const result = await streamToPromise(Readable.from(uniqueRoutes).pipe(stream));
    
    // Write sitemap to file
    fs.writeFileSync('public/sitemap.xml', result.toString());
    console.log(`Sitemap generated successfully with ${uniqueRoutes.length} URLs!`);
    
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