import { useState, useEffect, useCallback } from 'react';
import { semanticSearch, SearchResult, Document } from '../../services/searchService';
import { useUserBehavior } from '../../hooks/useUserBehavior';
import Link from 'next/link';

interface SemanticSearchProps {
  documents: Array<{
    id: string;
    title: string;
    content: string;
    url?: string;
    type?: Document['type']; // Make type optional and use the Document type
  }>;
  placeholder?: string;
  className?: string;
}

export default function SemanticSearch({ 
  documents, 
  placeholder = 'Search with natural language...',
  className = ''
}: SemanticSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { trackSearch, trackResultClick, getUserSearchHistory } = useUserBehavior();
  const [searchHistory, setSearchHistory] = useState<Array<{query: string}>>([]);

  // Load search history on component mount
  useEffect(() => {
    const history = getUserSearchHistory();
    setSearchHistory(history.map(item => ({ query: item.query })));
  }, [getUserSearchHistory]);

  // Debounce search
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Map documents to include the required type property
        const typedDocuments: Document[] = documents.map(doc => ({
          ...doc,
          type: doc.type || 'tool', // Default to 'tool' if type is not provided
          url: doc.url || '#' // Provide a default URL if not provided
        }));
        
        const searchResults = await semanticSearch(query, typedDocuments);
        setResults(searchResults);
        trackSearch(query, searchResults);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, documents, trackSearch]);

  const handleResultClick = (result: SearchResult) => {
    trackResultClick(query, result.id, result.title);
    setShowResults(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
          placeholder={placeholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {showResults && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-auto">
          {query === '' ? (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
              {searchHistory.length > 0 ? (
                <div className="space-y-1">
                  {searchHistory.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(item.query);
                        setShowResults(true);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                    >
                      {item.query}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No recent searches</p>
              )}
            </div>
          ) : results.length > 0 ? (
            <div className="py-1">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url || `#${result.id}`}
                  onClick={() => handleResultClick(result)}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                >
                  <h4 className="font-medium text-gray-900">{result.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {result.content}
                  </p>
                  <div className="mt-1 flex justify-between items-center">
                    <span className="text-xs text-blue-600">
                      {result.url ? new URL(result.url).hostname : ''}
                    </span>
                    <span className="text-xs text-gray-500">
                      {Math.round(result.similarity * 100)}% relevant
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              {isLoading ? 'Searching...' : 'No results found'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}