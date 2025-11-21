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
    updatedAt: '2024-11-15T10:00:00Z',
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
    linkedTools: [
      { id: 'github-copilot', name: 'GitHub Copilot', url: '/tools/github-copilot' },
      { id: 'replit-ghostwriter', name: 'Replit Ghostwriter', url: '/tools/replit-ghostwriter' }
    ],
    faqs: [
      { question: 'What are the main benefits of AI in development?', answer: 'AI enhances productivity, reduces errors, and accelerates development cycles.' },
      { question: 'How do AI coding assistants work?', answer: 'They use machine learning models trained on vast code repositories to provide intelligent suggestions.' }
    ],
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
    updatedAt: '2024-11-10T14:30:00Z',
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
    linkedTools: [
      { id: 'chatgpt', name: 'ChatGPT', url: '/tools/chatgpt' },
      { id: 'jasper', name: 'Jasper AI', url: '/tools/jasper' }
    ],
    faqs: [
      { question: 'Which AI tool is best for beginners?', answer: 'ChatGPT is excellent for beginners due to its intuitive interface.' },
      { question: 'Can AI tools replace human writers?', answer: 'AI tools are assistants that enhance, not replace, human creativity.' }
    ],
    semanticEmbedding: [0.34, 0.56, -0.23, 0.78],
    targetAudience: ['Content Creators', 'Marketers', 'Writers']
  }
];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/blog/neural-stream', priority: '0.9', changefreq: 'daily' },
  { url: '/ai-tools', priority: '0.8', changefreq: 'weekly' },
  { url: '/compare', priority: '0.8', changefreq: 'weekly' },
  { url: '/new-tools', priority: '0.8', changefreq: 'daily' },
  { url: '/suggest-tool', priority: '0.7', changefreq: 'monthly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
  { url: '/terms', priority: '0.4', changefreq: 'yearly' },
  { url: '/privacy', priority: '0.4', changefreq: 'yearly' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const baseUrl = 'https://aether-nexus.vercel.app';
    const currentDate = new Date().toISOString();
    
    // Generate XML sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
    xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
    xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n\n';

    // Add static pages
    staticPages.forEach(page => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += '  </url>\n\n';
    });

    // Add blog posts
    knowledgeNodes.forEach(node => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${node.slug}</loc>\n`;
      xml += `    <lastmod>${node.updatedAt || node.publishedAt}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += `    <priority>${node.trending ? '0.9' : '0.8'}</priority>\n`;
      
      // Add images if available
      if (node.images && node.images.length > 0) {
        node.images.forEach(image => {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${baseUrl}${image}</image:loc>\n`;
          xml += `      <image:title>${node.title}</image:title>\n`;
          xml += `      <image:caption>${node.excerpt}</image:caption>\n`;
          xml += '    </image:image>\n';
        });
      }
      
      // Add news sitemap for trending articles
      if (node.trending && node.publishedAt) {
        const publicationDate = new Date(node.publishedAt);
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        
        if (publicationDate > threeDaysAgo) {
          xml += '    <news:news>\n';
          xml += '      <news:publication>\n';
          xml += `        <news:name>AI Vault Blog</news:name>\n`;
          xml += `        <news:language>en</news:language>\n`;
          xml += `        <news:publication_date>${node.publishedAt}</news:publication_date>\n`;
          xml += '      </news:publication>\n';
          xml += `      <news:title>${escapeXml(node.title)}</news:title>\n`;
          xml += `      <news:keywords>${node.tags.join(', ')}</news:keywords>\n`;
          xml += '    </news:news>\n';
        }
      }
      
      xml += '  </url>\n\n';
    });

    // Add category pages
    const categories = ['Development', 'Content Creation', 'Business', 'Analytics', 'Design'];
    categories.forEach(category => {
      const slug = category.toLowerCase().replace(/\s+/g, '-');
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/category/${slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n\n';
    });

    // Add tag pages
    const allTags = [...new Set(knowledgeNodes.flatMap(node => node.tags))];
    allTags.forEach(tag => {
      const slug = tag.toLowerCase().replace(/\s+/g, '-');
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/tag/${slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
      xml += '  </url>\n\n';
    });

    // Add tool pages
    const tools = [...new Set(knowledgeNodes.flatMap(node => node.linkedTools || []))];
    tools.forEach(tool => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${tool.url || `/tools/${tool.id}`}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n\n';
    });

    xml += '</urlset>';

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    // Send XML response
    res.status(200).send(xml);

  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
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