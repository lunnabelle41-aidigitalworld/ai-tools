/**
 * Search result clustering service
 */

import { SearchResult } from './searchService';

// Cluster search results by category
export function clusterSearchResults(results: SearchResult[]): Record<string, SearchResult[]> {
  const clusters: Record<string, SearchResult[]> = {};
  
  for (const result of results) {
    // Determine cluster key
    let clusterKey = 'Other';
    
    if (result.category) {
      clusterKey = result.category;
    } else if (result.type) {
      clusterKey = result.type.charAt(0).toUpperCase() + result.type.slice(1);
    }
    
    // Initialize cluster if it doesn't exist
    if (!clusters[clusterKey]) {
      clusters[clusterKey] = [];
    }
    
    // Add result to cluster
    clusters[clusterKey].push(result);
  }
  
  // Sort clusters by size (largest first)
  const sortedClusters: Record<string, SearchResult[]> = {};
  Object.keys(clusters)
    .sort((a, b) => clusters[b].length - clusters[a].length)
    .forEach(key => {
      sortedClusters[key] = clusters[key];
    });
  
  return sortedClusters;
}

// Get cluster statistics
export function getClusterStats(clusters: Record<string, SearchResult[]>): Array<{
  category: string;
  count: number;
  averageScore: number;
  highestRated?: SearchResult;
}> {
  const stats: Array<{
    category: string;
    count: number;
    averageScore: number;
    highestRated?: SearchResult;
  }> = [];
  
  for (const [category, results] of Object.entries(clusters)) {
    if (results.length === 0) continue;
    
    // Calculate average score
    const totalScore = results.reduce((sum, result) => sum + (result.similarity || 0), 0);
    const averageScore = totalScore / results.length;
    
    // Find highest rated result
    const highestRated = results.reduce((best, current) => 
      (current.similarity || 0) > (best.similarity || 0) ? current : best
    );
    
    stats.push({
      category,
      count: results.length,
      averageScore: Math.round(averageScore * 100) / 100,
      highestRated
    });
  }
  
  // Sort by count (descending)
  return stats.sort((a, b) => b.count - a.count);
}

// Get top results from each cluster
export function getTopResultsFromClusters(
  clusters: Record<string, SearchResult[]>,
  perCluster: number = 3
): SearchResult[] {
  const topResults: SearchResult[] = [];
  
  for (const [category, results] of Object.entries(clusters)) {
    // Sort results by similarity score
    const sortedResults = [...results].sort((a, b) => 
      (b.similarity || 0) - (a.similarity || 0)
    );
    
    // Take top results from this cluster
    topResults.push(...sortedResults.slice(0, perCluster));
  }
  
  // Sort all top results by similarity
  return topResults.sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
}

// Cluster by similarity scores (for grouping similar results)
export function clusterBySimilarity(
  results: SearchResult[],
  threshold: number = 0.8
): SearchResult[][] {
  const clusters: SearchResult[][] = [];
  const processed = new Set<number>();
  
  results.forEach((result, index) => {
    if (processed.has(index)) return;
    
    const cluster: SearchResult[] = [result];
    processed.add(index);
    
    // Find similar results
    results.forEach((otherResult, otherIndex) => {
      if (processed.has(otherIndex)) return;
      
      // Calculate similarity between results (simplified)
      const similarity = calculateResultSimilarity(result, otherResult);
      if (similarity >= threshold) {
        cluster.push(otherResult);
        processed.add(otherIndex);
      }
    });
    
    clusters.push(cluster);
  });
  
  // Sort clusters by size
  return clusters.sort((a, b) => b.length - a.length);
}

// Simple similarity calculation between two results
function calculateResultSimilarity(a: SearchResult, b: SearchResult): number {
  // This is a simplified implementation
  // In a real application, you might use more sophisticated methods
  
  let similarity = 0;
  
  // Compare categories
  if (a.category && b.category && a.category === b.category) {
    similarity += 0.3;
  }
  
  // Compare types
  if (a.type && b.type && a.type === b.type) {
    similarity += 0.2;
  }
  
  // Compare tags overlap
  if (a.tags && b.tags && Array.isArray(a.tags) && Array.isArray(b.tags)) {
    const commonTags = a.tags.filter(tag => b.tags!.includes(tag));
    similarity += Math.min(0.3, commonTags.length * 0.1);
  }
  
  // Compare titles (simplified)
  if (a.title && b.title) {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (titleA.includes(titleB) || titleB.includes(titleA)) {
      similarity += 0.2;
    }
  }
  
  return Math.min(1, similarity);
}

export default {
  clusterSearchResults,
  getClusterStats,
  getTopResultsFromClusters,
  clusterBySimilarity
};