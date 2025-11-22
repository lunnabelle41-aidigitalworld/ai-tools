import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiFilter, FiArrowLeft } from 'react-icons/fi';

// Import categories data from data file
import { categories } from '../../../data/categories';

// Type definitions
interface Tool {
  name: string;
  description: string;
  website: string;
  rating: number;
}

interface Subcategory {
  name: string;
  favicon: string;
  website: string;
  tools?: Tool[];
  icon?: string;
  toolCount?: number;
  subcategories?: Subcategory[];
}

interface Category {
  name: string;
  icon: string;
  toolCount: number;
  subcategories: Subcategory[];
}

const CategoryPage = () => {
  const router = useRouter();
  const { category: categorySlug } = router.query;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);

  // Find the current category with more robust matching
  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ') // Replace special chars with space
      .trim()
      .replace(/\s+/g, ' '); // Replace multiple spaces with single space
  };

  const category = categories.find(
    (cat) => 
      normalizeString(cat.name) === normalizeString(String(categorySlug || '').replace(/-/g, ' '))
  );

  // If category not found, try to find a partial match
  const matchedCategory = category || categories.find(
    (cat) => 
      normalizeString(cat.name).includes(normalizeString(String(categorySlug || '').replace(/-/g, ' '))) ||
      normalizeString(String(categorySlug || '').replace(/-/g, ' ')).includes(normalizeString(cat.name))
  );

  // For debugging
  console.log('URL Slug:', categorySlug);
  console.log('Normalized URL Slug:', normalizeString(String(categorySlug || '').replace(/-/g, ' ')));
  console.log('Available Categories:', categories.map(c => `${c.name} (${normalizeString(c.name)})`));
  
  // Redirect to correct URL if we found a match but the URL was slightly off
  useEffect(() => {
    if (!category && matchedCategory && router.isReady) {
      const correctSlug = matchedCategory.name.toLowerCase().replace(/\s+/g, '-');
      router.replace(`/ai-tools/${correctSlug}`, undefined, { shallow: true });
    }
  }, [category, matchedCategory, router]);

  // Filter subcategories based on search query
  useEffect(() => {
    if (!category) return;
    
    if (searchQuery.trim() === '') {
      setFilteredSubcategories(category.subcategories || []);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = (category.subcategories || []).filter(
        (sub) => sub.name.toLowerCase().includes(query)
      );
      setFilteredSubcategories(filtered);
    }
  }, [searchQuery, category]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
        <Head>
          <title>Category Not Found | AI Tools Directory</title>
        </Head>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
          <p className="mb-6">The category you're looking for doesn't exist.</p>
          <Link href="/ai-tools" className="text-blue-400 hover:underline">
            ← Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <Head>
        <title>{category?.name || 'Category'} | AI Tools Directory</title>
        <meta name="description" content={`Explore ${category?.name || 'this category'} tools in our comprehensive AI tools directory. Find the best AI solutions for ${category?.name || 'your needs'} with detailed reviews and comparisons.`} />
        <meta name="keywords" content={`${category?.name || 'AI tools'}, artificial intelligence, ${category?.subcategories?.map(sub => sub.name).join(', ') || 'tools'}`} />
        <meta name="author" content="AI Vault Team" />
        <link rel="canonical" href={`https://aether-nexus.vercel.app/ai-tools/${categorySlug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${category?.name || 'Category'} | AI Tools Directory`} />
        <meta property="og:description" content={`Explore ${category?.name || 'this category'} tools in our comprehensive AI tools directory. Find the best AI solutions for ${category?.name || 'your needs'} with detailed reviews and comparisons.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://aether-nexus.vercel.app/ai-tools/${categorySlug}`} />
        <meta property="og:site_name" content="AI Tools Directory" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category?.name || 'Category'} | AI Tools Directory`} />
        <meta name="twitter:description" content={`Explore ${category?.name || 'this category'} tools in our comprehensive AI tools directory.`} />
        <meta name="twitter:site" content="@aitoolsdirectory" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": `${category?.name || 'Category'} Tools`,
            "description": `Explore ${category?.name || 'this category'} tools in our comprehensive AI tools directory. Find the best AI solutions for ${category?.name || 'your needs'} with detailed reviews and comparisons.`,
            "url": `https://aether-nexus.vercel.app/ai-tools/${categorySlug}`
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
              "name": category?.name || 'Category',
              "item": `https://aether-nexus.vercel.app/ai-tools/${categorySlug}`
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
                "name": `What are the best ${category?.name || 'AI'} tools in 2025?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The best ${category?.name || 'AI'} tools in 2025 offer advanced features, reliable performance, and excellent user reviews. Our directory provides detailed comparisons, ratings, and expert recommendations to help you choose the perfect tools for your needs.`
                }
              },
              {
                "@type": "Question",
                "name": `How do I choose the right ${category?.name || 'AI'} tools?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `When selecting ${category?.name || 'AI'} tools, consider your specific requirements, budget, ease of use, and integration capabilities. Read our detailed reviews, compare features, and check user ratings to make an informed decision.`
                }
              }
            ]
          })}
        </script>
      </Head>

      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/ai-tools" className="mr-4 text-blue-400 hover:underline flex items-center">
            <FiArrowLeft className="mr-1" /> Back to Categories
          </Link>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <span className="ml-4 text-2xl">{category.icon}</span>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search subcategories..."
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubcategories.map((subcategory) => (
            <Link
              key={subcategory.name}
              href={`/ai-tools/${category.name.toLowerCase().replace(/ /g, '-')}/${subcategory.name.toLowerCase().replace(/ /g, '-')}`}
              className="block"
            >
              <motion.div 
                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 h-full"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-3">
                  {subcategory.favicon && (
                    <span className="text-2xl mr-3">{subcategory.favicon}</span>
                  )}
                  <h2 className="text-xl font-semibold">{subcategory.name}</h2>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>{subcategory.tools?.length || 0} tools available</span>
                  <FiArrowRight className="ml-2" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredSubcategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No subcategories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
