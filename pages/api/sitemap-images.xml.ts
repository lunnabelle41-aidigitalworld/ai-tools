import { NextApiRequest, NextApiResponse } from 'next';
import { tools } from '../../data/tools';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const baseUrl = 'https://aether-nexus.vercel.app';
    
    // Generate XML image sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n';
    
    // Add homepage images
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${baseUrl}/images/hero-image.jpg</image:loc>\n`;
    xml += '      <image:title>AI Tools Directory Hero Image</image:title>\n';
    xml += '      <image:caption>Discover the ultimate collection of AI tools</image:caption>\n';
    xml += '    </image:image>\n';
    xml += '  </url>\n\n';
    
    // Add blog index page images
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blog</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${baseUrl}/images/blog-og-image.jpg</image:loc>\n`;
    xml += '      <image:title>AI Vault Blog</image:title>\n';
    xml += '      <image:caption>Latest AI insights, tools, and trends</image:caption>\n';
    xml += '    </image:image>\n';
    xml += '  </url>\n\n';
    
    // Add neural stream page images
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blog/neural-stream</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${baseUrl}/images/neural-stream-og-image.jpg</image:loc>\n`;
    xml += '      <image:title>Neural Stream - Interactive AI Blog Experience</image:title>\n';
    xml += '      <image:caption>Experience the future of content with AI Vault\'s Neural Stream</image:caption>\n';
    xml += '    </image:image>\n';
    xml += '  </url>\n\n';
    
    // Add individual blog post images
    const blogPosts = [
      {
        slug: 'ai-education-2025',
        title: 'AI in Education 2025',
        image: '/images/blog/ai-education-2025.jpg',
        caption: 'Complete guide to learning intelligence and educational automation revolution'
      },
      {
        slug: 'ai-healthcare-2025',
        title: 'AI in Healthcare 2025',
        image: '/images/blog/ai-healthcare-2025.jpg',
        caption: 'Complete guide to medical intelligence and healthcare automation revolution'
      },
      {
        slug: 'ai-finance-2025',
        title: 'AI in Finance 2025',
        image: '/images/blog/ai-finance-2025.jpg',
        caption: 'Complete guide to financial intelligence and banking revolution'
      },
      {
        slug: 'ai-cybersecurity-2025',
        title: 'AI in Cybersecurity 2025',
        image: '/images/blog/ai-cybersecurity-2025.jpg',
        caption: 'Complete guide to security intelligence and threat defense revolution'
      },
      {
        slug: 'ai-marketing-2025',
        title: 'AI in Marketing 2025',
        image: '/images/blog/ai-marketing-2025.jpg',
        caption: 'Complete guide to marketing intelligence and customer engagement revolution'
      }
    ];
    
    blogPosts.forEach(post => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${baseUrl}${post.image}</image:loc>\n`;
      xml += `      <image:title>${post.title}</image:title>\n`;
      xml += `      <image:caption>${post.caption}</image:caption>\n`;
      xml += '    </image:image>\n';
      xml += '  </url>\n\n';
    });
    
    // Add tool images
    tools.slice(0, 100).forEach((tool, index) => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/ai-tools/${tool.category.toLowerCase().replace(/\s+/g, '-')}/${tool.subcategory.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}/${tool.name.toLowerCase().replace(/\s+/g, '-')}</loc>\n`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${baseUrl}/images/tools/${tool.id}.jpg</image:loc>\n`;
      xml += `      <image:title>${tool.name}</image:title>\n`;
      xml += `      <image:caption>${tool.description}</image:caption>\n`;
      xml += '    </image:image>\n';
      xml += '  </url>\n\n';
    });
    
    // Add category images
    const categories = [
      { name: 'Writing & Content', image: '/images/categories/writing-content.jpg' },
      { name: 'Image Generation', image: '/images/categories/image-generation.jpg' },
      { name: 'Video Animation', image: '/images/categories/video-animation.jpg' },
      { name: 'AI Agents & Automation', image: '/images/categories/ai-agents.jpg' },
      { name: 'Development Tools', image: '/images/categories/development.jpg' },
      { name: 'Marketing Tools', image: '/images/categories/marketing.jpg' },
      { name: 'Productivity Tools', image: '/images/categories/productivity.jpg' }
    ];
    
    categories.forEach(category => {
      const slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/ai-tools/${slug}</loc>\n`;
      xml += '    <image:image>\n';
      xml += `      <image:loc>${baseUrl}${category.image}</image:loc>\n`;
      xml += `      <image:title>${category.name}</image:title>\n`;
      xml += `      <image:caption>Explore ${category.name} AI tools</image:caption>\n`;
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