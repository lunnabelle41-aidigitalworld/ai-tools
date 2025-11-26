// components/comparison-dimensions/ai-analyst.tsx
'use client';

import { useState, useEffect } from 'react';

interface AIAnalystProps {
  tools: string[];
  userPreferences: any;
  onReady: () => void;
}

export default function AIAnalyst({ tools, userPreferences, onReady }: AIAnalystProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    if (tools.length >= 2) {
      runAnalysis();
    }
    onReady();
  }, [tools, onReady]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis = {
      executiveSummary: "Based on your team size of 10 and 3-year timeframe, ChatGPT offers the best balance of features and cost-effectiveness. Claude provides superior accuracy for complex tasks, while Gemini excels in scalability and integration capabilities.",
      keyFindings: [
        {
          title: "Cost Efficiency",
          description: "Gemini offers the lowest total cost of ownership at $18,000 over 3 years, 20% less than competitors.",
          impact: "high",
          tools: ["Gemini"]
        },
        {
          title: "Feature Completeness",
          description: "ChatGPT provides the most comprehensive feature set with 95% coverage of essential business needs.",
          impact: "medium",
          tools: ["ChatGPT"]
        },
        {
          title: "Integration Ecosystem",
          description: "All three tools offer strong API capabilities, but ChatGPT has the most mature third-party integration ecosystem.",
          impact: "medium",
          tools: ["ChatGPT", "Claude", "Gemini"]
        }
      ],
      recommendations: [
        {
          tool: "ChatGPT",
          reason: "Best overall value for general business use cases",
          confidence: 85,
          useCase: "General business operations, customer support, content creation"
        },
        {
          tool: "Claude",
          reason: "Superior for complex analytical tasks and detailed work",
          confidence: 78,
          useCase: "Research, analysis, complex problem-solving"
        },
        {
          tool: "Gemini",
          reason: "Most scalable for large teams and enterprise needs",
          confidence: 82,
          useCase: "Enterprise deployments, large-scale automation"
        }
      ],
      riskFactors: [
        {
          factor: "Vendor Lock-in",
          level: "medium",
          description: "All tools have proprietary APIs that may complicate future migration"
        },
        {
          factor: "Price Volatility",
          level: "low",
          description: "Pricing has been relatively stable across all platforms"
        },
        {
          factor: "Feature Parity",
          level: "high",
          description: "Core features are similar, making differentiation difficult"
        }
      ],
      implementationPlan: [
        {
          phase: "Pilot (Month 1-2)",
          actions: ["Deploy ChatGPT for 5 users", "Test key integrations", "Gather feedback"],
          estimatedCost: "$500"
        },
        {
          phase: "Scale (Month 3-6)",
          actions: ["Expand to full team", "Implement custom workflows", "Train staff"],
          estimatedCost: "$2,500"
        },
        {
          phase: "Optimize (Month 7-12)",
          actions: ["Fine-tune usage patterns", "Optimize costs", "Evaluate additional tools"],
          estimatedCost: "$3,000"
        }
      ]
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-400';
      case 'medium': return 'border-yellow-400';
      case 'low': return 'border-green-400';
      default: return 'border-gray-400';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress</h3>
            <p className="text-gray-400">Analyzing tools and generating insights...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center text-gray-400">
            <div className="text-4xl mb-2">🤖</div>
            <p>Select at least 2 tools to begin AI analysis</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">AI Analyst</h2>
        <p className="text-gray-400">Executive summary and intelligent recommendations</p>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg p-6 border border-blue-400/30">
        <h3 className="text-xl font-semibold mb-3">📋 Executive Summary</h3>
        <p className="text-gray-200 leading-relaxed">{analysis.executiveSummary}</p>
      </div>

      {/* Key Findings */}
      <div>
        <h3 className="text-xl font-semibold mb-4">🔍 Key Findings</h3>
        <div className="space-y-3">
          {analysis.keyFindings.map((finding: any, index: number) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-start gap-3">
                <div className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(finding.impact)}`}>
                  {finding.impact} impact
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{finding.title}</h4>
                  <p className="text-gray-300 text-sm">{finding.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {finding.tools.map((tool: string) => (
                      <span key={tool} className="text-xs bg-blue-500/30 px-2 py-1 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-semibold mb-4">🎯 Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysis.recommendations.map((rec: any, index: number) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{rec.tool}</h4>
                <div className="text-sm text-green-400">{rec.confidence}% match</div>
              </div>
              <p className="text-gray-300 text-sm mb-2">{rec.reason}</p>
              <div className="text-xs text-gray-400">
                <strong>Best for:</strong> {rec.useCase}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Factors */}
      <div>
        <h3 className="text-xl font-semibold mb-4">⚠️ Risk Factors</h3>
        <div className="space-y-3">
          {analysis.riskFactors.map((risk: any, index: number) => (
            <div key={index} className={`bg-white/10 rounded-lg p-4 border-l-4 ${getRiskColor(risk.level)}`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{risk.factor}</h4>
                <div className={`text-sm px-2 py-1 rounded ${
                  risk.level === 'high' ? 'bg-red-400/20 text-red-400' :
                  risk.level === 'medium' ? 'bg-yellow-400/20 text-yellow-400' :
                  'bg-green-400/20 text-green-400'
                }`}>
                  {risk.level} risk
                </div>
              </div>
              <p className="text-gray-300 text-sm">{risk.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Plan */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📅 Implementation Plan</h3>
        <div className="space-y-4">
          {analysis.implementationPlan.map((phase: any, index: number) => (
            <div key={index} className="bg-white/10 rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">{phase.phase}</h4>
                <div className="text-sm text-green-400">{phase.estimatedCost}</div>
              </div>
              <ul className="space-y-1 text-sm text-gray-300">
                {phase.actions.map((action: string, actionIndex: number) => (
                  <li key={actionIndex} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={runAnalysis}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Re-run Analysis
        </button>
        <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
          Export Report
        </button>
        <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
          Share Insights
        </button>
      </div>
    </div>
  );
}
