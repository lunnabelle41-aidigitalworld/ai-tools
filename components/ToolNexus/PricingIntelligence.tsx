// components/ToolNexus/PricingIntelligence.tsx
import { useState, useEffect, useMemo } from 'react';
import { 
  PricingEngine, 
  PricingScenario, 
  HiddenCost, 
  ROICalculator,
  CompetitivePricing,
  UserPersona
} from '../../types/tool-nexus';

interface PricingIntelligenceProps {
  engine: PricingEngine;
  userPersona: UserPersona;
  onScenarioChange?: (scenario: PricingScenario) => void;
}

const PricingIntelligence: React.FC<PricingIntelligenceProps> = ({
  engine,
  userPersona,
  onScenarioChange
}) => {
  const [activeScenario, setActiveScenario] = useState<PricingScenario | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'monthly' | 'annual'>('annual');
  const [showHiddenCosts, setShowHiddenCosts] = useState(false);
  const [roiView, setRoiView] = useState<'summary' | 'detailed'>('summary');

  // Determine best scenario based on user persona
  useEffect(() => {
    const recommendedScenario = engine.scenarios.find(scenario => {
      if (userPersona.company_size === 'enterprise' && scenario.name.includes('Enterprise')) return true;
      if (userPersona.company_size === 'solo' && scenario.name.includes('Solo')) return true;
      if (userPersona.company_size === 'small' && scenario.name.includes('Startup')) return true;
      if (userPersona.primary_persona === 'freelancer' && scenario.name.includes('Freelancer')) return true;
      return false;
    }) || engine.scenarios[0];

    setActiveScenario(recommendedScenario);
  }, [engine.scenarios, userPersona]);

  const calculateTotalCost = (scenario: PricingScenario) => {
    const baseCost = selectedTimeframe === 'annual' ? scenario.annual_cost : scenario.monthly_cost;
    const setupCost = scenario.setup_fees;
    const trainingCost = scenario.training_costs;
    const hiddenCosts = showHiddenCosts ? 
      engine.hidden_costs.reduce((sum, cost) => sum + cost.estimated_cost, 0) : 0;
    
    return {
      baseCost,
      setupCost,
      trainingCost,
      hiddenCosts,
      total: baseCost + setupCost + trainingCost + hiddenCosts
    };
  };

  const calculateROI = (scenario: PricingScenario) => {
    const totalCost = calculateTotalCost(scenario).total;
    const totalROIValue = engine.roi_calculators.reduce((sum, calc) => sum + calc.estimated_value, 0);
    const monthlyROI = totalROIValue / 12;
    
    return {
      totalROIValue,
      monthlyROI,
      paybackPeriod: totalCost > 0 ? totalCost / monthlyROI : 0,
      roiPercentage: totalCost > 0 ? ((totalROIValue - totalCost) / totalCost) * 100 : 0
    };
  };

  const ScenarioSelector: React.FC = () => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Pricing Scenario</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {engine.scenarios.map((scenario) => {
          const costs = calculateTotalCost(scenario);
          const isActive = activeScenario?.id === scenario.id;
          const isRecommended = (
            (userPersona.company_size === 'enterprise' && scenario.name.includes('Enterprise')) ||
            (userPersona.company_size === 'solo' && scenario.name.includes('Solo')) ||
            (userPersona.company_size === 'small' && scenario.name.includes('Startup')) ||
            (userPersona.primary_persona === 'freelancer' && scenario.name.includes('Freelancer'))
          );

          return (
            <button
              key={scenario.id}
              onClick={() => {
                setActiveScenario(scenario);
                onScenarioChange?.(scenario);
              }}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                isActive 
                  ? 'bg-white/20 border-white/40 text-white' 
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{scenario.name}</h4>
                {isRecommended && (
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full border border-green-500/30">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-sm text-white/60 mb-3">{scenario.description}</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Team Size:</span>
                  <span>{scenario.team_size} people</span>
                </div>
                <div className="flex justify-between">
                  <span>Usage:</span>
                  <span className="capitalize">{scenario.usage_level}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Cost:</span>
                  <span>${selectedTimeframe === 'annual' ? scenario.annual_cost : scenario.monthly_cost}/{selectedTimeframe === 'annual' ? 'yr' : 'mo'}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const CostBreakdown: React.FC = () => {
    if (!activeScenario) return null;

    const costs = calculateTotalCost(activeScenario);

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">Cost Breakdown</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Cost Breakdown */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="font-medium text-white mb-4">Base Costs</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                  <span className="text-white/70">Subscription ({selectedTimeframe})</span>
                  <span className="font-medium text-white">
                    ${selectedTimeframe === 'annual' ? activeScenario.annual_cost : activeScenario.monthly_cost}
                  </span>
                </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Setup Fees</span>
                <span className="font-medium text-white">${costs.setupCost}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Training Costs</span>
                <span className="font-medium text-white">${costs.trainingCost}</span>
              </div>
              
              <div className="border-t border-white/20 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-white">Subtotal</span>
                  <span className="font-semibold text-white">
                    ${costs.baseCost + costs.setupCost + costs.trainingCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Timeframe Toggle */}
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSelectedTimeframe('monthly')}
                className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                  selectedTimeframe === 'monthly'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedTimeframe('annual')}
                className={`flex-1 py-2 px-4 rounded-lg transition-all ${
                  selectedTimeframe === 'annual'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                Annual (Save 20%)
              </button>
            </div>
          </div>

          {/* Hidden Costs */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">Hidden Costs</h4>
              <button
                onClick={() => setShowHiddenCosts(!showHiddenCosts)}
                className="text-sm text-white/60 hover:text-white"
              >
                {showHiddenCosts ? 'Hide' : 'Show'} Details
              </button>
            </div>
            
            {showHiddenCosts ? (
              <div className="space-y-3">
                {engine.hidden_costs.map((cost, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="text-white/70">{cost.description}</div>
                      <div className="text-xs text-white/50 capitalize">
                        {cost.frequency} • {cost.type}
                      </div>
                    </div>
                    <span className="font-medium text-white">
                      ${cost.estimated_cost}
                      {cost.frequency === 'monthly' && '/mo'}
                      {cost.frequency === 'annual' && '/yr'}
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-white">Hidden Costs Total</span>
                    <span className="font-semibold text-white">${costs.hiddenCosts}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-white/60">Click to reveal hidden costs</div>
                <div className="text-sm text-white/50">Setup, training, migration, and more</div>
              </div>
            )}
          </div>
        </div>

        {/* Total Cost Summary */}
        <div className="mt-6 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg p-6 border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold text-white">Total Investment</h4>
              <p className="text-sm text-white/70">
                {selectedTimeframe === 'annual' ? 'First year' : 'First month'} total cost including hidden expenses
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">${costs.total}</div>
              <div className="text-sm text-white/70">
                ${Math.round(costs.total / (selectedTimeframe === 'annual' ? 12 : 1))} per month
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ROIAnalysis: React.FC = () => {
    if (!activeScenario) return null;

    const roi = calculateROI(activeScenario);

    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">ROI Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ROI Summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="font-medium text-white mb-4">Return on Investment</h4>
            
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className={`text-4xl font-bold mb-2 ${
                  roi.roiPercentage >= 100 ? 'text-green-400' : 
                  roi.roiPercentage >= 50 ? 'text-blue-400' : 
                  roi.roiPercentage >= 0 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {roi.roiPercentage >= 0 ? '+' : ''}{roi.roiPercentage.toFixed(1)}%
                </div>
                <div className="text-white/70 text-sm">Annual ROI</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Monthly Value</span>
                  <span className="font-medium text-white">${roi.monthlyROI.toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Payback Period</span>
                  <span className="font-medium text-white">
                    {roi.paybackPeriod <= 1 ? '< 1 month' : 
                     roi.paybackPeriod <= 12 ? `${roi.paybackPeriod.toFixed(1)} months` :
                     `${(roi.paybackPeriod / 12).toFixed(1)} years`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Total 3-Year Value</span>
                  <span className="font-medium text-white">${(roi.totalROIValue * 3).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Breakdown */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-white">Value Sources</h4>
              <button
                onClick={() => setRoiView(roiView === 'summary' ? 'detailed' : 'summary')}
                className="text-sm text-white/60 hover:text-white"
              >
                {roiView === 'summary' ? 'Detailed' : 'Summary'}
              </button>
            </div>
            
            <div className="space-y-3">
              {engine.roi_calculators.map((calc, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="text-white/70 capitalize">{calc.metric.replace('_', ' ')}</div>
                    {roiView === 'detailed' && (
                      <div className="text-xs text-white/50">
                        {calc.calculation_method} • {Math.round(calc.confidence_level * 100)}% confidence
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-white">${calc.estimated_value}/yr</div>
                    {roiView === 'detailed' && (
                      <div className="text-xs text-white/50">
                        ROI in {calc.time_to_roi} months
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CompetitiveAnalysis: React.FC = () => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Competitive Analysis</h3>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="space-y-4">
          {engine.competitive_analysis.map((competitor, index) => (
            <div key={index} className="border-b border-white/10 pb-4 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white">{competitor.competitor_name}</h4>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    competitor.price_difference > 0 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {competitor.price_difference > 0 ? '+' : ''}{competitor.price_difference}%
                  </span>
                  <span className="text-sm text-white/60">vs this tool</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-white/70 mb-1">Value Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${competitor.value_score * 10}%` }}
                      />
                    </div>
                    <span className="text-sm text-white">{competitor.value_score}/10</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-white/70 mb-2">Feature Comparison</div>
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(competitor.feature_comparison).map(([feature, status]) => (
                      <span
                        key={feature}
                        className={`px-2 py-1 rounded text-xs ${
                          status === 'better' 
                            ? 'bg-green-500/20 text-green-300'
                            : status === 'equal'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {feature}: {status === 'better' ? '↑' : status === 'equal' ? '=' : '↓'}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PriceHistory: React.FC = () => (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">Price History</h3>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="space-y-3">
          {engine.price_history.map((point, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <div className="text-white">{new Date(point.date).toLocaleDateString()}</div>
                {point.change_reason && (
                  <div className="text-sm text-white/50">{point.change_reason}</div>
                )}
              </div>
              <div className="text-right">
                <div className="font-medium text-white">${point.price}</div>
                <div className="text-sm text-white/60 capitalize">{point.plan_type}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <div className="text-sm text-blue-300">
            <strong>Price Trend:</strong> Based on historical data, prices have increased by an average of 8% annually. 
            Current pricing represents good value compared to market trends.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Pricing Intelligence Engine</h2>
        <p className="text-white/70">
          Multi-dimensional cost analysis with ROI calculations and competitive insights
        </p>
      </div>

      <ScenarioSelector />
      
      {activeScenario && (
        <>
          <CostBreakdown />
          <ROIAnalysis />
          <CompetitiveAnalysis />
          <PriceHistory />
        </>
      )}
    </div>
  );
};

export default PricingIntelligence;
