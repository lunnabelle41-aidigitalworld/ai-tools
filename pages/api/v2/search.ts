import { NextApiRequest, NextApiResponse } from 'next';
import { Document, SearchOptions } from '../../../services/searchService';
import { enhancedSearch } from '../../../services/enhancedSearch';
import { clusterSearchResults } from '../../../services/searchClustering';
import { logSearchQuery } from '../../../services/searchAnalytics';
import path from 'path';
import fs from 'fs/promises';
import { tools as allTools } from '../../../data/tools';

// Reuse the same document loading functions from the original search API
// Function to load and format AI tools
function loadAITools(): Document[] {
  const toolsToUse = allTools.slice(0, 5000);
  
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
      publishedAt: new Date(),
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
            .replace(/^['"](.*)['"]$/, '$1');
        }
      });
    } catch (e) {
      console.warn('Failed to parse YAML frontmatter', e);
    }
  }
  
  return frontmatter;
}

// Function to extract text from markdown
function markdownToText(markdown: string): string {
  return markdown
    .replace(/^---[\s\S]*?---/, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
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
        
        const frontmatter = extractFrontmatter(content);
        
        let title = frontmatter.title;
        if (!title) {
          const titleMatch = content.match(/^#\s+(.+)$/m) || 
                           content.match(/<h1[^>]*>([^<]+)<\/h1>/);
          title = titleMatch ? titleMatch[1] : 
                  file.replace(/\.(tsx|md)$/, '').replace(/[-_]/g, ' ')
                      .replace(/\b\w/g, l => l.toUpperCase());
        }
        
        const contentText = markdownToText(content);
        const summary = frontmatter.description || 
                       contentText.substring(0, 200) + (contentText.length > 200 ? '...' : '');
        
        const slug = frontmatter.slug || file.replace(/\.(tsx|md)$/, '');
        
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
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

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
          ...blogDocuments
        ];
        lastCacheUpdate = now;
        console.log(`Cache refreshed with ${cachedDocuments.length} documents`);
      } catch (cacheError) {
        console.error('Error refreshing cache:', cacheError);
        if (cachedDocuments.length === 0) {
          return res.status(500).json({ 
            success: false,
            message: 'Failed to load search data',
            results: []
          });
        }
      }
    }

    // Build search options
    const searchOptions: SearchOptions = {
      limit: limit ? Number(limit) : 30,
      sortBy: (sortBy as 'relevance' | 'date' | 'rating' | 'title' | 'reviews' | 'popularity' | 'trending' | 'lastUpdated' | 'launchDate') || 'relevance',
      sortOrder: (sortOrder as 'asc' | 'desc') || 'desc',
      filters: {
        ...(type && { type: type as any }),
        ...(category && { category: category as string }),
        ...(subcategory && { subcategory: subcategory as string }),
        ...(minRating && { minRating: Number(minRating) }),
        ...(minReviews && { minReviews: Number(minReviews) }),
        ...(maxPrice && { maxPrice: Number(maxPrice) }),
        ...(pricingType && { pricingType: pricingType as 'Free' | 'Freemium' | 'Paid' | 'Contact' | 'Open Source' | undefined }),
        ...(hasAPI && { hasAPI: hasAPI === 'true' }),
        ...(hasMobileApp && { hasMobileApp: hasMobileApp === 'true' }),
        ...(hasChromeExtension && { hasChromeExtension: hasChromeExtension === 'true' }),
        ...(integrationCount && { integrationCount: Number(integrationCount) }),
        ...(toolAge && { toolAge: toolAge as 'new' | 'established' | 'legacy' | undefined })
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
    console.time(`Enhanced Search API - ${query}`);
    
    // Use the enhanced search service
    const results = await enhancedSearch(query, cachedDocuments, searchOptions);
    
    console.timeEnd(`Enhanced Search API - ${query}`);

    // Filter out low-quality results
    const filteredResults = results.filter(result => result.similarity > 0.1);
    
    // Limit results
    const limitedResults = searchOptions.limit 
      ? filteredResults.slice(0, searchOptions.limit)
      : filteredResults.slice(0, 30);

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
    
    // Prepare response
    const response = {
      success: true,
      query,
      count: limitedResults.length,
      results: limitedResults.map(({ similarity, _snippet, ...rest }) => ({
        ...rest,
        score: Math.round(similarity * 100) / 100,
        snippet: _snippet || rest.summary?.substring(0, 200) + '...' || '',
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
        clusters: clusterSearchResults(limitedResults)
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
      },
      metadata: {
        responseTime: `${responseTime}ms`,
        resultCount: limitedResults.length,
        timestamp: new Date().toISOString()
      }
    };

    return res.status(200).json(response);
  } catch (error: any) {
    console.error('Search error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your search',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
