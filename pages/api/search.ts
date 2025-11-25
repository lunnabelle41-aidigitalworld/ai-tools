import { NextApiRequest, NextApiResponse } from 'next';
import { semanticSearch, Document, ContentType, SearchOptions } from '../../services/searchService';
import { initializeAutocomplete } from '../../services/autocomplete';
import { clusterSearchResults, getClusterStats } from '../../services/searchClustering';
import { logSearchQuery } from '../../services/searchAnalytics';
import path from 'path';
import fs from 'fs/promises';
import { tools as allTools } from '../../data/tools';

// Function to load and format AI tools
function loadAITools(): Document[] {
  // Use only a subset of tools for performance, but more than just 69
  const toolsToUse = allTools.slice(0, 5000); // Use first 5000 tools instead of just 69
  
  return toolsToUse
    .filter((tool): tool is any => tool !== undefined && tool !== null)
    .map(tool => ({
      id: `tool-${tool.id}`,
      type: 'tool' as const,
      title: tool.name || 'Untitled Tool',
      content: `${tool.description || ''} ${tool.category || ''} ${tool.subcategory || ''}`.toLowerCase(),
      url: tool.url || '#',
      category: tool.category || 'Uncategorized',
      subcategory: tool.subcategory || 'General',
      rating: tool.rating || 0,
      pricing: tool.pricing || 'Unknown',
      tags: tool.tags || [],
      features: tool.features || [],
      launchDate: tool.launch_date || undefined,
      lastUpdated: tool.last_updated || undefined,
      favicon: tool.favicon || '',
      publishedAt: new Date(), // Use current date or add a published date to your tools
      summary: tool.description || ''
    }))
    .filter((tool) => 
      tool.id !== undefined && 
      tool.title !== undefined && 
      tool.content !== undefined
    ) as Document[];
}

// Function to extract frontmatter from markdown content
function extractFrontmatter(content: string): Record<string, any> {
  const frontmatter: Record<string, any> = {};
  
  // Try to extract YAML frontmatter
  const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (yamlMatch) {
    try {
      const yaml = yamlMatch[1];
      yaml.split('\n').forEach(line => {
        const [key, ...value] = line.split(':');
        if (key && value) {
          frontmatter[key.trim()] = value.join(':').trim()
            .replace(/^['"](.*)['"]$/, '$1'); // Remove surrounding quotes
        }
      });
    } catch (e) {
      console.warn('Failed to parse YAML frontmatter', e);
    }
  }
  
  return frontmatter;
}

// Function to extract text from markdown (simplified)
function markdownToText(markdown: string): string {
  return markdown
    // Remove YAML frontmatter
    .replace(/^---[\s\S]*?---/, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]*`/g, '')
    // Remove HTML tags
    .replace(/<[^>]*>?/gm, '')
    // Remove markdown links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove emphasis
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// Function to load documents from the blog directory
async function loadBlogDocuments(): Promise<Document[]> {
  try {
    const blogDir = path.join(process.cwd(), 'pages/blog');
    const files = await fs.readdir(blogDir);
    
    const blogFiles = files.filter(file => 
      (file.endsWith('.tsx') || file.endsWith('.md')) && 
      file !== 'index.tsx' && 
      !file.startsWith('_')
    );

    const documents: Document[] = [];
    
    for (const file of blogFiles) {
      try {
        const filePath = path.join(blogDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract frontmatter if exists
        const frontmatter = extractFrontmatter(content);
        
        // Get title from frontmatter or extract from content
        let title = frontmatter.title;
        if (!title) {
          const titleMatch = content.match(/^#\s+(.+)$/m) || 
                           content.match(/<h1[^>]*>([^<]+)<\/h1>/);
          title = titleMatch ? titleMatch[1] : 
                  file.replace(/\.(tsx|md)$/, '').replace(/[-_]/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());
        }
        
        // Extract content and create a clean text version
        const contentText = markdownToText(content);
        const summary = frontmatter.description || 
                       contentText.substring(0, 200) + (contentText.length > 200 ? '...' : '');
        
        // Get or generate slug
        const slug = frontmatter.slug || file.replace(/\.(tsx|md)$/, '');
        
        // Get publish date from frontmatter or file stats
        let publishedAt = new Date();
        if (frontmatter.date) {
          publishedAt = new Date(frontmatter.date);
        } else {
          try {
            const stats = await fs.stat(filePath);
            publishedAt = stats.birthtime;
          } catch (e) {
            console.warn(`Could not get file stats for ${filePath}`, e);
          }
        }
        
        documents.push({
          id: slug,
          type: 'blog' as const,
          title,
          content: contentText,
          summary,
          url: `/blog/${slug}`,
          publishedAt,
          category: frontmatter.category || 'Uncategorized',
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : 
                typeof frontmatter.tags === 'string' ? 
                frontmatter.tags.split(',').map((t: string) => t.trim()) : [],
          author: frontmatter.author || 'AI Vault Team',
          imageUrl: frontmatter.image,
          // Add any additional frontmatter fields as needed
        });
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
    
    return documents;
  } catch (error) {
    console.error('Error loading blog documents:', error);
    return [];
  }
}

// In-memory cache for documents
let cachedDocuments: Document[] = [];
let lastCacheUpdate = 0;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes for better performance

// Search options with defaults
const defaultSearchOptions: SearchOptions = {
  minSimilarity: 0.25, // Increased threshold for better matching
  limit: 30, // Increase limit to show more results
  sortBy: 'relevance',
  sortOrder: 'desc',
  filters: {
    // Default filters can be set here
  }
};

// Predefined documents for non-blog content
const staticDocuments: Document[] = [
  {
    id: 'home',
    type: 'update' as const,
    title: 'Home',
    content: 'Welcome to our AI tools directory. Discover the best AI tools and resources.',
    url: '/',
    publishedAt: new Date('2023-01-01'),
    tags: ['welcome', 'home']
  },
  {
    id: 'about',
    type: 'update' as const,
    title: 'About Us',
    content: 'Learn more about our mission to organize and make AI tools accessible to everyone.',
    url: '/about',
    publishedAt: new Date('2023-01-01'),
    tags: ['about', 'mission']
  },
  {
    id: 'contact',
    type: 'update' as const,
    title: 'Contact',
    content: 'Get in touch with our team for questions or suggestions about AI tools.',
    url: '/contact',
    publishedAt: new Date('2023-01-01'),
    tags: ['contact', 'support']
  }
];

// Search API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  const { 
    q: query, 
    limit, 
    type, 
    category, 
    subcategory,
    minRating, 
    minReviews,
    maxPrice,
    pricingType,
    sortBy,
    sortOrder,
    hasAPI,
    hasMobileApp,
    hasChromeExtension,
    integrationCount,
    toolAge,
    cluster = 'false',
    advancedClustering = 'false',
    clusterCount,
    userId,
    boostFavorites = 'false',
    boostHistory = 'false',
    excludeDisliked = 'false'
  } = req.query;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ 
      success: false,
      message: 'Query parameter is required',
      results: []
    });
  }

  try {
    // Refresh cache if needed
    const now = Date.now();
    if (now - lastCacheUpdate > CACHE_TTL || cachedDocuments.length === 0) {
      console.log('Refreshing document cache...');
      try {
        const [blogDocuments, aiTools] = await Promise.all([
          loadBlogDocuments(),
          loadAITools()
        ]);
        
        cachedDocuments = [
          ...aiTools,
          ...staticDocuments, 
          ...blogDocuments
        ];
        lastCacheUpdate = now;
        console.log(`Cache refreshed with ${cachedDocuments.length} documents`);
              
        // Initialize autocomplete with the new documents
        try {
          await initializeAutocomplete(cachedDocuments);
          console.log('Autocomplete initialized');
        } catch (initError) {
          console.error('Failed to initialize autocomplete:', initError);
        }
      } catch (cacheError) {
        console.error('Error refreshing cache:', cacheError);
        // If cache refresh fails, use existing cache if available
        if (cachedDocuments.length === 0) {
          // If no cache and refresh failed, return error
          return res.status(500).json({ 
            success: false,
            message: 'Failed to load search data',
            results: []
          });
        }
        // Continue with existing cache
      }
    }

    // Build search options from query parameters
    const searchOptions: SearchOptions = {
      ...defaultSearchOptions,
      limit: limit ? Number(limit) : defaultSearchOptions.limit,
      sortBy: sortBy as any || defaultSearchOptions.sortBy,
      sortOrder: sortOrder as any || defaultSearchOptions.sortOrder,
      filters: {
        ...defaultSearchOptions.filters,
        ...(type && { type: type as ContentType | ContentType[] }),
        ...(category && { category: category as string | string[] }),
        ...(subcategory && { subcategory: subcategory as string | string[] }),
        ...(minRating && { minRating: Number(minRating) }),
        ...(minReviews && { minReviews: Number(minReviews) }),
        ...(maxPrice && { maxPrice: Number(maxPrice) }),
        ...(pricingType && { pricingType: pricingType as any }),
        ...(hasAPI && { hasAPI: hasAPI === 'true' }),
        ...(hasMobileApp && { hasMobileApp: hasMobileApp === 'true' }),
        ...(hasChromeExtension && { hasChromeExtension: hasChromeExtension === 'true' }),
        ...(integrationCount && { integrationCount: Number(integrationCount) }),
        ...(toolAge && { toolAge: toolAge as any })
      },
      // Personalization options
      ...(userId && { userId: userId as string }),
      boostFavorites: boostFavorites === 'true',
      boostHistory: boostHistory === 'true',
      excludeDisliked: excludeDisliked === 'true',
      // Clustering options
      clusterResults: cluster === 'true',
      advancedClustering: advancedClustering === 'true',
      ...(clusterCount && { clusterCount: Number(clusterCount) })
    };

    // Perform search with timing
    const startTime = Date.now();
    console.time(`Search API - ${query}`);
    const results = await semanticSearch(query, cachedDocuments, searchOptions);
    console.timeEnd(`Search API - ${query}`);

    // Filter out low-quality results
    const filteredResults = results.filter(result => result.similarity > 0.1);
    
    // Limit results based on options
    const limitedResults = searchOptions.limit 
      ? filteredResults.slice(0, searchOptions.limit)
      : filteredResults.slice(0, 30); // Default limit

    // Log search query for analytics
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    logSearchQuery({
      id: `${Date.now()}-${Math.random()}`,
      query: query as string,
      timestamp: new Date(),
      resultsCount: limitedResults.length,
      responseTime,
      filtersApplied: searchOptions.filters || {},
      sortBy: searchOptions.sortBy || 'relevance',
      userId: undefined // In a real app, this would come from auth/session
    });
    
    return res.status(200).json({ 
      success: true,
      query,
      count: limitedResults.length,
      results: limitedResults.map(({ similarity, _snippet, ...rest }) => ({
        ...rest,
        score: Math.round(similarity * 100) / 100,
        snippet: _snippet || rest.summary?.substring(0, 200) + '...' || '',
        // Add additional metadata for better result display
        matchType: rest.type,
        matchCategory: rest.category,
        matchSubcategory: rest.subcategory,
        matchTags: rest.tags || [],
        matchRating: rest.rating || 0,
        matchPricing: rest.pricing || 'Unknown',
        matchReviews: rest.reviews || 0
      })),
      // Add clustering data if requested
      ...(cluster === 'true' && {
        clusters: clusterSearchResults(limitedResults),
        clusterStats: getClusterStats(clusterSearchResults(limitedResults))
      }),
      facets: {
        categories: Array.from(new Set(cachedDocuments
          .filter(doc => doc.category)
          .map(doc => doc.category as string)
        )),
        types: Array.from(new Set(cachedDocuments
          .map(doc => doc.type)
          .filter(Boolean)
        ))
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error performing search',
      error: error instanceof Error ? error.message : 'Unknown error',
      results: []
    });
  }
}
