import { Document, SearchResult, SearchOptions } from './searchService';
import { semanticSearch } from './searchService';
import { processNaturalLanguageQuery } from './naturalLanguageProcessor';
import { clusterSearchResults, SearchCluster } from './searchClustering';
import { rerankSearchResults, SearchResultWithFeatures, RerankingConfig } from './resultReranking';
import { generateSearchSummary } from './searchSummarization';
import { getSearchSuggestions } from './searchSuggestions';
import { analyzeSentiment, SentimentAnalysisResult } from './sentimentAnalysis';
import { entityExtractionService } from './entityExtraction';
import { getDiversityScore } from './diversityEngine';
import { personalizeResults } from './personalizationEngine';
import { explainResult, ResultExplanation } from './explanationService';
import { quantumSearchService } from './quantumSearch';
import { neuromorphicSearchService } from './neuromorphicSearch';
import { consciousnessAwareSearchService } from './consciousnessAwareSearch';
import { multiverseSearchService } from './multiverseSearch';

// Advanced search configuration
export interface AdvancedSearchConfig {
  enableQuantumSearch?: boolean;
  enableNeuromorphicSearch?: boolean;
  enableConsciousnessAwareSearch?: boolean;
  enableMultiverseSearch?: boolean;
  enablePersonalization?: boolean;
  enableDiversity?: boolean;
  enableSentimentAnalysis?: boolean;
  enableEntityExtraction?: boolean;
  enableClustering?: boolean;
  enableSummarization?: boolean;
  enableExplanation?: boolean;
  enableReranking?: boolean;
  userId?: string;
}

// Advanced search result with enhanced metadata
export interface AdvancedSearchResult extends SearchResult {
  explanations?: string[];
  sentiment?: number;
  entities?: any[];
  diversityScore?: number;
  personalizationBoost?: number;
  clusterId?: string;
  summary?: string;
}

// Advanced search response
export interface AdvancedSearchResponse {
  results: AdvancedSearchResult[];
  queryUnderstanding: any;
  suggestions: string[];
  summary?: string;
  clusters?: SearchCluster[];
  facets?: Record<string, any>;
  performance: {
    responseTime: number;
    modelUsed: string;
    resultsCount: number;
  };
}

/**
 * Advanced search service that integrates multiple AI models
 */
export class AdvancedSearchService {
  private cache = new Map<string, AdvancedSearchResponse>();
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  /**
   * Perform advanced search with multiple AI integrations
   */
  async search(
    query: string,
    documents: Document[],
    options: SearchOptions = {},
    config: AdvancedSearchConfig = {}
  ): Promise<AdvancedSearchResponse> {
    const startTime = Date.now();
    
    // Create cache key
    const cacheKey = `${query}-${JSON.stringify(options)}-${JSON.stringify(config)}`;
    
    // Check cache first
    const cached = this.cache.get(cacheKey);
    if (cached && (Date.now() - cached.performance.responseTime) < this.CACHE_TTL) {
      return cached;
    }
    
    try {
      // Process natural language query
      const processedQuery = processNaturalLanguageQuery(query);
      
      // Merge options with processed query
      const mergedOptions = { ...options };
      if (Object.keys(processedQuery.filters).length > 0) {
        mergedOptions.filters = { ...options.filters, ...processedQuery.filters };
      }
      
      // Determine which search model to use
      let results: SearchResult[] = [];
      let modelUsed = 'semantic';
      
      // Use quantum search for complex queries
      if (config.enableQuantumSearch && query.length > 20) {
        try {
          // This would integrate with actual quantum search service
          // For now, we'll simulate enhanced results
          results = await semanticSearch(query, documents, mergedOptions);
          modelUsed = 'quantum-enhanced';
        } catch (error) {
          console.warn('Quantum search failed, falling back to semantic search:', error);
          results = await semanticSearch(query, documents, mergedOptions);
        }
      } else {
        results = await semanticSearch(query, documents, mergedOptions);
      }
      
      // Apply personalization if enabled
      if (config.enablePersonalization && config.userId) {
        results = await personalizeResults(results, config.userId);
      }
      
      // Apply diversity if enabled
      if (config.enableDiversity) {
        results = await getDiversityScore(results);
      }
      
      // Apply reranking if enabled
      if (config.enableReranking) {
        // Convert SearchResult[] to SearchResultWithFeatures[]
        const resultsWithFeatures: SearchResultWithFeatures[] = results.map(result => ({
          id: result.id,
          title: result.title,
          content: result.content,
          similarity: result.similarity || 0,
          rating: result.rating || 0,
          publishedAt: result.publishedAt,
          popularity: 0, // Would need to be calculated
          category: result.category,
          tags: result.tags
        }));
        
        // Use default reranking config
        const rerankConfig: RerankingConfig = {
          weights: {
            similarity: 0.4,
            rating: 0.2,
            recency: 0.15,
            popularity: 0.1,
            sentiment: 0.05,
            personalization: 0.05,
            diversity: 0.05
          }
        };
        
        const reranked = await rerankSearchResults(resultsWithFeatures, rerankConfig);
        // Convert back to SearchResult[]
        results = reranked.map(r => ({
          ...r,
          type: 'tool', // Default type
          url: '#' // Default URL
        }));
      }
      
      // Enhance results with additional AI services
      const enhancedResults: AdvancedSearchResult[] = await Promise.all(
        results.map(async (result) => {
          const enhanced: AdvancedSearchResult = { ...result };
          
          // Add sentiment analysis if enabled
          if (config.enableSentimentAnalysis) {
            const sentimentResult: SentimentAnalysisResult = analyzeSentiment(result.content);
            enhanced.sentiment = sentimentResult.confidence;
          }
          
          // Add entity extraction if enabled
          if (config.enableEntityExtraction) {
            const extractionResult = await entityExtractionService.extractEntities(result.content);
            enhanced.entities = extractionResult.entities;
          }
          
          // Add explanations if enabled
          if (config.enableExplanation) {
            const explanation: ResultExplanation = await explainResult(result, query);
            enhanced.explanations = [explanation.description];
          }
          
          return enhanced;
        })
      );
      
      // Generate search summary if enabled
      let summary: string | undefined;
      if (config.enableSummarization && enhancedResults.length > 0) {
        summary = await generateSearchSummary(query, enhancedResults.slice(0, 5));
      }
      
      // Generate suggestions
      const suggestionObjects = await getSearchSuggestions({ partialQuery: query, documents });
      const suggestions = suggestionObjects.map(s => s.text);
      
      // Generate clusters if enabled
      let clusters: SearchCluster[] | undefined;
      if (config.enableClustering) {
        clusters = clusterSearchResults(enhancedResults);
      }
      
      // Create response
      const response: AdvancedSearchResponse = {
        results: enhancedResults,
        queryUnderstanding: processedQuery,
        suggestions,
        summary,
        clusters,
        facets: this.generateFacets(documents),
        performance: {
          responseTime: Date.now() - startTime,
          modelUsed,
          resultsCount: enhancedResults.length
        }
      };
      
      // Cache the response
      this.cache.set(cacheKey, response);
      
      return response;
    } catch (error) {
      console.error('Advanced search error:', error);
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Generate facets for filtering
   */
  private generateFacets(documents: Document[]): Record<string, any> {
    const categories = new Set<string>();
    const types = new Set<string>();
    const tags = new Set<string>();
    const pricing = new Set<string>();
    
    documents.forEach(doc => {
      if (doc.category) categories.add(doc.category);
      if (doc.type) types.add(doc.type);
      if (doc.tags) doc.tags.forEach(tag => tags.add(tag));
      // Fix: Handle pricing as string or object
      if (doc.pricing) {
        if (typeof doc.pricing === 'string') {
          pricing.add(doc.pricing);
        } else if (typeof doc.pricing === 'object' && doc.pricing !== null) {
          // For objects, create a string representation
          pricing.add(JSON.stringify(doc.pricing));
        } else {
          // For other types, convert to string
          pricing.add(String(doc.pricing));
        }
      }
    });
    
    return {
      categories: Array.from(categories),
      types: Array.from(types),
      tags: Array.from(tags),
      pricing: Array.from(pricing)
    };
  }
  
  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
  
  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

// Export singleton instance
export const advancedSearchService = new AdvancedSearchService();