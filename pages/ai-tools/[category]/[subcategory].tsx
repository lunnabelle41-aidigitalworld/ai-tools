import { useRouter } from "next/router";
import Head from "next/head";
import { categories } from "../../../data/categories";
import { tools } from "../../../data/tools";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface FaviconWithFallbackProps {
  src: string;
  alt: string;
  fallbackText: string;
  toolName: string;
}

function FaviconWithFallback({ src, alt, fallbackText, toolName }: FaviconWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => setImageError(true);
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  if (imageError || !src) {
    return (
      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/30">
        {fallbackText}
      </div>
    );
  }

  return (
    <div className="relative w-10 h-10">
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="rounded-lg shadow-lg border border-white/30"
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg border border-white/30">
          {fallbackText}
        </div>
      )}
    </div>
  );
}

export default function SubcategoryPage() {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const [search, setSearch] = useState("");
  const [pricing, setPricing] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [battleMap, setBattleMap] = useState(false);
  const [mostFearedTool, setMostFearedTool] = useState("Backlink Annihilator v9.4");
  const [winRate, setWinRate] = useState("98%");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [showDestruction, setShowDestruction] = useState(false);

  // Update win rate dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setWinRate(`${Math.floor(95 + Math.random() * 5)}%`);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add type safety for category and subcategory
  const categoryStr = typeof category === 'string' ? category : '';
  const subcategoryStr = typeof subcategory === 'string' ? subcategory : '';

  // Handle loading state
  if (!category || !subcategory) {
    return <div>Loading...</div>;
  }

  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === categoryStr
  );
  const subcategoryData = categoryData?.subcategories?.find(
    (sub) => sub.name.toLowerCase().replace(/\s+/g, "-") === subcategoryStr
  );
  const subcategoryName = subcategoryData?.name;

  const subcategoryTools = tools.filter((tool) => {
    const toolCategory = tool.category.toLowerCase().replace(/\s+/g, "-");
    const toolSubcategory = tool.subcategory?.toLowerCase().replace(/\s+/g, "-");
    return toolCategory === categoryStr && toolSubcategory === subcategoryStr;
  });

  // Unique tags for this subcategory
  const allTags = Array.from(
    new Set(subcategoryTools.flatMap((tool) => tool.tags || []))
  );

  // Filtering logic
  const filteredTools = subcategoryTools.filter((tool) => {
    const q = search.toLowerCase();
    const matchesSearch =
      tool.name.toLowerCase().includes(q) ||
      (tool.tags && tool.tags.some((tag) => tag.toLowerCase().includes(q)));
    const matchesPricing = pricing.length === 0 || pricing.includes(tool.pricing);
    const matchesRating = minRating === 0 || (tool.rating ?? 0) >= minRating;
    const matchesTags =
      selectedTags.length === 0 || 
      (tool.tags && selectedTags.every((tag) => tool.tags?.includes(tag)));
    return matchesSearch && matchesPricing && matchesRating && matchesTags;
  });

  // Handlers for filters
  const handlePricing = (val: string) => {
    setPricing((prev) =>
      prev.includes(val) ? prev.filter((p) => p !== val) : [...prev, val]
    );
  };

  const handleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Handle case when category or subcategory is not found
  if (!categoryData || !subcategoryName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
        <div className="text-center p-8 glass-card">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Category Not Found
          </h2>
          <p className="text-gray-300 mb-6">The requested category or subcategory could not be found.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      <Head>
        <title>{subcategoryName} | {categoryData.name} | AI Tools Directory</title>
        <meta name="description" content={`Explore the best ${subcategoryName} AI tools in our ${categoryData.name} collection.`} />
      </Head>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900 to-slate-900"></div>
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
        
        {/* Animated gradient blobs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full mix-blend-soft-light filter blur-3xl animate-blob animation-delay-1000"></div>
        <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full mix-blend-soft-light filter blur-3xl animate-blob"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">

        {/* Glowing Trophies */}
        <div className="absolute top-20 left-10 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 backdrop-blur-xl border border-yellow-300/50 rounded-2xl p-6 shadow-2xl">
            <div className="text-4xl mb-2">🏆</div>
            <div className="text-lg font-bold text-white">Most Feared</div>
            <div className="text-sm text-yellow-200">{mostFearedTool}</div>
          </div>
        </div>

        <div className="absolute top-20 right-10 z-10">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 backdrop-blur-xl border border-red-300/50 rounded-2xl p-6 shadow-2xl">
            <div className="text-4xl mb-2">⚔️</div>
            <div className="text-lg font-bold text-white">Win Rate</div>
            <div className="text-sm text-red-200">{winRate} of users crush #1 rankings</div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
              THE WAR ROOM
            </h1>
            <div className="text-3xl md:text-5xl font-bold text-white mb-4">
              {subcategoryName}
            </div>
            <div className="text-xl text-gray-300 mb-8">
              Battle-tested digital weapons for {categoryData.name}
            </div>
          </div>

          {/* Battle Map Toggle */}
          <div className="text-center">
            <button
              onClick={() => setBattleMap(!battleMap)}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-2xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 mb-8"
            >
              {battleMap ? "Hide Battle Map" : "Show Battle Map"}
            </button>
          </div>

          {/* Animated Battle Map */}
          {battleMap && (
            <div className="w-full max-w-4xl mx-auto bg-black/50 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Google SERPs Battlefield</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((position) => (
                  <div key={position} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-300/30 rounded-xl p-4 text-center hover:scale-105 transition-transform duration-300">
                    <div className="text-2xl mb-2">#{position}</div>
                    <div className="text-sm text-gray-300 mb-3">Competitor Territory</div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                        style={{ width: `${100 - (position * 20)}%` }}
                      ></div>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
            onClick={() => router.push(`/ai-tools/${categoryStr}`)}
          >
            ← Back to {categoryData.name}
          </button>
        </div>
      </div>

      {/* WAR ROOM - Advanced Filter Bar */}
      <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-sm border-b border-red-500/20 shadow-lg py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-2 md:items-center">
            <input
              type="text"
              placeholder="Inject tools directly into your veins..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full md:w-64 px-6 py-3 text-lg bg-white/20 border border-red-300/50 rounded-xl text-cyan-300 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-red-400/50 focus:border-red-500 transition-all duration-300 font-semibold"
            />
            
            {/* Power Level Filter */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-red-200 font-semibold">Power Level:</span>
              {["Free", "Freemium", "Paid"].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePricing(p)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-200 ${pricing.includes(p) ? "bg-red-500 border-red-500 text-white shadow" : "bg-white/10 border-red-300/30 text-gray-200 hover:bg-red-500/30"}`}
                >
                  {p}
                </button>
              ))}
            </div>
            
            {/* Battle Rating Filter */}
            <div className="flex gap-2 items-center">
              <span className="text-sm text-red-200 font-semibold">Battle Rating:</span>
              {[0, 4, 4.5, 5].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-200 ${minRating === r ? "bg-yellow-400 border-yellow-400 text-black shadow" : "bg-white/10 border-yellow-300/30 text-gray-200 hover:bg-yellow-400/30"}`}
                >
                  {r === 0 ? "Any" : `${r}+`}
                </button>
              ))}
            </div>
            
            {/* Weapon Tags */}
            {allTags.length > 0 && (
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-sm text-red-200 font-semibold">Weapon Tags:</span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-200 ${selectedTags.includes(tag) ? "bg-green-400 border-green-400 text-black shadow" : "bg-white/10 border-green-300/30 text-gray-200 hover:bg-green-400/30"}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      {/* Premium tool cards grid */}
      <div className="max-w-6xl mx-auto px-4">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTools.map((tool, i) => (
              <div
                key={tool.name}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/20 rounded-full blur-2xl z-0 group-hover:scale-110 group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative z-10 bg-slate-800/90 backdrop-blur-md border border-white/10 rounded-3xl p-8 pt-12 shadow-xl hover:bg-slate-700/90 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 group-hover:shadow-2xl">
                  <div className="absolute left-6 top-6 z-20">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-yellow-300 font-bold text-sm shadow-lg border border-white/30">
                      {tool.name.substring(0, 2).toUpperCase()}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow">
                      {tool.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="text-white font-bold">{tool.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-extrabold mb-2 text-white drop-shadow-lg">{tool.name}</h3>
                  <p className="text-gray-200 mb-6 leading-relaxed font-medium">{tool.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow">
                      {tool.pricing}
                    </span>
                    {tool.tags && tool.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-center shadow-lg"
                  >
                    Visit Website ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 animate-fade-in-up">
            <Image src="/empty-state.svg" alt="No tools" width={120} height={120} className="mb-6 opacity-80" />
            <div className="text-2xl font-bold text-white mb-2">No tools found</div>
            <div className="text-gray-300">Try adjusting your filters or check back soon for more premium tools!</div>
          </div>
                 )}
       </div>

       {/* Competitor Destruction Simulator */}
       <div className="max-w-6xl mx-auto px-4 py-20">
         <div className="bg-gradient-to-r from-red-500/20 to-black/20 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8">
           <h3 className="text-3xl font-bold text-white mb-6 text-center">Competitor Destruction Simulator</h3>
           <p className="text-gray-300 mb-8 text-center">Input a competitor URL and watch AI predict their downfall using your tools</p>
           
           <div className="flex flex-col md:flex-row gap-4 mb-8">
             <input
               type="url"
               placeholder="Enter competitor URL..."
               value={competitorUrl}
               onChange={(e) => setCompetitorUrl(e.target.value)}
               className="flex-1 px-6 py-4 bg-white/20 border border-red-300/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-400/50"
             />
             <button
               onClick={() => setShowDestruction(true)}
               className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
             >
               Simulate Destruction
             </button>
           </div>

           {showDestruction && (
             <div className="bg-black/50 backdrop-blur-md border border-red-500/30 rounded-2xl p-6">
               <h4 className="text-xl font-bold text-red-400 mb-4">Destruction Analysis</h4>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="text-center">
                   <div className="text-3xl mb-2">📉</div>
                   <div className="text-lg font-bold text-white">Traffic Drop</div>
                   <div className="text-red-400">-67%</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl mb-2">🔍</div>
                   <div className="text-lg font-bold text-white">Ranking Loss</div>
                   <div className="text-red-400">-15 positions</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl mb-2">💀</div>
                   <div className="text-lg font-bold text-white">Time to Oblivion</div>
                   <div className="text-red-400">47 days</div>
                 </div>
               </div>
             </div>
           )}
         </div>
       </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}