/**
 * Search performance monitoring service
 */

// Performance metrics
export interface PerformanceMetrics {
  timestamp: number;
  query: string;
  responseTime: number; // in milliseconds
  resultCount: number;
  cacheHit: boolean;
  memoryUsage: number; // in MB
  cpuUsage: number; // percentage
  networkLatency: number; // in milliseconds
  error?: string;
  userId?: string;
  sessionId: string;
}

// Aggregated performance report
export interface PerformanceReport {
  period: {
    start: number;
    end: number;
  };
  overall: {
    averageResponseTime: number;
    medianResponseTime: number;
    p95ResponseTime: number;
    p99ResponseTime: number;
    cacheHitRate: number;
    errorRate: number;
    totalQueries: number;
    averageResultCount: number;
  };
  byQuery: Array<{
    query: string;
    count: number;
    averageResponseTime: number;
    cacheHitRate: number;
    errorRate: number;
  }>;
  byTime: Array<{
    timestamp: number;
    averageResponseTime: number;
    queryCount: number;
    errorCount: number;
  }>;
  resourceUsage: {
    averageMemoryUsage: number;
    peakMemoryUsage: number;
    averageCpuUsage: number;
    peakCpuUsage: number;
    averageNetworkLatency: number;
  };
  slowQueries: Array<{
    query: string;
    responseTime: number;
    timestamp: number;
  }>;
  errorQueries: Array<{
    query: string;
    error: string;
    timestamp: number;
    count: number;
  }>;
}

// Performance alert
export interface PerformanceAlert {
  id: string;
  timestamp: number;
  type: 'slow_response' | 'high_error_rate' | 'resource_exhaustion' | 'cache_miss' | 'system_degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  metrics: Partial<PerformanceMetrics>;
  recommendation: string;
}

// In-memory storage for performance metrics
const performanceMetrics: PerformanceMetrics[] = [];

// Performance thresholds for alerts
const performanceThresholds = {
  slowResponse: 5000, // 5 seconds
  highErrorRate: 0.05, // 5%
  highMemoryUsage: 500, // 500 MB
  highCpuUsage: 80, // 80%
  lowCacheHitRate: 0.5 // 50%
};

/**
 * Record performance metrics for a search query
 */
export function recordPerformanceMetrics(metrics: Omit<PerformanceMetrics, 'timestamp'>): void {
  const performanceMetric: PerformanceMetrics = {
    timestamp: Date.now(),
    ...metrics
  };
  
  performanceMetrics.push(performanceMetric);
  
  // Check for performance alerts
  checkPerformanceAlerts(performanceMetric);
}

/**
 * Get performance report for a time period
 */
export function getPerformanceReport(
  startTime: number = Date.now() - 24 * 60 * 60 * 1000, // Last 24 hours
  endTime: number = Date.now()
): PerformanceReport {
  const relevantMetrics = performanceMetrics.filter(
    metric => metric.timestamp >= startTime && metric.timestamp <= endTime
  );
  
  if (relevantMetrics.length === 0) {
    return {
      period: { start: startTime, end: endTime },
      overall: {
        averageResponseTime: 0,
        medianResponseTime: 0,
        p95ResponseTime: 0,
        p99ResponseTime: 0,
        cacheHitRate: 0,
        errorRate: 0,
        totalQueries: 0,
        averageResultCount: 0
      },
      byQuery: [],
      byTime: [],
      resourceUsage: {
        averageMemoryUsage: 0,
        peakMemoryUsage: 0,
        averageCpuUsage: 0,
        peakCpuUsage: 0,
        averageNetworkLatency: 0
      },
      slowQueries: [],
      errorQueries: []
    };
  }
  
  // Calculate overall metrics
  const responseTimes = relevantMetrics.map(m => m.responseTime).sort((a, b) => a - b);
  const cacheHits = relevantMetrics.filter(m => m.cacheHit).length;
  const errors = relevantMetrics.filter(m => m.error).length;
  const resultCounts = relevantMetrics.map(m => m.resultCount);
  
  const overall = {
    averageResponseTime: responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length,
    medianResponseTime: responseTimes[Math.floor(responseTimes.length / 2)],
    p95ResponseTime: responseTimes[Math.floor(responseTimes.length * 0.95)],
    p99ResponseTime: responseTimes[Math.floor(responseTimes.length * 0.99)],
    cacheHitRate: cacheHits / relevantMetrics.length,
    errorRate: errors / relevantMetrics.length,
    totalQueries: relevantMetrics.length,
    averageResultCount: resultCounts.reduce((sum, count) => sum + count, 0) / resultCounts.length
  };
  
  // Group by query
  const queryMetrics = new Map<string, {
    count: number;
    totalResponseTime: number;
    cacheHits: number;
    errors: number;
  }>();
  
  relevantMetrics.forEach(metric => {
    const queryData = queryMetrics.get(metric.query) || {
      count: 0,
      totalResponseTime: 0,
      cacheHits: 0,
      errors: 0
    };
    
    queryData.count += 1;
    queryData.totalResponseTime += metric.responseTime;
    if (metric.cacheHit) queryData.cacheHits += 1;
    if (metric.error) queryData.errors += 1;
    
    queryMetrics.set(metric.query, queryData);
  });
  
  const byQuery = Array.from(queryMetrics.entries()).map(([query, data]) => ({
    query,
    count: data.count,
    averageResponseTime: data.totalResponseTime / data.count,
    cacheHitRate: data.cacheHits / data.count,
    errorRate: data.errors / data.count
  })).sort((a, b) => b.count - a.count);
  
  // Group by time (hourly buckets)
  const timeBuckets = new Map<number, {
    totalResponseTime: number;
    count: number;
    errorCount: number;
  }>();
  
  relevantMetrics.forEach(metric => {
    const hourBucket = Math.floor(metric.timestamp / (60 * 60 * 1000)) * (60 * 60 * 1000);
    const bucketData = timeBuckets.get(hourBucket) || {
      totalResponseTime: 0,
      count: 0,
      errorCount: 0
    };
    
    bucketData.totalResponseTime += metric.responseTime;
    bucketData.count += 1;
    if (metric.error) bucketData.errorCount += 1;
    
    timeBuckets.set(hourBucket, bucketData);
  });
  
  const byTime = Array.from(timeBuckets.entries()).map(([timestamp, data]) => ({
    timestamp,
    averageResponseTime: data.totalResponseTime / data.count,
    queryCount: data.count,
    errorCount: data.errorCount
  })).sort((a, b) => a.timestamp - b.timestamp);
  
  // Resource usage metrics
  const memoryUsages = relevantMetrics.map(m => m.memoryUsage);
  const cpuUsages = relevantMetrics.map(m => m.cpuUsage);
  const networkLatencies = relevantMetrics.map(m => m.networkLatency);
  
  const resourceUsage = {
    averageMemoryUsage: memoryUsages.reduce((sum, mem) => sum + mem, 0) / memoryUsages.length,
    peakMemoryUsage: Math.max(...memoryUsages),
    averageCpuUsage: cpuUsages.reduce((sum, cpu) => sum + cpu, 0) / cpuUsages.length,
    peakCpuUsage: Math.max(...cpuUsages),
    averageNetworkLatency: networkLatencies.reduce((sum, lat) => sum + lat, 0) / networkLatencies.length
  };
  
  // Slow queries (95th percentile and above)
  const slowThreshold = overall.p95ResponseTime;
  const slowQueries = relevantMetrics
    .filter(m => m.responseTime >= slowThreshold)
    .map(m => ({
      query: m.query,
      responseTime: m.responseTime,
      timestamp: m.timestamp
    }))
    .sort((a, b) => b.responseTime - a.responseTime)
    .slice(0, 20);
  
  // Error queries
  const errorCounts = new Map<string, { error: string; count: number; timestamps: number[] }>();
  relevantMetrics
    .filter(m => m.error)
    .forEach(m => {
      const key = `${m.query}::${m.error}`;
      const errorData = errorCounts.get(key) || { error: m.error || '', count: 0, timestamps: [] };
      errorData.count += 1;
      errorData.timestamps.push(m.timestamp);
      errorCounts.set(key, errorData);
    });
  
  const errorQueries = Array.from(errorCounts.entries())
    .map(([key, data]) => {
      const [query] = key.split('::');
      return {
        query,
        error: data.error,
        timestamp: Math.max(...data.timestamps),
        count: data.count
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);
  
  return {
    period: { start: startTime, end: endTime },
    overall,
    byQuery,
    byTime,
    resourceUsage,
    slowQueries,
    errorQueries
  };
}

/**
 * Check for performance alerts
 */
function checkPerformanceAlerts(metrics: PerformanceMetrics): PerformanceAlert[] {
  const alerts: PerformanceAlert[] = [];
  
  // Check for slow response
  if (metrics.responseTime > performanceThresholds.slowResponse) {
    alerts.push({
      id: `slow-${Date.now()}`,
      timestamp: metrics.timestamp,
      type: 'slow_response',
      severity: metrics.responseTime > 10000 ? 'high' : 'medium',
      message: `Slow response time: ${metrics.responseTime}ms for query "${metrics.query}"`,
      metrics: { responseTime: metrics.responseTime, query: metrics.query },
      recommendation: 'Consider optimizing the search algorithm or adding more caching'
    });
  }
  
  // Check for high memory usage
  if (metrics.memoryUsage > performanceThresholds.highMemoryUsage) {
    alerts.push({
      id: `memory-${Date.now()}`,
      timestamp: metrics.timestamp,
      type: 'resource_exhaustion',
      severity: metrics.memoryUsage > 800 ? 'critical' : 'high',
      message: `High memory usage: ${metrics.memoryUsage}MB`,
      metrics: { memoryUsage: metrics.memoryUsage },
      recommendation: 'Investigate memory leaks or consider scaling up resources'
    });
  }
  
  // Check for high CPU usage
  if (metrics.cpuUsage > performanceThresholds.highCpuUsage) {
    alerts.push({
      id: `cpu-${Date.now()}`,
      timestamp: metrics.timestamp,
      type: 'resource_exhaustion',
      severity: metrics.cpuUsage > 90 ? 'critical' : 'high',
      message: `High CPU usage: ${metrics.cpuUsage}%`,
      metrics: { cpuUsage: metrics.cpuUsage },
      recommendation: 'Optimize CPU-intensive operations or scale horizontally'
    });
  }
  
  // Check for cache miss on repeated query
  const recentMetrics = performanceMetrics.filter(
    m => m.timestamp > Date.now() - 60000 && m.query === metrics.query
  );
  
  if (recentMetrics.length > 5 && !metrics.cacheHit) {
    const cacheHitRate = recentMetrics.filter(m => m.cacheHit).length / recentMetrics.length;
    if (cacheHitRate < performanceThresholds.lowCacheHitRate) {
      alerts.push({
        id: `cache-${Date.now()}`,
        timestamp: metrics.timestamp,
        type: 'cache_miss',
        severity: 'medium',
        message: `Low cache hit rate for query "${metrics.query}": ${Math.round(cacheHitRate * 100)}%`,
        metrics: { query: metrics.query, cacheHit: metrics.cacheHit },
        recommendation: 'Consider warming up the cache for frequently accessed queries'
      });
    }
  }
  
  // Log alerts
  alerts.forEach(alert => {
    console.warn(`Performance Alert [${alert.severity.toUpperCase()}]: ${alert.message}`);
  });
  
  return alerts;
}

/**
 * Get recent performance alerts
 */
export function getRecentAlerts(count: number = 50): PerformanceAlert[] {
  return [...performanceMetrics]
    .reverse()
    .slice(0, count)
    .flatMap(metric => checkPerformanceAlerts(metric))
    .slice(0, count);
}

/**
 * Get performance trends
 */
export function getPerformanceTrends(hours: number = 24): Array<{
  hour: number;
  averageResponseTime: number;
  errorRate: number;
  cacheHitRate: number;
  queryVolume: number;
}> {
  const cutoffTime = Date.now() - (hours * 60 * 60 * 1000);
  const recentMetrics = performanceMetrics.filter(m => m.timestamp > cutoffTime);
  
  // Group by hour
  const hourlyData = new Map<number, {
    totalResponseTime: number;
    errorCount: number;
    cacheHitCount: number;
    queryCount: number;
  }>();
  
  recentMetrics.forEach(metric => {
    const hour = Math.floor(metric.timestamp / (60 * 60 * 1000));
    const hourData = hourlyData.get(hour) || {
      totalResponseTime: 0,
      errorCount: 0,
      cacheHitCount: 0,
      queryCount: 0
    };
    
    hourData.totalResponseTime += metric.responseTime;
    if (metric.error) hourData.errorCount += 1;
    if (metric.cacheHit) hourData.cacheHitCount += 1;
    hourData.queryCount += 1;
    
    hourlyData.set(hour, hourData);
  });
  
  return Array.from(hourlyData.entries())
    .map(([hour, data]) => ({
      hour,
      averageResponseTime: data.totalResponseTime / data.queryCount,
      errorRate: data.errorCount / data.queryCount,
      cacheHitRate: data.cacheHitCount / data.queryCount,
      queryVolume: data.queryCount
    }))
    .sort((a, b) => a.hour - b.hour);
}

/**
 * Clean up old performance metrics
 */
export function cleanupOldMetrics(thresholdMs: number = 7 * 24 * 60 * 60 * 1000): void {
  const cutoffTime = Date.now() - thresholdMs;
  const oldCount = performanceMetrics.length;
  
  const newMetrics = performanceMetrics.filter(metric => metric.timestamp > cutoffTime);
  performanceMetrics.length = 0;
  performanceMetrics.push(...newMetrics);
  
  console.log(`Cleaned up ${oldCount - performanceMetrics.length} old performance metrics`);
}