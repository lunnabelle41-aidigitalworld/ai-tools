// pages/best-tools.tsx
import { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FiSearch, FiFilter, FiStar, FiDownload, 
  FiCode, FiLayers, FiTrendingUp, FiZap, 
  FiCpu, FiGlobe, FiAward, FiClock, FiUsers, FiShield
} from 'react-icons/fi';

// Enhanced color scheme with gradients
const colors = {
  primary: 'hsl(260, 100%, 70%)',
  secondary: 'hsl(190, 90%, 50%)',
  accent: 'hsl(330, 100%, 60%)',
  dark: 'hsl(220, 30%, 10%)',
  light: 'hsl(220, 30%, 95%)',
  success: 'hsl(142, 76%, 36%)',
  warning: 'hsl(38, 92%, 50%)',
  error: 'hsl(0, 84%, 60%)',
  info: 'hsl(199, 89%, 48%)',
};

// Enhanced categories with more details
const categories = [
  { 
    id: 'all', 
    name: 'All Tools', 
    icon: <FiLayers />,
    description: 'Explore all AI tools across every category',
    color: 'from-purple-500 to-indigo-500'
  },
  { 
    id: 'ai', 
    name: 'AI & ML', 
    icon: <FiCpu />,
    description: 'Cutting-edge artificial intelligence and machine learning tools',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    id: 'design', 
    name: 'Design', 
    icon: <FiLayers />,
    description: 'Creative tools for designers and visual artists',
    color: 'from-pink-500 to-rose-500'
  },
  { 
    id: 'development', 
    name: 'Development', 
    icon: <FiCode />,
    description: 'Developer tools and resources for building amazing apps',
    color: 'from-emerald-500 to-teal-500'
  },
  { 
    id: 'productivity', 
    name: 'Productivity', 
    icon: <FiTrendingUp />,
    description: 'Tools to boost your efficiency and workflow',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'emerging', 
    name: 'Emerging Tech', 
    icon: <FiZap />,
    description: 'The latest and most innovative technologies',
    color: 'from-violet-500 to-fuchsia-500'
  },
];

// Enhanced tool data with more details
const tools = [
  {
    id: 1,
    name: 'AI Code Assistant Pro',
    category: 'ai',
    description: 'Advanced AI pair programmer that helps you write better code with real-time suggestions and error detection',
    rating: 4.8,
    reviews: 2431,
    isFeatured: true,
    tags: ['AI', 'Development', 'Code Generation', 'Productivity'],
    icon: <FiCode className="w-6 h-6" />,
    features: ['Real-time code completion', 'Multi-language support', 'Error detection', 'Git integration'],
    pricing: { monthly: 29, yearly: 290, freeTier: true },
    updated: '2 days ago',
    trending: true
  },
  // ... more tools
];

// New components
const FeatureBadge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 backdrop-blur-sm">
    {icon}
    <span className="ml-1.5">{text}</span>
  </span>
);

const ToolCard = ({ tool }: { tool: typeof tools[0] }) => {
  const category = categories.find(c => c.id === tool.category);
  
  return (
    <motion.div 
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {tool.trending && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-pink-500">
            <FiTrendingUp className="w-3.5 h-3.5 mr-1" />
            Trending
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div 
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${category?.color || 'from-gray-500 to-gray-600'}`}
              >
                {tool.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{category?.name}</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{tool.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tool.features?.slice(0, 3).map((feature, i) => (
                <span 
                  key={i}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full border border-gray-100 dark:border-gray-700"
                >
                  {feature}
                </span>
              ))}
              {tool.features?.length > 3 && (
                <span className="px-2.5 py-1 text-xs font-medium text-gray-400">
                  +{tool.features.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill={i < Math.floor(tool.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                  <span className="ml-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {tool.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({tool.reviews.toLocaleString()})
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {tool.pricing?.freeTier && (
                  <span className="px-2 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                    Free Tier
                  </span>
                )}
                {tool.pricing && (
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    ${tool.pricing.monthly}
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">/mo</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                <FiClock className="inline w-3.5 h-3.5 mr-1" />
                Updated {tool.updated}
              </span>
            </div>
            <button 
              className="group/button relative px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <FiDownload className="w-4 h-4 mr-2" />
                Get Started
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BestTools: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filter tools based on search and category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredTools = tools.filter(tool => tool.isFeatured);
  const selectedCategoryData = categories.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Best AI Tools | AI Vault</title>
        <meta name="description" content="Discover the best AI tools for your needs" />
        <meta name="theme-color" content="#1a1a2e" />
      </Head>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/80"
          style={{ opacity: opacity as any }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span 
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
              >
                AI Vault
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</a>
              <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Categories</a>
              <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About</a>
              <button className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all">
                Get Started
              </button>
            </div>
            <div className="flex md:hidden items-center">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header 
        ref={heroRef}
        className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28"
      >
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"
            style={{ 
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
              `
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-gray-900 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900/50 mb-6">
              <FiAward className="w-3.5 h-3.5 mr-1.5" />
              Trusted by 50,000+ developers & designers
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400">
              Discover the Best <span className="relative">
                <span className="relative z-10">AI Tools</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-blue-400/20 -rotate-1 -z-0" />
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Curated collection of the most powerful and innovative AI tools to supercharge your workflow
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-lg"
                  placeholder="Search for AI tools, categories, features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiFilter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Category Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 border border-gray-100 dark:border-gray-700"
                  >
                    <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-3">Filter by Category</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setShowFilters(false);
                          }}
                          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            selectedCategory === category.id
                              ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md shadow-purple-500/20'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <FeatureBadge icon={<FiUsers className="w-3.5 h-3.5" />} text="50,000+ Active Users" />
              <FeatureBadge icon={<FiShield className="w-3.5 h-3.5" />} text="Secure & Private" />
              <FeatureBadge icon={<FiGlobe className="w-3.5 h-3.5" />} text="Global Community" />
            </div>
          </motion.div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Category Section */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {selectedCategory === 'all' ? 'All Categories' : `${selectedCategoryData?.name} Tools`}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {selectedCategory === 'all' 
                  ? 'Browse through our comprehensive collection of AI tools across all categories'
                  : selectedCategoryData?.description}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/20 border border-purple-100 dark:border-purple-900/50 shadow-md'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-3 bg-gradient-to-br ${category.color}`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tools */}
        {featuredTools.length > 0 && (
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">✨ Featured Tools</h2>
                  <p className="text-gray-500 dark:text-gray-400">Handpicked selection of top-rated AI tools</p>
                </div>
                <button className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors">
                  View all featured tools
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Tools */}
        <section className="py-12 bg-gray-50 dark:bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All AI Tools</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
                  {selectedCategory !== 'all' ? ` in ${selectedCategoryData?.name}` : ''}
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="relative">
                  <select 
                    className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 dark:text-gray-200"
                  >
                    <option>Sort by: Popular</option>
                    <option>Sort by: Newest</option>
                    <option>Sort by: Rating</option>
                    <option>Sort by: Most Reviewed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-700' : 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md ml-1 ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-700' : 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'}`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTools.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {filteredTools.map((tool) => (
                  viewMode === 'grid' ? (
                    <ToolCard key={tool.id} tool={tool} />
                  ) : (
                    <motion.div 
                      key={tool.id}
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start">
                          <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div 
                              className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                              style={{
                                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                              }}
                            >
                              {tool.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {categories.find(c => c.id === tool.category)?.name}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex-1 md:ml-6">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{tool.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {tool.tags.map((tag, i) => (
                                <span 
                                  key={i}
                                  className="px-2.5 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full border border-gray-100 dark:border-gray-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex flex-wrap items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <FiStar
                                      key={i}
                                      className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                      fill={i < Math.floor(tool.rating) ? 'currentColor' : 'none'}
                                    />
                                  ))}
                                  <span className="ml-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {tool.rating}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  ({tool.reviews.toLocaleString()} reviews)
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {tool.pricing?.freeTier && (
                                  <span className="px-2 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                                    Free Tier
                                  </span>
                                )}
                                <button 
                                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all"
                                >
                                  Get Started
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No tools found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  We couldn't find any tools matching your search. Try adjusting your filters.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
            
            {filteredTools.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded-md bg-purple-600 text-white font-medium">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    10
                  </button>
                  <button className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Join thousands of developers and designers already using our curated collection of AI tools.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 rounded-lg font-medium bg-white text-purple-700 hover:bg-purple-50 transition-colors shadow-lg">
                Get Started for Free
              </button>
              <button className="px-6 py-3 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Features</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Pricing</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">API</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Documentation</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Guides</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">About</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Contact</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Privacy</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Terms</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Cookie Policy</a></li>
                <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:justify-start space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M20.3 4.4c0-.2 0-.4-.1-.6-.1-.2-.2-.4-.4-.5-.2-.1-.4-.2-.6-.2-1.2-.2-2.4-.3-3.6-.3-1.2 0-2.4.1-3.6.3-.2 0-.4.1-.6.2-.2.1-.3.3-.4.5 0 .2-.1.4-.1.6v11.3c0 .2 0 .4.1.6.1.2.2.4.4.5.2.1.4.2.6.2h.9v-1.2c-.5.6-1.1 1-1.8 1.3-.7.3-1.5.5-2.3.5-.8 0-1.6-.2-2.3-.5-.7-.3-1.3-.7-1.8-1.3-.5-.6-.9-1.3-1.2-2.1-.3-.8-.4-1.6-.4-2.5 0-.9.1-1.7.4-2.5.3-.8.7-1.5 1.2-2.1.5-.6 1.1-1.1 1.8-1.4.7-.3 1.5-.5 2.3-.5.8 0 1.6.2 2.3.5.7.3 1.3.8 1.8 1.4V4.4zM8.5 10.8c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.6 1.6s.2 1.2.6 1.6c.4.4.9.6 1.5.6s1.1-.2 1.5-.6c.4-.4.6-1 .6-1.6s-.2-1.2-.6-1.6c-.4-.4-.9-.6-1.5-.6zm7 0c-.6 0-1.1.2-1.5.6-.4.4-.6 1-.6 1.6s.2 1.2.6 1.6c.4.4.9.6 1.5.6s1.1-.2 1.5-.6c.4-.4.6-1 .6-1.6s-.2-1.2-.6-1.6c-.4-.4-.9-.6-1.5-.6z" />
                  </svg>
                </a>
              </div>
              <p className="mt-8 text-center text-base text-gray-500 dark:text-gray-400 md:mt-0">
                &copy; {new Date().getFullYear()} AI Vault. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BestTools;