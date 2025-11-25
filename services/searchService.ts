import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';
import { fuzzyDocumentSearch } from './fuzzySearch';
import { processNaturalLanguageQuery, enhanceSearchResults } from './naturalLanguageProcessor';
import { clusterSearchResults, getClusterStats } from './searchClustering';
import { boostDocumentsForUser, PersonalizedSearchOptions } from './personalizationService';
import { advancedClusterSearchResults, getAdvancedClusterStats } from './advancedSearchClustering';

export type ContentType = 'tool' | 'blog' | 'news' | 'update';

export interface Document {
  // Core fields
  id: string;
  type: ContentType;
  title: string;
  content: string;
  url: string;
  publishedAt?: Date;
  updatedAt?: Date;
  
  // Common metadata
  author?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  features?: string[];
  launchDate?: string;
  lastUpdated?: string;
  
  // Tool-specific fields
  rating?: number;
  pricing?: string | { free?: boolean; paid?: boolean; plans?: string[] };
  favicon?: string;
  
  // Blog/News specific fields
  summary?: string;
  imageUrl?: string;
  
  // Allow additional properties
  [key: string]: any;
}

export interface SearchResult extends Document {
  similarity: number;
  type: ContentType;
  _snippet?: string;
}

// Simple text-based search as a fallback
const simpleTextSearch = (
  query: string,
  documents: Document[],
  options: SearchOptions = {}
): SearchResult[] => {
  // Handle advanced search operators for text search as well
  let processedQuery = query;
  const advancedFilters: any = {};
  
  // Extract quoted phrases
  const phrases = query.match(/"([^"]+)"/g);
  const phraseTerms: string[] = [];
  if (phrases) {
    phrases.forEach(phrase => {
      const cleanPhrase = phrase.replace(/"/g, '').trim();
      if (cleanPhrase) {
        phraseTerms.push(cleanPhrase);
        processedQuery = processedQuery.replace(phrase, '');
      }
    });
  }
  
  // Extract category filters
  const categoryMatches = query.match(/category:([^\s]+)/gi);
  if (categoryMatches) {
    categoryMatches.forEach(match => {
      const category = match.split(':')[1];
      if (category) {
        if (!advancedFilters.category) advancedFilters.category = [];
        advancedFilters.category.push(category);
        processedQuery = processedQuery.replace(match, '');
      }
    });
  }
  
  // Extract tag filters
  const tagMatches = query.match(/tag:([^\s]+)/gi);
  if (tagMatches) {
    tagMatches.forEach(match => {
      const tag = match.split(':')[1];
      if (tag) {
        if (!advancedFilters.tags) advancedFilters.tags = [];
        advancedFilters.tags.push(tag);
        processedQuery = processedQuery.replace(match, '');
      }
    });
  }
  
  // Extract rating filters
  const ratingMatches = query.match(/rating:([><]?)([\d.]+)/gi);
  if (ratingMatches) {
    ratingMatches.forEach(match => {
      const parts = match.split(':')[1].match(/([><]?)([\d.]+)/);
      if (parts && parts[2]) {
        const operator = parts[1] || '>';
        const rating = parseFloat(parts[2]);
        if (operator === '>' || operator === '') {
          advancedFilters.minRating = rating;
        }
        processedQuery = processedQuery.replace(match, '');
      }
    });
  }
  
  // Clean up query
  processedQuery = processedQuery
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s\-\+#]/g, '')
    .replace(/\s+/g, ' ');
  
  // Merge advanced filters with options
  const combinedOptions = { ...options };
  if (Object.keys(advancedFilters).length > 0) {
    combinedOptions.filters = { ...options.filters, ...advancedFilters };
  }
  
  // Apply filters first
  let filteredDocs = applyFilters(documents, combinedOptions.filters);
  
  // Get query terms
  const queryTerms = processedQuery.split(/\s+/).filter(term => term.length >= 2);
  
  const results = filteredDocs.map(doc => {
    const text = `${doc.title} ${doc.content}`.toLowerCase();
    let score = 0;
    
    // Score phrase matches
    phraseTerms.forEach(phrase => {
      if (text.includes(phrase.toLowerCase())) {
        score += 20; // High boost for exact phrase matches
      }
    });
    
    // Simple term frequency scoring with better weighting
    queryTerms.forEach(term => {
      if (term.length < 2) return; // Skip very short terms
      const regex = new RegExp(`\\b${term}\\b`, 'gi'); // Match whole words only
      const matches = text.match(regex);
      if (matches) score += matches.length * 2; // Double weight for exact word matches
      
      // Boost score significantly if term is in title
      if (doc.title.toLowerCase().includes(term)) {
        score += 10;
      }
      
      // Additional boost for category and subcategory matches
      if (doc.category && doc.category.toLowerCase().includes(term)) {
        score += 5;
      }
      if (doc.subcategory && doc.subcategory.toLowerCase().includes(term)) {
        score += 3;
      }
      
      // Boost for tag matches
      if (doc.tags) {
        const tagMatches = doc.tags.filter(tag => tag.toLowerCase().includes(term)).length;
        score += tagMatches * 2;
      }
    });
    
    return {
      ...doc,
      similarity: Math.min(score / 20, 1), // Normalize score to 0-1 range
      _snippet: generateSnippet(doc.content, processedQuery, 150)
    };
  });
  
  // Filter out very low scoring results
  const filteredResults = results.filter(result => result.similarity > 0.1);
  
  return sortResults(filteredResults, combinedOptions);
};

export interface SearchOptions {
  limit?: number;
  minSimilarity?: number;
  filters?: {
    type?: ContentType | ContentType[];
    category?: string | string[];
    tags?: string[];
    minRating?: number;
    maxPrice?: number;
    // New filters
    subcategory?: string | string[];
    pricingType?: 'Free' | 'Freemium' | 'Paid' | 'Contact' | 'Open Source';
    minReviews?: number;
    title?: string | string[];
    date?: string;
    // Advanced filters
    features?: string | string[];
    launchDateFrom?: string;
    launchDateTo?: string;
    lastUpdatedFrom?: string;
    lastUpdatedTo?: string;
    hasFreePlan?: boolean;
    hasPaidPlan?: boolean;
    // Additional advanced filters
    minPopularity?: number;
    maxPopularity?: number;
    trendingScore?: number;
    hasAPI?: boolean;
    hasMobileApp?: boolean;
    hasChromeExtension?: boolean;
    integrationCount?: number;
    updateFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    toolAge?: 'new' | 'established' | 'legacy';
    vendorSize?: 'startup' | 'midsize' | 'enterprise';
  };
  sortBy?: 'relevance' | 'date' | 'rating' | 'title' | 'reviews' | 'popularity' | 'trending' | 'lastUpdated' | 'launchDate';
  sortOrder?: 'asc' | 'desc';
  // Personalization options
  userId?: string;
  boostFavorites?: boolean;
  boostHistory?: boolean;
  excludeDisliked?: boolean;
  personalizedRanking?: boolean;
  // Clustering options
  clusterResults?: boolean;
  clusterCount?: number;
  advancedClustering?: boolean;
  // Advanced search options
  includeSnippets?: boolean;
  highlightTerms?: boolean;
  fuzzyMatch?: boolean;
  fuzzyThreshold?: number;
  // Semantic search options
  semanticWeight?: number;
  keywordWeight?: number;
  phraseMatchBoost?: number;
}

// Initialize model with proper type
let model: use.UniversalSentenceEncoder | null = null;

// Cache for search results
const searchCache = new Map<string, SearchResult[]>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Cache for document embeddings
const embeddingCache = new Map<string, number[]>();

// Simple in-memory cache with TTL
class Cache<T> {
  private cache = new Map<string, { data: T; expires: number }>();

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  set(key: string, value: T, ttl: number = CACHE_TTL): void {
    this.cache.set(key, {
      data: value,
      expires: Date.now() + ttl
    });
  }
}

const searchResultCache = new Cache<SearchResult[]>();
const embeddingResultCache = new Cache<number[]>();

/**
 * Load the Universal Sentence Encoder model with error handling and caching
 */
const loadModel = async (): Promise<use.UniversalSentenceEncoder> => {
  if (!model) {
    try {
      console.time('Model loading');
      model = await use.load({
        modelUrl: 'https://storage.googleapis.com/tfjs-models/savedmodel/universal-sentence-encoder-lite/model.json'
      });
      console.timeEnd('Model loading');
    } catch (error) {
      console.error('Failed to load model:', error);
      throw new Error('Failed to load the Universal Sentence Encoder model');
    }
  }
  return model;
};

/**
 * Get embeddings for an array of text strings with caching
 */
const getEmbeddings = async (texts: string[]): Promise<number[][]> => {
  try {
    const model = await loadModel();
    const results: number[][] = [];
    const textsToProcess: {text: string; index: number}[] = [];
    
    // Check cache first
    texts.forEach((text, index) => {
      const cached = embeddingResultCache.get(text);
      if (cached) {
        results[index] = cached;
      } else {
        textsToProcess.push({ text, index });
      }
    });

    // Process only uncached texts in batches
    if (textsToProcess.length > 0) {
      const batchSize = 32; // Process in batches to avoid memory issues
      for (let i = 0; i < textsToProcess.length; i += batchSize) {
        const batch = textsToProcess.slice(i, i + batchSize);
        const batchTexts = batch.map(item => item.text);
        
        console.time(`Embedding batch ${i / batchSize + 1}`);
        const embeddings = await model.embed(batchTexts);
        const vectors = embeddings.arraySync() as number[][];
        console.timeEnd(`Embedding batch ${i / batchSize + 1}`);
        
        // Cache results
        batch.forEach((item, idx) => {
          results[item.index] = vectors[idx];
          embeddingResultCache.set(item.text, vectors[idx]);
        });
        
        // Clean up tensors to free memory
        embeddings.dispose();
        await tf.nextFrame(); // Allow UI to update during long operations
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error getting embeddings:', error);
    throw error;
  }
};

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    magnitudeA += vecA[i] * vecA[i];
    magnitudeB += vecB[i] * vecB[i];
  }
  
  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);
  
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Apply filters to documents
 */
function applyFilters(documents: Document[], filters: SearchOptions['filters'] = {}): Document[] {
  if (!filters) return documents;
  
  return documents.filter(doc => {
    // Filter by type
    if (filters.type) {
      const types = Array.isArray(filters.type) ? filters.type : [filters.type];
      if (!types.includes(doc.type)) return false;
    }
    
    // Filter by category
    if (filters.category && doc.category) {
      const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
      if (!categories.some(cat => 
        doc.category?.toLowerCase().includes(cat.toLowerCase()) ||
        doc.subcategory?.toLowerCase().includes(cat.toLowerCase())
      )) return false;
    }
    
    // Filter by subcategory
    if (filters.subcategory && doc.subcategory) {
      const subcategories = Array.isArray(filters.subcategory) ? filters.subcategory : [filters.subcategory];
      if (!subcategories.some(sub => 
        doc.subcategory?.toLowerCase().includes(sub.toLowerCase())
      )) return false;
    }
    
    // Filter by tags
    if (filters.tags?.length && doc.tags?.length) {
      const docTags = new Set(doc.tags.map(t => t.toLowerCase()));
      if (!filters.tags.some(tag => docTags.has(tag.toLowerCase()))) {
        return false;
      }
    }
    
    // Filter by rating
    if (filters.minRating !== undefined && (doc.rating || 0) < filters.minRating) {
      return false;
    }
    
    // Filter by minimum reviews
    if (filters.minReviews !== undefined && (doc.reviews || 0) < filters.minReviews) {
      return false;
    }
    
    // Filter by price (for tools)
    if (filters.maxPrice !== undefined && doc.pricing) {
      // Simple price extraction - you might want to enhance this
      if (typeof doc.pricing === 'string') {
        const priceMatch = doc.pricing.match(/\$([\d.]+)/);
        if (priceMatch) {
          const price = parseFloat(priceMatch[1]);
          if (price > filters.maxPrice) return false;
        }
      }
    }
    
    // Filter by pricing type
    if (filters.pricingType && doc.pricing) {
      const pricingType = filters.pricingType.toLowerCase();
      if (typeof doc.pricing === 'string' && !doc.pricing.toLowerCase().includes(pricingType)) return false;
    }
    
    // Filter by title (for brand/tool searches)
    if (filters.title && doc.title) {
      const titles = Array.isArray(filters.title) ? filters.title : [filters.title];
      if (!titles.some(title => 
        doc.title?.toLowerCase().includes(title.toLowerCase())
      )) return false;
    }
    
    // Filter by date
    if (filters.date && doc.publishedAt) {
      const filterDate = new Date(filters.date);
      const docDate = new Date(doc.publishedAt);
      // For now, we'll just check if the document was published after the filter date
      if (docDate < filterDate) return false;
    }
    
    // Filter by features
    if (filters.features && doc.features?.length) {
      const filterFeatures = Array.isArray(filters.features) ? filters.features : [filters.features];
      const docFeatures = new Set(doc.features.map((f: string) => f.toLowerCase()));
      if (!filterFeatures.some(feature => docFeatures.has(feature.toLowerCase()))) {
        return false;
      }
    }
    
    // Filter by launch date range
    if ((filters.launchDateFrom || filters.launchDateTo) && doc.launchDate) {
      const docLaunchDate = new Date(doc.launchDate);
      if (filters.launchDateFrom) {
        const fromDate = new Date(filters.launchDateFrom);
        if (docLaunchDate < fromDate) return false;
      }
      if (filters.launchDateTo) {
        const toDate = new Date(filters.launchDateTo);
        if (docLaunchDate > toDate) return false;
      }
    }
    
    // Filter by last updated date range
    if ((filters.lastUpdatedFrom || filters.lastUpdatedTo) && doc.lastUpdated) {
      const docLastUpdated = new Date(doc.lastUpdated);
      if (filters.lastUpdatedFrom) {
        const fromDate = new Date(filters.lastUpdatedFrom);
        if (docLastUpdated < fromDate) return false;
      }
      if (filters.lastUpdatedTo) {
        const toDate = new Date(filters.lastUpdatedTo);
        if (docLastUpdated > toDate) return false;
      }
    }
    
    // Filter by free plan availability
    if (filters.hasFreePlan !== undefined && doc.pricing) {
      // Check if the pricing object has a free property
      if (typeof doc.pricing === 'object' && doc.pricing !== null && 'free' in doc.pricing) {
        const pricingObj = doc.pricing as { free?: boolean };
        if (filters.hasFreePlan !== pricingObj.free) return false;
      } else if (filters.hasFreePlan) {
        // If pricing is a string, check if it contains "free"
        if (typeof doc.pricing === 'string' && !doc.pricing.toLowerCase().includes('free')) return false;
      }
    }
    
    // Filter by paid plan availability
    if (filters.hasPaidPlan !== undefined && doc.pricing) {
      // Check if the pricing object has a paid property
      if (typeof doc.pricing === 'object' && doc.pricing !== null && 'paid' in doc.pricing) {
        const pricingObj = doc.pricing as { paid?: boolean };
        if (filters.hasPaidPlan !== pricingObj.paid) return false;
      } else if (filters.hasPaidPlan) {
        // If pricing is a string, check if it contains paid-related terms
        if (typeof doc.pricing === 'string' && 
            !(doc.pricing.toLowerCase().includes('paid') || 
              doc.pricing.toLowerCase().includes('$') || 
              doc.pricing.toLowerCase().includes('plan'))) return false;
      }
    }
    
    // Filter by API availability
    if (filters.hasAPI !== undefined && doc.features) {
      const hasAPI = doc.features.some((f: string) => 
        f.toLowerCase().includes('api') || f.toLowerCase().includes('sdk')
      );
      if (filters.hasAPI !== hasAPI) return false;
    }
    
    // Filter by mobile app availability
    if (filters.hasMobileApp !== undefined && doc.features) {
      const hasMobileApp = doc.features.some((f: string) => 
        f.toLowerCase().includes('mobile') || f.toLowerCase().includes('app')
      );
      if (filters.hasMobileApp !== hasMobileApp) return false;
    }
    
    // Filter by Chrome extension availability
    if (filters.hasChromeExtension !== undefined && doc.features) {
      const hasChromeExtension = doc.features.some((f: string) => 
        f.toLowerCase().includes('chrome') || f.toLowerCase().includes('extension')
      );
      if (filters.hasChromeExtension !== hasChromeExtension) return false;
    }
    
    // Filter by integration count
    if (filters.integrationCount !== undefined && doc.features) {
      const integrationCount = doc.features.filter((f: string) => 
        f.toLowerCase().includes('integration') || f.toLowerCase().includes('connect')
      ).length;
      if (integrationCount < filters.integrationCount) return false;
    }
    
    // Filter by tool age
    if (filters.toolAge && doc.launchDate) {
      const launchDate = new Date(doc.launchDate);
      const now = new Date();
      const yearsSinceLaunch = (now.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      
      switch (filters.toolAge) {
        case 'new':
          if (yearsSinceLaunch >= 1) return false;
          break;
        case 'established':
          if (yearsSinceLaunch < 1 || yearsSinceLaunch >= 3) return false;
          break;
        case 'legacy':
          if (yearsSinceLaunch < 3) return false;
          break;
      }
    }
    
    return true;
  });
}

/**
 * Sort search results
 */
function sortResults(results: SearchResult[], options: SearchOptions = {}): SearchResult[] {
  const {
    sortBy = 'relevance',
    sortOrder = 'desc'
  } = options;
  
  return [...results].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        comparison = dateB - dateA; // Newest first by default
        break;
        
      case 'rating':
        comparison = (b.rating || 0) - (a.rating || 0);
        break;
        
      case 'reviews':
        comparison = (b.reviews || 0) - (a.reviews || 0);
        break;
        
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
        
      case 'popularity':
        // Use a combination of rating and reviews for popularity
        const popularityA = (a.rating || 0) * (a.reviews || 1);
        const popularityB = (b.rating || 0) * (b.reviews || 1);
        comparison = popularityB - popularityA;
        break;
        
      case 'trending':
        // For trending, prioritize recently updated items with good ratings
        const nowTrending = Date.now();
        const lastUpdatedATrending = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
        const lastUpdatedBTrending = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
        const daysSinceUpdateATrending = (nowTrending - lastUpdatedATrending) / (1000 * 60 * 60 * 24);
        const daysSinceUpdateBTrending = (nowTrending - lastUpdatedBTrending) / (1000 * 60 * 60 * 24);
        
        // Weight by recency (inverse) and rating
        const trendingScoreA = (a.rating || 0) / (1 + daysSinceUpdateATrending / 7); // Weight by weeks
        const trendingScoreB = (b.rating || 0) / (1 + daysSinceUpdateBTrending / 7);
        
        comparison = trendingScoreB - trendingScoreA;
        break;
        
      case 'lastUpdated':
        const lastUpdatedValA = a.lastUpdated ? new Date(a.lastUpdated).getTime() : 0;
        const lastUpdatedValB = b.lastUpdated ? new Date(b.lastUpdated).getTime() : 0;
        comparison = lastUpdatedValB - lastUpdatedValA;
        break;
        
      case 'launchDate':
        const launchDateValA = a.launchDate ? new Date(a.launchDate).getTime() : 0;
        const launchDateValB = b.launchDate ? new Date(b.launchDate).getTime() : 0;
        comparison = launchDateValB - launchDateValA;
        break;
        
      case 'relevance':
      default:
        comparison = (b.similarity || 0) - (a.similarity || 0);
        break;
    }
    
    return sortOrder === 'asc' ? -comparison : comparison;
  });
}

/**
 * Generate a text snippet around the first occurrence of the query in the content
 */
function generateSnippet(content: string, query: string, maxLength: number = 200): string {
  if (!content || !query) return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  
  const queryLower = query.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // Try to find exact match first
  let queryIndex = contentLower.indexOf(queryLower);
  
  // If not found, try to find any of the query terms
  if (queryIndex === -1) {
    const queryTerms = queryLower.split(/\s+/);
    for (const term of queryTerms) {
      if (term.length > 2) { // Skip very short terms
        queryIndex = contentLower.indexOf(term);
        if (queryIndex !== -1) break;
      }
    }
  }
  
  // If still not found, return beginning of content
  if (queryIndex === -1) {
    return content.slice(0, maxLength) + (content.length > maxLength ? '...' : '');
  }
  
  const start = Math.max(0, queryIndex - maxLength / 2);
  const end = Math.min(content.length, queryIndex + query.length + maxLength / 2);
  
  let snippet = content.slice(start, end);
  if (start > 0) snippet = `...${snippet}`;
  if (end < content.length) snippet = `${snippet}...`;
  
  // Highlight query terms in the snippet
  const queryTerms = queryLower.split(/\s+/);
  queryTerms.forEach(term => {
    if (term.length > 1) {
      const regex = new RegExp(`(${term})`, 'gi');
      snippet = snippet.replace(regex, '**$1**');
    }
  });
  
  return snippet;
}

/**
 * Enhanced semantic search with filters, caching, and optimizations
 */
// Simple in-memory store for search analytics
const searchAnalytics = {
  totalSearches: 0,
  cacheHits: 0,
  averageResponseTime: 0,
  searchTerms: new Map<string, number>()
};

// Function to get search analytics
export const getSearchAnalytics = () => {
  // Get top search terms
  const topTerms = Array.from(searchAnalytics.searchTerms.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([term, count]) => ({ term, count }));
  
  return {
    totalSearches: searchAnalytics.totalSearches,
    cacheHitRate: searchAnalytics.totalSearches > 0 
      ? Math.round((searchAnalytics.cacheHits / searchAnalytics.totalSearches) * 10000) / 100
      : 0,
    averageResponseTime: Math.round(searchAnalytics.averageResponseTime * 100) / 100,
    topSearchTerms: topTerms
  };
};

export const semanticSearch = async (
  query: string, 
  documents: Document[],
  options: SearchOptions = {}
): Promise<SearchResult[]> => {
  const startTime = Date.now();
  
  // Process natural language query
  const processedQuery = processNaturalLanguageQuery(query);
  
  // Merge natural language filters with provided options
  const mergedOptions = { ...options };
  if (Object.keys(processedQuery.filters).length > 0) {
    mergedOptions.filters = { ...options.filters, ...processedQuery.filters };
  }
  
  // Apply sorting preferences from natural language processing
  if (processedQuery.sortBy && !options.sortBy) {
    mergedOptions.sortBy = processedQuery.sortBy;
  }
  if (processedQuery.sortOrder && !options.sortOrder) {
    mergedOptions.sortOrder = processedQuery.sortOrder;
  }
  
  // Apply limit from natural language processing
  if (processedQuery.limit && !options.limit) {
    mergedOptions.limit = processedQuery.limit;
  }
  
  const cacheKey = `${processedQuery.processedQuery}-${JSON.stringify(mergedOptions.filters)}`;
  
  // Track search terms
  searchAnalytics.totalSearches++;
  searchAnalytics.searchTerms.set(query, (searchAnalytics.searchTerms.get(query) || 0) + 1);
  
  // Check cache first
  const cachedResults = searchResultCache.get(cacheKey);
  if (cachedResults) {
    console.log('Returning cached results for:', query);
    searchAnalytics.cacheHits++;
    const responseTime = Date.now() - startTime;
    searchAnalytics.averageResponseTime = (searchAnalytics.averageResponseTime * (searchAnalytics.totalSearches - 1) + responseTime) / searchAnalytics.totalSearches;
    return cachedResults;
  }
  if (!query || !documents?.length) return [];
  
  // For very short queries or when semantic search fails, try fuzzy search
  let useFuzzySearch = processedQuery.processedQuery.length < 4 || processedQuery.processedQuery.includes('~');
  
  // For very short queries, use simple text search for better performance
  if (processedQuery.processedQuery.length < 3) {
    console.log('Using simple text search for short query:', processedQuery.processedQuery);
    return simpleTextSearch(processedQuery.processedQuery, documents, mergedOptions);
  }
  
  // Handle fuzzy search operator (~)
  let finalQuery = processedQuery.processedQuery;
  let fuzzyThreshold = 0.6;
  
  if (processedQuery.processedQuery.includes('~')) {
    useFuzzySearch = true;
    // Extract threshold if specified (e.g., ~0.8)
    const thresholdMatch = processedQuery.processedQuery.match(/~([0-9.]+)/);
    if (thresholdMatch && thresholdMatch[1]) {
      fuzzyThreshold = parseFloat(thresholdMatch[1]);
      finalQuery = processedQuery.processedQuery.replace(/~[0-9.]+/, '').trim();
    } else {
      finalQuery = processedQuery.processedQuery.replace(/~/g, '').trim();
    }
  }
  
  // Handle advanced search operators
  const advancedFilters: any = {};
  
  // Extract quoted phrases
  const phrases = finalQuery.match(/"([^"]+)"/g);
  if (phrases) {
    phrases.forEach(phrase => {
      finalQuery = finalQuery.replace(phrase, '');
    });
  }
  
  // Extract category filters (category:AI)
  const categoryMatches = finalQuery.match(/category:([^\s]+)/gi);
  if (categoryMatches) {
    categoryMatches.forEach(match => {
      const category = match.split(':')[1];
      if (category) {
        if (!advancedFilters.category) advancedFilters.category = [];
        advancedFilters.category.push(category);
        finalQuery = finalQuery.replace(match, '');
      }
    });
  }
  
  // Extract tag filters (tag:free)
  const tagMatches = finalQuery.match(/tag:([^\s]+)/gi);
  if (tagMatches) {
    tagMatches.forEach(match => {
      const tag = match.split(':')[1];
      if (tag) {
        if (!advancedFilters.tags) advancedFilters.tags = [];
        advancedFilters.tags.push(tag);
        finalQuery = finalQuery.replace(match, '');
      }
    });
  }
  
  // Extract rating filters (rating:>4)
  const ratingMatches = finalQuery.match(/rating:([><]?)([\d.]+)/gi);
  if (ratingMatches) {
    ratingMatches.forEach(match => {
      const parts = match.split(':')[1].match(/([><]?)([\d.]+)/);
      if (parts && parts[2]) {
        const operator = parts[1] || '>';
        const rating = parseFloat(parts[2]);
        if (operator === '>' || operator === '') {
          advancedFilters.minRating = rating;
        } else if (operator === '<') {
          // We don't have max rating filter, but could add if needed
        }
        finalQuery = finalQuery.replace(match, '');
      }
    });
  }
  
  // Clean up query
  finalQuery = finalQuery
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s\-\+#]/g, '') // Remove special characters except spaces, hyphens, and #
    .replace(/\s+/g, ' '); // Normalize whitespace
  
  // Merge advanced filters with options
  if (Object.keys(advancedFilters).length > 0) {
    mergedOptions.filters = { ...mergedOptions.filters, ...advancedFilters };
  }
  
  const {
    minSimilarity = 0.2,
    limit,
    filters,
    ...sortOptions
  } = mergedOptions;
  
  try {
    // Apply filters first to reduce the search space
    const filteredDocs = applyFilters(documents, mergedOptions.filters);
    
    // If no documents match filters, return empty array
    if (filteredDocs.length === 0) {
      return [];
    }
    
      // For very large datasets, use a more efficient search strategy
    if (filteredDocs.length > 1000) {
      console.log(`Using batch search for ${filteredDocs.length} documents`);
      return await batchSemanticSearch(finalQuery, filteredDocs, 100, mergedOptions);
    }
    
    // Get query and document embeddings
    console.time('Get embeddings');
    const [queryEmbedding] = await getEmbeddings([finalQuery]);
    // Optimize content by using title + description for better relevance
    const docTexts = filteredDocs.map(doc => `${doc.title} ${doc.summary || doc.content.substring(0, 500)}`);
    const docEmbeddings = await getEmbeddings(docTexts);
    console.timeEnd('Get embeddings');
    
    // Calculate similarities
    console.time('Calculate similarities');
    const results: SearchResult[] = [];
    
    // Process in chunks to avoid blocking the main thread
    const chunkSize = 100;
    for (let i = 0; i < filteredDocs.length; i += chunkSize) {
      const chunk = filteredDocs.slice(i, i + chunkSize);
      const chunkEmbeddings = docEmbeddings.slice(i, i + chunkSize);
      
      const chunkResults = chunk.map((doc, j) => {
        let similarity = cosineSimilarity(queryEmbedding, chunkEmbeddings[j]);
        
        // Boost similarity for favorited categories/tags if requested
        if (mergedOptions.boostFavorites && mergedOptions.userId) {
          // This would integrate with the searchHistory service
          // For now, we'll add a small boost for docs with high ratings
          if (doc.rating && doc.rating >= 4.5) {
            similarity = Math.min(1, similarity + 0.1);
          }
        }
        
        return {
          ...doc,
          similarity,
          type: doc.type,
          _snippet: generateSnippet(doc.content, finalQuery, 150)
        };
      });
      
      results.push(...chunkResults);
      await tf.nextFrame(); // Allow UI to update during long operations
    }
    console.timeEnd('Calculate similarities');
    
    // Sort and limit results
    console.time('Sort results');
    const sortedResults = sortResults(results, mergedOptions);
    console.timeEnd('Sort results');
    
    // Apply fuzzy search if requested
    let finalResults = sortedResults;
    if (useFuzzySearch && finalQuery) {
      console.log(`Applying fuzzy search with threshold ${fuzzyThreshold}`);
      const fuzzyResults = fuzzyDocumentSearch(finalQuery, sortedResults, fuzzyThreshold);
      // Merge fuzzy scores with semantic scores
      finalResults = fuzzyResults.map((fuzzyResult: { document: any; similarity: number }) => ({
        ...fuzzyResult.document,
        similarity: Math.min(1, (fuzzyResult.document.similarity || 0) + fuzzyResult.similarity * 0.3)
      }));
      // Re-sort by combined scores
      finalResults = sortResults(finalResults, mergedOptions);
    }
    
    // Enhance results based on query intent
    let enhancedResults = enhanceSearchResults(finalResults, processedQuery.intent);
    
    // Apply personalization if user ID is provided
    if (mergedOptions.userId) {
      enhancedResults = boostDocumentsForUser(enhancedResults, mergedOptions.userId, {
        boostFavorites: mergedOptions.boostFavorites || false,
        boostHistory: mergedOptions.boostHistory || false,
        excludeDisliked: mergedOptions.excludeDisliked || false,
        personalizedRanking: mergedOptions.personalizedRanking || false
      });
      
      // Re-sort by boosted scores
      enhancedResults = sortResults(enhancedResults, mergedOptions);
    }
    
    // Apply clustering if requested
    if (mergedOptions.clusterResults) {
      const clusteredResults = mergedOptions.advancedClustering 
        ? advancedClusterSearchResults(enhancedResults, mergedOptions.clusterCount || 8)
        : clusterSearchResults(enhancedResults);
      
      // Flatten clusters back to results with cluster information
      enhancedResults = clusteredResults.flatMap(cluster => 
        cluster.results.map(result => ({
          ...result,
          clusterId: cluster.id,
          clusterTitle: cluster.title,
          clusterDescription: (cluster as any).description, // Only in advanced clustering
          clusterRating: (cluster as any).averageRating // Only in advanced clustering
        }))
      );
    }
    
    // Cache the results
    searchResultCache.set(cacheKey, enhancedResults);
    
    // Log search performance
    const responseTime = Date.now() - startTime;
    searchAnalytics.averageResponseTime = (searchAnalytics.averageResponseTime * (searchAnalytics.totalSearches - 1) + responseTime) / searchAnalytics.totalSearches;
    console.log(`Search completed for "${query}" in ${filteredDocs.length} documents, found ${enhancedResults.length} results in ${responseTime}ms`);
    
    return enhancedResults;
  } catch (error) {
    console.error('Error in semantic search:', error);
    // Fallback to simple text search if semantic search fails
    console.log('Falling back to text search');
    return simpleTextSearch(query, documents, options);
  }
};

/**
 * Optimized batch processing for large datasets
 */
export const batchSemanticSearch = async (
  query: string,
  documents: Document[],
  batchSize: number = 100,
  options: SearchOptions = {}
): Promise<SearchResult[]> => {
  const cacheKey = `batch-${query}-${JSON.stringify(options.filters)}`;
  const cached = searchResultCache.get(cacheKey);
  if (cached) return cached;
  
  console.log(`Processing ${documents.length} documents in batches of ${batchSize}`);
  
  // For large datasets, process in smaller batches for better performance
  if (documents.length > 5000) {
    batchSize = 50; // Use smaller batches for very large datasets
  }
    
  return semanticSearch(query, documents, options);
};

/**
 * Load all documents from various sources
 * This function combines AI tools, blog posts, and static documents
 */
export const loadDocuments = async (): Promise<Document[]> => {
  // Import the necessary functions and data
  const { tools: allTools } = await import('../data/tools');
  
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
  
  // Static documents for non-blog content
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
  
  // Load AI tools
  const aiTools = loadAITools();
  
  // Combine all documents
  return [
    ...aiTools,
    ...staticDocuments
  ];
};

// Export clustering functions
export { clusterSearchResults, getClusterStats } from './searchClustering';

// Export types and functions for external use
// Types and functions are already exported directly above
