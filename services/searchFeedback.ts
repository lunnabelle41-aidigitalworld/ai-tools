/**
 * Search feedback and learning service
 */

// Feedback types
export type FeedbackType = 
  | 'result-click'      // Clicked on a result
  | 'result-skip'       // Skipped a result
  | 'query-reformulation' // Changed the query
  | 'result-rating'     // Rated a result
  | 'search-abandonment' // Left without clicking
  | 'query-satisfaction' // Overall satisfaction with query
  | 'result-helpfulness' // Helpfulness of result
  | 'result-relevance'  // Relevance of result
  | 'result-quality'    // Quality of result
  | 'facets-usefulness' // Usefulness of filters
  | 'suggestions-helpfulness' // Helpfulness of suggestions
  | 'ui-usability'      // UI usability feedback
  | 'performance'       // Performance feedback
  | 'other';            // Other feedback

// Feedback rating scale
export type Rating = 1 | 2 | 3 | 4 | 5;

// Feedback event
export interface FeedbackEvent {
  id: string;
  userId?: string;
  sessionId: string;
  timestamp: number;
  type: FeedbackType;
  query: string;
  resultId?: string;
  position?: number;
  rating?: Rating;
  comment?: string;
  duration?: number; // Time spent on result
  context?: Record<string, any>; // Additional context
}

// Aggregated feedback metrics
export interface FeedbackMetrics {
  totalFeedbackEvents: number;
  clickThroughRate: number;
  satisfactionRate: number;
  abandonmentRate: number;
  averageRating: number;
  feedbackByType: Record<FeedbackType, number>;
  feedbackByRating: Record<Rating, number>;
  topRatedResults: Array<{ resultId: string; averageRating: number; count: number }>;
  problematicQueries: Array<{ query: string; abandonmentCount: number; lowRatingCount: number }>;
  helpfulFacets: Array<{ facet: string; usefulnessScore: number }>;
  uiFeedback: Array<{ element: string; positiveFeedback: number; negativeFeedback: number }>;
}

// Learning model update
export interface ModelUpdate {
  type: 'reweight' | 'rerank' | 'filter' | 'boost' | 'penalize';
  target: string; // What to update (e.g., "similarity_weight", "category_boost")
  value: number; // New value or adjustment
  confidence: number; // Confidence in the update (0-1)
  reason: string; // Reason for the update
}

// In-memory storage for feedback events
const feedbackEvents: FeedbackEvent[] = [];

// Session data
const sessionData = new Map<string, {
  startTime: number;
  endTime?: number;
  queryCount: number;
  resultClicks: number;
  abandoned: boolean;
}>();

/**
 * Record a feedback event
 */
export function recordFeedback(event: Omit<FeedbackEvent, 'id' | 'timestamp'>): string {
  const feedbackEvent: FeedbackEvent = {
    id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    ...event
  };
  
  feedbackEvents.push(feedbackEvent);
  
  // Update session data
  if (event.sessionId) {
    const session = sessionData.get(event.sessionId) || {
      startTime: Date.now(),
      queryCount: 0,
      resultClicks: 0,
      abandoned: false
    };
    
    switch (event.type) {
      case 'result-click':
        session.resultClicks += 1;
        session.abandoned = false;
        break;
      case 'search-abandonment':
        session.abandoned = true;
        break;
      case 'query-reformulation':
        session.queryCount += 1;
        break;
    }
    
    sessionData.set(event.sessionId, session);
  }
  
  return feedbackEvent.id;
}

/**
 * Get feedback metrics
 */
export function getFeedbackMetrics(timeRangeMs: number = 30 * 24 * 60 * 60 * 1000): FeedbackMetrics {
  const cutoffTime = Date.now() - timeRangeMs;
  const recentEvents = feedbackEvents.filter(event => event.timestamp > cutoffTime);
  
  if (recentEvents.length === 0) {
    return {
      totalFeedbackEvents: 0,
      clickThroughRate: 0,
      satisfactionRate: 0,
      abandonmentRate: 0,
      averageRating: 0,
      feedbackByType: {} as Record<FeedbackType, number>,
      feedbackByRating: {} as Record<Rating, number>,
      topRatedResults: [],
      problematicQueries: [],
      helpfulFacets: [],
      uiFeedback: []
    };
  }
  
  // Calculate basic metrics
  const clickEvents = recentEvents.filter(e => e.type === 'result-click');
  const satisfactionEvents = recentEvents.filter(e => e.type === 'query-satisfaction');
  const abandonmentEvents = recentEvents.filter(e => e.type === 'search-abandonment');
  const ratingEvents = recentEvents.filter(e => e.rating !== undefined);
  
  const clickThroughRate = recentEvents.length > 0 
    ? (clickEvents.length / recentEvents.length) * 100 
    : 0;
    
  const satisfactionRate = satisfactionEvents.length > 0
    ? (satisfactionEvents.filter(e => e.rating && e.rating >= 4).length / satisfactionEvents.length) * 100
    : 0;
    
  const abandonmentRate = recentEvents.length > 0
    ? (abandonmentEvents.length / recentEvents.length) * 100
    : 0;
    
  const averageRating = ratingEvents.length > 0
    ? ratingEvents.reduce((sum, e) => sum + (e.rating || 0), 0) / ratingEvents.length
    : 0;
  
  // Count feedback by type
  const feedbackByType = recentEvents.reduce((counts, event) => {
    counts[event.type] = (counts[event.type] || 0) + 1;
    return counts;
  }, {} as Record<FeedbackType, number>);
  
  // Count feedback by rating
  const feedbackByRating = ratingEvents.reduce((counts, event) => {
    if (event.rating) {
      counts[event.rating] = (counts[event.rating] || 0) + 1;
    }
    return counts;
  }, {} as Record<Rating, number>);
  
  // Get top-rated results
  const resultRatings = new Map<string, { sum: number; count: number }>();
  ratingEvents
    .filter(e => e.resultId)
    .forEach(e => {
      if (e.resultId) {
        const current = resultRatings.get(e.resultId) || { sum: 0, count: 0 };
        if (e.rating) {
          current.sum += e.rating;
          current.count += 1;
          resultRatings.set(e.resultId, current);
        }
      }
    });
  
  const topRatedResults = Array.from(resultRatings.entries())
    .map(([resultId, data]) => ({
      resultId,
      averageRating: data.sum / data.count,
      count: data.count
    }))
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 10);
  
  // Get problematic queries
  const queryAbandonments = new Map<string, number>();
  const queryLowRatings = new Map<string, number>();
  
  abandonmentEvents.forEach(e => {
    if (e.query) {
      queryAbandonments.set(e.query, (queryAbandonments.get(e.query) || 0) + 1);
    }
  });
  
  ratingEvents
    .filter(e => e.query && e.rating && e.rating <= 2)
    .forEach(e => {
      if (e.query) {
        queryLowRatings.set(e.query, (queryLowRatings.get(e.query) || 0) + 1);
      }
    });
  
  const problematicQueries = Array.from(queryAbandonments.entries())
    .map(([query, abandonmentCount]) => ({
      query,
      abandonmentCount,
      lowRatingCount: queryLowRatings.get(query) || 0
    }))
    .sort((a, b) => (b.abandonmentCount + b.lowRatingCount) - (a.abandonmentCount + a.lowRatingCount))
    .slice(0, 10);
  
  return {
    totalFeedbackEvents: recentEvents.length,
    clickThroughRate,
    satisfactionRate,
    abandonmentRate,
    averageRating,
    feedbackByType,
    feedbackByRating,
    topRatedResults,
    problematicQueries,
    helpfulFacets: [], // Would be populated with actual facet data
    uiFeedback: [] // Would be populated with actual UI feedback
  };
}

/**
 * Generate model updates based on feedback
 */
export function generateModelUpdates(metrics: FeedbackMetrics): ModelUpdate[] {
  const updates: ModelUpdate[] = [];
  
  // If CTR is low, boost relevance weighting
  if (metrics.clickThroughRate < 20) {
    updates.push({
      type: 'reweight',
      target: 'similarity_weight',
      value: 0.1, // Increase similarity weight
      confidence: 0.8,
      reason: `Low click-through rate (${metrics.clickThroughRate.toFixed(1)}%) suggests relevance needs improvement`
    });
  }
  
  // If satisfaction is low, adjust ranking factors
  if (metrics.satisfactionRate < 70) {
    updates.push({
      type: 'reweight',
      target: 'rating_weight',
      value: 0.05, // Increase rating weight
      confidence: 0.7,
      reason: `Low satisfaction rate (${metrics.satisfactionRate.toFixed(1)}%) suggests user ratings should be weighted more heavily`
    });
  }
  
  // If abandonment rate is high, improve result quality
  if (metrics.abandonmentRate > 40) {
    updates.push({
      type: 'reweight',
      target: 'quality_weight',
      value: 0.1, // Increase quality weight
      confidence: 0.85,
      reason: `High abandonment rate (${metrics.abandonmentRate.toFixed(1)}%) suggests need to improve result quality`
    });
  }
  
  // Boost top-rated results
  metrics.topRatedResults.forEach(result => {
    if (result.averageRating >= 4.5 && result.count >= 5) {
      updates.push({
        type: 'boost',
        target: result.resultId,
        value: 1.2, // 20% boost
        confidence: Math.min(1, result.count / 20), // Confidence based on sample size
        reason: `High-rated result (${result.averageRating.toFixed(1)} from ${result.count} ratings)`
      });
    }
  });
  
  // Penalize problematic queries
  metrics.problematicQueries.forEach(queryData => {
    if (queryData.abandonmentCount + queryData.lowRatingCount >= 10) {
      updates.push({
        type: 'penalize',
        target: queryData.query,
        value: 0.8, // 20% penalty
        confidence: Math.min(1, (queryData.abandonmentCount + queryData.lowRatingCount) / 50),
        reason: `Problematic query with ${queryData.abandonmentCount} abandonments and ${queryData.lowRatingCount} low ratings`
      });
    }
  });
  
  return updates;
}

/**
 * Apply model updates
 */
export function applyModelUpdates(updates: ModelUpdate[]): void {
  // In a real implementation, this would update the search model
  // For now, we'll just log the updates
  console.log('Applying model updates:', updates);
  
  updates.forEach(update => {
    switch (update.type) {
      case 'reweight':
        console.log(`Reweighting ${update.target} by ${update.value}`);
        break;
      case 'rerank':
        console.log(`Reranking based on ${update.target}`);
        break;
      case 'filter':
        console.log(`Applying filter: ${update.target}`);
        break;
      case 'boost':
        console.log(`Boosting ${update.target} by ${update.value}`);
        break;
      case 'penalize':
        console.log(`Penalizing ${update.target} by ${update.value}`);
        break;
    }
  });
}

/**
 * Get personalized recommendations based on user feedback
 */
export function getPersonalizedRecommendations(userId: string): string[] {
  // Filter feedback events for this user
  const userEvents = feedbackEvents.filter(e => e.userId === userId);
  
  if (userEvents.length === 0) {
    return []; // No personalization possible
  }
  
  // Find categories and types the user has engaged with positively
  const positiveInteractions = userEvents.filter(e => 
    (e.type === 'result-click' && e.duration && e.duration > 30) || 
    (e.rating && e.rating >= 4)
  );
  
  // Extract preferred categories and types
  const categoryCounts = new Map<string, number>();
  const typeCounts = new Map<string, number>();
  
  positiveInteractions.forEach(e => {
    if (e.context?.category) {
      categoryCounts.set(e.context.category, (categoryCounts.get(e.context.category) || 0) + 1);
    }
    if (e.context?.type) {
      typeCounts.set(e.context.type, (typeCounts.get(e.context.type) || 0) + 1);
    }
  });
  
  // Generate recommendation queries based on preferences
  const recommendations: string[] = [];
  
  // Top categories
  Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .forEach(([category]) => {
      recommendations.push(`${category} tools`, `best ${category}`);
    });
  
  // Top types
  Array.from(typeCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .forEach(([type]) => {
      recommendations.push(`${type}`, `top ${type}`);
    });
  
  return Array.from(new Set(recommendations)).slice(0, 5);
}

/**
 * Clean up old feedback events to prevent memory issues
 */
export function cleanupOldFeedback(thresholdMs: number = 7 * 24 * 60 * 60 * 1000): void {
  const cutoffTime = Date.now() - thresholdMs;
  const oldCount = feedbackEvents.length;
  
  // Remove old events
  const newEvents = feedbackEvents.filter(event => event.timestamp > cutoffTime);
  feedbackEvents.length = 0;
  feedbackEvents.push(...newEvents);
  
  // Remove old session data
  for (const [sessionId, session] of sessionData.entries()) {
    if ((session.endTime || session.startTime) < cutoffTime) {
      sessionData.delete(sessionId);
    }
  }
  
  console.log(`Cleaned up ${oldCount - feedbackEvents.length} old feedback events`);
}