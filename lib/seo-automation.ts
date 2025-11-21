import { KnowledgeNode } from './adaptive-stream';
import StructuredDataFabric from './structured-data-fabric';

export interface SEOScore {
  overall: number;
  readability: number;
  keywordDensity: number;
  semanticRelevance: number;
  competitorGap: number;
  answerIntent: number;
  technical: number;
}

export interface SEORecommendation {
  type: 'critical' | 'warning' | 'suggestion';
  category: 'content' | 'technical' | 'meta' | 'structure';
  title: string;
  description: string;
  action: string;
  impact: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export interface MetaTags {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  canonical: string;
  robots: string;
  keywords: string[];
}

export interface VoiceSearchOptimization {
  conversationalQueries: string[];
  featuredSnippetBait: string[];
  questionAnswerPairs: Array<{
    question: string;
    answer: string;
    context: string;
  }>;
  naturalLanguageVariants: string[];
}

export class SEOAutomationEngine {
  private structuredDataFabric: StructuredDataFabric;
  private openaiClient: any; // In production, initialize with actual API key

  constructor() {
    this.structuredDataFabric = new StructuredDataFabric();
    // this.openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Real-time SEO scoring for content
   */
  async analyzeContentSEO(content: string, title: string, targetKeywords: string[]): Promise<SEOScore> {
    const scores = {
      readability: this.calculateReadabilityScore(content),
      keywordDensity: this.calculateKeywordDensity(content, targetKeywords),
      semanticRelevance: await this.calculateSemanticRelevance(content, targetKeywords),
      competitorGap: await this.analyzeCompetitorGap(content, targetKeywords),
      answerIntent: this.calculateAnswerIntentScore(content),
      technical: this.calculateTechnicalScore(content, title)
    };

    const overall = Object.values(scores).reduce((sum, score) => sum + score, 0) / Object.keys(scores).length;

    return {
      overall: Math.round(overall),
      ...scores
    };
  }

  /**
   * Generate SEO recommendations
   */
  async generateRecommendations(
    content: string,
    title: string,
    targetKeywords: string[],
    currentScore: SEOScore
  ): Promise<SEORecommendation[]> {
    const recommendations: SEORecommendation[] = [];

    // Content recommendations
    if (currentScore.readability < 70) {
      recommendations.push({
        type: 'warning',
        category: 'content',
        title: 'Improve Readability',
        description: 'Content readability score is below optimal range',
        action: 'Break down long sentences, use simpler language, add more transition words',
        impact: 'medium',
        estimatedTime: '15 minutes'
      });
    }

    if (currentScore.keywordDensity < 1.5) {
      recommendations.push({
        type: 'critical',
        category: 'content',
        title: 'Increase Keyword Density',
        description: 'Target keywords are not sufficiently represented in content',
        action: `Naturally incorporate: ${targetKeywords.join(', ')}`,
        impact: 'high',
        estimatedTime: '30 minutes'
      });
    }

    if (currentScore.answerIntent < 60) {
      recommendations.push({
        type: 'suggestion',
        category: 'content',
        title: 'Add Answer-Intent Content',
        description: 'Content lacks clear answers to user questions',
        action: 'Add FAQ section and direct answers to common questions',
        impact: 'medium',
        estimatedTime: '20 minutes'
      });
    }

    // Technical recommendations
    if (currentScore.technical < 80) {
      recommendations.push({
        type: 'warning',
        category: 'technical',
        title: 'Technical SEO Issues',
        description: 'Content has technical SEO optimization opportunities',
        action: 'Add structured data, optimize headings, improve internal linking',
        impact: 'high',
        estimatedTime: '45 minutes'
      });
    }

    return recommendations;
  }

  /**
   * Generate optimized meta tags
   */
  async generateMetaTags(
    content: string,
    title: string,
    targetKeywords: string[],
    url: string
  ): Promise<MetaTags> {
    const optimizedTitle = await this.optimizeTitle(title, targetKeywords);
    const optimizedDescription = await this.optimizeDescription(content, targetKeywords);

    return {
      title: optimizedTitle,
      description: optimizedDescription,
      ogTitle: optimizedTitle,
      ogDescription: optimizedDescription,
      ogImage: `${new URL(url).origin}/api/og/${url.split('/').pop()}`,
      twitterTitle: optimizedTitle,
      twitterDescription: optimizedDescription,
      twitterImage: `${new URL(url).origin}/api/og/${url.split('/').pop()}`,
      canonical: url,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      keywords: targetKeywords
    };
  }

  /**
   * Voice search optimization
   */
  async optimizeForVoiceSearch(content: string, targetKeywords: string[]): Promise<VoiceSearchOptimization> {
    const conversationalQueries = await this.generateConversationalQueries(targetKeywords);
    const featuredSnippetBait = this.extractFeaturedSnippetBait(content);
    const questionAnswerPairs = await this.generateQuestionAnswerPairs(content);
    const naturalLanguageVariants = await this.generateNaturalLanguageVariants(targetKeywords);

    return {
      conversationalQueries,
      featuredSnippetBait,
      questionAnswerPairs,
      naturalLanguageVariants
    };
  }

  /**
   * Generate FAQ content from article
   */
  async generateFAQFromContent(content: string, title: string): Promise<Array<{ question: string; answer: string }>> {
    // In production, use AI to analyze content and generate relevant FAQs
    const mockFAQs = [
      {
        question: `What are the key benefits of ${title.toLowerCase()}?`,
        answer: this.extractKeyBenefits(content)
      },
      {
        question: `How does ${title.toLowerCase()} compare to alternatives?`,
        answer: this.extractComparisonPoints(content)
      },
      {
        question: `What are the main challenges with ${title.toLowerCase()}?`,
        answer: this.extractChallenges(content)
      },
      {
        question: `Who should use ${title.toLowerCase()}?`,
        answer: this.extractTargetAudience(content)
      },
      {
        question: `What are the best practices for ${title.toLowerCase()}?`,
        answer: this.extractBestPractices(content)
      }
    ];

    return mockFAQs.filter(faq => faq.answer.length > 50);
  }

  /**
   * Generate content variations for different answer engines
   */
  async generateAnswerVariations(content: string, targetKeywords: string[]): Promise<{
    featuredSnippet: string;
    peopleAlsoAsk: string;
    comprehensiveAnswer: string;
    visualAnswer: string;
  }> {
    const featuredSnippet = this.generateFeaturedSnippet(content, targetKeywords);
    const peopleAlsoAsk = await this.generatePeopleAlsoAsk(content, targetKeywords);
    const comprehensiveAnswer = this.generateComprehensiveAnswer(content);
    const visualAnswer = this.generateVisualAnswer(content);

    return {
      featuredSnippet,
      peopleAlsoAsk,
      comprehensiveAnswer,
      visualAnswer
    };
  }

  /**
   * Monitor SEO performance
   */
  async monitorSEOPerformance(url: string): Promise<{
    rankings: Array<{ keyword: string; position: number; url: string; change: number }>;
    featuredSnippets: Array<{ query: string; position: number; url: string }>;
    coreWebVitals: { lcp: number; fid: number; cls: number };
    indexStatus: string;
    crawlErrors: string[];
  }> {
    // In production, integrate with Google Search Console API
    return {
      rankings: [
        { keyword: 'ai tools', position: 12, url, change: +3 },
        { keyword: 'artificial intelligence software', position: 8, url, change: -1 },
        { keyword: 'machine learning platforms', position: 15, url, change: +5 }
      ],
      featuredSnippets: [
        { query: 'best ai tools for developers', position: 0, url },
        { query: 'ai productivity software comparison', position: 1, url }
      ],
      coreWebVitals: {
        lcp: 1.8,
        fid: 45,
        cls: 0.08
      },
      indexStatus: 'Indexed',
      crawlErrors: []
    };
  }

  /**
   * Content refresh automation
   */
  async analyzeContentFreshness(node: KnowledgeNode): Promise<{
    needsUpdate: boolean;
    updatePriority: 'low' | 'medium' | 'high';
    suggestedUpdates: string[];
    competitorContent: Array<{
      title: string;
      url: string;
      publishedAt: string;
      keyPoints: string[];
    }>;
  }> {
    const daysSinceUpdate = this.getDaysSince(node.updatedAt || node.publishedAt);
    const needsUpdate = daysSinceUpdate > 90; // Update content older than 90 days
    
    const suggestedUpdates = [];
    
    if (daysSinceUpdate > 180) {
      suggestedUpdates.push('Content is significantly outdated - major refresh needed');
      suggestedUpdates.push('Update statistics and recent developments');
      suggestedUpdates.push('Add new tools and technologies mentioned');
    } else if (daysSinceUpdate > 90) {
      suggestedUpdates.push('Add recent industry developments');
      suggestedUpdates.push('Update tool pricing and features');
    }

    return {
      needsUpdate,
      updatePriority: daysSinceUpdate > 180 ? 'high' : daysSinceUpdate > 90 ? 'medium' : 'low',
      suggestedUpdates,
      competitorContent: await this.getCompetitorContent(node.tags)
    };
  }

  /**
   * Private helper methods
   */
  private calculateReadabilityScore(content: string): number {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = content.split(/\s+/).filter(w => w.length > 0);
    const avgWordsPerSentence = words.length / sentences.length;
    
    // Flesch Reading Ease simplified calculation
    const avgSyllables = words.reduce((sum, word) => sum + this.countSyllables(word), 0) / words.length;
    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllables);
    
    return Math.min(100, Math.max(0, score));
  }

  private countSyllables(word: string): number {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    const matches = word.match(/[aeiouy]{1,2}/g);
    return matches ? matches.length : 1;
  }

  private calculateKeywordDensity(content: string, keywords: string[]): number {
    const words = content.toLowerCase().split(/\s+/);
    const keywordCount = keywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword.toLowerCase(), 'gi');
      const matches = content.toLowerCase().match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    
    return (keywordCount / words.length) * 100;
  }

  private async calculateSemanticRelevance(content: string, keywords: string[]): Promise<number> {
    // In production, use AI to analyze semantic relevance
    const contentLower = content.toLowerCase();
    const relevantTerms = ['ai', 'artificial intelligence', 'machine learning', 'automation', 'software'];
    const termMatches = relevantTerms.filter(term => contentLower.includes(term)).length;
    
    return (termMatches / relevantTerms.length) * 100;
  }

  private async analyzeCompetitorGap(content: string, keywords: string[]): Promise<number> {
    // In production, analyze competitor content
    return 75; // Mock score
  }

  private calculateAnswerIntentScore(content: string): number {
    const answerIndicators = [
      'here are', 'the following', 'steps to', 'how to', 'what is', 
      'why you should', 'benefits of', 'advantages of', 'disadvantages of'
    ];
    
    const contentLower = content.toLowerCase();
    const matches = answerIndicators.filter(indicator => contentLower.includes(indicator)).length;
    
    return (matches / answerIndicators.length) * 100;
  }

  private calculateTechnicalScore(content: string, title: string): number {
    let score = 0;
    
    // Heading structure
    if (content.includes('<h1>') || content.match(/^#\s/)) score += 20;
    if (content.includes('<h2>') || content.match(/^##\s/)) score += 15;
    if (content.includes('<h3>') || content.match(/^###\s/)) score += 10;
    
    // Content length
    if (content.length > 300) score += 15;
    if (content.length > 1000) score += 10;
    
    // Title optimization
    if (title.length >= 30 && title.length <= 60) score += 15;
    if (title.toLowerCase().includes('ai') || title.toLowerCase().includes('tools')) score += 15;
    
    return Math.min(100, score);
  }

  private async optimizeTitle(title: string, keywords: string[]): Promise<string> {
    // In production, use AI to optimize title
    if (keywords.some(keyword => title.toLowerCase().includes(keyword.toLowerCase()))) {
      return title;
    }
    
    return `${keywords[0]}: ${title}`;
  }

  private async optimizeDescription(content: string, keywords: string[]): Promise<string> {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let description = sentences.slice(0, 2).join('. ').trim();
    
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }
    
    return description;
  }

  private async generateConversationalQueries(keywords: string[]): Promise<string[]> {
    return keywords.map(keyword => [
      `What are the best ${keyword}?`,
      `How do I use ${keyword}?`,
      `Can you recommend ${keyword}?`,
      `Tell me about ${keyword}`
    ]).flat();
  }

  private extractFeaturedSnippetBait(content: string): string[] {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences
      .filter(sentence => 
        sentence.length > 40 && 
        sentence.length < 120 &&
        /^here are|^the following|^steps to|^how to|^what is|^why you should|^benefits of/i.test(sentence)
      )
      .slice(0, 5);
  }

  private async generateQuestionAnswerPairs(content: string): Promise<Array<{ question: string; answer: string; context: string }>> {
    // In production, use AI to generate Q&A pairs
    return [
      {
        question: "What are the main benefits?",
        answer: "The main benefits include increased productivity, cost savings, and improved efficiency.",
        context: "introduction"
      },
      {
        question: "How does it work?",
        answer: "It works by automating repetitive tasks and providing intelligent suggestions.",
        context: "technical explanation"
      }
    ];
  }

  private async generateNaturalLanguageVariants(keywords: string[]): Promise<string[]> {
    return keywords.map(keyword => [
      `tell me about ${keyword}`,
      `show me ${keyword}`,
      `I need help with ${keyword}`,
      `what's the best ${keyword}`,
      `${keyword} recommendations`
    ]).flat();
  }

  private extractKeyBenefits(content: string): string {
    const benefitKeywords = ['benefit', 'advantage', 'improve', 'increase', 'reduce', 'save'];
    const sentences = content.split(/[.!?]+/);
    const benefitSentences = sentences.filter(sentence => 
      benefitKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    return benefitSentences.slice(0, 2).join('. ').trim() || 'This solution offers significant improvements in efficiency and productivity.';
  }

  private extractComparisonPoints(content: string): string {
    const comparisonKeywords = ['compare', 'versus', 'instead of', 'alternative', 'better than'];
    const sentences = content.split(/[.!?]+/);
    const comparisonSentences = sentences.filter(sentence => 
      comparisonKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    return comparisonSentences.slice(0, 2).join('. ').trim() || 'Compared to alternatives, this solution offers better performance and cost-effectiveness.';
  }

  private extractChallenges(content: string): string {
    const challengeKeywords = ['challenge', 'difficulty', 'problem', 'issue', 'limitation'];
    const sentences = content.split(/[.!?]+/);
    const challengeSentences = sentences.filter(sentence => 
      challengeKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    return challengeSentences.slice(0, 2).join('. ').trim() || 'The main challenges include initial setup complexity and learning curve.';
  }

  private extractTargetAudience(content: string): string {
    const audienceKeywords = ['for', 'who', 'user', 'developer', 'business', 'team'];
    const sentences = content.split(/[.!?]+/);
    const audienceSentences = sentences.filter(sentence => 
      audienceKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    return audienceSentences.slice(0, 2).join('. ').trim() || 'This solution is ideal for developers and businesses looking to improve their workflow.';
  }

  private extractBestPractices(content: string): string {
    const practiceKeywords = ['best practice', 'recommend', 'should', 'optimal', 'effective'];
    const sentences = content.split(/[.!?]+/);
    const practiceSentences = sentences.filter(sentence => 
      practiceKeywords.some(keyword => sentence.toLowerCase().includes(keyword))
    );
    
    return practiceSentences.slice(0, 2).join('. ').trim() || 'Best practices include starting with a clear plan and gradually implementing features.';
  }

  private generateFeaturedSnippet(content: string, keywords: string[]): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const targetSentence = sentences.find(sentence => 
      sentence.length > 40 && 
      sentence.length < 120 &&
      keywords.some(keyword => sentence.toLowerCase().includes(keyword.toLowerCase()))
    );
    
    return targetSentence || sentences[0] || '';
  }

  private async generatePeopleAlsoAsk(content: string, keywords: string[]): Promise<string> {
    return `People also ask about ${keywords.join(', ')} including implementation details, pricing, and alternatives.`;
  }

  private generateComprehensiveAnswer(content: string): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.slice(0, 5).join('. ').trim();
  }

  private generateVisualAnswer(content: string): string {
    return 'This can be visualized through interactive charts showing performance metrics and comparison data.';
  }

  private getDaysSince(dateString: string): number {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private async getCompetitorContent(tags: string[]): Promise<Array<{ title: string; url: string; publishedAt: string; keyPoints: string[] }>> {
    // In production, scrape competitor content
    return [
      {
        title: 'Complete Guide to AI Tools 2024',
        url: 'https://competitor.com/ai-tools-guide',
        publishedAt: '2024-10-15',
        keyPoints: ['Latest AI trends', 'Tool comparisons', 'Implementation tips']
      },
      {
        title: 'AI Software Comparison',
        url: 'https://another-competitor.com/ai-comparison',
        publishedAt: '2024-11-01',
        keyPoints: ['Pricing analysis', 'Feature breakdown', 'User reviews']
      }
    ];
  }
}

export default SEOAutomationEngine;
