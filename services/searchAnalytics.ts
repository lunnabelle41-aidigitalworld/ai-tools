/**
 * Search Analytics Service
 * Provides insights and metrics for search performance and user behavior
 */

// Define types
export interface SearchQueryLog {
  id: string;
  query: string;
  timestamp: Date;
  resultsCount: number;
  responseTime: number;
  filtersApplied: Record<string, any>;
  sortBy: string;
  userId?: string;
}

export interface SearchAnalyticsData {
  totalSearches: number;
  averageResponseTime: number;
  mostPopularQueries: { query: string; count: number }[];
  mostEffectiveQueries: { query: string; avgResults: number }[];
  filterUsage: Record<string, number>;
  sortUsage: Record<string, number>;
  userEngagement: {
    totalUsers: number;
    searchesPerUser: number;
    retentionRate: number;
  };
}

// In-memory storage for search logs
let searchLogs: SearchQueryLog[] = [];

// Log a search query
export function logSearchQuery(log: SearchQueryLog): void {
  searchLogs.push(log);
  
  // Keep only the last 10000 logs to prevent memory issues
  if (searchLogs.length > 10000) {
    searchLogs = searchLogs.slice(-10000);
  }
}

// Get search analytics data
export function getSearchAnalytics(): SearchAnalyticsData {
  if (searchLogs.length === 0) {
    return {
      totalSearches: 0,
      averageResponseTime: 0,
      mostPopularQueries: [],
      mostEffectiveQueries: [],
      filterUsage: {},
      sortUsage: {},
      userEngagement: {
        totalUsers: 0,
        searchesPerUser: 0,
        retentionRate: 0
      }
    };
  }
  
  // Calculate total searches
  const totalSearches = searchLogs.length;
  
  // Calculate average response time
  const totalResponseTime = searchLogs.reduce((sum, log) => sum + log.responseTime, 0);
  const averageResponseTime = totalResponseTime / totalSearches;
  
  // Calculate most popular queries
  const queryCounts: Record<string, number> = {};
  searchLogs.forEach(log => {
    queryCounts[log.query] = (queryCounts[log.query] || 0) + 1;
  });
  
  const mostPopularQueries = Object.entries(queryCounts)
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Calculate most effective queries (by average results count)
  const queryResults: Record<string, { total: number; count: number }> = {};
  searchLogs.forEach(log => {
    if (!queryResults[log.query]) {
      queryResults[log.query] = { total: 0, count: 0 };
    }
    queryResults[log.query].total += log.resultsCount;
    queryResults[log.query].count += 1;
  });
  
  const mostEffectiveQueries = Object.entries(queryResults)
    .map(([query, data]) => ({ 
      query, 
      avgResults: data.total / data.count 
    }))
    .sort((a, b) => b.avgResults - a.avgResults)
    .slice(0, 10);
  
  // Calculate filter usage
  const filterUsage: Record<string, number> = {};
  searchLogs.forEach(log => {
    Object.keys(log.filtersApplied).forEach(filter => {
      filterUsage[filter] = (filterUsage[filter] || 0) + 1;
    });
  });
  
  // Calculate sort usage
  const sortUsage: Record<string, number> = {};
  searchLogs.forEach(log => {
    sortUsage[log.sortBy] = (sortUsage[log.sortBy] || 0) + 1;
  });
  
  // Calculate user engagement metrics
  const uniqueUsers = new Set(searchLogs.map(log => log.userId).filter(Boolean));
  const totalUsers = uniqueUsers.size;
  
  const searchesPerUser = totalUsers > 0 
    ? searchLogs.filter(log => log.userId).length / totalUsers 
    : 0;
  
  // Simple retention calculation (users who searched more than once)
  const userSearchCounts: Record<string, number> = {};
  searchLogs.forEach(log => {
    if (log.userId) {
      userSearchCounts[log.userId] = (userSearchCounts[log.userId] || 0) + 1;
    }
  });
  
  const retainedUsers = Object.values(userSearchCounts).filter(count => count > 1).length;
  const retentionRate = totalUsers > 0 ? (retainedUsers / totalUsers) * 100 : 0;
  
  return {
    totalSearches,
    averageResponseTime,
    mostPopularQueries,
    mostEffectiveQueries,
    filterUsage,
    sortUsage,
    userEngagement: {
      totalUsers,
      searchesPerUser,
      retentionRate
    }
  };
}

// Get search trends over time
export function getSearchTrends(hours: number = 24): { 
  timestamps: string[]; 
  searchCounts: number[]; 
} {
  const now = new Date();
  const startTime = new Date(now.getTime() - hours * 60 * 60 * 1000);
  
  // Group searches by hour
  const hourlyCounts: Record<string, number> = {};
  
  searchLogs
    .filter(log => log.timestamp >= startTime)
    .forEach(log => {
      const hourKey = new Date(log.timestamp).toISOString().substring(0, 13) + ':00:00';
      hourlyCounts[hourKey] = (hourlyCounts[hourKey] || 0) + 1;
    });
  
  // Create time series data
  const timestamps: string[] = [];
  const searchCounts: number[] = [];
  
  for (let i = 0; i < hours; i++) {
    const hourTime = new Date(startTime.getTime() + i * 60 * 60 * 1000);
    const hourKey = hourTime.toISOString().substring(0, 13) + ':00:00';
    
    timestamps.push(hourKey);
    searchCounts.push(hourlyCounts[hourKey] || 0);
  }
  
  return { timestamps, searchCounts };
}

// Get performance metrics
export function getPerformanceMetrics(): {
  avgResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  fastestQuery: { query: string; time: number };
  slowestQuery: { query: string; time: number };
} {
  if (searchLogs.length === 0) {
    return {
      avgResponseTime: 0,
      p95ResponseTime: 0,
      p99ResponseTime: 0,
      fastestQuery: { query: '', time: 0 },
      slowestQuery: { query: '', time: 0 }
    };
  }
  
  // Sort by response time
  const sortedLogs = [...searchLogs].sort((a, b) => a.responseTime - b.responseTime);
  
  // Calculate average
  const totalResponseTime = sortedLogs.reduce((sum, log) => sum + log.responseTime, 0);
  const avgResponseTime = totalResponseTime / sortedLogs.length;
  
  // Calculate percentiles
  const p95Index = Math.floor(sortedLogs.length * 0.95);
  const p99Index = Math.floor(sortedLogs.length * 0.99);
  
  const p95ResponseTime = sortedLogs[p95Index]?.responseTime || 0;
  const p99ResponseTime = sortedLogs[p99Index]?.responseTime || 0;
  
  // Find fastest and slowest queries
  const fastestQuery = { 
    query: sortedLogs[0].query, 
    time: sortedLogs[0].responseTime 
  };
  
  const slowestQuery = { 
    query: sortedLogs[sortedLogs.length - 1].query, 
    time: sortedLogs[sortedLogs.length - 1].responseTime 
  };
  
  return {
    avgResponseTime,
    p95ResponseTime,
    p99ResponseTime,
    fastestQuery,
    slowestQuery
  };
}

// Clear search logs (for testing purposes)
export function clearSearchLogs(): void {
  searchLogs = [];
}

export default {
  logSearchQuery,
  getSearchAnalytics,
  getSearchTrends,
  getPerformanceMetrics,
  clearSearchLogs
};