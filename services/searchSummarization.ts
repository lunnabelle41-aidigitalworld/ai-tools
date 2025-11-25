/**
 * Search result summarization service
 */

// Simple extractive summarization function
function extractiveSummarize(text: string, sentencesNeeded: number = 3): string {
  // Split text into sentences
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  // If we don't have enough sentences, return what we have
  if (sentences.length <= sentencesNeeded) {
    return sentences.join('. ') + '.';
  }
  
  // Simple scoring based on sentence position and length
  const scoredSentences = sentences.map((sentence, index) => {
    // Prefer sentences in the middle of the text
    const positionScore = 1 - Math.abs(0.5 - (index / sentences.length));
    
    // Prefer longer sentences (but not too long)
    const lengthScore = Math.min(sentence.length / 100, 1);
    
    // Combine scores
    const score = positionScore * 0.7 + lengthScore * 0.3;
    
    return { sentence, score, index };
  });
  
  // Sort by score and take top sentences
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, sentencesNeeded)
    .sort((a, b) => a.index - b.index); // Maintain original order
  
  return topSentences.map(s => s.sentence).join('. ') + '.';
}

/**
 * Generate a summary for search results
 */
export async function generateSearchSummary(query: string, results: any[]): Promise<string> {
  // Combine content from top results
  const combinedContent = results
    .slice(0, 5) // Use top 5 results
    .map(result => result.content || result.summary || '')
    .join(' ');
  
  // Generate summary
  const summary = extractiveSummarize(combinedContent, 2);
  
  // Add context about the query
  return `Based on your search for "${query}": ${summary}`;
}

/**
 * Generate a summary for a single document
 */
export async function summarizeDocument(document: any): Promise<string> {
  const content = document.content || document.summary || '';
  return extractiveSummarize(content, 1);
}

// Export functions for external use
// generateSearchSummary and summarizeDocument are already exported directly