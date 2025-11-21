// components/dimension-navigator.tsx
'use client';

import { ComparisonDimension } from '../lib/comparison-context';

interface DimensionNavigatorProps {
  activeDimension: ComparisonDimension;
  onDimensionChange: (dimension: ComparisonDimension) => void;
}

const dimensions = [
  {
    id: 'specs_matrix' as ComparisonDimension,
    name: 'Specs Matrix',
    description: 'Traditional feature comparison',
    icon: '📊',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'performance_radar' as ComparisonDimension,
    name: 'Performance Radar',
    description: 'Visual capability analysis',
    icon: '🎯',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'cost_timeline' as ComparisonDimension,
    name: 'Cost Timeline',
    description: 'Pricing projection visualizer',
    icon: '💰',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'stack_synergy' as ComparisonDimension,
    name: 'Stack Synergy',
    description: 'Compatibility scoring',
    icon: '🔗',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'sentiment_sphere' as ComparisonDimension,
    name: 'Sentiment Sphere',
    description: 'User review analysis',
    icon: '💭',
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'ai_analyst' as ComparisonDimension,
    name: 'AI Analyst',
    description: 'Summary and recommendation',
    icon: '🤖',
    color: 'from-indigo-500 to-indigo-600'
  }
];

export default function DimensionNavigator({ activeDimension, onDimensionChange }: DimensionNavigatorProps) {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Comparison Dimensions</h2>
        <p className="text-sm text-gray-400">Switch between different analysis modes</p>
      </div>

      <div className="space-y-2">
        {dimensions.map((dimension) => (
          <button
            key={dimension.id}
            onClick={() => onDimensionChange(dimension.id)}
            className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
              activeDimension === dimension.id
                ? `bg-gradient-to-r ${dimension.color} border-transparent shadow-lg transform scale-105`
                : 'bg-white/10 border-white/20 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`text-2xl ${activeDimension === dimension.id ? 'animate-pulse' : ''}`}>
                {dimension.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${activeDimension === dimension.id ? 'text-white' : 'text-gray-200'}`}>
                  {dimension.name}
                </h3>
                <p className={`text-sm ${activeDimension === dimension.id ? 'text-white/80' : 'text-gray-400'}`}>
                  {dimension.description}
                </p>
              </div>
              {activeDimension === dimension.id && (
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-8 p-4 bg-white/10 rounded-xl border border-white/20">
        <h3 className="font-semibold mb-3">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Active Tools:</span>
            <span className="text-white">2-6 selected</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Analysis Depth:</span>
            <span className="text-white">Advanced</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">AI Insights:</span>
            <span className="text-white">Real-time</span>
          </div>
        </div>
      </div>
    </div>
  );
}
