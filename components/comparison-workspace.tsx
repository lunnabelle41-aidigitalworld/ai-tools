// components/comparison-workspace.tsx
'use client';

import { ComparisonDimension } from '../lib/comparison-context';
import { 
  SpecsMatrix, 
  PerformanceRadar, 
  CostTimeline, 
  StackSynergy, 
  SentimentSphere, 
  AIAnalyst 
} from './comparison-dimensions';

interface ComparisonWorkspaceProps {
  dimension: ComparisonDimension;
  tools: string[];
  userPreferences: any;
  onWorkspaceReady: () => void;
}

export default function ComparisonWorkspace({ 
  dimension, 
  tools, 
  userPreferences, 
  onWorkspaceReady 
}: ComparisonWorkspaceProps) {
  const renderDimension = () => {
    if (tools.length < 2) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Quantum Comparator Ready</h3>
            <p className="text-gray-400">Select at least 2 tools to begin analysis</p>
          </div>
        </div>
      );
    }

    const componentProps = {
      tools,
      userPreferences,
      onReady: onWorkspaceReady
    };

    switch (dimension) {
      case 'specs_matrix':
        return <SpecsMatrix {...componentProps} />;
      case 'performance_radar':
        return <PerformanceRadar {...componentProps} />;
      case 'cost_timeline':
        return <CostTimeline {...componentProps} />;
      case 'stack_synergy':
        return <StackSynergy {...componentProps} />;
      case 'sentiment_sphere':
        return <SentimentSphere {...componentProps} />;
      case 'ai_analyst':
        return <AIAnalyst {...componentProps} />;
      default:
        return <SpecsMatrix {...componentProps} />;
    }
  };

  return (
    <div className="h-full overflow-auto">
      {renderDimension()}
    </div>
  );
}
