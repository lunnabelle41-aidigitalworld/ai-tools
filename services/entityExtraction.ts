/**
 * Entity extraction and linking service for search results
 */

// Entity types
export type EntityType = 
  | 'person'          // People
  | 'organization'    // Companies, institutions
  | 'location'        // Places, countries, cities
  | 'product'         // Products, services
  | 'event'           // Events, conferences
  | 'date'            // Dates, time periods
  | 'quantity'        // Numbers, measurements
  | 'email'           // Email addresses
  | 'url'             // Web URLs
  | 'phone'           // Phone numbers
  | 'currency'        // Monetary amounts
  | 'percent'         // Percentages
  | 'technology'      // Technologies, programming languages
  | 'concept'         // Abstract concepts
  | 'topic'           // Topics, subjects
  | 'keyword'         // Keywords, terms
  | 'citation'        // References, citations
  | 'image'           // Images
  | 'video'           // Videos
  | 'audio'           // Audio files
  | 'document'        // Documents, files
  | 'code'            // Code snippets
  | 'social_media'    // Social media handles, hashtags
  | 'custom';         // Custom entity types

// Entity interface
export interface Entity {
  id: string;
  type: EntityType;
  text: string;
  normalizedText: string;
  startIndex: number;
  endIndex: number;
  confidence: number; // 0-1
  attributes?: Record<string, any>; // Additional attributes based on entity type
  linkedEntity?: LinkedEntity; // Linked knowledge base entity
  context?: string; // Context where entity was found
}

// Linked entity from knowledge base
export interface LinkedEntity {
  id: string;
  name: string;
  description: string;
  url: string;
  type: EntityType;
  aliases: string[];
  properties: Record<string, any>;
  relations: Array<{
    type: string;
    target: LinkedEntity;
    strength: number; // 0-1
  }>;
}

// Entity extraction result
export interface EntityExtractionResult {
  entities: Entity[];
  text: string;
  language: string;
  processingTime: number; // in milliseconds
  confidence: number; // Overall confidence 0-1
}

// Entity linking result
export interface EntityLinkingResult {
  originalEntity: Entity;
  linkedEntities: LinkedEntity[];
  bestMatch?: LinkedEntity;
  confidence: number; // 0-1
}

// Entity extraction configuration
export interface EntityExtractionConfig {
  enabledEntityTypes: EntityType[];
  enableEntityLinking: boolean;
  enableDisambiguation: boolean;
  minConfidenceThreshold: number; // 0-1
  enableContextualAnalysis: boolean;
  enableCustomEntities: boolean;
  customEntityPatterns?: Record<string, RegExp>;
  enableRelationshipExtraction: boolean;
  maxEntitiesPerDocument: number;
}

// Default configuration
const defaultConfig: EntityExtractionConfig = {
  enabledEntityTypes: [
    'person', 'organization', 'location', 'product', 'event', 
    'date', 'quantity', 'email', 'url', 'phone', 'currency', 
    'percent', 'technology', 'concept', 'topic', 'keyword'
  ],
  enableEntityLinking: true,
  enableDisambiguation: true,
  minConfidenceThreshold: 0.7,
  enableContextualAnalysis: true,
  enableCustomEntities: false,
  enableRelationshipExtraction: true,
  maxEntitiesPerDocument: 100
};

// Entity extraction service class
export class EntityExtractionService {
  private config: EntityExtractionConfig;
  private knowledgeBase: Map<string, LinkedEntity>;
  private customPatterns: Map<string, RegExp>;

  constructor(config: Partial<EntityExtractionConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    this.knowledgeBase = new Map();
    this.customPatterns = new Map();
    
    // Initialize with some sample knowledge base entries
    this.initializeKnowledgeBase();
    
    // Set custom patterns if provided
    if (this.config.customEntityPatterns) {
      Object.entries(this.config.customEntityPatterns).forEach(([name, pattern]) => {
        this.customPatterns.set(name, pattern);
      });
    }
  }

  /**
   * Initialize sample knowledge base
   */
  private initializeKnowledgeBase(): void {
    // Sample entities for demonstration
    const sampleEntities: LinkedEntity[] = [
      {
        id: 'person_elon_musk',
        name: 'Elon Musk',
        description: 'Entrepreneur and business magnate',
        url: 'https://en.wikipedia.org/wiki/Elon_Musk',
        type: 'person',
        aliases: ['Elon Reeve Musk'],
        properties: {
          birthDate: '1971-06-28',
          nationality: 'South African-American',
          companies: ['Tesla', 'SpaceX', 'Twitter']
        },
        relations: []
      },
      {
        id: 'org_tesla',
        name: 'Tesla, Inc.',
        description: 'Electric vehicle and clean energy company',
        url: 'https://en.wikipedia.org/wiki/Tesla,_Inc.',
        type: 'organization',
        aliases: ['Tesla Motors'],
        properties: {
          founded: '2003',
          headquarters: 'Austin, Texas',
          industry: 'Automotive'
        },
        relations: []
      },
      {
        id: 'tech_artificial_intelligence',
        name: 'Artificial Intelligence',
        description: 'Simulation of human intelligence in machines',
        url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
        type: 'technology',
        aliases: ['AI', 'Machine Intelligence'],
        properties: {
          category: 'Computer Science',
          applications: ['Natural Language Processing', 'Computer Vision', 'Robotics']
        },
        relations: []
      }
    ];

    sampleEntities.forEach(entity => {
      this.knowledgeBase.set(entity.id, entity);
      entity.aliases.forEach(alias => {
        this.knowledgeBase.set(`alias_${alias.toLowerCase()}`, entity);
      });
    });
  }

  /**
   * Extract entities from text
   */
  async extractEntities(text: string, language: string = 'en'): Promise<EntityExtractionResult> {
    const startTime = Date.now();
    
    // Preprocess text
    const processedText = this.preprocessText(text);
    
    // Extract entities using various methods
    const entities: Entity[] = [];
    
    // Extract using regex patterns
    entities.push(...this.extractWithRegex(processedText));
    
    // Extract using rule-based methods
    entities.push(...this.extractWithRules(processedText));
    
    // Extract custom entities if enabled
    if (this.config.enableCustomEntities) {
      entities.push(...this.extractCustomEntities(processedText));
    }
    
    // Filter by confidence threshold
    const filteredEntities = entities.filter(
      entity => entity.confidence >= this.config.minConfidenceThreshold
    );
    
    // Sort by confidence
    filteredEntities.sort((a, b) => b.confidence - a.confidence);
    
    // Limit to max entities
    const finalEntities = filteredEntities.slice(0, this.config.maxEntitiesPerDocument);
    
    // Calculate overall confidence
    const avgConfidence = finalEntities.reduce((sum, entity) => sum + entity.confidence, 0) / 
                          (finalEntities.length || 1);
    
    return {
      entities: finalEntities,
      text: processedText,
      language,
      processingTime: Date.now() - startTime,
      confidence: avgConfidence
    };
  }

  /**
   * Preprocess text for entity extraction
   */
  private preprocessText(text: string): string {
    // Convert to lowercase for consistent matching
    return text.toLowerCase()
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      // Remove extra punctuation that might interfere
      .replace(/[^\w\s@.,\-:$%]/g, ' ')
      .trim();
  }

  /**
   * Extract entities using regex patterns
   */
  private extractWithRegex(text: string): Entity[] {
    const entities: Entity[] = [];
    
    // Email pattern
    if (this.config.enabledEntityTypes.includes('email')) {
      const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
      let match;
      while ((match = emailPattern.exec(text)) !== null) {
        entities.push({
          id: `email_${match.index}`,
          type: 'email',
          text: match[0],
          normalizedText: match[0].toLowerCase(),
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.95,
          attributes: {
            domain: match[0].split('@')[1]
          }
        });
      }
    }
    
    // URL pattern
    if (this.config.enabledEntityTypes.includes('url')) {
      const urlPattern = /\b(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(\.[a-z]{2,}){1,}\b/gi;
      let match;
      while ((match = urlPattern.exec(text)) !== null) {
        entities.push({
          id: `url_${match.index}`,
          type: 'url',
          text: match[0],
          normalizedText: match[0].toLowerCase(),
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.9,
          attributes: {
            protocol: match[0].startsWith('https') ? 'https' : 
                     match[0].startsWith('http') ? 'http' : 'unknown'
          }
        });
      }
    }
    
    // Phone number pattern (simplified)
    if (this.config.enabledEntityTypes.includes('phone')) {
      const phonePattern = /\b(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}\b/g;
      let match;
      while ((match = phonePattern.exec(text)) !== null) {
        entities.push({
          id: `phone_${match.index}`,
          type: 'phone',
          text: match[0],
          normalizedText: match[0].replace(/\D/g, ''), // Just digits
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.85
        });
      }
    }
    
    // Date pattern (simplified)
    if (this.config.enabledEntityTypes.includes('date')) {
      const datePatterns = [
        /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}\b/g, // MM/DD/YYYY or MM-DD-YYYY
        /\b\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}\b/g,   // YYYY/MM/DD or YYYY-MM-DD
        /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]* \d{1,2},? \d{2,4}\b/gi // Month DD, YYYY
      ];
      
      datePatterns.forEach(pattern => {
        let match;
        while ((match = pattern.exec(text)) !== null) {
          entities.push({
            id: `date_${match.index}`,
            type: 'date',
            text: match[0],
            normalizedText: match[0].toLowerCase(),
            startIndex: match.index,
            endIndex: match.index + match[0].length,
            confidence: 0.8
          });
        }
      });
    }
    
    return entities;
  }

  /**
   * Extract entities using rule-based methods
   */
  private extractWithRules(text: string): Entity[] {
    const entities: Entity[] = [];
    
    // Extract person names (simplified heuristic)
    if (this.config.enabledEntityTypes.includes('person')) {
      // Very basic pattern for capitalized words that might be names
      const namePattern = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g;
      let match;
      while ((match = namePattern.exec(text)) !== null) {
        // Additional checks to reduce false positives
        const name = match[0];
        if (!['The', 'And', 'For', 'Are', 'Was', 'Has'].includes(name.split(' ')[0])) {
          entities.push({
            id: `person_${match.index}`,
            type: 'person',
            text: name,
            normalizedText: name,
            startIndex: match.index,
            endIndex: match.index + name.length,
            confidence: 0.7,
            context: this.getContext(text, match.index, name.length)
          });
        }
      }
    }
    
    // Extract organizations (simplified)
    if (this.config.enabledEntityTypes.includes('organization')) {
      const orgIndicators = ['Inc', 'Corp', 'LLC', 'Ltd', 'Company', 'Corporation'];
      const orgPattern = new RegExp(
        `\\b[A-Z][a-zA-Z]+(?: [A-Z][a-zA-Z]+)* (?:(?:${orgIndicators.join('|')})\\.?)\\b`, 'g'
      );
      
      let match;
      while ((match = orgPattern.exec(text)) !== null) {
        entities.push({
          id: `org_${match.index}`,
          type: 'organization',
          text: match[0],
          normalizedText: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.75,
          context: this.getContext(text, match.index, match[0].length)
        });
      }
    }
    
    // Extract locations (simplified)
    if (this.config.enabledEntityTypes.includes('location')) {
      // Very basic approach - would use a proper geolocation database in practice
      const majorCities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney', 'Berlin'];
      const countries = ['USA', 'UK', 'France', 'Japan', 'Australia', 'Germany'];
      
      [...majorCities, ...countries].forEach(location => {
        const index = text.indexOf(location);
        if (index !== -1) {
          entities.push({
            id: `location_${index}`,
            type: 'location',
            text: location,
            normalizedText: location,
            startIndex: index,
            endIndex: index + location.length,
            confidence: 0.8,
            context: this.getContext(text, index, location.length)
          });
        }
      });
    }
    
    // Extract technologies (simplified)
    if (this.config.enabledEntityTypes.includes('technology')) {
      const technologies = [
        'Artificial Intelligence', 'Machine Learning', 'Blockchain', 'Cloud Computing',
        'Internet of Things', 'Big Data', 'Cybersecurity', 'DevOps', 'Microservices',
        'React', 'Angular', 'Vue', 'Node.js', 'Python', 'Java', 'JavaScript'
      ];
      
      technologies.forEach(tech => {
        const index = text.indexOf(tech);
        if (index !== -1) {
          entities.push({
            id: `tech_${index}`,
            type: 'technology',
            text: tech,
            normalizedText: tech,
            startIndex: index,
            endIndex: index + tech.length,
            confidence: 0.85,
            context: this.getContext(text, index, tech.length)
          });
        }
      });
    }
    
    return entities;
  }

  /**
   * Extract custom entities using provided patterns
   */
  private extractCustomEntities(text: string): Entity[] {
    const entities: Entity[] = [];
    
    this.customPatterns.forEach((pattern, name) => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          id: `custom_${name}_${match.index}`,
          type: 'custom',
          text: match[0],
          normalizedText: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          confidence: 0.9,
          attributes: {
            patternName: name
          }
        });
      }
    });
    
    return entities;
  }

  /**
   * Get context around entity
   */
  private getContext(text: string, index: number, length: number, contextLength: number = 50): string {
    const start = Math.max(0, index - contextLength);
    const end = Math.min(text.length, index + length + contextLength);
    return text.substring(start, end);
  }

  /**
   * Link entities to knowledge base
   */
  async linkEntities(entities: Entity[]): Promise<EntityLinkingResult[]> {
    const linkingResults: EntityLinkingResult[] = [];
    
    if (!this.config.enableEntityLinking) {
      return entities.map(entity => ({
        originalEntity: entity,
        linkedEntities: [],
        confidence: 0
      }));
    }
    
    for (const entity of entities) {
      const linkedEntities: LinkedEntity[] = [];
      
      // Try to find exact matches in knowledge base
      const exactMatch = this.knowledgeBase.get(entity.normalizedText.toLowerCase());
      if (exactMatch) {
        linkedEntities.push(exactMatch);
      }
      
      // Try to find alias matches
      const aliasMatch = this.knowledgeBase.get(`alias_${entity.normalizedText.toLowerCase()}`);
      if (aliasMatch && !linkedEntities.includes(aliasMatch)) {
        linkedEntities.push(aliasMatch);
      }
      
      // For person entities, try partial matching
      if (entity.type === 'person' && linkedEntities.length === 0) {
        const nameParts = entity.normalizedText.split(' ');
        for (const part of nameParts) {
          const partialMatch = this.knowledgeBase.get(`alias_${part.toLowerCase()}`);
          if (partialMatch && !linkedEntities.includes(partialMatch)) {
            linkedEntities.push(partialMatch);
          }
        }
      }
      
      // Select best match based on confidence and relevance
      const bestMatch = linkedEntities.length > 0 ? 
        linkedEntities.reduce((best, current) => 
          (current.name.toLowerCase().includes(entity.normalizedText.toLowerCase()) ? 1 : 0) > 
          (best.name.toLowerCase().includes(entity.normalizedText.toLowerCase()) ? 1 : 0) ? 
          current : best
        ) : undefined;
      
      linkingResults.push({
        originalEntity: entity,
        linkedEntities,
        bestMatch,
        confidence: linkedEntities.length > 0 ? 
          Math.min(0.95, entity.confidence + 0.2) : 
          entity.confidence * 0.8
      });
    }
    
    return linkingResults;
  }

  /**
   * Extract relationships between entities
   */
  async extractRelationships(entities: Entity[]): Promise<Array<{
    source: Entity;
    target: Entity;
    type: string;
    confidence: number;
  }>> {
    const relationships: Array<{
      source: Entity;
      target: Entity;
      type: string;
      confidence: number;
    }> = [];
    
    if (!this.config.enableRelationshipExtraction) {
      return relationships;
    }
    
    // Simple proximity-based relationship extraction
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const entity1 = entities[i];
        const entity2 = entities[j];
        
        // If entities are close to each other in text
        if (Math.abs(entity1.startIndex - entity2.startIndex) < 100) {
          // Determine relationship type based on entity types and context
          let relationshipType = 'associated_with';
          let confidence = 0.6;
          
          // Person-Organization relationship
          if (
            (entity1.type === 'person' && entity2.type === 'organization') ||
            (entity1.type === 'organization' && entity2.type === 'person')
          ) {
            relationshipType = 'works_for';
            confidence = 0.8;
          }
          
          // Technology-Concept relationship
          if (
            (entity1.type === 'technology' && entity2.type === 'concept') ||
            (entity1.type === 'concept' && entity2.type === 'technology')
          ) {
            relationshipType = 'related_to';
            confidence = 0.7;
          }
          
          relationships.push({
            source: entity1,
            target: entity2,
            type: relationshipType,
            confidence
          });
        }
      }
    }
    
    return relationships;
  }

  /**
   * Process search result for entity extraction
   */
  async processSearchResult(result: any): Promise<{
    entities: Entity[];
    linkedEntities: EntityLinkingResult[];
    relationships: any[];
  }> {
    // Extract entities from title and content
    const titleEntities = await this.extractEntities(result.title || '');
    const contentEntities = await this.extractEntities(result.content || '');
    
    // Combine entities
    const allEntities = [...titleEntities.entities, ...contentEntities.entities];
    
    // Remove duplicates based on text and type
    const uniqueEntities = allEntities.filter((entity, index, self) =>
      index === self.findIndex(e => 
        e.text === entity.text && e.type === entity.type
      )
    );
    
    // Link entities
    const linkedEntities = await this.linkEntities(uniqueEntities);
    
    // Extract relationships
    const relationships = await this.extractRelationships(uniqueEntities);
    
    return {
      entities: uniqueEntities,
      linkedEntities,
      relationships
    };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<EntityExtractionConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Update custom patterns if provided
    if (newConfig.customEntityPatterns) {
      this.customPatterns.clear();
      Object.entries(newConfig.customEntityPatterns).forEach(([name, pattern]) => {
        this.customPatterns.set(name, pattern);
      });
    }
  }

  /**
   * Add entity to knowledge base
   */
  addToKnowledgeBase(entity: LinkedEntity): void {
    this.knowledgeBase.set(entity.id, entity);
    entity.aliases.forEach(alias => {
      this.knowledgeBase.set(`alias_${alias.toLowerCase()}`, entity);
    });
  }

  /**
   * Get knowledge base statistics
   */
  getKnowledgeBaseStats(): {
    totalEntities: number;
    entityTypes: Record<EntityType, number>;
  } {
    const entityTypes: Record<EntityType, number> = {
      person: 0, organization: 0, location: 0, product: 0, event: 0,
      date: 0, quantity: 0, email: 0, url: 0, phone: 0, currency: 0,
      percent: 0, technology: 0, concept: 0, topic: 0, keyword: 0,
      citation: 0, image: 0, video: 0, audio: 0, document: 0, code: 0,
      social_media: 0, custom: 0
    };
    
    this.knowledgeBase.forEach(entity => {
      if (entityTypes.hasOwnProperty(entity.type)) {
        entityTypes[entity.type]++;
      }
    });
    
    return {
      totalEntities: this.knowledgeBase.size,
      entityTypes
    };
  }
}

// Export singleton instance
export const entityExtractionService = new EntityExtractionService();

// Export types for external use
// Types are already exported individually above