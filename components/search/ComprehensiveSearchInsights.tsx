import { useState } from 'react';
import SearchAnalyticsDashboard from './SearchAnalyticsDashboard';
import SearchTrendsAnalysis from './SearchTrendsAnalysis';

export default function ComprehensiveSearchInsights() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'trends'>('analytics');

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'analytics' 
            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Search Analytics
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'trends' 
            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-500' 
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Search Trends
        </button>
      </div>
      
      {activeTab === 'analytics' ? (
        <SearchAnalyticsDashboard />
      ) : (
        <SearchTrendsAnalysis />
      )}
    </div>
  );
}