import { useState, useEffect } from 'react';
import { 
  faChartLine, 
  faFire, 
  faArrowUp, 
  faArrowDown, 
  faMinus,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchTrend {
  term: string;
  count: number;
  change: number; // percentage change
  category?: string;
}

interface SearchTrendsData {
  totalSearches: number;
  trendingTerms: SearchTrend[];
  decliningTerms: SearchTrend[];
  stableTerms: SearchTrend[];
  categories: { name: string; count: number }[];
}

export default function SearchTrendsAnalysis() {
  const [trends, setTrends] = useState<SearchTrendsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from an API
        // For now, we'll simulate data
        const mockData: SearchTrendsData = {
          totalSearches: 15420,
          trendingTerms: [
            { term: 'AI image generator', count: 1240, change: 45.2, category: 'image_generation' },
            { term: 'chatgpt alternative', count: 980, change: 32.1, category: 'text_generation' },
            { term: 'video editing ai', count: 756, change: 28.7, category: 'video_ai' },
            { term: 'ai code assistant', count: 634, change: 22.5, category: 'code_ai' },
            { term: 'ai content writer', count: 521, change: 18.9, category: 'text_generation' }
          ],
          decliningTerms: [
            { term: 'basic chatbot', count: 420, change: -15.3, category: 'text_generation' },
            { term: 'simple image editor', count: 380, change: -12.7, category: 'image_generation' },
            { term: 'traditional transcription', count: 290, change: -8.4, category: 'audio_ai' }
          ],
          stableTerms: [
            { term: 'project management', count: 1120, change: 1.2, category: 'productivity' },
            { term: 'data analysis', count: 890, change: 0.8, category: 'research' },
            { term: 'customer support', count: 760, change: -0.5, category: 'business' }
          ],
          categories: [
            { name: 'Text Generation', count: 3420 },
            { name: 'Image Generation', count: 2890 },
            { name: 'Video AI', count: 1980 },
            { name: 'Audio AI', count: 1560 },
            { name: 'Code AI', count: 1890 },
            { name: 'Productivity', count: 1670 },
            { name: 'Research', count: 1240 },
            { name: 'Business', count: 770 }
          ]
        };
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setTrends(mockData);
      } catch (err) {
        setError('Failed to fetch search trends data');
        console.error('Trends fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [timeRange]);

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
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
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

  if (!trends) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="text-gray-500 dark:text-gray-400">
          No trends data available
        </div>
      </div>
    );
  }

  const getChangeIcon = (change: number) => {
    if (change > 10) return <FontAwesomeIcon icon={faArrowUp} className="text-green-500" />;
    if (change < -10) return <FontAwesomeIcon icon={faArrowDown} className="text-red-500" />;
    return <FontAwesomeIcon icon={faMinus} className="text-gray-500" />;
  };

  const getChangeColor = (change: number) => {
    if (change > 10) return 'text-green-600 dark:text-green-400';
    if (change < -10) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Search Trends Analysis</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('24h')}
            className={`px-3 py-1 text-sm rounded ${timeRange === '24h' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            24h
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1 text-sm rounded ${timeRange === '7d' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            7d
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1 text-sm rounded ${timeRange === '30d' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            30d
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faSearch} className="text-blue-500 dark:text-blue-400 text-xl mr-3" />
            <div>
              <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Searches</div>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
                {trends.totalSearches.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faFire} className="text-green-500 dark:text-green-400 text-xl mr-3" />
            <div>
              <div className="text-sm font-medium text-green-800 dark:text-green-200">Trending Terms</div>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100 mt-1">
                {trends.trendingTerms.length}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faChartLine} className="text-purple-500 dark:text-purple-400 text-xl mr-3" />
            <div>
              <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Categories</div>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
                {trends.categories.length}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trending Terms */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FontAwesomeIcon icon={faFire} className="text-orange-500 mr-2" />
            Trending Search Terms
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
            {trends.trendingTerms.map((term, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 last:border-0">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{term.term}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {term.count.toLocaleString()} searches
                    {term.category && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                        {term.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`flex items-center ${getChangeColor(term.change)}`}>
                  {getChangeIcon(term.change)}
                  <span className="ml-1 font-medium">{Math.abs(term.change).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Declining Terms */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FontAwesomeIcon icon={faArrowDown} className="text-red-500 mr-2" />
            Declining Search Terms
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden">
            {trends.decliningTerms.map((term, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600 last:border-0">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{term.term}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {term.count.toLocaleString()} searches
                    {term.category && (
                      <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                        {term.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`flex items-center ${getChangeColor(term.change)}`}>
                  {getChangeIcon(term.change)}
                  <span className="ml-1 font-medium">{Math.abs(term.change).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Category Distribution */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Search Distribution by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trends.categories.map((category, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                {category.count.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((category.count / trends.totalSearches) * 100).toFixed(1)}% of total
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}