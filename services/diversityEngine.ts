/**
 * Search result diversity and fairness engine
 */

// Diversity configuration
export interface DiversityConfig {
  enableCategoryDiversity: boolean;
  enableSourceDiversity: boolean;
  enablePerspectiveDiversity: boolean;
  enableTemporalDiversity: boolean;
  enableGeographicDiversity: boolean;
  categoryWeight: number; // 0-1
  sourceWeight: number; // 0-1
  perspectiveWeight: number; // 0-1
  temporalWeight: number; // 0-1
  geographicWeight: number; // 0-1
  maxSimilarityThreshold: number; // 0-1
  minDiversityScore: number; // 0-1
}

// Default diversity configuration
const defaultConfig: DiversityConfig = {
  enableCategoryDiversity: true,
  enableSourceDiversity: true,
  enablePerspectiveDiversity: true,
  enableTemporalDiversity: true,
  enableGeographicDiversity: true,
  categoryWeight: 0.25,
  sourceWeight: 0.2,
  perspectiveWeight: 0.2,
  temporalWeight: 0.15,
  geographicWeight: 0.1,
  maxSimilarityThreshold: 0.8,
  minDiversityScore: 0.3
};

// Content metadata for diversity analysis
export interface DiverseContent {
  id: string;
  title: string;
  content: string;
  categories: string[];
  sources: string[];
  perspectives: string[]; // Different viewpoints or approaches
  publicationDate: Date;
  geographicRegions: string[];
  contentType: string;
  author?: string;
  organization?: string;
  similarityScore?: number; // To other results
  diversityScore?: number; // Overall diversity score
  diversityFactors?: {
    categoryDiversity: number;
    sourceDiversity: number;
    perspectiveDiversity: number;
    temporalDiversity: number;
    geographicDiversity: number;
  };
}

// Fairness metrics
export interface FairnessMetrics {
  representation: {
    categories: Record<string, number>;
    sources: Record<string, number>;
    perspectives: Record<string, number>;
    regions: Record<string, number>;
  };
  bias: {
    categoryBias: number;
    sourceBias: number;
    perspectiveBias: number;
    temporalBias: number;
  };
  fairnessScore: number; // 0-1
}

/**
 * Calculate category diversity score
 */
function calculateCategoryDiversity(
  content: DiverseContent,
  allContent: DiverseContent[]
): number {
  if (allContent.length === 0) return 0;
  
  // Count how many other items share the same categories
  const sharedCategories = allContent
    .filter(item => item.id !== content.id)
    .reduce((count, item) => {
      const shared = content.categories.filter(cat => 
        item.categories.includes(cat)
      ).length;
      return count + shared;
    }, 0);
  
  // Normalize by total possible shared categories
  const totalPossible = (allContent.length - 1) * content.categories.length;
  
  // Return inverse - lower shared categories = higher diversity
  return totalPossible > 0 ? 1 - (sharedCategories / totalPossible) : 1;
}

/**
 * Calculate source diversity score
 */
function calculateSourceDiversity(
  content: DiverseContent,
  allContent: DiverseContent[]
): number {
  if (allContent.length === 0) return 0;
  
  // Count how many other items share the same sources
  const sharedSources = allContent
    .filter(item => item.id !== content.id)
    .reduce((count, item) => {
      const shared = content.sources.filter(source => 
        item.sources.includes(source)
      ).length;
      return count + shared;
    }, 0);
  
  // Normalize by total possible shared sources
  const totalPossible = (allContent.length - 1) * content.sources.length;
  
  // Return inverse - lower shared sources = higher diversity
  return totalPossible > 0 ? 1 - (sharedSources / totalPossible) : 1;
}

/**
 * Calculate perspective diversity score
 */
function calculatePerspectiveDiversity(
  content: DiverseContent,
  allContent: DiverseContent[]
): number {
  if (allContent.length === 0) return 0;
  
  // Count how many other items share the same perspectives
  const sharedPerspectives = allContent
    .filter(item => item.id !== content.id)
    .reduce((count, item) => {
      const shared = content.perspectives.filter(persp => 
        item.perspectives.includes(persp)
      ).length;
      return count + shared;
    }, 0);
  
  // Normalize by total possible shared perspectives
  const totalPossible = (allContent.length - 1) * content.perspectives.length;
  
  // Return inverse - lower shared perspectives = higher diversity
  return totalPossible > 0 ? 1 - (sharedPerspectives / totalPossible) : 1;
}

/**
 * Calculate temporal diversity score
 */
function calculateTemporalDiversity(
  content: DiverseContent,
  allContent: DiverseContent[]
): number {
  if (allContent.length === 0) return 0;
  
  const contentDate = content.publicationDate.getTime();
  const dates = allContent
    .filter(item => item.id !== content.id)
    .map(item => item.publicationDate.getTime());
  
  if (dates.length === 0) return 0.5; // Neutral score if no other items
  
  // Calculate average time difference
  const avgDiff = dates.reduce((sum, date) => 
    sum + Math.abs(contentDate - date), 0
  ) / dates.length;
  
  // Normalize by a reasonable time range (1 year)
  const maxDiff = 365 * 24 * 60 * 60 * 1000;
  return Math.min(1, avgDiff / maxDiff);
}

/**
 * Calculate geographic diversity score
 */
function calculateGeographicDiversity(
  content: DiverseContent,
  allContent: DiverseContent[]
): number {
  if (allContent.length === 0) return 0;
  
  // Count how many other items share the same geographic regions
  const sharedRegions = allContent
    .filter(item => item.id !== content.id)
    .reduce((count, item) => {
      const shared = content.geographicRegions.filter(region => 
        item.geographicRegions.includes(region)
      ).length;
      return count + shared;
    }, 0);
  
  // Normalize by total possible shared regions
  const totalPossible = (allContent.length - 1) * content.geographicRegions.length;
  
  // Return inverse - lower shared regions = higher diversity
  return totalPossible > 0 ? 1 - (sharedRegions / totalPossible) : 1;
}

/**
 * Calculate content similarity
 */
function calculateContentSimilarity(
  content1: DiverseContent,
  content2: DiverseContent
): number {
  // Simple text similarity using Jaccard index
  const words1 = new Set(content1.content.toLowerCase().match(/\b\w+\b/g) || []);
  const words2 = new Set(content2.content.toLowerCase().match(/\b\w+\b/g) || []);
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
}

/**
 * Ensure diversity in search results
 */
export function ensureDiversity(
  results: DiverseContent[],
  config: DiversityConfig = defaultConfig
): DiverseContent[] {
  if (results.length === 0) return results;
  
  // Calculate diversity scores for each result
  const scoredResults = results.map(content => {
    // Calculate similarity to other results
    const similarities = results
      .filter(item => item.id !== content.id)
      .map(item => calculateContentSimilarity(content, item));
    
    const avgSimilarity = similarities.length > 0 
      ? similarities.reduce((sum, sim) => sum + sim, 0) / similarities.length
      : 0;
    
    // Calculate diversity factors
    const categoryDiversity = config.enableCategoryDiversity 
      ? calculateCategoryDiversity(content, results) 
      : 0;
      
    const sourceDiversity = config.enableSourceDiversity 
      ? calculateSourceDiversity(content, results) 
      : 0;
      
    const perspectiveDiversity = config.enablePerspectiveDiversity 
      ? calculatePerspectiveDiversity(content, results) 
      : 0;
      
    const temporalDiversity = config.enableTemporalDiversity 
      ? calculateTemporalDiversity(content, results) 
      : 0;
      
    const geographicDiversity = config.enableGeographicDiversity 
      ? calculateGeographicDiversity(content, results) 
      : 0;
    
    // Calculate weighted diversity score
    const diversityScore = 
      (categoryDiversity * config.categoryWeight) +
      (sourceDiversity * config.sourceWeight) +
      (perspectiveDiversity * config.perspectiveWeight) +
      (temporalDiversity * config.temporalWeight) +
      (geographicDiversity * config.geographicWeight);
    
    return {
      ...content,
      similarityScore: avgSimilarity,
      diversityScore,
      diversityFactors: {
        categoryDiversity,
        sourceDiversity,
        perspectiveDiversity,
        temporalDiversity,
        geographicDiversity
      }
    };
  });
  
  // Filter out results that are too similar or not diverse enough
  const filteredResults = scoredResults.filter(content => 
    (content.similarityScore || 0) <= config.maxSimilarityThreshold &&
    (content.diversityScore || 0) >= config.minDiversityScore
  );
  
  // If we filtered too many results, add some back
  if (filteredResults.length < results.length * 0.5) {
    const remaining = scoredResults
      .filter(content => !filteredResults.includes(content as any))
      .sort((a, b) => (b.diversityScore || 0) - (a.diversityScore || 0));
    
    return [...filteredResults, ...remaining.slice(0, results.length - filteredResults.length)];
  }
  
  return filteredResults;
}

/**
 * Promote underrepresented content
 */
export function promoteUnderrepresentedContent(
  results: DiverseContent[],
  allContent: DiverseContent[],
  promotionFactor: number = 1.5
): DiverseContent[] {
  // Calculate representation metrics for current results
  const currentMetrics = calculateFairnessMetrics(results);
  
  // Identify underrepresented categories/sources/etc.
  const underrepresented: {
    categories: string[];
    sources: string[];
    perspectives: string[];
    regions: string[];
  } = {
    categories: [],
    sources: [],
    perspectives: [],
    regions: []
  };
  
  // Simple threshold-based approach (less than 10% representation)
  Object.entries(currentMetrics.representation.categories).forEach(([category, ratio]) => {
    if (ratio < 0.1) underrepresented.categories.push(category);
  });
  
  Object.entries(currentMetrics.representation.sources).forEach(([source, ratio]) => {
    if (ratio < 0.1) underrepresented.sources.push(source);
  });
  
  Object.entries(currentMetrics.representation.perspectives).forEach(([perspective, ratio]) => {
    if (ratio < 0.1) underrepresented.perspectives.push(perspective);
  });
  
  Object.entries(currentMetrics.representation.regions).forEach(([region, ratio]) => {
    if (ratio < 0.1) underrepresented.regions.push(region);
  });
  
  // Boost scores of underrepresented content
  return results.map(content => {
    let boost = 1;
    
    // Apply boosts for underrepresented attributes
    if (underrepresented.categories.some(cat => content.categories.includes(cat))) {
      boost *= promotionFactor;
    }
    
    if (underrepresented.sources.some(source => content.sources.includes(source))) {
      boost *= promotionFactor;
    }
    
    if (underrepresented.perspectives.some(persp => content.perspectives.includes(persp))) {
      boost *= promotionFactor;
    }
    
    if (underrepresented.regions.some(region => content.geographicRegions.includes(region))) {
      boost *= promotionFactor;
    }
    
    // Apply boost to diversity score
    if (content.diversityScore) {
      return {
        ...content,
        diversityScore: Math.min(1, content.diversityScore * boost)
      };
    }
    
    return content;
  });
}

/**
 * Calculate fairness metrics
 */
export function calculateFairnessMetrics(results: DiverseContent[]): FairnessMetrics {
  if (results.length === 0) {
    return {
      representation: {
        categories: {},
        sources: {},
        perspectives: {},
        regions: {}
      },
      bias: {
        categoryBias: 0,
        sourceBias: 0,
        perspectiveBias: 0,
        temporalBias: 0
      },
      fairnessScore: 1
    };
  }
  
  // Count occurrences of each attribute
  const categoryCounts = new Map<string, number>();
  const sourceCounts = new Map<string, number>();
  const perspectiveCounts = new Map<string, number>();
  const regionCounts = new Map<string, number>();
  
  results.forEach(content => {
    content.categories.forEach(cat => {
      categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
    });
    
    content.sources.forEach(source => {
      sourceCounts.set(source, (sourceCounts.get(source) || 0) + 1);
    });
    
    content.perspectives.forEach(persp => {
      perspectiveCounts.set(persp, (perspectiveCounts.get(persp) || 0) + 1);
    });
    
    content.geographicRegions.forEach(region => {
      regionCounts.set(region, (regionCounts.get(region) || 0) + 1);
    });
  });
  
  // Calculate representation ratios
  const totalResults = results.length;
  
  const representation = {
    categories: Object.fromEntries(
      Array.from(categoryCounts.entries()).map(([cat, count]) => 
        [cat, count / totalResults]
      )
    ),
    sources: Object.fromEntries(
      Array.from(sourceCounts.entries()).map(([source, count]) => 
        [source, count / totalResults]
      )
    ),
    perspectives: Object.fromEntries(
      Array.from(perspectiveCounts.entries()).map(([persp, count]) => 
        [persp, count / totalResults]
      )
    ),
    regions: Object.fromEntries(
      Array.from(regionCounts.entries()).map(([region, count]) => 
        [region, count / totalResults]
      )
    )
  };
  
  // Calculate bias metrics (variance from uniform distribution)
  const categoryBias = calculateDistributionBias(
    Array.from(categoryCounts.values()).map(count => count / totalResults)
  );
  
  const sourceBias = calculateDistributionBias(
    Array.from(sourceCounts.values()).map(count => count / totalResults)
  );
  
  const perspectiveBias = calculateDistributionBias(
    Array.from(perspectiveCounts.values()).map(count => count / totalResults)
  );
  
  // Temporal bias (variance in publication dates)
  const dates = results.map(result => result.publicationDate.getTime());
  const temporalBias = dates.length > 1 
    ? calculateTemporalBias(dates) 
    : 0;
  
  const bias = {
    categoryBias,
    sourceBias,
    perspectiveBias,
    temporalBias
  };
  
  // Calculate overall fairness score (inverse of average bias)
  const avgBias = (categoryBias + sourceBias + perspectiveBias + temporalBias) / 4;
  const fairnessScore = 1 - avgBias;
  
  return {
    representation,
    bias,
    fairnessScore
  };
}

/**
 * Calculate distribution bias (variance from uniform)
 */
function calculateDistributionBias(distribution: number[]): number {
  if (distribution.length === 0) return 0;
  
  const mean = distribution.reduce((sum, val) => sum + val, 0) / distribution.length;
  const variance = distribution.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / distribution.length;
  const stdDev = Math.sqrt(variance);
  
  // Normalize by mean to get coefficient of variation
  return mean > 0 ? stdDev / mean : 0;
}

/**
 * Calculate temporal bias
 */
function calculateTemporalBias(dates: number[]): number {
  if (dates.length < 2) return 0;
  
  // Sort dates
  dates.sort((a, b) => a - b);
  
  // Calculate time spans
  const totalSpan = dates[dates.length - 1] - dates[0];
  if (totalSpan === 0) return 0;
  
  // Calculate gaps between consecutive dates
  const gaps = [];
  for (let i = 1; i < dates.length; i++) {
    gaps.push(dates[i] - dates[i - 1]);
  }
  
  // Calculate variance of gaps
  const meanGap = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
  const variance = gaps.reduce((sum, gap) => sum + Math.pow(gap - meanGap, 2), 0) / gaps.length;
  const stdDev = Math.sqrt(variance);
  
  // Normalize by total span
  return stdDev / totalSpan;
}

/**
 * Get diversity recommendations
 */
export function getDiversityRecommendations(
  results: DiverseContent[],
  metrics: FairnessMetrics
): string[] {
  const recommendations: string[] = [];
  
  // Check for category bias
  if (metrics.bias.categoryBias > 0.5) {
    recommendations.push('Consider including more diverse categories in your search results');
  }
  
  // Check for source bias
  if (metrics.bias.sourceBias > 0.5) {
    recommendations.push('Results are dominated by a few sources - try diversifying content sources');
  }
  
  // Check for perspective bias
  if (metrics.bias.perspectiveBias > 0.5) {
    recommendations.push('Include content with different perspectives or viewpoints');
  }
  
  // Check for temporal bias
  if (metrics.bias.temporalBias > 0.5) {
    recommendations.push('Results are clustered around specific time periods - consider broader temporal range');
  }
  
  // If fairness score is low
  if (metrics.fairnessScore < 0.5) {
    recommendations.push('Overall result diversity is low - enable diversity features to improve balance');
  }
  
  return recommendations;
}

/**
 * Apply diversity constraints to ranking
 */
export function applyDiversityRanking(
  results: DiverseContent[],
  config: DiversityConfig = defaultConfig
): DiverseContent[] {
  // First ensure basic diversity
  let diverseResults = ensureDiversity(results, config);
  
  // Calculate final ranking scores that consider diversity
  const rankedResults = diverseResults.map(content => {
    // Combine original relevance score with diversity score
    // Assuming content has a relevanceScore property (0-1)
    const relevanceScore = (content as any).relevanceScore || 0.5;
    const diversityScore = content.diversityScore || 0;
    
    // Weighted combination (70% relevance, 30% diversity)
    const finalScore = (relevanceScore * 0.7) + (diversityScore * 0.3);
    
    return {
      ...content,
      finalRankingScore: finalScore
    };
  });
  
  // Sort by final ranking score
  return rankedResults.sort((a, b) => 
    (b as any).finalRankingScore - (a as any).finalRankingScore
  );
}

/**
 * Calculate diversity scores for search results
 */
export async function getDiversityScore(results: any[]): Promise<any[]> {
  // This is a simplified implementation
  // In a real system, you would use more sophisticated algorithms
  
  // Add diversity scores to each result
  return results.map((result, index) => ({
    ...result,
    diversityScore: Math.random() // In a real implementation, this would be calculated based on content similarity
  }));
}

// Export functions for external use
// getDiversityScore is already exported directly
