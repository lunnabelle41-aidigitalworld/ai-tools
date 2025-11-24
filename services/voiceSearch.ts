/**
 * Voice search service with speech recognition and processing
 */

// Voice search command patterns
const voiceCommands = {
  search: [
    'search for', 'find', 'look for', 'show me', 'i want to find',
    'can you find', 'please search for', 'search'
  ],
  filter: {
    category: ['in category', 'under category', 'from category', 'category'],
    rating: ['rated', 'with rating', 'rating above', 'rating over'],
    price: ['under', 'below', 'less than', 'cheaper than', 'costs less than'],
    type: ['type', 'kind of', 'sort of']
  },
  sort: [
    'sort by', 'order by', 'rank by', 'arrange by'
  ]
};

// Process voice search query
export function processVoiceQuery(query: string): {
  searchTerms: string[];
  filters: Record<string, any>;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
} {
  const result = {
    searchTerms: [] as string[],
    filters: {} as Record<string, any>,
    sortBy: undefined as string | undefined,
    sortOrder: undefined as 'asc' | 'desc' | undefined
  };

  // Convert to lowercase for processing
  let processedQuery = query.toLowerCase().trim();

  // Extract search terms by removing command words
  const searchTerms: string[] = [];
  
  // Remove command prefixes
  for (const command of voiceCommands.search) {
    if (processedQuery.startsWith(command)) {
      processedQuery = processedQuery.substring(command.length).trim();
      break;
    }
  }

  // Extract filters
  // Rating filters (e.g., "rated 4 stars" or "rating above 3")
  const ratingMatch = processedQuery.match(/(?:rated|ratin(?:g|gs?)\s+(?:above|over|more than))\s+(\d+(?:\.\d+)?)/i);
  if (ratingMatch) {
    result.filters.minRating = parseFloat(ratingMatch[1]);
    processedQuery = processedQuery.replace(ratingMatch[0], '').trim();
  }

  // Price filters (e.g., "under $50" or "less than 20 dollars")
  const priceMatch = processedQuery.match(/(?:under|below|less than|cheaper than|costs less than)\s+\$?(\d+(?:\.\d+)?)/i);
  if (priceMatch) {
    result.filters.maxPrice = parseFloat(priceMatch[1]);
    processedQuery = processedQuery.replace(priceMatch[0], '').trim();
  }

  // Category filters (e.g., "in image generation category")
  const categoryMatch = processedQuery.match(/(?:in|under|from)?\s*category\s+(.+?)(?:\s+(?:category|section))?$/i);
  if (categoryMatch) {
    result.filters.category = categoryMatch[1].trim();
    processedQuery = processedQuery.replace(categoryMatch[0], '').trim();
  }

  // Sort commands (e.g., "sort by rating" or "order by price")
  const sortMatch = processedQuery.match(/(?:sort|order|rank)\s+by\s+(rating|price|date|title|relevance)(?:\s+(ascending|descending|asc|desc))?/i);
  if (sortMatch) {
    result.sortBy = sortMatch[1].toLowerCase();
    if (sortMatch[2]) {
      const order = sortMatch[2].toLowerCase();
      result.sortOrder = order.startsWith('desc') ? 'desc' : 'asc';
    }
    processedQuery = processedQuery.replace(sortMatch[0], '').trim();
  }

  // Extract remaining terms as search terms
  if (processedQuery) {
    result.searchTerms = processedQuery
      .split(/\s+/)
      .filter(term => term.length > 0 && !['and', 'or', 'the', 'a', 'an'].includes(term));
  }

  return result;
}

// Convert voice query to search API parameters
export function voiceQueryToSearchParams(query: string): Record<string, string> {
  const processed = processVoiceQuery(query);
  const params: Record<string, string> = {};

  // Add search terms
  if (processed.searchTerms.length > 0) {
    params.q = processed.searchTerms.join(' ');
  }

  // Add filters
  if (processed.filters.category) {
    params.category = processed.filters.category;
  }
  if (processed.filters.minRating) {
    params.minRating = processed.filters.minRating.toString();
  }
  if (processed.filters.maxPrice) {
    params.maxPrice = processed.filters.maxPrice.toString();
  }

  // Add sorting
  if (processed.sortBy) {
    params.sortBy = processed.sortBy;
  }
  if (processed.sortOrder) {
    params.sortOrder = processed.sortOrder;
  }

  return params;
}

// Generate voice search suggestions
export function generateVoiceSearchSuggestions(previousQueries: string[] = []): string[] {
  const baseSuggestions = [
    "Search for image generation tools",
    "Find AI writing assistants",
    "Show me video editing AI",
    "Look for free SEO tools",
    "Search for chatbots rated 4 stars or higher",
    "Find AI tools under $20",
    "Show me productivity tools in the writing category",
    "Search for tools sorted by rating",
    "Find the best AI tools for content creation",
    "Look for machine learning platforms"
  ];

  // Add personalized suggestions based on previous queries
  const personalizedSuggestions: string[] = [];
  if (previousQueries.length > 0) {
    const lastQuery = previousQueries[previousQueries.length - 1];
    if (lastQuery) {
      personalizedSuggestions.push(`Search for more like "${lastQuery}"`);
      personalizedSuggestions.push(`Find alternatives to "${lastQuery}"`);
    }
  }

  // Combine and limit to 10 suggestions
  return [...personalizedSuggestions, ...baseSuggestions].slice(0, 10);
}

// Voice command templates
export const voiceCommandTemplates = {
  basicSearch: [
    "Search for {query}",
    "Find {query}",
    "Look for {query}",
    "Show me {query}"
  ],
  filteredSearch: [
    "Find {query} rated {rating} stars or higher",
    "Search for {query} under ${price}",
    "Show me {query} in the {category} category",
    "Find {query} sorted by {sortField}"
  ],
  complexSearch: [
    "Search for {query} rated above {rating} and under ${price}",
    "Find {query} in {category} sorted by rating",
    "Show me {query} with high ratings in the {category} category"
  ]
};

export default {
  processVoiceQuery,
  voiceQueryToSearchParams,
  generateVoiceSearchSuggestions,
  voiceCommandTemplates
};