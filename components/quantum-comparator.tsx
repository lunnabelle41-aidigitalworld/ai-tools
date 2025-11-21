// components/quantum-comparator.tsx
'use client';

import { useState } from 'react';
import { useComparison } from '../lib/comparison-context';
import { 
  DimensionNavigator, 
  ComparisonWorkspace, 
  InsightHub, 
  ToolSelectionBar 
} from './index';

export default function QuantumComparator() {
  const { state, actions } = useComparison();
  const [isWorkspaceReady, setIsWorkspaceReady] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-md bg-white/5 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Quantum Comparator
                </h1>
                <p className="text-gray-300 mt-1">AI-powered tool comparison with decision intelligence</p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-400">
                  {state.session.tools.length} of 6 tools selected
                </div>
                <button
                  onClick={() => actions.generateInsights()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  Generate Insights
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Tool Selection Bar */}
        <div className="border-b border-white/10 flex-shrink-0">
          <ToolSelectionBar 
            tools={state.session.tools}
            availableTools={state.availableTools}
            onAddTool={actions.addTool}
            onRemoveTool={actions.removeTool}
            maxTools={6}
          />
        </div>

        {/* Main Comparator Interface */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Dimension Navigator */}
          <div className="w-80 border-r border-white/10 flex-shrink-0">
            <DimensionNavigator 
              activeDimension={state.session.dimension}
              onDimensionChange={actions.setDimension}
            />
          </div>

          {/* Center: Comparison Workspace */}
          <div className="flex-1 overflow-hidden">
            <ComparisonWorkspace 
              dimension={state.session.dimension}
              tools={state.session.tools}
              userPreferences={state.session.userPreferences}
              onWorkspaceReady={() => setIsWorkspaceReady(true)}
            />
          </div>

          {/* Right: Insight Hub */}
          <div className="w-96 border-l border-white/10 flex-shrink-0">
            <InsightHub 
              insights={state.session.insights}
              tools={state.session.tools}
              isWorkspaceReady={isWorkspaceReady}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
