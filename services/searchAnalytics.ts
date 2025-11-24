/**
 * Search analytics service for tracking and analyzing search performance
 */

// Search event types
export type SearchEventType = 
  | 'search' 
  | 'click' 
  | 'conversion' 
  | 'abandonment' 
  | 'filter' 
  | 'sort';

// Search event interface
export interface SearchEvent {
  id: string;
  type: SearchEventType;
  query: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  resultPosition?: number;
  resultId?: string;
  filters?: Record<string, any>;
  sortBy?: string;
  duration?: number; // Time spent on search results page
  referrer?: string;
}

// Search analytics data
export interface SearchAnalyticsData {
  totalSearches: number;
  totalClicks: number;
  totalConversions: number;
  clickThroughRate: number;
  conversionRate: number;
  averageSearchDuration: number;
  popularQueries: { query: string; count: number }[];
  noResultQueries: { query: string; count: number }[];
  topClickedResults: { resultId: string; title: string; count: number }[];
  filterUsage: Record<string, number>;
  sortUsage: Record<string, number>;
  searchTrends: { date: string; count: number }[];
  userEngagement: {
    searchesPerUser: number;
    clicksPerSearch: number;
    avgSessionSearches: number;
  };
}

// In-memory storage for search events
const searchEvents: SearchEvent[] = [];

// Session data
const sessionData = new Map<string, {
  searches: number;
  clicks: number;
  conversions: number;
  startTime: number;
  endTime?: number;
}>();

// Query result tracking
const queryResults = new Map<string, number>(); // query -> result count
const queryClicks = new Map<string, number>(); // query -> click count

/**
 * Track a search event
 */
export function trackSearchEvent(event: Omit<SearchEvent, 'id' | 'timestamp'>): void {
  const searchEvent: SearchEvent = {
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    ...event
  };
  
  searchEvents.push(searchEvent);
  
  // Update session data
  if (event.sessionId) {
    const session = sessionData.get(event.sessionId) || {
      searches: 0,
      clicks: 0,
      conversions: 0,
      startTime: Date.now()
    };
    
    switch (event.type) {
      case 'search':
        session.searches += 1;
        break;
      case 'click':
        session.clicks += 1;
        break;
      case 'conversion':
        session.conversions += 1;
        break;
    }
    
    sessionData.set(event.sessionId, session);
  }
  
  // Update query statistics
  if (event.type === 'search' && event.query) {
    const currentCount = queryResults.get(event.query) || 0;
    queryResults.set(event.query, currentCount + 1);
  }
  
  if (event.type === 'click' && event.query) {
    const currentClicks = queryClicks.get(event.query) || 0;
    queryClicks.set(event.query, currentClicks + 1);
  }
  
  // Track filter usage
  if (event.filters) {
    // This would be implemented to track filter usage
  }
  
  // Track sort usage
  if (event.sortBy) {
    // This would be implemented to track sort usage
  }
}

/**
 * Get search analytics data
 */
export function getSearchAnalytics(): SearchAnalyticsData {
  // Filter events to last 30 days
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recentEvents = searchEvents.filter(event => event.timestamp > thirtyDaysAgo);
  
  // Calculate basic metrics
  const searchEventsData = recentEvents.filter(e => e.type === 'search');
  const clickEvents = recentEvents.filter(e => e.type === 'click');
  const conversionEvents = recentEvents.filter(e => e.type === 'conversion');
  
  const totalSearches = searchEventsData.length;
  const totalClicks = clickEvents.length;
  const totalConversions = conversionEvents.length;
  
  const clickThroughRate = totalSearches > 0 ? (totalClicks / totalSearches) * 100 : 0;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;
  
  // Calculate average search duration
  const searchDurations = searchEventsData
    .filter(e => e.duration !== undefined)
    .map(e => e.duration as number);
  
  const averageSearchDuration = searchDurations.length > 0 
    ? searchDurations.reduce((sum, dur) => sum + dur, 0) / searchDurations.length
    : 0;
  
  // Get popular queries
  const queryCounts = new Map<string, number>();
  searchEventsData.forEach(event => {
    if (event.query) {
      const count = queryCounts.get(event.query) || 0;
      queryCounts.set(event.query, count + 1);
    }
  });
  
  const popularQueries = Array.from(queryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([query, count]) => ({ query, count }));
  
  // Get queries with no results
  const noResultQueries = Array.from(queryResults.entries())
    .filter(([query, resultCount]) => resultCount === 0)
    .map(([query, count]) => ({ query, count: count || 0 }))
    .slice(0, 20);
  
  // Get top clicked results
  const resultClicks = new Map<string, { title: string; count: number }>();
  clickEvents.forEach(event => {
    if (event.resultId) {
      const current = resultClicks.get(event.resultId) || { title: 'Unknown', count: 0 };
      current.count += 1;
      resultClicks.set(event.resultId, current);
    }
  });
  
  const topClickedResults = Array.from(resultClicks.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 20)
    .map(([resultId, data]) => ({ resultId, ...data }));
  
  // Get search trends (daily counts for last 30 days)
  const searchTrends: { date: string; count: number }[] = [];
  const dailyCounts = new Map<string, number>();
  
  searchEventsData.forEach(event => {
    const date = new Date(event.timestamp).toISOString().split('T')[0];
    const count = dailyCounts.get(date) || 0;
    dailyCounts.set(date, count + 1);
  });
  
  // Fill in missing dates
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    searchTrends.push({
      date,
      count: dailyCounts.get(date) || 0
    });
  }
  
  // Calculate user engagement metrics
  const userEngagement = {
    searchesPerUser: 0,
    clicksPerSearch: totalSearches > 0 ? totalClicks / totalSearches : 0,
    avgSessionSearches: sessionData.size > 0 
      ? Array.from(sessionData.values()).reduce((sum, session) => sum + session.searches, 0) / sessionData.size
      : 0
  };
  
  return {
    totalSearches,
    totalClicks,
    totalConversions,
    clickThroughRate,
    conversionRate,
    averageSearchDuration,
    popularQueries,
    noResultQueries,
    topClickedResults,
    filterUsage: {}, // Would be populated with actual filter usage data
    sortUsage: {}, // Would be populated with actual sort usage data
    searchTrends,
    userEngagement
  };
}

/**
 * Get search performance by query
 */
export function getQueryPerformance(query: string): {
  totalSearches: number;
  totalClicks: number;
  clickThroughRate: number;
  averagePosition: number;
  conversionRate: number;
} {
  const querySearches = searchEvents.filter(
    e => e.type === 'search' && e.query === query
  ).length;
  
  const queryClicks = searchEvents.filter(
    e => e.type === 'click' && e.query === query
  ).length;
  
  const clickThroughRate = querySearches > 0 ? (queryClicks / querySearches) * 100 : 0;
  
  // Calculate average click position
  const clickPositions = searchEvents
    .filter(e => e.type === 'click' && e.query === query && e.resultPosition !== undefined)
    .map(e => e.resultPosition as number);
  
  const averagePosition = clickPositions.length > 0
    ? clickPositions.reduce((sum, pos) => sum + pos, 0) / clickPositions.length
    : 0;
  
  // Calculate conversion rate for this query
  const queryConversions = searchEvents.filter(
    e => e.type === 'conversion' && e.query === query
  ).length;
  
  const conversionRate = queryClicks > 0 ? (queryConversions / queryClicks) * 100 : 0;
  
  return {
    totalSearches: querySearches,
    totalClicks: queryClicks,
    clickThroughRate,
    averagePosition,
    conversionRate
  };
}

/**
 * Get user search behavior
 */
export function getUserSearchBehavior(userId: string): {
  totalSearches: number;
  favoriteQueries: { query: string; count: number }[];
  preferredFilters: Record<string, number>;
  averageSearchDuration: number;
  lastSearchDate?: number;
} {
  const userEvents = searchEvents.filter(e => e.userId === userId);
  const userSearches = userEvents.filter(e => e.type === 'search');
  
  // Count queries
  const queryCounts = new Map<string, number>();
  userSearches.forEach(event => {
    if (event.query) {
      const count = queryCounts.get(event.query) || 0;
      queryCounts.set(event.query, count + 1);
    }
  });
  
  const favoriteQueries = Array.from(queryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));
  
  // Calculate average search duration
  const searchDurations = userSearches
    .filter(e => e.duration !== undefined)
    .map(e => e.duration as number);
  
  const averageSearchDuration = searchDurations.length > 0
    ? searchDurations.reduce((sum, dur) => sum + dur, 0) / searchDurations.length
    : 0;
  
  // Get last search date
  const lastSearch = userSearches
    .sort((a, b) => b.timestamp - a.timestamp)[0];
  
  return {
    totalSearches: userSearches.length,
    favoriteQueries,
    preferredFilters: {}, // Would be populated with actual filter data
    averageSearchDuration,
    lastSearchDate: lastSearch ? lastSearch.timestamp : undefined
  };
}

/**
 * Clear old events to prevent memory issues
 */
export function cleanupOldEvents(): void {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  
  // Remove old events
  const oldEventCount = searchEvents.length;
  const newEvents = searchEvents.filter(event => event.timestamp > sevenDaysAgo);
  searchEvents.length = 0;
  searchEvents.push(...newEvents);
  
  console.log(`Cleaned up ${oldEventCount - searchEvents.length} old events`);
}

/**
 * Export analytics data for reporting
 */
export function exportAnalyticsData(): string {
  const analytics = getSearchAnalytics();
  return JSON.stringify(analytics, null, 2);
}