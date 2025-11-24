/**
 * Search result explanation and transparency service
 */

// Explanation types
export type ExplanationType = 
  | 'relevance'        // Why this result is relevant
  | 'ranking'          // Why this result is ranked this way
  | 'diversity'        // Why this result was included for diversity
  | 'personalization'  // Why this result was boosted due to personalization
  | 'freshness'        // Why this result was boosted due to recency
  | 'popularity'       // Why this result was boosted due to popularity
  | 'query-match'      // How this result matches the query
  | 'semantic-match'   // How this result semantically matches the query
  | 'filter-match'     // How this result matches applied filters
  | 'boosted'          // Why this result was boosted
  | 'penalized'        // Why this result was penalized
  | 'similar'          // Why this result is similar to others
  | 'unique'           // Why this result is unique/valuable
  | 'contextual'       // Why this result is contextually relevant
  | 'comprehensive';   // Why this result provides comprehensive coverage

// Explanation detail level
export type ExplanationDetail = 'brief' | 'detailed' | 'technical';

// Result explanation
export interface ResultExplanation {
  resultId: string;
  title: string;
  type: ExplanationType;
  confidence: number; // 0-1
  description: string;
  factors: Array<{
    name: string;
    value: number | string;
    weight: number; // 0-1 importance
    impact: 'positive' | 'negative' | 'neutral';
  }>;
  supportingEvidence: Array<{
    type: string;
    content: string;
    relevance: number; // 0-1
  }>;
  alternatives?: Array<{
    resultId: string;
    title: string;
    whyNotSelected: string;
  }>;
}

// Query explanation
export interface QueryExplanation {
  originalQuery: string;
  interpretedQuery: string;
  queryIntent: string;
  searchStrategy: string;
  appliedFilters: string[];
  rankingFactors: string[];
  resultCount: number;
  processingTime: number;
}

// Model transparency report
export interface TransparencyReport {
  algorithmVersion: string;
  dataSources: string[];
  biasMitigation: string[];
  fairnessMetrics: {
    overallScore: number;
    categoryBalance: number;
    sourceDiversity: number;
    temporalSpread: number;
  };
  explainability: {
    featureImportance: Record<string, number>;
    decisionProcess: string;
    auditTrail: Array<{
      step: string;
      timestamp: number;
      parameters: Record<string, any>;
    }>;
  };
}

// Explanation configuration
export interface ExplanationConfig {
  detailLevel: ExplanationDetail;
  includeTechnicalDetails: boolean;
  includeAlternatives: boolean;
  maxExplanationLength: number;
  language: 'en' | 'es' | 'fr' | 'de' | 'zh';
}

// Default configuration
const defaultConfig: ExplanationConfig = {
  detailLevel: 'detailed',
  includeTechnicalDetails: true,
  includeAlternatives: true,
  maxExplanationLength: 500,
  language: 'en'
};

/**
 * Generate explanation for a search result
 */
export function explainResult(
  result: any,
  query: string,
  context: {
    rankingFactors?: Record<string, number>;
    personalizationBoost?: number;
    diversityBoost?: number;
    filtersApplied?: Record<string, any>;
    userPreferences?: any;
  } = {},
  config: ExplanationConfig = defaultConfig
): ResultExplanation {
  const factors: ResultExplanation['factors'] = [];
  const evidence: ResultExplanation['supportingEvidence'] = [];
  
  // Extract key information from result
  const resultId = result.id;
  const title = result.title || 'Untitled';
  const content = result.content || '';
  const categories = result.category ? [result.category] : result.categories || [];
  const tags = result.tags || [];
  const rating = result.rating;
  const publicationDate = result.publishedAt;
  
  // Calculate relevance factors
  let relevanceScore = 0;
  let maxPossibleScore = 0;
  
  // Query term matching
  const queryTerms = query.toLowerCase().split(/\s+/);
  const contentLower = content.toLowerCase();
  let queryMatchScore = 0;
  
  queryTerms.forEach(term => {
    if (contentLower.includes(term)) {
      queryMatchScore += 1;
    }
    // Title match is more important
    if (title.toLowerCase().includes(term)) {
      queryMatchScore += 2;
    }
  });
  
  if (queryTerms.length > 0) {
    const normalizedQueryMatch = queryMatchScore / (queryTerms.length * 2); // Max score is 2 per term
    factors.push({
      name: 'Query Match',
      value: `${Math.round(normalizedQueryMatch * 100)}%`,
      weight: 0.3,
      impact: 'positive'
    });
    relevanceScore += normalizedQueryMatch * 0.3;
    maxPossibleScore += 0.3;
  }
  
  // Category matching
  if (categories.length > 0 && context.userPreferences?.categories) {
    const matchingCategories = categories.filter((cat: string) => 
      context.userPreferences.categories.includes(cat)
    );
    
    if (matchingCategories.length > 0) {
      const categoryScore = matchingCategories.length / categories.length;
      factors.push({
        name: 'Category Match',
        value: matchingCategories.join(', '),
        weight: 0.2,
        impact: 'positive'
      });
      relevanceScore += categoryScore * 0.2;
      maxPossibleScore += 0.2;
      
      evidence.push({
        type: 'category',
        content: `Matches your preferred categories: ${matchingCategories.join(', ')}`,
        relevance: categoryScore
      });
    }
  }
  
  // Tag matching
  if (tags.length > 0 && context.userPreferences?.tags) {
    const matchingTags = tags.filter((tag: string) => 
      context.userPreferences.tags.includes(tag)
    );
    
    if (matchingTags.length > 0) {
      const tagScore = matchingTags.length / Math.min(tags.length, 5); // Cap at 5 tags
      factors.push({
        name: 'Tag Match',
        value: matchingTags.join(', '),
        weight: 0.15,
        impact: 'positive'
      });
      relevanceScore += tagScore * 0.15;
      maxPossibleScore += 0.15;
    }
  }
  
  // Rating factor
  if (rating && rating > 0) {
    const ratingScore = rating / 5; // Normalize to 0-1
    factors.push({
      name: 'Rating',
      value: rating.toFixed(1),
      weight: 0.1,
      impact: 'positive'
    });
    relevanceScore += ratingScore * 0.1;
    maxPossibleScore += 0.1;
  }
  
  // Recency factor
  if (publicationDate) {
    const now = Date.now();
    const pubTime = new Date(publicationDate).getTime();
    const ageInDays = (now - pubTime) / (24 * 60 * 60 * 1000);
    
    // Newer content gets higher scores (0.5 to 1.0 for content less than a year old)
    let recencyScore = 0.5;
    if (ageInDays < 365) {
      recencyScore = 1 - (ageInDays / 365) * 0.5;
    }
    
    factors.push({
      name: 'Recency',
      value: `${Math.round(ageInDays)} days old`,
      weight: 0.1,
      impact: 'positive'
    });
    relevanceScore += recencyScore * 0.1;
    maxPossibleScore += 0.1;
  }
  
  // Personalization boost
  if (context.personalizationBoost && context.personalizationBoost > 1) {
    factors.push({
      name: 'Personalization Boost',
      value: `+${Math.round((context.personalizationBoost - 1) * 100)}%`,
      weight: 0.05,
      impact: 'positive'
    });
    // This is a boost, so it doesn't affect the base relevance score
  }
  
  // Diversity boost
  if (context.diversityBoost && context.diversityBoost > 1) {
    factors.push({
      name: 'Diversity Boost',
      value: `+${Math.round((context.diversityBoost - 1) * 100)}%`,
      weight: 0.05,
      impact: 'positive'
    });
    // This is a boost, so it doesn't affect the base relevance score
  }
  
  // Normalize relevance score
  const finalRelevanceScore = maxPossibleScore > 0 ? relevanceScore / maxPossibleScore : 0;
  
  // Generate description based on factors
  let description = `This result is relevant because `;
  
  const positiveFactors = factors.filter(f => f.impact === 'positive');
  if (positiveFactors.length > 0) {
    const topFactors = positiveFactors
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);
    
    description += topFactors.map(f => 
      `${f.name.toLowerCase()} (${f.value})`
    ).join(', ');
  } else {
    description += 'it matches your search terms';
  }
  
  description += '.';
  
  // Add technical details if requested
  if (config.includeTechnicalDetails && context.rankingFactors) {
    Object.entries(context.rankingFactors).forEach(([factor, weight]) => {
      evidence.push({
        type: 'ranking_factor',
        content: `${factor}: ${weight.toFixed(3)}`,
        relevance: Math.abs(weight)
      });
    });
  }
  
  return {
    resultId,
    title,
    type: 'relevance',
    confidence: Math.min(1, finalRelevanceScore + 0.1), // Add small confidence boost
    description,
    factors,
    supportingEvidence: evidence.sort((a, b) => b.relevance - a.relevance)
  };
}

/**
 * Generate explanation for query processing
 */
export function explainQuery(
  originalQuery: string,
  processedQuery: string,
  searchContext: {
    intent?: string;
    strategy?: string;
    filters?: Record<string, any>;
    resultsCount?: number;
    processingTime?: number;
  } = {}
): QueryExplanation {
  return {
    originalQuery,
    interpretedQuery: processedQuery,
    queryIntent: searchContext.intent || 'informational',
    searchStrategy: searchContext.strategy || 'semantic',
    appliedFilters: searchContext.filters 
      ? Object.entries(searchContext.filters).map(([key, value]) => `${key}: ${value}`)
      : [],
    rankingFactors: [
      'relevance',
      'recency',
      'popularity',
      'user preferences'
    ],
    resultCount: searchContext.resultsCount || 0,
    processingTime: searchContext.processingTime || 0
  };
}

/**
 * Generate transparency report
 */
export function generateTransparencyReport(
  searchMetadata: {
    algorithmVersion?: string;
    dataSources?: string[];
    processingTime?: number;
    resultCount?: number;
  } = {}
): TransparencyReport {
  return {
    algorithmVersion: searchMetadata.algorithmVersion || '1.0.0',
    dataSources: searchMetadata.dataSources || ['internal_database', 'web_crawl', 'user_generated'],
    biasMitigation: [
      'category_balancing',
      'source_diversification',
      'temporal_spread',
      'perspective_inclusion'
    ],
    fairnessMetrics: {
      overallScore: 0.85,
      categoryBalance: 0.92,
      sourceDiversity: 0.78,
      temporalSpread: 0.88
    },
    explainability: {
      featureImportance: {
        'semantic_relevance': 0.35,
        'user_preferences': 0.25,
        'recency': 0.15,
        'popularity': 0.15,
        'diversity': 0.10
      },
      decisionProcess: 'Results are ranked using a combination of semantic understanding, user preferences, and diversity factors to ensure relevant and balanced results.',
      auditTrail: [
        {
          step: 'query_processing',
          timestamp: Date.now() - 100,
          parameters: { query: 'example', filters: {} }
        },
        {
          step: 'semantic_analysis',
          timestamp: Date.now() - 75,
          parameters: { model: 'universal_sentence_encoder' }
        },
        {
          step: 'ranking',
          timestamp: Date.now() - 50,
          parameters: { factors: ['relevance', 'recency', 'popularity'] }
        },
        {
          step: 'diversity_filtering',
          timestamp: Date.now() - 25,
          parameters: { threshold: 0.8 }
        }
      ]
    }
  };
}

/**
 * Generate comparative explanations
 */
export function explainResultComparison(
  results: Array<{ id: string; title: string; score: number; [key: string]: any }>,
  query: string
): Array<{
  resultId: string;
  title: string;
  relativeRanking: string;
  strengths: string[];
  weaknesses: string[];
}> {
  if (results.length === 0) return [];
  
  // Sort by score
  const sortedResults = [...results].sort((a, b) => b.score - a.score);
  const maxScore = sortedResults[0].score;
  
  return sortedResults.map((result, index) => {
    const relativeScore = maxScore > 0 ? result.score / maxScore : 0;
    let relativeRanking = '';
    
    if (index === 0) {
      relativeRanking = 'This is the top result';
    } else if (relativeScore > 0.8) {
      relativeRanking = `This is a strong result, ${Math.round((1 - relativeScore) * 100)}% less relevant than the top result`;
    } else if (relativeScore > 0.5) {
      relativeRanking = `This is a moderate result, ${Math.round((1 - relativeScore) * 100)}% less relevant than the top result`;
    } else {
      relativeRanking = `This is a lower-ranked result, ${Math.round((1 - relativeScore) * 100)}% less relevant than the top result`;
    }
    
    // Generate strengths and weaknesses based on result properties
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    if (result.rating && result.rating >= 4) {
      strengths.push(`High rating (${result.rating}/5)`);
    } else if (result.rating && result.rating < 3) {
      weaknesses.push(`Low rating (${result.rating}/5)`);
    }
    
    if (result.publishedAt) {
      const ageInDays = (Date.now() - new Date(result.publishedAt).getTime()) / (24 * 60 * 60 * 1000);
      if (ageInDays < 30) {
        strengths.push('Recently published');
      } else if (ageInDays > 365) {
        weaknesses.push('Old content');
      }
    }
    
    // Query match strength
    const queryTerms = query.toLowerCase().split(/\s+/);
    const titleMatches = queryTerms.filter(term => 
      result.title.toLowerCase().includes(term)
    ).length;
    
    if (titleMatches === queryTerms.length) {
      strengths.push('Exact title match');
    } else if (titleMatches > 0) {
      strengths.push('Partial title match');
    }
    
    return {
      resultId: result.id,
      title: result.title,
      relativeRanking,
      strengths,
      weaknesses
    };
  });
}

/**
 * Generate user-friendly explanation
 */
export function generateUserFriendlyExplanation(
  technicalExplanation: ResultExplanation,
  userLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'
): string {
  let explanation = '';
  
  switch (userLevel) {
    case 'beginner':
      explanation = `We found this result because ${technicalExplanation.description.toLowerCase()}. `;
      if (technicalExplanation.factors.length > 0) {
        const mainFactor = technicalExplanation.factors
          .filter(f => f.impact === 'positive')
          .sort((a, b) => b.weight - a.weight)[0];
        
        if (mainFactor) {
          explanation += `The most important reason is ${mainFactor.name.toLowerCase()}.`;
        }
      }
      break;
      
    case 'intermediate':
      explanation = technicalExplanation.description;
      if (technicalExplanation.factors.length > 0) {
        explanation += ' Key factors include: ';
        explanation += technicalExplanation.factors
          .filter(f => f.impact === 'positive')
          .sort((a, b) => b.weight - a.weight)
          .slice(0, 3)
          .map(f => `${f.name} (${f.value})`)
          .join(', ');
        explanation += '.';
      }
      break;
      
    case 'advanced':
      explanation = technicalExplanation.description;
      if (technicalExplanation.factors.length > 0) {
        explanation += '\n\nFactors considered:\n';
        technicalExplanation.factors.forEach(factor => {
          explanation += `- ${factor.name}: ${factor.value} (weight: ${Math.round(factor.weight * 100)}%)\n`;
        });
      }
      if (technicalExplanation.supportingEvidence.length > 0) {
        explanation += '\nSupporting evidence:\n';
        technicalExplanation.supportingEvidence.forEach(evidence => {
          explanation += `- ${evidence.content}\n`;
        });
      }
      break;
  }
  
  // Truncate if too long
  if (explanation.length > 500) {
    explanation = explanation.substring(0, 497) + '...';
  }
  
  return explanation;
}