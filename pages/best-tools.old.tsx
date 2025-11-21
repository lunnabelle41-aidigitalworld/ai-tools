// pages/best-tools.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { tools } from '../data/tools';
import { useFavorites } from '../hooks/useFavorites';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  url: string;
  pricing: string;
  rating: number;
  tags: string[];
  favicon: string;
}

interface BestToolsCategory {
  category: string;
  tools: Tool[];
  description: string;
  icon: string;
}

export default function BestToolsPage() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'popularity' | 'newest'>('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [bestToolsByCategory, setBestToolsByCategory] = useState<BestToolsCategory[]>([]);

  // Categorize and rank tools
  useEffect(() => {
    const categories = ['AI Tools', 'Design', 'Development', 'Marketing', 'Productivity'];
    
    const categorizedTools = categories.map(category => {
      const categoryTools = tools
        .filter(tool => tool.category === category)
        .sort((a, b) => {
          if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
          return 0; // For popularity and newest, keep original order
        })
        .slice(0, 8); // Top 8 tools per category

      return {
        category,
        tools: categoryTools,
        description: getCategoryDescription(category),
        icon: getCategoryIcon(category)
      };
    }).filter(cat => cat.tools.length > 0);

    setBestToolsByCategory(categorizedTools);
  }, [sortBy]);

  const getCategoryDescription = (category: string): string => {
    const descriptions = {
      'AI Tools': 'Cutting-edge artificial intelligence tools for automation, content creation, and intelligent workflows',
      'Design': 'Professional design tools for UI/UX, graphics, and creative projects',
      'Development': 'Essential development tools for coding, testing, and deployment',
      'Marketing': 'Powerful marketing tools for campaigns, analytics, and customer engagement',
      'Productivity': 'Tools to boost efficiency and streamline your workflow'
    };
    return descriptions[category as keyof typeof descriptions] || 'Top tools in this category';
  };

  const getCategoryIcon = (category: string): string => {
    const icons = {
      'AI Tools': '🤖',
      'Design': '🎨',
      'Development': '💻',
      'Marketing': '📈',
      'Productivity': '⚡'
    };
    return icons[category as keyof typeof icons] || '🔧';
  };

  
  const filteredCategories = bestToolsByCategory.filter(cat => 
    selectedCategory === 'all' || cat.category === selectedCategory
  ).map(cat => ({
    ...cat,
    tools: cat.tools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  const overallBestTools = tools
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 12);

  return (
    <>
      <Head>
        <title>Best AI Tools 2024 - Top Rated Tools by Category | AI Vault</title>
        <meta name="description" content="Discover the best AI tools and software for 2024. Expert-curated top tools by category with ratings, reviews, and comparisons." />
        <meta name="keywords" content="best AI tools, top software, AI tools 2024, recommended tools, tool reviews" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Best AI Tools of 2024
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Expert-curated collection of top-rated AI tools and software. 
                Discover the most powerful tools to transform your workflow.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for the best tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-white text-blue-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  All Categories
                </button>
                {bestToolsByCategory.map(cat => (
                  <button
                    key={cat.category}
                    onClick={() => setSelectedCategory(cat.category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                      selectedCategory === cat.category
                        ? 'bg-white text-blue-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.category}
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex justify-center gap-4">
                <span className="text-blue-100">Sort by:</span>
                {['rating', 'popularity', 'newest'].map(sort => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort as any)}
                    className={`capitalize px-4 py-1 rounded-full text-sm transition-all ${
                      sortBy === sort
                        ? 'bg-white text-blue-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overall Best Tools */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              🏆 Overall Best Tools
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Top-rated tools across all categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {overallBestTools.slice(0, 8).map((tool, index) => (
              <div key={tool.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Ranking Badge */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  {index + 1}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <Image src={tool.favicon} alt={tool.name} width={48} height={48} className="rounded" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{tool.rating || 4.5}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tool.pricing.toLowerCase() === 'free' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                      tool.pricing.toLowerCase() === 'freemium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                      'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                    }`}>
                      {tool.pricing}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium text-center"
                    >
                      Try Now
                    </Link>
                    <button
                      onClick={() => isFavorite(tool.id) ? removeFavorite(tool.id) : addFavorite(tool.id)}
                      className={`px-3 py-2 rounded-lg transition-all ${
                        isFavorite(tool.id)
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isFavorite(tool.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Best Tools by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Explore top tools in each category
            </p>
          </div>

          {filteredCategories.map(category => (
            <div key={category.category} className="mb-16">
              {/* Category Header */}
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {category.category}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Category Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.tools.map((tool, index) => (
                  <div key={tool.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                          <Image src={tool.favicon} alt={tool.name} width={48} height={48} className="rounded" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-sm">⭐</span>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{tool.rating || 4.5}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {tool.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tool.pricing.toLowerCase() === 'free' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' :
                          tool.pricing.toLowerCase() === 'freemium' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                          'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                        }`}>
                          {tool.pricing}
                        </span>
                        {tool.tags && tool.tags.length > 0 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {tool.tags.slice(0, 2).join(', ')}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium text-center"
                        >
                          Try Now
                        </Link>
                        <button
                          onClick={() => isFavorite(tool.id) ? removeFavorite(tool.id) : addFavorite(tool.id)}
                          className={`px-3 py-2 rounded-lg transition-all ${
                            isFavorite(tool.id)
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {isFavorite(tool.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {category.tools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">
                    No tools found in this category matching your search.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">
              Can't Decide? Compare Tools Side-by-Side
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Use our AI-powered comparison tool to make the best choice for your needs
            </p>
            <Link
              href="/compare"
              className="inline-block px-8 py-4 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-lg"
            >
              Start Comparing Tools →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
