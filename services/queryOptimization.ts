/**
 * Search query optimization service
 */

// Query optimization strategies
export type OptimizationStrategy = 
  | 'synonym-expansion'     // Expand with synonyms
  | 'stemming'              // Apply stemming
  | 'stopword-removal'      // Remove stopwords
  | 'phrase-boosting'       // Boost exact phrases
  | 'fuzzy-matching'        // Add fuzzy matching
  | 'field-weighting'       // Adjust field weights
  | 'query-rewriting'       // Rewrite query structure
  | 'spelling-correction'   // Correct spelling
  | 'contextual-expansion'  // Expand based on context
  | 'personalization';      // Personalize based on user history

// Optimization suggestion
export interface OptimizationSuggestion {
  originalQuery: string;
  optimizedQuery: string;
  strategy: OptimizationStrategy;
  confidence: number; // 0-1
  explanation: string;
  expectedImprovement: 'low' | 'medium' | 'high';
}

// Query analysis
export interface QueryAnalysis {
  originalQuery: string;
  tokens: string[];
  phrases: string[];
  operators: string[];
  fieldSpecifiers: Array<{ field: string; value: string }>;
  modifiers: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  potentialIssues: string[];
}

// Spell correction suggestion
export interface SpellCorrection {
  originalTerm: string;
  correctedTerm: string;
  confidence: number;
  frequency: number;
}

// Optimization configuration
export interface OptimizationConfig {
  enableSynonymExpansion: boolean;
  enableStemming: boolean;
  enableStopwordRemoval: boolean;
  enablePhraseBoosting: boolean;
  enableFuzzyMatching: boolean;
  enableSpellingCorrection: boolean;
  enableContextualExpansion: boolean;
  enablePersonalization: boolean;
  minQueryLengthForOptimization: number;
  maxQueryLengthForOptimization: number;
  fuzzyThreshold: number; // 0-1
  synonymThreshold: number; // 0-1
}

// Default configuration
const defaultConfig: OptimizationConfig = {
  enableSynonymExpansion: true,
  enableStemming: true,
  enableStopwordRemoval: true,
  enablePhraseBoosting: true,
  enableFuzzyMatching: true,
  enableSpellingCorrection: true,
  enableContextualExpansion: true,
  enablePersonalization: true,
  minQueryLengthForOptimization: 2,
  maxQueryLengthForOptimization: 100,
  fuzzyThreshold: 0.7,
  synonymThreshold: 0.8
};

/**
 * Common stopwords in English
 */
const stopwords = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'will', 'with', 'i', 'you', 'we', 'they', 'she',
  'him', 'her', 'them', 'us', 'my', 'your', 'our', 'their'
]);

/**
 * Common synonyms
 */
const synonyms = new Map<string, string[]>([
  ['ai', ['artificial intelligence', 'machine learning', 'ml']],
  ['ml', ['machine learning', 'artificial intelligence', 'ai']],
  ['chatbot', ['chat bot', 'virtual assistant', 'ai assistant']],
  ['tool', ['software', 'application', 'app', 'platform']],
  ['free', ['no cost', 'gratis', 'zero cost']],
  ['best', ['top', 'greatest', 'highest rated', 'most popular']],
  ['new', ['latest', 'recent', 'fresh']],
  ['cheap', ['affordable', 'inexpensive', 'budget']],
  ['fast', ['quick', 'rapid', 'speedy']],
  ['good', ['great', 'excellent', 'outstanding']]
]);

/**
 * Simple stemming implementation (Porter Stemmer simplified)
 */
function stemWord(word: string): string {
  // This is a very simplified stemming algorithm
  // In practice, you'd use a proper stemming library
  
  // Remove common suffixes
  if (word.endsWith('ing')) return word.slice(0, -3);
  if (word.endsWith('ed')) return word.slice(0, -2);
  if (word.endsWith('ly')) return word.slice(0, -2);
  if (word.endsWith('es') && word.length > 3) return word.slice(0, -2);
  if (word.endsWith('s') && word.length > 3) return word.slice(0, -1);
  
  return word;
}

/**
 * Simple spell checker using edit distance
 */
function getSpellCorrections(
  term: string, 
  dictionary: string[], 
  maxDistance: number = 2
): SpellCorrection[] {
  const corrections: SpellCorrection[] = [];
  
  dictionary.forEach(word => {
    const distance = editDistance(term.toLowerCase(), word.toLowerCase());
    if (distance <= maxDistance && distance > 0) {
      // Calculate confidence based on edit distance and word frequency
      // For simplicity, we'll use a fixed frequency of 1
      const confidence = Math.max(0, 1 - (distance / term.length));
      corrections.push({
        originalTerm: term,
        correctedTerm: word,
        confidence,
        frequency: 1
      });
    }
  });
  
  // Sort by confidence and return top 3
  return corrections
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}

/**
 * Calculate edit distance (Levenshtein distance)
 */
function editDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // insertion
        matrix[j - 1][i] + 1,     // deletion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

/**
 * Analyze a search query
 */
export function analyzeQuery(query: string): QueryAnalysis {
  if (!query) {
    return {
      originalQuery: '',
      tokens: [],
      phrases: [],
      operators: [],
      fieldSpecifiers: [],
      modifiers: [],
      complexity: 'simple',
      potentialIssues: []
    };
  }
  
  const normalizedQuery = query.trim();
  const tokens = normalizedQuery.split(/\s+/);
  const phrases = normalizedQuery.match(/"[^"]*"/g) || [];
  const operators = normalizedQuery.match(/\b(AND|OR|NOT)\b/gi) || [];
  const modifiers = normalizedQuery.match(/[~^*+-]/g) || [];
  
  // Extract field specifiers (e.g., title:ai, category:tools)
  const fieldSpecifiers: Array<{ field: string; value: string }> = [];
  const fieldMatches = normalizedQuery.match(/\b(\w+):([^:\s]+)/g);
  if (fieldMatches) {
    fieldMatches.forEach(match => {
      const [field, value] = match.split(':');
      fieldSpecifiers.push({ field, value: value.replace(/"/g, '') });
    });
  }
  
  // Determine complexity
  let complexity: 'simple' | 'moderate' | 'complex' = 'simple';
  if (tokens.length > 5 || operators.length > 1 || phrases.length > 1) {
    complexity = 'moderate';
  }
  if (tokens.length > 10 || operators.length > 3 || modifiers.length > 3) {
    complexity = 'complex';
  }
  
  // Identify potential issues
  const potentialIssues: string[] = [];
  
  if (tokens.some(token => stopwords.has(token.toLowerCase()))) {
    potentialIssues.push('Query contains common stopwords that may reduce relevance');
  }
  
  if (tokens.length === 1 && tokens[0].length < 3) {
    potentialIssues.push('Query is very short and may return too many results');
  }
  
  if (phrases.length === 0 && tokens.length > 8) {
    potentialIssues.push('Long query without phrases may benefit from phrase grouping');
  }
  
  return {
    originalQuery: query,
    tokens,
    phrases,
    operators,
    fieldSpecifiers,
    modifiers,
    complexity,
    potentialIssues
  };
}

/**
 * Generate optimization suggestions for a query
 */
export function generateOptimizationSuggestions(
  query: string,
  config: OptimizationConfig = defaultConfig,
  userContext?: {
    searchHistory?: string[];
    preferences?: string[];
    favorites?: string[];
  }
): OptimizationSuggestion[] {
  if (!query || query.length < config.minQueryLengthForOptimization) {
    return [];
  }
  
  if (query.length > config.maxQueryLengthForOptimization) {
    return [{
      originalQuery: query,
      optimizedQuery: query.substring(0, config.maxQueryLengthForOptimization),
      strategy: 'query-rewriting',
      confidence: 0.9,
      explanation: 'Query was too long and has been truncated for better performance',
      expectedImprovement: 'medium'
    }];
  }
  
  const suggestions: OptimizationSuggestion[] = [];
  const analysis = analyzeQuery(query);
  
  // Synonym expansion
  if (config.enableSynonymExpansion) {
    const expandedQuery = expandSynonyms(query);
    if (expandedQuery !== query) {
      suggestions.push({
        originalQuery: query,
        optimizedQuery: expandedQuery,
        strategy: 'synonym-expansion',
        confidence: 0.8,
        explanation: 'Expanded query with relevant synonyms to improve recall',
        expectedImprovement: 'high'
      });
    }
  }
  
  // Stopword removal
  if (config.enableStopwordRemoval && analysis.potentialIssues.some(issue => issue.includes('stopwords'))) {
    const cleanedQuery = removeStopwords(query);
    suggestions.push({
      originalQuery: query,
      optimizedQuery: cleanedQuery,
      strategy: 'stopword-removal',
      confidence: 0.7,
      explanation: 'Removed common stopwords to improve search precision',
      expectedImprovement: 'medium'
    });
  }
  
  // Phrase boosting
  if (config.enablePhraseBoosting && analysis.tokens.length > 3 && analysis.phrases.length === 0) {
    const phrasedQuery = addPhraseBoosting(query);
    suggestions.push({
      originalQuery: query,
      optimizedQuery: phrasedQuery,
      strategy: 'phrase-boosting',
      confidence: 0.75,
      explanation: 'Added phrase matching to improve relevance of exact term combinations',
      expectedImprovement: 'high'
    });
  }
  
  // Fuzzy matching
  if (config.enableFuzzyMatching && query.length > 4) {
    const fuzzyQuery = addFuzzyMatching(query, config.fuzzyThreshold);
    suggestions.push({
      originalQuery: query,
      optimizedQuery: fuzzyQuery,
      strategy: 'fuzzy-matching',
      confidence: 0.6,
      explanation: 'Added fuzzy matching to handle potential typos and variations',
      expectedImprovement: 'medium'
    });
  }
  
  // Spelling correction
  if (config.enableSpellingCorrection) {
    const correctedQuery = correctSpelling(query);
    if (correctedQuery !== query) {
      suggestions.push({
        originalQuery: query,
        optimizedQuery: correctedQuery,
        strategy: 'spelling-correction',
        confidence: 0.85,
        explanation: 'Corrected potential spelling errors to improve search accuracy',
        expectedImprovement: 'high'
      });
    }
  }
  
  // Personalization
  if (config.enablePersonalization && userContext) {
    const personalizedQuery = personalizeQuery(query, userContext);
    if (personalizedQuery !== query) {
      suggestions.push({
        originalQuery: query,
        optimizedQuery: personalizedQuery,
        strategy: 'personalization',
        confidence: 0.7,
        explanation: 'Personalized query based on your search history and preferences',
        expectedImprovement: 'medium'
      });
    }
  }
  
  return suggestions;
}

/**
 * Expand query with synonyms
 */
function expandSynonyms(query: string): string {
  let expandedQuery = query;
  
  synonyms.forEach((synonymList, term) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    if (regex.test(expandedQuery)) {
      const replacement = `${term} OR (${synonymList.join(' OR ')})`;
      expandedQuery = expandedQuery.replace(regex, replacement);
    }
  });
  
  return expandedQuery;
}

/**
 * Remove stopwords from query
 */
function removeStopwords(query: string): string {
  return query
    .split(/\s+/)
    .filter(token => !stopwords.has(token.toLowerCase()))
    .join(' ');
}

/**
 * Add phrase boosting to query
 */
function addPhraseBoosting(query: string): string {
  // Simple approach: treat the whole query as a phrase with boosting
  return `"${query}"^2 ${query}`;
}

/**
 * Add fuzzy matching to query
 */
function addFuzzyMatching(query: string, threshold: number): string {
  // Add fuzzy matching to each term
  return query
    .split(/\s+/)
    .map(token => {
      if (token.length > 3) {
        // Add fuzzy matching with threshold
        return `${token}~${Math.round(threshold * 10) / 10}`;
      }
      return token;
    })
    .join(' ');
}

/**
 * Correct spelling in query
 */
function correctSpelling(query: string): string {
  // This is a simplified implementation
  // In practice, you'd use a proper spell checker with a dictionary
  
  // For demonstration, we'll just return the original query
  // A real implementation would check against a dictionary
  return query;
}

/**
 * Personalize query based on user context
 */
function personalizeQuery(
  query: string, 
  context: {
    searchHistory?: string[];
    preferences?: string[];
    favorites?: string[];
  }
): string {
  // Add personalization based on user context
  const personalizationTerms: string[] = [];
  
  if (context.favorites && context.favorites.length > 0) {
    // Boost favorite categories or types
    const favoriteTerms = context.favorites.slice(0, 2);
    personalizationTerms.push(...favoriteTerms.map(term => `${term}^1.5`));
  }
  
  if (personalizationTerms.length > 0) {
    return `${query} ${personalizationTerms.join(' ')}`;
  }
  
  return query;
}

/**
 * Auto-optimize a query
 */
export function autoOptimizeQuery(
  query: string,
  config: OptimizationConfig = defaultConfig,
  userContext?: {
    searchHistory?: string[];
    preferences?: string[];
    favorites?: string[];
  }
): string {
  const suggestions = generateOptimizationSuggestions(query, config, userContext);
  
  // Return the highest confidence suggestion, or original query if none
  if (suggestions.length > 0) {
    return suggestions.sort((a, b) => b.confidence - a.confidence)[0].optimizedQuery;
  }
  
  return query;
}

/**
 * Get query optimization report
 */
export function getOptimizationReport(
  query: string,
  config: OptimizationConfig = defaultConfig
): {
  analysis: QueryAnalysis;
  suggestions: OptimizationSuggestion[];
  estimatedPerformanceImpact: 'negative' | 'neutral' | 'positive';
} {
  const analysis = analyzeQuery(query);
  const suggestions = generateOptimizationSuggestions(query, config);
  
  // Estimate performance impact based on suggestions
  let estimatedImpact: 'negative' | 'neutral' | 'positive' = 'neutral';
  
  if (suggestions.length > 0) {
    const improvements = suggestions.filter(s => s.expectedImprovement === 'high').length;
    const potentialIssues = analysis.potentialIssues.length;
    
    if (improvements > potentialIssues) {
      estimatedImpact = 'positive';
    } else if (potentialIssues > improvements) {
      estimatedImpact = 'negative';
    }
  }
  
  return {
    analysis,
    suggestions,
    estimatedPerformanceImpact: estimatedImpact
  };
}