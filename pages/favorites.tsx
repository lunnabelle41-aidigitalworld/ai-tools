// pages/favorites.tsx
import { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { tools } from '../data/tools';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import SanctuaryExperience from '../components/Sanctuary/SanctuaryExperience';

export default function FavoritesPage() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [favoriteTools, setFavoriteTools] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'date'>('name');
  const [viewMode, setViewMode] = useState<'classic' | 'sanctuary'>('sanctuary');

  useEffect(() => {
    const favTools = favorites.map(favId => 
      tools.find(tool => tool && tool.id === favId)
    ).filter((tool): tool is typeof tools[0] => tool !== undefined);
    setFavoriteTools(favTools);
  }, [favorites]);

  const filteredAndSortedTools = favoriteTools
    .filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'date':
          return new Date(b.addedDate || '').getTime() - new Date(a.addedDate || '').getTime();
        default:
          return 0;
      }
    });

  const getFaviconUrl = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch {
      return `https://www.google.com/s2/favicons?domain=example.com&sz=64`;
    }
  };

  // If sanctuary mode is enabled, show the 3D experience
  if (viewMode === 'sanctuary') {
    return (
      <>
        <Head>
          <title>The Sanctuary - Your Digital Universe</title>
          <meta name="description" content="Enter your personal digital sanctuary where your favorite tools become living stars" />
        </Head>
        <SanctuaryExperience />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>My Favorite AI Tools - AI Vault</title>
        <meta name="description" content="Manage and explore your favorite AI tools collection" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Favorite Tools
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {favorites.length} {favorites.length === 1 ? 'tool' : 'tools'} in your collection
                </p>
              </div>
              
              {favorites.length > 0 && (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {favorites.length} of {tools.length} tools
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        {favorites.length > 0 && (
          <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search your favorite tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  />
                </div>
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'date')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                >
                  <option value="name">Sort by Name</option>
                  <option value="category">Sort by Category</option>
                  <option value="date">Sort by Date Added</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {favorites.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No favorites yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start exploring AI tools and add your favorites to build your personal collection. Click the heart icon on any tool to add it here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Explore Tools
                </Link>
                <Link
                  href="/new-tools"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300"
                >
                  Discover New Tools
                </Link>
              </div>
            </div>
          ) : filteredAndSortedTools.length === 0 ? (
            // No search results
            <div className="text-center py-16">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No tools found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            // Tools Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedTools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={getFaviconUrl(tool.url)}
                            alt={tool.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {tool.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFavorite(tool.id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remove from favorites"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {tool.tags && tool.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{tool.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Link
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        Visit Tool →
                      </Link>
                      
                      <div className="flex items-center gap-2">
                        {tool.pricing && (
                          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                            {tool.pricing}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions (when has favorites) */}
        {favorites.length > 0 && (
          <div className="fixed bottom-8 right-8 flex flex-col gap-3">
            <button
              onClick={() => {
                // Clear all favorites
                favorites.forEach(id => removeFavorite(id));
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-colors text-sm"
            >
              Clear All
            </button>
            
            <button
              onClick={() => setViewMode('sanctuary')}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 text-sm"
            >
              🌌 Enter Sanctuary
            </button>
            
            <Link
              href="/compare"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm"
            >
              Compare Favorites
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
