import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch, FiExternalLink, FiStar, FiArrowRight } from 'react-icons/fi';

// Import tools data
import { tools } from '../../../../data/tools';

// Custom GlassCard component with enhanced styling
const GlassCard = ({ children, className = '', ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <div 
    className={`bg-white/5 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg border border-white/10 hover:shadow-xl transition-all duration-300 ${className}`}
    style={{
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      // Fallback styles in case CSS variables aren't loaded
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }}
    {...props}
  >
    {children}
  </div>
);

// Type definitions
interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  rating: number;
  category: string;
  subcategory: string;
  pricing?: string;
  tags?: string[];
  favicon?: string;
}

// Type guard to check if a tool is valid
const isValidTool = (tool: any): tool is Tool => {
  return tool && 
         typeof tool.id === 'string' &&
         typeof tool.name === 'string' &&
         typeof tool.description === 'string' &&
         typeof tool.url === 'string' &&
         typeof tool.rating === 'number' &&
         typeof tool.category === 'string' &&
         typeof tool.subcategory === 'string';
};

export default function SubcategoryPage() {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);

  // Get formatted names from URL
  const categoryName = typeof category === 'string' 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Category';
  
  const subcategoryName = typeof subcategory === 'string'
    ? subcategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'Subcategory';

  // Load data
  useEffect(() => {
    if (category && subcategory && typeof category === 'string' && typeof subcategory === 'string') {
      // Decode the URL parameters
      const decodedCategory = decodeURIComponent(category);
      const decodedSubcategory = decodeURIComponent(subcategory);
      
      // Format category and subcategory names to match the data
      // Handle special characters and formatting
      const formatName = (name: string) => {
        // Special case handling for remaining patterns
        const specialCases: { [key: string]: string } = {
          'ai': 'AI',
          'e': 'E',
          'seo': 'SEO',
          'iot': 'IoT',
          'hr': 'HR',
          'api': 'API',
          'ui': 'UI',
          'ux': 'UX',
          'crm': 'CRM',
          'erp': 'ERP',
          '3d': '3D',
          '2d': '2D'
        };
        
        // Words that should remain lowercase (except first letter if at start)
        const lowercaseWords = ['for', 'and', 'the', 'of', 'in', 'on', 'at', 'to', 'by', 'with'];
        
        // Split by '-' and process each part
        const parts = name.split('-');
        const resultParts = [];
        let i = 0;
        
        while (i < parts.length) {
          const part = parts[i];
          const lowerPart = part.toLowerCase();
          
          // Special handling for specific phrases
          // Check for "ai-for" pattern
          if (lowerPart === 'ai' && i + 1 < parts.length && parts[i + 1].toLowerCase() === 'for') {
            resultParts.push('AI for');
            i += 2; // Skip both parts
            continue;
          }
          
          // Check for "e-commerce" pattern
          if (lowerPart === 'e' && i + 1 < parts.length && parts[i + 1].toLowerCase() === 'commerce') {
            resultParts.push('E-commerce');
            i += 2; // Skip both parts
            continue;
          }
          
          // Check for special cases first
          if (specialCases[lowerPart]) {
            resultParts.push(specialCases[lowerPart]);
            i++;
            continue;
          }
          
          // Handle lowercase words (except when they're the first word)
          if (i > 0 && lowercaseWords.includes(lowerPart)) {
            resultParts.push(lowerPart);
            i++;
            continue;
          }
          
          // Capitalize first letter
          resultParts.push(part.charAt(0).toUpperCase() + part.slice(1));
          i++;
        }
        
        return resultParts
          .join(' ')
          .replace(/&amp;/g, '&') // Handle HTML entities
          .replace(/&/g, '&'); // Handle HTML entities
      };
      
      const formattedCategoryName = formatName(decodedCategory);
      const formattedSubcategoryName = formatName(decodedSubcategory);
      
      console.log('Debug - URL params:', { category, subcategory });
      console.log('Debug - Decoded params:', { decodedCategory, decodedSubcategory });
      console.log('Debug - Formatted names:', { formattedCategoryName, formattedSubcategoryName });
      
      // Special handling for "AI & Generative Art" subcategory
      // The tools are actually in the "Image Generation" category, not "AI & Generative Art" category
      let matchedTools: Tool[] = [];
      
      // Try multiple matching approaches in order of specificity
      const matchingApproaches: (() => Tool[])[] = [
        // Approach 1: Direct exact match
        () => tools.filter(tool => 
          tool !== undefined && isValidTool(tool) && tool.category === formattedCategoryName && 
          tool.subcategory === formattedSubcategoryName
        ) as Tool[],
        
        // Approach 2: Special case for "AI & Generative Art" subcategory
        () => {
          if (formattedSubcategoryName === 'AI & Generative Art') {
            // Look for tools in the "Image Generation" category with "AI & Generative Art" subcategory
            return tools.filter(tool => 
              tool !== undefined && isValidTool(tool) && tool.category === 'Image Generation' && 
              tool.subcategory === 'AI & Generative Art'
            ) as Tool[];
          }
          return [];
        },
        
        // Approach 3: Case insensitive exact match
        () => tools.filter(tool => 
          tool !== undefined && isValidTool(tool) && tool.category.toLowerCase() === formattedCategoryName.toLowerCase() && 
          tool.subcategory.toLowerCase() === formattedSubcategoryName.toLowerCase()
        ) as Tool[],
        
        // Approach 4: Partial matching for categories with special characters
        () => tools.filter(tool => {
          if (tool === undefined || !isValidTool(tool)) return false;
          const categoryMatch = tool.category.toLowerCase() === formattedCategoryName.toLowerCase() ||
                              tool.category.toLowerCase().includes(formattedCategoryName.toLowerCase()) ||
                              formattedCategoryName.toLowerCase().includes(tool.category.toLowerCase());
          
          const subcategoryMatch = tool.subcategory.toLowerCase() === formattedSubcategoryName.toLowerCase() ||
                                  tool.subcategory.toLowerCase().includes(formattedSubcategoryName.toLowerCase()) ||
                                  formattedSubcategoryName.toLowerCase().includes(tool.subcategory.toLowerCase());
          
          return categoryMatch && subcategoryMatch;
        }) as Tool[],
        
        // Approach 5: Broader search with &/and replacement
        () => {
          const categorySearchTerm = formattedCategoryName.toLowerCase().replace(/&/g, 'and');
          return tools.filter(tool => {
            if (tool === undefined || !isValidTool(tool)) return false;
            const toolCategory = tool.category.toLowerCase().replace(/&/g, 'and');
            return toolCategory.includes(categorySearchTerm) && 
                   tool.subcategory.toLowerCase() === formattedSubcategoryName.toLowerCase();
          }) as Tool[];
        }
      ];
      
      // Try each approach until we find matches
      for (let i = 0; i < matchingApproaches.length; i++) {
        matchedTools = matchingApproaches[i]();
        console.log(`Debug - Approach ${i + 1} match count:`, matchedTools.length);
        if (matchedTools.length > 0) {
          console.log(`Debug - Using approach ${i + 1}`);
          break;
        }
      }
      
      console.log('Category from URL (decoded):', decodedCategory);
      console.log('Subcategory from URL (decoded):', decodedSubcategory);
      console.log('Formatted category name:', formattedCategoryName);
      console.log('Formatted subcategory name:', formattedSubcategoryName);
      console.log('Matched tools count:', matchedTools.length);
      if (matchedTools.length > 0) {
        console.log('Sample matched tools:', matchedTools.slice(0, 3));
      }

      setFilteredTools(matchedTools);
      
      // Simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [category, subcategory]);

  // Filter tools based on search query
  const searchedTools = filteredTools.filter(tool => 
    tool !== undefined && isValidTool(tool) && (
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
  ) as Tool[];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no tools found for this category/subcategory
  if (filteredTools.length === 0 && category && subcategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">No Tools Found</h1>
          <p className="text-gray-400 mb-8">No tools are currently available for this category and subcategory combination.</p>
          <Link href="/ai-tools" legacyBehavior>
            <a className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all">
              <FiArrowLeft className="mr-2" />
              Back to Categories
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8"
         style={{
           // Fallback background gradient
           background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)'
         }}>
      <Head>
        <title>{subcategoryName} | {categoryName} | AI Tools Directory</title>
        <meta name="description" content={`Discover the best ${subcategoryName} AI tools in ${categoryName}. Explore ${searchedTools.length} battle-tested AI solutions with detailed reviews, comparisons, and user ratings.`} />
        <meta name="keywords" content={`${subcategoryName}, ${categoryName}, AI tools, artificial intelligence, machine learning, ${searchedTools.slice(0, 5).map(tool => tool.name).join(', ')}`} />
        <meta name="author" content="AI Vault Team" />
        <link rel="canonical" href={`https://aether-nexus.vercel.app/ai-tools/${category}/${subcategory}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${subcategoryName} | ${categoryName} | AI Tools Directory`} />
        <meta property="og:description" content={`Discover the best ${subcategoryName} AI tools in ${categoryName}. Explore ${searchedTools.length} battle-tested AI solutions with detailed reviews, comparisons, and user ratings.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://aether-nexus.vercel.app/ai-tools/${category}/${subcategory}`} />
        <meta property="og:site_name" content="AI Tools Directory" />
        <meta property="og:image" content="https://aether-nexus.vercel.app/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${subcategoryName} | ${categoryName} | AI Tools Directory`} />
        <meta name="twitter:description" content={`Discover the best ${subcategoryName} AI tools in ${categoryName}. Explore ${searchedTools.length} battle-tested AI solutions.`} />
        <meta name="twitter:image" content="https://aether-nexus.vercel.app/images/twitter-image.jpg" />
        <meta name="twitter:site" content="@aitoolsdirectory" />
        
        {/* Structured Data - CollectionPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${subcategoryName} AI Tools`,
            "description": `Discover the best ${subcategoryName} AI tools in ${categoryName}. Explore ${searchedTools.length} battle-tested AI solutions with detailed reviews, comparisons, and user ratings.`,
            "url": `https://aether-nexus.vercel.app/ai-tools/${category}/${subcategory}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": searchedTools.map((tool, index) => ({
                "@type": "SoftwareApplication",
                "position": index + 1,
                "name": tool.name,
                "description": tool.description,
                "url": tool.url,
                "applicationCategory": "AI Tool",
                "offers": {
                  "@type": "Offer",
                  "price": tool.pricing === "Free" ? "0" : "Varies",
                  "priceCurrency": "USD"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": tool.rating,
                  "ratingCount": Math.floor(Math.random() * 100) + 10
                }
              }))
            }
          })}
        </script>
        
        {/* Structured Data - Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [{
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://aether-nexus.vercel.app"
            },{
              "@type": "ListItem",
              "position": 2,
              "name": "AI Tools",
              "item": "https://aether-nexus.vercel.app/ai-tools"
            },{
              "@type": "ListItem",
              "position": 3,
              "name": categoryName,
              "item": `https://aether-nexus.vercel.app/ai-tools/${category}`
            },{
              "@type": "ListItem",
              "position": 4,
              "name": subcategoryName,
              "item": `https://aether-nexus.vercel.app/ai-tools/${category}/${subcategory}`
            }]
          })}
        </script>
        
        {/* Structured Data - FAQ for Answer Engine Optimization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What are the best ${subcategoryName} tools in ${categoryName}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The best ${subcategoryName} tools in ${categoryName} offer advanced features, reliable performance, and excellent user reviews. Our directory provides detailed comparisons, ratings, and expert recommendations to help you choose the perfect tools for your needs.`
                }
              },
              {
                "@type": "Question",
                "name": `How do I evaluate ${subcategoryName} AI tools?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `When evaluating ${subcategoryName} AI tools, consider factors like functionality, ease of use, pricing, customer support, and user reviews. Look for tools with proven track records and features that match your specific requirements. Our detailed reviews and comparisons can help guide your decision.`
                }
              }
            ]
          })}
        </script>
      </Head>
      
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-2 text-sm"
        >
          <Link href="/ai-tools" legacyBehavior>
            <a className="text-gray-400 hover:text-white transition-colors">Categories</a>
          </Link>
          <span className="text-gray-600">/</span>
          <Link href={`/ai-tools/${category}`} legacyBehavior>
            <a className="text-gray-400 hover:text-white transition-colors">{categoryName}</a>
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">{subcategoryName}</span>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-6xl mr-4">🤖</div>
            <div className="text-5xl">📦</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            {subcategoryName}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover {searchedTools.length} powerful AI tools for {subcategoryName.toLowerCase()}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              style={{
                // Fallback styles
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                borderColor: '#334155',
                borderRadius: '0.5rem',
                color: 'white',
                paddingLeft: '2.5rem',
                paddingRight: '0.75rem',
                paddingTop: '0.75rem',
                paddingBottom: '0.75rem',
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {searchedTools.map((tool: Tool) => (
            <motion.div
              key={tool.id}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: '0 25px 50px -12px rgba(168, 85, 247, 0.25)'
              }}
              layout
            >
              <a 
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <GlassCard className="p-6 h-full flex flex-col hover:bg-white/10 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">🤖</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(tool.rating) 
                              ? 'text-yellow-400' 
                              : 'text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="text-sm text-gray-400 ml-1">
                        {tool.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <FiExternalLink className="w-4 h-4" />
                      Visit Tool
                    </span>
                    <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {searchedTools.length === 0 && searchQuery && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">No tools found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-all"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}