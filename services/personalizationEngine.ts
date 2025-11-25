/**
 * Advanced search result personalization engine
 */

// User profile interface
export interface UserProfile {
  id: string;
  preferences: {
    categories: string[];
    tags: string[];
    contentTypes: string[];
    ratingThreshold: number;
    priceRange?: { min?: number; max?: number };
  };
  behavior: {
    searchHistory: Array<{
      query: string;
      timestamp: number;
      resultsClicked: string[];
      timeSpent: number;
    }>;
    favoriteResults: string[];
    skippedResults: string[];
    feedback: Array<{
      resultId: string;
      rating: number;
      timestamp: number;
    }>;
  };
  demographics?: {
    industry?: string;
    role?: string;
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    companySize?: 'small' | 'medium' | 'large' | 'enterprise';
  };
  context?: {
    deviceType?: 'desktop' | 'mobile' | 'tablet';
    timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'night';
    location?: string;
    currentTask?: string;
  };
}

// Personalization factors
export interface PersonalizationFactors {
  userProfile: number;     // 0-1 weight for user profile matching
  behavior: number;        // 0-1 weight for behavioral data
  context: number;         // 0-1 weight for contextual factors
  recency: number;         // 0-1 weight for recency of interactions
  popularity: number;      // 0-1 weight for general popularity
  diversity: number;       // 0-1 weight for result diversity
}

// Default personalization factors
const defaultFactors: PersonalizationFactors = {
  userProfile: 0.3,
  behavior: 0.25,
  context: 0.15,
  recency: 0.1,
  popularity: 0.1,
  diversity: 0.1
};

// In-memory storage for user profiles
const userProfiles = new Map<string, UserProfile>();

// Content metadata for personalization
export interface ContentMetadata {
  id: string;
  categories: string[];
  tags: string[];
  contentType: string;
  rating: number;
  price?: number;
  popularityScore: number;
  createdAt: Date;
  updatedAt: Date;
  features: string[];
  targetAudience: string[];
}

// Personalized result
export interface PersonalizedResult {
  id: string;
  score: number;
  factors: {
    userProfileMatch: number;
    behavioralBoost: number;
    contextualBoost: number;
    recencyBoost: number;
    popularityBoost: number;
    diversityBoost: number;
  };
  explanation: string;
}

/**
 * Create or update a user profile
 */
export function createUserProfile(userId: string, profileData: Partial<UserProfile> = {}): UserProfile {
  const existingProfile = userProfiles.get(userId);
  
  const profile: UserProfile = {
    id: userId,
    preferences: {
      categories: profileData.preferences?.categories || [],
      tags: profileData.preferences?.tags || [],
      contentTypes: profileData.preferences?.contentTypes || [],
      ratingThreshold: profileData.preferences?.ratingThreshold || 0,
      priceRange: profileData.preferences?.priceRange
    },
    behavior: {
      searchHistory: profileData.behavior?.searchHistory || [],
      favoriteResults: profileData.behavior?.favoriteResults || [],
      skippedResults: profileData.behavior?.skippedResults || [],
      feedback: profileData.behavior?.feedback || []
    },
    demographics: profileData.demographics,
    context: profileData.context
  };
  
  userProfiles.set(userId, profile);
  return profile;
}

/**
 * Get a user profile
 */
export function getUserProfile(userId: string): UserProfile | undefined {
  return userProfiles.get(userId);
}

/**
 * Update user preferences
 */
export function updateUserPreferences(userId: string, preferences: Partial<UserProfile['preferences']>): void {
  const profile = userProfiles.get(userId);
  if (profile) {
    profile.preferences = { ...profile.preferences, ...preferences };
    userProfiles.set(userId, profile);
  } else {
    createUserProfile(userId, { preferences: preferences as UserProfile['preferences'] });
  }
}

/**
 * Record user behavior
 */
export function recordUserBehavior(
  userId: string,
  behavior: {
    query?: string;
    resultClicked?: string;
    timeSpent?: number;
    feedback?: { resultId: string; rating: number };
  }
): void {
  const profile = userProfiles.get(userId);
  if (!profile) {
    createUserProfile(userId);
    return recordUserBehavior(userId, behavior);
  }
  
  // Record search history
  if (behavior.query) {
    profile.behavior.searchHistory.push({
      query: behavior.query,
      timestamp: Date.now(),
      resultsClicked: behavior.resultClicked ? [behavior.resultClicked] : [],
      timeSpent: behavior.timeSpent || 0
    });
    
    // Keep only last 100 searches
    if (profile.behavior.searchHistory.length > 100) {
      profile.behavior.searchHistory.shift();
    }
  }
  
  // Record result click
  if (behavior.resultClicked) {
    // Add to clicked results of the most recent search
    const lastSearch = profile.behavior.searchHistory[profile.behavior.searchHistory.length - 1];
    if (lastSearch && !lastSearch.resultsClicked.includes(behavior.resultClicked)) {
      lastSearch.resultsClicked.push(behavior.resultClicked);
    }
    
    // Update time spent if provided
    if (behavior.timeSpent) {
      lastSearch.timeSpent = (lastSearch.timeSpent || 0) + behavior.timeSpent;
    }
  }
  
  // Record feedback
  if (behavior.feedback) {
    profile.behavior.feedback.push({
      resultId: behavior.feedback.resultId,
      rating: behavior.feedback.rating,
      timestamp: Date.now()
    });
  }
  
  userProfiles.set(userId, profile);
}

/**
 * Calculate user profile match score
 */
function calculateUserProfileMatch(
  content: ContentMetadata,
  userProfile: UserProfile
): number {
  let score = 0;
  let maxScore = 0;
  
  // Category matching
  maxScore += 1;
  if (userProfile.preferences.categories.some(cat => 
    content.categories.includes(cat)
  )) {
    score += 1;
  }
  
  // Tag matching
  maxScore += 1;
  if (userProfile.preferences.tags.some(tag => 
    content.tags.includes(tag)
  )) {
    score += 1;
  }
  
  // Content type matching
  maxScore += 1;
  if (userProfile.preferences.contentTypes.includes(content.contentType)) {
    score += 1;
  }
  
  // Rating threshold
  maxScore += 1;
  if (content.rating >= userProfile.preferences.ratingThreshold) {
    score += 1;
  }
  
  // Price range matching
  if (userProfile.preferences.priceRange) {
    maxScore += 1;
    const { min, max } = userProfile.preferences.priceRange;
    if (content.price !== undefined) {
      if ((min === undefined || content.price >= min) && 
          (max === undefined || content.price <= max)) {
        score += 1;
      }
    } else {
      // If no price, assume it's acceptable
      score += 1;
    }
  }
  
  return maxScore > 0 ? score / maxScore : 0;
}

/**
 * Calculate behavioral boost
 */
function calculateBehavioralBoost(
  contentId: string,
  userProfile: UserProfile
): number {
  let boost = 0;
  
  // Favorite content boost
  if (userProfile.behavior.favoriteResults.includes(contentId)) {
    boost += 0.5;
  }
  
  // Recent interaction boost
  const recentInteractions = userProfile.behavior.searchHistory
    .filter(search => Date.now() - search.timestamp < 7 * 24 * 60 * 60 * 1000) // Last 7 days
    .flatMap(search => search.resultsClicked);
  
  if (recentInteractions.includes(contentId)) {
    boost += 0.3;
  }
  
  // Positive feedback boost
  const positiveFeedback = userProfile.behavior.feedback
    .filter(fb => fb.resultId === contentId && fb.rating >= 4);
  
  boost += positiveFeedback.length * 0.2;
  
  // Time spent boost
  const totalTimeSpent = userProfile.behavior.searchHistory
    .filter(search => search.resultsClicked.includes(contentId))
    .reduce((total, search) => total + search.timeSpent, 0);
  
  // Boost based on time spent (up to 0.3 for 5+ minutes)
  boost += Math.min(0.3, totalTimeSpent / (5 * 60 * 1000));
  
  return Math.min(1, boost); // Cap at 1.0
}

/**
 * Calculate contextual boost
 */
function calculateContextualBoost(
  content: ContentMetadata,
  userProfile: UserProfile
): number {
  if (!userProfile.context) return 0;
  
  let boost = 0;
  
  // Target audience matching
  if (userProfile.demographics?.industry) {
    if (content.targetAudience.includes(userProfile.demographics.industry)) {
      boost += 0.2;
    }
  }
  
  // Experience level matching
  if (userProfile.demographics?.experienceLevel) {
    // This would require content to have experience level metadata
    // For now, we'll assume a simple match
    boost += 0.1;
  }
  
  // Time of day preferences (simplified)
  if (userProfile.context.timeOfDay) {
    // Morning: Educational content
    // Afternoon: Productivity tools
    // Evening: Entertainment
    // Night: Quick tools
    boost += 0.1;
  }
  
  return Math.min(1, boost);
}

/**
 * Calculate recency boost
 */
function calculateRecencyBoost(content: ContentMetadata): number {
  const now = Date.now();
  const contentAge = now - content.createdAt.getTime();
  const maxAge = 365 * 24 * 60 * 60 * 1000; // 1 year
  
  // Newer content gets higher boost (0.5 to 1.0)
  return Math.max(0.5, 1 - (contentAge / maxAge));
}

/**
 * Calculate diversity boost
 */
function calculateDiversityBoost(
  content: ContentMetadata,
  results: ContentMetadata[],
  userProfile: UserProfile
): number {
  // Avoid too much similar content
  const similarContent = results.filter(result => 
    result.categories.some(cat => content.categories.includes(cat)) ||
    result.tags.some(tag => content.tags.includes(tag))
  );
  
  // Fewer similar items = higher diversity boost
  const similarityRatio = similarContent.length / results.length;
  return 1 - similarityRatio;
}

/**
 * Personalize search results for a specific user
 */
export async function personalizeResults(results: any[], userId: string): Promise<any[]> {
  // This is a simplified implementation
  // In a real system, you would use user preferences, history, and behavior
  
  // Add personalization boost to each result
  return results.map((result, index) => ({
    ...result,
    personalizationBoost: Math.random() * 0.5 // In a real implementation, this would be based on user preferences
  }));
}

// Export functions for external use
// personalizeResults is already exported directly

/**
 * Generate explanation for personalization
 */
function generateExplanation(
  factors: {
    userProfileMatch: number;
    behavioralBoost: number;
    contextualBoost: number;
    recencyBoost: number;
    popularityBoost: number;
    diversityBoost: number;
  },
  weights: PersonalizationFactors
): string {
  const explanations: string[] = [];
  
  if (factors.userProfileMatch * weights.userProfile > 0.1) {
    explanations.push('matches your preferences');
  }
  
  if (factors.behavioralBoost * weights.behavior > 0.1) {
    explanations.push('based on your past interactions');
  }
  
  if (factors.contextualBoost * weights.context > 0.05) {
    explanations.push('relevant to your current context');
  }
  
  if (factors.recencyBoost * weights.recency > 0.1) {
    explanations.push('recently added');
  }
  
  if (factors.popularityBoost * weights.popularity > 0.1) {
    explanations.push('popular among users');
  }
  
  if (factors.diversityBoost * weights.diversity > 0.1) {
    explanations.push('provides variety');
  }
  
  if (explanations.length === 0) {
    return 'based on general relevance';
  }
  
  return explanations.join(', ');
}

/**
 * Get personalized search suggestions
 */
export function getPersonalizedSuggestions(userId: string, count: number = 5): string[] {
  const userProfile = userProfiles.get(userId);
  if (!userProfile) return [];
  
  // Get popular queries from similar users
  const allProfiles = Array.from(userProfiles.values());
  const similarUsers = allProfiles.filter(profile => 
    profile.id !== userId &&
    profile.preferences.categories.some(cat => 
      userProfile.preferences.categories.includes(cat)
    )
  );
  
  // Extract queries from similar users
  const similarQueries = similarUsers
    .flatMap(user => user.behavior.searchHistory)
    .map(search => search.query)
    .filter(query => query.length > 2);
  
  // Count query frequencies
  const queryCounts = new Map<string, number>();
  similarQueries.forEach(query => {
    queryCounts.set(query, (queryCounts.get(query) || 0) + 1);
  });
  
  // Sort by frequency and return top queries
  return Array.from(queryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([query]) => query);
}

/**
 * Update user profile based on implicit feedback
 */
export function updateProfileFromImplicitFeedback(
  userId: string,
  resultId: string,
  interaction: 'view' | 'click' | 'skip' | 'dwell'
): void {
  const profile = userProfiles.get(userId);
  if (!profile) return;
  
  switch (interaction) {
    case 'click':
      // Add to favorites if clicked multiple times
      const clickCount = profile.behavior.searchHistory
        .filter(search => search.resultsClicked.includes(resultId))
        .length;
      
      if (clickCount >= 3 && !profile.behavior.favoriteResults.includes(resultId)) {
        profile.behavior.favoriteResults.push(resultId);
      }
      break;
      
    case 'skip':
      // Add to skipped if skipped multiple times
      if (!profile.behavior.skippedResults.includes(resultId)) {
        profile.behavior.skippedResults.push(resultId);
      }
      break;
      
    case 'dwell':
      // Increase time spent on result
      const lastSearch = profile.behavior.searchHistory[
        profile.behavior.searchHistory.length - 1
      ];
      if (lastSearch && lastSearch.resultsClicked.includes(resultId)) {
        lastSearch.timeSpent = (lastSearch.timeSpent || 0) + 30; // Assume 30s dwell time
      }
      break;
  }
  
  userProfiles.set(userId, profile);
}

/**
 * Get user personalization insights
 */
export function getUserInsights(userId: string): {
  preferredCategories: string[];
  preferredTags: string[];
  engagementLevel: 'low' | 'medium' | 'high';
  favoriteContentTypes: string[];
  recentActivity: number; // Number of interactions in last 7 days
} {
  const profile = userProfiles.get(userId);
  if (!profile) {
    return {
      preferredCategories: [],
      preferredTags: [],
      engagementLevel: 'low',
      favoriteContentTypes: [],
      recentActivity: 0
    };
  }
  
  // Calculate preferred categories based on interactions
  const categoryCounts = new Map<string, number>();
  profile.behavior.searchHistory.forEach(search => {
    // This would require content metadata to map results to categories
    // For now, we'll use profile preferences
    profile.preferences.categories.forEach(cat => {
      categoryCounts.set(cat, (categoryCounts.get(cat) || 0) + 1);
    });
  });
  
  const preferredCategories = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category]) => category);
  
  // Calculate engagement level
  const recentInteractions = profile.behavior.searchHistory.filter(
    search => Date.now() - search.timestamp < 7 * 24 * 60 * 60 * 1000
  ).length;
  
  let engagementLevel: 'low' | 'medium' | 'high' = 'low';
  if (recentInteractions > 20) {
    engagementLevel = 'high';
  } else if (recentInteractions > 5) {
    engagementLevel = 'medium';
  }
  
  return {
    preferredCategories,
    preferredTags: profile.preferences.tags.slice(0, 5),
    engagementLevel,
    favoriteContentTypes: profile.preferences.contentTypes.slice(0, 3),
    recentActivity: recentInteractions
  };
}