/**
 * Search result comparison service
 */

import { SearchResult } from './searchService';

// Comparison criteria
export type ComparisonCriteria = 
  | 'rating'
  | 'price'
  | 'features'
  | 'reviews'
  | 'popularity'
  | 'performance'
  | 'usability'
  | 'support';

// Comparison result
export interface ComparisonResult {
  items: SearchResult[];
  criteria: ComparisonCriteria[];
  scores: Record<string, Record<ComparisonCriteria, number>>;
  overallScores: Record<string, number>;
  winner: string;
  recommendations: string[];
}

// Compare search results based on multiple criteria
export function compareSearchResults(
  items: SearchResult[],
  criteria: ComparisonCriteria[] = ['rating', 'price', 'features']
): ComparisonResult {
  if (items.length < 2) {
    throw new Error('At least 2 items are required for comparison');
  }

  // Initialize scores
  const scores: Record<string, Record<ComparisonCriteria, number>> = {};
  const overallScores: Record<string, number> = {};

  // Calculate scores for each item and criteria
  items.forEach(item => {
    scores[item.id] = {} as Record<ComparisonCriteria, number>;
    
    criteria.forEach(criterion => {
      scores[item.id][criterion] = calculateCriterionScore(item, criterion);
    });
    
    // Calculate overall score (average of all criteria)
    const totalScore = criteria.reduce((sum, crit) => sum + scores[item.id][crit], 0);
    overallScores[item.id] = totalScore / criteria.length;
  });

  // Determine winner (highest overall score)
  const winner = Object.keys(overallScores).reduce((a, b) => 
    overallScores[a] > overallScores[b] ? a : b
  );

  // Generate recommendations
  const recommendations = generateRecommendations(items, scores, overallScores, criteria);

  return {
    items,
    criteria,
    scores,
    overallScores,
    winner,
    recommendations
  };
}

// Calculate score for a specific criterion
function calculateCriterionScore(item: SearchResult, criterion: ComparisonCriteria): number {
  switch (criterion) {
    case 'rating':
      return Math.min(1, (item.rating || 0) / 5);
      
    case 'price':
      // Lower price is better (assuming we're comparing value)
      // Normalize based on typical price ranges
      if (item.pricing) {
        // Fix: Check if pricing is a string before calling match
        if (typeof item.pricing === 'string') {
          const priceMatch = item.pricing.match(/\$([\d.]+)/);
          if (priceMatch) {
            const price = parseFloat(priceMatch[1]);
            // Assume $100 is high, $0 is low
            return Math.max(0, 1 - (price / 100));
          }
        } else if (typeof item.pricing === 'object' && item.pricing !== null) {
          // Handle object pricing (e.g., { free: true, paid: false })
          if (item.pricing.free && !item.pricing.paid) {
            return 1; // Free is best value
          } else if (item.pricing.paid) {
            // For paid plans, we don't have a specific price, so return neutral
            return 0.5;
          }
        }
      }
      return 0.5; // Neutral score if no price info
      
    case 'features':
      // More features is better
      if (item.features && Array.isArray(item.features)) {
        // Assume 20 features is a lot, 0 is few
        return Math.min(1, item.features.length / 20);
      }
      return 0.3; // Low score if no features info
      
    case 'reviews':
      // More reviews indicates popularity
      if (item.reviews) {
        // Assume 1000 reviews is a lot, 0 is few
        return Math.min(1, item.reviews / 1000);
      }
      return 0.2; // Low score if no reviews info
      
    case 'popularity':
      // Use a combination of reviews and rating as proxy for popularity
      const ratingScore = Math.min(1, (item.rating || 0) / 5);
      const reviewsScore = item.reviews ? Math.min(1, item.reviews / 1000) : 0;
      return (ratingScore + reviewsScore) / 2;
      
    case 'performance':
      // Use rating as proxy for performance
      return Math.min(1, (item.rating || 0) / 5);
      
    case 'usability':
      // Use rating as proxy for usability
      return Math.min(1, (item.rating || 0) / 5);
      
    case 'support':
      // Assume tools with websites and documentation have better support
      let supportScore = 0;
      if (item.url) supportScore += 0.3;
      if (item.documentationUrl) supportScore += 0.3;
      if (item.supportEmail || item.supportUrl) supportScore += 0.4;
      return Math.min(1, supportScore);
      
    default:
      return 0.5; // Neutral score for unknown criteria
  }
}

// Generate recommendations based on comparison results
function generateRecommendations(
  items: SearchResult[],
  scores: Record<string, Record<ComparisonCriteria, number>>,
  overallScores: Record<string, number>,
  criteria: ComparisonCriteria[]
): string[] {
  const recommendations: string[] = [];
  
  // Find the best item overall
  const bestItem = items.find(item => item.id === Object.keys(overallScores).reduce((a, b) => 
    overallScores[a] > overallScores[b] ? a : b
  ));
  
  if (bestItem) {
    recommendations.push(`"${bestItem.title}" is the overall best choice based on your criteria.`);
  }
  
  // Find items that excel in specific criteria
  criteria.forEach(criterion => {
    const bestInCriterion = items.reduce((best, current) => 
      scores[current.id][criterion] > scores[best.id][criterion] ? current : best
    );
    
    if (bestInCriterion && scores[bestInCriterion.id][criterion] > 0.7) {
      recommendations.push(`"${bestInCriterion.title}" excels in ${criterion} (${Math.round(scores[bestInCriterion.id][criterion] * 100)}%).`);
    }
  });
  
  // Find good value items (high rating, low price)
  const valueItems = items
    .filter(item => (item.rating || 0) >= 4.0 && scores[item.id]['price'] >= 0.6)
    .sort((a, b) => overallScores[b.id] - overallScores[a.id]);
    
  if (valueItems.length > 0) {
    recommendations.push(`"${valueItems[0].title}" offers the best value (high rating, affordable price).`);
  }
  
  // Find items for specific needs
  const highRatedItems = items.filter(item => (item.rating || 0) >= 4.5);
  if (highRatedItems.length > 0 && highRatedItems.length < items.length) {
    const percentage = Math.round((highRatedItems.length / items.length) * 100);
    recommendations.push(`${percentage}% of the options are highly rated (4.5+ stars).`);
  }
  
  // If no recommendations were generated, provide a default one
  if (recommendations.length === 0 && bestItem) {
    recommendations.push(`Based on the analysis, "${bestItem.title}" is recommended as the top choice.`);
  }
  
  return recommendations;
}

// Generate comparison report
export function generateComparisonReport(comparison: ComparisonResult): string {
  let report = `# Comparison Report\n\n`;
  report += `## Items Compared (${comparison.items.length})\n`;
  comparison.items.forEach((item, index) => {
    report += `${index + 1}. ${item.title}\n`;
  });
  
  report += `\n## Criteria Used\n`;
  comparison.criteria.forEach(criterion => {
    report += `- ${criterion.charAt(0).toUpperCase() + criterion.slice(1)}\n`;
  });
  
  report += `\n## Detailed Scores\n`;
  comparison.items.forEach(item => {
    report += `\n### ${item.title}\n`;
    report += `Overall Score: ${Math.round(comparison.overallScores[item.id] * 100)}%\n`;
    comparison.criteria.forEach(criterion => {
      report += `- ${criterion}: ${Math.round(comparison.scores[item.id][criterion] * 100)}%\n`;
    });
  });
  
  report += `\n## Winner\n`;
  const winnerItem = comparison.items.find(item => item.id === comparison.winner);
  if (winnerItem) {
    report += `"${winnerItem.title}" is the winner with an overall score of ${Math.round(comparison.overallScores[winnerItem.id] * 100)}%.\n`;
  }
  
  report += `\n## Recommendations\n`;
  comparison.recommendations.forEach((rec, index) => {
    report += `${index + 1}. ${rec}\n`;
  });
  
  return report;
}

// Get comparison statistics
export function getComparisonStats(comparison: ComparisonResult): Record<string, any> {
  const stats: Record<string, any> = {
    totalItems: comparison.items.length,
    criteriaCount: comparison.criteria.length,
    winner: comparison.winner,
    averageOverallScore: Object.values(comparison.overallScores).reduce((a, b) => a + b, 0) / Object.values(comparison.overallScores).length,
    scoreRange: {
      min: Math.min(...Object.values(comparison.overallScores)),
      max: Math.max(...Object.values(comparison.overallScores))
    }
  };
  
  // Add criterion averages
  stats.criterionAverages = {};
  comparison.criteria.forEach(criterion => {
    const avg = comparison.items.reduce((sum, item) => 
      sum + comparison.scores[item.id][criterion], 0
    ) / comparison.items.length;
    stats.criterionAverages[criterion] = Math.round(avg * 100) / 100;
  });
  
  return stats;
}

export default {
  compareSearchResults,
  generateComparisonReport,
  getComparisonStats
};