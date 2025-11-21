import { KnowledgeNode } from './adaptive-stream';

interface VoiceSearchQuery {
  query: string;
  intent: 'informational' | 'navigational' | 'transactional' | 'commercial';
  entities: string[];
  context: string;
  answerType: 'direct' | 'list' | 'comparison' | 'howto' | 'definition';
}

interface ConversationalSchema {
  '@context': string;
  '@type': string;
  name: string;
  text: string;
  dateCreated: string;
  author: {
    '@type': string;
    name: string;
  };
  abstract?: string;
  speaksTo?: {
    '@type': string;
    name: string;
  };
  about?: Array<{
    '@type': string;
    name: string;
  }>;
}

interface SnippetBait {
  title: string;
  description: string;
  format: 'paragraph' | 'list' | 'table' | 'definition';
  keywords: string[];
  wordCount: number;
  readabilityScore: number;
}

export class VoiceSearchOptimizer {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://ai-vault.com') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate voice search optimized content variations
   */
  generateVoiceSearchContent(node: KnowledgeNode): {
    conversationalQueries: string[];
    longTailQueries: string[];
    questionBasedQueries: string[];
    commandQueries: string[];
    localQueries: string[];
  } {
    const conversationalQueries = this.generateConversationalQueries(node);
    const longTailQueries = this.generateLongTailQueries(node);
    const questionBasedQueries = this.generateQuestionBasedQueries(node);
    const commandQueries = this.generateCommandQueries(node);
    const localQueries = this.generateLocalQueries(node);

    return {
      conversationalQueries,
      longTailQueries,
      questionBasedQueries,
      commandQueries,
      localQueries
    };
  }

  /**
   * Generate conversational queries for voice search
   */
  private generateConversationalQueries(node: KnowledgeNode): string[] {
    const queries: string[] = [];
    const title = node.title.toLowerCase();
    const category = node.category.toLowerCase();
    const tags = node.tags.map(tag => tag.toLowerCase());

    // "Hey Google, tell me about..." queries
    queries.push(`Hey Google, tell me about ${title}`);
    queries.push(`Hey Siri, what is ${title}`);
    queries.push(`Alexa, explain ${title} to me`);

    // "Can you help me understand..." queries
    queries.push(`Can you help me understand ${title}`);
    queries.push(`I need to know more about ${title}`);
    queries.push(`What can you tell me about ${category} tools`);

    // "Show me..." queries
    queries.push(`Show me the best ${category} tools`);
    queries.push(`Can you show me ${tags.join(' and ')} tools`);
    queries.push(`Display information about ${title}`);

    // "Find..." queries
    queries.push(`Find AI tools for ${category}`);
    queries.push(`Find the best ${tags[0]} tools`);
    queries.push(`Find tools similar to ${title}`);

    // Time-based queries
    queries.push(`What's new in ${category} AI tools`);
    queries.push(`Latest developments in ${tags[0]}`);
    queries.push(`Recent ${category} AI tools and updates`);

    return queries;
  }

  /**
   * Generate long-tail keyword queries
   */
  private generateLongTailQueries(node: KnowledgeNode): string[] {
    const queries: string[] = [];
    const title = node.title.toLowerCase();
    const category = node.category.toLowerCase();
    const tags = node.tags.map(tag => tag.toLowerCase());
    const difficulty = node.difficulty;

    // Difficulty-based queries
    queries.push(`best ${category} AI tools for ${difficulty} users`);
    queries.push(`${category} AI tools suitable for ${difficulty} level`);
    queries.push(`easy to use ${category} AI tools for beginners`);

    // Feature-based queries
    queries.push(`${category} AI tools with advanced features`);
    queries.push(`${category} AI tools that support integration`);
    queries.push(`${category} AI tools with good customer support`);

    // Comparison queries
    queries.push(`compare ${tags[0]} and ${tags[1]} AI tools`);
    queries.push(`${tags[0]} vs ${tags[1]} which is better`);
    queries.push(`difference between ${tags[0]} and ${tags[1]} tools`);

    // Problem-solution queries
    queries.push(`AI tools to solve ${category} problems`);
    queries.push(`how to use AI for ${category} tasks`);
    queries.push(`automate ${category} with AI tools`);

    // Budget-based queries
    queries.push(`free ${category} AI tools`);
    queries.push(`affordable ${category} AI software`);
    queries.push(`${category} AI tools pricing comparison`);

    return queries;
  }

  /**
   * Generate question-based queries (People Also Ask)
   */
  private generateQuestionBasedQueries(node: KnowledgeNode): string[] {
    const queries: string[] = [];
    const title = node.title.toLowerCase();
    const category = node.category.toLowerCase();
    const tags = node.tags.map(tag => tag.toLowerCase());

    // What questions
    queries.push(`What is ${title}`);
    queries.push(`What are the best ${category} AI tools`);
    queries.push(`What makes ${tags[0]} tools effective`);

    // How questions
    queries.push(`How to use ${category} AI tools`);
    queries.push(`How to choose the right ${tags[0]} tool`);
    queries.push(`How do ${category} AI tools work`);

    // Why questions
    queries.push(`Why use AI for ${category}`);
    queries.push(`Why are ${tags[0]} tools popular`);
    queries.push(`Why should I invest in ${category} AI tools`);

    // When questions
    queries.push(`When to use ${category} AI tools`);
    queries.push(`When is the best time to implement AI`);
    queries.push(`When should I upgrade my ${category} tools`);

    // Where questions
    queries.push(`Where to find the best ${category} AI tools`);
    queries.push(`Where can I learn about ${tags[0]} tools`);
    queries.push(`Where to get support for ${category} AI software`);

    // Which questions
    queries.push(`Which ${category} AI tool is best for me`);
    queries.push(`Which ${tags[0]} tool has the best features`);
    queries.push(`Which companies use ${category} AI tools`);

    return queries;
  }

  /**
   * Generate command queries for voice assistants
   */
  private generateCommandQueries(node: KnowledgeNode): string[] {
    const queries: string[] = [];
    const category = node.category.toLowerCase();
    const tags = node.tags.map(tag => tag.toLowerCase());

    // Direct commands
    queries.push(`Open ${category} AI tools`);
    queries.push(`Start ${tags[0]} tool`);
    queries.push(`Launch ${category} software`);

    // Search commands
    queries.push(`Search for ${category} AI tools`);
    queries.push(`Find ${tags[0]} tools`);
    queries.push(`Look up ${category} AI software`);

    // Navigation commands
    queries.push(`Take me to ${category} tools`);
    queries.push(`Navigate to ${tags[0]} section`);
    queries.push(`Show me ${category} AI tools page`);

    // Action commands
    queries.push(`Compare ${category} AI tools`);
    queries.push(`Review ${tags[0]} tools`);
    queries.push(`Analyze ${category} AI software`);

    return queries;
  }

  /**
   * Generate local queries for geo-targeted voice search
   */
  private generateLocalQueries(node: KnowledgeNode): string[] {
    const queries: string[] = [];
    const category = node.category.toLowerCase();
    const tags = node.tags.map(tag => tag.toLowerCase());

    // Location-based queries
    queries.push(`${category} AI tools near me`);
    queries.push(`find ${tags[0]} tools in my area`);
    queries.push(`local ${category} AI software providers`);

    // Service-based queries
    queries.push(`${category} AI consulting services nearby`);
    queries.push(`${tags[0]} implementation services`);
    queries.push(`AI ${category} experts in my city`);

    // Event-based queries
    queries.push(`${category} AI workshops near me`);
    queries.push(`${tags[0]} training events`);
    queries.push(`AI ${category} conferences locally`);

    return queries;
  }

  /**
   * Generate conversational schema for voice search
   */
  generateConversationalSchema(node: KnowledgeNode): ConversationalSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Conversation',
      name: node.title,
      text: this.extractConversationalAnswer(node),
      dateCreated: node.publishedAt,
      author: {
        '@type': 'Organization',
        name: 'AI Vault'
      },
      abstract: node.excerpt,
      speaksTo: {
        '@type': 'Audience',
        name: this.mapAudience(node.targetAudience)
      },
      about: node.tags.map(tag => ({
        '@type': 'Thing',
        name: tag
      }))
    };
  }

  /**
   * Extract conversational answer from content
   */
  private extractConversationalAnswer(node: KnowledgeNode): string {
    // Extract the most relevant paragraph for voice search
    const sentences = node.content.split('.').filter(s => s.trim().length > 20);
    
    // Find sentences with question words or direct answers
    const answerSentences = sentences.filter(sentence => 
      sentence.toLowerCase().includes('is') ||
      sentence.toLowerCase().includes('are') ||
      sentence.toLowerCase().includes('can') ||
      sentence.toLowerCase().includes('will') ||
      sentence.toLowerCase().includes('helps') ||
      sentence.toLowerCase().includes('provides')
    );

    // Return the first suitable answer or the first paragraph
    const answer = answerSentences[0] || sentences[0];
    return answer.trim() + '.';
  }

  /**
   * Map target audience to conversational audience
   */
  private mapAudience(targetAudience: string[]): string {
    if (targetAudience.includes('Developers')) return 'Software Developers and Engineers';
    if (targetAudience.includes('Content Creators')) return 'Content Creators and Marketers';
    if (targetAudience.includes('Business')) return 'Business Professionals and Entrepreneurs';
    if (targetAudience.includes('Designers')) return 'Designers and Creative Professionals';
    if (targetAudience.includes('Analysts')) return 'Data Analysts and Researchers';
    return 'AI Enthusiasts and Technology Professionals';
  }

  /**
   * Generate snippet bait for featured snippets
   */
  generateSnippetBait(node: KnowledgeNode): SnippetBait[] {
    const snippets: SnippetBait[] = [];

    // Definition snippet
    snippets.push({
      title: `What is ${node.title}?`,
      description: this.extractDefinition(node),
      format: 'definition',
      keywords: ['what is', 'definition', 'meaning'],
      wordCount: 50,
      readabilityScore: 0.9
    });

    // List snippet
    snippets.push({
      title: `Top ${node.tags.length} ${node.category} AI Tools`,
      description: this.extractKeyPoints(node),
      format: 'list',
      keywords: ['top', 'best', 'list'],
      wordCount: 100,
      readabilityScore: 0.85
    });

    // How-to snippet
    snippets.push({
      title: `How to Use ${node.title}`,
      description: this.extractHowTo(node),
      format: 'paragraph',
      keywords: ['how to', 'steps', 'guide'],
      wordCount: 75,
      readabilityScore: 0.88
    });

    // Comparison snippet
    snippets.push({
      title: `${node.title} vs Alternatives`,
      description: this.extractComparison(node),
      format: 'table',
      keywords: ['vs', 'comparison', 'alternative'],
      wordCount: 60,
      readabilityScore: 0.82
    });

    return snippets;
  }

  /**
   * Extract definition from content
   */
  private extractDefinition(node: KnowledgeNode): string {
    const sentences = node.content.split('.').filter(s => s.trim().length > 20);
    
    // Look for definition patterns
    const definitionPatterns = [
      /is (a|an) [^.]+/,
      /refers to [^.]+/,
      /can be defined as [^.]+/,
      /means [^.]+/
    ];

    for (const sentence of sentences) {
      for (const pattern of definitionPatterns) {
        if (pattern.test(sentence.toLowerCase())) {
          return sentence.trim() + '.';
        }
      }
    }

    // Fallback to first paragraph
    return sentences[0].trim() + '.';
  }

  /**
   * Extract key points for list snippet
   */
  private extractKeyPoints(node: KnowledgeNode): string {
    // Look for numbered lists or bullet points
    const listPattern = /\d+\.\s+([^.]+)/g;
    const matches = node.content.match(listPattern);
    
    if (matches && matches.length >= 3) {
      return matches.slice(0, 5).join(' ');
    }

    // Extract key sentences
    const sentences = node.content.split('.').filter(s => s.trim().length > 20);
    return sentences.slice(0, 3).join('. ') + '.';
  }

  /**
   * Extract how-to steps
   */
  private extractHowTo(node: KnowledgeNode): string {
    const howToPatterns = [
      /step \d+[:\s]+([^.]+)/gi,
      /first[:\s]+([^.]+)/i,
      /next[:\s]+([^.]+)/i,
      /then[:\s]+([^.]+)/i,
      /finally[:\s]+([^.]+)/i
    ];

    for (const pattern of howToPatterns) {
      const matches = node.content.match(pattern);
      if (matches && matches.length > 0) {
        return matches[0].trim() + '.';
      }
    }

    // Fallback to content with action words
    const actionSentences = node.content.split('.').filter(s => 
      s.toLowerCase().includes('you can') ||
      s.toLowerCase().includes('to use') ||
      s.toLowerCase().includes('start by')
    );

    return actionSentences[0]?.trim() + '.' || node.excerpt;
  }

  /**
   * Extract comparison points
   */
  private extractComparison(node: KnowledgeNode): string {
    if (node.comparisonTools && node.comparisonTools.length > 0) {
      const tools = node.comparisonTools.slice(0, 3);
      return tools.map(tool => `${tool.name}: ${tool.description}`).join(' | ');
    }

    // Look for comparison language
    const comparisonPatterns = [
      /compared to [^.]+/gi,
      /better than [^.]+/gi,
      /similar to [^.]+/gi,
      /unlike [^.]+/gi
    ];

    for (const pattern of comparisonPatterns) {
      const matches = node.content.match(pattern);
      if (matches && matches.length > 0) {
        return matches[0].trim() + '.';
      }
    }

    return `${node.title} offers unique features for ${node.category} tasks.`;
  }

  /**
   * Generate voice search FAQ schema
   */
  generateVoiceSearchFAQ(node: KnowledgeNode): Array<{ question: string; answer: string }> {
    const faqs: Array<{ question: string; answer: string }> = [];

    // Use existing FAQs if available
    if (node.faqs) {
      faqs.push(...node.faqs);
    }

    // Generate voice-specific FAQs
    const voiceFAQs = [
      {
        question: `What is ${node.title} and how does it work?`,
        answer: this.extractDefinition(node)
      },
      {
        question: `Who should use ${node.title}?`,
        answer: `${node.title} is ideal for ${this.mapAudience(node.targetAudience).toLowerCase()} looking to enhance their ${node.category.toLowerCase()} capabilities with AI.`
      },
      {
        question: `What are the main benefits of ${node.title}?`,
        answer: this.extractKeyPoints(node)
      },
      {
        question: `How do I get started with ${node.title}?`,
        answer: this.extractHowTo(node)
      },
      {
        question: `Is ${node.title} suitable for ${node.difficulty} users?`,
        answer: `Yes, ${node.title} is designed with ${node.difficulty} users in mind, offering an intuitive interface and comprehensive support.`
      }
    ];

    faqs.push(...voiceFAQs);

    return faqs;
  }

  /**
   * Generate voice search optimized meta tags
   */
  generateVoiceSearchMetaTags(node: KnowledgeNode): {
    title: string;
    description: string;
    speakable: Array<{ '@type': string; cssSelector: string }>;
  } {
    return {
      title: `${node.title} - Complete Guide | AI Vault`,
      description: `Discover everything about ${node.title.toLowerCase()}. Learn how it works, who should use it, and why it's perfect for ${this.mapAudience(node.targetAudience).toLowerCase()}.`,
      speakable: [
        {
          '@type': 'SpeakableSpecification',
          cssSelector: 'h1'
        },
        {
          '@type': 'SpeakableSpecification',
          cssSelector: '.article-content p:first-of-type'
        }
      ]
    };
  }
}
