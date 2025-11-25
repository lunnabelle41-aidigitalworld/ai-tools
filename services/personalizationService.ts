import { Document } from './searchService';

// User profile interface
export interface UserProfile {
  id: string;
  interests: string[];
  searchHistory: string[];
  favoriteCategories: string[];
  favoriteTools: string[];
  lastActive: Date;
}

// Personalized search options
export interface PersonalizedSearchOptions {
  userId?: string;
  boostFavorites?: boolean;
  boostHistory?: boolean;
  excludeDisliked?: boolean;
  personalizedRanking?: boolean;
}

// In-memory user profiles (in a real app, this would be a database)
const userProfiles: Record<string, UserProfile> = {};

// Get user profile
export function getUserProfile(userId: string): UserProfile | null {
  return userProfiles[userId] || null;
}

// Create or update user profile
export function updateUserProfile(userId: string, profileData: Partial<UserProfile>): void {
  if (!userProfiles[userId]) {
    userProfiles[userId] = {
      id: userId,
      interests: [],
      searchHistory: [],
      favoriteCategories: [],
      favoriteTools: [],
      lastActive: new Date()
    };
  }
  
  Object.assign(userProfiles[userId], profileData, { lastActive: new Date() });
}

// Add search to user history
export function addUserSearchHistory(userId: string, query: string): void {
  if (!userProfiles[userId]) {
    updateUserProfile(userId, { id: userId });
  }
  
  const profile = userProfiles[userId];
  profile.searchHistory.unshift(query);
  
  // Keep only the last 50 searches
  if (profile.searchHistory.length > 50) {
    profile.searchHistory = profile.searchHistory.slice(0, 50);
  }
}

// Add favorite tool
export function addFavoriteTool(userId: string, toolId: string): void {
  if (!userProfiles[userId]) {
    updateUserProfile(userId, { id: userId });
  }
  
  const profile = userProfiles[userId];
  if (!profile.favoriteTools.includes(toolId)) {
    profile.favoriteTools.push(toolId);
  }
}

// Remove favorite tool
export function removeFavoriteTool(userId: string, toolId: string): void {
  if (!userProfiles[userId]) return;
  
  const profile = userProfiles[userId];
  profile.favoriteTools = profile.favoriteTools.filter(id => id !== toolId);
}

// Boost documents based on user preferences
export function boostDocumentsForUser(documents: Document[], userId: string, options: PersonalizedSearchOptions): Document[] {
  const profile = getUserProfile(userId);
  if (!profile) return documents;
  
  return documents.map(doc => {
    let scoreBoost = 1.0;
    
    // Boost favorites
    if (options.boostFavorites && profile.favoriteTools.includes(doc.id)) {
      scoreBoost *= 1.5;
    }
    
    // Boost by category preference
    // Fix: Check if doc.category exists before checking inclusion
    if (doc.category && profile.favoriteCategories.includes(doc.category)) {
      scoreBoost *= 1.3;
    }
    
    // Boost by search history relevance
    if (options.boostHistory) {
      const recentSearches = profile.searchHistory.slice(0, 10);
      const content = `${doc.title} ${doc.content}`.toLowerCase();
      
      recentSearches.forEach(search => {
        if (content.includes(search.toLowerCase())) {
          scoreBoost *= 1.2;
        }
      });
    }
    
    // Apply boost to similarity score
    return {
      ...doc,
      similarity: doc.similarity ? doc.similarity * scoreBoost : doc.similarity
    };
  });
}