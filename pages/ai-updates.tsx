import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { AIUpdate } from '../data/ai-updates';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'product_launch': return '🚀';
    case 'update': return '🔄';
    case 'tutorial': return '📚';
    case 'news': return '📰';
    default: return '✨';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'product_launch': return 'bg-blue-500/20 text-blue-400';
    case 'update': return 'bg-green-500/20 text-green-400';
    case 'tutorial': return 'bg-purple-500/20 text-purple-400';
    case 'news': return 'bg-yellow-500/20 text-yellow-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
};

export default function AIUpdatesPage() {
  const router = useRouter();
  const [updates, setUpdates] = useState<AIUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch AI updates from API
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/ai-updates`);
        if (!response.ok) {
          throw new Error('Failed to fetch AI updates');
        }
        const data = await response.json();
        setUpdates(data.updates);
        setError(null);
      } catch (err) {
        console.error('Error fetching AI updates:', err);
        setError('Failed to load AI updates');
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  // Get unique categories and types for filter tabs
  const categories = ['all', ...Array.from(new Set(updates.map(update => update.category || 'Uncategorized')))];
  const types = ['all', ...Array.from(new Set(updates.map(update => update.type)))];

  // Filter updates based on active filter and search query
  const filteredUpdates = updates.filter(update => {
    // Apply category filter
    const matchesCategory = activeFilter === 'all' || update.category === activeFilter;
    
    // Apply search query filter
    const matchesSearch = searchQuery === '' || 
      update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      update.tools_mentioned.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Head>
        <title>AI Updates & News | Cerebrum</title>
        <meta name="description" content="Stay updated with the latest AI tools, product launches, tutorials, and industry news." />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Ecosystem Pulse
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real-time updates on the latest AI tools, product launches, and industry insights
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI updates..."
                className="w-full px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="text-red-400 mb-4">⚠️</div>
              <p className="text-gray-300">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
              >
                Retry
              </button>
            </div>
          )}

          {/* Updates Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredUpdates.map((update) => (
                  <div 
                    key={update.id}
                    className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(update.type)}`}>
                        {getTypeIcon(update.type)} {update.type.replace('_', ' ')}
                      </div>
                      <span className="text-xs text-gray-400">{update.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {update.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {update.summary}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {update.tools_mentioned.slice(0, 3).map((tool, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md"
                        >
                          {tool}
                        </span>
                      ))}
                      {update.tools_mentioned.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-md">
                          +{update.tools_mentioned.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">{update.source}</span>
                        {update.author && (
                          <span className="text-gray-500">•</span>
                        )}
                        {update.author && (
                          <span className="text-gray-400">by {update.author}</span>
                        )}
                      </div>
                      <span className="text-gray-500">{update.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUpdates.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">🔍</div>
                  <p className="text-gray-300">No updates found matching your criteria</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      setActiveFilter('all');
                    }}
                    className="mt-4 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </>
          )}

          {/* Back to Home */}
          <div className="text-center mt-12">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}