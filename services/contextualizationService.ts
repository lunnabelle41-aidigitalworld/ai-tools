/**
 * Search result contextualization service
 */

// Context types
export type ContextType = 
  | 'historical'      // Historical context
  | 'geographical'    // Geographical context
  | 'cultural'        // Cultural context
  | 'temporal'        // Temporal context
  | 'technical'       // Technical context
  | 'comparative'     // Comparative context
  | 'related'         // Related topics
  | 'prerequisites'   // Prerequisites or background
  | 'applications'    // Applications or use cases
  | 'implications'    // Implications or consequences
  | 'controversies'   // Controversies or debates
  | 'future'          // Future trends or predictions
  | 'expert'          // Expert opinions
  | 'user'            // User-specific context
  | 'trending';       // Trending context

// Context item
export interface ContextItem {
  id: string;
  type: ContextType;
  title: string;
  content: string;
  relevance: number; // 0-1
  source?: string;
  timestamp?: number;
  confidence: number; // 0-1
  relationship: 'supports' | 'contradicts' | 'neutral' | 'extends';
}

// Contextualized result
export interface ContextualizedResult {
  resultId: string;
  title: string;
  mainContent: string;
  contextItems: ContextItem[];
  contextSummary: string;
  relatedQueries: string[];
  timeline?: Array<{
    date: string;
    event: string;
    significance: number; // 0-1
  }>;
  geography?: Array<{
    location: string;
    relevance: number; // 0-1
  }>;
}

// Context configuration
export interface ContextConfig {
  enableHistoricalContext: boolean;
  enableGeographicalContext: boolean;
  enableCulturalContext: boolean;
  enableTemporalContext: boolean;
  enableTechnicalContext: boolean;
  enableComparativeContext: boolean;
  enableRelatedContext: boolean;
  maxContextItems: number;
  contextRelevanceThreshold: number; // 0-1
  includeVisualContext: boolean;
  includeInteractiveContext: boolean;
}

// Default configuration
const defaultConfig: ContextConfig = {
  enableHistoricalContext: true,
  enableGeographicalContext: true,
  enableCulturalContext: true,
  enableTemporalContext: true,
  enableTechnicalContext: true,
  enableComparativeContext: true,
  enableRelatedContext: true,
  maxContextItems: 10,
  contextRelevanceThreshold: 0.3,
  includeVisualContext: true,
  includeInteractiveContext: true
};

// User context
export interface UserContext {
  location?: string;
  language?: string;
  interests?: string[];
  expertiseLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  previousSearches?: string[];
  currentTask?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
  deviceType?: 'desktop' | 'mobile' | 'tablet';
}

/**
 * Add context to a search result
 */
export function addContext(
  result: { id: string; title: string; content: string; [key: string]: any },
  userContext: UserContext = {},
  config: ContextConfig = defaultConfig
): ContextualizedResult {
  const contextItems: ContextItem[] = [];
  
  // Add historical context
  if (config.enableHistoricalContext) {
    const historicalContext = generateHistoricalContext(result, userContext);
    contextItems.push(...historicalContext);
  }
  
  // Add geographical context
  if (config.enableGeographicalContext) {
    const geographicalContext = generateGeographicalContext(result, userContext);
    contextItems.push(...geographicalContext);
  }
  
  // Add cultural context
  if (config.enableCulturalContext) {
    const culturalContext = generateCulturalContext(result, userContext);
    contextItems.push(...culturalContext);
  }
  
  // Add temporal context
  if (config.enableTemporalContext) {
    const temporalContext = generateTemporalContext(result, userContext);
    contextItems.push(...temporalContext);
  }
  
  // Add technical context
  if (config.enableTechnicalContext) {
    const technicalContext = generateTechnicalContext(result, userContext);
    contextItems.push(...technicalContext);
  }
  
  // Add comparative context
  if (config.enableComparativeContext) {
    const comparativeContext = generateComparativeContext(result, userContext);
    contextItems.push(...comparativeContext);
  }
  
  // Add related context
  if (config.enableRelatedContext) {
    const relatedContext = generateRelatedContext(result, userContext);
    contextItems.push(...relatedContext);
  }
  
  // Filter by relevance threshold
  const relevantContext = contextItems.filter(item => 
    item.relevance >= config.contextRelevanceThreshold
  );
  
  // Sort by relevance and limit
  const sortedContext = relevantContext
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, config.maxContextItems);
  
  // Generate context summary
  const contextSummary = generateContextSummary(sortedContext);
  
  // Generate related queries
  const relatedQueries = generateRelatedQueries(result, sortedContext);
  
  // Generate timeline if relevant
  const timeline = generateTimeline(result, sortedContext);
  
  // Generate geography information if relevant
  const geography = generateGeographyInfo(result, sortedContext);
  
  return {
    resultId: result.id,
    title: result.title,
    mainContent: result.content,
    contextItems: sortedContext,
    contextSummary,
    relatedQueries,
    timeline,
    geography
  };
}

/**
 * Generate historical context
 */
function generateHistoricalContext(
  result: any,
  userContext: UserContext
): ContextItem[] {
  const contextItems: ContextItem[] = [];
  
  // Extract potential historical references from content
  const historicalTerms = extractHistoricalTerms(result.content);
  
  historicalTerms.forEach(term => {
    // Generate historical context for each term
    const contextItem: ContextItem = {
      id: `historical-${term.replace(/\s+/g, '-')}`,
      type: 'historical',
      title: `Historical Background: ${term}`,
      content: generateHistoricalContent(term, result.title),
      relevance: calculateHistoricalRelevance(term, result, userContext),
      confidence: 0.8,
      relationship: 'supports'
    };
    
    contextItems.push(contextItem);
  });
  
  return contextItems;
}

/**
 * Extract historical terms from content
 */
function extractHistoricalTerms(content: string): string[] {
  // Simple extraction of potential historical terms
  // In practice, you'd use NER or a historical knowledge base
  const historicalPatterns = [
    /\b\d{4}s?\b/g, // Decades/years
    /\b(?:world war|cold war|industrial revolution|renaissance|enlightenment)\b/gi,
    /\b(?:ancient|medieval|modern|contemporary)\s+\w+/gi
  ];
  
  const terms: string[] = [];
  historicalPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      terms.push(...matches);
    }
  });
  
  return Array.from(new Set(terms)).slice(0, 3); // Remove duplicates, limit to 3
}

/**
 * Generate historical content for a term
 */
function generateHistoricalContent(term: string, resultTitle: string): string {
  // This would typically query a knowledge base
  // For now, we'll generate sample content
  return `The term "${term}" has significant historical importance in relation to "${resultTitle}". Historical context helps understand the development and evolution of this topic over time.`;
}

/**
 * Calculate historical relevance
 */
function calculateHistoricalRelevance(
  term: string,
  result: any,
  userContext: UserContext
): number {
  // Simple relevance calculation
  let relevance = 0.5;
  
  // Boost relevance if term appears in title
  if (result.title.toLowerCase().includes(term.toLowerCase())) {
    relevance += 0.3;
  }
  
  // Adjust based on user interests
  if (userContext.interests && userContext.interests.some(interest => 
    term.toLowerCase().includes(interest.toLowerCase())
  )) {
    relevance += 0.2;
  }
  
  return Math.min(1, relevance);
}

/**
 * Generate geographical context
 */
function generateGeographicalContext(
  result: any,
  userContext: UserContext
): ContextItem[] {
  const contextItems: ContextItem[] = [];
  
  // Extract geographical references
  const locations = extractGeographicalReferences(result.content);
  
  locations.forEach(location => {
    const contextItem: ContextItem = {
      id: `geographical-${location.replace(/\s+/g, '-')}`,
      type: 'geographical',
      title: `Geographical Context: ${location}`,
      content: generateGeographicalContent(location, result.title),
      relevance: calculateGeographicalRelevance(location, result, userContext),
      confidence: 0.7,
      relationship: 'supports'
    };
    
    contextItems.push(contextItem);
  });
  
  return contextItems;
}

/**
 * Extract geographical references from content
 */
function extractGeographicalReferences(content: string): string[] {
  // Simple extraction - in practice, use NER or geocoding
  const geographicalTerms = [
    'United States', 'China', 'India', 'Germany', 'Japan', 'United Kingdom',
    'California', 'New York', 'London', 'Paris', 'Tokyo', 'Sydney',
    'Europe', 'Asia', 'Africa', 'North America', 'South America'
  ];
  
  return geographicalTerms.filter(term => 
    content.toLowerCase().includes(term.toLowerCase())
  ).slice(0, 3);
}

/**
 * Generate geographical content
 */
function generateGeographicalContent(location: string, resultTitle: string): string {
  return `The location "${location}" plays an important role in understanding "${resultTitle}". Regional variations and geographical factors can significantly impact this topic.`;
}

/**
 * Calculate geographical relevance
 */
function calculateGeographicalRelevance(
  location: string,
  result: any,
  userContext: UserContext
): number {
  let relevance = 0.4;
  
  // Boost if user is in or interested in this location
  if (userContext.location && 
      userContext.location.toLowerCase().includes(location.toLowerCase())) {
    relevance += 0.4;
  }
  
  // Boost if location is in title
  if (result.title.toLowerCase().includes(location.toLowerCase())) {
    relevance += 0.2;
  }
  
  return Math.min(1, relevance);
}

/**
 * Generate cultural context
 */
function generateCulturalContext(
  result: any,
  userContext: UserContext
): ContextItem[] {
  const contextItems: ContextItem[] = [];
  
  // Extract cultural references
  const culturalTerms = extractCulturalReferences(result.content);
  
  culturalTerms.forEach(term => {
    const contextItem: ContextItem = {
      id: `cultural-${term.replace(/\s+/g, '-')}`,
      type: 'cultural',
      title: `Cultural Context: ${term}`,
      content: generateCulturalContent(term, result.title),
      relevance: calculateCulturalRelevance(term, result, userContext),
      confidence: 0.6,
      relationship: 'supports'
    };
    
    contextItems.push(contextItem);
  });
  
  return contextItems;
}

/**
 * Extract cultural references
 */
function extractCulturalReferences(content: string): string[] {
  const culturalTerms = [
    'Western culture', 'Eastern culture', 'American culture', 'Japanese culture',
    'collectivism', 'individualism', 'traditional', 'modern', 'conservative', 'progressive'
  ];
  
  return culturalTerms.filter(term => 
    content.toLowerCase().includes(term.toLowerCase())
  ).slice(0, 2);
}

/**
 * Generate cultural content
 */
function generateCulturalContent(term: string, resultTitle: string): string {
  return `The cultural concept of "${term}" provides important context for understanding "${resultTitle}". Cultural factors influence perspectives and interpretations of this topic.`;
}

/**
 * Calculate cultural relevance
 */
function calculateCulturalRelevance(
  term: string,
  result: any,
  userContext: UserContext
): number {
  let relevance = 0.3;
  
  // Boost based on user interests
  if (userContext.interests && userContext.interests.some(interest => 
    term.toLowerCase().includes(interest.toLowerCase())
  )) {
    relevance += 0.3;
  }
  
  return Math.min(1, relevance);
}

/**
 * Generate temporal context
 */
function generateTemporalContext(
  result: any,
  userContext: UserContext
): ContextItem[] {
  const contextItems: ContextItem[] = [];
  
  // Generate temporal context based on publication date
  if (result.publishedAt) {
    const contextItem: ContextItem = {
      id: `temporal-${result.id}`,
      type: 'temporal',
      title: 'Temporal Context',
      content: generateTemporalContent(result),
      relevance: 0.7,
      confidence: 0.9,
      relationship: 'supports'
    };
    
    contextItems.push(contextItem);
  }
  
  return contextItems;
}

/**
 * Generate temporal content
 */
function generateTemporalContent(result: any): string {
  const pubDate = new Date(result.publishedAt);
  const now = new Date();
  const ageInDays = (now.getTime() - pubDate.getTime()) / (24 * 60 * 60 * 1000);
  
  if (ageInDays < 1) {
    return 'This content was published today and represents the most current information available.';
  } else if (ageInDays < 7) {
    return `This content was published ${Math.round(ageInDays)} days ago and is relatively current.`;
  } else if (ageInDays < 30) {
    return `This content was published about ${Math.round(ageInDays / 7)} weeks ago. Consider checking for more recent information.`;
  } else if (ageInDays < 365) {
    return `This content was published about ${Math.round(ageInDays / 30)} months ago. The information may be outdated.`;
  } else {
    return `This content was published about ${Math.round(ageInDays / 365)} years ago. The information is likely outdated.`;
  }
}

/**
 * Generate technical context
 */
function generateTechnicalContext(
  result: any,
  userContext: UserContext
): ContextItem[] {
  const contextItems: ContextItem[] = [];
  
  // Extract technical terms
  const technicalTerms = extractTechnicalTerms(result.content);
  
  technicalTerms.forEach(term => {
    const contextItem: ContextItem = {
      id: `technical-${term.replace(/\s+/g, '-')}`,
      type: 'technical',
      title: `Technical Definition: ${term}`,
      content: generateTechnicalContent(term),
      relevance: calculateTechnicalRelevance(term, result, userContext),
      confidence: 0.8,
      relationship: 'supports'
    };
    
    contextItems.push(contextItem);
  });
  
  return contextItems;
}

/**
 * Extract technical terms
 */
function extractTechnicalTerms(content: string): string[] {
  const technicalTerms = [
    'algorithm', 'machine learning', 'artificial intelligence', 'neural network',
    'blockchain', 'API', 'framework', 'protocol', 'database', 'encryption'
  ];
  
  return technicalTerms.filter(term => 
    content.toLowerCase().includes(term.toLowerCase())
  ).slice(0, 3);
}

/**
 * Generate technical content
 */
function generateTechnicalContent(term: string): string {
  // In practice, this would query a technical dictionary or knowledge base
  return `**${term}** - A technical term relevant to this content. For detailed technical specifications and implementation details, consult specialized technical documentation.`;
}

/**
 * Calculate technical relevance
 */
function calculateTechnicalRelevance(
  term: string,
  result: any,
  userContext: UserContext
): number {
  let relevance = 0.4;
  
  // Boost based on user expertise level
  if (userContext.expertiseLevel === 'beginner') {
    relevance += 0.2; // Beginners might need more definitions
  }
  
  // Boost if term is in title
  if (result.title.toLowerCase().includes(term.toLowerCase())) {
    relevance += 0.3;
  }
  
  return Math.min(1, relevance);
}

/**
 * Generate comparative context
 */
function generateComparativeContext(
  result: any,
  userContext: UserContext
): ContextItem[] {
  const contextItems: ContextItem[] = [];
  
  // Extract comparative references
  const comparisons = extractComparisons(result.content);
  
  comparisons.forEach(comparison => {
    const contextItem: ContextItem = {
      id: `comparative-${comparison.replace(/\s+/g, '-')}`,
      type: 'comparative',
      title: `Comparison: ${comparison}`,
      content: generateComparativeContent(comparison, result.title),
      relevance: calculateComparativeRelevance(comparison, result, userContext),
      confidence: 0.7,
      relationship: 'extends'
    };
    
    contextItems.push(contextItem);
  });
  
  return contextItems;
}

/**
 * Extract comparisons
 */
function extractComparisons(content: string): string[] {
  const comparisonPatterns = [
    /\b(?:vs\.?|versus|compared to|in comparison to|relative to)\s+([^,.\n]+)/gi
  ];
  
  const comparisons: string[] = [];
  comparisonPatterns.forEach(pattern => {
    const matches = content.match(pattern);
    if (matches) {
      comparisons.push(...matches.map(match => 
        match.replace(/.*(?:vs\.?|versus|compared to|in comparison to|relative to)\s+/i, '')
      ));
    }
  });
  
  return Array.from(new Set(comparisons)).slice(0, 2);
}

/**
 * Generate comparative content
 */
function generateComparativeContent(comparison: string, resultTitle: string): string {
  return `This content can be compared to "${comparison}" to understand relative strengths, weaknesses, and differences in the context of "${resultTitle}".`;
}

/**
 * Calculate comparative relevance
 */
function calculateComparativeRelevance(
  comparison: string,
  result: any,
  userContext: UserContext
): number {
  let relevance = 0.5;
  
  // Boost if user has searched for comparison terms
  if (userContext.previousSearches && userContext.previousSearches.some(search => 
    search.toLowerCase().includes(comparison.toLowerCase())
  )) {
    relevance += 0.3;
  }
  
  return Math.min(1, relevance);
}

/**
 * Generate related context
 */
function generateRelatedContext(
  result: any,
  userContext: UserContext
): ContextItem[] {
  const contextItems: ContextItem[] = [];
  
  // Generate related topics
  const relatedTopics = generateRelatedTopics(result, userContext);
  
  relatedTopics.forEach(topic => {
    const contextItem: ContextItem = {
      id: `related-${topic.replace(/\s+/g, '-')}`,
      type: 'related',
      title: `Related Topic: ${topic}`,
      content: generateRelatedContent(topic, result.title),
      relevance: calculateRelatedRelevance(topic, result, userContext),
      confidence: 0.6,
      relationship: 'extends'
    };
    
    contextItems.push(contextItem);
  });
  
  return contextItems;
}

/**
 * Generate related topics
 */
function generateRelatedTopics(result: any, userContext: UserContext): string[] {
  // Simple related topic generation
  const baseTopics = [
    'related research', 'similar tools', 'alternative approaches',
    'industry trends', 'best practices', 'case studies'
  ];
  
  // Add user interest-based topics
  const interestTopics = userContext.interests 
    ? userContext.interests.map(interest => `more about ${interest}`)
    : [];
  
  return [...baseTopics, ...interestTopics].slice(0, 5);
}

/**
 * Generate related content
 */
function generateRelatedContent(topic: string, resultTitle: string): string {
  return `Explore "${topic}" to gain deeper insights related to "${resultTitle}". This can provide additional perspectives and complementary information.`;
}

/**
 * Calculate related relevance
 */
function calculateRelatedRelevance(
  topic: string,
  result: any,
  userContext: UserContext
): number {
  let relevance = 0.4;
  
  // Boost based on user interests
  if (userContext.interests && userContext.interests.some(interest => 
    topic.toLowerCase().includes(interest.toLowerCase())
  )) {
    relevance += 0.4;
  }
  
  return Math.min(1, relevance);
}

/**
 * Generate context summary
 */
function generateContextSummary(contextItems: ContextItem[]): string {
  if (contextItems.length === 0) {
    return 'No additional context available for this result.';
  }
  
  const contextTypes = Array.from(new Set(contextItems.map(item => item.type)));
  const itemCounts = contextTypes.map(type => ({
    type,
    count: contextItems.filter(item => item.type === type).length
  }));
  
  const summaryParts = itemCounts.map(item => 
    `${item.count} ${item.type} context item${item.count > 1 ? 's' : ''}`
  );
  
  return `This result includes ${summaryParts.join(', ')} to provide comprehensive understanding.`;
}

/**
 * Generate related queries
 */
function generateRelatedQueries(result: any, contextItems: ContextItem[]): string[] {
  const queries: string[] = [];
  
  // Add queries based on context types
  const contextTypes = Array.from(new Set(contextItems.map(item => item.type)));
  
  contextTypes.forEach(type => {
    switch (type) {
      case 'historical':
        queries.push(`history of ${result.title}`);
        break;
      case 'geographical':
        contextItems
          .filter(item => item.type === 'geographical')
          .slice(0, 2)
          .forEach(item => {
            queries.push(`${result.title} in ${item.title.replace('Geographical Context: ', '')}`);
          });
        break;
      case 'technical':
        queries.push(`technical details of ${result.title}`);
        break;
      case 'comparative':
        contextItems
          .filter(item => item.type === 'comparative')
          .slice(0, 2)
          .forEach(item => {
            queries.push(`${result.title} vs ${item.title.replace('Comparison: ', '')}`);
          });
        break;
      default:
        queries.push(`more about ${result.title}`);
    }
  });
  
  return Array.from(new Set(queries)).slice(0, 5);
}

/**
 * Generate timeline
 */
function generateTimeline(result: any, contextItems: ContextItem[]): Array<{
  date: string;
  event: string;
  significance: number;
}> | undefined {
  // Only generate timeline if there's historical context
  const historicalItems = contextItems.filter(item => item.type === 'historical');
  
  if (historicalItems.length === 0) {
    return undefined;
  }
  
  // Generate sample timeline events
  return [
    {
      date: '2020',
      event: 'Key development in this field',
      significance: 0.8
    },
    {
      date: '2022',
      event: 'Major advancement related to this topic',
      significance: 0.9
    },
    {
      date: '2023',
      event: 'Recent developments',
      significance: 0.7
    }
  ];
}

/**
 * Generate geography information
 */
function generateGeographyInfo(result: any, contextItems: ContextItem[]): Array<{
  location: string;
  relevance: number;
}> | undefined {
  // Only generate geography info if there's geographical context
  const geographicalItems = contextItems.filter(item => item.type === 'geographical');
  
  if (geographicalItems.length === 0) {
    return undefined;
  }
  
  return geographicalItems.map(item => ({
    location: item.title.replace('Geographical Context: ', ''),
    relevance: item.relevance
  }));
}

/**
 * Get contextualized results for multiple items
 */
export function addContextToResults(
  results: Array<{ id: string; title: string; content: string; [key: string]: any }>,
  userContext: UserContext = {},
  config: ContextConfig = defaultConfig
): ContextualizedResult[] {
  return results.map(result => addContext(result, userContext, config));
}

/**
 * Update context based on user feedback
 */
export function updateContextFromFeedback(
  resultId: string,
  feedback: {
    contextItemId?: string;
    relevanceAdjustment?: number;
    usefulnessRating?: number;
  }
): void {
  // This would update context relevance based on user feedback
  console.log(`Context feedback received for result ${resultId}:`, feedback);
}

/**
 * Get personalized context recommendations
 */
export function getPersonalizedContext(
  userContext: UserContext,
  resultTopics: string[]
): ContextType[] {
  const preferredContext: ContextType[] = [];
  
  // Recommend context types based on user preferences
  if (userContext.location) {
    preferredContext.push('geographical');
  }
  
  if (userContext.interests && userContext.interests.length > 0) {
    preferredContext.push('related');
    preferredContext.push('comparative');
  }
  
  if (userContext.expertiseLevel === 'beginner') {
    preferredContext.push('technical');
    preferredContext.push('prerequisites');
  }
  
  // Add trending context for current topics
  if (resultTopics.some(topic => 
    topic.toLowerCase().includes('trend') || 
    topic.toLowerCase().includes('new')
  )) {
    preferredContext.push('trending');
    preferredContext.push('future');
  }
  
  return Array.from(new Set(preferredContext));
}