import { useState, useEffect } from 'react';
import { getSearchAnalytics } from '../../services/searchService';

// Update interface to match the actual return type from getSearchAnalytics
interface SearchAnalyticsData {
  totalSearches: number;
  cacheHitRate: number;
  averageResponseTime: number;
  topSearchTerms: { term: string; count: number }[];
}

export default function SearchAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<SearchAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Remove type assertion since we're now using the correct interface
        const data = getSearchAnalytics();
        setAnalytics(data);
      } catch (err) {
        setError('Failed to fetch analytics data');
        console.error('Analytics fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    
    // Refresh analytics every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="text-red-500 dark:text-red-400">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="text-gray-500 dark:text-gray-400">
          No analytics data available
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Search Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Searches</div>
          <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">
            {analytics.totalSearches.toLocaleString()}
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="text-sm font-medium text-green-800 dark:text-green-200">Cache Hit Rate</div>
          <div className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">
            {analytics.cacheHitRate}%
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Avg Response Time</div>
          <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">
            {analytics.averageResponseTime}ms
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Search Terms</h3>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          {analytics.topSearchTerms.length > 0 ? (
            <ul className="space-y-3">
              {analytics.topSearchTerms.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span className="text-gray-900 dark:text-white">{item.term}</span>
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {item.count} searches
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 dark:text-gray-400 text-center py-4">
              No search terms data available
            </div>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Analytics update automatically every 30 seconds
      </div>
    </div>
  );
}