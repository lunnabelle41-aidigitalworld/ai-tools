/**
 * Semantic similarity and embedding service for search results
 */

// Vector type
export type Vector = number[];

// Similarity metrics
export type SimilarityMetric = 
  | 'cosine'      // Cosine similarity
  | 'euclidean'   // Euclidean distance
  | 'manhattan'   // Manhattan distance
  | 'jaccard'     // Jaccard similarity
  | 'pearson'     // Pearson correlation
  | 'dot-product' // Dot product
  | 'levenshtein' // Levenshtein distance
  | 'bm25';       // BM25 similarity

// Embedding model types
export type EmbeddingModel = 
  | 'bert-base'          // BERT base model
  | 'bert-large'         // BERT large model
  | 'sentence-transformers' // Sentence transformers
  | 'universal-sentence-encoder' // Universal Sentence Encoder
  | 'glove'              // GloVe embeddings
  | 'word2vec'           // Word2Vec embeddings
  | 'fasttext'           // FastText embeddings
  | 'custom';            // Custom embedding model

// Embedding configuration
export interface EmbeddingConfig {
  model: EmbeddingModel;
  dimensions: number;
  poolingStrategy: 'mean' | 'max' | 'cls';
  normalize: boolean;
  enableCaching: boolean;
  cacheExpiryHours: number;
  batchSize: number;
  maxSequenceLength: number;
  enableFineTuning: boolean;
}

// Default configuration
const defaultConfig: EmbeddingConfig = {
  model: 'sentence-transformers',
  dimensions: 768,
  poolingStrategy: 'mean',
  normalize: true,
  enableCaching: true,
  cacheExpiryHours: 24,
  batchSize: 32,
  maxSequenceLength: 512,
  enableFineTuning: false
};

// Embedding result
export interface EmbeddingResult {
  id: string;
  text: string;
  vector: Vector;
  model: EmbeddingModel;
  dimensions: number;
  processingTime: number; // in milliseconds
  confidence: number; // 0-1
}

// Similarity result
export interface SimilarityResult {
  sourceId: string;
  targetId: string;
  similarity: number; // 0-1 for similarity, distance for distance metrics
  metric: SimilarityMetric;
  confidence: number; // 0-1
}

// Semantic search result
export interface SemanticSearchResult {
  id: string;
  text: string;
  similarity: number; // 0-1
  rank: number;
  metadata?: Record<string, any>;
}

// Embedding cache entry
interface EmbeddingCacheEntry {
  result: EmbeddingResult;
  timestamp: number;
}

// Semantic similarity service class
export class SemanticSimilarityService {
  private config: EmbeddingConfig;
  private embeddingCache: Map<string, EmbeddingCacheEntry>;
  private model: EmbeddingModel;
  
  constructor(config: Partial<EmbeddingConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.embeddingCache = new Map();
    this.model = this.config.model;
  }

  /**
   * Generate embedding for text
   */
  async generateEmbedding(text: string, id?: string): Promise<EmbeddingResult> {
    // Check cache first
    if (this.config.enableCaching && id) {
      const cached = this.embeddingCache.get(id);
      if (cached && Date.now() - cached.timestamp < this.config.cacheExpiryHours * 3600000) {
        return cached.result;
      }
    }
    
    const startTime = Date.now();
    
    // Preprocess text
    const processedText = this.preprocessText(text);
    
    // Generate embedding vector (simulated)
    const vector = this.simulateEmbeddingGeneration(processedText);
    
    // Normalize if required
    const normalizedVector = this.config.normalize ? 
      this.normalizeVector(vector) : vector;
    
    const result: EmbeddingResult = {
      id: id || this.generateId(text),
      text: processedText,
      vector: normalizedVector,
      model: this.config.model,
      dimensions: this.config.dimensions,
      processingTime: Date.now() - startTime,
      confidence: Math.random() * 0.2 + 0.8 // Random confidence between 0.8-1.0
    };
    
    // Cache the result
    if (this.config.enableCaching && id) {
      this.embeddingCache.set(id, {
        result,
        timestamp: Date.now()
      });
    }
    
    return result;
  }

  /**
   * Preprocess text for embedding generation
   */
  private preprocessText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ')     // Normalize whitespace
      .trim();
  }

  /**
   * Simulate embedding generation (in a real implementation, this would use an ML model)
   */
  private simulateEmbeddingGeneration(text: string): Vector {
    // This is a simplified simulation - in reality, you'd use a pre-trained model
    const words = text.split(' ');
    const vector: Vector = [];
    
    // Generate a deterministic vector based on text content
    for (let i = 0; i < this.config.dimensions; i++) {
      // Simple hash-based approach for deterministic results
      const hash = this.simpleHash(text + i);
      vector.push((hash % 1000) / 1000); // Normalize to 0-1 range
    }
    
    return vector;
  }

  /**
   * Simple hash function for deterministic vector generation
   */
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Generate ID for text
   */
  private generateId(text: string): string {
    return `emb_${this.simpleHash(text)}`;
  }

  /**
   * Normalize vector
   */
  private normalizeVector(vector: Vector): Vector {
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (magnitude === 0) return vector;
    return vector.map(val => val / magnitude);
  }

  /**
   * Calculate similarity between two vectors
   */
  calculateSimilarity(
    vector1: Vector, 
    vector2: Vector, 
    metric: SimilarityMetric = 'cosine'
  ): number {
    switch (metric) {
      case 'cosine':
        return this.cosineSimilarity(vector1, vector2);
      case 'euclidean':
        return this.euclideanDistance(vector1, vector2);
      case 'manhattan':
        return this.manhattanDistance(vector1, vector2);
      case 'jaccard':
        return this.jaccardSimilarity(vector1, vector2);
      case 'pearson':
        return this.pearsonCorrelation(vector1, vector2);
      case 'dot-product':
        return this.dotProduct(vector1, vector2);
      case 'levenshtein':
        // Not applicable for vectors, but included for completeness
        return 0;
      case 'bm25':
        // Not applicable for vectors, but included for completeness
        return 0;
      default:
        return this.cosineSimilarity(vector1, vector2);
    }
  }

  /**
   * Cosine similarity
   */
  private cosineSimilarity(vector1: Vector, vector2: Vector): number {
    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));
    
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    return dotProduct / (magnitude1 * magnitude2);
  }

  /**
   * Euclidean distance
   */
  private euclideanDistance(vector1: Vector, vector2: Vector): number {
    const sum = vector1.reduce((sum, val, i) => sum + Math.pow(val - vector2[i], 2), 0);
    return Math.sqrt(sum);
  }

  /**
   * Manhattan distance
   */
  private manhattanDistance(vector1: Vector, vector2: Vector): number {
    return vector1.reduce((sum, val, i) => sum + Math.abs(val - vector2[i]), 0);
  }

  /**
   * Jaccard similarity (simplified for vectors)
   */
  private jaccardSimilarity(vector1: Vector, vector2: Vector): number {
    const intersection = vector1.filter((val, i) => val > 0 && vector2[i] > 0).length;
    const union = vector1.filter((val, i) => val > 0 || vector2[i] > 0).length;
    return union === 0 ? 0 : intersection / union;
  }

  /**
   * Pearson correlation
   */
  private pearsonCorrelation(vector1: Vector, vector2: Vector): number {
    const mean1 = vector1.reduce((sum, val) => sum + val, 0) / vector1.length;
    const mean2 = vector2.reduce((sum, val) => sum + val, 0) / vector2.length;
    
    const numerator = vector1.reduce((sum, val, i) => 
      sum + (val - mean1) * (vector2[i] - mean2), 0);
    
    const denominator1 = Math.sqrt(vector1.reduce((sum, val) => 
      sum + Math.pow(val - mean1, 2), 0));
    const denominator2 = Math.sqrt(vector2.reduce((sum, val) => 
      sum + Math.pow(val - mean2, 2), 0));
    
    if (denominator1 === 0 || denominator2 === 0) return 0;
    return numerator / (denominator1 * denominator2);
  }

  /**
   * Dot product
   */
  private dotProduct(vector1: Vector, vector2: Vector): number {
    return vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
  }

  /**
   * Generate embeddings for batch of texts
   */
  async generateEmbeddingsBatch(
    texts: string[], 
    ids?: string[]
  ): Promise<EmbeddingResult[]> {
    const results: EmbeddingResult[] = [];
    
    // Process in batches
    for (let i = 0; i < texts.length; i += this.config.batchSize) {
      const batch = texts.slice(i, i + this.config.batchSize);
      const batchIds = ids ? ids.slice(i, i + this.config.batchSize) : 
        batch.map((_, idx) => this.generateId(batch[idx]));
      
      // Generate embeddings for batch
      for (let j = 0; j < batch.length; j++) {
        const result = await this.generateEmbedding(batch[j], batchIds[j]);
        results.push(result);
      }
    }
    
    return results;
  }

  /**
   * Find similar texts using semantic similarity
   */
  async findSimilar(
    queryText: string,
    candidateTexts: string[],
    topK: number = 10,
    metric: SimilarityMetric = 'cosine'
  ): Promise<SemanticSearchResult[]> {
    // Generate embedding for query
    const queryEmbedding = await this.generateEmbedding(queryText);
    
    // Generate embeddings for candidates
    const candidateEmbeddings = await this.generateEmbeddingsBatch(candidateTexts);
    
    // Calculate similarities
    const similarities: SimilarityResult[] = candidateEmbeddings.map(embedding => ({
      sourceId: queryEmbedding.id,
      targetId: embedding.id,
      similarity: this.calculateSimilarity(queryEmbedding.vector, embedding.vector, metric),
      metric,
      confidence: (queryEmbedding.confidence + embedding.confidence) / 2
    }));
    
    // Sort by similarity and take top K
    similarities.sort((a, b) => b.similarity - a.similarity);
    
    // Convert to semantic search results
    const results: SemanticSearchResult[] = similarities.slice(0, topK).map((sim, index) => ({
      id: sim.targetId,
      text: candidateTexts.find((_, idx) => 
        this.generateId(candidateTexts[idx]) === sim.targetId) || '',
      similarity: sim.similarity,
      rank: index + 1,
      metadata: {
        confidence: sim.confidence,
        metric: sim.metric
      }
    }));
    
    return results;
  }

  /**
   * Perform semantic search across documents
   */
  async semanticSearch(
    query: string,
    documents: Array<{ id: string; text: string; metadata?: Record<string, any> }>,
    topK: number = 10
  ): Promise<SemanticSearchResult[]> {
    // Generate embedding for query
    const queryEmbedding = await this.generateEmbedding(query);
    
    // Generate embeddings for documents
    const documentEmbeddings = await this.generateEmbeddingsBatch(
      documents.map(doc => doc.text),
      documents.map(doc => doc.id)
    );
    
    // Calculate similarities
    const similarities: Array<{
      documentId: string;
      similarity: number;
      confidence: number;
      metadata?: Record<string, any>;
    }> = documentEmbeddings.map(embedding => {
      const document = documents.find(doc => doc.id === embedding.id);
      return {
        documentId: embedding.id,
        similarity: this.calculateSimilarity(queryEmbedding.vector, embedding.vector),
        confidence: (queryEmbedding.confidence + embedding.confidence) / 2,
        metadata: document?.metadata
      };
    });
    
    // Sort by similarity and take top K
    similarities.sort((a, b) => b.similarity - a.similarity);
    
    // Convert to semantic search results
    const results: SemanticSearchResult[] = similarities.slice(0, topK).map((sim, index) => ({
      id: sim.documentId,
      text: documents.find(doc => doc.id === sim.documentId)?.text || '',
      similarity: sim.similarity,
      rank: index + 1,
      metadata: sim.metadata
    }));
    
    return results;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<EmbeddingConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Clear embedding cache
   */
  clearCache(): void {
    this.embeddingCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    maxSize: number;
    hitRate: number;
  } {
    // In a real implementation, you'd track actual hits/misses
    return {
      size: this.embeddingCache.size,
      maxSize: 50000, // Example max size
      hitRate: 0.75 // Example hit rate
    };
  }

  /**
   * Get model information
   */
  getModelInfo(): {
    model: EmbeddingModel;
    dimensions: number;
    maxSequenceLength: number;
    supportedMetrics: SimilarityMetric[];
  } {
    return {
      model: this.config.model,
      dimensions: this.config.dimensions,
      maxSequenceLength: this.config.maxSequenceLength,
      supportedMetrics: [
        'cosine', 'euclidean', 'manhattan', 'jaccard', 
        'pearson', 'dot-product'
      ]
    };
  }
}

// Export singleton instance
export const semanticSimilarityService = new SemanticSimilarityService();

// Export types for external use
// Types are already exported individually above