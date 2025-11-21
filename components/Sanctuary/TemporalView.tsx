// components/Sanctuary/TemporalView.tsx
'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '../../hooks/useFavorites';

interface TimePoint {
  date: Date;
  toolCount: number;
  categories: string[];
  mood: string;
  significantEvents: Array<{
    type: 'added' | 'removed' | 'milestone';
    description: string;
    toolName?: string;
  }>;
}

interface CollectionSnapshot {
  date: string;
  tools: string[];
  mood: string;
  healthScore: number;
  insights: string[];
}

export default function TemporalView() {
  const { favorites } = useFavorites();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeline, setTimeline] = useState<TimePoint[]>([]);
  const [snapshots, setSnapshots] = useState<CollectionSnapshot[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Generate historical timeline (simulated)
  const generateTimeline = () => {
    const timePoints: TimePoint[] = [];
    const now = new Date();
    
    // Generate timeline points for the last 6 months
    for (let i = 180; i >= 0; i -= 7) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const toolCount = Math.max(0, favorites.length - Math.floor(Math.random() * 10));
      const categories = ['AI Tools', 'Design', 'Development', 'Marketing'].slice(0, Math.floor(Math.random() * 4) + 1);
      
      timePoints.push({
        date,
        toolCount,
        categories,
        mood: ['productive', 'creative', 'research'][Math.floor(Math.random() * 3)],
        significantEvents: Math.random() > 0.7 ? [{
          type: ['added', 'removed', 'milestone'][Math.floor(Math.random() * 3)] as any,
          description: 'Significant collection change',
          toolName: `Tool ${Math.floor(Math.random() * 100)}`
        }] : []
      });
    }
    
    setTimeline(timePoints);
  };

  // Generate collection snapshots
  const generateSnapshots = () => {
    const snapshots: CollectionSnapshot[] = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 30 * 24 * 60 * 60 * 1000);
      const toolCount = Math.max(1, favorites.length - i + Math.floor(Math.random() * 3));
      
      snapshots.push({
        date: date.toISOString().split('T')[0],
        tools: Array.from({ length: toolCount }, (_, j) => `tool_${j}`),
        mood: ['productive', 'creative', 'research'][Math.floor(Math.random() * 3)],
        healthScore: Math.min(100, 60 + Math.random() * 40),
        insights: [
          'Collection growing steadily',
          'Good category diversity',
          'Consider optimization opportunities'
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      });
    }
    
    setSnapshots(snapshots);
  };

  useEffect(() => {
    generateTimeline();
    generateSnapshots();
  }, [favorites]);

  // Auto-play timeline
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setSelectedDate(prev => {
        const nextDate = new Date(prev.getTime() + 7 * 24 * 60 * 60 * 1000 * playbackSpeed);
        const maxDate = new Date();
        if (nextDate > maxDate) {
          setIsPlaying(false);
          return maxDate;
        }
        return nextDate;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const getTimelinePosition = (date: Date) => {
    if (timeline.length === 0) return 0;
    const firstDate = timeline[0].date;
    const lastDate = timeline[timeline.length - 1].date;
    const totalRange = lastDate.getTime() - firstDate.getTime();
    const position = (date.getTime() - firstDate.getTime()) / totalRange;
    return Math.max(0, Math.min(1, position)) * 100;
  };

  const getSnapshotForDate = (date: Date): CollectionSnapshot | null => {
    if (snapshots.length === 0) return null;
    
    return snapshots.reduce((closest, snapshot) => {
      const snapshotDate = new Date(snapshot.date);
      const closestDate = closest ? new Date(closest.date) : new Date(0);
      
      return Math.abs(snapshotDate.getTime() - date.getTime()) < Math.abs(closestDate.getTime() - date.getTime())
        ? snapshot
        : closest;
    }, snapshots[0]);
  };

  const currentSnapshot = getSnapshotForDate(selectedDate);

  return (
    <div className="fixed bottom-8 left-8 z-40">
      {/* Timeline Toggle */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Timeline Panel */}
      {isVisible && (
        <div className="absolute bottom-16 left-0 w-[600px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Temporal Journey</h3>
                <p className="text-sm opacity-90">Travel through your collection's evolution</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </button>
                
                <select
                  value={playbackSpeed}
                  onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                  className="px-2 py-1 bg-white/20 rounded text-sm border border-white/30"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={4}>4x</option>
                </select>
              </div>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="p-6">
            {/* Timeline Track */}
            <div className="relative mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full relative"
                  style={{ width: `${getTimelinePosition(selectedDate)}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-purple-600 rounded-full shadow-lg" />
                </div>
              </div>
              
              {/* Timeline Markers */}
              <div className="relative mt-4">
                {timeline.filter((_, i) => i % 4 === 0).map((point, index) => (
                  <div
                    key={index}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${getTimelinePosition(point.date)}%` }}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mb-1" />
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {point.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Date Display */}
            <div className="text-center mb-4">
              <div className="text-2xl font-bold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="text-sm text-gray-500">
                {timeline.find(tp => tp.date.toDateString() === selectedDate.toDateString())?.mood || 'productive'} mood
              </div>
            </div>

            {/* Snapshot Details */}
            {currentSnapshot && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Collection Snapshot</h4>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{currentSnapshot.tools.length}</div>
                    <div className="text-xs text-gray-500">Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{currentSnapshot.healthScore}%</div>
                    <div className="text-xs text-gray-500">Health</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{currentSnapshot.insights.length}</div>
                    <div className="text-xs text-gray-500">Insights</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Key Insights:</div>
                  {currentSnapshot.insights.map((insight, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Significant Events */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Notable Moments</h4>
              {timeline
                .filter(tp => tp.significantEvents.length > 0)
                .slice(0, 3)
                .map((point, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      {point.significantEvents[0].type === 'added' && <span className="text-xs">+</span>}
                      {point.significantEvents[0].type === 'removed' && <span className="text-xs">-</span>}
                      {point.significantEvents[0].type === 'milestone' && <span className="text-xs">🎯</span>}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {point.significantEvents[0].description}
                      </div>
                      <div className="text-xs text-gray-500">
                        {point.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {point.significantEvents[0].toolName && ` • ${point.significantEvents[0].toolName}`}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Phase Analysis */}
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900 mb-1">Phase Analysis</div>
              <div className="text-xs text-gray-600">
                {selectedDate.getFullYear() === new Date().getFullYear() - 1 && 
                 `Q${Math.ceil((selectedDate.getMonth() + 1) / 3)} ${selectedDate.getFullYear()} - ${
                   ['Heavy focus on AI tools', 'Design exploration phase', 'Development stack building', 'Productivity optimization'][Math.floor(Math.random() * 4)]
                 }`}
                {selectedDate.getFullYear() === new Date().getFullYear() &&
                 `Q${Math.ceil((selectedDate.getMonth() + 1) / 3)} ${selectedDate.getFullYear()} - ${
                   ['Collection diversification', 'Stack optimization', 'Tool consolidation', 'New category exploration'][Math.floor(Math.random() * 4)]
                 }`}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
