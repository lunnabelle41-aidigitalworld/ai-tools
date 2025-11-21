// components/ToolNexus/AdoptionRadar.tsx
import { useState, useEffect, useRef } from 'react';
import { AdoptionRadar as AdoptionRadarType, MarketPosition, GrowthTrajectory } from '../../types/tool-nexus';

interface AdoptionRadarProps {
  radar: AdoptionRadarType;
}

const AdoptionRadar: React.FC<AdoptionRadarProps> = ({ radar }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<'current' | '6months' | '1year'>('current');
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Draw radar chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawRadar = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 40;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      // Draw concentric circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Draw quadrant lines
      const quadrants = [
        { angle: 0, label: 'Market Leaders' },
        { angle: Math.PI / 2, label: 'Innovators' },
        { angle: Math.PI, label: 'Niche Players' },
        { angle: (3 * Math.PI) / 2, label: 'Emerging Tools' }
      ];

      quadrants.forEach((quad) => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(quad.angle) * radius,
          centerY + Math.sin(quad.angle) * radius
        );
        ctx.stroke();
      });

      // Draw quadrant labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      quadrants.forEach((quad) => {
        const labelX = centerX + Math.cos(quad.angle) * (radius + 20);
        const labelY = centerY + Math.sin(quad.angle) * (radius + 20);
        ctx.fillText(quad.label, labelX, labelY);
      });

      // Draw market positions
      radar.market_position.forEach((position) => {
        const angle = getQuadrantAngle(position.quadrant);
        const distance = (position.market_share / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        // Draw tool position
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        
        // Color based on growth
        const growthRate = position.growth_rate;
        if (growthRate > 20) {
          ctx.fillStyle = 'rgba(34, 197, 94, 0.8)'; // green
        } else if (growthRate > 10) {
          ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'; // blue
        } else if (growthRate > 0) {
          ctx.fillStyle = 'rgba(251, 191, 36, 0.8)'; // yellow
        } else {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.8)'; // red
        }
        
        ctx.fill();
        
        // Draw border if hovered
        if (hoveredSegment === position.tool_name) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw tool name
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '10px sans-serif';
        ctx.fillText(position.tool_name, x, y - 12);
      });

      // Draw current tool position (highlighted)
      const currentTool = radar.market_position.find(p => p.is_current_tool);
      if (currentTool) {
        const angle = getQuadrantAngle(currentTool.quadrant);
        const distance = (currentTool.market_share / 100) * radius;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        // Draw highlight ring
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.8)'; // purple
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw pulsing effect
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const getQuadrantAngle = (quadrant: string): number => {
      switch (quadrant) {
        case 'market_leaders': return 0;
        case 'innovators': return Math.PI / 2;
        case 'niche_players': return Math.PI;
        case 'emerging_tools': return (3 * Math.PI) / 2;
        default: return 0;
      }
    };

    drawRadar();
  }, [radar, hoveredSegment]);

  const MarketPositionTable: React.FC = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h4 className="font-medium text-white mb-4">Market Position Analysis</h4>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/70 pb-2">Tool</th>
              <th className="text-center text-white/70 pb-2">Market Share</th>
              <th className="text-center text-white/70 pb-2">Growth Rate</th>
              <th className="text-center text-white/70 pb-2">Quadrant</th>
              <th className="text-center text-white/70 pb-2">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {radar.market_position
              .filter(pos => selectedQuadrant === 'all' || pos.quadrant === selectedQuadrant)
              .sort((a, b) => b.market_share - a.market_share)
              .map((position, index) => (
                <tr 
                  key={index}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                  onMouseEnter={() => setHoveredSegment(position.tool_name)}
                  onMouseLeave={() => setHoveredSegment(null)}
                >
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {position.is_current_tool && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                          Current
                        </span>
                      )}
                      <span className={position.is_current_tool ? 'text-white font-medium' : 'text-white/80'}>
                        {position.tool_name}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-3">
                    <span className="text-white/80">{position.market_share}%</span>
                  </td>
                  <td className="text-center py-3">
                    <span className={`font-medium ${
                      position.growth_rate > 20 ? 'text-green-400' :
                      position.growth_rate > 10 ? 'text-blue-400' :
                      position.growth_rate > 0 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {position.growth_rate > 0 ? '+' : ''}{position.growth_rate}%
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <span className="text-white/60 capitalize">
                      {position.quadrant.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="text-center py-3">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-16 bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${position.confidence_level * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/60">
                        {Math.round(position.confidence_level * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const GrowthTrajectoryChart: React.FC = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h4 className="font-medium text-white mb-4">Growth Trajectory</h4>
      
      <div className="space-y-4">
        {radar.growth_trajectory.map((trajectory, index) => (
          <div key={index} className="border-b border-white/10 pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-medium text-white">{trajectory.tool_name}</h5>
              <span className={`px-2 py-1 rounded-full text-xs ${
                trajectory.trajectory_type === 'accelerating' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : trajectory.trajectory_type === 'steady'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                  : trajectory.trajectory_type === 'declining'
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
              }`}>
                {trajectory.trajectory_type}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-white/60 mb-1">Current Growth</div>
                <div className="font-medium text-white">{trajectory.current_growth}%/yr</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Projected (1yr)</div>
                <div className="font-medium text-white">{trajectory.projected_growth}%/yr</div>
              </div>
              <div>
                <div className="text-white/60 mb-1">Market Share</div>
                <div className="font-medium text-white">{trajectory.market_share_projection}%</div>
              </div>
            </div>
            
            {/* Mini trend line */}
            <div className="mt-3 h-12 bg-black/30 rounded relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 200 50">
                <polyline
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  points={trajectory.historical_data.map((dataPoint, i) => {
                    const value = typeof dataPoint === 'number' ? dataPoint : dataPoint.value;
                    return `${i * 20},${50 - (value * 40)}`;
                  }).join(' ')}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CompetitiveInsights: React.FC = () => (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h4 className="font-medium text-white mb-4">Competitive Insights</h4>
      
      <div className="space-y-4">
        {radar.competitive_insights.map((insight, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2" />
            <div className="flex-1">
              <div className="text-white/80 mb-1">{insight.insight}</div>
              <div className="text-sm text-white/60 capitalize">
                {insight.data_source} • {Math.round(insight.confidence * 100)}% confidence
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 space-y-3">
        <div>
          <div className="text-sm font-medium text-purple-200">Market Position</div>
          <div className="text-sm text-purple-300">
            {radar.summary.market_position.current} ({radar.summary.market_position.trend})
          </div>
          {radar.summary.market_position.competitors.length > 0 && (
            <div className="text-xs text-purple-400 mt-1">
              Main competitors: {radar.summary.market_position.competitors.join(', ')}
            </div>
          )}
        </div>

        <div>
          <div className="text-sm font-medium text-purple-200">Growth Outlook</div>
          <div className="text-sm text-purple-300">
            {radar.summary.growth_outlook.rating} ({radar.summary.growth_outlook.projected_growth}% projected)
          </div>
          {radar.summary.growth_outlook.factors.length > 0 && (
            <div className="text-xs text-purple-400 mt-1">
              Key factors: {radar.summary.growth_outlook.factors.join(', ')}
            </div>
          )}
        </div>

        <div>
          <div className="text-sm font-medium text-purple-200">Competitive Threat</div>
          <div className="text-sm text-purple-300">
            {radar.summary.competitive_threat.level}
          </div>
          {radar.summary.competitive_threat.main_competitors.length > 0 && (
            <div className="text-xs text-purple-400 mt-1">
              Main competitors: {radar.summary.competitive_threat.main_competitors.join(', ')}
            </div>
          )}
          {radar.summary.competitive_threat.key_risks.length > 0 && (
            <div className="text-xs text-purple-400 mt-1">
              Key risks: {radar.summary.competitive_threat.key_risks.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Adoption Radar</h2>
        <p className="text-white/70">
          Market position visualization and growth trajectory analysis
        </p>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedQuadrant('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedQuadrant === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            All Quadrants
          </button>
          {['market_leaders', 'innovators', 'niche_players', 'emerging_tools'].map((quadrant) => (
            <button
              key={quadrant}
              onClick={() => setSelectedQuadrant(quadrant)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                selectedQuadrant === quadrant
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {quadrant.replace('_', ' ')}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {['current', '6months', '1year'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as any)}
              className={`px-4 py-2 rounded-lg transition-all capitalize ${
                timeframe === tf
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {tf.replace('months', ' months')}
            </button>
          ))}
        </div>
      </div>

      {/* Radar Visualization */}
      <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          className="w-full max-w-2xl mx-auto"
        />
      </div>

      {/* Market Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <MarketPositionTable />
        <GrowthTrajectoryChart />
      </div>

      {/* Competitive Insights */}
      <CompetitiveInsights />
    </div>
  );
};

export default AdoptionRadar;
