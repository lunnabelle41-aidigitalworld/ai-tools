/**
 * Advanced caching and optimization service
 */

// Cache entry interface
export interface CacheEntry<T = any> {
  key: string;
  value: T;
  timestamp: number;
  expiry: number; // Expiry timestamp
  accessCount: number;
  lastAccessed: number;
  size: number; // Approximate size in bytes
  tags: string[]; // Tags for grouping and invalidation
  priority: 'low' | 'normal' | 'high'; // Eviction priority
  dependencies?: string[]; // Keys this entry depends on
}

// Cache statistics
export interface CacheStats {
  totalEntries: number;
  totalSize: number;
  hitCount: number;
  missCount: number;
  evictionCount: number;
  averageAccessTime: number;
  hitRate: number;
  memoryUsage: number;
  byPriority: {
    low: number;
    normal: number;
    high: number;
  };
  byTag: Record<string, number>;
}

// Cache configuration
export interface CacheConfig {
  maxSize: number; // Maximum size in bytes
  defaultTTL: number; // Default time-to-live in milliseconds
  evictionStrategy: 'lru' | 'lfu' | 'fifo' | 'ttl'; // Eviction strategy
  compression: boolean; // Enable compression
  persistence: boolean; // Enable persistence to disk
  partitioning: boolean; // Enable partitioning
}

// Default configuration
const defaultConfig: CacheConfig = {
  maxSize: 100 * 1024 * 1024, // 100MB
  defaultTTL: 5 * 60 * 1000, // 5 minutes
  evictionStrategy: 'lru',
  compression: true,
  persistence: false,
  partitioning: true
};

// Advanced cache implementation
export class AdvancedCache<T = any> {
  private cache = new Map<string, CacheEntry<T>>();
  private stats: CacheStats = {
    totalEntries: 0,
    totalSize: 0,
    hitCount: 0,
    missCount: 0,
    evictionCount: 0,
    averageAccessTime: 0,
    hitRate: 0,
    memoryUsage: 0,
    byPriority: { low: 0, normal: 0, high: 0 },
    byTag: {}
  };
  private config: CacheConfig;
  private accessTimes: number[] = [];
  
  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }
  
  /**
   * Set a value in the cache
   */
  set(
    key: string, 
    value: T, 
    options: {
      ttl?: number;
      tags?: string[];
      priority?: 'low' | 'normal' | 'high';
      dependencies?: string[];
    } = {}
  ): void {
    const ttl = options.ttl || this.config.defaultTTL;
    const expiry = Date.now() + ttl;
    const size = this.estimateSize(value);
    const tags = options.tags || [];
    const priority = options.priority || 'normal';
    const dependencies = options.dependencies || [];
    
    // Check if we need to evict entries to make space
    if (this.stats.totalSize + size > this.config.maxSize) {
      this.evictEntries(size);
    }
    
    // Create cache entry
    const entry: CacheEntry<T> = {
      key,
      value,
      timestamp: Date.now(),
      expiry,
      accessCount: 0,
      lastAccessed: Date.now(),
      size,
      tags,
      priority,
      dependencies
    };
    
    // Add to cache
    this.cache.set(key, entry);
    
    // Update stats
    this.stats.totalEntries = this.cache.size;
    this.stats.totalSize += size;
    this.updatePriorityStats(priority, 1);
    this.updateTagStats(tags, 1);
  }
  
  /**
   * Get a value from the cache
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    // Check if entry exists and hasn't expired
    if (!entry) {
      this.stats.missCount++;
      this.updateHitRate();
      return null;
    }
    
    if (entry.expiry < Date.now()) {
      // Entry expired, remove it
      this.remove(key);
      this.stats.missCount++;
      this.updateHitRate();
      return null;
    }
    
    // Update access stats
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    this.stats.hitCount++;
    this.updateHitRate();
    
    // Record access time for performance monitoring
    const accessTime = Date.now() - entry.timestamp;
    this.accessTimes.push(accessTime);
    if (this.accessTimes.length > 1000) {
      this.accessTimes.shift();
    }
    this.stats.averageAccessTime = this.accessTimes.reduce((sum, time) => sum + time, 0) / this.accessTimes.length;
    
    return entry.value;
  }
  
  /**
   * Remove a value from the cache
   */
  remove(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    this.cache.delete(key);
    this.stats.totalEntries = this.cache.size;
    this.stats.totalSize -= entry.size;
    this.updatePriorityStats(entry.priority, -1);
    this.updateTagStats(entry.tags, -1);
    
    // Remove dependent entries
    if (entry.dependencies) {
      entry.dependencies.forEach(depKey => {
        this.remove(depKey);
      });
    }
    
    return true;
  }
  
  /**
   * Clear cache entries by tag
   */
  clearByTag(tag: string): number {
    let removedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.tags.includes(tag)) {
        this.remove(key);
        removedCount++;
      }
    }
    
    return removedCount;
  }
  
  /**
   * Clear cache entries by priority
   */
  clearByPriority(priority: 'low' | 'normal' | 'high'): number {
    let removedCount = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.priority === priority) {
        this.remove(key);
        removedCount++;
      }
    }
    
    return removedCount;
  }
  
  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }
  
  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    this.stats.totalEntries = 0;
    this.stats.totalSize = 0;
    this.stats.byPriority = { low: 0, normal: 0, high: 0 };
    this.stats.byTag = {};
  }
  
  /**
   * Estimate the size of a value in bytes
   */
  private estimateSize(value: any): number {
    if (value === null || value === undefined) return 0;
    
    switch (typeof value) {
      case 'boolean':
        return 4;
      case 'number':
        return 8;
      case 'string':
        return value.length * 2; // UTF-16
      case 'object':
        if (Array.isArray(value)) {
          return value.reduce((size, item) => size + this.estimateSize(item), 0);
        } else {
          return Object.keys(value).reduce((size, key) => {
            return size + (key.length * 2) + this.estimateSize(value[key]);
          }, 0);
        }
      default:
        return 0;
    }
  }
  
  /**
   * Evict entries to make space
   */
  private evictEntries(requiredSpace: number): void {
    const entries = Array.from(this.cache.values());
    
    // Sort entries based on eviction strategy
    switch (this.config.evictionStrategy) {
      case 'lru': // Least Recently Used
        entries.sort((a, b) => a.lastAccessed - b.lastAccessed);
        break;
      case 'lfu': // Least Frequently Used
        entries.sort((a, b) => a.accessCount - b.accessCount);
        break;
      case 'fifo': // First In, First Out
        entries.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'ttl': // Closest to expiry
        entries.sort((a, b) => a.expiry - b.expiry);
        break;
    }
    
    // Evict entries until we have enough space
    let freedSpace = 0;
    for (const entry of entries) {
      if (freedSpace >= requiredSpace) break;
      
      this.remove(entry.key);
      freedSpace += entry.size;
      this.stats.evictionCount++;
    }
  }
  
  /**
   * Update priority statistics
   */
  private updatePriorityStats(priority: 'low' | 'normal' | 'high', delta: number): void {
    switch (priority) {
      case 'low':
        this.stats.byPriority.low += delta;
        break;
      case 'normal':
        this.stats.byPriority.normal += delta;
        break;
      case 'high':
        this.stats.byPriority.high += delta;
        break;
    }
  }
  
  /**
   * Update tag statistics
   */
  private updateTagStats(tags: string[], delta: number): void {
    tags.forEach(tag => {
      this.stats.byTag[tag] = (this.stats.byTag[tag] || 0) + delta;
    });
  }
  
  /**
   * Update hit rate
   */
  private updateHitRate(): void {
    const total = this.stats.hitCount + this.stats.missCount;
    this.stats.hitRate = total > 0 ? this.stats.hitCount / total : 0;
  }
}

// Global cache instance
export const globalCache = new AdvancedCache();

// Cache partitioning
export class CachePartition<T = any> {
  private partitions = new Map<string, AdvancedCache<T>>();
  
  constructor(private partitionCount: number = 16) {}
  
  /**
   * Get partition for a key
   */
  private getPartition(key: string): AdvancedCache<T> {
    const hash = this.hashKey(key);
    const partitionIndex = hash % this.partitionCount;
    const partitionKey = `partition-${partitionIndex}`;
    
    if (!this.partitions.has(partitionKey)) {
      this.partitions.set(partitionKey, new AdvancedCache());
    }
    
    return this.partitions.get(partitionKey)!;
  }
  
  /**
   * Simple hash function
   */
  private hashKey(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
  
  /**
   * Set value in appropriate partition
   */
  set(
    key: string, 
    value: T, 
    options: {
      ttl?: number;
      tags?: string[];
      priority?: 'low' | 'normal' | 'high';
      dependencies?: string[];
    } = {}
  ): void {
    const partition = this.getPartition(key);
    partition.set(key, value, options);
  }
  
  /**
   * Get value from appropriate partition
   */
  get(key: string): T | null {
    const partition = this.getPartition(key);
    return partition.get(key);
  }
  
  /**
   * Remove value from appropriate partition
   */
  remove(key: string): boolean {
    const partition = this.getPartition(key);
    return partition.remove(key);
  }
  
  /**
   * Get statistics for all partitions
   */
  getStats(): CacheStats {
    const combinedStats: CacheStats = {
      totalEntries: 0,
      totalSize: 0,
      hitCount: 0,
      missCount: 0,
      evictionCount: 0,
      averageAccessTime: 0,
      hitRate: 0,
      memoryUsage: 0,
      byPriority: { low: 0, normal: 0, high: 0 },
      byTag: {}
    };
    
    for (const partition of this.partitions.values()) {
      const stats = partition.getStats();
      combinedStats.totalEntries += stats.totalEntries;
      combinedStats.totalSize += stats.totalSize;
      combinedStats.hitCount += stats.hitCount;
      combinedStats.missCount += stats.missCount;
      combinedStats.evictionCount += stats.evictionCount;
      combinedStats.averageAccessTime += stats.averageAccessTime;
      combinedStats.hitRate += stats.hitRate;
      combinedStats.memoryUsage += stats.memoryUsage;
      
      combinedStats.byPriority.low += stats.byPriority.low;
      combinedStats.byPriority.normal += stats.byPriority.normal;
      combinedStats.byPriority.high += stats.byPriority.high;
      
      for (const [tag, count] of Object.entries(stats.byTag)) {
        combinedStats.byTag[tag] = (combinedStats.byTag[tag] || 0) + count;
      }
    }
    
    // Average the averaged values
    if (this.partitions.size > 0) {
      combinedStats.averageAccessTime /= this.partitions.size;
      combinedStats.hitRate /= this.partitions.size;
    }
    
    return combinedStats;
  }
}

// Compression utilities
export const compression = {
  /**
   * Compress data using simple run-length encoding
   */
  compress<T>(data: T): string {
    try {
      const jsonString = JSON.stringify(data);
      // Simple compression - in practice, you'd use a library like lz-string
      return btoa(encodeURIComponent(jsonString));
    } catch (error) {
      console.error('Compression error:', error);
      return JSON.stringify(data);
    }
  },
  
  /**
   * Decompress data
   */
  decompress<T>(compressed: string): T {
    try {
      const jsonString = decodeURIComponent(atob(compressed));
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decompression error:', error);
      return JSON.parse(compressed);
    }
  }
};

// Cache warming strategies
export const cacheWarming = {
  /**
   * Warm cache with popular queries
   */
  async warmWithPopularQueries(
    cache: AdvancedCache, 
    getSearchResults: (query: string) => Promise<any>,
    popularQueries: string[]
  ): Promise<void> {
    for (const query of popularQueries) {
      try {
        const results = await getSearchResults(query);
        cache.set(`search:${query}`, results, {
          ttl: 10 * 60 * 1000, // 10 minutes
          tags: ['search', 'popular'],
          priority: 'high'
        });
      } catch (error) {
        console.error(`Failed to warm cache for query "${query}":`, error);
      }
    }
  },
  
  /**
   * Warm cache with trending queries
   */
  async warmWithTrendingQueries(
    cache: AdvancedCache,
    getSearchResults: (query: string) => Promise<any>,
    trendingQueries: string[]
  ): Promise<void> {
    for (const query of trendingQueries) {
      try {
        const results = await getSearchResults(query);
        cache.set(`search:${query}`, results, {
          ttl: 5 * 60 * 1000, // 5 minutes
          tags: ['search', 'trending'],
          priority: 'normal'
        });
      } catch (error) {
        console.error(`Failed to warm cache for trending query "${query}":`, error);
      }
    }
  }
};