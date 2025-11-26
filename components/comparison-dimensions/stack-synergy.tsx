// components/comparison-dimensions/stack-synergy.tsx
'use client';

import { useState, useEffect } from 'react';

interface StackSynergyProps {
  tools: string[];
  userPreferences: any;
  onReady: () => void;
}

export default function StackSynergy({ tools, userPreferences, onReady }: StackSynergyProps) {
  const [selectedStack, setSelectedStack] = useState<string[]>([]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  // Mock compatibility data
  const getCompatibilityScore = (tool1: string, tool2: string) => {
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      'ChatGPT': {
        'Claude': 75,
        'Gemini': 85,
        'Slack': 95,
        'GitHub': 90
      },
      'Claude': {
        'ChatGPT': 75,
        'Gemini': 80,
        'Slack': 85,
        'GitHub': 85
      },
      'Gemini': {
        'ChatGPT': 85,
        'Claude': 80,
        'Slack': 90,
        'GitHub': 95
      }
    };

    return compatibilityMatrix[tool1]?.[tool2] || Math.floor(Math.random() * 30) + 70;
  };

  const getIntegrationTypes = (tool1: string, tool2: string) => {
    const integrations = [
      { type: 'API', available: Math.random() > 0.3 },
      { type: 'Webhook', available: Math.random() > 0.4 },
      { type: 'Native', available: Math.random() > 0.5 },
      { type: 'Third-party', available: Math.random() > 0.2 }
    ];

    return integrations.filter(int => int.available);
  };

  const calculateStackSynergy = (stack: string[]) => {
    if (stack.length < 2) return 0;
    
    let totalScore = 0;
    let comparisons = 0;

    for (let i = 0; i < stack.length; i++) {
      for (let j = i + 1; j < stack.length; j++) {
        totalScore += getCompatibilityScore(stack[i], stack[j]);
        comparisons++;
      }
    }

    return Math.round(totalScore / comparisons);
  };

  const toggleToolInStack = (toolName: string) => {
    setSelectedStack(prev => 
      prev.includes(toolName)
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Stack Synergy</h2>
        <p className="text-gray-400">Compatibility scoring and integration analysis</p>
      </div>

      {/* Tool Selection */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Build Your Stack</h3>
        <div className="flex flex-wrap gap-2">
          {tools.map((toolName) => (
            <button
              key={toolName}
              onClick={() => toggleToolInStack(toolName)}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                selectedStack.includes(toolName)
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              {toolName}
            </button>
          ))}
        </div>
      </div>

      {/* Stack Synergy Score */}
      {selectedStack.length >= 2 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-blue-400/30">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">
              {calculateStackSynergy(selectedStack)}%
            </div>
            <div className="text-gray-300">Stack Compatibility Score</div>
          </div>
        </div>
      )}

      {/* Compatibility Matrix */}
      {tools.length >= 2 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Compatibility Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/10">
                  <th className="px-4 py-2 border border-white/10"></th>
                  {tools.map((tool) => (
                    <th key={tool} className="px-4 py-2 text-center border border-white/10">
                      {tool}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tools.map((tool1) => (
                  <tr key={tool1}>
                    <td className="px-4 py-2 font-medium border border-white/10">{tool1}</td>
                    {tools.map((tool2) => {
                      if (tool1 === tool2) {
                        return (
                          <td key={tool2} className="px-4 py-2 text-center border border-white/10">
                            -
                          </td>
                        );
                      }
                      
                      const score = getCompatibilityScore(tool1, tool2);
                      const color = score >= 85 ? 'bg-green-500/20 text-green-400' : 
                                   score >= 70 ? 'bg-yellow-500/20 text-yellow-400' : 
                                   'bg-red-500/20 text-red-400';

                      return (
                        <td key={tool2} className={`px-4 py-2 text-center border border-white/10 ${color}`}>
                          {score}%
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Integration Details */}
      {selectedStack.length >= 2 && (
        <div>
          <h3 className="font-semibold mb-3">Integration Options</h3>
          <div className="space-y-4">
            {selectedStack.map((tool1, i) => 
              selectedStack.slice(i + 1).map((tool2) => {
                const integrations = getIntegrationTypes(tool1, tool2);
                const score = getCompatibilityScore(tool1, tool2);

                return (
                  <div key={`${tool1}-${tool2}`} className="bg-white/10 rounded-lg p-4 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{tool1} ↔ {tool2}</h4>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        score >= 85 ? 'bg-green-500/20 text-green-400' : 
                        score >= 70 ? 'bg-yellow-500/20 text-yellow-400' : 
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {score}% Compatible
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {integrations.map((integration) => (
                        <span key={integration.type} className="px-2 py-1 bg-blue-500/30 rounded text-sm">
                          {integration.type}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mt-8 p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
        <h3 className="font-semibold mb-2">💡 Recommendations</h3>
        <ul className="space-y-1 text-sm text-gray-300">
          <li>• Tools with 85%+ compatibility work seamlessly together</li>
          <li>• Consider API availability for custom integrations</li>
          <li>• Check native integrations for reduced setup time</li>
          <li>• Stack synergy improves with complementary features</li>
        </ul>
      </div>
    </div>
  );
}
