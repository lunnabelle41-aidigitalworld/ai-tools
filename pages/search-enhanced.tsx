import { useState, useEffect, useRef, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faSpinner, 
  faFilter,
  faSort,
  faTimes,
  faChevronDown,
  faStar,
  faDollarSign,
  faTag,
  faLayerGroup,
  faFire,
  faClock,
  faArrowUpWideShort
} from '@fortawesome/free-solid-svg-icons';
import AIToolCard from '../components/search/AIToolCard';
import BlogPostCard from '../components/search/BlogPostCard';

// Types
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  excerpt?: string;
  content?: string;
  url: string;
  type: 'tool' | 'blog' | 'news' | 'update';
  category?: string;
  subcategory?: string;
  score?: number;
  snippet?: string;
  imageUrl?: string;
  publishedAt?: string;
  date?: string;
  author?: string;
  readTime?: string;
  rating?: number;
  pricing?: string;
  tags?: string[];
  features?: string[];
  reviews?: number;
  lastUpdated?: string;
}

interface FilterOption {
  value: string;
  label: string;
  count: number;
  icon?: any;
}

interface SortOption {
  value: string;
  label: string;
  icon?: any;
}

// Mock data for demonstration
const mockTools: SearchResult[] = [
  {
    id: 'tool-1',
    title: 'GPT-5 Playground',
    description: 'Advanced AI playground with GPT-5 capabilities for developers and researchers.',
    excerpt: 'Advanced AI playground with GPT-5 capabilities',
    url: '/tools/gpt-5-playground',
    type: 'tool',
    category: 'Text Generation',
    subcategory: 'LLM',
    rating: 4.8,
    pricing: 'Freemium',
    tags: ['AI', 'NLP', 'Text Generation'],
    features: ['Code completion', 'Text generation', 'API access'],
    lastUpdated: '2025-04-20',
    reviews: 1245
  },
  // Add more mock tools as needed
];

const mockBlogs: SearchResult[] = [
  {
    id: 'blog-1',
    title: 'The Future of AI in 2025: Trends and Predictions',
    excerpt: 'Exploring the latest advancements in AI technology and what to expect in the coming years.',
    description: 'Exploring the latest advancements in AI technology and what to expect in the coming years.',
    url: '/blog/future-of-ai-2025',
    type: 'blog',
    category: 'AI Trends',
    date: '2025-04-15',
    author: 'AI Research Team',
    readTime: '8 min read',
    tags: ['AI', 'Trends', '2025', 'Predictions'],
    imageUrl: '/images/ai-trends-2025.jpg'
  },
  // Add more mock blogs as needed
];

// Mock search function (replace with actual API call)
const searchContent = async (query: string, filters: any = {}): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, this would be an API call to your search backend
  const allResults = [...mockTools, ...mockBlogs];
  
  // Simple search implementation (replace with proper search logic)
  const queryLower = query.toLowerCase();
  return allResults.filter(item => 
    item.title.toLowerCase().includes(queryLower) || 
    (item.description || '').toLowerCase().includes(queryLower) ||
    (item.content || '').toLowerCase().includes(queryLower) ||
    (item.tags || []).some(tag => tag.toLowerCase().includes(queryLower))
  );
}
// Available filters
const availableFilters = {
  type: [
    { value: 'tool', label: 'AI Tools', icon: faLayerGroup },
    { value: 'blog', label: 'Blog Posts', icon: faFire },
  ],
  category: [
    { value: 'text', label: 'Text Generation' },
    { value: 'image', label: 'Image Generation' },
    { value: 'code', label: 'Code Generation' },
    { value: 'voice', label: 'Voice AI' },
    { value: 'trends', label: 'AI Trends' },
    { value: 'tutorials', label: 'Tutorials' },
  ],
  pricing: [
    { value: 'free', label: 'Free' },
    { value: 'freemium', label: 'Freemium' },
    { value: 'paid', label: 'Paid' },
  ],
  sort: [
    { value: 'relevance', label: 'Relevance', icon: faSearch },
    { value: 'newest', label: 'Newest', icon: faClock },
    { value: 'popular', label: 'Most Popular', icon: faFire },
    { value: 'top-rated', label: 'Top Rated', icon: faStar },
  ]
};

export default function EnhancedSearchPage() {
  const router = useRouter();
  const { q, type, category, price, sort } = router.query;
  
  const [searchQuery, setSearchQuery] = useState(typeof q === 'string' ? q : '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: typeof type === 'string' ? [type] : [],
    category: typeof category === 'string' ? [category] : [],
    price: typeof price === 'string' ? [price] : [],
  });
  const [sortBy, setSortBy] = useState(sort || 'relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const [searchStats, setSearchStats] = useState({
    total: 0,
    tools: 0,
    blogs: 0,
    responseTime: 0
  });

  const performSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const startTime = Date.now();
    
    try {
      const searchResults = await searchContent(searchQuery, {
        types: activeFilters.type,
        categories: activeFilters.category,
        priceRange: activeFilters.price,
        sort: sortBy
      });
      
      const endTime = Date.now();
      
      setResults(searchResults);
      setSearchStats({
        total: searchResults.length,
        tools: searchResults.filter(r => r.type === 'tool').length,
        blogs: searchResults.filter(r => r.type === 'blog').length,
        responseTime: (endTime - startTime) / 1000
      });
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, activeFilters, sortBy]);

  // Update URL when filters or sort change
  useEffect(() => {
    const query: any = {};
    if (searchQuery) query.q = searchQuery;
    if (activeFilters.type.length) query.type = activeFilters.type[0];
    if (activeFilters.category.length) query.category = activeFilters.category[0];
    if (activeFilters.price.length) query.price = activeFilters.price[0];
    if (sortBy) query.sort = sortBy;
    
    router.replace({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true });
    
    // Perform search when query or filters change
    performSearch();
  }, [searchQuery, activeFilters, sortBy, performSearch]);

  // Initial search on page load
  useEffect(() => {
    if (q) {
      performSearch();
    }
  }, [q, performSearch, router]);

  const handleFilterToggle = (filterType: 'type' | 'category' | 'price', value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      type: [],
      category: [],
      price: []
    });
    setSortBy('relevance');
  };

  // Group results by type for better display
  const tools = results.filter(r => r.type === 'tool');
  const blogs = results.filter(r => r.type === 'blog');

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{searchQuery ? `${searchQuery} - AI Search` : 'AI Search - Find AI Tools and Content'}</title>
        <meta name="description" content="Search the best AI tools, articles, and resources in one place." />
      </Head>

      {/* Search Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {searchQuery ? `Results for "${searchQuery}"` : 'Search AI Tools & Content'}
            </h1>
            
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                placeholder="Search for AI tools, articles, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && performSearch()}
              />
              {isLoading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Search Stats */}
            {searchQuery && (
              <div className="mt-4 flex flex-wrap items-center text-sm text-gray-500">
                <span className="mr-4">{searchStats.total} results found</span>
                {searchStats.tools > 0 && (
                  <span className="mr-4 flex items-center">
                    <FontAwesomeIcon icon={faLayerGroup} className="mr-1 text-blue-500" />
                    {searchStats.tools} tools
                  </span>
                )}
                {searchStats.blogs > 0 && (
                  <span className="mr-4 flex items-center">
                    <FontAwesomeIcon icon={faFire} className="mr-1 text-orange-500" />
                    {searchStats.blogs} articles
                  </span>
                )}
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="mr-1 text-gray-400" />
                  {searchStats.responseTime.toFixed(2)}s
                </span>
                
                {(activeFilters.type.length > 0 || activeFilters.category.length > 0 || activeFilters.price.length > 0) && (
                  <button 
                    onClick={clearFilters}
                    className="ml-auto text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-1" />
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-2 overflow-x-auto">
              <div className="flex space-x-2">
                {/* Type Filter */}
                <div className="relative">
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${showFilters ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FontAwesomeIcon icon={faFilter} className="mr-2" />
                    Type
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
                  </button>
                  
                  {showFilters && (
                    <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {availableFilters.type.map((filter) => (
                          <button
                            key={filter.value}
                            onClick={() => handleFilterToggle('type', filter.value)}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center ${activeFilters.type.includes(filter.value) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <FontAwesomeIcon 
                              icon={filter.icon} 
                              className={`mr-2 ${activeFilters.type.includes(filter.value) ? 'text-blue-500' : 'text-gray-400'}`} 
                            />
                            {filter.label}
                            {activeFilters.type.includes(filter.value) && (
                              <span className="ml-auto">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Sort Dropdown */}
                <div className="relative">
                  <button 
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowSort(!showSort)}
                  >
                    <FontAwesomeIcon icon={faArrowUpWideShort} className="mr-2" />
                    Sort: {availableFilters.sort.find(s => s.value === sortBy)?.label || 'Relevance'}
                    <FontAwesomeIcon icon={faChevronDown} className="ml-2 text-xs" />
                  </button>
                  
                  {showSort && (
                    <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        {availableFilters.sort.map((sortOption) => (
                          <button
                            key={sortOption.value}
                            onClick={() => {
                              setSortBy(sortOption.value);
                              setShowSort(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm flex items-center ${sortBy === sortOption.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                          >
                            <FontAwesomeIcon 
                              icon={sortOption.icon} 
                              className={`mr-2 ${sortBy === sortOption.value ? 'text-blue-500' : 'text-gray-400'}`} 
                            />
                            {sortOption.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin h-8 w-8 text-blue-500" />
            <span className="ml-3 text-gray-600">Searching...</span>
          </div>
        ) : results.length === 0 && searchQuery ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-2 text-gray-500">Try different keywords or remove search filters</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* AI Tools Section */}
            {tools.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <FontAwesomeIcon icon={faLayerGroup} className="mr-2 text-blue-500" />
                    AI Tools
                  </h2>
                  <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {tools.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <AIToolCard key={tool.id} tool={{...tool, description: tool.description || ''}} query={searchQuery} />
                  ))}
                </div>
              </section>
            )}

            {/* Blog Posts Section */}
            {blogs.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <FontAwesomeIcon icon={faFire} className="mr-2 text-orange-500" />
                    Blog Posts & Articles
                  </h2>
                  <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {blogs.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogs.map((post) => (
                    <BlogPostCard key={post.id} post={{...post, excerpt: post.excerpt || '', date: post.date || '', author: post.author || '', readTime: post.readTime || ''}} query={searchQuery} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AI Search. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
