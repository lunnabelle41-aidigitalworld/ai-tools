/**
 * Search result summarization service using AI techniques
 */

// Summary types
export type SummaryType = 'brief' | 'detailed' | 'keypoints' | 'comparison';

// Summarization options
export interface SummarizationOptions {
  type: SummaryType;
  maxLength?: number;
  includeKeywords?: boolean;
  includeStats?: boolean;
}

// Summarized result
export interface SummarizedResult {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  keywords: string[];
  stats?: {
    wordCount: number;
    readabilityScore: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  };
}

/**
 * Generate a brief summary of content using extractive summarization
 */
function generateBriefSummary(content: string, maxLength: number = 150): string {
  if (!content) return '';
  
  // Simple extractive summarization by selecting the most relevant sentences
  const sentences = content
    .replace(/([.!?])\s*(?=[A-Z])/g, '$1|')
    .split('|')
    .filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) {
    return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
  }
  
  // For brief summary, return the first 1-2 sentences
  const summarySentences = sentences.slice(0, 2);
  let summary = summarySentences.join(' ').trim();
  
  // Truncate if too long
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength - 3) + '...';
  }
  
  return summary;
}

/**
 * Generate detailed summary with key points
 */
function generateDetailedSummary(content: string, maxLength: number = 300): { summary: string; keyPoints: string[] } {
  if (!content) {
    return { summary: '', keyPoints: [] };
  }
  
  // Split into sentences
  const sentences = content
    .replace(/([.!?])\s*(?=[A-Z])/g, '$1|')
    .split('|')
    .filter(s => s.trim().length > 0);
  
  if (sentences.length === 0) {
    const summary = content.substring(0, maxLength) + (content.length > maxLength ? '...' : '');
    return { summary, keyPoints: [] };
  }
  
  // Extract key points (sentences with numbers, lists, or strong indicators)
  const keyPoints = sentences
    .filter(sentence => 
      sentence.includes('•') || 
      sentence.includes('-') || 
      /\d+\.\s/.test(sentence) || 
      sentence.length > 50
    )
    .slice(0, 5)
    .map(point => point.trim());
  
  // Generate summary from remaining sentences
  const summarySentences = sentences
    .filter(sentence => !keyPoints.includes(sentence.trim()))
    .slice(0, 3);
  
  let summary = summarySentences.join(' ').trim();
  
  // Truncate if too long
  if (summary.length > maxLength) {
    summary = summary.substring(0, maxLength - 3) + '...';
  }
  
  return { summary, keyPoints };
}

/**
 * Extract keywords from content using TF-IDF approach
 */
function extractKeywords(content: string, count: number = 10): string[] {
  if (!content) return [];
  
  // Simple keyword extraction based on frequency and importance
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were',
    'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its',
    'our', 'their', 'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'yourselves', 'themselves'
  ]);
  
  // Tokenize and clean content
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
  
  // Count word frequencies
  const wordCounts = new Map<string, number>();
  words.forEach(word => {
    const count = wordCounts.get(word) || 0;
    wordCounts.set(word, count + 1);
  });
  
  // Sort by frequency and return top keywords
  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}

/**
 * Calculate readability score using a simplified Flesch-Kincaid approach
 */
function calculateReadabilityScore(content: string): number {
  if (!content) return 0;
  
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((count, word) => {
    // Simplified syllable counting
    return count + Math.max(1, (word.match(/[aeiou]/gi) || []).length);
  }, 0);
  
  if (sentences.length === 0 || words.length === 0) return 0;
  
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  // Simplified Flesch-Kincaid grade level
  const score = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  
  // Convert to 0-100 scale
  return Math.max(0, Math.min(100, 100 - (score * 10)));
}

/**
 * Determine sentiment of content
 */
function determineSentiment(content: string): 'positive' | 'neutral' | 'negative' {
  if (!content) return 'neutral';
  
  const positiveWords = new Set([
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'brilliant', 'outstanding',
    'superb', 'terrific', 'fabulous', 'incredible', 'perfect', 'ideal', 'optimal', 'beneficial', 'advantageous',
    'helpful', 'useful', 'effective', 'efficient', 'reliable', 'trustworthy', 'valuable', 'worthwhile'
  ]);
  
  const negativeWords = new Set([
    'bad', 'terrible', 'awful', 'horrible', 'dreadful', 'poor', 'mediocre', 'inferior', 'unsatisfactory',
    'disappointing', 'frustrating', 'annoying', 'irritating', 'problematic', 'difficult', 'complicated',
    'expensive', 'costly', 'overpriced', 'ineffective', 'inefficient', 'unreliable', 'useless'
  ]);
  
  const words = content.toLowerCase().match(/\b(\w+)\b/g) || [];
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.has(word)) positiveCount++;
    if (negativeWords.has(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

/**
 * Summarize a single search result
 */
export function summarizeResult(
  result: { id: string; title: string; content: string; [key: string]: any },
  options: SummarizationOptions = { type: 'brief' }
): SummarizedResult {
  const { type, maxLength = 300, includeKeywords = true, includeStats = true } = options;
  
  let summary = '';
  let keyPoints: string[] = [];
  let keywords: string[] = [];
  let stats: { wordCount: number; readabilityScore: number; sentiment: 'positive' | 'neutral' | 'negative' } | undefined;
  
  switch (type) {
    case 'brief':
      summary = generateBriefSummary(result.content, maxLength);
      if (includeKeywords) {
        keywords = extractKeywords(result.content, 5);
      }
      break;
      
    case 'detailed':
    case 'keypoints':
      const detailed = generateDetailedSummary(result.content, maxLength);
      summary = detailed.summary;
      keyPoints = detailed.keyPoints;
      if (includeKeywords) {
        keywords = extractKeywords(result.content, 10);
      }
      break;
      
    case 'comparison':
      // For comparison, focus on key differentiators
      summary = generateBriefSummary(result.content, maxLength);
      keyPoints = extractKeywords(result.content, 8)
        .slice(0, 5)
        .map(keyword => `Relevant to "${keyword}"`);
      if (includeKeywords) {
        keywords = extractKeywords(result.content, 5);
      }
      break;
  }
  
  if (includeStats) {
    stats = {
      wordCount: result.content.split(/\s+/).filter(w => w.length > 0).length,
      readabilityScore: calculateReadabilityScore(result.content),
      sentiment: determineSentiment(result.content)
    };
  }
  
  return {
    id: result.id,
    title: result.title,
    summary,
    keyPoints,
    keywords,
    stats
  };
}

/**
 * Summarize multiple search results
 */
export function summarizeResults(
  results: { id: string; title: string; content: string; [key: string]: any }[],
  options: SummarizationOptions = { type: 'brief' }
): SummarizedResult[] {
  return results.map(result => summarizeResult(result, options));
}

/**
 * Generate a summary comparison of multiple results
 */
export function generateComparisonSummary(
  results: { id: string; title: string; content: string; [key: string]: any }[]
): string {
  if (results.length === 0) return 'No results to compare.';
  if (results.length === 1) return `Summary of ${results[0].title}: ${generateBriefSummary(results[0].content)}`;
  
  // Extract key points from each result
  const summaries = results.map(result => ({
    title: result.title,
    keyPoints: extractKeywords(result.content, 3)
  }));
  
  // Generate comparison text
  let comparison = `Comparison of ${results.length} results:\n\n`;
  
  summaries.forEach((summary, index) => {
    comparison += `${index + 1}. ${summary.title}:\n`;
    summary.keyPoints.forEach(point => {
      comparison += `   • ${point}\n`;
    });
    comparison += '\n';
  });
  
  return comparison;
}