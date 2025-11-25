import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  faSearch, 
  faFilter, 
  faTimes, 
  faStar, 
  faDollarSign,
  faTag,
  faChevronDown,
  faMicrophone
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Define types
interface SearchFilters {
  category: string;
  price: string;
  features: string[];
  free: boolean;
  paid: boolean;
  launchDateFrom: string;
  launchDateTo: string;
  lastUpdatedFrom: string;
  lastUpdatedTo: string;
  sortBy: string;
  sortOrder: string;
  hasAPI: boolean;
  hasMobileApp: boolean;
  hasChromeExtension: boolean;
  integrationCount: number;
  toolAge: string;
  // Personalization options
  boostFavorites: boolean;
  boostHistory: boolean;
  excludeDisliked: boolean;
  // Clustering options
  clusterResults: boolean;
  advancedClustering: boolean;
}

interface Category {
  value: string;
  label: string;
}

interface FeatureTag {
  value: string;
  label: string;
}

interface Suggestion {
  term: string;
  frequency: number;
}

const aiCategories: Category[] = [
  { value: 'text_generation', label: 'Text Generation' },
  { value: 'image_generation', label: 'Image Generation' },
  { value: 'video_ai', label: 'Video AI' },
  { value: 'audio_ai', label: 'Audio AI' },
  { value: 'code_ai', label: 'Code AI' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'research', label: 'Research' },
  { value: 'business', label: 'Business' }
];

const featureTags: FeatureTag[] = [
  { value: 'api_access', label: 'API Access' },
  { value: 'chrome_extension', label: 'Chrome Extension' },
  { value: 'mobile_app', label: 'Mobile App' },
  { value: 'open_source', label: 'Open Source' },
  { value: 'team_collaboration', label: 'Team Collaboration' },
  { value: 'integrations', label: 'Integrations' }
];

export default function IntelligentSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    price: '',
    features: [],
    free: false,
    paid: false,
    launchDateFrom: '',
    launchDateTo: '',
    lastUpdatedFrom: '',
    lastUpdatedTo: '',
    sortBy: 'relevance',
    sortOrder: 'desc',
    hasAPI: false,
    hasMobileApp: false,
    hasChromeExtension: false,
    integrationCount: 0,
    toolAge: '',
    // Personalization options
    boostFavorites: false,
    boostHistory: false,
    excludeDisliked: false,
    // Clustering options
    clusterResults: false,
    advancedClustering: false
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Check if speech recognition is supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      setIsSpeechSupported(true);
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch autocomplete suggestions
  const fetchSuggestions = useCallback(async (searchTerm: string) => {
    if (searchTerm.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(`/api/autocomplete?q=${encodeURIComponent(searchTerm)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.suggestions) {
          setSuggestions(data.suggestions.slice(0, 8));
        }
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        fetchSuggestions(query);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query parameters
    const params = new URLSearchParams();
    params.append('q', query.trim());
    
    if (filters.category) params.append('category', filters.category);
    if (filters.price) params.append('maxPrice', filters.price);
    if (filters.free) params.append('pricingType', 'Free');
    if (filters.paid) params.append('pricingType', 'Paid');
    if (filters.launchDateFrom) params.append('launchDateFrom', filters.launchDateFrom);
    if (filters.launchDateTo) params.append('launchDateTo', filters.launchDateTo);
    if (filters.lastUpdatedFrom) params.append('lastUpdatedFrom', filters.lastUpdatedFrom);
    if (filters.lastUpdatedTo) params.append('lastUpdatedTo', filters.lastUpdatedTo);
    if (filters.hasAPI) params.append('hasAPI', 'true');
    if (filters.hasMobileApp) params.append('hasMobileApp', 'true');
    if (filters.hasChromeExtension) params.append('hasChromeExtension', 'true');
    if (filters.integrationCount > 0) params.append('integrationCount', filters.integrationCount.toString());
    if (filters.toolAge) params.append('toolAge', filters.toolAge);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    // Personalization options
    if (filters.boostFavorites) params.append('boostFavorites', 'true');
    if (filters.boostHistory) params.append('boostHistory', 'true');
    if (filters.excludeDisliked) params.append('excludeDisliked', 'true');
    // Clustering options
    if (filters.clusterResults) params.append('cluster', 'true');
    if (filters.advancedClustering) params.append('advancedClustering', 'true');
    
    router.push(`/search?${params.toString()}`);
    setShowSuggestions(false);
    setShowFilters(false);
  };

  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => {
      const newFeatures = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      
      return { ...prev, features: newFeatures };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      price: '',
      features: [],
      free: false,
      paid: false,
      launchDateFrom: '',
      launchDateTo: '',
      lastUpdatedFrom: '',
      lastUpdatedTo: '',
      sortBy: 'relevance',
      sortOrder: 'desc',
      hasAPI: false,
      hasMobileApp: false,
      hasChromeExtension: false,
      integrationCount: 0,
      toolAge: '',
      // Personalization options
      boostFavorites: false,
      boostHistory: false,
      excludeDisliked: false,
      // Clustering options
      clusterResults: false,
      advancedClustering: false
    });
  };

  const hasActiveFilters = filters.category || filters.price || filters.features.length > 0 || filters.free || filters.paid || filters.launchDateFrom || filters.launchDateTo || filters.lastUpdatedFrom || filters.lastUpdatedTo || filters.hasAPI || filters.hasMobileApp || filters.hasChromeExtension || filters.integrationCount > 0 || filters.toolAge || (filters.sortBy !== 'relevance') || (filters.sortOrder !== 'desc') || filters.boostFavorites || filters.boostHistory || filters.excludeDisliked || filters.clusterResults || filters.advancedClustering;

  return (
    <div className="ai-search-container w-full max-w-4xl mx-auto" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        {/* Main Search Bar - Mobile Optimized */}
        <div className="relative flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex-1 relative w-full">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowSuggestions(true)}
              placeholder="🔍 Find AI tools for... (e.g., 'video editing', 'code generation', 'content writing')"
              className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-20 text-gray-900 dark:text-white bg-transparent focus:outline-none text-base sm:text-lg"
            />
            
            {/* Voice Search Button */}
            {isSpeechSupported && (
              <button
                type="button"
                onClick={() => {
                  if (isListening) {
                    recognitionRef.current.stop();
                    setIsListening(false);
                  } else {
                    recognitionRef.current.start();
                    setIsListening(true);
                  }
                }}
                className={`absolute right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                aria-label="Voice search"
              >
                <FontAwesomeIcon icon={faMicrophone} className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
            
            {/* Loading indicator */}
            {false && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}
          </div>
          
          {/* Filter Button - Mobile Responsive */}
          <div className="flex w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2 flex items-center border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 ${
                hasActiveFilters 
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              <span className="sm:hidden">Filters</span>
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 rounded-full">
                  {[
                    filters.category,
                    filters.price,
                    ...filters.features,
                    filters.free ? 'free' : '',
                    filters.paid ? 'paid' : ''
                  ].filter(Boolean).length}
                </span>
              )}
            </button>
            
            {/* Search Button - Mobile Responsive */}
            <button
              type="submit"
              className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium flex items-center transition-all duration-200"
            >
              <FontAwesomeIcon icon={faSearch} className="mr-0 sm:mr-2" />
              <span className="sm:inline hidden">Search</span>
              <span className="sm:hidden inline">Go</span>
            </button>
          </div>
        </div>

        {/* Suggestions Dropdown - Mobile Optimized */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Search Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion.term)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 flex items-center"
                >
                  <FontAwesomeIcon icon={faSearch} className="text-gray-400 dark:text-gray-500 mr-3" />
                  <span className="flex-1 text-sm sm:text-base">{suggestion.term}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {suggestion.frequency}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filters Panel - Mobile Optimized */}
        {showFilters && (
          <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Search Filters</h3>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Clear all
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white"
                    >
                      <option value="">All Categories</option>
                      {aiCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    value={filters.price}
                    onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Enter max price"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                {/* Pricing Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pricing Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.free}
                        onChange={(e) => setFilters(prev => ({ ...prev, free: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Free</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.paid}
                        onChange={(e) => setFilters(prev => ({ ...prev, paid: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Paid</span>
                    </label>
                  </div>
                </div>
                
                {/* Feature Tags Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {featureTags.map((feature) => (
                      <button
                        key={feature.value}
                        type="button"
                        onClick={() => toggleFeature(feature.value)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          filters.features.includes(feature.value)
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {feature.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Boolean Feature Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Features
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.hasAPI}
                        onChange={(e) => setFilters(prev => ({ ...prev, hasAPI: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Has API</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.hasMobileApp}
                        onChange={(e) => setFilters(prev => ({ ...prev, hasMobileApp: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Mobile App</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.hasChromeExtension}
                        onChange={(e) => setFilters(prev => ({ ...prev, hasChromeExtension: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Chrome Extension</span>
                    </label>
                  </div>
                </div>
                
                {/* Integration Count Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Integrations
                  </label>
                  <input
                    type="number"
                    value={filters.integrationCount}
                    onChange={(e) => setFilters(prev => ({ ...prev, integrationCount: parseInt(e.target.value) || 0 }))}
                    min="0"
                    max="20"
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                {/* Tool Age Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tool Age
                  </label>
                  <select
                    value={filters.toolAge}
                    onChange={(e) => setFilters(prev => ({ ...prev, toolAge: e.target.value }))}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white"
                  >
                    <option value="">Any Age</option>
                    <option value="new">New (Less than 1 year)</option>
                    <option value="established">Established (1-3 years)</option>
                    <option value="legacy">Legacy (More than 3 years)</option>
                  </select>
                </div>
                
                {/* Date Range Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Launch Date From
                    </label>
                    <input
                      type="date"
                      value={filters.launchDateFrom}
                      onChange={(e) => setFilters(prev => ({ ...prev, launchDateFrom: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Launch Date To
                    </label>
                    <input
                      type="date"
                      value={filters.launchDateTo}
                      onChange={(e) => setFilters(prev => ({ ...prev, launchDateTo: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Updated From
                    </label>
                    <input
                      type="date"
                      value={filters.lastUpdatedFrom}
                      onChange={(e) => setFilters(prev => ({ ...prev, lastUpdatedFrom: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Updated To
                    </label>
                    <input
                      type="date"
                      value={filters.lastUpdatedTo}
                      onChange={(e) => setFilters(prev => ({ ...prev, lastUpdatedTo: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                {/* Sort Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="date">Date</option>
                      <option value="rating">Rating</option>
                      <option value="title">Title</option>
                      <option value="reviews">Reviews</option>
                      <option value="popularity">Popularity</option>
                      <option value="trending">Trending</option>
                      <option value="lastUpdated">Last Updated</option>
                      <option value="launchDate">Launch Date</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort Order
                    </label>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value }))}
                      className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm text-gray-900 dark:text-white"
                    >
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                </div>
                
                {/* Personalization Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Personalization
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.boostFavorites}
                        onChange={(e) => setFilters(prev => ({ ...prev, boostFavorites: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Boost Favorites</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.boostHistory}
                        onChange={(e) => setFilters(prev => ({ ...prev, boostHistory: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Boost History</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.excludeDisliked}
                        onChange={(e) => setFilters(prev => ({ ...prev, excludeDisliked: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Exclude Disliked</span>
                    </label>
                  </div>
                </div>
                
                {/* Clustering Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Result Clustering
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.clusterResults}
                        onChange={(e) => setFilters(prev => ({ ...prev, clusterResults: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Enable Clustering</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.advancedClustering}
                        onChange={(e) => setFilters(prev => ({ ...prev, advancedClustering: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Advanced Clustering</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {filters.category && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        Category: {aiCategories.find(c => c.value === filters.category)?.label}
                        <button
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                          className="ml-2 inline-flex items-center"
                        >
                          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    
                    {filters.price && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        Max Price: ${filters.price}
                        <button
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, price: '' }))}
                          className="ml-2 inline-flex items-center"
                        >
                          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    
                    {filters.free && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        Free
                        <button
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, free: false }))}
                          className="ml-2 inline-flex items-center"
                        >
                          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    
                    {filters.paid && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        Paid
                        <button
                          type="button"
                          onClick={() => setFilters(prev => ({ ...prev, paid: false }))}
                          className="ml-2 inline-flex items-center"
                        >
                          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    
                    {filters.features.map((feature) => (
                      <span key={feature} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                        {featureTags.find(f => f.value === feature)?.label}
                        <button
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className="ml-2 inline-flex items-center"
                        >
                          <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}