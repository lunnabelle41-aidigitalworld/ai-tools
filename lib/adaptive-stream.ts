interface UserProfile {
  id: string;
  browsingHistory: string[];
  interests: string[];
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  role: 'founder' | 'developer' | 'designer' | 'analyst' | 'other';
  engagementMetrics: {
    avgReadTime: number;
    preferredCategories: string[];
    preferredContentLength: 'short' | 'medium' | 'long';
    timeOfDayEngagement: number[];
  };
}

interface KnowledgeNode {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;
  engagementScore: number;
  trending: boolean;
  slug: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  linkedTools?: Array<{
    id: string;
    name: string;
    url?: string;
  }>;
  faqs?: Array<{ question: string; answer: string }>;
  howToSteps?: Array<{
    '@type': string;
    name: string;
    text: string;
  }>;
  comparisonTools?: Array<{
    name: string;
    description: string;
    category: string;
    platform: string;
    pricing?: string;
  }>;
  semanticEmbedding: number[];
  targetAudience: string[];
}

interface StreamRankingFactors {
  userProfileRelevance: number;
  trendingScore: number;
  recencyScore: number;
  engagementScore: number;
  serendipityScore: number;
  diversityScore: number;
}

class AdaptiveStreamAlgorithm {
  private userProfile: UserProfile;
  private industryTrends: Map<string, number>;
  private contentDiversity: Map<string, number>;

  constructor(userProfile: UserProfile) {
    this.userProfile = userProfile;
    this.industryTrends = new Map();
    this.contentDiversity = new Map();
    this.initializeTrends();
  }

  private initializeTrends() {
    // Simulated industry trends (in real app, this would come from real-time data)
    this.industryTrends.set('AI', 0.95);
    this.industryTrends.set('Cybersecurity', 0.87);
    this.industryTrends.set('Development', 0.82);
    this.industryTrends.set('Analytics', 0.78);
    this.industryTrends.set('Blockchain', 0.65);
    this.industryTrends.set('IoT', 0.58);
  }

  /**
   * Calculate relevance score based on user profile
   */
  private calculateUserProfileRelevance(node: KnowledgeNode): number {
    let score = 0;
    const weights = {
      category: 0.3,
      tags: 0.25,
      difficulty: 0.2,
      targetAudience: 0.15,
      contentLength: 0.1
    };

    // Category relevance
    if (this.userProfile.engagementMetrics.preferredCategories.includes(node.category)) {
      score += weights.category;
    }

    // Tag relevance
    const matchingTags = node.tags.filter(tag => this.userProfile.interests.includes(tag));
    score += (matchingTags.length / Math.max(node.tags.length, 1)) * weights.tags;

    // Difficulty appropriateness
    if (node.difficulty === this.userProfile.skillLevel) {
      score += weights.difficulty;
    } else if (this.isAdjacentDifficulty(node.difficulty, this.userProfile.skillLevel)) {
      score += weights.difficulty * 0.5;
    }

    // Target audience match
    if (node.targetAudience.includes(this.userProfile.role)) {
      score += weights.targetAudience;
    }

    // Content length preference
    const preferredLength = this.userProfile.engagementMetrics.preferredContentLength;
    const nodeLength = this.categorizeReadTime(node.readTime);
    if (nodeLength === preferredLength) {
      score += weights.contentLength;
    }

    return Math.min(score, 1);
  }

  /**
   * Calculate trending score based on real-time data
   */
  private calculateTrendingScore(node: KnowledgeNode): number {
    if (node.trending) {
      return 100;
    }
    
    // Calculate trending based on engagement score
    if (node.engagementScore > 80) {
      return 80;
    } else if (node.engagementScore > 60) {
      return 60;
    } else if (node.engagementScore > 40) {
      return 40;
    }
    
    return 20;
  }

  /**
   * Calculate recency score with intelligent decay
   */
  private calculateRecencyScore(node: KnowledgeNode): number {
    const now = new Date();
    const publishedDate = new Date(node.publishedAt);
    const daysAgo = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24));

    if (daysAgo === 0) return 1.0;
    if (daysAgo <= 7) return 0.9;
    if (daysAgo <= 30) return 0.7;
    if (daysAgo <= 90) return 0.5;
    if (daysAgo <= 365) return 0.3;
    return 0.1;
  }

  /**
   * Calculate engagement score based on user interactions
   */
  private calculateEngagementScore(node: KnowledgeNode): number {
    // In a real implementation, this would consider:
    // - Read completion rates
    // - Comment activity
    // - Share counts
    // - Time spent on article
    // - Bookmark saves
    
    return node.engagementScore;
  }

  /**
   * Calculate serendipity score for discovery
   */
  private calculateSerendipityScore(node: KnowledgeNode): number {
    const userCategories = new Set(this.userProfile.engagementMetrics.preferredCategories);
    const userTags = new Set(this.userProfile.interests);
    
    const novelCategories = !userCategories.has(node.category);
    const novelTags = node.tags.filter(tag => !userTags.has(tag)).length;
    
    // Higher score for content outside user's typical interests
    if (novelCategories && novelTags >= 2) {
      return 0.8; // High serendipity
    } else if (novelCategories || novelTags >= 1) {
      return 0.5; // Medium serendipity
    }
    
    return 0.1; // Low serendipity (familiar content)
  }

  /**
   * Calculate diversity score to ensure varied content
   */
  private calculateDiversityScore(recentNodes: KnowledgeNode[], currentNode: KnowledgeNode): number {
    const recentCategories = recentNodes.map(n => n.category);
    const categoryCount = recentCategories.filter(cat => cat === currentNode.category).length;
    
    // Penalize too much of the same category
    if (categoryCount === 0) return 1.0;
    if (categoryCount === 1) return 0.8;
    if (categoryCount === 2) return 0.5;
    return 0.2;
  }

  /**
   * Calculate semantic similarity using embeddings
   */
  private calculateSemanticSimilarity(nodeEmbedding: number[], recentEmbeddings: number[][]): number {
    if (recentEmbeddings.length === 0) return 1.0;

    // Calculate cosine similarity with recent content
    let totalSimilarity = 0;
    for (const embedding of recentEmbeddings) {
      const similarity = this.cosineSimilarity(nodeEmbedding, embedding);
      totalSimilarity += similarity;
    }

    const avgSimilarity = totalSimilarity / recentEmbeddings.length;
    
    // Return diversity score (inverse of similarity)
    return 1 - avgSimilarity;
  }

  /**
   * Main ranking algorithm
   */
  public rankStream(
    nodes: KnowledgeNode[], 
    recentNodes: KnowledgeNode[] = []
  ): KnowledgeNode[] {
    const rankedNodes = nodes.map(node => {
      const factors: StreamRankingFactors = {
        userProfileRelevance: this.calculateUserProfileRelevance(node),
        trendingScore: this.calculateTrendingScore(node),
        recencyScore: this.calculateRecencyScore(node),
        engagementScore: this.calculateEngagementScore(node),
        serendipityScore: this.calculateSerendipityScore(node),
        diversityScore: this.calculateDiversityScore(recentNodes, node)
      };

      // Dynamic weighting based on user behavior
      const weights = this.getDynamicWeights();
      
      // Calculate final score
      const finalScore = Object.entries(factors).reduce((total, [factor, score]) => {
        return total + score * weights[factor as keyof typeof weights];
      }, 0);

      return { ...node, score: finalScore, factors };
    });

    // Sort by score and return
    return rankedNodes.sort((a, b) => (b as any).score - (a as any).score) as KnowledgeNode[];
  }

  /**
   * Dynamic weighting based on user behavior patterns
   */
  private getDynamicWeights() {
    const baseWeights = {
      userProfileRelevance: 0.35,
      trendingScore: 0.20,
      recencyScore: 0.15,
      engagementScore: 0.15,
      serendipityScore: 0.10,
      diversityScore: 0.05
    };

    // Adjust weights based on user behavior
    const userEngagement = this.userProfile.engagementMetrics;
    
    // Power users get more trending content
    if (userEngagement.avgReadTime > 10) {
      baseWeights.trendingScore += 0.05;
      baseWeights.userProfileRelevance -= 0.05;
    }

    // New users get more diverse content
    if (this.userProfile.browsingHistory.length < 10) {
      baseWeights.serendipityScore += 0.10;
      baseWeights.diversityScore += 0.05;
      baseWeights.userProfileRelevance -= 0.15;
    }

    // Adjust for time of day
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 17) {
      // Business hours - more professional content
      baseWeights.userProfileRelevance += 0.05;
      baseWeights.serendipityScore -= 0.05;
    }

    return baseWeights;
  }

  /**
   * Helper methods
   */
  private isAdjacentDifficulty(diff1: string, diff2: string): boolean {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const idx1 = levels.indexOf(diff1);
    const idx2 = levels.indexOf(diff2);
    return Math.abs(idx1 - idx2) === 1;
  }

  private categorizeReadTime(minutes: number): 'short' | 'medium' | 'long' {
    if (minutes <= 5) return 'short';
    if (minutes <= 15) return 'medium';
    return 'long';
  }

  private calculateTimeDecay(publishedAt: string): number {
    const now = new Date();
    const published = new Date(publishedAt);
    const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
    
    // Exponential decay
    return Math.exp(-hoursAgo / 168); // Half-life of 1 week
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Update user profile based on interactions
   */
  public updateUserProfile(interaction: {
    nodeId: string;
    action: 'read' | 'like' | 'share' | 'comment' | 'bookmark';
    timeSpent?: number;
    completed?: boolean;
  }) {
    // Update engagement metrics
    if (interaction.timeSpent) {
      const currentAvg = this.userProfile.engagementMetrics.avgReadTime;
      const newAvg = (currentAvg * 0.9) + (interaction.timeSpent * 0.1);
      this.userProfile.engagementMetrics.avgReadTime = newAvg;
    }

    // Update browsing history
    this.userProfile.browsingHistory.push(interaction.nodeId);
    if (this.userProfile.browsingHistory.length > 100) {
      this.userProfile.browsingHistory.shift();
    }

    // In a real implementation, this would update interests, preferences, etc.
  }

  /**
   * Get personalized recommendations
   */
  public getRecommendations(nodes: KnowledgeNode[], count: number = 10): KnowledgeNode[] {
    const ranked = this.rankStream(nodes);
    return ranked.slice(0, count);
  }
}

export default AdaptiveStreamAlgorithm;
export type { UserProfile, KnowledgeNode, StreamRankingFactors };
