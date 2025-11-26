import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faExternalLinkAlt, 
  faSpinner, 
  faFilter,
  faSort,
  faChartBar,
  faTimes,
  faChevronDown,
  faStar,
  faDollarSign,
  faTag,
  faCalendar,
  faLayerGroup,
  faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
import IntelligentSearchBar from '../components/search/IntelligentSearchBar';

// Define types
type SearchResult = {
  id: string;
  title: string;
  content: string;
  url: string;
  type: 'tool' | 'blog' | 'news' | 'update';
  category?: string;
  subcategory?: string;
  score?: number;
  snippet?: string;
  imageUrl?: string;
  publishedAt?: string;
  rating?: number;
  pricing?: string;
  tags?: string[];
  reviews?: number;
};

type FilterOption = {
  value: string;
  label: string;
  count?: number;
};

type SortOption = {
  value: string;
  label: string;
};

type SearchAnalytics = {
  totalSearches: number;
  cacheHitRate: number;
  averageResponseTime: number;
  topSearchTerms: { term: string; count: number }[];
};

type SearchCluster = {
  id: string;
  title: string;
  results: SearchResult[];
  count: number;
  category?: string;
};

export default function SearchPage() {
  const router = useRouter();
  const { q, type, category, minRating, maxPrice, sortBy, sortOrder } = router.query;
  
  const [searchQuery, setSearchQuery] = useState(typeof q === 'string' ? q : '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Advanced search features
  const [filters, setFilters] = useState({
    type: (type as string) || '',
    category: (category as string) || '',
    minRating: (minRating as string) || '',
    maxPrice: (maxPrice as string) || '',
    tags: [] as string[]
  });
  
  const [sortConfig, setSortConfig] = useState({
    by: (sortBy as string) || 'relevance',
    order: (sortOrder as string) || 'desc'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [showClusters, setShowClusters] = useState(false);
  const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null);
  const [clusters, setClusters] = useState<SearchCluster[]>([]);
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [types, setTypes] = useState<FilterOption[]>([]);
  
  const filtersRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Fetch search results when query or filters change
  useEffect(() => {
    const fetchResults = async () => {
      if (!q) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        // Build query parameters
        const params = new URLSearchParams();
        params.append('q', q as string);
        
        if (filters.type) params.append('type', filters.type);
        if (filters.category) params.append('category', filters.category);
        if (filters.minRating) params.append('minRating', filters.minRating);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (sortConfig.by) params.append('sortBy', sortConfig.by);
        if (sortConfig.order) params.append('sortOrder', sortConfig.order);

        const response = await fetch(`/api/search?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setResults(data.results || []);
        
        // Set clusters if available
        if (data.clusters) {
          setClusters(data.clusters);
        }
        
        // Set facets for filters
        if (data.facets) {
          setCategories(data.facets.categories?.map((cat: string) => ({ value: cat, label: cat })) || []);
          setTypes(data.facets.types?.map((type: string) => ({ value: type, label: type })) || []);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to load search results. Please try again.');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [q, filters, sortConfig]);

  // Fetch search analytics
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/search-analytics');
        if (response.ok) {
          const data = await response.json();
          setAnalytics(data.data);
        }
      } catch (err) {
        console.error('Analytics error:', err);
      }
    };

    fetchAnalytics();
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSort(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('q', searchQuery.trim());
      
      if (filters.type) params.append('type', filters.type);
      if (filters.category) params.append('category', filters.category);
      if (filters.minRating) params.append('minRating', filters.minRating);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (sortConfig.by) params.append('sortBy', sortConfig.by);
      if (sortConfig.order) params.append('sortOrder', sortConfig.order);

      router.push(`/search?${params.toString()}`);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (by: string, order: string) => {
    setSortConfig({ by, order });
    setShowSort(false);
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      minRating: '',
      maxPrice: '',
      tags: []
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeBadge = (type: string) => {
    const typeMap: Record<string, { label: string; color: string }> = {
      tool: { label: 'Tool', color: 'bg-blue-100 text-blue-800' },
      blog: { label: 'Article', color: 'bg-green-100 text-green-800' },
      news: { label: 'News', color: 'bg-purple-100 text-purple-800' },
      update: { label: 'Update', color: 'bg-yellow-100 text-yellow-800' },
    };
    
    const typeInfo = typeMap[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeInfo.color} capitalize`}>
        {typeInfo.label}
      </span>
    );
  };

  const sortOptions: SortOption[] = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'date', label: 'Newest First' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'title', label: 'Title (A-Z)' },
    { value: 'reviews', label: 'Most Reviews' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{q ? `${q} - Search Results | AI Vault` : 'Search | AI Vault'}</title>
        <meta name="description" content="Search our collection of AI tools, tutorials, and resources." />
      </Head>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <IntelligentSearchBar />
          </div>

          {/* Search Analytics - Mobile Responsive */}
          {analytics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faSearch} className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Total Searches</p>
                    <p className="text-base sm:text-xl font-semibold">{analytics.totalSearches.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChartBar} className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Cache Hit Rate</p>
                    <p className="text-base sm:text-xl font-semibold">{analytics.cacheHitRate}%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Avg Response</p>
                    <p className="text-base sm:text-xl font-semibold">{analytics.averageResponseTime}ms</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 sm:p-4 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faTag} className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 mr-2" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Popular Terms</p>
                    <p className="text-base sm:text-xl font-semibold truncate">{analytics.topSearchTerms[0]?.term || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Advanced Search Controls - Mobile Responsive */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            {/* Filter Button */}
            <div className="relative" ref={filtersRef}>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faFilter} className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="sm:inline hidden">Filters</span>
                <span className="sm:hidden inline">Filter</span>
                {Object.values(filters).some(v => v) && (
                  <span className="ml-1 sm:ml-2 inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {Object.values(filters).filter(v => v).length}
                  </span>
                )}
              </button>

              {showFilters && (
                <div className="origin-top-left absolute left-0 mt-1 sm:mt-2 w-72 sm:w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Clear all
                      </button>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {/* Type Filter */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Type
                        </label>
                        <select
                          value={filters.type}
                          onChange={(e) => handleFilterChange('type', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm text-gray-900 dark:text-white py-1.5 sm:py-2 px-2 sm:px-3"
                        >
                          <option value="">All Types</option>
                          {types.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Category Filter */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category
                        </label>
                        <select
                          value={filters.category}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm text-gray-900 dark:text-white py-1.5 sm:py-2 px-2 sm:px-3"
                        >
                          <option value="">All Categories</option>
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Rating Filter */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Minimum Rating
                        </label>
                        <select
                          value={filters.minRating}
                          onChange={(e) => handleFilterChange('minRating', e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm text-gray-900 dark:text-white py-1.5 sm:py-2 px-2 sm:px-3"
                        >
                          <option value="">Any Rating</option>
                          <option value="5">5 Stars</option>
                          <option value="4">4+ Stars</option>
                          <option value="3">3+ Stars</option>
                          <option value="2">2+ Stars</option>
                          <option value="1">1+ Stars</option>
                        </select>
                      </div>
                      
                      {/* Price Filter */}
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Maximum Price ($)
                        </label>
                        <input
                          type="number"
                          value={filters.maxPrice}
                          onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                          placeholder="Enter max price"
                          className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs sm:text-sm text-gray-900 dark:text-white py-1.5 sm:py-2 px-2 sm:px-3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sort Button */}
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => setShowSort(!showSort)}
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faSort} className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="sm:inline hidden">Sort by: </span>
                <span className="truncate max-w-[80px] sm:max-w-none">
                  {sortOptions.find(opt => opt.value === sortConfig.by)?.label || 'Most Relevant'}
                </span>
              </button>

              {showSort && (
                <div className="origin-top-left absolute left-0 mt-1 sm:mt-2 w-48 sm:w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value, sortConfig.order)}
                        className={`block w-full text-left px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm ${
                          sortConfig.by === option.value
                            ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-200'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Active Filters - Mobile Responsive */}
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <span 
                  key={key} 
                  className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                >
                  <span className="hidden sm:inline">{key}: </span>
                  <span className="truncate max-w-[60px] sm:max-w-none">{value}</span>
                  <button
                    type="button"
                    onClick={() => handleFilterChange(key, '')}
                    className="ml-1 sm:ml-2 inline-flex items-center"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-2 w-2 sm:h-3 sm:w-3" />
                  </button>
                </span>
              );
            })}
          </div>

          {/* Results - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6">
            {!hasSearched ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-3 sm:mb-4">
                  <FontAwesomeIcon icon={faSearch} className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" />
                  <h2 className="text-base sm:text-xl font-medium">Search our AI tools and resources</h2>
                  <p className="mt-1 sm:mt-2 text-sm sm:text-base">Enter a search term above to find what you're looking for</p>
                </div>
              </div>
            ) : isLoading ? (
              <div className="text-center py-8 sm:py-12">
                <FontAwesomeIcon 
                  icon={faSpinner} 
                  className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500 animate-spin mx-auto mb-3 sm:mb-4" 
                />
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">Searching for "{q}"...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 sm:p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-2 sm:ml-3">
                    <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            ) : results.length > 0 ? (
              <>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{q}"
                  </div>
                  
                  {/* Cluster Toggle */}
                  {clusters.length > 0 && (
                    <button
                      onClick={() => setShowClusters(!showClusters)}
                      className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FontAwesomeIcon icon={faLayerGroup} className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="sm:inline hidden">{showClusters ? 'Show All' : 'Group by Category'}</span>
                      <span className="sm:hidden inline">{showClusters ? 'All' : 'Group'}</span>
                    </button>
                  )}
                </div>
                
                {showClusters && clusters.length > 0 ? (
                  <div className="space-y-6">
                    {clusters.map(cluster => (
                      <div key={cluster.id} className="border-l-4 border-blue-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          {cluster.title} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">({cluster.count} tools)</span>
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          {cluster.results.slice(0, 3).map((result, index) => (
                            <div 
                              key={`${result.id}-${index}`} 
                              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden"
                            >
                              <div className="p-3 sm:p-5">
                                <div className="flex items-start">
                                  {result.imageUrl && (
                                    <div className="flex-shrink-0 mr-3 sm:mr-4">
                                      <Image 
                                        src={result.imageUrl} 
                                        alt={result.title}
                                        className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-md"
                                        width={64}
                                        height={64}
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      {getTypeBadge(result.type)}
                                      {result.category && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px] sm:max-w-none">
                                          {result.category}
                                        </span>
                                      )}
                                      {result.publishedAt && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                                          {formatDate(result.publishedAt)}
                                        </span>
                                      )}
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                      <Link href={result.url} className="hover:text-blue-600 dark:hover:text-blue-400">
                                        {result.title}
                                        <FontAwesomeIcon 
                                          icon={faExternalLinkAlt} 
                                          className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-400 dark:text-gray-500 inline-block"
                                        />
                                      </Link>
                                    </h3>
                                    {result.snippet && (
                                      <p 
                                        className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2"
                                        dangerouslySetInnerHTML={{ 
                                          __html: result.snippet.replace(
                                            new RegExp(`(${searchQuery})`, 'gi'), 
                                            '<span class="bg-yellow-100 dark:bg-yellow-900/50">$1</span>'
                                          )
                                        }} 
                                      />
                                    )}
                                    
                                    {/* Additional metadata - Mobile Responsive */}
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs">
                                      {result.rating !== undefined && result.rating > 0 && (
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                          <FontAwesomeIcon icon={faStar} className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 mr-1" />
                                          <span>{result.rating.toFixed(1)}</span>
                                        </div>
                                      )}
                                      
                                      {result.pricing && (
                                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                                          <FontAwesomeIcon icon={faDollarSign} className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                          <span>{result.pricing}</span>
                                        </div>
                                      )}
                                      
                                      {result.reviews !== undefined && result.reviews > 0 && (
                                        <div className="text-gray-600 dark:text-gray-400 hidden sm:block">
                                          {result.reviews} {result.reviews === 1 ? 'review' : 'reviews'}
                                        </div>
                                      )}
                                      
                                      {result.tags && result.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                          {result.tags.slice(0, 2).map(tag => (
                                            <span 
                                              key={tag} 
                                              className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                            >
                                              {tag}
                                            </span>
                                          ))}
                                          {result.tags.length > 2 && (
                                            <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                              +{result.tags.length - 2} more
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                    
                                    {result.score !== undefined && (
                                      <div className="mt-2 sm:mt-3">
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                          <div 
                                            className="bg-blue-500 h-1 rounded-full" 
                                            style={{ width: `${Math.min(100, Math.round(result.score * 100))}%` }}
                                          ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                                          {Math.round(result.score * 100)}% match
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {cluster.results.length > 3 && (
                            <div className="text-center py-2">
                              <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                                View all {cluster.count} tools in {cluster.title}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {results.map((result, index) => (
                      <div 
                        key={`${result.id}-${index}`} 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700 overflow-hidden"
                      >
                        <div className="p-3 sm:p-5">
                          <div className="flex items-start">
                            {result.imageUrl && (
                              <div className="flex-shrink-0 mr-3 sm:mr-4">
                                <Image 
                                  src={result.imageUrl} 
                                  alt={result.title}
                                  className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-md"
                                  width={64}
                                  height={64}
                                />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                {getTypeBadge(result.type)}
                                {result.category && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[100px] sm:max-w-none">
                                    {result.category}
                                  </span>
                                )}
                                {result.publishedAt && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                                    {formatDate(result.publishedAt)}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                <Link href={result.url} className="hover:text-blue-600 dark:hover:text-blue-400">
                                  {result.title}
                                  <FontAwesomeIcon 
                                    icon={faExternalLinkAlt} 
                                    className="ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-400 dark:text-gray-500 inline-block"
                                  />
                                </Link>
                              </h3>
                              {result.snippet && (
                                <p 
                                  className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mt-1 line-clamp-2"
                                  dangerouslySetInnerHTML={{ 
                                    __html: result.snippet.replace(
                                      new RegExp(`(${searchQuery})`, 'gi'), 
                                      '<span class="bg-yellow-100 dark:bg-yellow-900/50">$1</span>'
                                    )
                                  }} 
                                />
                              )}
                              
                              {/* Additional metadata - Mobile Responsive */}
                              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs">
                                {result.rating !== undefined && result.rating > 0 && (
                                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FontAwesomeIcon icon={faStar} className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 mr-1" />
                                    <span>{result.rating.toFixed(1)}</span>
                                  </div>
                                )}
                                
                                {result.pricing && (
                                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <FontAwesomeIcon icon={faDollarSign} className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                    <span>{result.pricing}</span>
                                  </div>
                                )}
                                
                                {result.reviews !== undefined && result.reviews > 0 && (
                                  <div className="text-gray-600 dark:text-gray-400 hidden sm:block">
                                    {result.reviews} {result.reviews === 1 ? 'review' : 'reviews'}
                                  </div>
                                )}
                                
                                {result.tags && result.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {result.tags.slice(0, 2).map(tag => (
                                      <span 
                                        key={tag} 
                                        className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {result.tags.length > 2 && (
                                      <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                        +{result.tags.length - 2} more
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              {result.score !== undefined && (
                                <div className="mt-2 sm:mt-3">
                                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                                    <div 
                                      className="bg-blue-500 h-1 rounded-full" 
                                      style={{ width: `${Math.min(100, Math.round(result.score * 100))}%` }}
                                    ></div>
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                                    {Math.round(result.score * 100)}% match
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 dark:text-gray-500">
                  <svg className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-base sm:text-xl font-medium">No results found for "{q}"</h2>
                  <p className="mt-1 sm:mt-2 text-sm sm:text-base">Try different keywords or check your spelling</p>
                  
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2 sm:mb-3">Try these suggestions:</h3>
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                      <button 
                        onClick={() => setSearchQuery('AI chatbot')}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        AI chatbot
                      </button>
                      <button 
                        onClick={() => setSearchQuery('image generation')}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        Image generation
                      </button>
                      <button 
                        onClick={() => setSearchQuery('writing assistant')}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300"
                      >
                        Writing assistant
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
