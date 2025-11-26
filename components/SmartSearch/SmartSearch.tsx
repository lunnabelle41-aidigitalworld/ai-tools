import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { Tool } from '../../types/tool';

// Define styles with proper TypeScript types
interface SmartSearchStyles {
  [key: string]: React.CSSProperties | { [key: string]: React.CSSProperties };
}

const styles: SmartSearchStyles = {
  searchContainer: { position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto 2rem', zIndex: 10 },
  searchBar: { 
    display: 'flex', 
    alignItems: 'center', 
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '0.5rem',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)' as any,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
  },
  focused: {
    borderColor: 'rgba(99, 102, 241, 0.8)',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.25)'
  },
  searchIcon: { padding: '0 0.75rem', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center' },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    padding: '0.75rem 0',
    outline: 'none'
  },
  clearButton: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    padding: '0.5rem',
    marginRight: '0.25rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  filterButton: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    padding: '0.5rem',
    margin: '0 0.25rem',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  activeFilter: {
    background: 'rgba(99, 102, 241, 0.3)',
    color: '#6366f1'
  },
  searchButton: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' as any,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginLeft: '0.5rem'
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'rgba(30, 30, 40, 0.95)',
    borderRadius: '8px',
    marginTop: '0.5rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    zIndex: 50
  },
  suggestionItem: {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  },
  suggestionHeader: {
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    color: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  trendingSearch: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  },
  aiPoweredBadge: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' as any,
    color: 'white',
    fontSize: '0.7rem',
    padding: '0.2rem 0.5rem',
    borderRadius: '12px',
    marginLeft: '0.5rem'
  }
};

// Simple icon components
const FiSearch = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FiX = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const FiFilter = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const FiClock = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FiStar = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FiTrendingUp = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const FiBrain = ({ size = 20, className = '', ...props }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4.5 4.5 0 1 0 12 18.5 4.5 4.5 0 1 0 19.97 17.44 4 4 0 0 0 20.526 12 4 4 0 0 0 18.023 6.245 3 3 0 1 0 12 5z" />
  </svg>
);

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

type SuggestionType = 'recent' | 'tool' | 'tag' | 'trending' | 'intent' | 'category' | 'pricing' | 'rating' | 'insight' | 'enhancement' | 'comparison' | 'question' | 'workflow' | 'integration' | 'alternative';

interface Suggestion {
  type: SuggestionType;
  text: string;
  icon?: React.ReactNode;
  count?: number;
  category?: string;
  description?: string;
  confidence?: number;
  pricing?: string;
  rating?: number;
  fusionScore?: number;
  ultimateScore?: number;
}

interface Filters {
  pricing: string[];
  minRating: number;
  tags: string[];
}


interface SmartSearchProps {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: Filters) => void;
  allTags: string[];
  tools: Tool[];
}

// Enhanced semantic search function
const semanticSearch = (query: string, tools: Tool[]): Tool[] => {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim();
  
  // Extract keywords and phrases
  const keywords = normalizedQuery.split(/\s+/).filter(word => word.length > 2);
  const phrases = normalizedQuery.match(/"[^"]*"|'[^']*'/g)?.map(phrase => phrase.replace(/["']/g, '')) || [];
  
  // Calculate relevance scores for each tool
  const scoredTools = tools.map(tool => {
    let score = 0;
    
    // Check name match
    if (tool.name.toLowerCase().includes(normalizedQuery)) {
      score += 10;
    }
    
    // Check description match
    if (tool.description.toLowerCase().includes(normalizedQuery)) {
      score += 5;
    }
    
    // Check category match
    if (tool.category.toLowerCase().includes(normalizedQuery)) {
      score += 7;
    }
    
    // Check subcategory match
    if (tool.subcategory.toLowerCase().includes(normalizedQuery)) {
      score += 5;
    }
    
    // Check tags match
    if (tool.tags) {
      tool.tags.forEach(tag => {
        if (tag.toLowerCase().includes(normalizedQuery)) {
          score += 3;
        }
      });
    }
    
    // Check features match
    if (tool.features) {
      tool.features.forEach(feature => {
        if (feature.toLowerCase().includes(normalizedQuery)) {
          score += 2;
        }
      });
    }
    
    // Check use cases match
    if (tool.useCases) {
      tool.useCases.forEach(useCase => {
        if (useCase.toLowerCase().includes(normalizedQuery)) {
          score += 2;
        }
      });
    }
    
    // Check keywords in various fields
    keywords.forEach(keyword => {
      if (tool.name.toLowerCase().includes(keyword)) score += 2;
      if (tool.description.toLowerCase().includes(keyword)) score += 1;
      if (tool.category.toLowerCase().includes(keyword)) score += 1.5;
      if (tool.subcategory.toLowerCase().includes(keyword)) score += 1;
      if (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(keyword))) score += 1;
    });
    
    // Check exact phrase matches
    phrases.forEach(phrase => {
      if (tool.name.toLowerCase().includes(phrase)) score += 5;
      if (tool.description.toLowerCase().includes(phrase)) score += 3;
      if (tool.category.toLowerCase().includes(phrase)) score += 4;
    });
    
    return { tool, score };
  });
  
  // Sort by score and return top results
  return scoredTools
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.tool)
    .slice(0, 20);
};

// Enhanced AI search function with multi-dimensional matching
const enhancedAISearch = (query: string, tools: Tool[], allTags: string[]): Suggestion[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = normalizedQuery.split(/\s+/).filter(token => token.length > 1);
  
  if (!normalizedQuery) return [];
  
  const suggestions: Suggestion[] = [];
  
  // 1. Direct tool name matches (highest priority)
  tools.forEach(tool => {
    if (tool.name.toLowerCase().includes(normalizedQuery)) {
      suggestions.push({
        type: 'tool',
        text: tool.name,
        description: tool.description,
        category: tool.category,
        icon: <FiStar size={16} />,
        confidence: 0.95
      });
    }
  });
  
  // 2. Category matches
  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  categories.forEach(category => {
    if (category && category.toLowerCase().includes(normalizedQuery)) {
      const toolCount = tools.filter(tool => tool.category === category).length;
      suggestions.push({
        type: 'category',
        text: category,
        count: toolCount,
        icon: <FiFilter size={16} />,
        confidence: 0.9
      });
    }
  });
  
  // 3. Tag matches
  allTags.forEach(tag => {
    if (tag.toLowerCase().includes(normalizedQuery)) {
      suggestions.push({
        type: 'tag',
        text: `#${tag}`,
        icon: <FiFilter size={16} />,
        confidence: 0.85
      });
    }
  });
  
  // 4. Description matches
  tools.forEach(tool => {
    if (tool.description.toLowerCase().includes(normalizedQuery) && 
        !suggestions.some(s => s.type === 'tool' && s.text === tool.name)) {
      suggestions.push({
        type: 'tool',
        text: tool.name,
        description: tool.description,
        category: tool.category,
        icon: <FiStar size={16} />,
        confidence: 0.8
      });
    }
  });
  
  // 5. Feature matches
  tools.forEach(tool => {
    if (tool.features && tool.features.some(feature => 
        feature.toLowerCase().includes(normalizedQuery)) &&
        !suggestions.some(s => s.type === 'tool' && s.text === tool.name)) {
      suggestions.push({
        type: 'tool',
        text: tool.name,
        description: tool.description,
        category: tool.category,
        icon: <FiStar size={16} />,
        confidence: 0.75
      });
    }
  });
  
  // 6. Use case matches
  tools.forEach(tool => {
    if (tool.useCases && tool.useCases.some(useCase => 
        useCase.toLowerCase().includes(normalizedQuery)) &&
        !suggestions.some(s => s.type === 'tool' && s.text === tool.name)) {
      suggestions.push({
        type: 'tool',
        text: tool.name,
        description: tool.description,
        category: tool.category,
        icon: <FiStar size={16} />,
        confidence: 0.7
      });
    }
  });
  
  // 7. Token-based fuzzy matching
  if (queryTokens.length > 0) {
    tools.forEach(tool => {
      let matchScore = 0;
      
      // Check name tokens
      queryTokens.forEach(token => {
        if (tool.name.toLowerCase().includes(token)) matchScore += 3;
        if (tool.description.toLowerCase().includes(token)) matchScore += 1;
        if (tool.category.toLowerCase().includes(token)) matchScore += 2;
        if (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(token))) matchScore += 1;
      });
      
      // Add to suggestions if score is high enough and not already added
      if (matchScore >= 2 && 
          !suggestions.some(s => s.type === 'tool' && s.text === tool.name)) {
        suggestions.push({
          type: 'tool',
          text: tool.name,
          description: tool.description,
          category: tool.category,
          icon: <FiStar size={16} />,
          confidence: Math.min(0.65, matchScore / 10)
        });
      }
    });
  }
  
  // Sort by confidence
  suggestions.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
  
  return suggestions.slice(0, 8);
};

// Enhanced intent mapping with more detailed categories
const enhancedIntentMap = [
  { 
    pattern: ['image', 'photo', 'picture', 'visual', 'graphics'], 
    category: 'Image Generation',
    subcategories: ['AI Art Generators', 'Photo Editing', 'Image Enhancement']
  },
  { 
    pattern: ['video', 'movie', 'film', 'animation', 'clip'], 
    category: 'Video & Animation',
    subcategories: ['Video Editing', 'AI Video Generation', 'Animation Tools']
  },
  { 
    pattern: ['write', 'text', 'copy', 'content', 'article', 'blog'], 
    category: 'Writing & Copywriting',
    subcategories: ['AI Writing Assistants', 'Content Generation', 'Copywriting Tools']
  },
  { 
    pattern: ['music', 'audio', 'sound', 'podcast'], 
    category: 'Music & Audio',
    subcategories: ['AI Music Generation', 'Audio Editing', 'Voice Generation']
  },
  { 
    pattern: ['code', 'programming', 'developer', 'software'], 
    category: 'Developer Tools',
    subcategories: ['Code Generation', 'Debugging Tools', 'Code Review']
  },
  { 
    pattern: ['design', 'ui', 'ux', 'graphic', 'interface'], 
    category: 'Design & Graphics',
    subcategories: ['UI/UX Design', 'Graphic Design', 'Prototyping Tools']
  },
  { 
    pattern: ['seo', 'search', 'optimization', 'marketing'], 
    category: 'SEO & Marketing',
    subcategories: ['SEO Tools', 'Content Marketing', 'Social Media']
  },
  { 
    pattern: ['research', 'academic', 'study', 'science'], 
    category: 'Research & Academia',
    subcategories: ['Academic Research', 'Data Analysis', 'Scientific Tools']
  },
  { 
    pattern: ['business', 'enterprise', 'corporate', 'company'], 
    category: 'Business & Enterprise',
    subcategories: ['Business Intelligence', 'Enterprise Solutions', 'Productivity Tools']
  },
  { 
    pattern: ['education', 'learning', 'teaching', 'course'], 
    category: 'Education & Learning',
    subcategories: ['E-Learning Platforms', 'Educational Content', 'Learning Management']
  },
  { 
    pattern: ['productivity', 'task', 'workflow', 'organization'], 
    category: 'Productivity',
    subcategories: ['Task Management', 'Workflow Automation', 'Organization Tools']
  },
  { 
    pattern: ['data', 'analytics', 'visualization', 'insights'], 
    category: 'Data Analysis',
    subcategories: ['Data Visualization', 'Analytics Platforms', 'Business Intelligence']
  }
];

// AI-powered query understanding function
const understandQueryIntent = (query: string): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Check for intent matches
  enhancedIntentMap.forEach(intent => {
    if (intent.pattern.some(keyword => lowerQuery.includes(keyword))) {
      results.push({
        type: 'intent',
        text: `Find tools for ${intent.category}`,
        category: intent.category,
        icon: <FiBrain size={16} />,
        confidence: 0.9
      });
    }
  });
  
  // Check for pricing intent
  const pricingKeywords = ['free', 'paid', 'premium', 'subscription', 'trial'];
  if (pricingKeywords.some(keyword => lowerQuery.includes(keyword))) {
    results.push({
      type: 'pricing',
      text: 'Filter by pricing model',
      icon: <FiFilter size={16} />,
      confidence: 0.8
    });
  }
  
  // Check for rating intent
  const ratingMatch = lowerQuery.match(/(\d+)\s*(?:star|★|⭐)/i);
  if (ratingMatch) {
    const rating = parseInt(ratingMatch[1], 10);
    if (rating >= 1 && rating <= 5) {
      results.push({
        type: 'rating',
        text: `Find tools with ${rating}+ stars`,
        rating: rating,
        icon: <FiStar size={16} />,
        confidence: 0.85
      });
    }
  }
  
  return results;
};

// Semantic similarity function for intent matching
const calculateSimilarity = (query: string, target: string): number => {
  const queryWords = query.toLowerCase().split(/\s+/);
  const targetWords = target.toLowerCase().split(/\s+/);
  
  let matches = 0;
  queryWords.forEach(word => {
    if (targetWords.some(targetWord => targetWord.includes(word) || word.includes(targetWord))) {
      matches++;
    }
  });
  
  return matches / Math.max(queryWords.length, targetWords.length);
};

// Intent mapping for natural language queries
const intentMap = [
  { pattern: ['image', 'photo', 'picture', 'visual'], category: 'Image Generation' },
  { pattern: ['video', 'movie', 'film', 'animation'], category: 'Video & Animation' },
  { pattern: ['write', 'text', 'copy', 'content'], category: 'Writing & Copywriting' },
  { pattern: ['music', 'audio', 'sound'], category: 'Music & Audio' },
  { pattern: ['code', 'programming', 'developer'], category: 'Developer Tools' },
  { pattern: ['design', 'ui', 'ux', 'graphic'], category: 'Design & Graphics' },
  { pattern: ['seo', 'search', 'optimization'], category: 'SEO & Marketing' },
  { pattern: ['research', 'academic', 'study'], category: 'Research & Academia' },
];

// Advanced AI ranking algorithm with multiple factors
const advancedAIRanking = (query: string, tools: Tool[]): Suggestion[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = normalizedQuery.split(/\s+/).filter(token => token.length > 1);
  
  if (!normalizedQuery) return [];
  
  // Calculate relevance scores for each tool
  const scoredTools = tools.map(tool => {
    let score = 0;
    let relevanceFactors = 0;
    
    // Exact name match (highest weight)
    if (tool.name.toLowerCase() === normalizedQuery) {
      score += 50;
      relevanceFactors++;
    } else if (tool.name.toLowerCase().includes(normalizedQuery)) {
      score += 30;
      relevanceFactors++;
    }
    
    // Partial name matches
    queryTokens.forEach(token => {
      if (tool.name.toLowerCase().includes(token)) {
        score += 5;
        relevanceFactors++;
      }
    });
    
    // Description relevance (medium weight)
    if (tool.description.toLowerCase().includes(normalizedQuery)) {
      score += 15;
      relevanceFactors++;
    }
    
    // Category match (high weight)
    if (tool.category.toLowerCase() === normalizedQuery) {
      score += 25;
      relevanceFactors++;
    } else if (tool.category.toLowerCase().includes(normalizedQuery)) {
      score += 15;
      relevanceFactors++;
    }
    
    // Subcategory match (medium weight)
    if (tool.subcategory.toLowerCase().includes(normalizedQuery)) {
      score += 10;
      relevanceFactors++;
    }
    
    // Tags relevance (medium weight)
    if (tool.tags) {
      tool.tags.forEach(tag => {
        if (tag.toLowerCase() === normalizedQuery) {
          score += 20;
          relevanceFactors++;
        } else if (tag.toLowerCase().includes(normalizedQuery)) {
          score += 10;
          relevanceFactors++;
        }
        
        // Token matches in tags
        queryTokens.forEach(token => {
          if (tag.toLowerCase().includes(token)) {
            score += 2;
            relevanceFactors++;
          }
        });
      });
    }
    
    // Features relevance (low-medium weight)
    if (tool.features) {
      tool.features.forEach(feature => {
        if (feature.toLowerCase().includes(normalizedQuery)) {
          score += 8;
          relevanceFactors++;
        }
        
        // Token matches in features
        queryTokens.forEach(token => {
          if (feature.toLowerCase().includes(token)) {
            score += 1;
            relevanceFactors++;
          }
        });
      });
    }
    
    // Use cases relevance (low-medium weight)
    if (tool.useCases) {
      tool.useCases.forEach(useCase => {
        if (useCase.toLowerCase().includes(normalizedQuery)) {
          score += 6;
          relevanceFactors++;
        }
        
        // Token matches in use cases
        queryTokens.forEach(token => {
          if (useCase.toLowerCase().includes(token)) {
            score += 1;
            relevanceFactors++;
          }
        });
      });
    }
    
    // Rating boost (if high rated)
    if (tool.rating && tool.rating >= 4) {
      score += tool.rating * 2;
      relevanceFactors++;
    }
    
    // Reviews count boost (popularity)
    if (tool.reviews && tool.reviews >= 100) {
      score += Math.log(tool.reviews) * 2;
      relevanceFactors++;
    }
    
    // Normalize score by relevance factors to prevent bias
    const normalizedScore = relevanceFactors > 0 ? score / relevanceFactors : 0;
    
    return { tool, score: normalizedScore };
  });
  
  // Sort by score and return top results as suggestions
  return scoredTools
    .filter(item => item.score > 0.5) // Minimum relevance threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map(item => ({
      type: 'tool' as const,
      text: item.tool.name,
      description: item.tool.description,
      category: item.tool.category,
      icon: <FiStar size={16} />,
      confidence: Math.min(0.95, item.score / 50) // Normalize confidence
    }));
};

// Contextual query analysis for better understanding
const contextualQueryAnalysis = (query: string, tools: Tool[], allTags: string[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Extract potential categories from the query
  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  
  // Advanced intent detection
  enhancedIntentMap.forEach(intent => {
    // Pattern matching with fuzzy logic
    const patternMatch = intent.pattern.some(keyword => {
      // Direct match
      if (lowerQuery.includes(keyword)) return true;
      
      // Fuzzy match (partial word matching)
      const queryWords = lowerQuery.split(/\s+/);
      return queryWords.some(word => 
        word.length > 3 && 
        (keyword.includes(word) || word.includes(keyword))
      );
    });
    
    if (patternMatch) {
      results.push({
        type: 'intent',
        text: `Find tools for ${intent.category}`,
        category: intent.category,
        icon: <FiBrain size={16} />,
        confidence: 0.95
      });
    }
  });
  
  // Advanced pricing detection
  const pricingPatterns = [
    { keywords: ['free', 'gratis', 'no cost'], type: 'Free' },
    { keywords: ['paid', 'premium', 'subscription'], type: 'Paid' },
    { keywords: ['trial', 'demo', 'test'], type: 'Free Trial' },
    { keywords: ['freemium', 'basic'], type: 'Freemium' }
  ];
  
  pricingPatterns.forEach(pattern => {
    if (pattern.keywords.some(keyword => lowerQuery.includes(keyword))) {
      results.push({
        type: 'pricing',
        text: `Show ${pattern.type} tools`,
        icon: <FiFilter size={16} />,
        confidence: 0.9
      });
    }
  });
  
  // Advanced rating detection
  const ratingPatterns = [
    { pattern: /(\d+)\s*(?:star|★|⭐|stars?)/i, label: 'stars' },
    { pattern: /(?:rated|rating)\s*(\d+)/i, label: 'rated' },
    { pattern: /(\d+)\s*(?:out of|\/)\s*5/i, label: 'out of 5' }
  ];
  
  ratingPatterns.forEach(ratingPattern => {
    const match = lowerQuery.match(ratingPattern.pattern);
    if (match) {
      const rating = parseInt(match[1], 10);
      if (rating >= 1 && rating <= 5) {
        results.push({
          type: 'rating',
          text: `Find tools with ${rating}+ ${ratingPattern.label}`,
          rating: rating,
          icon: <FiStar size={16} />,
          confidence: 0.92
        });
      }
    }
  });
  
  // Advanced category detection
  categories.forEach(category => {
    if (category && lowerQuery.includes(category.toLowerCase())) {
      const toolCount = tools.filter(tool => tool.category === category).length;
      results.push({
        type: 'category',
        text: category,
        count: toolCount,
        icon: <FiFilter size={16} />,
        confidence: 0.88
      });
    }
  });
  
  // Advanced tag detection
  allTags.forEach(tag => {
    if (lowerQuery.includes(tag.toLowerCase())) {
      results.push({
        type: 'tag',
        text: `#${tag}`,
        icon: <FiFilter size={16} />,
        confidence: 0.85
      });
    }
  });
  
  return results;
};

// Predictive search suggestions based on user behavior
const predictiveSearchSuggestions = (query: string, recentSearches: string[]): Suggestion[] => {
  if (!query) return [];
  
  const lowerQuery = query.toLowerCase();
  const suggestions: Suggestion[] = [];
  
  // Recent searches that start with the query
  recentSearches.forEach(search => {
    if (search.toLowerCase().startsWith(lowerQuery) && search.toLowerCase() !== lowerQuery) {
      suggestions.push({
        type: 'recent',
        text: search,
        icon: <FiClock size={16} />,
        confidence: 0.8
      });
    }
  });
  
  // Fuzzy matches in recent searches
  if (suggestions.length < 3) {
    recentSearches.forEach(search => {
      if (search.toLowerCase().includes(lowerQuery) && 
          !suggestions.some(s => s.text === search)) {
        suggestions.push({
          type: 'recent',
          text: search,
          icon: <FiClock size={16} />,
          confidence: 0.7
        });
      }
    });
  }
  
  return suggestions.slice(0, 3);
};

// Hybrid search combining multiple approaches
const hybridSearch = (query: string, tools: Tool[], allTags: string[], recentSearches: string[]): Suggestion[] => {
  // Get results from different search approaches
  const aiResults = advancedAIRanking(query, tools);
  const contextualResults = contextualQueryAnalysis(query, tools, allTags);
  const predictiveResults = predictiveSearchSuggestions(query, recentSearches);
  
  // Combine all results
  const allResults = [...contextualResults, ...aiResults, ...predictiveResults];
  
  // Deduplicate and prioritize
  const uniqueResults: Suggestion[] = [];
  const seen = new Set<string>();
  
  allResults.forEach(result => {
    const key = `${result.type}-${result.text}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueResults.push(result);
    }
  });
  
  // Sort by confidence and type priority
  uniqueResults.sort((a, b) => {
    // Intent results get priority
    if (a.type === 'intent' && b.type !== 'intent') return -1;
    if (b.type === 'intent' && a.type !== 'intent') return 1;
    
    // Then by confidence
    return (b.confidence || 0) - (a.confidence || 0);
  });
  
  return uniqueResults.slice(0, 12);
};

// Search analytics and insights
const generateSearchInsights = (query: string, tools: Tool[], allTags: string[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const insights: Suggestion[] = [];
  
  // Category distribution insight
  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  const matchingCategories = categories.filter(cat => 
    cat.toLowerCase().includes(lowerQuery)
  );
  
  if (matchingCategories.length > 0) {
    insights.push({
      type: 'insight',
      text: `Found in ${matchingCategories.length} categories`,
      icon: <FiFilter size={16} />,
      confidence: 0.7,
      count: matchingCategories.length
    });
  }
  
  // Tag distribution insight
  const matchingTags = allTags.filter(tag => 
    tag.toLowerCase().includes(lowerQuery)
  );
  
  if (matchingTags.length > 0) {
    insights.push({
      type: 'insight',
      text: `Related to ${matchingTags.length} tags`,
      icon: <FiFilter size={16} />,
      confidence: 0.65,
      count: matchingTags.length
    });
  }
  
  // Rating distribution insight
  const highRatedTools = tools.filter(tool => 
    tool.rating !== undefined && tool.rating >= 4
  ).length;
  
  if (highRatedTools > 0 && lowerQuery.length > 2) {
    insights.push({
      type: 'insight',
      text: `${highRatedTools} highly-rated tools available`,
      icon: <FiStar size={16} />,
      confidence: 0.6,
      count: highRatedTools
    });
  }
  
  return insights;
};

// Enhanced search with insights
const enhancedSearchWithInsights = (query: string, tools: Tool[], allTags: string[], recentSearches: string[]): Suggestion[] => {
  // Get hybrid search results
  const hybridResults = hybridSearch(query, tools, allTags, recentSearches);
  
  // Generate insights only for non-empty queries
  if (query.trim()) {
    const insights = generateSearchInsights(query, tools, allTags);
    return [...insights, ...hybridResults];
  }
  
  return hybridResults;
};

// Search query enhancement suggestions
const getQueryEnhancementSuggestions = (query: string, tools: Tool[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase().trim();
  const suggestions: Suggestion[] = [];
  
  if (!lowerQuery) return suggestions;
  
  // Suggest adding rating filter for generic queries
  if (lowerQuery.length > 3 && !lowerQuery.includes('star') && !lowerQuery.includes('★')) {
    suggestions.push({
      type: 'enhancement',
      text: 'Add "4+ stars" for highly-rated tools',
      icon: <FiStar size={16} />,
      confidence: 0.75
    });
  }
  
  // Suggest adding pricing filter
  const pricingKeywords = ['free', 'paid', 'premium', 'trial'];
  if (lowerQuery.length > 3 && !pricingKeywords.some(keyword => lowerQuery.includes(keyword))) {
    suggestions.push({
      type: 'enhancement',
      text: 'Add "free" to filter free tools',
      icon: <FiFilter size={16} />,
      confidence: 0.7
    });
  }
  
  // Suggest category exploration
  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  const matchingCategories = categories.filter(cat => 
    cat.toLowerCase().includes(lowerQuery) && cat.toLowerCase() !== lowerQuery
  );
  
  if (matchingCategories.length > 0) {
    suggestions.push({
      type: 'enhancement',
      text: `Explore related: ${matchingCategories[0]}`,
      icon: <FiFilter size={16} />,
      confidence: 0.65
    });
  }
  
  return suggestions.slice(0, 2);
};

// Complete search engine with all features
const completeSearchEngine = (query: string, tools: Tool[], allTags: string[], recentSearches: string[]): Suggestion[] => {
  // Get enhanced search results with insights
  const searchResults = enhancedSearchWithInsights(query, tools, allTags, recentSearches);
  
  // Get query enhancement suggestions
  const enhancementSuggestions = getQueryEnhancementSuggestions(query, tools);
  
  // Combine all results
  const allResults = [...enhancementSuggestions, ...searchResults];
  
  // Sort by type priority and confidence
  allResults.sort((a, b) => {
    // Enhancement suggestions first
    if (a.type === 'enhancement' && b.type !== 'enhancement') return -1;
    if (b.type === 'enhancement' && a.type !== 'enhancement') return 1;
    
    // Insights second
    if (a.type === 'insight' && b.type !== 'insight') return -1;
    if (b.type === 'insight' && a.type !== 'insight') return 1;
    
    // Intent third
    if (a.type === 'intent' && b.type !== 'intent') return -1;
    if (b.type === 'intent' && a.type !== 'intent') return 1;
    
    // Then by confidence
    return (b.confidence || 0) - (a.confidence || 0);
  });
  
  return allResults.slice(0, 15);
};

// Search analytics tracking
const trackSearchEvent = (query: string, suggestionType: SuggestionType, confidence: number) => {
  // In a real application, this would send data to an analytics service
  // For now, we'll just log to console
  console.log(`Search Event: "${query}" -> ${suggestionType} (confidence: ${confidence})`);
};

// User feedback tracking for search improvements
const trackUserFeedback = (query: string, suggestion: Suggestion, wasSelected: boolean) => {
  // In a real application, this would send data to a feedback service
  // For now, we'll just log to console
  console.log(`User Feedback: "${query}" -> ${suggestion.type} (${suggestion.text}) - Selected: ${wasSelected}`);
  
  // Store in localStorage for future improvements
  const feedbackKey = `searchFeedback_${Date.now()}`;
  const feedbackData = {
    query,
    suggestionType: suggestion.type,
    suggestionText: suggestion.text,
    wasSelected,
    timestamp: new Date().toISOString()
  };
  
  try {
    localStorage.setItem(feedbackKey, JSON.stringify(feedbackData));
  } catch (e) {
    console.error('Failed to store feedback', e);
  }
};

// Enhanced search with analytics
const enhancedSearchWithAnalytics = (query: string, tools: Tool[], allTags: string[], recentSearches: string[]): Suggestion[] => {
  // Get complete search engine results
  const completeResults = completeSearchEngine(query, tools, allTags, recentSearches);
  
  // Track search events for the first few results
  completeResults.slice(0, 3).forEach((suggestion, index) => {
    trackSearchEvent(query, suggestion.type, suggestion.confidence || 0);
  });
  
  return completeResults;
};

// Search performance metrics
interface SearchMetrics {
  queryLength: number;
  resultCount: number;
  averageConfidence: number;
  responseTime: number;
}

// Enhanced search with performance tracking
const enhancedSearchWithPerformance = (query: string, tools: Tool[], allTags: string[], recentSearches: string[]): Suggestion[] => {
  const startTime = Date.now();
  
  // Get search results
  const results = enhancedSearchWithAnalytics(query, tools, allTags, recentSearches);
  
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  
  // Calculate metrics
  const metrics: SearchMetrics = {
    queryLength: query.length,
    resultCount: results.length,
    averageConfidence: results.length > 0 
      ? results.reduce((sum, result) => sum + (result.confidence || 0), 0) / results.length
      : 0,
    responseTime
  };
  
  // Log performance metrics
  console.log('Search Performance:', metrics);
  
  return results;
};

// Adaptive search that learns from user interactions
const adaptiveSearch = (query: string, tools: Tool[], allTags: string[], recentSearches: string[]): Suggestion[] => {
  // Get performance-tracked results
  const results = enhancedSearchWithPerformance(query, tools, allTags, recentSearches);
  
  // In a real application, this would adapt based on user behavior patterns
  // For now, we'll just return the results as-is
  return results;
};

// Neural search with vector-like similarity for semantic understanding
const neuralSearch = (query: string, tools: Tool[], feedbackData?: Record<string, any>): Suggestion[] => {
  const normalizedQuery = query.toLowerCase().trim();
  const queryTokens = normalizedQuery.split(/\s+/).filter(token => token.length > 1);
  
  if (!normalizedQuery) return [];
  
  // Calculate semantic similarity scores
  const scoredTools = tools.map(tool => {
    let semanticScore = 0;
    let exactMatches = 0;
    let partialMatches = 0;
    
    // Name similarity (highest weight)
    const nameSimilarity = enhancedSemanticSimilarity(normalizedQuery, tool.name.toLowerCase(), tool.category);
    semanticScore += nameSimilarity * 30;
    if (tool.name.toLowerCase().includes(normalizedQuery)) exactMatches += 2;
    queryTokens.forEach(token => {
      if (tool.name.toLowerCase().includes(token)) partialMatches += 1;
    });
    
    // Description similarity (high weight)
    const descSimilarity = enhancedSemanticSimilarity(normalizedQuery, tool.description.toLowerCase(), tool.category);
    semanticScore += descSimilarity * 20;
    if (tool.description.toLowerCase().includes(normalizedQuery)) exactMatches += 1;
    
    // Category similarity (high weight)
    const categorySimilarity = enhancedSemanticSimilarity(normalizedQuery, tool.category.toLowerCase());
    semanticScore += categorySimilarity * 25;
    if (tool.category.toLowerCase() === normalizedQuery) exactMatches += 2;
    
    // Tags similarity (medium weight)
    if (tool.tags) {
      const tagsText = tool.tags.join(' ').toLowerCase();
      const tagsSimilarity = enhancedSemanticSimilarity(normalizedQuery, tagsText);
      semanticScore += tagsSimilarity * 15;
      
      tool.tags.forEach(tag => {
        if (tag.toLowerCase() === normalizedQuery) exactMatches += 1;
        queryTokens.forEach(token => {
          if (tag.toLowerCase().includes(token)) partialMatches += 0.5;
        });
      });
    }
    
    // Features similarity (medium weight)
    if (tool.features) {
      const featuresText = tool.features.join(' ').toLowerCase();
      const featuresSimilarity = enhancedSemanticSimilarity(normalizedQuery, featuresText);
      semanticScore += featuresSimilarity * 10;
    }
    
    // Use cases similarity (medium weight)
    if (tool.useCases) {
      const useCasesText = tool.useCases.join(' ').toLowerCase();
      const useCasesSimilarity = enhancedSemanticSimilarity(normalizedQuery, useCasesText);
      semanticScore += useCasesSimilarity * 10;
    }
    
    // Rating boost (quality signal)
    if (tool.rating && tool.rating >= 4) {
      semanticScore += tool.rating * 3;
    }
    
    // Reviews count boost (popularity signal)
    if (tool.reviews && tool.reviews >= 100) {
      semanticScore += Math.log(tool.reviews) * 2;
    }
    
    // Feedback boost (learning from user interactions)
    if (feedbackData) {
      // Check if similar queries were successful
      Object.values(feedbackData).forEach((feedback: any) => {
        if (feedback.wasSelected && 
            calculateSemanticSimilarity(normalizedQuery, feedback.query) > 0.8 &&
            feedback.suggestionType === 'tool' &&
            feedback.suggestionText === tool.name) {
          semanticScore += 5; // Boost tools that were previously selected for similar queries
        }
      });
    }
    
    // Calculate final confidence score
    const totalMatches = exactMatches + partialMatches;
    const matchBoost = Math.min(10, totalMatches * 2);
    const finalScore = semanticScore + matchBoost;
    
    // Normalize confidence (0-1 scale)
    const confidence = Math.min(0.99, finalScore / 100);
    
    return { tool, score: finalScore, confidence };
  });
  
  // Filter and sort results
  return scoredTools
    .filter(item => item.confidence > 0.1) // Minimum confidence threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(item => ({
      type: 'tool' as const,
      text: item.tool.name,
      description: item.tool.description,
      category: item.tool.category,
      icon: <FiStar size={16} />,
      confidence: item.confidence
    }));
};

// Advanced semantic similarity calculation
const calculateSemanticSimilarity = (query: string, target: string): number => {
  // Handle exact matches
  if (query === target) return 1.0;
  if (target.includes(query)) return 0.9;
  
  // Token-based similarity
  const queryTokens = query.toLowerCase().split(/\s+/);
  const targetTokens = target.toLowerCase().split(/\s+/);
  
  let matches = 0;
  let totalWeight = 0;
  
  queryTokens.forEach(queryToken => {
    if (queryToken.length < 2) return; // Skip very short tokens
    
    targetTokens.forEach(targetToken => {
      if (targetToken.length < 2) return;
      
      // Exact match
      if (queryToken === targetToken) {
        matches += 3;
        totalWeight += 3;
      }
      // Partial match (contains)
      else if (targetToken.includes(queryToken) || queryToken.includes(targetToken)) {
        matches += 1;
        totalWeight += 2;
      }
      // Similar tokens (edit distance)
      else if (levenshteinDistance(queryToken, targetToken) <= 2) {
        matches += 0.5;
        totalWeight += 1;
      }
      else {
        totalWeight += 1;
      }
    });
  });
  
  // Return normalized similarity score
  return totalWeight > 0 ? matches / totalWeight : 0;
};

// Enhanced semantic similarity with context awareness
const enhancedSemanticSimilarity = (query: string, target: string, context?: string): number => {
  // Calculate base similarity
  const baseSimilarity = calculateSemanticSimilarity(query, target);
  
  // If we have context, boost the score based on context relevance
  if (context) {
    const contextSimilarity = calculateSemanticSimilarity(query, context);
    // Boost the score by up to 30% based on context relevance
    return Math.min(1.0, baseSimilarity + (contextSimilarity * 0.3));
  }
  
  return baseSimilarity;
};

// Levenshtein distance for fuzzy matching
const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = [];
  
  // Initialize first row and column
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  // Fill the matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
};

// Quantum-enhanced search (simulated advanced matching)
const quantumSearch = (query: string, tools: Tool[], allTags: string[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Simulate quantum superposition of search states
  const searchDimensions = [
    { weight: 0.3, fn: (tool: Tool) => tool.name.toLowerCase() },
    { weight: 0.25, fn: (tool: Tool) => tool.description.toLowerCase() },
    { weight: 0.2, fn: (tool: Tool) => tool.category.toLowerCase() },
    { weight: 0.15, fn: (tool: Tool) => tool.subcategory.toLowerCase() },
    { weight: 0.1, fn: (tool: Tool) => tool.tags ? tool.tags.join(' ').toLowerCase() : '' }
  ];
  
  // Calculate multi-dimensional relevance
  const quantumScoredTools = tools.map(tool => {
    let totalScore = 0;
    
    searchDimensions.forEach(dimension => {
      const fieldValue = dimension.fn(tool);
      if (fieldValue.includes(lowerQuery)) {
        totalScore += dimension.weight * 10;
      }
      
      // Partial matches
      const queryWords = lowerQuery.split(/\s+/);
      queryWords.forEach(word => {
        if (fieldValue.includes(word)) {
          totalScore += dimension.weight * 3;
        }
      });
    });
    
    return { tool, score: totalScore };
  });
  
  // Filter and sort by quantum score
  return quantumScoredTools
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(item => ({
      type: 'tool' as const,
      text: item.tool.name,
      description: item.tool.description,
      category: item.tool.category,
      icon: <FiStar size={16} />,
      confidence: Math.min(0.95, item.score / 5) // Normalize confidence
    }));
};

// Predictive analytics for future search trends
const predictiveAnalytics = (query: string, tools: Tool[], recentSearches: string[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const predictions: Suggestion[] = [];
  
  // Analyze recent search patterns
  const recentPatterns = recentSearches.slice(0, 5);
  
  // Predict next likely searches based on current query
  if (lowerQuery.length > 2) {
    // Find similar recent searches
    const similarSearches = recentPatterns.filter(search => 
      calculateSemanticSimilarity(lowerQuery, search.toLowerCase()) > 0.3
    );
    
    similarSearches.slice(0, 2).forEach(search => {
      predictions.push({
        type: 'trending',
        text: `People also searched: ${search}`,
        icon: <FiTrendingUp size={16} />,
        confidence: 0.8
      });
    });
  }
  
  // Predict popular tools based on query
  const relevantTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.category.toLowerCase().includes(lowerQuery) ||
    (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
  );
  
  // Sort by rating and popularity
  const popularTools = relevantTools
    .sort((a, b) => {
      const aScore = (a.rating || 0) * 10 + (a.reviews || 0) / 100;
      const bScore = (b.rating || 0) * 10 + (b.reviews || 0) / 100;
      return bScore - aScore;
    })
    .slice(0, 3);
  
  popularTools.forEach(tool => {
    predictions.push({
      type: 'tool',
      text: `${tool.name} (Trending)`,
      description: tool.description,
      category: tool.category,
      icon: <FiTrendingUp size={16} />,
      confidence: 0.75
    });
  });
  
  return predictions;
};

// Cognitive search that mimics human thinking patterns
const cognitiveSearch = (query: string, tools: Tool[], allTags: string[], recentSearches: string[], feedbackData?: Record<string, any>): Suggestion[] => {
  // Layer 1: Neural search (semantic understanding)
  const neuralResults = neuralSearch(query, tools, feedbackData);
  
  // Layer 2: Quantum search (multi-dimensional matching)
  const quantumResults = quantumSearch(query, tools, allTags);
  
  // Layer 3: Predictive analytics (future trends)
  const predictiveResults = predictiveAnalytics(query, tools, recentSearches);
  
  // Layer 4: Contextual analysis (current session)
  const contextualResults = contextualQueryAnalysis(query, tools, allTags);
  
  // Layer 5: Question-answering search
  const questionResults = questionSearch(query, tools);
  
  // Layer 6: Workflow-based search
  const workflowResults = workflowSearch(query, tools);
  
  // Layer 7: Integration search
  const integrationResults = integrationSearch(query, tools);
  
  // Layer 8: Alternative tool search
  const alternativeResults = alternativeSearch(query, tools);
  
  // Combine all layers with weighted scoring
  const layeredResults = [
    ...neuralResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.3 })),
    ...quantumResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.2 })),
    ...predictiveResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.15 })),
    ...contextualResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.1 })),
    ...questionResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.1 })),
    ...workflowResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.05 })),
    ...integrationResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.05 })),
    ...alternativeResults.map(r => ({ ...r, score: (r.confidence || 0) * 0.05 }))
  ];
  
  // Deduplicate and sort by combined score
  const uniqueResults: Suggestion[] = [];
  const seen = new Set<string>();
  
  layeredResults
    .sort((a, b) => b.score - a.score)
    .forEach(result => {
      const key = `${result.type}-${result.text}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueResults.push(result);
      }
    });
  
  return uniqueResults.slice(0, 15);
};

// Hyper-intelligent search engine with all advanced features
const hyperIntelligentSearch = (query: string, tools: Tool[], allTags: string[], recentSearches: string[]): Suggestion[] => {
  // Get cognitive search results
  const cognitiveResults = cognitiveSearch(query, tools, allTags, recentSearches);
  
  // Add enhancement suggestions
  const enhancementSuggestions = getQueryEnhancementSuggestions(query, tools);
  
  // Add insights
  const insights = generateSearchInsights(query, tools, allTags);
  
  // Combine all results
  const allResults = [...insights, ...enhancementSuggestions, ...cognitiveResults];
  
  // Advanced sorting with multiple criteria
  allResults.sort((a, b) => {
    // Priority order: Insights > Enhancements > Intent > Others
    const priority: Record<string, number> = {
      'insight': 4,
      'enhancement': 3,
      'intent': 2,
      'trending': 1,
      'tool': 1,
      'category': 1,
      'tag': 1,
      'recent': 1,
      'pricing': 1,
      'rating': 1,
      'comparison': 2,
      'question': 2,
      'workflow': 1,
      'integration': 1,
      'alternative': 1
    };
    
    const aPriority = priority[a.type] || 0;
    const bPriority = priority[b.type] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // Then by confidence
    return (b.confidence || 0) - (a.confidence || 0);
  });
  
  return allResults.slice(0, 20);
};

// Meta-cognitive search that thinks about thinking
const metaCognitiveSearch = (query: string, tools: Tool[], allTags: string[], recentSearches: string[], feedbackData?: Record<string, any>): Suggestion[] => {
  // Analyze the query to understand what the user is really looking for
  const queryAnalysis = analyzeQueryIntent(query);
  
  // Generate multiple search strategies based on intent
  const strategies = generateSearchStrategies(queryAnalysis);
  
  // Execute each strategy and collect results
  const strategyResults: Suggestion[] = [];
  
  strategies.forEach(strategy => {
    let results: Suggestion[] = [];
    
    switch (strategy.type) {
      case 'exploratory':
        results = exploratorySearch(query, tools, allTags);
        break;
      case 'predictive':
        results = predictiveSearch(query, tools, allTags);
        break;
      case 'cognitive':
        results = cognitiveSearch(query, tools, allTags, recentSearches, feedbackData);
        break;
      case 'enhancement':
        results = getQueryEnhancementSuggestions(query, tools);
        break;
      case 'insight':
        results = generateSearchInsights(query, tools, allTags);
        break;
      case 'precise':
        results = preciseSearch(query, tools);
        break;
      case 'comparative':
        results = comparativeSearch(query, tools);
        break;
      case 'trending':
        results = trendingSearch(query, tools, recentSearches);
        break;
      case 'question':
        results = questionSearch(query, tools);
        break;
      case 'workflow':
        results = workflowSearch(query, tools);
        break;
      case 'integration':
        results = integrationSearch(query, tools);
        break;
      case 'alternative':
        results = alternativeSearch(query, tools);
        break;
      default:
        results = neuralSearch(query, tools, feedbackData);
    }
    
    // Weight results based on strategy effectiveness
    results.forEach(result => {
      strategyResults.push({
        ...result,
        confidence: (result.confidence || 0) * strategy.weight
      });
    });
  });
  
  // Deduplicate and sort
  const uniqueResults: Suggestion[] = [];
  const seen = new Set<string>();
  
  strategyResults
    .sort((a, b) => (b.confidence || 0) - (a.confidence || 0))
    .forEach(result => {
      const key = `${result.type}-${result.text}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueResults.push(result);
      }
    });
  
  return uniqueResults.slice(0, 15);
};

// Predictive search
const predictiveSearch = (query: string, tools: Tool[], allTags: string[]): Suggestion[] => {
  return predictiveAnalytics(query, tools, []); // Reuse existing function
};

// Ultimate sorting with multi-dimensional optimization
const sortUltimateResults = (results: any[]) => {
  // Priority system: Insights > Predictions > Enhancements > Results
  const priority: Record<string, number> = {
    'insight': 4,
    'enhancement': 3,
    'intent': 2,
    'trending': 1,
    'prediction': 3,
    'tool': 1,
    'category': 1,
    'tag': 1,
    'recent': 1,
    'pricing': 1,
    'rating': 1,
    'comparison': 2,
    'question': 2,
    'workflow': 1,
    'integration': 1,
    'alternative': 1
  };
  
  return results.sort((a, b) => {
    const aPriority = priority[a.type] || 0;
    const bPriority = priority[b.type] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // Then by ultimate score
    return (b.ultimateScore || 0) - (a.ultimateScore || 0);
  });
};

// Query intent analysis
const analyzeQueryIntent = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  // Determine search intent
  let intent: 'informational' | 'transactional' | 'navigational' | 'comparative' = 'informational';
  
  if (lowerQuery.includes('buy') || lowerQuery.includes('purchase') || lowerQuery.includes('price')) {
    intent = 'transactional';
  } else if (lowerQuery.includes('vs') || lowerQuery.includes('compared') || lowerQuery.includes('better')) {
    intent = 'comparative';
  } else if (lowerQuery.includes('site') || lowerQuery.includes('website') || lowerQuery.includes('visit')) {
    intent = 'navigational';
  }
  
  // Determine specificity
  const specificity = lowerQuery.split(/\s+/).length;
  
  // Determine complexity
  const hasFilters = lowerQuery.includes('star') || lowerQuery.includes('free') || lowerQuery.includes('paid');
  const hasComparisons = lowerQuery.includes('vs') || lowerQuery.includes('or') || lowerQuery.includes('alternative');
  
  return { intent, specificity, hasFilters, hasComparisons, complexity: (specificity * 0.5) + (hasFilters ? 1 : 0) + (hasComparisons ? 1 : 0) };
};

// Main function to process query and return results
// Main function to process query and return results
const processQuery = (query: string) => {
  const intentAnalysis = analyzeQueryIntent(query);
  // Remove the undefined fetchResults call and related sorting
  // This function seems to be incomplete or unused, so we'll simplify it
  return {
    intent: intentAnalysis.intent,
    specificity: intentAnalysis.specificity,
    hasFilters: intentAnalysis.hasFilters,
    hasComparisons: intentAnalysis.hasComparisons,
    complexity: intentAnalysis.complexity
  };
};

// Generate search strategies based on intent
const generateSearchStrategies = (analysis: ReturnType<typeof analyzeQueryIntent>) => {
  const strategies = [];
  
  // Always include neural search as baseline
  strategies.push({ type: 'neural', weight: 0.3 });
  
  // Add intent-specific strategies
  if (analysis.intent === 'comparative') {
    strategies.push({ type: 'comparative', weight: 0.4 });
    strategies.push({ type: 'trending', weight: 0.2 });
  } else if (analysis.intent === 'transactional') {
    strategies.push({ type: 'precise', weight: 0.5 });
    strategies.push({ type: 'trending', weight: 0.1 });
  } else if (analysis.complexity > 3) {
    strategies.push({ type: 'exploratory', weight: 0.4 });
    strategies.push({ type: 'trending', weight: 0.2 });
  } else {
    strategies.push({ type: 'precise', weight: 0.4 });
    strategies.push({ type: 'neural', weight: 0.3 });
  }
  
  // Add question-based strategies for queries with question words
  // These will be added dynamically in the meta-cognitive search based on actual query content
  
  return strategies;
};

// Exploratory search for broad queries
const exploratorySearch = (query: string, tools: Tool[], allTags: string[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Find related categories
  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  const relatedCategories = categories.filter(cat => 
    calculateSemanticSimilarity(lowerQuery, cat.toLowerCase()) > 0.2
  );
  
  relatedCategories.slice(0, 3).forEach(category => {
    const toolCount = tools.filter(tool => tool.category === category).length;
    results.push({
      type: 'category',
      text: `Explore ${category}`,
      count: toolCount,
      icon: <FiFilter size={16} />,
      confidence: 0.8
    });
  });
  
  // Find related tags
  const relatedTags = allTags.filter(tag => 
    calculateSemanticSimilarity(lowerQuery, tag.toLowerCase()) > 0.3
  );
  
  relatedTags.slice(0, 3).forEach(tag => {
    results.push({
      type: 'tag',
      text: `#${tag}`,
      icon: <FiFilter size={16} />,
      confidence: 0.75
    });
  });
  
  // Add some tools
  const toolResults = neuralSearch(query, tools).slice(0, 5);
  results.push(...toolResults.map(tool => ({
    ...tool,
    confidence: (tool.confidence || 0) * 0.9
  })));
  
  return results;
};

// Precise search for specific queries
const preciseSearch = (query: string, tools: Tool[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  
  // Exact matches first
  const exactMatches = tools.filter(tool => 
    tool.name.toLowerCase() === lowerQuery ||
    tool.category.toLowerCase() === lowerQuery
  );
  
  if (exactMatches.length > 0) {
    return exactMatches.slice(0, 5).map(tool => ({
      type: 'tool',
      text: tool.name,
      description: tool.description,
      category: tool.category,
      icon: <FiStar size={16} />,
      confidence: 0.95
    }));
  }
  
  // High confidence neural search results
  return neuralSearch(query, tools)
    .filter(result => (result.confidence || 0) > 0.7)
    .slice(0, 10);
};

// Comparative search for "vs" type queries
const comparativeSearch = (query: string, tools: Tool[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Split query on "vs" or "or"
  const parts = lowerQuery.split(/\s+(?:vs|or)\s+/);
  
  if (parts.length > 1) {
    parts.forEach(part => {
      const partResults = neuralSearch(part.trim(), tools).slice(0, 3);
      results.push(...partResults);
    });
    
    // Add comparison suggestion
    results.push({
      type: 'comparison',
      text: `Compare ${parts[0]} vs ${parts[1]}`,
      icon: <FiFilter size={16} />,
      confidence: 0.9
    });
  } else {
    // Fallback to neural search
    return neuralSearch(query, tools).slice(0, 10);
  }
  
  return results;
};

// Question-answering search for "how to" and "what is" queries
const questionSearch = (query: string, tools: Tool[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Check for question patterns
  const questionPatterns = [
    { pattern: /how to\s+(.*)/, type: 'how-to' },
    { pattern: /what is\s+(.*)/, type: 'definition' },
    { pattern: /best\s+(.*)/, type: 'recommendation' },
    { pattern: /alternatives? to\s+(.*)/, type: 'alternative' }
  ];
  
  for (const { pattern, type } of questionPatterns) {
    const match = lowerQuery.match(pattern);
    if (match) {
      const subject = match[1];
      
      // Find tools related to the subject
      const relatedTools = neuralSearch(subject, tools).slice(0, 5);
      
      relatedTools.forEach(tool => {
        results.push({
          ...tool,
          type: 'question',
          description: `${type.charAt(0).toUpperCase() + type.slice(1)}: ${tool.description}`
        });
      });
      
      // Add a general question suggestion
      results.push({
        type: 'question',
        text: `How to use ${subject} effectively`,
        icon: <FiBrain size={16} />,
        confidence: 0.85
      });
      
      break;
    }
  }
  
  return results;
};

// Workflow-based search for task-oriented queries
const workflowSearch = (query: string, tools: Tool[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Common workflow patterns
  const workflows = [
    { pattern: /design.*logo/, workflow: 'Logo Design', tools: ['graphic design', 'logo'] },
    { pattern: /edit.*video/, workflow: 'Video Editing', tools: ['video editing', 'video'] },
    { pattern: /write.*blog/, workflow: 'Blog Writing', tools: ['writing', 'content'] },
    { pattern: /analyze.*data/, workflow: 'Data Analysis', tools: ['data analysis', 'analytics'] },
    { pattern: /create.*website/, workflow: 'Website Creation', tools: ['web development', 'website builder'] }
  ];
  
  // Find matching workflows
  for (const { pattern, workflow, tools: workflowTools } of workflows) {
    if (pattern.test(lowerQuery)) {
      // Add workflow suggestion
      results.push({
        type: 'workflow',
        text: `Workflow: ${workflow}`,
        icon: <FiFilter size={16} />,
        confidence: 0.9
      });
      
      // Find tools for this workflow
      workflowTools.forEach(toolCategory => {
        const categoryTools = neuralSearch(toolCategory, tools).slice(0, 2);
        results.push(...categoryTools.map(tool => ({
          ...tool,
          type: 'workflow' as SuggestionType,
          confidence: (tool.confidence || 0) * 0.9
        } as Suggestion)));
      });
      
      break;
    }
  }
  
  return results;
};

// Integration search for tools that work together
const integrationSearch = (query: string, tools: Tool[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Find tools with integrations
  const toolsWithIntegrations = tools.filter(tool => 
    tool.integrations && tool.integrations.length > 0
  );
  
  // Check if query mentions integration
  if (lowerQuery.includes('integration') || lowerQuery.includes('integrate') || lowerQuery.includes('work together')) {
    // Find tools that integrate with popular platforms
    const popularPlatforms = ['slack', 'google', 'microsoft', 'zoom', 'trello'];
    
    popularPlatforms.forEach(platform => {
      if (lowerQuery.includes(platform)) {
        const platformTools = toolsWithIntegrations
          .filter(tool => tool.integrations?.some(int => int.toLowerCase().includes(platform)))
          .slice(0, 3);
          
        platformTools.forEach(tool => {
          results.push({
            type: 'integration',
            text: `${tool.name} integrates with ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
            description: tool.description,
            category: tool.category,
            icon: <FiFilter size={16} />,
            confidence: 0.85
          });
        });
      }
    });
    
    // Add general integration suggestion
    results.push({
      type: 'integration',
      text: 'Show tools with integrations',
      icon: <FiFilter size={16} />,
      confidence: 0.8
    });
  }
  
  return results;
};

// Alternative tool suggestions
const alternativeSearch = (query: string, tools: Tool[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Check for alternative queries
  if (lowerQuery.includes('alternative') || lowerQuery.includes('instead of') || lowerQuery.includes('vs')) {
    // Extract the tool name from the query
    const toolNameMatch = lowerQuery.match(/(?:alternative|instead of|vs)\s+(.*)/);
    if (toolNameMatch) {
      const toolName = toolNameMatch[1].trim();
      
      // Find the tool mentioned in the query
      const originalTool = tools.find(tool => 
        tool.name.toLowerCase().includes(toolName) || 
        tool.category.toLowerCase().includes(toolName)
      );
      
      if (originalTool) {
        // Find alternative tools in the same category
        const alternatives = tools
          .filter(tool => 
            tool.category === originalTool.category && 
            tool.name !== originalTool.name
          )
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 5);
          
        alternatives.forEach(tool => {
          results.push({
            type: 'alternative',
            text: `${tool.name} (Alternative to ${originalTool.name})`,
            description: tool.description,
            category: tool.category,
            icon: <FiFilter size={16} />,
            confidence: 0.9
          });
        });
      }
    }
  }
  
  return results;
};

// Trending search based on recent activity
const trendingSearch = (query: string, tools: Tool[], recentSearches: string[]): Suggestion[] => {
  const lowerQuery = query.toLowerCase();
  const results: Suggestion[] = [];
  
  // Find trending tools
  const trendingTools = tools
    .filter(tool => tool.reviews && tool.reviews > 500)
    .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
    .slice(0, 5);
  
  trendingTools.forEach(tool => {
    results.push({
      type: 'tool',
      text: `${tool.name} (Trending)`,
      description: tool.description,
      category: tool.category,
      icon: <FiTrendingUp size={16} />,
      confidence: 0.85
    });
  });
  
  // Find trending searches
  const trendingSearches = recentSearches.slice(0, 3);
  trendingSearches.forEach(search => {
    if (calculateSemanticSimilarity(lowerQuery, search.toLowerCase()) > 0.3) {
      results.push({
        type: 'trending',
        text: search,
        icon: <FiTrendingUp size={16} />,
        confidence: 0.8
      });
    }
  });
  
  return results;
};

// Quantum cognitive fusion search (the ultimate search algorithm)
const quantumCognitiveFusionSearch = (query: string, tools: Tool[], allTags: string[], recentSearches: string[], feedbackData?: Record<string, any>): Suggestion[] => {
  // Layer 1: Meta-cognitive search (thinking about thinking)
  const metaResults = metaCognitiveSearch(query, tools, allTags, recentSearches, feedbackData);
  
  // Layer 2: Hyper-intelligent search (all advanced features)
  const hyperResults = hyperIntelligentSearch(query, tools, allTags, recentSearches);
  
  // Layer 3: Adaptive neural search (learning from interactions)
  const adaptiveResults = adaptiveSearch(query, tools, allTags, recentSearches);
  
  // Layer 4: Performance-optimized search (fastest results)
  const performanceResults = enhancedSearchWithPerformance(query, tools, allTags, recentSearches);
  
  // Quantum fusion of all layers
  const fusedResults = [
    ...metaResults.map(r => ({ ...r, fusionScore: (r.confidence || 0) * 0.4 })),
    ...hyperResults.map(r => ({ ...r, fusionScore: (r.confidence || 0) * 0.3 })),
    ...adaptiveResults.map(r => ({ ...r, fusionScore: (r.confidence || 0) * 0.2 })),
    ...performanceResults.map(r => ({ ...r, fusionScore: (r.confidence || 0) * 0.1 }))
  ];
  
  // Advanced deduplication with quantum weighting
  const quantumDeduplicated: Suggestion[] = [];
  const seen = new Map<string, number>();
  
  fusedResults
    .sort((a, b) => (b.fusionScore || 0) - (a.fusionScore || 0))
    .forEach(result => {
      const key = `${result.type}-${result.text}`;
      const currentScore = seen.get(key) || 0;
      
      if ((result.fusionScore || 0) > currentScore) {
        seen.set(key, result.fusionScore || 0);
        
        // Update or add result
        const existingIndex = quantumDeduplicated.findIndex(r => 
          r.type === result.type && r.text === result.text
        );
        
        if (existingIndex >= 0) {
          quantumDeduplicated[existingIndex] = result;
        } else {
          quantumDeduplicated.push(result);
        }
      }
    });
  
  // Final quantum optimization
  return quantumDeduplicated
    .sort((a, b) => (b.fusionScore || 0) - (a.fusionScore || 0))
    .slice(0, 25);
};

// Ultimate search engine with all features combined
const ultimateSearchEngine = (query: string, tools: Tool[], allTags: string[], recentSearches: string[], feedbackData?: Record<string, any>): Suggestion[] => {
  // Get quantum cognitive fusion results
  const fusionResults = quantumCognitiveFusionSearch(query, tools, allTags, recentSearches, feedbackData);
  
  // Add real-time analytics
  const analytics = generateSearchInsights(query, tools, allTags);
  
  // Add enhancement suggestions
  const enhancements = getQueryEnhancementSuggestions(query, tools);
  
  // Add predictive analytics
  const predictions = predictiveAnalytics(query, tools, recentSearches);
  
  // Combine all with ultimate weighting
  const ultimateResults = [
    ...analytics.map(r => ({ ...r, ultimateScore: (r.confidence || 0) * 0.15 })),
    ...enhancements.map(r => ({ ...r, ultimateScore: (r.confidence || 0) * 0.1 })),
    ...predictions.map(r => ({ ...r, ultimateScore: (r.confidence || 0) * 0.1 })),
    ...fusionResults.map(r => ({ ...r, ultimateScore: (r.fusionScore || r.confidence || 0) * 0.65 }))
  ];
  
  // Ultimate sorting with multi-dimensional optimization
  ultimateResults.sort((a, b) => {
    // Priority system: Insights > Predictions > Enhancements > Results
    const priority: Record<string, number> = {
      'insight': 4,
      'prediction': 3,
      'enhancement': 2,
      'tool': 1,
      'category': 1,
      'tag': 1,
      'intent': 1,
      'trending': 1,
      'comparison': 2,
      'question': 2,
      'workflow': 1,
      'integration': 1,
      'alternative': 1,
      'recent': 1,
      'pricing': 1,
      'rating': 1
    };
    
    const aPriority = priority[a.type] || 0;
    const bPriority = priority[b.type] || 0;
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    // Then by ultimate score
    return (b.ultimateScore || 0) - (a.ultimateScore || 0);
  });
  
  // Return top results with diversity
  const diverseResults: Suggestion[] = [];
  const typeCounts = new Map<SuggestionType, number>();
  
  ultimateResults.forEach(result => {
    const currentCount = typeCounts.get(result.type) || 0;
    const maxPerType = result.type === 'tool' ? 8 : result.type === 'insight' ? 3 : 2;
    
    if (currentCount < maxPerType && diverseResults.length < 30) {
      typeCounts.set(result.type, currentCount + 1);
      diverseResults.push(result);
    }
  });
  
  return diverseResults.slice(0, 20);
};

const SmartSearch: React.FC<SmartSearchProps> = ({
  search,
  onSearchChange,
  onFilterChange,
  allTags,
  tools,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    pricing: [],
    minRating: 0,
    tags: [],
  });
  
  // Load search feedback from localStorage
  const [searchFeedback, setSearchFeedback] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Clean up old feedback data (older than 30 days)
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    // Load feedback data
    const feedbackData: Record<string, any> = {};
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('searchFeedback_')) {
        try {
          const timestamp = parseInt(key.replace('searchFeedback_', ''));
          if (timestamp < thirtyDaysAgo) {
            keysToRemove.push(key);
          } else {
            const feedback = JSON.parse(localStorage.getItem(key) || '{}');
            feedbackData[key] = feedback;
          }
        } catch (e) {
          console.error('Failed to parse feedback', e);
          keysToRemove.push(key);
        }
      }
    }
    
    // Remove old feedback data
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    setSearchFeedback(feedbackData);
    
    // Set up periodic cleanup (every 24 hours)
    const cleanupInterval = setInterval(() => {
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('searchFeedback_')) {
          try {
            const timestamp = parseInt(key.replace('searchFeedback_', ''));
            if (timestamp < thirtyDaysAgo) {
              keysToRemove.push(key);
            }
          } catch (e) {
            console.error('Failed to parse feedback timestamp', e);
            keysToRemove.push(key);
          }
        }
      }
      
      // Remove old feedback data
      keysToRemove.forEach(key => {
        localStorage.removeItem(key);
      });
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => clearInterval(cleanupInterval);
  }, []);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Failed to parse recent searches', e);
      }
    }
  }, []);

  // Save recent searches to localStorage when it changes
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // Add a search term to recent searches
  const addToRecentSearches = useCallback((term: string) => {
    if (!term.trim()) return;
    
    setRecentSearches((prev: string[]) => {
      // Remove the term if it already exists
      const updated = prev.filter(item => 
        item.toLowerCase() !== term.toLowerCase()
      );
      // Add to the beginning of the array and limit to 5 items
      updated.unshift(term);
      return updated.slice(0, 5);
    });
  }, []);

  // Handle search submission
  const handleSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;
    
    onSearchChange(searchTerm);
    addToRecentSearches(searchTerm);
    setSuggestions([]);
    inputRef.current?.blur();
  }, [onSearchChange, addToRecentSearches]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      handleSearch(search);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      inputRef.current?.blur();
    }
  }, [search, handleSearch]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Generate suggestions based on input
  const debouncedSearch = useDebounce(search, 300);
  
  useEffect(() => {
    if (!debouncedSearch) {
      // Show trending searches when input is empty
      const trendingSearches: Suggestion[] = [
        { type: 'trending', text: 'Best AI image generators', icon: <FiTrendingUp size={16} />, count: 1245 },
        { type: 'trending', text: 'Free SEO tools', icon: <FiTrendingUp size={16} />, count: 987 },
        { type: 'trending', text: 'AI writing assistants', icon: <FiTrendingUp size={16} />, count: 876 },
        { type: 'trending', text: 'Video editing AI', icon: <FiTrendingUp size={16} />, count: 754 },
        { type: 'trending', text: 'AI for developers', icon: <FiTrendingUp size={16} />, count: 654 }
      ];
      setSuggestions(trendingSearches);
      return;
    }

    // Get ultimate search engine results
    const ultimateResults = ultimateSearchEngine(debouncedSearch, tools, allTags, recentSearches, searchFeedback);
    setSuggestions(ultimateResults);
  }, [debouncedSearch, tools, allTags, recentSearches, searchFeedback]);

  // Clear search and suggestions
  const clearSearch = useCallback(() => {
    onSearchChange('');
    setSuggestions([]);
    inputRef.current?.focus();
  }, [onSearchChange]);

  // Toggle filter
  const toggleFilter = useCallback((type: 'pricing' | 'tag', value: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (type === 'pricing') {
        newFilters.pricing = prev.pricing.includes(value)
          ? prev.pricing.filter(p => p !== value)
          : [...prev.pricing, value];
      } else if (type === 'tag') {
        newFilters.tags = prev.tags.includes(value)
          ? prev.tags.filter(t => t !== value)
          : [...prev.tags, value];
      }
      
      onFilterChange(newFilters);
      return newFilters;
    });
  }, [onFilterChange]);
  
  // Export search feedback data for analysis
  const exportSearchFeedback = useCallback(() => {
    const feedbackData: any[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('searchFeedback_')) {
        try {
          const feedback = JSON.parse(localStorage.getItem(key) || '{}');
          feedbackData.push({
            id: key,
            ...feedback
          });
        } catch (e) {
          console.error('Failed to parse feedback for export', e);
        }
      }
    }
    
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(feedbackData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `search-feedback-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, []);
  
  // Import search feedback data
  const importSearchFeedback = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const feedbackData = JSON.parse(e.target?.result as string || '[]');
        
        // Clear existing feedback
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith('searchFeedback_')) {
            localStorage.removeItem(key);
          }
        }
        
        // Import new feedback
        feedbackData.forEach((feedback: any) => {
          if (feedback.id && feedback.id.startsWith('searchFeedback_')) {
            localStorage.setItem(feedback.id, JSON.stringify(feedback));
          }
        });
        
        // Reload feedback data
        const feedbackDataReload: Record<string, any> = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('searchFeedback_')) {
            try {
              const feedback = JSON.parse(localStorage.getItem(key) || '{}');
              feedbackDataReload[key] = feedback;
            } catch (e) {
              console.error('Failed to parse feedback', e);
            }
          }
        }
        setSearchFeedback(feedbackDataReload);
        
        alert('Feedback data imported successfully!');
      } catch (e) {
        console.error('Failed to import feedback data', e);
        alert('Failed to import feedback data. Please check the file format.');
      }
    };
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = '';
  }, [setSearchFeedback]);
  
  // Reset all feedback data
  const resetSearchFeedback = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all search feedback data? This cannot be undone.')) {
      // Clear all feedback data
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.startsWith('searchFeedback_')) {
          localStorage.removeItem(key);
        }
      }
      
      // Reset state
      setSearchFeedback({});
      
      alert('Feedback data reset successfully!');
    }
  }, [setSearchFeedback]);
  
  // Get search statistics
  const getSearchStatistics = useCallback(() => {
    const stats = {
      totalSearches: 0,
      totalFeedback: 0,
      selectedSuggestions: 0,
      suggestionTypes: {} as Record<SuggestionType, number>,
      averageConfidence: 0,
      mostPopularQueries: [] as { query: string; count: number }[]
    };
    
    // Count feedback data
    let totalConfidence = 0;
    const queryCounts: Record<string, number> = {};
    
    Object.values(searchFeedback).forEach((feedback: any) => {
      stats.totalFeedback++;
      
      if (feedback.wasSelected) {
        stats.selectedSuggestions++;
      }
      
      if (feedback.suggestionType && typeof feedback.suggestionType === 'string') {
        const type = feedback.suggestionType as SuggestionType;
        if (type in stats.suggestionTypes) {
          stats.suggestionTypes[type] = 
            (stats.suggestionTypes[type] || 0) + 1;
        }
      }
      
      if (feedback.confidence) {
        totalConfidence += feedback.confidence;
      }
      
      if (feedback.query) {
        queryCounts[feedback.query] = (queryCounts[feedback.query] || 0) + 1;
      }
    });
    
    stats.totalSearches = Object.keys(queryCounts).length;
    stats.averageConfidence = stats.totalFeedback > 0 ? totalConfidence / stats.totalFeedback : 0;
    
    // Get most popular queries
    stats.mostPopularQueries = Object.entries(queryCounts)
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    return stats;
  }, [searchFeedback]);
  
  // Display search statistics
  const displaySearchStatistics = useCallback(() => {
    const stats = getSearchStatistics();
    
    // Create a formatted string with statistics
    let statsText = `Search Statistics:\n`;
    statsText += `==================\n`;
    statsText += `Total Searches: ${stats.totalSearches}\n`;
    statsText += `Total Feedback: ${stats.totalFeedback}\n`;
    statsText += `Selected Suggestions: ${stats.selectedSuggestions}\n`;
    statsText += `Average Confidence: ${(stats.averageConfidence * 100).toFixed(2)}%\n\n`;
    
    statsText += `Suggestion Types:\n`;
    Object.entries(stats.suggestionTypes).forEach(([type, count]) => {
      statsText += `  ${type}: ${count}\n`;
    });
    
    statsText += `\nMost Popular Queries:\n`;
    stats.mostPopularQueries.forEach(({ query, count }, index) => {
      statsText += `  ${index + 1}. ${query} (${count} times)\n`;
    });
    
    // Show in an alert or console
    alert(statsText);
    console.log('Search Statistics:', stats);
  }, [getSearchStatistics]);
  
  // Get most relevant tools based on feedback
  const getMostRelevantTools = useCallback((query: string) => {
    const toolScores: Record<string, number> = {};
    
    // Calculate scores based on feedback
    Object.values(searchFeedback).forEach((feedback: any) => {
      if (feedback.suggestionType === 'tool' && feedback.suggestionText) {
        // Increase score for tools that were selected
        if (feedback.wasSelected) {
          const similarity = calculateSemanticSimilarity(query, feedback.query);
          if (similarity > 0.5) { // Only consider similar queries
            toolScores[feedback.suggestionText] = 
              (toolScores[feedback.suggestionText] || 0) + (similarity * 10);
          }
        }
      }
    });
    
    // Sort tools by score
    return Object.entries(toolScores)
      .map(([toolName, score]) => ({ toolName, score }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [searchFeedback]);

  return (
    <div style={{...styles.searchContainer, maxWidth: '100%'}} ref={searchRef}>
      <div 
        style={{
          ...styles.searchBar,
          ...(isFocused ? styles.focused : {}),
          borderRadius: '50px',
          padding: '0.75rem 1.5rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div style={{...styles.searchIcon, padding: '0 1rem'}}>
          <FiSearch size={24} />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          style={{
            ...styles.searchInput,
            fontSize: '1.1rem',
            padding: '0.75rem 0'
          }}
          placeholder="Search millions of AI tools, articles, and resources..."
          aria-label="Search AI tools"
        />
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            style={{
              ...styles.clearButton,
              padding: '0.75rem',
              marginRight: '0.5rem'
            }}
            aria-label="Clear search"
          >
            <FiX size={24} />
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          style={{
            ...styles.filterButton,
            ...(filters.pricing.length > 0 || filters.tags.length > 0 || filters.minRating > 0
              ? styles.activeFilter
              : {}),
            padding: '0.75rem',
            margin: '0 0.5rem'
          }}
          aria-label="Toggle filters"
        >
          <FiFilter size={24} />
        </button>
        <button
          type="button"
          onClick={() => handleSearch(search)}
          style={{
            ...styles.searchButton,
            padding: '0.75rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '50px'
          }}
          aria-label="Search"
        >
          Search
        </button>
      </div>

      {isFocused && suggestions.length > 0 && (
        <div style={{
          ...styles.suggestionsContainer,
          borderRadius: '16px',
          marginTop: '1rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        }}>
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${index}`}
              style={{
                ...styles.suggestionItem,
                padding: '1rem 1.5rem',
                gap: '1rem',
                borderBottom: index < suggestions.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
              }}
              onClick={() => {
                if (suggestion.type === 'intent' && suggestion.category) {
                  // For intent-based suggestions, search by category
                  onSearchChange(suggestion.category);
                  handleSearch(suggestion.category);
                } else if (suggestion.type === 'pricing') {
                  // For pricing-based suggestions, we don't auto-apply filters
                  // User can click the filter button to adjust filters
                  const searchTerm = suggestion.text.replace(/^#/, '');
                  onSearchChange(searchTerm);
                  handleSearch(searchTerm);
                } else if (suggestion.type === 'rating' && suggestion.rating) {
                  // For rating-based suggestions, set the filter
                  setFilters(prev => ({
                    ...prev,
                    minRating: suggestion.rating || 0
                  }));
                  onFilterChange({
                    ...filters,
                    minRating: suggestion.rating || 0
                  });
                } else if (suggestion.type === 'enhancement') {
                  // For enhancement suggestions, provide guidance but don't auto-search
                  // This could show a tooltip or help text in the future
                  const searchTerm = search; // Keep current search term
                  onSearchChange(searchTerm);
                } else if (suggestion.type === 'comparison') {
                  // For comparison suggestions, search with the comparison query
                  const searchTerm = suggestion.text.replace('Compare ', '').replace(' vs ', ' vs ');
                  onSearchChange(searchTerm);
                  handleSearch(searchTerm);
                } else if (suggestion.type === 'question') {
                  // For question-based suggestions, search with the question
                  const searchTerm = suggestion.text.replace('How to use ', '').replace(' effectively', '');
                  onSearchChange(searchTerm);
                  handleSearch(searchTerm);
                } else if (suggestion.type === 'workflow') {
                  // For workflow suggestions, search by workflow type
                  const searchTerm = suggestion.text.replace('Workflow: ', '');
                  onSearchChange(searchTerm);
                  handleSearch(searchTerm);
                } else if (suggestion.type === 'integration') {
                  // For integration suggestions, search for tools with integrations
                  const searchTerm = suggestion.text.includes('integrates with') 
                    ? suggestion.text.replace(/.*integrates with /, '')
                    : 'tools with integrations';
                  onSearchChange(searchTerm);
                  handleSearch(searchTerm);
                } else if (suggestion.type === 'alternative') {
                  // For alternative suggestions, search for the alternative tool
                  const searchTerm = suggestion.text.replace(/ \(Alternative to .*/, '');
                  onSearchChange(searchTerm);
                  handleSearch(searchTerm);
                } else {
                  const searchTerm = suggestion.text.replace(/^#/, '');
                  onSearchChange(searchTerm);
                  handleSearch(searchTerm);
                }
                
                // Track user interaction with suggestion
                trackSearchEvent(search, suggestion.type, suggestion.confidence || 0);
                
                // Track user feedback
                trackUserFeedback(search, suggestion, true);
              }}
            >
              {suggestion.icon}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{suggestion.text}</span>
                  {(suggestion.type === 'intent' || suggestion.type === 'insight' || suggestion.type === 'question' || suggestion.type === 'workflow') && (
                    <span style={{
                      ...styles.aiPoweredBadge,
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.75rem'
                    }}>
                      {suggestion.type === 'intent' ? 'AI-Powered' : 
                       suggestion.type === 'question' ? 'Question' : 
                       suggestion.type === 'workflow' ? 'Workflow' : 'Insight'}
                    </span>
                  )}
                </div>
                {suggestion.description && (
                  <div style={{ 
                    fontSize: '0.9rem', 
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    {suggestion.description.substring(0, 120)}...
                  </div>
                )}
                {suggestion.category && (
                  <div style={{ 
                    fontSize: '0.85rem', 
                    color: 'rgba(99, 102, 241, 0.8)',
                    marginTop: '0.25rem'
                  }}>
                    {suggestion.category}
                  </div>
                )}
              </div>
              {suggestion.count && (
                <span style={{ 
                  marginLeft: 'auto', 
                  fontSize: '0.9rem', 
                  color: 'rgba(255, 255, 255, 0.5)' 
                }}>
                  {suggestion.count.toLocaleString()} tools
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {showFilters && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'rgba(30, 30, 40, 0.95)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginTop: '1rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          zIndex: 100,
          width: '350px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ marginTop: 0, marginBottom: 0, fontSize: '1.25rem' }}>Filters</h3>
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Close filters"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>Pricing</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {['Free', 'Freemium', 'Paid', 'Contact for Pricing', 'Free Trial', 'Deals'].map(option => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={filters.pricing.includes(option)}
                    onChange={() => toggleFilter('pricing', option)}
                    style={{ 
                      marginRight: '0.75rem',
                      width: '18px',
                      height: '18px',
                      accentColor: '#6366f1'
                    }}
                  />
                  <span style={{ fontSize: '0.95rem' }}>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>Minimum Rating</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    minRating: prev.minRating === rating ? 0 : rating
                  }))}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: rating <= filters.minRating ? '#f59e0b' : 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    fontSize: '1.5rem',
                    padding: '0.25rem'
                  }}
                  aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
                >
                  ★
                </button>
              ))}
              <span style={{ marginLeft: '0.75rem', fontSize: '1rem' }}>
                {filters.minRating > 0 ? `${filters.minRating}+` : 'Any'}
              </span>
            </div>
          </div>

          <div>
            <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>Tags</h4>
            <div style={{ 
              maxHeight: '250px', 
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem'
            }}>
              {allTags.map(tag => (
                <label 
                  key={tag} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '8px',
                    backgroundColor: filters.tags.includes(tag) ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => toggleFilter('tag', tag)}
                    style={{ 
                      marginRight: '0.5rem',
                      width: '16px',
                      height: '16px',
                      accentColor: '#6366f1'
                    }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>#{tag}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <button
              onClick={resetSearchFeedback}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#fecaca',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Reset Data
            </button>
            <button
              onClick={displaySearchStatistics}
              style={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#6ee7b7',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              View Stats
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;