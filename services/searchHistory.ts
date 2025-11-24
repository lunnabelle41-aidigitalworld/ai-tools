/**
 * Search history and personalization service
 */

// In-memory storage for search history (in a real app, this would be in a database)
const userSearchHistory = new Map<string, Array<{
  query: string;
  timestamp: number;
  resultsCount: number;
  clickedResults: string[];
}>>();

const userPreferences = new Map<string, {
  favoriteCategories: string[];
  favoriteTags: string[];
  preferredPricing: string[];
  lastSearchTimestamp: number;
}>();

// Add search to history
export function addToSearchHistory(
  userId: string,
  query: string,
  resultsCount: number
) {
  if (!userId || !query) return;
  
  const userHistory = userSearchHistory.get(userId) || [];
  
  // Add new search entry
  userHistory.push({
    query: query.toLowerCase(),
    timestamp: Date.now(),
    resultsCount,
    clickedResults: []
  });
  
  // Keep only last 100 searches
  if (userHistory.length > 100) {
    userHistory.shift();
  }
  
  userSearchHistory.set(userId, userHistory);
  
  // Update user preferences based on search
  updatePreferencesFromSearch(userId, query);
}

// Record clicked result
export function recordClickedResult(
  userId: string,
  query: string,
  resultId: string
) {
  if (!userId || !query || !resultId) return;
  
  const userHistory = userSearchHistory.get(userId);
  if (!userHistory) return;
  
  // Find the most recent search entry for this query
  const searchEntry = [...userHistory]
    .reverse()
    .find(entry => entry.query === query.toLowerCase());
  
  if (searchEntry && !searchEntry.clickedResults.includes(resultId)) {
    searchEntry.clickedResults.push(resultId);
  }
}

// Get recent searches
export function getRecentSearches(userId: string, limit: number = 10): string[] {
  if (!userId) return [];
  
  const userHistory = userSearchHistory.get(userId);
  if (!userHistory || userHistory.length === 0) return [];
  
  // Get unique recent searches, sorted by recency
  const recentSearches = [...userHistory]
    .reverse()
    .slice(0, limit * 2) // Get more to ensure we have unique queries
    .map(entry => entry.query)
    .filter((query, index, arr) => arr.indexOf(query) === index) // Remove duplicates
    .slice(0, limit);
  
  return recentSearches;
}

// Get personalized search suggestions
export function getPersonalizedSuggestions(
  userId: string,
  currentQuery: string = '',
  limit: number = 10
): string[] {
  if (!userId) return [];
  
  const suggestions: string[] = [];
  
  // Add recent searches
  const recentSearches = getRecentSearches(userId, 5);
  suggestions.push(...recentSearches);
  
  // Add favorite categories and tags
  const preferences = userPreferences.get(userId);
  if (preferences) {
    suggestions.push(...preferences.favoriteCategories.slice(0, 3));
    suggestions.push(...preferences.favoriteTags.slice(0, 3));
  }
  
  // Filter out current query and duplicates
  const uniqueSuggestions = suggestions
    .filter(suggestion => suggestion.toLowerCase() !== currentQuery.toLowerCase())
    .filter((suggestion, index, arr) => arr.indexOf(suggestion) === index)
    .slice(0, limit);
  
  return uniqueSuggestions;
}

// Update user preferences based on search behavior
function updatePreferencesFromSearch(userId: string, query: string) {
  // Initialize preferences if they don't exist
  if (!userPreferences.has(userId)) {
    userPreferences.set(userId, {
      favoriteCategories: [],
      favoriteTags: [],
      preferredPricing: [],
      lastSearchTimestamp: Date.now()
    });
  }
  
  const preferences = userPreferences.get(userId)!;
  preferences.lastSearchTimestamp = Date.now();
  
  // Extract potential categories and tags from query
  const queryTerms = query.toLowerCase().split(/\s+/);
  
  // Common AI categories and tags
  const commonCategories = [
    'image generation', 'content creation', 'chatbot', 'writing', 'design',
    'video editing', 'audio processing', 'data analysis', 'coding', 'marketing',
    'productivity', 'education', 'healthcare', 'finance', 'legal'
  ];
  
  const commonTags = [
    'ai', 'artificial intelligence', 'machine learning', 'deep learning',
    'natural language processing', 'computer vision', 'automation', 'free',
    'open source', 'premium', 'enterprise', 'tool', 'software', 'app'
  ];
  
  // Check if query contains common categories or tags
  for (const term of queryTerms) {
    // Check categories
    const matchingCategories = commonCategories.filter(cat => cat.includes(term));
    for (const category of matchingCategories) {
      if (!preferences.favoriteCategories.includes(category)) {
        preferences.favoriteCategories.push(category);
        // Keep only top 10 favorite categories
        if (preferences.favoriteCategories.length > 10) {
          preferences.favoriteCategories.shift();
        }
      }
    }
    
    // Check tags
    const matchingTags = commonTags.filter(tag => tag.includes(term));
    for (const tag of matchingTags) {
      if (!preferences.favoriteTags.includes(tag)) {
        preferences.favoriteTags.push(tag);
        // Keep only top 10 favorite tags
        if (preferences.favoriteTags.length > 10) {
          preferences.favoriteTags.shift();
        }
      }
    }
  }
  
  userPreferences.set(userId, preferences);
}

// Get user search statistics
export function getUserSearchStats(userId: string) {
  if (!userId) return null;
  
  const userHistory = userSearchHistory.get(userId);
  if (!userHistory || userHistory.length === 0) return null;
  
  const totalSearches = userHistory.length;
  const totalResultsViewed = userHistory.reduce((sum, entry) => sum + entry.clickedResults.length, 0);
  const favoriteQueries = getFavoriteQueries(userId);
  const preferredCategories = userPreferences.get(userId)?.favoriteCategories || [];
  
  return {
    totalSearches,
    totalResultsViewed,
    favoriteQueries,
    preferredCategories,
    lastSearch: new Date(userHistory[userHistory.length - 1].timestamp)
  };
}

// Get favorite queries based on frequency
function getFavoriteQueries(userId: string, limit: number = 5): string[] {
  const userHistory = userSearchHistory.get(userId);
  if (!userHistory || userHistory.length === 0) return [];
  
  // Count query frequencies
  const queryCounts = new Map<string, number>();
  for (const entry of userHistory) {
    const count = queryCounts.get(entry.query) || 0;
    queryCounts.set(entry.query, count + 1);
  }
  
  // Sort by frequency and return top queries
  return Array.from(queryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([query]) => query);
}

// Clear search history
export function clearSearchHistory(userId: string) {
  if (!userId) return;
  userSearchHistory.delete(userId);
  userPreferences.delete(userId);
}

export default {
  addToSearchHistory,
  recordClickedResult,
  getRecentSearches,
  getPersonalizedSuggestions,
  getUserSearchStats,
  clearSearchHistory
};