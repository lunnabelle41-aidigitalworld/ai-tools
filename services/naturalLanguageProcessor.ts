/**
 * Natural Language Processing service for enhancing search queries
 */

// Query intent types
export type QueryIntent = 
  | 'informational'
  | 'navigational'
  | 'transactional'
  | 'comparative'
  | 'recommendation';

// Entity types that can be extracted from queries
export type EntityType = 
  | 'tool'
  | 'category'
  | 'feature'
  | 'price'
  | 'rating'
  | 'date'
  | 'brand';

// Extracted entities from a query
export interface ExtractedEntity {
  type: EntityType;
  value: string;
  confidence: number;
}

// Processed query result
export interface ProcessedQuery {
  originalQuery: string;
  processedQuery: string;
  intent: QueryIntent;
  entities: ExtractedEntity[];
  filters: Record<string, any>;
  sortBy?: 'relevance' | 'date' | 'rating' | 'title' | 'reviews';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
}

/**
 * Determine the intent of a search query
 */
function determineQueryIntent(query: string): QueryIntent {
  const queryLower = query.toLowerCase();
  
  // Comparative queries (comparison, vs, versus, better than, etc.)
  if (/\b(compare|vs|versus|better than|worse than|vs\.|difference between)\b/.test(queryLower)) {
    return 'comparative';
  }
  
  // Transactional queries (buy, purchase, price, cost, etc.)
  if (/\b(buy|purchase|price|cost|how much|pricing|free|paid)\b/.test(queryLower)) {
    return 'transactional';
  }
  
  // Navigational queries (go to, navigate to, find, etc.)
  if (/\b(go to|navigate to|find|where is|where can i find|website|url)\b/.test(queryLower)) {
    return 'navigational';
  }
  
  // Recommendation queries (best, top, recommend, suggestion, etc.)
  if (/\b(best|top|recommend|suggestion|suggest|good|great|excellent|awesome)\b/.test(queryLower)) {
    return 'recommendation';
  }
  
  // Default to informational
  return 'informational';
}

/**
 * Extract entities from a query
 */
function extractEntities(query: string): ExtractedEntity[] {
  const entities: ExtractedEntity[] = [];
  const queryLower = query.toLowerCase();
  
  // Extract potential categories (common AI tool categories)
  const commonCategories = [
    'chatbot', 'chatbots', 'ai chat', 'ai chatbot',
    'image generation', 'image generator', 'ai art', 'ai image',
    'writing', 'writing assistant', 'ai writer', 'content generation',
    'coding', 'programming', 'code assistant', 'developer tools',
    'marketing', 'marketing tools', 'seo', 'social media',
    'productivity', 'productivity tools', 'task management',
    'design', 'design tools', 'graphic design',
    'audio', 'music', 'voice', 'speech',
    'video', 'video editing', 'video generation',
    'research', 'research tools', 'academic',
    'education', 'learning', 'course',
    'business', 'enterprise', 'corporate',
    'health', 'medical', 'fitness',
    'finance', 'financial', 'accounting',
    'legal', 'law', 'compliance'
  ];
  
  commonCategories.forEach(category => {
    if (queryLower.includes(category)) {
      entities.push({
        type: 'category',
        value: category,
        confidence: 0.8
      });
    }
  });
  
  // Extract potential features
  const featureKeywords = [
    'free', 'freemium', 'open source', 'paid', 'premium',
    'real-time', 'real time', 'instant',
    'collaborative', 'collaboration', 'team',
    'mobile', 'desktop', 'web', 'cloud',
    'api', 'integration', 'plugin',
    'customizable', 'custom', 'personalization',
    'secure', 'security', 'privacy',
    'multilingual', 'language', 'translation'
  ];
  
  featureKeywords.forEach(feature => {
    if (queryLower.includes(feature)) {
      entities.push({
        type: 'feature',
        value: feature,
        confidence: 0.7
      });
    }
  });
  
  // Extract potential price ranges
  const priceMatches = queryLower.match(/\$(\d+(?:\.\d+)?)/g);
  if (priceMatches) {
    priceMatches.forEach(price => {
      entities.push({
        type: 'price',
        value: price,
        confidence: 0.9
      });
    });
  }
  
  // Extract potential rating mentions
  const ratingMatches = queryLower.match(/\b(\d+(?:\.\d+)?)\s*(?:stars?|rating|out of 5)\b/gi);
  if (ratingMatches) {
    ratingMatches.forEach(rating => {
      entities.push({
        type: 'rating',
        value: rating,
        confidence: 0.85
      });
    });
  }
  
  return entities;
}

/**
 * Convert natural language query to structured search parameters
 */
export function processNaturalLanguageQuery(query: string): ProcessedQuery {
  const intent = determineQueryIntent(query);
  const entities = extractEntities(query);
  const filters: Record<string, any> = {};
  
  // Process entities into filters
  entities.forEach(entity => {
    switch (entity.type) {
      case 'category':
        if (!filters.category) filters.category = [];
        filters.category.push(entity.value);
        break;
        
      case 'feature':
        // Map features to appropriate filters
        if (['free', 'freemium', 'open source', 'paid', 'premium'].includes(entity.value)) {
          if (!filters.pricingType) filters.pricingType = [];
          filters.pricingType.push(entity.value.charAt(0).toUpperCase() + entity.value.slice(1));
        }
        break;
        
      case 'price':
        const priceValue = parseFloat(entity.value.replace('$', ''));
        if (!isNaN(priceValue)) {
          filters.maxPrice = Math.min(filters.maxPrice || Infinity, priceValue);
        }
        break;
        
      case 'rating':
        const ratingValue = parseFloat(entity.value);
        if (!isNaN(ratingValue)) {
          filters.minRating = Math.max(filters.minRating || 0, ratingValue);
        }
        break;
    }
  });
  
  // Handle special query patterns
  let processedQuery = query;
  let limit: number | undefined;
  
  // Remove extracted entities from the query to avoid duplication
  entities.forEach(entity => {
    processedQuery = processedQuery.replace(new RegExp(entity.value, 'gi'), '');
  });
  
  // Clean up the processed query
  processedQuery = processedQuery
    .replace(/\s+/g, ' ')
    .trim();
    
  // Handle intent-specific processing
  let sortBy: 'relevance' | 'date' | 'rating' | 'title' | 'reviews' | undefined;
  let sortOrder: 'asc' | 'desc' | undefined;
  switch (intent) {
    case 'recommendation':
      // For recommendations, sort by rating by default
      sortBy = 'rating';
      sortOrder = 'desc';
      limit = 10;
      break;
      
    case 'transactional':
      // For transactional queries, sort by rating as fallback since price is not supported
      sortBy = 'rating';
      sortOrder = 'asc';
      break;
      
    case 'comparative':
      // For comparisons, limit to a small number of results
      limit = 5;
      break;
  }
  
  // Handle special keywords for sorting
  const queryLower = query.toLowerCase();
  if (queryLower.includes('newest') || queryLower.includes('latest')) {
    sortBy = 'date';
    sortOrder = 'desc';
  } else if (queryLower.includes('oldest')) {
    sortBy = 'date';
    sortOrder = 'asc';
  } else if (queryLower.includes('highest rated') || queryLower.includes('best rated')) {
    sortBy = 'rating';
    sortOrder = 'desc';
  } else if (queryLower.includes('lowest priced') || queryLower.includes('cheapest')) {
    // Note: 'price' is not a valid sortBy option, using 'rating' as fallback
    sortBy = 'rating';
    sortOrder = 'asc';
  } else if (queryLower.includes('most popular')) {
    sortBy = 'reviews';
    sortOrder = 'desc';
  }
  
  return {
    originalQuery: query,
    processedQuery: processedQuery || query,
    intent,
    entities,
    filters,
    sortBy,
    sortOrder,
    limit
  };
}

/**
 * Enhance search results based on query intent
 */
export function enhanceSearchResults(results: any[], intent: QueryIntent): any[] {
  // Apply intent-specific enhancements
  switch (intent) {
    case 'comparative':
      // For comparative queries, ensure we have diverse results
      return results.slice(0, 5);
      
    case 'recommendation':
      // For recommendations, boost highly-rated items
      return results
        .map(result => {
          if (result.rating >= 4.5) {
            return { ...result, similarity: Math.min(1, (result.similarity || 0) + 0.1) };
          }
          return result;
        })
        .sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
        
    case 'transactional':
      // For transactional queries, highlight pricing information
      return results.map(result => ({
        ...result,
        _enhancedSnippet: result.pricing ? `${result.pricing} - ${result._snippet || result.summary}` : result._snippet
      }));
      
    default:
      return results;
  }
}