/**
 * Autocomplete service for search suggestions
 */

import { Document } from './searchService';
import { fuzzySearch } from './fuzzySearch';

// Simple trie data structure for fast prefix matching
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord = false;
  frequency = 0;
}

class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string, frequency: number = 1) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
    node.frequency += frequency;
  }

  searchPrefix(prefix: string): string[] {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }
    return this.getAllWordsWithPrefix(node, prefix.toLowerCase());
  }

  private getAllWordsWithPrefix(node: TrieNode, prefix: string): string[] {
    const results: string[] = [];
    
    if (node.isEndOfWord) {
      results.push(prefix);
    }
    
    for (const [char, childNode] of node.children) {
      results.push(...this.getAllWordsWithPrefix(childNode, prefix + char));
    }
    
    // Sort by frequency (descending) and limit to top 10
    return results
      .map(word => ({ word, frequency: this.getFrequency(word) }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10)
      .map(item => item.word);
  }

  private getFrequency(word: string): number {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) {
        return 0;
      }
      node = node.children.get(char)!;
    }
    return node.isEndOfWord ? node.frequency : 0;
  }
}

// Global trie instance
const searchTrie = new Trie();

// Initialize autocomplete with common search terms
let isInitialized = false;

export async function initializeAutocomplete(documents: Document[]) {
  if (isInitialized) return;
  
  console.log('Initializing autocomplete with', documents.length, 'documents');
  
  // Extract common terms from documents
  const termFrequency = new Map<string, number>();
  
  for (const doc of documents) {
    // Extract terms from title
    const titleTerms = (doc.title || '').toLowerCase().split(/\s+/);
    for (const term of titleTerms) {
      if (term.length > 2) {
        termFrequency.set(term, (termFrequency.get(term) || 0) + 3);
      }
    }
    
    // Extract terms from category and subcategory
    if (doc.category) {
      const categoryTerms = doc.category.toLowerCase().split(/\s+/);
      for (const term of categoryTerms) {
        if (term.length > 2) {
          termFrequency.set(term, (termFrequency.get(term) || 0) + 2);
        }
      }
    }
    
    if (doc.subcategory) {
      const subcategoryTerms = doc.subcategory.toLowerCase().split(/\s+/);
      for (const term of subcategoryTerms) {
        if (term.length > 2) {
          termFrequency.set(term, (termFrequency.get(term) || 0) + 2);
        }
      }
    }
    
    // Extract terms from tags
    if (doc.tags && Array.isArray(doc.tags)) {
      for (const tag of doc.tags) {
        const tagTerms = tag.toLowerCase().split(/\s+/);
        for (const term of tagTerms) {
          if (term.length > 2) {
            termFrequency.set(term, (termFrequency.get(term) || 0) + 1);
          }
        }
      }
    }
  }
  
  // Insert terms into trie
  for (const [term, frequency] of termFrequency.entries()) {
    if (term.length > 2 && term.length < 30) { // Reasonable length limits
      searchTrie.insert(term, frequency);
    }
  }
  
  // Add some common search prefixes
  const commonPrefixes = [
    'ai', 'artificial', 'intelligence', 'machine', 'learning', 'deep', 'neural',
    'natural', 'language', 'processing', 'computer', 'vision', 'robotics',
    'data', 'analytics', 'automation', 'chatbot', 'image', 'video', 'audio',
    'text', 'generation', 'translation', 'recognition', 'detection', 'prediction'
  ];
  
  for (const prefix of commonPrefixes) {
    searchTrie.insert(prefix, 10); // High frequency for common prefixes
  }
  
  isInitialized = true;
  console.log('Autocomplete initialization complete');
}

// Get autocomplete suggestions
export function getAutocompleteSuggestions(
  query: string,
  limit: number = 10
): Array<{ term: string; frequency: number }> {
  if (!query || query.length < 2) {
    return [];
  }
  
  // Get exact prefix matches
  const exactMatches = searchTrie.searchPrefix(query);
  
  // Get fuzzy matches for typo tolerance
  const allTerms: string[] = [];
  const collectTerms = (node: TrieNode, prefix: string) => {
    if (node.isEndOfWord) {
      allTerms.push(prefix);
    }
    for (const [char, childNode] of node.children) {
      collectTerms(childNode, prefix + char);
    }
  };
  collectTerms(searchTrie.root, '');
  
  const fuzzyMatches = fuzzySearch(query, allTerms, 0.7)
    .filter(match => !exactMatches.includes(match.item)) // Exclude exact matches
    .slice(0, 5);
  
  // Combine and rank results
  const results: Array<{ term: string; frequency: number }> = [];
  
  // Add exact matches with high frequency
  for (const term of exactMatches) {
    results.push({ term, frequency: 100 });
  }
  
  // Add fuzzy matches with adjusted frequency
  for (const match of fuzzyMatches) {
    results.push({ term: match.item, frequency: Math.round(match.similarity * 50) });
  }
  
  // Sort by frequency and limit
  return results
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, limit);
}

// Get trending search terms
export function getTrendingSearchTerms(limit: number = 10): string[] {
  // This would typically come from analytics data
  // For now, we'll return some common terms
  return [
    'ai tools',
    'chatgpt alternatives',
    'image generation',
    'video editing',
    'content creation',
    'machine learning',
    'natural language processing',
    'data analysis',
    'automation tools',
    'productivity apps'
  ].slice(0, limit);
}

export default {
  initializeAutocomplete,
  getAutocompleteSuggestions,
  getTrendingSearchTerms
};