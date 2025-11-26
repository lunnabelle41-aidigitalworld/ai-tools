// components/comparison-dimensions/sentiment-sphere.tsx
'use client';

import { useState, useEffect } from 'react';

interface SentimentSphereProps {
  tools: string[];
  userPreferences: any;
  onReady: () => void;
}

export default function SentimentSphere({ tools, userPreferences, onReady }: SentimentSphereProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('month');
  const [selectedSource, setSelectedSource] = useState<'all' | 'twitter' | 'reddit' | 'reviews'>('all');

  useEffect(() => {
    onReady();
  }, [onReady]);

  // Mock sentiment data
  const getSentimentData = (toolName: string) => {
    const baseSentiment = {
      positive: Math.random() * 30 + 40,
      neutral: Math.random() * 20 + 20,
      negative: Math.random() * 20 + 10
    };

    // Adjust based on tool
    const adjustments: Record<string, Partial<typeof baseSentiment>> = {
      'ChatGPT': { positive: 15, negative: -5 },
      'Claude': { positive: 10, neutral: 5 },
      'Gemini': { positive: 5, negative: 5 }
    };

    const adjustment = adjustments[toolName] || {};
    
    return {
      positive: Math.min(80, baseSentiment.positive + (adjustment.positive || 0)),
      neutral: Math.min(40, baseSentiment.neutral + (adjustment.neutral || 0)),
      negative: Math.max(5, baseSentiment.negative + (adjustment.negative || 0))
    };
  };

  const getReviews = (toolName: string) => {
    const mockReviews = [
      {
        text: "Amazing tool, completely transformed our workflow!",
        sentiment: 'positive',
        source: 'Twitter',
        timestamp: '2 hours ago',
        likes: 45
      },
      {
        text: "Good but could use better integration options",
        sentiment: 'neutral',
        source: 'Reddit',
        timestamp: '1 day ago',
        likes: 12
      },
      {
        text: "Had some issues with customer support response time",
        sentiment: 'negative',
        source: 'Reviews',
        timestamp: '3 days ago',
        likes: 8
      },
      {
        text: "The API is fantastic and very reliable",
        sentiment: 'positive',
        source: 'Twitter',
        timestamp: '1 week ago',
        likes: 67
      }
    ];

    return mockReviews.map(review => ({
      ...review,
      tool: toolName,
      text: review.text.replace('tool', toolName.toLowerCase())
    }));
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'neutral': return 'text-yellow-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'neutral': return '😐';
      case 'negative': return '😞';
      default: return '❓';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Sentiment Sphere</h2>
        <p className="text-gray-400">AI-powered review analysis and user sentiment</p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <div className="flex gap-2">
          {(['week', 'month', 'quarter'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-3 py-1 rounded text-sm capitalize ${
                selectedTimeframe === timeframe
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {(['all', 'twitter', 'reddit', 'reviews'] as const).map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`px-3 py-1 rounded text-sm capitalize ${
                selectedSource === source
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tools.map((toolName) => {
          const sentiment = getSentimentData(toolName);
          const total = sentiment.positive + sentiment.neutral + sentiment.negative;

          return (
            <div key={toolName} className="bg-white/10 rounded-lg p-4 border border-white/20">
              <h3 className="font-semibold mb-3">{toolName}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-green-400">😊 Positive</span>
                  <span>{Math.round((sentiment.positive / total) * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${(sentiment.positive / total) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">😐 Neutral</span>
                  <span>{Math.round((sentiment.neutral / total) * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(sentiment.neutral / total) * 100}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-red-400">😞 Negative</span>
                  <span>{Math.round((sentiment.negative / total) * 100)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-red-400 h-2 rounded-full"
                    style={{ width: `${(sentiment.negative / total) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Reviews */}
      <div>
        <h3 className="font-semibold mb-4">Recent Reviews</h3>
        <div className="space-y-4">
          {tools.flatMap(toolName => 
            getReviews(toolName).map((review, index) => (
              <div key={`${toolName}-${index}`} className="bg-white/10 rounded-lg p-4 border border-white/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getSentimentEmoji(review.sentiment)}</span>
                    <span className={`font-medium ${getSentimentColor(review.sentiment)}`}>
                      {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                    </span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{review.tool}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{review.source}</span>
                    <span>•</span>
                    <span>{review.timestamp}</span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-2">{review.text}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <span>❤️</span>
                    <span>{review.likes}</span>
                  </div>
                  <button className="hover:text-white transition-colors">🔄 Share</button>
                  <button className="hover:text-white transition-colors">💬 Reply</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-lg border border-blue-400/30">
        <h3 className="font-semibold mb-2">🤖 AI Sentiment Analysis</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>• Overall sentiment is trending positive across all tools</p>
          <p>• Users frequently mention API reliability and ease of use</p>
          <p>• Common concerns include pricing transparency and customer support</p>
          <p>• Integration capabilities are highly valued in user reviews</p>
        </div>
      </div>
    </div>
  );
}
