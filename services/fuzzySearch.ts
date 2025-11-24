/**
 * Simple fuzzy search implementation using Levenshtein distance
 */

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1).fill(0).map(() => Array(str1.length + 1).fill(0));
  
  // Initialize first row and column
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  // Fill the matrix
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,     // insertion
        matrix[j - 1][i] + 1,     // deletion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Calculate similarity ratio (0-1)
function similarityRatio(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

// Find fuzzy matches in an array of strings
export function fuzzySearch(
  query: string,
  candidates: string[],
  threshold: number = 0.6
): Array<{ item: string; similarity: number }> {
  const results: Array<{ item: string; similarity: number }> = [];
  
  for (const candidate of candidates) {
    const similarity = similarityRatio(query, candidate);
    if (similarity >= threshold) {
      results.push({ item: candidate, similarity });
    }
  }
  
  // Sort by similarity (highest first)
  return results.sort((a, b) => b.similarity - a.similarity);
}

// Fuzzy search for documents
export function fuzzyDocumentSearch(
  query: string,
  documents: Array<{ title: string; content: string; [key: string]: any }>,
  threshold: number = 0.6
): Array<{ document: any; similarity: number }> {
  const results: Array<{ document: any; similarity: number }> = [];
  
  for (const document of documents) {
    // Combine title and content for search
    const searchText = `${document.title} ${document.content}`.toLowerCase();
    const searchQuery = query.toLowerCase();
    
    const similarity = similarityRatio(searchQuery, searchText);
    if (similarity >= threshold) {
      results.push({ document, similarity });
    }
  }
  
  // Sort by similarity (highest first)
  return results.sort((a, b) => b.similarity - a.similarity);
}

export default {
  levenshteinDistance,
  similarityRatio,
  fuzzySearch,
  fuzzyDocumentSearch
};