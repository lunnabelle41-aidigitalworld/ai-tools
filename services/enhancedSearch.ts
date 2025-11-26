import { SearchResult, SearchOptions, Document } from './searchService';
import { processNaturalLanguageQuery } from './naturalLanguageProcessor';

// Field weights for search relevance
const FIELD_WEIGHTS = {
  title: 3.0,
  summary: 2.0,
  content: 1.0,
  category: 2.5,
  subcategory: 2.0,
  tags: 1.5,
  features: 1.2,
  author: 1.0
};

// Common AI term expansions for better matching
const AI_TERM_EXPANSIONS: Record<string, string[]> = {
  'ai': ['artificial intelligence', 'machine learning', 'ml'],
  'ml': ['machine learning', 'ai', 'artificial intelligence'],
  'llm': ['large language model', 'gpt', 'generative ai'],
  'nlp': ['natural language processing', 'text analysis'],
  'cv': ['computer vision', 'image recognition', 'object detection'],
  'gpt': ['chatgpt', 'openai', 'llm', 'large language model']
};

/**
 * Enhanced search that combines multiple ranking signals
 */
export const enhancedSearch = async (
  query: string,
  documents: Document[],
  options: SearchOptions = {}
): Promise<SearchResult[]> => {
  // Process natural language query
  const processedQuery = processNaturalLanguageQuery(query);
  
  // Expand query terms with AI-specific synonyms
  const expandedQuery = expandQueryTerms(processedQuery.processedQuery);
  
  // Apply filters first to reduce search space
  const filteredDocs = applyEnhancedFilters(documents, {
    ...options.filters,
    ...processedQuery.filters
  });

  // Score documents based on multiple factors
  const scoredResults = filteredDocs.map(doc => {
    // Calculate base relevance score
    const relevanceScore = calculateRelevanceScore(doc, expandedQuery);
    
    // Calculate field-specific scores
    const fieldScores = {
      title: calculateFieldScore(doc.title, expandedQuery, FIELD_WEIGHTS.title),
      summary: calculateFieldScore(doc.summary || '', expandedQuery, FIELD_WEIGHTS.summary),
      content: calculateFieldScore(doc.content, expandedQuery, FIELD_WEIGHTS.content),
      category: calculateFieldScore(doc.category || '', expandedQuery, FIELD_WEIGHTS.category),
      subcategory: calculateFieldScore(doc.subcategory || '', expandedQuery, FIELD_WEIGHTS.subcategory),
      tags: calculateArrayScore(doc.tags || [], expandedQuery, FIELD_WEIGHTS.tags),
      features: calculateArrayScore(doc.features || [], expandedQuery, FIELD_WEIGHTS.features),
      author: calculateFieldScore(doc.author || '', expandedQuery, FIELD_WEIGHTS.author)
    };

    // Calculate total score (weighted sum of field scores)
    const totalScore = Object.values(fieldScores).reduce((sum, score) => sum + score, 0) * 0.5 + 
                      (relevanceScore * 0.5);

    // Boost score for exact matches
    const exactMatchBoost = hasExactMatch(doc, query) ? 1.5 : 1.0;
    
    // Apply popularity/recency boost if available
    const popularityBoost = calculatePopularityBoost(doc);
    
    // Final score with boosts
    const finalScore = totalScore * exactMatchBoost * popularityBoost;

    return {
      ...doc,
      similarity: Math.min(1, finalScore), // Ensure score is between 0-1
      _snippet: generateRelevantSnippet(doc, expandedQuery, 150),
      _scores: {
        ...fieldScores,
        relevance: relevanceScore,
        popularity: popularityBoost,
        exactMatch: exactMatchBoost
      }
    };
  });

  // Sort results by final score
  const sortedResults = scoredResults.sort((a, b) => b.similarity - a.similarity);

  // Apply result grouping and limiting
  return groupAndLimitResults(sortedResults, options);
};

/**
 * Expand query terms with AI-specific synonyms
 */
function expandQueryTerms(query: string): string[] {
  const terms = query.toLowerCase().split(/\s+/);
  const expandedTerms = new Set(terms);
  
  terms.forEach(term => {
    const expansions = AI_TERM_EXPANSIONS[term] || [];
    expansions.forEach(expanded => expandedTerms.add(expanded));
  });
  
  return Array.from(expandedTerms);
}

/**
 * Calculate relevance score using TF-IDF like approach
 */
function calculateRelevanceScore(doc: Document, queryTerms: string[]): number {
  const text = `${doc.title} ${doc.summary || ''} ${doc.content}`.toLowerCase();
  let score = 0;
  
  queryTerms.forEach(term => {
    if (term.length < 2) return;
    
    // Exact match boost
    const exactMatch = new RegExp(`\\b${term}\\b`, 'gi');
    const exactMatches = (text.match(exactMatch) || []).length;
    score += exactMatches * 2;
    
    // Partial match (for multi-word terms)
    const partialMatch = new RegExp(term, 'gi');
    const partialMatches = (text.match(partialMatch) || []).length;
    score += partialMatches * 0.5;
    
    // Position-based boost (terms in title are more important)
    if (doc.title.toLowerCase().includes(term)) {
      score += 1.5;
    }
    
    // Boost for category/subcategory matches
    if (doc.category?.toLowerCase().includes(term)) {
      score += 1.2;
    }
    if (doc.subcategory?.toLowerCase().includes(term)) {
      score += 1.0;
    }
    
    // Boost for tag matches
    if (doc.tags?.some(tag => tag.toLowerCase().includes(term))) {
      score += 1.0;
    }
  });
  
  return Math.min(1, score / 10); // Normalize to 0-1 range
}

/**
 * Calculate score for a single text field
 */
function calculateFieldScore(
  text: string,
  queryTerms: string[],
  weight: number
): number {
  if (!text) return 0;
  
  const lowerText = text.toLowerCase();
  let score = 0;
  
  queryTerms.forEach(term => {
    if (term.length < 2) return;
    
    // Exact match boost
    const exactMatch = new RegExp(`\\b${term}\\b`, 'gi');
    const exactMatches = (lowerText.match(exactMatch) || []).length;
    score += exactMatches * 2;
    
    // Partial match
    const partialMatch = new RegExp(term, 'gi');
    const partialMatches = (lowerText.match(partialMatch) || []).length;
    score += partialMatches * 0.5;
  });
  
  return (score / Math.max(1, queryTerms.length)) * weight;
}

/**
 * Calculate score for an array of strings (like tags or features)
 */
function calculateArrayScore(
  items: string[],
  queryTerms: string[],
  weight: number
): number {
  if (!items.length) return 0;
  
  let totalScore = 0;
  
  items.forEach(item => {
    const itemScore = calculateFieldScore(item, queryTerms, 1);
    totalScore += itemScore;
  });
  
  return (totalScore / items.length) * weight;
}

/**
 * Check if document has an exact match for the query
 */
function hasExactMatch(doc: Document, query: string): boolean {
  const exactMatch = new RegExp(`\b${query}\b`, 'i');
  return (
    exactMatch.test(doc.title) ||
    (doc.summary ? exactMatch.test(doc.summary) : false) ||
    exactMatch.test(doc.content) ||
    (doc.tags ? doc.tags.some(tag => exactMatch.test(tag)) : false)
  );
}

/**
 * Calculate popularity boost based on document metadata
 */
function calculatePopularityBoost(doc: Document): number {
  let boost = 1.0;
  
  // Boost for high ratings
  if (doc.rating && doc.rating >= 4.5) {
    boost *= 1.2;
  } else if (doc.rating && doc.rating >= 4.0) {
    boost *= 1.1;
  }
  
  // Boost for popular items
  if (doc.views && doc.views > 1000) {
    boost *= 1.1;
  }
  
  // Slight boost for newer content
  if (doc.publishedAt) {
    const publishDate = new Date(doc.publishedAt);
    const daysOld = (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysOld < 30) { // Boost for content less than 30 days old
      boost *= 1.05;
    }
  }
  
  return Math.min(boost, 1.5); // Cap boost at 1.5x
}

/**
 * Generate a relevant snippet with highlighted query terms
 */
function generateRelevantSnippet(
  doc: Document,
  queryTerms: string[],
  maxLength: number
): string {
  // Try to find the most relevant part of the content
  const content = doc.summary || doc.content;
  if (!content) return '';
  
  // Find positions of query terms
  const termPositions: {term: string; index: number}[] = [];
  
  queryTerms.forEach(term => {
    if (term.length < 3) return;
    
    const regex = new RegExp(term, 'gi');
    let match;
    while ((match = regex.exec(content)) !== null) {
      termPositions.push({
        term: match[0],
        index: match.index
      });
    }
  });
  
  // If no terms found, return beginning of content
  if (termPositions.length === 0) {
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
  }
  
  // Find the densest cluster of terms
  termPositions.sort((a, b) => a.index - b.index);
  
  let bestStart = 0;
  let bestEnd = 0;
  let maxDensity = 0;
  
  // Simple sliding window to find the densest part
  const windowSize = 200; // characters
  for (let i = 0; i < termPositions.length; i++) {
    const startPos = termPositions[i].index;
    const endPos = Math.min(startPos + windowSize, content.length);
    const termsInWindow = termPositions.filter(tp => 
      tp.index >= startPos && tp.index <= endPos
    ).length;
    
    const density = termsInWindow / (endPos - startPos);
    if (density > maxDensity) {
      maxDensity = density;
      bestStart = Math.max(0, startPos - 50); // Add some context before
      bestEnd = Math.min(content.length, endPos + 50); // And after
    }
  }
  
  // Extract and format the snippet
  let snippet = content.substring(bestStart, bestEnd);
  
  // Highlight query terms
  queryTerms.forEach(term => {
    if (term.length < 3) return;
    const regex = new RegExp(`(${term})`, 'gi');
    snippet = snippet.replace(regex, '<mark>$1</mark>');
  });
  
  // Add ellipsis if needed
  if (bestStart > 0) snippet = `...${snippet}`;
  if (bestEnd < content.length) snippet = `${snippet}...`;
  
  return snippet;
}

/**
 * Apply enhanced filters to documents
 */
function applyEnhancedFilters(
  documents: Document[], 
  filters: NonNullable<SearchOptions['filters']> = {}
): Document[] {
  if (Object.keys(filters).length === 0) return documents;
  
  return documents.filter(doc => {
    // Type filter
    if (filters.type) {
      const types = Array.isArray(filters.type) ? filters.type : [filters.type];
      if (!types.includes(doc.type)) return false;
    }
    
    // Category filter (case-insensitive)
    if (filters.category && doc.category) {
      const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
      if (!categories.some(cat => 
        doc.category?.toLowerCase().includes(cat.toLowerCase())
      )) return false;
    }
    
    // Subcategory filter (case-insensitive)
    if (filters.subcategory && doc.subcategory) {
      const subcategories = Array.isArray(filters.subcategory) 
        ? filters.subcategory 
        : [filters.subcategory];
      if (!subcategories.some(sub => 
        doc.subcategory?.toLowerCase().includes(sub.toLowerCase())
      )) return false;
    }
    
    // Tag filter
    if (filters.tags?.length && doc.tags?.length) {
      const docTags = new Set(doc.tags.map(t => t.toLowerCase()));
      if (!filters.tags.some(tag => docTags.has(tag.toLowerCase()))) {
        return false;
      }
    }
    
    // Rating filter
    if (filters.minRating !== undefined && (doc.rating || 0) < filters.minRating) {
      return false;
    }
    
    // Price filter (if applicable)
    if (filters.maxPrice !== undefined && doc.pricing) {
      // Simple price extraction - enhance based on your pricing structure
      if (typeof doc.pricing === 'string') {
        const priceMatch = doc.pricing.match(/\$([\d.]+)/);
        if (priceMatch && parseFloat(priceMatch[1]) > filters.maxPrice) {
          return false;
        }
      }
    }
    
    // Date filters
    if (filters.date && doc.publishedAt) {
      const docDate = new Date(doc.publishedAt).toISOString().split('T')[0];
      if (docDate !== filters.date) return false;
    }
    
    // Additional filters can be added here
    
    return true;
  });
}

/**
 * Group results by type and apply limits
 */
function groupAndLimitResults(
  results: SearchResult[],
  options: SearchOptions
): SearchResult[] {
  const { limit = 10 } = options;
  
  // Group by type
  const grouped: Record<string, SearchResult[]> = {
    tool: [],
    blog: [],
    news: [],
    update: []
  };
  
  results.forEach(result => {
    if (grouped[result.type]) {
      grouped[result.type].push(result);
    } else {
      grouped.other = grouped.other || [];
      grouped.other.push(result);
    }
  });
  
  // Apply limits to each group
  const maxPerGroup = Math.ceil(limit / Object.keys(grouped).length);
  const limitedGroups = Object.entries(grouped).map(([type, items]) => ({
    type,
    items: items.slice(0, maxPerGroup)
  }));
  
  // Flatten and sort by score
  return limitedGroups
    .flatMap(group => group.items)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

export default enhancedSearch;
