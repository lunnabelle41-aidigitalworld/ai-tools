import { SearchResult } from './searchService';

export interface SearchCluster {
  id: string;
  title: string;
  description: string;
  results: SearchResult[];
  count: number;
  category?: string;
  similarityRange: { min: number; max: number };
  dominantFeatures: string[];
  averageRating: number;
}

/**
 * Advanced clustering algorithm that groups search results based on multiple factors
 */
export function advancedClusterSearchResults(results: SearchResult[], maxClusters: number = 8): SearchCluster[] {
  if (!results || results.length === 0) return [];
  
  // Group results by primary category first
  const categoryGroups: Record<string, SearchResult[]> = {};
  
  results.forEach(result => {
    const category = result.category || 'Other';
    if (!categoryGroups[category]) {
      categoryGroups[category] = [];
    }
    categoryGroups[category].push(result);
  });
  
  // Create clusters from each category group
  let clusters: SearchCluster[] = [];
  let clusterId = 1;
  
  Object.entries(categoryGroups).forEach(([category, groupResults]) => {
    // For large groups, create sub-clusters based on similarity and features
    if (groupResults.length > 10) {
      // Sort by similarity score
      const sortedResults = [...groupResults].sort((a, b) => 
        (b.similarity || 0) - (a.similarity || 0)
      );
      
      // Extract dominant features for this category
      const allFeatures = sortedResults.flatMap(r => r.features || []);
      const featureCounts: Record<string, number> = {};
      allFeatures.forEach(f => {
        featureCounts[f] = (featureCounts[f] || 0) + 1;
      });
      
      const dominantFeatures = Object.entries(featureCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([feature]) => feature);
      
      // Create high-quality cluster
      const topResults = sortedResults.slice(0, Math.min(5, Math.ceil(sortedResults.length * 0.3)));
      const highQualityCluster: SearchCluster = {
        id: `cluster-${clusterId++}`,
        title: `${category} - Top Rated`,
        description: `Highest rated ${category} tools with strong performance`,
        results: topResults,
        count: topResults.length,
        category,
        similarityRange: {
          min: Math.min(...topResults.map(r => r.similarity || 0)),
          max: Math.max(...topResults.map(r => r.similarity || 0))
        },
        dominantFeatures: dominantFeatures.slice(0, 3),
        averageRating: topResults.reduce((sum, r) => sum + (r.rating || 0), 0) / topResults.length
      };
      clusters.push(highQualityCluster);
      
      // Create feature-based clusters
      dominantFeatures.forEach((feature, index) => {
        if (clusterId > maxClusters) return;
        
        const featureResults = sortedResults.filter(r => 
          r.features?.some(f => f.toLowerCase().includes(feature.toLowerCase()))
        ).slice(0, 10);
        
        if (featureResults.length > 2) {
          const featureCluster: SearchCluster = {
            id: `cluster-${clusterId++}`,
            title: `${category} - ${feature}`,
            description: `${category} tools with ${feature} capabilities`,
            results: featureResults,
            count: featureResults.length,
            category,
            similarityRange: {
              min: Math.min(...featureResults.map(r => r.similarity || 0)),
              max: Math.max(...featureResults.map(r => r.similarity || 0))
            },
            dominantFeatures: [feature],
            averageRating: featureResults.reduce((sum, r) => sum + (r.rating || 0), 0) / featureResults.length
          };
          clusters.push(featureCluster);
        }
      });
      
      // Create recent updates cluster if applicable
      if (clusterId <= maxClusters) {
        const recentResults = sortedResults
          .filter(r => r.lastUpdated)
          .sort((a, b) => {
            const dateA = new Date(a.lastUpdated || 0).getTime();
            const dateB = new Date(b.lastUpdated || 0).getTime();
            return dateB - dateA;
          })
          .slice(0, 8);
          
        if (recentResults.length > 2) {
          const recentCluster: SearchCluster = {
            id: `cluster-${clusterId++}`,
            title: `${category} - Recently Updated`,
            description: `Latest updates in ${category} tools`,
            results: recentResults,
            count: recentResults.length,
            category,
            similarityRange: {
              min: Math.min(...recentResults.map(r => r.similarity || 0)),
              max: Math.max(...recentResults.map(r => r.similarity || 0))
            },
            dominantFeatures: dominantFeatures.slice(0, 2),
            averageRating: recentResults.reduce((sum, r) => sum + (r.rating || 0), 0) / recentResults.length
          };
          clusters.push(recentCluster);
        }
      }
    } else {
      // Create single cluster for small groups
      const avgRating = groupResults.reduce((sum, r) => sum + (r.rating || 0), 0) / groupResults.length;
      
      // Extract dominant features
      const allFeatures = groupResults.flatMap(r => r.features || []);
      const featureCounts: Record<string, number> = {};
      allFeatures.forEach(f => {
        featureCounts[f] = (featureCounts[f] || 0) + 1;
      });
      
      const dominantFeatures = Object.entries(featureCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([feature]) => feature);
      
      const cluster: SearchCluster = {
        id: `cluster-${clusterId++}`,
        title: category,
        description: `All ${category} tools`,
        results: groupResults,
        count: groupResults.length,
        category,
        similarityRange: {
          min: Math.min(...groupResults.map(r => r.similarity || 0)),
          max: Math.max(...groupResults.map(r => r.similarity || 0))
        },
        dominantFeatures,
        averageRating: avgRating
      };
      clusters.push(cluster);
    }
  });
  
  // Limit to maxClusters and sort by quality (avg rating + result count)
  return clusters
    .sort((a, b) => {
      const qualityA = (a.averageRating || 0) * 0.7 + (a.count || 0) * 0.3;
      const qualityB = (b.averageRating || 0) * 0.7 + (b.count || 0) * 0.3;
      return qualityB - qualityA;
    })
    .slice(0, maxClusters);
}

/**
 * Get detailed statistics about search clusters
 */
export function getAdvancedClusterStats(clusters: SearchCluster[]) {
  return {
    totalClusters: clusters.length,
    totalResults: clusters.reduce((sum, cluster) => sum + cluster.count, 0),
    averageClusterSize: clusters.length > 0 
      ? Math.round(clusters.reduce((sum, cluster) => sum + cluster.count, 0) / clusters.length * 100) / 100
      : 0,
    largestCluster: clusters.length > 0 
      ? Math.max(...clusters.map(cluster => cluster.count))
      : 0,
    categories: Array.from(new Set(clusters.map(cluster => cluster.category).filter(Boolean))) as string[],
    averageRating: clusters.length > 0
      ? clusters.reduce((sum, cluster) => sum + cluster.averageRating, 0) / clusters.length
      : 0,
    dominantFeatures: clusters.flatMap(c => c.dominantFeatures)
  };
}