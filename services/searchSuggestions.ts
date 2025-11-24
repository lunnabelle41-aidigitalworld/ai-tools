/**
 * Search suggestions service for providing intelligent search recommendations
 */

import { Document } from './searchService';

// Suggestion types
export type SuggestionType = 
  | 'query' 
  | 'category' 
  | 'subcategory' 
  | 'tag' 
  | 'popular' 
  | 'trending' 
  | 'recent';

// Search suggestion interface
export interface SearchSuggestion {
  id: string;
  type: SuggestionType;
  text: string;
  category?: string;
  subcategory?: string;
  query?: string;
  popularity?: number;
  recency?: number;
  confidence?: number;
}

// In-memory storage for search suggestions
const suggestionCache = new Map<string, SearchSuggestion[]>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Popular queries and their frequencies
const popularQueries = new Map<string, number>();

// Recent searches
const recentSearches: { query: string; timestamp: number }[] = [];

// Trending queries (recently popular)
const trendingQueries = new Map<string, { count: number; timestamp: number }>();

/**
 * Add a search query to the tracking system
 */
export function trackSearchQuery(query: string): void {
  if (!query || query.trim().length === 0) return;
  
  const normalizedQuery = query.trim().toLowerCase();
  
  // Track popular queries
  const currentCount = popularQueries.get(normalizedQuery) || 0;
  popularQueries.set(normalizedQuery, currentCount + 1);
  
  // Track recent searches
  recentSearches.unshift({
    query: normalizedQuery,
    timestamp: Date.now()
  });
  
  // Keep only last 100 recent searches
  if (recentSearches.length > 100) {
    recentSearches.pop();
  }
  
  // Track trending queries (queries searched in the last hour)
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const trendingEntry = trendingQueries.get(normalizedQuery) || { count: 0, timestamp: Date.now() };
  trendingEntry.count += 1;
  trendingEntry.timestamp = Date.now();
  trendingQueries.set(normalizedQuery, trendingEntry);
  
  // Clean up old trending entries
  for (const [key, value] of trendingQueries.entries()) {
    if (value.timestamp < oneHourAgo) {
      trendingQueries.delete(key);
    }
  }
}

/**
 * Get popular search suggestions
 */
function getPopularSuggestions(limit: number = 10): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  
  // Convert map to array and sort by popularity
  const sortedQueries = Array.from(popularQueries.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
  
  sortedQueries.forEach(([query, count], index) => {
    suggestions.push({
      id: `popular-${index}`,
      type: 'popular',
      text: query,
      popularity: count,
      confidence: Math.min(1, count / 10) // Normalize confidence
    });
  });
  
  return suggestions;
}

/**
 * Get trending search suggestions
 */
function getTrendingSuggestions(limit: number = 10): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  
  // Convert map to array and sort by recency and frequency
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const recentTrending = Array.from(trendingQueries.entries())
    .filter(([_, entry]) => entry.timestamp > oneHourAgo)
    .sort((a, b) => {
      // Sort by count first, then by recency
      const countDiff = b[1].count - a[1].count;
      if (countDiff !== 0) return countDiff;
      return b[1].timestamp - a[1].timestamp;
    })
    .slice(0, limit);
  
  recentTrending.forEach(([query, entry], index) => {
    suggestions.push({
      id: `trending-${index}`,
      type: 'trending',
      text: query,
      popularity: entry.count,
      recency: entry.timestamp,
      confidence: Math.min(1, entry.count / 5) // Normalize confidence
    });
  });
  
  return suggestions;
}

/**
 * Get recent search suggestions
 */
function getRecentSuggestions(limit: number = 10): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  
  // Get unique recent queries, maintaining recency
  const uniqueQueries = new Set<string>();
  const recentUnique = recentSearches.filter(search => {
    if (uniqueQueries.has(search.query)) {
      return false;
    }
    uniqueQueries.add(search.query);
    return true;
  }).slice(0, limit);
  
  recentUnique.forEach((search, index) => {
    suggestions.push({
      id: `recent-${index}`,
      type: 'recent',
      text: search.query,
      recency: search.timestamp,
      confidence: 0.8 // High confidence for recent searches
    });
  });
  
  return suggestions;
}

/**
 * Extract categories and subcategories from documents
 */
function extractCategories(documents: Document[]): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  const categories = new Map<string, { count: number; subcategories: Set<string> }>();
  
  // Count categories and subcategories
  documents.forEach(doc => {
    if (doc.category) {
      const categoryEntry = categories.get(doc.category) || { count: 0, subcategories: new Set() };
      categoryEntry.count += 1;
      if (doc.subcategory) {
        categoryEntry.subcategories.add(doc.subcategory);
      }
      categories.set(doc.category, categoryEntry);
    }
  });
  
  // Convert to suggestions
  Array.from(categories.entries()).forEach(([category, data], index) => {
    // Add category suggestion
    suggestions.push({
      id: `category-${index}`,
      type: 'category',
      text: category,
      popularity: data.count,
      confidence: Math.min(1, data.count / 20) // Normalize confidence
    });
    
    // Add subcategory suggestions
    Array.from(data.subcategories).forEach((subcategory, subIndex) => {
      suggestions.push({
        id: `subcategory-${index}-${subIndex}`,
        type: 'subcategory',
        text: subcategory,
        category: category,
        confidence: 0.7
      });
    });
  });
  
  return suggestions;
}

/**
 * Extract tags from documents
 */
function extractTags(documents: Document[]): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  const tagCounts = new Map<string, number>();
  
  // Count tags
  documents.forEach(doc => {
    if (doc.tags && Array.isArray(doc.tags)) {
      doc.tags.forEach(tag => {
        const count = tagCounts.get(tag) || 0;
        tagCounts.set(tag, count + 1);
      });
    }
  });
  
  // Convert to suggestions
  Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([tag, count], index) => {
      suggestions.push({
        id: `tag-${index}`,
        type: 'tag',
        text: tag,
        popularity: count,
        confidence: Math.min(1, count / 10) // Normalize confidence
      });
    });
  
  return suggestions;
}

/**
 * Generate query suggestions based on partial input
 */
function generateQuerySuggestions(
  partialQuery: string, 
  documents: Document[],
  limit: number = 10
): SearchSuggestion[] {
  const suggestions: SearchSuggestion[] = [];
  
  if (!partialQuery || partialQuery.trim().length === 0) {
    return suggestions;
  }
  
  const normalizedQuery = partialQuery.trim().toLowerCase();
  
  // Get matching popular queries
  Array.from(popularQueries.entries())
    .filter(([query]) => query.includes(normalizedQuery))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .forEach(([query, count], index) => {
      suggestions.push({
        id: `query-${index}`,
        type: 'query',
        text: query,
        query: query,
        popularity: count,
        confidence: Math.min(1, count / 5) // Normalize confidence
      });
    });
  
  // If we don't have enough suggestions, add category/subcategory matches
  if (suggestions.length < limit) {
    const categorySuggestions = extractCategories(documents)
      .filter(suggestion => 
        suggestion.text.toLowerCase().includes(normalizedQuery) &&
        !suggestions.some(s => s.text === suggestion.text)
      )
      .slice(0, limit - suggestions.length);
    
    suggestions.push(...categorySuggestions);
  }
  
  // If we still don't have enough suggestions, add tag matches
  if (suggestions.length < limit) {
    const tagSuggestions = extractTags(documents)
      .filter(suggestion => 
        suggestion.text.toLowerCase().includes(normalizedQuery) &&
        !suggestions.some(s => s.text === suggestion.text)
      )
      .slice(0, limit - suggestions.length);
    
    suggestions.push(...tagSuggestions);
  }
  
  return suggestions.slice(0, limit);
}

/**
 * Get search suggestions based on context
 */
export function getSearchSuggestions(
  context: {
    partialQuery?: string;
    documents?: Document[];
    type?: 'all' | 'popular' | 'trending' | 'recent' | 'query' | 'category' | 'tag';
  } = {}
): SearchSuggestion[] {
  const {
    partialQuery = '',
    documents = [],
    type = 'all'
  } = context;
  
  const cacheKey = `${type}-${partialQuery}`;
  
  // Check cache first
  const cached = suggestionCache.get(cacheKey);
  if (cached) {
    // Check if cache is still valid
    // Note: In a real implementation, you would store timestamps with cache entries
    return cached;
  }
  
  let suggestions: SearchSuggestion[] = [];
  
  switch (type) {
    case 'popular':
      suggestions = getPopularSuggestions(10);
      break;
      
    case 'trending':
      suggestions = getTrendingSuggestions(10);
      break;
      
    case 'recent':
      suggestions = getRecentSuggestions(10);
      break;
      
    case 'query':
      if (partialQuery) {
        suggestions = generateQuerySuggestions(partialQuery, documents, 10);
      }
      break;
      
    case 'category':
      suggestions = extractCategories(documents);
      break;
      
    case 'tag':
      suggestions = extractTags(documents);
      break;
      
    case 'all':
    default:
      // Combine multiple suggestion types
      const popular = getPopularSuggestions(3);
      const trending = getTrendingSuggestions(3);
      const recent = getRecentSuggestions(2);
      const queryBased = partialQuery 
        ? generateQuerySuggestions(partialQuery, documents, 5)
        : [];
      
      suggestions = [...popular, ...trending, ...recent, ...queryBased];
      break;
  }
  
  // Cache results
  suggestionCache.set(cacheKey, suggestions);
  
  return suggestions.slice(0, 15); // Limit to 15 suggestions
}

/**
 * Clear suggestion cache
 */
export function clearSuggestionCache(): void {
  suggestionCache.clear();
}

/**
 * Get search statistics
 */
export function getSearchStatistics(): {
  totalSearches: number;
  popularQueries: { query: string; count: number }[];
  trendingQueries: { query: string; count: number }[];
  recentSearches: string[];
} {
  return {
    totalSearches: Array.from(popularQueries.values()).reduce((sum, count) => sum + count, 0),
    popularQueries: Array.from(popularQueries.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query, count]) => ({ query, count })),
    trendingQueries: Array.from(trendingQueries.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([query, entry]) => ({ query, count: entry.count })),
    recentSearches: recentSearches.slice(0, 10).map(search => search.query)
  };
}