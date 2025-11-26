// components/comparison-dimensions/specs-matrix.tsx
'use client';

import { useState, useEffect } from 'react';
import { tools as allTools } from '../../data/tools';

interface SpecsMatrixProps {
  tools: string[];
  userPreferences: any;
  onReady: () => void;
}

export default function SpecsMatrix({ tools, userPreferences, onReady }: SpecsMatrixProps) {
  const [sortBy, setSortBy] = useState<'relevance' | 'name' | 'category'>('relevance');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['core']));

  const selectedTools = tools.map(toolName => 
    allTools.find(tool => tool && tool.name === toolName)
  ).filter((tool): tool is typeof allTools[0] => tool !== undefined);

  // Feature categories for smart grouping
  const featureCategories = {
    core: {
      name: 'Core Features',
      icon: '⚡',
      features: ['api_access', 'real_time_collaboration', 'offline_mode', 'mobile_support']
    },
    integration: {
      name: 'Integrations',
      icon: '🔗',
      features: ['slack_integration', 'github_integration', 'google_workspace', 'microsoft_teams']
    },
    security: {
      name: 'Security & Privacy',
      icon: '🔒',
      features: ['two_factor_auth', 'encryption', 'compliance', 'audit_logs']
    },
    support: {
      name: 'Support & Resources',
      icon: '💬',
      features: ['24_7_support', 'documentation', 'community', 'training']
    },
    pricing: {
      name: 'Pricing & Plans',
      icon: '💰',
      features: ['free_tier', 'trial_period', 'enterprise_plan', 'transparent_pricing']
    }
  };

  // Calculate relevance scores for features
  const calculateRelevance = (feature: string) => {
    // Mock relevance calculation based on user preferences
    const baseScore = Math.random() * 100;
    const preferenceBonus = userPreferences.weighting.power * 10;
    return baseScore + preferenceBonus;
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  useEffect(() => {
    onReady();
  }, [onReady]);

  const getFeatureValue = (tool: any, feature: string) => {
    // Mock feature values - in real implementation, this would come from tool data
    const mockFeatures: Record<string, Record<string, any>> = {
      'api_access': { 'ChatGPT': true, 'Claude': true, 'Gemini': true },
      'real_time_collaboration': { 'ChatGPT': false, 'Claude': true, 'Gemini': true },
      'offline_mode': { 'ChatGPT': true, 'Claude': false, 'Gemini': false },
      'mobile_support': { 'ChatGPT': true, 'Claude': true, 'Gemini': true },
      'slack_integration': { 'ChatGPT': true, 'Claude': true, 'Gemini': false },
      'github_integration': { 'ChatGPT': true, 'Claude': false, 'Gemini': true },
      'two_factor_auth': { 'ChatGPT': true, 'Claude': true, 'Gemini': true },
      'encryption': { 'ChatGPT': true, 'Claude': true, 'Gemini': true },
      '24_7_support': { 'ChatGPT': true, 'Claude': false, 'Gemini': true },
      'free_tier': { 'ChatGPT': true, 'Claude': false, 'Gemini': true },
    };

    return mockFeatures[feature]?.[tool] || Math.random() > 0.5;
  };

  const renderFeatureCell = (tool: any, feature: string) => {
    const value = getFeatureValue(tool, feature);
    const hasFeature = typeof value === 'boolean' ? value : value !== null;

    return (
      <td className="px-4 py-3 text-center border border-white/10">
        {hasFeature ? (
          <div className="flex items-center justify-center">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            {typeof value === 'string' && (
              <span className="ml-2 text-sm text-gray-300">{value}</span>
            )}
          </div>
        ) : (
          <div className="w-2 h-2 bg-gray-600 rounded-full mx-auto"></div>
        )}
      </td>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Specs Matrix</h2>
        <p className="text-gray-400">Comprehensive feature comparison with smart categorization</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('relevance')}
            className={`px-3 py-1 rounded text-sm ${
              sortBy === 'relevance' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Relevance
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-3 py-1 rounded text-sm ${
              sortBy === 'name' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Name
          </button>
          <button
            onClick={() => setSortBy('category')}
            className={`px-3 py-1 rounded text-sm ${
              sortBy === 'category' 
                ? 'bg-blue-500 text-white' 
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            Category
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/10">
              <th className="px-4 py-3 text-left border border-white/10">Feature</th>
              {tools.map((toolName) => (
                <th key={toolName} className="px-4 py-3 text-center border border-white/10">
                  <div className="font-semibold">{toolName}</div>
                  <div className="text-xs text-gray-400">{allTools.find(t => t && t.name === toolName)?.category || 'Unknown'}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(featureCategories).map(([categoryId, category]) => (
              <tr key={categoryId}>
                <td colSpan={tools.length + 1} className="px-0 py-0">
                  <div className="bg-white/5">
                    <button
                      onClick={() => toggleSection(categoryId)}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-semibold">{category.name}</span>
                      <span className="ml-auto text-sm text-gray-400">
                        {expandedSections.has(categoryId) ? '▼' : '▶'}
                      </span>
                    </button>
                    
                    {expandedSections.has(categoryId) && (
                      <div className="border-t border-white/10">
                        {category.features.map((feature) => (
                          <tr key={feature} className="hover:bg-white/5">
                            <td className="px-4 py-3 border border-white/10">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-300 capitalize">
                                  {feature.replace(/_/g, ' ')}
                                </span>
                                {sortBy === 'relevance' && (
                                  <span className="text-xs text-blue-400">
                                    {Math.round(calculateRelevance(feature))}%
                                  </span>
                                )}
                              </div>
                            </td>
                            {tools.map((toolName) => renderFeatureCell(toolName, feature))}
                          </tr>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <span>Not Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-blue-400">%</span>
          <span>Relevance Score</span>
        </div>
      </div>
    </div>
  );
}
