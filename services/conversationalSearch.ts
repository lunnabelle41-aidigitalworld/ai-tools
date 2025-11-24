/**
 * Conversational search interface service
 */

// Conversation types
export type ConversationType = 
  | 'question_answering'    // Direct question answering
  | 'exploratory'           // Exploratory search conversation
  | 'comparison'            // Comparison-based conversation
  | 'tutorial'              // Tutorial/guided search
  | 'troubleshooting'       // Problem-solving conversation
  | 'recommendation'        // Recommendation-based conversation
  | 'research'              // In-depth research conversation
  | 'creative'              // Creative ideation conversation;

// Conversation message
export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  context?: {
    searchQuery?: string;
    results?: any[];
    intent?: string;
    entities?: Record<string, any>;
  };
  metadata?: {
    confidence?: number;
    sources?: string[];
    processingTime?: number;
  };
}

// Conversation state
export interface ConversationState {
  id: string;
  type: ConversationType;
  messages: ConversationMessage[];
  context: {
    topic: string;
    userGoal: string;
    currentQuery: string;
    searchHistory: string[];
    selectedResults: string[];
    preferences: Record<string, any>;
  };
  metadata: {
    createdAt: number;
    updatedAt: number;
    messageCount: number;
    averageResponseTime: number;
  };
}

// Conversational search response
export interface ConversationalResponse {
  response: string;
  followUpQuestions: string[];
  suggestedActions: Array<{
    type: 'search' | 'filter' | 'sort' | 'compare' | 'explore';
    label: string;
    action: any;
  }>;
  confidence: number;
  sources: Array<{
    id: string;
    title: string;
    excerpt: string;
    url: string;
    relevance: number;
  }>;
  contextUpdate?: Partial<ConversationState['context']>;
}

// Conversation configuration
export interface ConversationConfig {
  maxContextLength: number;
  enableMultiTurn: boolean;
  enableClarification: boolean;
  enableSuggestions: boolean;
  responseStyle: 'concise' | 'detailed' | 'technical' | 'casual';
  language: 'en' | 'es' | 'fr' | 'de' | 'zh';
  enablePersonalization: boolean;
}

// Default configuration
const defaultConfig: ConversationConfig = {
  maxContextLength: 10,
  enableMultiTurn: true,
  enableClarification: true,
  enableSuggestions: true,
  responseStyle: 'detailed',
  language: 'en',
  enablePersonalization: true
};

// In-memory storage for conversations
const conversations = new Map<string, ConversationState>();

/**
 * Initialize a new conversation
 */
export function initConversation(
  conversationId: string,
  type: ConversationType,
  initialContext?: Partial<ConversationState['context']>
): ConversationState {
  const conversation: ConversationState = {
    id: conversationId,
    type,
    messages: [],
    context: {
      topic: initialContext?.topic || '',
      userGoal: initialContext?.userGoal || '',
      currentQuery: initialContext?.currentQuery || '',
      searchHistory: initialContext?.searchHistory || [],
      selectedResults: initialContext?.selectedResults || [],
      preferences: initialContext?.preferences || {}
    },
    metadata: {
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messageCount: 0,
      averageResponseTime: 0
    }
  };
  
  conversations.set(conversationId, conversation);
  return conversation;
}

/**
 * Get conversation state
 */
export function getConversation(conversationId: string): ConversationState | undefined {
  return conversations.get(conversationId);
}

/**
 * Add message to conversation
 */
export function addMessage(
  conversationId: string,
  message: Omit<ConversationMessage, 'id' | 'timestamp'>
): ConversationState {
  const conversation = conversations.get(conversationId);
  if (!conversation) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  const newMessage: ConversationMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    ...message
  };
  
  conversation.messages.push(newMessage);
  
  // Maintain context length
  if (conversation.messages.length > defaultConfig.maxContextLength) {
    conversation.messages = conversation.messages.slice(-defaultConfig.maxContextLength);
  }
  
  conversation.metadata.messageCount = conversation.messages.length;
  conversation.metadata.updatedAt = Date.now();
  
  conversations.set(conversationId, conversation);
  return conversation;
}

/**
 * Process conversational search query
 */
export async function processConversationalQuery(
  conversationId: string,
  query: string,
  searchFunction: (q: string) => Promise<any[]>,
  config: ConversationConfig = defaultConfig
): Promise<ConversationalResponse> {
  const startTime = Date.now();
  
  // Get conversation context
  const conversation = conversations.get(conversationId);
  if (!conversation) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  // Analyze query intent
  const intent = analyzeQueryIntent(query, conversation);
  
  // Perform search
  const searchResults = await searchFunction(query);
  
  // Generate response based on intent and results
  const response = generateConversationalResponse(query, intent, searchResults, config);
  
  // Add user message
  addMessage(conversationId, {
    role: 'user',
    content: query,
    context: {
      searchQuery: query,
      results: searchResults,
      intent
    }
  });
  
  // Add assistant response
  addMessage(conversationId, {
    role: 'assistant',
    content: response.response,
    metadata: {
      confidence: response.confidence,
      sources: response.sources.map(s => s.id),
      processingTime: Date.now() - startTime
    }
  });
  
  // Update conversation context
  if (response.contextUpdate) {
    Object.assign(conversation.context, response.contextUpdate);
  }
  
  conversation.context.searchHistory.push(query);
  conversation.metadata.averageResponseTime = 
    (conversation.metadata.averageResponseTime * (conversation.metadata.messageCount - 1) + 
     (Date.now() - startTime)) / conversation.metadata.messageCount;
  
  conversations.set(conversationId, conversation);
  
  return response;
}

/**
 * Analyze query intent
 */
function analyzeQueryIntent(query: string, conversation: ConversationState): string {
  const queryLower = query.toLowerCase();
  
  // Check for question patterns
  if (queryLower.includes('?') || 
      queryLower.startsWith('what') || 
      queryLower.startsWith('how') || 
      queryLower.startsWith('why') ||
      queryLower.startsWith('when') ||
      queryLower.startsWith('where') ||
      queryLower.startsWith('who')) {
    return 'question_answering';
  }
  
  // Check for comparison patterns
  if (queryLower.includes('vs') || 
      queryLower.includes('versus') || 
      queryLower.includes('compare') ||
      queryLower.includes('better than') ||
      queryLower.includes('difference between')) {
    return 'comparison';
  }
  
  // Check for troubleshooting patterns
  if (queryLower.includes('problem') || 
      queryLower.includes('issue') || 
      queryLower.includes('error') ||
      queryLower.includes('not working') ||
      queryLower.includes('help')) {
    return 'troubleshooting';
  }
  
  // Check for recommendation patterns
  if (queryLower.includes('best') || 
      queryLower.includes('recommend') || 
      queryLower.includes('suggest') ||
      queryLower.includes('top') ||
      queryLower.includes('popular')) {
    return 'recommendation';
  }
  
  // Check conversation history for context
  if (conversation.messages.length > 2) {
    return 'exploratory';
  }
  
  // Default to exploratory
  return 'exploratory';
}

/**
 * Generate conversational response
 */
function generateConversationalResponse(
  query: string,
  intent: string,
  results: any[],
  config: ConversationConfig
): ConversationalResponse {
  // Filter and rank results
  const relevantResults = results
    .filter(result => (result.similarity || 0) > 0.1)
    .sort((a, b) => (b.similarity || 0) - (a.similarity || 0))
    .slice(0, 5);
  
  let response = '';
  let confidence = 0.5;
  const followUpQuestions: string[] = [];
  const suggestedActions: ConversationalResponse['suggestedActions'] = [];
  
  // Generate response based on intent
  switch (intent) {
    case 'question_answering':
      response = generateQuestionAnsweringResponse(query, relevantResults, config);
      confidence = 0.8;
      followUpQuestions.push(
        `Can you tell me more about ${extractKeyTerms(query).slice(0, 2).join(' and ')}?`,
        `What are the alternatives to this approach?`
      );
      break;
      
    case 'comparison':
      response = generateComparisonResponse(query, relevantResults, config);
      confidence = 0.7;
      followUpQuestions.push(
        `What are the pros and cons of each option?`,
        `Which one would you recommend for my use case?`
      );
      break;
      
    case 'troubleshooting':
      response = generateTroubleshootingResponse(query, relevantResults, config);
      confidence = 0.75;
      followUpQuestions.push(
        `What are the common causes of this issue?`,
        `Are there any preventive measures I can take?`
      );
      break;
      
    case 'recommendation':
      response = generateRecommendationResponse(query, relevantResults, config);
      confidence = 0.8;
      followUpQuestions.push(
        `What are the key features of the recommended options?`,
        `How do these options compare in terms of pricing?`
      );
      break;
      
    default:
      response = generateExploratoryResponse(query, relevantResults, config);
      confidence = 0.6;
      followUpQuestions.push(
        `What are the key aspects of this topic?`,
        `Can you provide examples or case studies?`
      );
  }
  
  // Generate suggested actions
  suggestedActions.push(
    { type: 'search', label: 'Search related topics', action: { query: `related to ${query}` } },
    { type: 'filter', label: 'Filter by category', action: { filter: 'category' } },
    { type: 'sort', label: 'Sort by relevance', action: { sort: 'relevance' } }
  );
  
  // Extract sources
  const sources = relevantResults.map(result => ({
    id: result.id,
    title: result.title,
    excerpt: result._snippet || result.summary || result.content.substring(0, 150) + '...',
    url: result.url,
    relevance: result.similarity || 0.5
  }));
  
  return {
    response,
    followUpQuestions,
    suggestedActions,
    confidence,
    sources
  };
}

/**
 * Generate question answering response
 */
function generateQuestionAnsweringResponse(
  query: string,
  results: any[],
  config: ConversationConfig
): string {
  if (results.length === 0) {
    return "I couldn't find specific information to answer your question directly. Could you provide more context or rephrase your question?";
  }
  
  const topResult = results[0];
  const answer = topResult._snippet || topResult.summary || topResult.content.substring(0, 300);
  
  if (config.responseStyle === 'concise') {
    return `Based on my search, here's a concise answer: ${answer.substring(0, 150)}...`;
  } else if (config.responseStyle === 'technical') {
    return `Here's a technical explanation based on the available information:\n\n${answer}\n\nSource: ${topResult.title}`;
  } else {
    return `I found this information that answers your question:

${answer}

This comes from "${topResult.title}" which might provide additional details.`;
  }
}

/**
 * Generate comparison response
 */
function generateComparisonResponse(
  query: string,
  results: any[],
  config: ConversationConfig
): string {
  if (results.length < 2) {
    return "I need more information to make a proper comparison. Could you specify what you'd like to compare?";
  }
  
  const topResults = results.slice(0, 3);
  
  if (config.responseStyle === 'concise') {
    return `Here's a quick comparison of the top options based on your query.`;
  } else {
    let response = "Here's a comparison of the most relevant options:\n\n";
    
    topResults.forEach((result, index) => {
      response += `${index + 1}. **${result.title}**\n`;
      response += `   ${result._snippet || result.summary || result.content.substring(0, 100)}...\n\n`;
    });
    
    response += "Each option has different strengths. Would you like me to elaborate on any specific aspect?";
    return response;
  }
}

/**
 * Generate troubleshooting response
 */
function generateTroubleshootingResponse(
  query: string,
  results: any[],
  config: ConversationConfig
): string {
  if (results.length === 0) {
    return "I couldn't find specific troubleshooting information for your issue. Could you describe the problem in more detail?";
  }
  
  const topResult = results[0];
  
  if (config.responseStyle === 'concise') {
    return `Here's a potential solution: ${topResult._snippet?.substring(0, 100) || 'Check the suggested resource for detailed steps.'}`;
  } else {
    return `Based on similar issues, here's a potential solution:\n\n${topResult._snippet || topResult.summary || topResult.content.substring(0, 300)}...\n\nYou can find more detailed steps in "${topResult.title}".`;
  }
}

/**
 * Generate recommendation response
 */
function generateRecommendationResponse(
  query: string,
  results: any[],
  config: ConversationConfig
): string {
  if (results.length === 0) {
    return "I couldn't find specific recommendations for your query. Could you provide more details about what you're looking for?";
  }
  
  const topResults = results.slice(0, 3);
  
  if (config.responseStyle === 'concise') {
    return `Top recommendations: ${topResults.map(r => r.title).join(', ')}`;
  } else {
    let response = "Based on your query, here are the top recommendations:\n\n";
    
    topResults.forEach((result, index) => {
      response += `${index + 1}. **${result.title}**\n`;
      response += `   Rating: ${result.rating || 'N/A'}\n`;
      response += `   ${result._snippet || result.summary || result.content.substring(0, 100)}...\n\n`;
    });
    
    response += "These options are highly rated and relevant to your query. Would you like more details about any of them?";
    return response;
  }
}

/**
 * Generate exploratory response
 */
function generateExploratoryResponse(
  query: string,
  results: any[],
  config: ConversationConfig
): string {
  if (results.length === 0) {
    return "I couldn't find information on that topic. Could you try rephrasing or be more specific?";
  }
  
  const topResult = results[0];
  
  if (config.responseStyle === 'concise') {
    return `Here's an overview: ${topResult._snippet?.substring(0, 150) || topResult.title}`;
  } else {
    return `Here's what I found about "${query}":\n\n${topResult._snippet || topResult.summary || topResult.content.substring(0, 300)}...\n\nThis information is from "${topResult.title}". Would you like me to explore any particular aspect in more detail?`;
  }
}

/**
 * Extract key terms from query
 */
function extractKeyTerms(query: string): string[] {
  // Remove common question words and extract key terms
  const stopWords = new Set(['what', 'how', 'why', 'when', 'where', 'who', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'can', 'could', 'should', 'will', 'would', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
  
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(term => term.length > 2 && !stopWords.has(term));
}

/**
 * Generate clarification questions
 */
export function generateClarificationQuestions(
  query: string,
  conversation: ConversationState
): string[] {
  const questions: string[] = [];
  const keyTerms = extractKeyTerms(query);
  
  if (keyTerms.length === 0) {
    questions.push("Could you provide more details about what you're looking for?");
    return questions;
  }
  
  // Generate clarification based on conversation type
  switch (conversation.type) {
    case 'question_answering':
      questions.push(`Are you asking specifically about ${keyTerms.slice(0, 2).join(' and ')}?`);
      questions.push(`Do you need a technical explanation or a general overview?`);
      break;
      
    case 'comparison':
      questions.push(`What specific aspects would you like to compare between these options?`);
      questions.push(`Do you have any particular requirements or constraints?`);
      break;
      
    case 'troubleshooting':
      questions.push(`What specific issue are you experiencing?`);
      questions.push(`What steps have you already tried to resolve this?`);
      break;
      
    default:
      questions.push(`Would you like me to focus on any particular aspect of ${keyTerms[0]}?`);
      questions.push(`Are you looking for beginner-friendly information or advanced details?`);
  }
  
  return questions;
}

/**
 * Continue conversation with follow-up
 */
export async function continueConversation(
  conversationId: string,
  followUp: string,
  searchFunction: (q: string) => Promise<any[]>,
  config: ConversationConfig = defaultConfig
): Promise<ConversationalResponse> {
  const conversation = conversations.get(conversationId);
  if (!conversation) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  // Update context based on follow-up
  const contextUpdate: Partial<ConversationState['context']> = {};
  
  // If follow-up references previous results, update selected results
  if (followUp.toLowerCase().includes('first') || followUp.toLowerCase().includes('option 1')) {
    const lastResults = conversation.messages
      .filter(m => m.role === 'assistant' && m.metadata?.sources)
      .slice(-1)[0]?.metadata?.sources || [];
    
    if (lastResults.length > 0) {
      contextUpdate.selectedResults = [lastResults[0]];
    }
  }
  
  // Process the follow-up query
  const response = await processConversationalQuery(
    conversationId,
    followUp,
    searchFunction,
    config
  );
  
  // Apply context update
  if (Object.keys(contextUpdate).length > 0) {
    Object.assign(conversation.context, contextUpdate);
    conversations.set(conversationId, conversation);
  }
  
  return response;
}

/**
 * Get conversation summary
 */
export function getConversationSummary(conversationId: string): {
  type: ConversationType;
  messageCount: number;
  topic: string;
  duration: number;
  averageResponseTime: number;
} {
  const conversation = conversations.get(conversationId);
  if (!conversation) {
    throw new Error(`Conversation ${conversationId} not found`);
  }
  
  return {
    type: conversation.type,
    messageCount: conversation.metadata.messageCount,
    topic: conversation.context.topic,
    duration: Date.now() - conversation.metadata.createdAt,
    averageResponseTime: conversation.metadata.averageResponseTime
  };
}

/**
 * End conversation
 */
export function endConversation(conversationId: string): void {
  conversations.delete(conversationId);
}

/**
 * Get conversation history
 */
export function getConversationHistory(
  conversationId: string,
  limit: number = 20
): ConversationMessage[] {
  const conversation = conversations.get(conversationId);
  if (!conversation) {
    return [];
  }
  
  return conversation.messages.slice(-limit);
}