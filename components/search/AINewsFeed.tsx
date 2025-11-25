import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { AIUpdate } from '../../data/ai-updates';

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

export default function AINewsFeed() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [updates, setUpdates] = useState<AIUpdate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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

  // Get unique categories for filter tabs
  const categories = ['all', ...Array.from(new Set(updates.map(update => update.category || 'Uncategorized')))];

  // Filter updates based on active filter
  const filteredUpdates = activeFilter === 'all' 
    ? updates 
    : updates.filter(update => update.category === activeFilter);

  return (
    <section className="py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Ecosystem Pulse
          </h2>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto">
            Real-time updates on the latest AI tools, product launches, and industry insights
          </p>
        </div>

        {/* Category Filters - Mobile Responsive */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* News Grid - Mobile Optimized */}
        {loading ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12">
            <div className="text-red-400 mb-3 sm:mb-4 text-xl sm:text-2xl">⚠️</div>
            <p className="text-gray-300 text-sm sm:text-base">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 sm:mt-4 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredUpdates.map((update) => (
              <div 
                key={update.id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold ${getTypeColor(update.type)}`}>
                    {getTypeIcon(update.type)} {update.type.replace('_', ' ')}
                  </div>
                  <span className="text-xs text-gray-400">{update.date}</span>
                </div>
                
                <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {update.title}
                </h3>
                
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
                  {update.summary}
                </p>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {update.tools_mentioned.slice(0, 2).map((tool, index) => (
                    <span 
                      key={index}
                      className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                  {update.tools_mentioned.length > 2 && (
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-500/20 text-gray-400 text-xs rounded-md">
                      +{update.tools_mentioned.length - 2} more
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-gray-400 truncate max-w-[80px] sm:max-w-none">{update.source}</span>
                    {update.author && (
                      <span className="text-gray-500 hidden sm:inline">•</span>
                    )}
                    {update.author && (
                      <span className="text-gray-400 hidden sm:inline">by {update.author}</span>
                    )}
                  </div>
                  <span className="text-gray-500">{update.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button - Mobile Responsive */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/ai-updates" 
            className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            View All AI Updates
            <svg className="ml-1 w-3 h-3 sm:ml-2 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}