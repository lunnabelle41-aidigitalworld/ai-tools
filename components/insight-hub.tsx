// components/insight-hub.tsx
'use client';

import { useState, useEffect } from 'react';
import { Insight } from '../lib/comparison-context';

interface InsightHubProps {
  insights: Insight[];
  tools: string[];
  isWorkspaceReady: boolean;
}

export default function InsightHub({ insights, tools, isWorkspaceReady }: InsightHubProps) {
  const [activeTab, setActiveTab] = useState<'insights' | 'differentiators' | 'trends'>('insights');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock data for demonstration
  const mockDifferentiators = [
    {
      title: 'Price Advantage',
      description: 'Tool A is 40% cheaper but lacks API access',
      impact: 'high',
      tools: ['Tool A', 'Tool B']
    },
    {
      title: 'Feature Gap',
      description: 'Tool C offers advanced analytics that others lack',
      impact: 'medium',
      tools: ['Tool C']
    },
    {
      title: 'Integration Strength',
      description: 'Tool B has 2x more native integrations',
      impact: 'medium',
      tools: ['Tool B']
    }
  ];

  const mockTrends = [
    {
      title: 'User Satisfaction',
      description: 'Tool C\'s user satisfaction dropped 15% last quarter',
      trend: 'down',
      change: '-15%'
    },
    {
      title: 'Market Growth',
      description: 'Tool A gained 2000+ new enterprise customers',
      trend: 'up',
      change: '+23%'
    },
    {
      title: 'Feature Updates',
      description: 'Tool B released 5 major features this month',
      trend: 'up',
      change: '+5'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  useEffect(() => {
    if (isWorkspaceReady && tools.length >= 2) {
      runAnalysis();
    }
  }, [isWorkspaceReady, tools]);

  if (tools.length < 2) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">Select Tools to Analyze</h3>
          <p className="text-gray-400">Add at least 2 tools to see intelligent insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold mb-2">Insight Hub</h2>
        <p className="text-sm text-gray-400">AI-powered analysis and recommendations</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/10 rounded-lg">
        {(['insights', 'differentiators', 'trends'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === tab
                ? 'bg-white/20 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
            <span className="text-blue-300">AI Analysis in progress...</span>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      <div className="space-y-4">
        {activeTab === 'insights' && (
          <>
            {insights.length > 0 ? (
              insights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(insight.severity)}`}>
                      {insight.severity}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-300">{insight.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {insight.tools.map((tool) => (
                          <span key={tool} className="text-xs bg-blue-500/30 px-2 py-1 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <div className="text-2xl mb-2">💡</div>
                <p>No insights generated yet</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'differentiators' && (
          <>
            {mockDifferentiators.map((diff, index) => (
              <div
                key={index}
                className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(diff.impact)}`}>
                    {diff.impact} impact
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{diff.title}</h4>
                    <p className="text-sm text-gray-300">{diff.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {diff.tools.map((tool) => (
                        <span key={tool} className="text-xs bg-purple-500/30 px-2 py-1 rounded">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === 'trends' && (
          <>
            {mockTrends.map((trend, index) => (
              <div
                key={index}
                className="p-4 bg-white/10 rounded-lg border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{getTrendIcon(trend.trend)}</div>
                    <div>
                      <h4 className="font-semibold text-white">{trend.title}</h4>
                      <p className="text-sm text-gray-300">{trend.description}</p>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${
                    trend.trend === 'up' ? 'text-green-400' : 
                    trend.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {trend.change}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-white/10">
        <div className="space-y-2">
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
          </button>
          <button className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
            Export Insights
          </button>
        </div>
      </div>
    </div>
  );
}
