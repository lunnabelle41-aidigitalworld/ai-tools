// components/Sanctuary/FocusCrystal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { tools } from '../../data/tools';
import { Tool } from '../../types/tool';

interface SanctuaryStats {
  totalTools: number;
  categories: number;
  newUpdates: number;
  healthScore: number;
  monthlyCost: number;
  lastActivity: string;
}

export default function FocusCrystal() {
  const { favorites } = useFavorites();
  const [stats, setStats] = useState<SanctuaryStats | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'insights'>('overview');

  // Calculate sanctuary statistics
  useEffect(() => {
    if (!favorites.length) return;

    const favoriteTools: Tool[] = [];
    favorites.forEach(favId => {
      const tool = tools.find(t => t && t.id === favId);
      if (tool && tool.name) {
        favoriteTools.push(tool as Tool);
      }
    });
    const categories = new Set(favoriteTools.map(tool => tool.category)).size;
    
    // Simulate new updates (in real app, this would come from API)
    const newUpdates = Math.floor(Math.random() * 8);
    
    // Calculate health score based on various factors
    const healthScore = Math.min(100, Math.floor(
      (favoriteTools.length * 5) + // Base score for having tools
      (categories * 10) + // Bonus for diversity
      (100 - favoriteTools.filter(t => t.pricing === 'Free').length * 2) // Bonus for paid tools
    ));

    // Calculate monthly cost (simulated)
    const monthlyCost = favoriteTools.reduce((total, tool) => {
      if (tool.pricing === 'Free') return total;
      if (tool.pricing === 'Freemium') return total + 10;
      return total + 29; // Average paid tool cost
    }, 0);

    setStats({
      totalTools: favoriteTools.length,
      categories,
      newUpdates,
      healthScore,
      monthlyCost,
      lastActivity: '2 hours ago'
    });
  }, [favorites]);

  if (!stats) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      {/* Crystal Core */}
      <div 
        className={`
          relative transition-all duration-700 ease-out
          ${isExpanded ? 'scale-150' : 'scale-100'}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Outer Crystal Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full blur-xl opacity-60 animate-pulse" />
        
        {/* Crystal Body */}
        <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/30 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
          
          {/* Stats Display */}
          <div className="text-center text-white">
            <div className="text-2xl font-bold">{stats.totalTools}</div>
            <div className="text-xs opacity-80">Tools</div>
          </div>
        </div>

        {/* Floating Stats Orbs */}
        {!isExpanded && (
          <>
            <div className="absolute -top-8 -right-8 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-bounce">
              {stats.categories}
            </div>
            <div className="absolute -bottom-6 -right-10 w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
              {stats.newUpdates}
            </div>
            <div className="absolute -top-6 -left-8 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
              {stats.healthScore}%
            </div>
          </>
        )}
      </div>

      {/* Expanded Panel */}
      {isExpanded && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            {(['overview', 'health', 'insights'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${activeTab === tab 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="text-white">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">{stats.totalTools}</div>
                    <div className="text-sm opacity-70">Total Tools</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">{stats.categories}</div>
                    <div className="text-sm opacity-70">Categories</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">${stats.monthlyCost}</div>
                    <div className="text-sm opacity-70">Monthly Cost</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold">{stats.healthScore}%</div>
                    <div className="text-sm opacity-70">Health Score</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Activity</span>
                    <span className="text-xs opacity-70">{stats.lastActivity}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Collection Health</span>
                    <span className="text-sm">{stats.healthScore}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.healthScore}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm">Your stack is well-balanced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-sm">Consider adding analytics tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-sm">Great category diversity</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4">
                  <div className="font-medium mb-2">AI Insights</div>
                  <div className="text-sm opacity-80 space-y-2">
                    <p>• Your design stack is 80% complete</p>
                    <p>• You could save $47/month with alternatives</p>
                    <p>• 3 tools released major updates this week</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="font-medium mb-2">Recommendations</div>
                  <div className="text-sm opacity-80 space-y-1">
                    <p>• Add a project management tool</p>
                    <p>• Consider automation software</p>
                    <p>• Explore AI writing assistants</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex gap-2">
            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium">
              Compare Selected
            </button>
            <button className="flex-1 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all text-sm font-medium">
              Share Collection
            </button>
            <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-sm font-medium">
              AI Organize
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
