import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faTag, faCalendar, faChartLine } from '@fortawesome/free-solid-svg-icons';

interface SearchResult {
  id: string;
  title: string;
  content: string;
  url: string;
  category?: string;
  subcategory?: string;
  rating?: number;
  pricing?: string | { free?: boolean; paid?: boolean; plans?: string[] };
  tags?: string[];
  features?: string[];
  launchDate?: string;
  lastUpdated?: string;
  favicon?: string;
  summary?: string;
  similarity: number;
  score?: number;
  snippet?: string;
  // Clustering information
  clusterId?: string;
  clusterTitle?: string;
  clusterDescription?: string;
  clusterRating?: number;
}

interface ClusterGroup {
  id: string;
  title: string;
  description?: string;
  results: SearchResult[];
  averageRating: number;
  resultCount: number;
}

export default function EnhancedSearchResults({ results }: { results: SearchResult[] }) {
  const [expandedClusters, setExpandedClusters] = useState<Record<string, boolean>>({});
  
  // Group results by cluster
  const clusteredResults: ClusterGroup[] = results.reduce((clusters: ClusterGroup[], result) => {
    if (result.clusterId) {
      const existingCluster = clusters.find(c => c.id === result.clusterId);
      if (existingCluster) {
        existingCluster.results.push(result);
        existingCluster.averageRating = (existingCluster.averageRating * (existingCluster.resultCount - 1) + (result.rating || 0)) / existingCluster.resultCount;
      } else {
        clusters.push({
          id: result.clusterId,
          title: result.clusterTitle || 'Cluster',
          description: result.clusterDescription,
          results: [result],
          averageRating: result.clusterRating || result.rating || 0,
          resultCount: 1
        });
      }
    }
    return clusters;
  }, []);
  
  // Non-clustered results
  const nonClusteredResults = results.filter(r => !r.clusterId);
  
  const toggleCluster = (clusterId: string) => {
    setExpandedClusters(prev => ({
      ...prev,
      [clusterId]: !prev[clusterId]
    }));
  };
  
  const formatPricing = (pricing: string | { free?: boolean; paid?: boolean; plans?: string[] } | undefined) => {
    if (!pricing) return 'Unknown';
    if (typeof pricing === 'string') return pricing;
    if (pricing.free && pricing.paid) return 'Freemium';
    if (pricing.free) return 'Free';
    if (pricing.paid) return 'Paid';
    return 'Contact for Pricing';
  };
  
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Clustered Results */}
      {clusteredResults.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Clustered Results</h2>
          {clusteredResults.map((cluster) => (
            <div key={cluster.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div 
                className="bg-gray-50 dark:bg-gray-800 p-4 cursor-pointer flex justify-between items-center"
                onClick={() => toggleCluster(cluster.id)}
              >
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{cluster.title}</h3>
                  {cluster.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{cluster.description}</p>
                  )}
                  <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    <FontAwesomeIcon icon={faStar} className="mr-1 text-yellow-500" />
                    <span className="mr-3">{cluster.averageRating.toFixed(1)} avg rating</span>
                    <span>{cluster.resultCount} tools</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                    {expandedClusters[cluster.id] ? 'Collapse' : 'Expand'}
                  </span>
                  <svg 
                    className={`w-5 h-5 transform transition-transform ${expandedClusters[cluster.id] ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {expandedClusters[cluster.id] && (
                <div className="p-4 bg-white dark:bg-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cluster.results.map((result) => (
                      <div key={result.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start">
                          {result.favicon && (
                            <Image 
                              src={result.favicon} 
                              alt={result.title} 
                              className="w-10 h-10 rounded mr-3 flex-shrink-0"
                              width={40}
                              height={40}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <Link href={result.url} className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                              {result.title}
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {result.snippet || result.summary}
                            </p>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {result.rating && (
                                <div className="flex items-center text-sm">
                                  <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                                  <span>{result.rating.toFixed(1)}</span>
                                </div>
                              )}
                              
                              <div className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                                {formatPricing(result.pricing)}
                              </div>
                              
                              {result.category && (
                                <div className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded">
                                  {result.category}
                                </div>
                              )}
                            </div>
                            
                            {result.features && result.features.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {result.features.slice(0, 3).map((feature, index) => (
                                  <span 
                                    key={index} 
                                    className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded"
                                  >
                                    {feature}
                                  </span>
                                ))}
                                {result.features.length > 3 && (
                                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded">
                                    +{result.features.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                            
                            <div className="mt-3 flex text-xs text-gray-500 dark:text-gray-400">
                              {result.lastUpdated && (
                                <div className="flex items-center mr-3">
                                  <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                                  <span>Updated {formatDate(result.lastUpdated)}</span>
                                </div>
                              )}
                              <div className="flex items-center">
                                <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                                <span>{Math.round((result.similarity || 0) * 100)}% match</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Non-Clustered Results */}
      {nonClusteredResults.length > 0 && (
        <div>
          {clusteredResults.length > 0 && (
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Other Results</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nonClusteredResults.map((result) => (
              <div key={result.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  {result.favicon && (
                    <Image 
                      src={result.favicon} 
                      alt={result.title} 
                      className="w-10 h-10 rounded mr-3 flex-shrink-0"
                      width={40}
                      height={40}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <Link href={result.url} className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      {result.title}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {result.snippet || result.summary}
                    </p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {result.rating && (
                        <div className="flex items-center text-sm">
                          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
                          <span>{result.rating.toFixed(1)}</span>
                        </div>
                      )}
                      
                      <div className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {formatPricing(result.pricing)}
                      </div>
                      
                      {result.category && (
                        <div className="text-sm px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded">
                          {result.category}
                        </div>
                      )}
                    </div>
                    
                    {result.features && result.features.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {result.features.slice(0, 3).map((feature, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {result.features.length > 3 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded">
                            +{result.features.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <div className="mt-3 flex text-xs text-gray-500 dark:text-gray-400">
                      {result.lastUpdated && (
                        <div className="flex items-center mr-3">
                          <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                          <span>Updated {formatDate(result.lastUpdated)}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faChartLine} className="mr-1" />
                        <span>{Math.round((result.similarity || 0) * 100)}% match</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}