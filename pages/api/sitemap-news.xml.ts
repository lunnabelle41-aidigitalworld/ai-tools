import { NextApiRequest, NextApiResponse } from 'next';
import { KnowledgeNode } from '../../lib/adaptive-stream';

// Mock data - in production, this would come from your CMS/database
const knowledgeNodes: KnowledgeNode[] = [
  {
    id: '1',
    title: 'The Future of AI-Driven Development',
    content: 'Comprehensive analysis of AI tools transforming software development...',
    excerpt: 'Explore how AI is revolutionizing the development landscape',
    author: 'AI Vault Team',
    publishedAt: '2024-11-15T10:00:00Z',
    category: 'Development',
    tags: ['AI', 'Development', 'Machine Learning', 'Automation'],
    difficulty: 'intermediate',
    readTime: 8,
    engagementScore: 85,
    trending: true,
    slug: 'future-ai-driven-development',
    images: ['/images/ai-development.jpg'],
    rating: 4.5,
    reviewCount: 127,
    semanticEmbedding: [0.23, -0.45, 0.67, 0.12],
    targetAudience: ['Developers', 'Tech Leads', 'Engineering Managers']
  },
  {
    id: '2',
    title: 'Top 10 AI Tools for Content Creation',
    content: 'Discover the most powerful AI tools for content creation...',
    excerpt: 'Complete guide to AI-powered content creation tools',
    author: 'Content Team',
    publishedAt: '2024-11-10T14:30:00Z',
    category: 'Content Creation',
    tags: ['AI', 'Content', 'Writing', 'Marketing'],
    difficulty: 'beginner',
    readTime: 6,
    engagementScore: 92,
    trending: true,
    slug: 'top-10-ai-tools-content-creation',
    images: ['/images/content-creation.jpg'],
    rating: 4.7,
    reviewCount: 203,
    semanticEmbedding: [0.34, 0.56, -0.23, 0.78],
    targetAudience: ['Content Creators', 'Marketers', 'Writers']
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const baseUrl = 'https://ai-vault.com';
    
    // Generate XML news sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n\n';

    // Filter for recent and trending articles (published within last 2 days)
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const recentArticles = knowledgeNodes.filter(node => {
      const publicationDate = new Date(node.publishedAt);
      return publicationDate > twoDaysAgo && node.trending;
    });

    if (recentArticles.length === 0) {
      // If no recent articles, include the most recent trending article
      const mostRecent = knowledgeNodes
        .filter(node => node.trending)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];
      
      if (mostRecent) {
        recentArticles.push(mostRecent);
      }
    }

    recentArticles.forEach(node => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${node.slug}</loc>\n`;
      xml += `    <lastmod>${node.updatedAt || node.publishedAt}</lastmod>\n`;
      xml += '    <changefreq>hourly</changefreq>\n';
      xml += '    <priority>1.0</priority>\n';
      
      xml += '    <news:news>\n';
      xml += '      <news:publication>\n';
      xml += '        <news:name>AI Vault Blog</news:name>\n';
      xml += '        <news:language>en</news:language>\n';
      xml += `        <news:publication_date>${node.publishedAt}</news:publication_date>\n`;
      xml += '        <news:publication>\n';
      xml += `          <news:name>AI Vault</news:name>\n`;
      xml += '          <news:language>en</news:language>\n';
      xml += '        </news:publication>\n';
      xml += '      </news:publication>\n';
      xml += `      <news:title>${escapeXml(node.title)}</news:title>\n`;
      xml += `      <news:keywords>${node.tags.join(', ')}</news:keywords>\n`;
      xml += '      <news:genres>Blog, Technology, AI</news:genres>\n';
      xml += '      <news:stock_tickers>NONE</news:stock_tickers>\n';
      xml += '    </news:news>\n';
      
      xml += '  </url>\n\n';
    });

    xml += '</urlset>';

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600'); // News sitemaps update more frequently
    
    // Send XML response
    res.status(200).send(xml);

  } catch (error) {
    console.error('News sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate news sitemap' });
  }
}

// Helper function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
