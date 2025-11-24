import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'tool' | 'blog' | 'page';
  score?: number;
}

interface SearchContextType {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setQuery(searchQuery);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      
      if (data.success) {
        // Transform the results to match our SearchResult interface
        const formattedResults = data.results.map((result: any) => ({
          id: result._id || result.id,
          title: result.name || result.title,
          description: result.description || result.content?.substring(0, 200) + '...',
          url: result.url || `/${result.type === 'tool' ? 'tools' : 'blog'}/${result.slug || result.id}`,
          type: result.type || 'tool',
          score: result.score
        }));
        
        setResults(formattedResults);
      } else {
        setError(data.error || 'An error occurred during search');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
  };

  return (
    <SearchContext.Provider value={{ query, results, isLoading, error, search, clearSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
