// components/Sanctuary/DigitalGardener.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import { tools } from '../../data/tools';
import { Tool } from '../../types/tool';

interface GardenerMessage {
  id: string;
  type: 'suggestion' | 'insight' | 'alert' | 'celebration';
  title: string;
  content: string;
  actions?: Array<{
    label: string;
    action: () => void;
    variant: 'primary' | 'secondary';
  }>;
  timestamp: Date;
}

interface CollectionAnalysis {
  stackCompleteness: number;
  costOptimization: number;
  usagePatterns: Record<string, number>;
  recommendations: string[];
  healthTrends: Array<{ date: string; score: number }>;
}

export default function DigitalGardener() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [messages, setMessages] = useState<GardenerMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<CollectionAnalysis | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Analyze collection patterns
  const analyzeCollection = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const favoriteTools: Tool[] = [];
    favorites.forEach(favId => {
      const tool = tools.find(t => t && t.id === favId);
      if (tool && tool.name) {  // Ensure tool exists and has a name
        // Cast to Tool type since we've verified name exists
        favoriteTools.push(tool as Tool);
      }
    });
    
    const categories = new Set(favoriteTools.map(tool => tool.category));
    
    // Calculate stack completeness
    const essentialCategories = ['AI Tools', 'Development', 'Design', 'Productivity'];
    const completeness = (categories.size / essentialCategories.length) * 100;
    
    // Calculate cost optimization opportunities
    const paidTools = favoriteTools.filter(tool => tool.pricing !== 'Free');
    const costOptimization = paidTools.length * 47; // Simulated savings
    
    // Generate recommendations
    const recommendations = [];
    if (!categories.has('AI Tools')) recommendations.push('Add AI tools to boost productivity');
    if (!categories.has('Design')) recommendations.push('Consider design tools for better visuals');
    if (paidTools.length > 5) recommendations.push('Review expensive tools for alternatives');
    if (favoriteTools.length < 10) recommendations.push('Explore more tools to complete your stack');
    
    // Generate health trends (simulated)
    const healthTrends = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      score: Math.min(100, 60 + Math.random() * 40 + i * 2)
    }));
    
    setAnalysis({
      stackCompleteness: Math.round(completeness),
      costOptimization,
      usagePatterns: Object.fromEntries(
        Array.from(categories, cat => [cat, Math.floor(Math.random() * 100)])
      ),
      recommendations,
      healthTrends
    });
    
    setIsAnalyzing(false);
  };

  // Generate contextual messages
  const generateMessages = () => {
    const newMessages: GardenerMessage[] = [];
    
    if (favorites.length === 0) {
      newMessages.push({
        id: 'welcome',
        type: 'suggestion',
        title: '🌱 Welcome to Your Sanctuary',
        content: 'I\'m your Digital Gardener. Let me help you cultivate the perfect tool collection. Start by adding some favorite tools!',
        actions: [{
          label: 'Explore Tools',
          action: () => window.location.href = '/',
          variant: 'primary'
        }],
        timestamp: new Date()
      });
    } else if (favorites.length === 5) {
      newMessages.push({
        id: 'milestone-5',
        type: 'celebration',
        title: '🎉 Growing Beautifully!',
        content: 'You\'ve cultivated 5 tools! Your sanctuary is starting to flourish. Keep growing!',
        timestamp: new Date()
      });
    } else if (favorites.length === 20) {
      newMessages.push({
        id: 'milestone-20',
        type: 'celebration',
        title: '🌟 Thriving Ecosystem!',
        content: '20 tools! You have a diverse and thriving digital garden. Consider organizing them into collections.',
        timestamp: new Date()
      });
    }
    
    // Cost optimization alert
    if (analysis && analysis.costOptimization > 50) {
      newMessages.push({
        id: 'cost-alert',
        type: 'alert',
        title: '💰 Cost Optimization Available',
        content: `You could save $${analysis.costOptimization}/month by switching to alternative tools. Would you like me to show you options?`,
        actions: [{
          label: 'Show Alternatives',
          action: () => console.log('Show alternatives'),
          variant: 'primary'
        }],
        timestamp: new Date()
      });
    }
    
    // Stack completeness suggestion
    if (analysis && analysis.stackCompleteness < 70) {
      newMessages.push({
        id: 'stack-completeness',
        type: 'suggestion',
        title: '🔧 Complete Your Stack',
        content: 'Your tool stack could be more complete. I recommend adding tools from missing categories.',
        actions: [{
          label: 'Get Recommendations',
          action: () => console.log('Show recommendations'),
          variant: 'secondary'
        }],
        timestamp: new Date()
      });
    }
    
    setMessages(newMessages);
  };

  // Initial analysis
  useEffect(() => {
    if (favorites.length > 0) {
      analyzeCollection();
    }
  }, [favorites]);

  // Generate messages when analysis changes
  useEffect(() => {
    generateMessages();
  }, [analysis, favorites]);

  const dismissMessage = (messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Gardener Avatar */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        
        {/* Notification indicator */}
        {messages.length > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center animate-pulse">
            {messages.length}
          </div>
        )}
      </button>

      {/* Messages Panel */}
      {isVisible && (
        <div className="absolute bottom-16 right-0 w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 max-h-96 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Digital Gardener</h3>
                <p className="text-sm opacity-90">Your AI assistant</p>
              </div>
              {isAnalyzing && (
                <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm">Your garden is thriving!</p>
                <p className="text-xs">I'll notify you of any insights.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`
                    p-3 rounded-lg border
                    ${message.type === 'celebration' ? 'bg-yellow-50 border-yellow-200' : ''}
                    ${message.type === 'alert' ? 'bg-red-50 border-red-200' : ''}
                    ${message.type === 'suggestion' ? 'bg-blue-50 border-blue-200' : ''}
                    ${message.type === 'insight' ? 'bg-purple-50 border-purple-200' : ''}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{message.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{message.content}</p>
                      
                      {message.actions && (
                        <div className="flex gap-2">
                          {message.actions.map((action, idx) => (
                            <button
                              key={idx}
                              onClick={action.action}
                              className={`
                                px-3 py-1 rounded text-xs font-medium transition-colors
                                ${action.variant === 'primary' 
                                  ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }
                              `}
                            >
                              {action.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => dismissMessage(message.id)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Analysis Summary */}
          {analysis && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{analysis.stackCompleteness}%</div>
                  <div className="text-xs text-gray-500">Stack Complete</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">${analysis.costOptimization}</div>
                  <div className="text-xs text-gray-500">Potential Savings</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{analysis.recommendations.length}</div>
                  <div className="text-xs text-gray-500">Recommendations</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
