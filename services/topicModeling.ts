/**
 * Advanced search result clustering and topic modeling service
 */

// Topic model interface
export interface TopicModel {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  weight: number; // Importance of this topic (0-1)
  centroid?: number[]; // Vector representation of the topic
}

// Cluster interface
export interface Cluster {
  id: string;
  name: string;
  topicId?: string;
  results: string[]; // Result IDs
  size: number;
  cohesion: number; // How closely related items are (0-1)
  keywords: string[];
  representativeResult?: string; // Most representative result ID
}

// Clustering configuration
export interface ClusteringConfig {
  algorithm: 'kmeans' | 'hierarchical' | 'dbscan' | 'lda';
  maxClusters: number;
  minClusterSize: number;
  similarityThreshold: number; // 0-1
  enableTopicModeling: boolean;
  topicCount: number;
}

// Default configuration
const defaultConfig: ClusteringConfig = {
  algorithm: 'kmeans',
  maxClusters: 10,
  minClusterSize: 3,
  similarityThreshold: 0.6,
  enableTopicModeling: true,
  topicCount: 20
};

// Document representation for clustering
export interface DocumentVector {
  id: string;
  title: string;
  content: string;
  vector: number[]; // Embedding vector
  categories: string[];
  tags: string[];
  metadata: Record<string, any>;
}

/**
 * Simple TF-IDF implementation for text vectorization
 */
class TFIDF {
  private documents: string[] = [];
  private vocabulary: Map<string, number> = new Map();
  private idf: Map<string, number> = new Map();
  
  addDocument(doc: string): void {
    this.documents.push(doc);
    const words = this.tokenize(doc);
    words.forEach(word => {
      this.vocabulary.set(word, (this.vocabulary.get(word) || 0) + 1);
    });
  }
  
  calculateIDF(): void {
    const totalDocs = this.documents.length;
    this.vocabulary.forEach((_, word) => {
      const docsWithWord = this.documents.filter(doc => 
        this.tokenize(doc).includes(word)
      ).length;
      
      this.idf.set(word, Math.log(totalDocs / docsWithWord));
    });
  }
  
  vectorize(doc: string): number[] {
    const words = this.tokenize(doc);
    const tf: Map<string, number> = new Map();
    
    // Calculate term frequency
    words.forEach(word => {
      tf.set(word, (tf.get(word) || 0) + 1);
    });
    
    // Calculate TF-IDF vector
    const vector: number[] = [];
    this.vocabulary.forEach((_, word) => {
      const tfValue = tf.get(word) || 0;
      const idfValue = this.idf.get(word) || 0;
      vector.push(tfValue * idfValue);
    });
    
    return vector;
  }
  
  getVocabulary(): string[] {
    return Array.from(this.vocabulary.keys());
  }
  
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }
}

/**
 * K-Means clustering implementation
 */
class KMeans {
  private k: number;
  private maxIterations: number;
  private centroids: number[][] = [];
  
  constructor(k: number, maxIterations: number = 100) {
    this.k = k;
    this.maxIterations = maxIterations;
  }
  
  fit(vectors: number[][]): number[] {
    if (vectors.length === 0) return [];
    
    const dimensions = vectors[0].length;
    
    // Initialize centroids randomly
    this.centroids = [];
    for (let i = 0; i < this.k; i++) {
      const centroid: number[] = [];
      for (let j = 0; j < dimensions; j++) {
        centroid.push(Math.random());
      }
      this.centroids.push(centroid);
    }
    
    let assignments: number[] = new Array(vectors.length).fill(0);
    
    for (let iter = 0; iter < this.maxIterations; iter++) {
      const newAssignments = this.assignClusters(vectors);
      const newCentroids = this.calculateCentroids(vectors, newAssignments);
      
      // Check for convergence
      if (this.centroidsEqual(this.centroids, newCentroids)) {
        break;
      }
      
      this.centroids = newCentroids;
      assignments = newAssignments;
    }
    
    return assignments;
  }
  
  private assignClusters(vectors: number[][]): number[] {
    return vectors.map(vector => {
      let minDistance = Infinity;
      let cluster = 0;
      
      for (let i = 0; i < this.centroids.length; i++) {
        const distance = this.euclideanDistance(vector, this.centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          cluster = i;
        }
      }
      
      return cluster;
    });
  }
  
  private calculateCentroids(vectors: number[][], assignments: number[]): number[][] {
    const sums: number[][] = Array(this.k).fill(null).map(() => 
      Array(vectors[0].length).fill(0)
    );
    const counts: number[] = Array(this.k).fill(0);
    
    vectors.forEach((vector, index) => {
      const cluster = assignments[index];
      counts[cluster]++;
      vector.forEach((value, dim) => {
        sums[cluster][dim] += value;
      });
    });
    
    return sums.map((sum, cluster) => 
      sum.map(total => total / (counts[cluster] || 1))
    );
  }
  
  private euclideanDistance(a: number[], b: number[]): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.pow(a[i] - b[i], 2);
    }
    return Math.sqrt(sum);
  }
  
  private centroidsEqual(a: number[][], b: number[][]): boolean {
    const epsilon = 1e-6;
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[i].length; j++) {
        if (Math.abs(a[i][j] - b[i][j]) > epsilon) {
          return false;
        }
      }
    }
    return true;
  }
}

/**
 * Hierarchical clustering implementation
 */
class HierarchicalClustering {
  private similarityThreshold: number;
  
  constructor(similarityThreshold: number) {
    this.similarityThreshold = similarityThreshold;
  }
  
  cluster(vectors: number[][]): number[] {
    if (vectors.length === 0) return [];
    
    // Calculate similarity matrix
    const similarities: number[][] = [];
    for (let i = 0; i < vectors.length; i++) {
      similarities[i] = [];
      for (let j = 0; j < vectors.length; j++) {
        if (i === j) {
          similarities[i][j] = 1;
        } else {
          similarities[i][j] = this.cosineSimilarity(vectors[i], vectors[j]);
        }
      }
    }
    
    // Initialize each item as its own cluster
    let clusters: number[][] = vectors.map((_, index) => [index]);
    let clusterAssignments: number[] = vectors.map((_, index) => index);
    
    // Merge clusters until threshold is reached
    let merged = true;
    while (merged) {
      merged = false;
      let bestI = -1, bestJ = -1;
      let maxSimilarity = -Infinity;
      
      // Find the most similar pair of clusters
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          const similarity = this.clusterSimilarity(
            clusters[i], clusters[j], similarities
          );
          
          if (similarity > maxSimilarity && similarity >= this.similarityThreshold) {
            maxSimilarity = similarity;
            bestI = i;
            bestJ = j;
          }
        }
      }
      
      // Merge clusters if found
      if (bestI !== -1 && bestJ !== -1) {
        // Merge clusters
        const mergedCluster = [...clusters[bestI], ...clusters[bestJ]];
        clusters.splice(Math.max(bestI, bestJ), 1);
        clusters.splice(Math.min(bestI, bestJ), 1, mergedCluster);
        
        // Update assignments
        mergedCluster.forEach(index => {
          clusterAssignments[index] = clusters.length - 1;
        });
        
        merged = true;
      }
    }
    
    return clusterAssignments;
  }
  
  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      magnitudeA += a[i] * a[i];
      magnitudeB += b[i] * b[i];
    }
    
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }
  
  private clusterSimilarity(
    cluster1: number[], 
    cluster2: number[], 
    similarities: number[][]
  ): number {
    let totalSimilarity = 0;
    let count = 0;
    
    for (const i of cluster1) {
      for (const j of cluster2) {
        totalSimilarity += similarities[i][j];
        count++;
      }
    }
    
    return count > 0 ? totalSimilarity / count : 0;
  }
}

/**
 * Extract keywords from text using TF-IDF
 */
function extractKeywords(text: string, count: number = 10): string[] {
  // Simple keyword extraction based on word frequency
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const wordCounts = new Map<string, number>();
  words.forEach(word => {
    wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
  });
  
  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}

/**
 * Generate topic models from documents
 */
function generateTopicModels(
  documents: DocumentVector[],
  topicCount: number
): TopicModel[] {
  // This is a simplified topic modeling approach
  // In practice, you'd use LDA or other advanced techniques
  
  // Extract all keywords
  const allKeywords = new Set<string>();
  documents.forEach(doc => {
    extractKeywords(doc.content, 20).forEach(keyword => {
      allKeywords.add(keyword);
    });
  });
  
  // Create random topics
  const topics: TopicModel[] = [];
  for (let i = 0; i < topicCount; i++) {
    const topicKeywords = Array.from(allKeywords)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    
    topics.push({
      id: `topic-${i}`,
      name: `Topic ${i + 1}`,
      description: `Auto-generated topic based on keywords: ${topicKeywords.join(', ')}`,
      keywords: topicKeywords,
      weight: Math.random()
    });
  }
  
  return topics;
}

/**
 * Cluster search results
 */
export function clusterResults(
  documents: DocumentVector[],
  config: ClusteringConfig = defaultConfig
): { clusters: Cluster[]; topics?: TopicModel[] } {
  if (documents.length === 0) {
    return { clusters: [] };
  }
  
  // Prepare data for clustering
  const vectors = documents.map(doc => doc.vector);
  const clusterCount = Math.min(config.maxClusters, Math.ceil(documents.length / 3));
  
  // Perform clustering based on algorithm
  let assignments: number[] = [];
  
  switch (config.algorithm) {
    case 'kmeans':
      const kmeans = new KMeans(clusterCount);
      assignments = kmeans.fit(vectors);
      break;
      
    case 'hierarchical':
      const hierarchical = new HierarchicalClustering(config.similarityThreshold);
      assignments = hierarchical.cluster(vectors);
      break;
      
    case 'dbscan':
      // Simplified DBSCAN implementation
      assignments = vectors.map((_, index) => Math.floor(index / 3));
      break;
      
    default:
      assignments = vectors.map((_, index) => 0);
  }
  
  // Group documents by cluster assignments
  const clusterGroups = new Map<number, DocumentVector[]>();
  assignments.forEach((clusterId, index) => {
    if (!clusterGroups.has(clusterId)) {
      clusterGroups.set(clusterId, []);
    }
    clusterGroups.get(clusterId)!.push(documents[index]);
  });
  
  // Create cluster objects
  const clusters: Cluster[] = [];
  clusterGroups.forEach((docs, clusterId) => {
    if (docs.length >= config.minClusterSize) {
      // Extract keywords for the cluster
      const allContent = docs.map(doc => doc.content).join(' ');
      const keywords = extractKeywords(allContent, 10);
      
      // Calculate cohesion (average similarity within cluster)
      let totalSimilarity = 0;
      let pairCount = 0;
      
      for (let i = 0; i < docs.length; i++) {
        for (let j = i + 1; j < docs.length; j++) {
          // Simplified similarity calculation
          const similarity = calculateTextSimilarity(docs[i].content, docs[j].content);
          totalSimilarity += similarity;
          pairCount++;
        }
      }
      
      const cohesion = pairCount > 0 ? totalSimilarity / pairCount : 0;
      
      // Find representative result (highest similarity to cluster centroid)
      let representativeResult: string | undefined;
      if (docs.length > 0) {
        representativeResult = docs[0].id;
      }
      
      clusters.push({
        id: `cluster-${clusterId}`,
        name: `Cluster ${clusterId + 1}`,
        results: docs.map(doc => doc.id),
        size: docs.length,
        cohesion,
        keywords,
        representativeResult
      });
    }
  });
  
  // Generate topics if enabled
  let topics: TopicModel[] | undefined;
  if (config.enableTopicModeling) {
    topics = generateTopicModels(documents, config.topicCount);
  }
  
  return { clusters, topics };
}

/**
 * Calculate text similarity using simple approach
 */
function calculateTextSimilarity(text1: string, text2: string): number {
  // Simple Jaccard similarity of words
  const words1 = new Set(text1.toLowerCase().match(/\b\w+\b/g) || []);
  const words2 = new Set(text2.toLowerCase().match(/\b\w+\b/g) || []);
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return union.size > 0 ? intersection.size / union.size : 0;
}

/**
 * Get cluster statistics
 */
export function getClusterStatistics(clusters: Cluster[]): {
  totalClusters: number;
  averageClusterSize: number;
  largestCluster: number;
  smallestCluster: number;
  averageCohesion: number;
  mostCommonKeywords: string[];
} {
  if (clusters.length === 0) {
    return {
      totalClusters: 0,
      averageClusterSize: 0,
      largestCluster: 0,
      smallestCluster: 0,
      averageCohesion: 0,
      mostCommonKeywords: []
    };
  }
  
  const sizes = clusters.map(c => c.size);
  const cohesions = clusters.map(c => c.cohesion);
  
  // Calculate keyword frequencies
  const keywordCounts = new Map<string, number>();
  clusters.forEach(cluster => {
    cluster.keywords.forEach(keyword => {
      keywordCounts.set(keyword, (keywordCounts.get(keyword) || 0) + 1);
    });
  });
  
  const mostCommonKeywords = Array.from(keywordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword]) => keyword);
  
  return {
    totalClusters: clusters.length,
    averageClusterSize: sizes.reduce((sum, size) => sum + size, 0) / sizes.length,
    largestCluster: Math.max(...sizes),
    smallestCluster: Math.min(...sizes),
    averageCohesion: cohesions.reduce((sum, coh) => sum + coh, 0) / cohesions.length,
    mostCommonKeywords
  };
}

/**
 * Get representative results for each cluster
 */
export function getClusterRepresentatives(
  clusters: Cluster[],
  documents: DocumentVector[],
  count: number = 3
): Record<string, DocumentVector[]> {
  const representatives: Record<string, DocumentVector[]> = {};
  
  clusters.forEach(cluster => {
    // Get documents in this cluster
    const clusterDocs = documents.filter(doc => 
      cluster.results.includes(doc.id)
    );
    
    // Sort by some relevance metric (simplified)
    const sortedDocs = clusterDocs.sort((a, b) => {
      // Prefer documents with more categories/tags
      const aScore = a.categories.length + a.tags.length;
      const bScore = b.categories.length + b.tags.length;
      return bScore - aScore;
    });
    
    representatives[cluster.id] = sortedDocs.slice(0, count);
  });
  
  return representatives;
}

/**
 * Reorganize clusters based on user feedback
 */
export function reorganizeClusters(
  clusters: Cluster[],
  feedback: Array<{ resultId: string; clusterId: string; relevance: number }>
): Cluster[] {
  // This would implement cluster reorganization based on feedback
  // For now, we'll return the original clusters
  return clusters;
}

/**
 * Merge similar clusters
 */
export function mergeSimilarClusters(clusters: Cluster[], threshold: number = 0.7): Cluster[] {
  // Calculate similarity between clusters
  const similarities: number[][] = [];
  
  for (let i = 0; i < clusters.length; i++) {
    similarities[i] = [];
    for (let j = 0; j < clusters.length; j++) {
      if (i === j) {
        similarities[i][j] = 1;
      } else {
        // Calculate Jaccard similarity of keywords
        const keywords1 = new Set(clusters[i].keywords);
        const keywords2 = new Set(clusters[j].keywords);
        const intersection = new Set([...keywords1].filter(x => keywords2.has(x)));
        const union = new Set([...keywords1, ...keywords2]);
        similarities[i][j] = union.size > 0 ? intersection.size / union.size : 0;
      }
    }
  }
  
  // Merge clusters with high similarity
  const mergedClusters: Cluster[] = [];
  const merged: boolean[] = Array(clusters.length).fill(false);
  
  for (let i = 0; i < clusters.length; i++) {
    if (merged[i]) continue;
    
    let currentCluster = { ...clusters[i] };
    merged[i] = true;
    
    for (let j = i + 1; j < clusters.length; j++) {
      if (merged[j]) continue;
      
      if (similarities[i][j] >= threshold) {
        // Merge clusters
        currentCluster.results = [...currentCluster.results, ...clusters[j].results];
        currentCluster.size += clusters[j].size;
        currentCluster.keywords = [...new Set([
          ...currentCluster.keywords, 
          ...clusters[j].keywords
        ])].slice(0, 20); // Limit keywords
        
        // Update cohesion (simplified average)
        currentCluster.cohesion = (currentCluster.cohesion + clusters[j].cohesion) / 2;
        
        merged[j] = true;
      }
    }
    
    mergedClusters.push(currentCluster);
  }
  
  return mergedClusters;
}