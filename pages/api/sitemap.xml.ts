import { NextApiRequest, NextApiResponse } from 'next';
// Remove the mock data import since we'll use actual blog post data
import { readFileSync } from 'fs';
import { join } from 'path';

// Function to get all blog post slugs from the blog directory
function getAllBlogPostSlugs() {
  try {
    // In a real implementation, you would dynamically read the blog directory
    // For now, we'll return a sample of actual blog post IDs from your blog.tsx file
    return [
      'no-code-low-code-revolution-2025',
      'data-science-workstation-2025',
      'ai-powered-content-creation-stack-2025',
      'one-person-game-dev-arsenal-2025',
      'full-stack-web3-developer-kit-2025',
      'beyond-rag-agentic-search-stack',
      'gpu-poor-guide-ai-training',
      'llm-ops-stack-guide',
      'model-kitchen-revolution-fine-tune-open-source-ai',
      'ai-coding-assistants-2025',
      'ai-mental-health-2025',
      'ai-automation-business',
      'ai-design-tools-2024',
      'ai-development-tools-2024',
      'ai-marketing-tools-2024',
      'ai-productivity-tools-2024',
      'ai-tools-comparison-2024',
      'future-of-artificial-intelligence',
      'machine-learning-beginners-guide',
      'top-10-ai-tools-content-creation-2024',
      'ai-transforming-software-development',
      'future-ai-business-analytics',
      'ai-business-analytics-guide',
      'ai-ethics-2024',
      'ai-healthcare-revolution',
      'we-used-ai-to-build-startup-48-hours-stack-cost-reality',
      'beyond-chatgpt-atlas-neo-guide-niche-ai-tools-youve-never-heard-of',
      'ai-education-future',
      'ai-finance-2025',
      'ai-education-2025',
      'ai-cybersecurity-2025',
      'ai-marketing-2025',
      'ai-customer-service-2025',
      'ai-supply-chain-2025',
      'ai-sports-2025',
      'ai-tourism-2025',
      'ai-food-beverage-2025',
      'ai-construction-2025',
      'ai-government-2025',
      'ai-insurance-2025',
      'ai-telecommunications-2025',
      'ai-banking-2025',
      'ai-logistics-2025',
      'ai-hospitality-2025',
      'ai-cybersecurity-2024',
      'ai-content-creation-2024',
      'ai-ecommerce-2024',
      'ai-finance-2024',
      'ai-data-science-2024',
      'ai-healthcare-2024',
      'ai-manufacturing-2024',
      'ai-agriculture-2024',
      'ai-transportation-2024',
      'ai-real-estate-2024',
      'ai-legal-services-2024',
      'ai-human-resources-2024',
      'ai-retail-2024',
      'ai-energy-2024',
      'ai-entertainment-2024',
      'ai-healthcare-2025',
      'ai-manufacturing-2025',
      'ai-agriculture-2025',
      'ai-transportation-2025',
      'ai-real-estate-2025',
      'ai-legal-services-2025',
      'ai-human-resources-2025',
      'ai-retail-2025',
      'ai-energy-2025',
      'ai-entertainment-2025',
      'ai-media-2025',
      'ai-sports-analytics-2025',
      'ai-fashion-2025',
      'ai-music-2025',
      'ai-gaming-2025',
      'ai-construction-2025',
      'ai-utilities-2025',
      'ai-mining-2025',
      'ai-aviation-2025',
      'ai-maritime-2025',
      'ai-financial-technology-2025',
      'ai-future-technologies-2025',
      'ai-space-exploration-2025',
      'ai-robotics-2025',
      'ai-quantum-computing-2025',
      'ai-biotechnology-2025',
      'ai-climate-change-2025',
      'ai-smart-cities-2025',
      'ai-defense-2025',
      'ai-agriculture-technology-2025',
      'ai-environmental-science-2025',
      'ai-renewable-energy-2025',
      'ai-food-technology-2025',
      'ai-water-management-2025',
      'ai-waste-management-2025',
      'ai-forestry-2025',
      'ai-oceanography-2025',
      'ai-philosophy-2025',
      'ai-history-2025',
      'ai-literature-2025',
      'ai-meteorology-2025',
      'ai-geology-2025',
      'ai-archaeology-2025',
      'ai-linguistics-2025',
      'ai-psychology-2025',
      'ai-sociology-2025',
      'ai-anthropology-2025',
      'the-state-of-open-source-2025-funding-fragmentation-future',
      'the-great-consolidation-which-saas-categories-are-dying-and-which-are-thriving',
      'our-aws-bill-was-50-000-how-we-fixed-it-a-cloud-cost-optimization-playbook',
      'the-ultimate-guide-to-developer-onboarding-the-tools-that-make-new-hires-productive-in-day-1',
      'your-team-is-drowning-in-notifications-heres-a-systematic-framework-for-digital-wellness',
      'tool-darwinism-why-the-best-product-doesnt-always-win',
      'the-composability-imperative-why-your-future-stack-will-be-built-like-lego-blocks',
      'the-ethics-of-code-a-developers-guide-to-responsible-tool-selection',
      'from-monolith-to-micro-saas-the-unstoppable-fragmentation-of-software',
      'the-atlas-neo-manifesto-why-the-world-needs-a-smarter-map-of-the-digital-toolscape',
      'the-2025-developers-stack-architectural-blueprint-building-at-scale',
      'beyond-feature-lists-executives-framework-strategic-saas-procurement',
      'the-tool-selection-paradox-why-more-choice-kills-productivity-how-to-fix-it',
      'figma-vs-sketch-vs-penpot-2025-ultimate-ui-ux-platform-showdown',
      'the-low-code-arena-developers-brutally-honest-review-bubble-webflow-adalo',
      'notion-vs-coda-vs-anytype-quest-one-true-workspace',
      'the-invisible-interface-how-ai-agents-will-make-apps-websites-obsolete',
      'pricing-page-teardown-how-top-100-saas-companies-structure-their-plans'
    ];
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/blog', priority: '0.9', changefreq: 'daily' },
  { url: '/blog/neural-stream', priority: '0.9', changefreq: 'daily' },
  { url: '/ai-tools', priority: '0.8', changefreq: 'weekly' },
  { url: '/compare', priority: '0.8', changefreq: 'weekly' },
  { url: '/new-tools', priority: '0.8', changefreq: 'daily' },
  { url: '/suggest-tool', priority: '0.7', changefreq: 'monthly' },
  { url: '/favorites', priority: '0.7', changefreq: 'weekly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/contact', priority: '0.5', changefreq: 'monthly' },
  { url: '/terms', priority: '0.4', changefreq: 'yearly' },
  { url: '/privacy', priority: '0.4', changefreq: 'yearly' }
];

// Get all categories and subcategories from the tools data
// In a real implementation, you would import the actual tools data
function getAllCategoriesAndSubcategories() {
  // This is a simplified version - in reality you would extract this from your tools data
  return {
    categories: [
      'Development', 'Content Creation', 'Business', 'Analytics', 'Design',
      'Marketing', 'Productivity', 'Education', 'Healthcare', 'Finance',
      'Cybersecurity', 'E-commerce', 'Data Science', 'Legal Services',
      'Human Resources', 'Retail', 'Energy', 'Entertainment', 'Manufacturing',
      'Agriculture', 'Transportation', 'Real Estate', 'Media', 'Sports',
      'Fashion', 'Music', 'Gaming', 'Construction', 'Utilities', 'Mining',
      'Aviation', 'Maritime', 'Financial Technology', 'Future Technologies',
      'Space Exploration', 'Robotics', 'Quantum Computing', 'Biotechnology',
      'Climate Change', 'Smart Cities', 'Defense', 'Agriculture Technology',
      'Environmental Science', 'Renewable Energy', 'Food Technology',
      'Water Management', 'Waste Management', 'Forestry', 'Oceanography',
      'Philosophy', 'History', 'Literature', 'Meteorology', 'Geology',
      'Archaeology', 'Linguistics', 'Psychology', 'Sociology', 'Anthropology'
    ],
    subcategories: [
      // This would be dynamically generated from your tools data
      'AI & Generative Art', 'Writing & Content', 'Image Generation',
      'Video Animation', 'AI Agents & Automation', 'Development Tools',
      'Marketing Tools', 'Productivity Tools', 'Tool Comparison',
      'Future Tech', 'Machine Learning', 'Business Automation',
      'Business Analytics', 'AI Ethics', 'Healthcare', 'Education',
      'Finance', 'Cybersecurity', 'E-commerce', 'Data Science',
      'Legal Services', 'Human Resources', 'Retail', 'Energy',
      'Entertainment', 'Manufacturing', 'Agriculture', 'Transportation',
      'Real Estate', 'Media', 'Sports', 'Fashion', 'Music', 'Gaming',
      'Construction', 'Utilities', 'Mining', 'Aviation', 'Maritime',
      'Financial Technology', 'Future Technologies', 'Space Exploration',
      'Robotics', 'Quantum Computing', 'Biotechnology', 'Climate Change',
      'Smart Cities', 'Defense', 'Agriculture Technology',
      'Environmental Science', 'Renewable Energy', 'Food Technology',
      'Water Management', 'Waste Management', 'Forestry', 'Oceanography',
      'Philosophy', 'History', 'Literature', 'Meteorology', 'Geology',
      'Archaeology', 'Linguistics', 'Psychology', 'Sociology', 'Anthropology'
    ]
  };
}

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
    const blogSlugs = getAllBlogPostSlugs();
    blogSlugs.forEach(slug => {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/blog/${slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n\n';
    });

    // Add category pages
    const { categories, subcategories } = getAllCategoriesAndSubcategories();
    categories.forEach(category => {
      const slug = category.toLowerCase().replace(/\s+/g, '-');
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/ai-tools/${slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n\n';
    });

    // Add subcategory pages (simplified - in reality you'd want to match them with their categories)
    subcategories.forEach(subcategory => {
      const slug = subcategory.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/ai-tools/category/${slug}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.6</priority>\n';
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