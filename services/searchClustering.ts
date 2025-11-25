import { SearchResult } from './searchService';

/**
 * Cluster search results based on similarity and category
 */
export interface SearchCluster {
  id: string;
  title: string;
  results: SearchResult[];
  count: number;
  category?: string;
}

/**
 * Group search results into clusters based on similarity and metadata
 */
export function clusterSearchResults(results: SearchResult[]): SearchCluster[] {
  if (!results || results.length === 0) return [];
  
  // Group results by category first
  const categoryGroups: Record<string, SearchResult[]> = {};
  
  results.forEach(result => {
    const category = result.category || 'Other';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(result);
  });
  
  // Create clusters from category groups
  const clusters: SearchCluster[] = [];
  let clusterId = 1;
  
  Object.entries(categoryGroups).forEach(([category, groupResults]) => {
    // For large groups, create sub-clusters based on similarity
    if (groupResults.length > 5) {
      // Sort by similarity score
      const sortedResults = [...groupResults].sort((a, b) => 
        (b.similarity || 0) - (a.similarity || 0)
      );
      
      // Create primary cluster with top results
      const primaryCluster: SearchCluster = {
        id: `cluster-${clusterId++}`,
        title: `${category} - Top Results`,
        results: sortedResults.slice(0, 3),
        count: sortedResults.length,
        category
      };
      clusters.push(primaryCluster);
      
      // Create additional clusters if needed
      const remainingResults = sortedResults.slice(3);
      if (remainingResults.length > 0) {
        const additionalCluster: SearchCluster = {
          id: `cluster-${clusterId++}`,
          title: `${category} - More Tools`,
          results: remainingResults,
          count: remainingResults.length,
          category
        };
        clusters.push(additionalCluster);
      }
    } else {
      // Create single cluster for small groups
      const cluster: SearchCluster = {
        id: `cluster-${clusterId++}`,
        title: category,
        results: groupResults,
        count: groupResults.length,
        category
      };
      clusters.push(cluster);
    }
  });
  
  return clusters;
}

/**
 * Get statistics about search clusters
 */
export function getClusterStats(clusters: SearchCluster[]) {
  return {
    totalClusters: clusters.length,
    totalResults: clusters.reduce((sum, cluster) => sum + cluster.count, 0),
    averageClusterSize: clusters.length > 0 
      ? Math.round(clusters.reduce((sum, cluster) => sum + cluster.count, 0) / clusters.length * 100) / 100
      : 0,
    largestCluster: clusters.length > 0 
      ? Math.max(...clusters.map(cluster => cluster.count))
      : 0,
    categories: Array.from(new Set(clusters.map(cluster => cluster.category).filter(Boolean))) as string[]
  };
}

/**
 * Group results by rating ranges
 */
export function groupByRating(results: SearchResult[]): Record<string, SearchResult[]> {
  const groups: Record<string, SearchResult[]> = {
    '4.5+': [],
    '4.0-4.4': [],
    '3.5-3.9': [],
    '3.0-3.4': [],
    '<3.0': []
  };
  
  results.forEach(result => {
    const rating = result.rating || 0;
    if (rating >= 4.5) {
      groups['4.5+'].push(result);
    } else if (rating >= 4.0) {
      groups['4.0-4.4'].push(result);
    } else if (rating >= 3.5) {
      groups['3.5-3.9'].push(result);
    } else if (rating >= 3.0) {
      groups['3.0-3.4'].push(result);
    } else {
      groups['<3.0'].push(result);
    }
  });
  
  return groups;
}

/**
 * Group results by price range
 */
export function groupByPrice(results: SearchResult[]): Record<string, SearchResult[]> {
  const groups: Record<string, SearchResult[]> = {
    'Free': [],
    '$0-$10': [],
    '$10-$50': [],
    '$50-$100': [],
    '$100+': [],
    'Contact': []
  };
  
  results.forEach(result => {
    const pricing = result.pricing;
    if (!pricing) {
      groups['Contact'].push(result);
      return;
    }
    
    if (typeof pricing === 'string') {
      if (pricing.toLowerCase().includes('free')) {
        groups['Free'].push(result);
      } else if (pricing.toLowerCase().includes('contact')) {
        groups['Contact'].push(result);
      } else {
        // Extract price from string
        const priceMatch = pricing.match(/\$([\d.]+)/g);
        if (priceMatch) {
          const prices = priceMatch.map(p => parseFloat(p.replace('$', '')));
          const maxPrice = Math.max(...prices);
          
          if (maxPrice <= 10) {
            groups['$0-$10'].push(result);
          } else if (maxPrice <= 50) {
            groups['$10-$50'].push(result);
          } else if (maxPrice <= 100) {
            groups['$50-$100'].push(result);
          } else {
            groups['$100+'].push(result);
          }
        } else {
          groups['Contact'].push(result);
        }
      }
    } else {
      groups['Contact'].push(result);
    }
  });
  
  return groups;
}

export default {
  clusterSearchResults,
  getClusterStats,
  groupByRating,
  groupByPrice
};