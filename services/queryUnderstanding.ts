/**
 * Search query understanding service
 */

// Query types
export type QueryType = 
  | 'informational'    // Seeking information (what is, how to, etc.)
  | 'navigational'     // Looking for a specific website/page
  | 'transactional'    // Intent to purchase or take action
  | 'comparative'      // Comparing products/services
  | 'local'           // Location-based search
  | 'question'        // Explicit question
  | 'brand'           // Brand-specific search
  | 'generic';        // Generic terms

// Query categories
export type QueryCategory = 
  | 'ai-tools'         // AI tools and software
  | 'tutorials'        // Guides and tutorials
  | 'reviews'          // Product reviews
  | 'news'            // News and updates
  | 'pricing'          // Pricing and cost information
  | 'alternatives'     // Alternatives and competitors
  | 'features'         // Feature comparisons
  | 'best'            // Best of lists
  | 'free'            // Free tools
  | 'open-source'      // Open source tools
  | 'enterprise'       // Enterprise solutions
  | 'personal'         // Personal use tools
  | 'business'         // Business tools
  | 'academic'         // Academic/research tools
  | 'creative'         // Creative tools
  | 'productivity'     // Productivity tools
  | 'communication'    // Communication tools
  | 'analytics'        // Analytics tools
  | 'security'         // Security tools
  | 'other';           // Other categories

// Query intent analysis
export interface QueryIntent {
  type: QueryType;
  category: QueryCategory;
  confidence: number;
  entities: {
    brand?: string[];
    feature?: string[];
    price?: string[];
    rating?: string[];
    location?: string[];
  };
  modifiers: {
    temporal?: 'current' | 'future' | 'past';
    scope?: 'best' | 'top' | 'new' | 'free' | 'cheap' | 'popular';
    comparison?: 'vs' | 'better' | 'alternative' | 'similar';
  };
}

/**
 * Patterns for query type detection
 */
const queryTypePatterns = {
  informational: [
    /^what is/i, /^how to/i, /^how do i/i, /^explain/i, /^define/i,
    /^meaning of/i, /^difference between/i, /^compare/i, /^tutorial/i,
    /\?$/, /\b(guide|guidebook|manual|handbook)\b/i
  ],
  navigational: [
    /\b(website|site|url|link|page)\b/i, /\b(go to|navigate to|find)\b/i,
    /\b(login|sign in)\b/i, /\b(download|install)\b/i
  ],
  transactional: [
    /\b(buy|purchase|order|shop|price|cost|pricing)\b/i,
    /\b(deal|discount|offer|sale)\b/i, /\b(subscribe|sign up)\b/i,
    /\b(free trial|demo)\b/i
  ],
  comparative: [
    /\b(vs|versus)\b/i, /\b(better than|worse than|compared to)\b/i,
    /\b(alternative to|similar to|replacement for)\b/i,
    /\b(difference between|compare)\b/i
  ],
  local: [
    /\b(near me|nearby|local|in my area)\b/i, /\b(city|location)\b/i
  ],
  question: [
    /^(what|where|when|why|how|who|which|whose|whom)\b/i,
    /\b(is|are|can|could|would|should|will)\b.*\?$/i
  ],
  brand: [
    // Will be matched against known brands
  ],
  generic: [
    // Default fallback
  ]
};

/**
 * Patterns for query category detection
 */
const queryCategoryPatterns = {
  'ai-tools': [
    /\b(ai|artificial intelligence|machine learning|ml|deep learning|neural network)\b/i,
    /\b(tool|software|platform|service|app|application)\b/i,
    /\b(chatbot|assistant|bot)\b/i
  ],
  'tutorials': [
    /\b(tutorial|guide|how to|lesson|course|training)\b/i,
    /\b(step by step|learn|teach)\b/i
  ],
  'reviews': [
    /\b(review|rating|feedback|testimonial)\b/i,
    /\b(best|top|worst|recommended)\b/i
  ],
  'news': [
    /\b(news|update|announcement|release|launch)\b/i,
    /\b(latest|recent|new)\b/i
  ],
  'pricing': [
    /\b(price|cost|pricing|fee|charge)\b/i,
    /\b(expensive|cheap|affordable)\b/i
  ],
  'alternatives': [
    /\b(alternative|competitor|vs|versus|instead of)\b/i,
    /\b(better than|worse than)\b/i
  ],
  'features': [
    /\b(feature|function|capability|ability)\b/i,
    /\b(can it|does it|how does)\b/i
  ],
  'best': [
    /\b(best|top|greatest|most popular|highest rated)\b/i
  ],
  'free': [
    /\b(free|no cost|gratis)\b/i
  ],
  'open-source': [
    /\b(open source|oss|open-source)\b/i
  ],
  'enterprise': [
    /\b(enterprise|business|corporate|company)\b/i,
    /\b(team|organization|workplace)\b/i
  ],
  'personal': [
    /\b(personal|individual|home|private)\b/i
  ],
  'business': [
    /\b(business|commercial|professional)\b/i
  ],
  'academic': [
    /\b(academic|research|university|education|student)\b/i,
    /\b(scholar|scientific|study)\b/i
  ],
  'creative': [
    /\b(creative|design|art|music|video|photo)\b/i,
    /\b(graphic|visual|audio)\b/i
  ],
  'productivity': [
    /\b(productivity|efficiency|workflow|task|project)\b/i,
    /\b(organize|schedule|plan)\b/i
  ],
  'communication': [
    /\b(communication|chat|message|email|call)\b/i,
    /\b(collaboration|teamwork)\b/i
  ],
  'analytics': [
    /\b(analytics|data|metrics|statistics|insight)\b/i,
    /\b(track|measure|monitor)\b/i
  ],
  'security': [
    /\b(security|privacy|protection|safe|secure)\b/i,
    /\b(encryption|password|authentication)\b/i
  ]
};

/**
 * Known brands in the AI space
 */
const knownBrands = [
  'openai', 'chatgpt', 'gpt', 'claude', 'anthropic', 'bard', 'google',
  'microsoft', 'copilot', 'github', 'hugging face', 'huggingface',
  'midjourney', 'dall-e', 'stable diffusion', 'runway', 'leonardo.ai',
  'jasper', 'copy.ai', 'rytr', 'writesonic', 'surfer', 'frase',
  'notion', 'obsidian', 'roam', 'coda', 'airtable', 'monday',
  'asana', 'trello', 'slack', 'discord', 'zoom', 'teams',
  'salesforce', 'hubspot', 'zendesk', 'intercom', 'drift'
];

/**
 * Temporal modifiers
 */
const temporalModifiers = {
  current: ['current', 'today', 'now', 'latest', 'recent'],
  future: ['future', 'upcoming', 'next', 'tommorow'],
  past: ['past', 'previous', 'old', 'history', 'historical']
};

/**
 * Scope modifiers
 */
const scopeModifiers = {
  best: ['best', 'top', 'greatest', 'highest rated'],
  top: ['top', 'popular', 'trending', 'most used'],
  new: ['new', 'latest', 'recent', 'fresh'],
  free: ['free', 'gratis', 'no cost'],
  cheap: ['cheap', 'affordable', 'inexpensive', 'budget'],
  popular: ['popular', 'trending', 'most used', 'favorite']
};

/**
 * Comparison modifiers
 */
const comparisonModifiers = {
  vs: ['vs', 'versus'],
  better: ['better', 'better than', 'superior'],
  alternative: ['alternative', 'alternative to', 'instead of'],
  similar: ['similar', 'similar to', 'like']
};

/**
 * Extract entities from query
 */
function extractEntities(query: string): QueryIntent['entities'] {
  const entities: QueryIntent['entities'] = {};
  
  // Extract brands
  const brandMatches = knownBrands.filter(brand => 
    new RegExp(`\\b${brand.replace(/\./g, '\\.')}`, 'i').test(query)
  );
  if (brandMatches.length > 0) {
    entities.brand = brandMatches;
  }
  
  // Extract price mentions (e.g., "$10", "10 dollars")
  const priceMatches = query.match(/\$?\d+(?:\.\d+)?\s*(?:dollars?|usd|eur|gbp)?/gi);
  if (priceMatches) {
    entities.price = priceMatches;
  }
  
  // Extract rating mentions (e.g., "5 stars", "4.5 rating")
  const ratingMatches = query.match(/\b\d+(?:\.\d+)?\s*(?:stars?|rating|out of 5)/gi);
  if (ratingMatches) {
    entities.rating = ratingMatches;
  }
  
  // Extract location mentions (simplified)
  const locationMatches = query.match(/\b(city|town|area|location|near me|nearby)\b/i);
  if (locationMatches) {
    entities.location = [locationMatches[0]];
  }
  
  return entities;
}

/**
 * Extract modifiers from query
 */
function extractModifiers(query: string): QueryIntent['modifiers'] {
  const modifiers: QueryIntent['modifiers'] = {};
  
  // Extract temporal modifiers
  for (const [temporal, words] of Object.entries(temporalModifiers)) {
    if (words.some(word => new RegExp(`\\b${word}\\b`, 'i').test(query))) {
      modifiers.temporal = temporal as any;
      break;
    }
  }
  
  // Extract scope modifiers
  for (const [scope, words] of Object.entries(scopeModifiers)) {
    if (words.some(word => new RegExp(`\\b${word}\\b`, 'i').test(query))) {
      modifiers.scope = scope as any;
      break;
    }
  }
  
  // Extract comparison modifiers
  for (const [comparison, words] of Object.entries(comparisonModifiers)) {
    if (words.some(word => new RegExp(`\\b${word}\\b`, 'i').test(query))) {
      modifiers.comparison = comparison as any;
      break;
    }
  }
  
  return modifiers;
}

/**
 * Analyze search query intent
 */
export function analyzeQueryIntent(query: string): QueryIntent {
  if (!query) {
    return {
      type: 'generic',
      category: 'other',
      confidence: 0,
      entities: {},
      modifiers: {}
    };
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  // Determine query type
  let queryType: QueryType = 'generic';
  let maxMatches = 0;
  
  for (const [type, patterns] of Object.entries(queryTypePatterns)) {
    if (type === 'brand') continue; // Skip brand for now
    
    const matches = patterns.filter(pattern => pattern.test(normalizedQuery)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      queryType = type as QueryType;
    }
  }
  
  // Check for brand-specific queries
  const hasBrand = knownBrands.some(brand => 
    new RegExp(`\\b${brand.replace(/\./g, '\\.')}`, 'i').test(query)
  );
  
  if (hasBrand && queryType === 'generic') {
    queryType = 'brand';
  }
  
  // Determine query category
  let queryCategory: QueryCategory = 'other';
  maxMatches = 0;
  
  for (const [category, patterns] of Object.entries(queryCategoryPatterns)) {
    const matches = patterns.filter(pattern => pattern.test(normalizedQuery)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      queryCategory = category as QueryCategory;
    }
  }
  
  // Extract entities and modifiers
  const entities = extractEntities(query);
  const modifiers = extractModifiers(query);
  
  // Calculate confidence (simplified)
  let confidence = 0.5; // Base confidence
  
  // Increase confidence based on matches
  if (maxMatches > 0) {
    confidence += Math.min(0.3, maxMatches * 0.1);
  }
  
  // Increase confidence for entities
  if (Object.keys(entities).length > 0) {
    confidence += 0.1;
  }
  
  // Increase confidence for modifiers
  if (Object.keys(modifiers).length > 0) {
    confidence += 0.1;
  }
  
  // Cap confidence at 1.0
  confidence = Math.min(1.0, confidence);
  
  return {
    type: queryType,
    category: queryCategory,
    confidence,
    entities,
    modifiers
  };
}

/**
 * Generate query suggestions based on intent
 */
export function generateQuerySuggestions(query: string, intent: QueryIntent): string[] {
  const suggestions: string[] = [];
  
  // Add related queries based on intent
  switch (intent.type) {
    case 'informational':
      suggestions.push(`what is ${query}`, `how to use ${query}`, `${query} tutorial`);
      break;
    case 'transactional':
      suggestions.push(`${query} price`, `buy ${query}`, `${query} free trial`);
      break;
    case 'comparative':
      suggestions.push(`${query} vs alternatives`, `is ${query} better than`);
      break;
    case 'question':
      if (!query.endsWith('?')) {
        suggestions.push(`${query}?`);
      }
      break;
  }
  
  // Add category-specific suggestions
  switch (intent.category) {
    case 'reviews':
      suggestions.push(`${query} review`, `best ${query}`);
      break;
    case 'tutorials':
      suggestions.push(`how to ${query}`, `${query} guide`);
      break;
    case 'pricing':
      suggestions.push(`${query} cost`, `${query} pricing`);
      break;
  }
  
  // Add modifier-based suggestions
  if (intent.modifiers.scope) {
    suggestions.push(`best ${query}`, `top ${query}`);
  }
  
  if (intent.modifiers.comparison) {
    suggestions.push(`${query} vs`, `${query} alternatives`);
  }
  
  // Remove duplicates and the original query
  return Array.from(new Set(suggestions.filter(s => s.toLowerCase() !== query.toLowerCase())))
    .slice(0, 5); // Limit to 5 suggestions
}

/**
 * Classify query complexity
 */
export function classifyQueryComplexity(query: string): 'simple' | 'moderate' | 'complex' {
  const wordCount = query.trim().split(/\s+/).length;
  const specialChars = (query.match(/[^\w\s]/g) || []).length;
  const booleanOperators = (query.match(/\b(and|or|not)\b/gi) || []).length;
  
  if (wordCount <= 3 && specialChars === 0 && booleanOperators === 0) {
    return 'simple';
  } else if (wordCount <= 8 && specialChars <= 2 && booleanOperators <= 1) {
    return 'moderate';
  } else {
    return 'complex';
  }
}