import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const baseUrl = 'https://aether-nexus.vercel.app';
    const currentDate = new Date().toISOString();
    
    // Generate XML sitemap index
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n';

    // Main sitemap
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/api/sitemap.xml</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '  </sitemap>\n\n';

    // Image sitemap
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/api/sitemap-images.xml</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '  </sitemap>\n\n';

    // News sitemap
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/api/sitemap-news.xml</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '  </sitemap>\n\n';

    // Video sitemap (placeholder for future implementation)
    xml += '  <sitemap>\n';
    xml += `    <loc>${baseUrl}/api/sitemap-videos.xml</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += '  </sitemap>\n\n';

    xml += '</sitemapindex>';

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    // Send XML response
    res.status(200).send(xml);

  } catch (error) {
    console.error('Sitemap index generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap index' });
  }
}