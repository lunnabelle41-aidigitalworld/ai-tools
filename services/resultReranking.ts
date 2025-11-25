/**
 * Search result re-ranking service
 */

import { analyzeSentiment } from './sentimentAnalysis';

// Re-ranking factors
export interface RerankingFactors {
  similarity?: number; // Semantic similarity score (0-1)
  rating?: number; // User rating (0-5)
  recency?: number; // How recent the content is (0-1)
  popularity?: number; // Popularity/engagement metric (0-1)
  sentiment?: number; // Sentiment score (0-1)
  personalization?: number; // Personalization boost (0-1)
  diversity?: number; // Diversity factor to avoid similar results (0-1)
}

// Re-ranking configuration
export interface RerankingConfig {
  weights: {
    similarity: number;
    rating: number;
    recency: number;
    popularity: number;
    sentiment: number;
    personalization: number;
    diversity: number;
  };
  diversityThreshold?: number; // Threshold for considering results similar (0-1)
  personalizationBoost?: number; // Boost factor for personalized results
}

// Default configuration
const defaultConfig: RerankingConfig = {
  weights: {
    similarity: 0.4,
    rating: 0.2,
    recency: 0.15,
    popularity: 0.1,
    sentiment: 0.05,
    personalization: 0.05,
    diversity: 0.05
  },
  diversityThreshold: 0.8,
  personalizationBoost: 1.2
};

// Search result with features
export interface SearchResultWithFeatures {
  id: string;
  title: string;
  content: string;
  similarity: number; // 0-1
  rating?: number; // 0-5
  publishedAt?: Date;
  popularity?: number; // 0-1
  category?: string;
  tags?: string[];
  userId?: string;
  [key: string]: any; // Additional features
}

/**
 * Normalize a value to 0-1 range
 */
function normalize(value: number, min: number, max: number): number {
  if (min === max) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Calculate recency score based on publication date
 */
function calculateRecencyScore(publishedAt?: Date): number {
  if (!publishedAt) return 0.5;
  
  const now = new Date();
  const diffMs = now.getTime() - publishedAt.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
  // Exponential decay - newer content gets higher scores
  // Content from today: ~1, one year ago: ~0.3, five years ago: ~0.1
  return Math.exp(-diffDays / 365);
}

/**
 * Calculate diversity score based on content similarity
 */
function calculateDiversityScore(
  result: SearchResultWithFeatures,
  otherResults: SearchResultWithFeatures[],
  threshold: number
): number {
  if (otherResults.length === 0) return 1;
  
  // Calculate average similarity to other results
  let totalSimilarity = 0;
  let count = 0;
  
  otherResults.forEach(other => {
    if (other.id !== result.id) {
      // Simple text overlap similarity
      const text1 = (result.title + ' ' + result.content).toLowerCase();
      const text2 = (other.title + ' ' + other.content).toLowerCase();
      
      // Jaccard similarity of words
      const words1 = new Set(text1.match(/\b\w+\b/g) || []);
      const words2 = new Set(text2.match(/\b\w+\b/g) || []);
      
      const intersection = new Set([...words1].filter(x => words2.has(x)));
      const union = new Set([...words1, ...words2]);
      
      if (union.size > 0) {
        const similarity = intersection.size / union.size;
        totalSimilarity += similarity;
        count++;
      }
    }
  });
  
  const avgSimilarity = count > 0 ? totalSimilarity / count : 0;
  
  // Diversity is inverse of similarity, but capped by threshold
  return avgSimilarity > threshold ? 0 : 1 - avgSimilarity;
}

/**
 * Calculate personalization boost
 */
function calculatePersonalizationBoost(
  result: SearchResultWithFeatures,
  userId?: string,
  boostFactor: number = 1.2
): number {
  if (!userId || !result.userId) return 1;
  
  // Simple personalization - boost if same user
  return result.userId === userId ? boostFactor : 1;
}

/**
 * Rerank search results based on multiple factors
 */
export async function rerankSearchResults(
  results: SearchResultWithFeatures[],
  config: RerankingConfig = defaultConfig
): Promise<SearchResultWithFeatures[]> {
  // Apply reranking algorithm
  const reranked = results.map(result => {
    // Calculate combined score based on weights
    const combinedScore = 
      (result.similarity || 0) * config.weights.similarity +
      (result.rating || 0) / 5 * config.weights.rating +
      (result.recency || 0) * config.weights.recency +
      (result.popularity || 0) * config.weights.popularity +
      (result.sentiment || 0) * config.weights.sentiment +
      (result.personalization || 0) * config.weights.personalization +
      (result.diversity || 0) * config.weights.diversity;
    
    return {
      ...result,
      similarity: combinedScore
    };
  });
  
  // Sort by combined score
  return reranked.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
}

/**
 * Get re-ranking explanation for a result
 */
export function getRerankingExplanation(result: SearchResultWithFeatures & { _features?: any }): string {
  if (!result._features) {
    return 'No re-ranking data available';
  }
  
  const features = result._features;
  const explanations: string[] = [];
  
  if (features.similarity > 0.7) explanations.push('Highly relevant to your search');
  if (features.rating > 0.8) explanations.push('Highly rated by users');
  if (features.recency > 0.8) explanations.push('Recently published');
  if (features.popularity > 0.7) explanations.push('Popular among users');
  if (features.sentiment > 0.7) explanations.push('Positive sentiment');
  if (features.diversity > 0.7) explanations.push('Unique perspective');
  if (features.personalization > 1) explanations.push('Matches your preferences');
  
  if (explanations.length === 0) {
    return 'Standard relevance ranking';
  }
  
  return explanations.join(', ');
}

/**
 * Adjust re-ranking weights based on user feedback
 */
export function adjustWeightsBasedOnFeedback(
  currentWeights: RerankingConfig['weights'],
  feedback: { resultId: string; rating: number }[], // 1-5 rating
  results: SearchResultWithFeatures[]
): RerankingConfig['weights'] {
  // This is a simplified version - in practice, you'd use machine learning
  // For now, we'll adjust based on average feedback
  
  const avgRating = feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length;
  
  // If average rating is high (>4), increase similarity weight
  // If average rating is low (<3), decrease similarity weight and increase others
  if (avgRating > 4) {
    return {
      ...currentWeights,
      similarity: Math.min(1, currentWeights.similarity + 0.1),
      rating: Math.max(0, currentWeights.rating - 0.05)
    };
  } else if (avgRating < 3) {
    return {
      ...currentWeights,
      similarity: Math.max(0, currentWeights.similarity - 0.1),
      rating: Math.min(1, currentWeights.rating + 0.1),
      recency: Math.min(1, currentWeights.recency + 0.05)
    };
  }
  
  return currentWeights;
}

// Export the main function for external use
// rerankSearchResults is already exported directly