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
    images: [
      '/images/ai-development.jpg',
      '/images/ai-tools-comparison.jpg',
      '/images/code-generation.jpg'
    ],
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
    images: [
      '/images/content-creation.jpg',
      '/images/ai-writing-tools.jpg',
      '/images/content-automation.jpg'
    ],
    rating: 4.7,
    reviewCount: 203,
    semanticEmbedding: [0.34, 0.56, -0.23, 0.78],
    targetAudience: ['Content Creators', 'Marketers', 'Writers']
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const baseUrl = 'https://ai-vault.com';
    
    // Generate XML image sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n';

    // Add images from blog posts
    knowledgeNodes.forEach(node => {
      if (node.images && node.images.length > 0) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/blog/${node.slug}</loc>\n`;
        
        node.images.forEach((image, index) => {
          xml += '    <image:image>\n';
          xml += `      <image:loc>${baseUrl}${image}</image:loc>\n`;
          xml += `      <image:title>${escapeXml(node.title)} - Image ${index + 1}</image:title>\n`;
          xml += `      <image:caption>${escapeXml(node.excerpt)}</image:caption>\n`;
          xml += '      <image:geo_location>San Francisco, CA</image:geo_location>\n';
          xml += '      <image:license>https://creativecommons.org/licenses/by/4.0/</image:license>\n';
          xml += '    </image:image>\n';
        });
        
        xml += '  </url>\n\n';
      }
    });

    // Add tool screenshots
    const toolImages = [
      { tool: 'GitHub Copilot', path: '/tools/github-copilot/screenshot.jpg', description: 'GitHub Copilot AI coding assistant interface' },
      { tool: 'ChatGPT', path: '/tools/chatgpt/screenshot.jpg', description: 'ChatGPT conversational AI interface' },
      { tool: 'Jasper AI', path: '/tools/jasper/screenshot.jpg', description: 'Jasper AI content creation dashboard' },
      { tool: 'Replit Ghostwriter', path: '/tools/replit-ghostwriter/screenshot.jpg', description: 'Replit Ghostwriter AI coding assistant' }
    ];

    toolImages.forEach(toolImage => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}${toolImage.path}</loc>\n`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${baseUrl}${toolImage.path}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(toolImage.tool)} Screenshot</image:title>\n`;
      xml += `      <image:caption>${escapeXml(toolImage.description)}</image:caption>\n`;
      xml += '    </image:image>\n';
      xml += '  </url>\n\n';
    });

    // Add category hero images
    const categories = [
      { name: 'Development', image: '/images/categories/development.jpg' },
      { name: 'Content Creation', image: '/images/categories/content-creation.jpg' },
      { name: 'Business', image: '/images/categories/business.jpg' },
      { name: 'Analytics', image: '/images/categories/analytics.jpg' },
      { name: 'Design', image: '/images/categories/design.jpg' }
    ];

    categories.forEach(category => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}</loc>\n`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${baseUrl}${category.image}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(category.name)} Category</image:title>\n`;
      xml += `      <image:caption>AI tools and resources for ${category.name.toLowerCase()}</image:caption>\n`;
      xml += '    </image:image>\n';
      xml += '  </url>\n\n';
    });

    xml += '</urlset>';

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    // Send XML response
    res.status(200).send(xml);

  } catch (error) {
    console.error('Image sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate image sitemap' });
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
