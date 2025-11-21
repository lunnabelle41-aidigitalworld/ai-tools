// components/Sanctuary/SanctuaryExperience.tsx
'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '../../hooks/useFavorites';
import UniverseCanvas from './UniverseCanvas';
import FocusCrystal from './FocusCrystal';
import DigitalGardener from './DigitalGardener';
import TemporalView from './TemporalView';

type FocusMode = 'exploration' | 'analysis' | 'presentation' | 'zen';
type CollectionMood = 'productive' | 'creative' | 'research';

interface SanctuarySettings {
  mood: CollectionMood;
  focusMode: FocusMode;
  orbStyle: 'crystal' | 'sphere' | 'minimal';
  animationIntensity: number;
  soundEnabled: boolean;
}

export default function SanctuaryExperience() {
  const { favorites } = useFavorites();
  const [settings, setSettings] = useState<SanctuarySettings>({
    mood: 'productive',
    focusMode: 'exploration',
    orbStyle: 'crystal',
    animationIntensity: 0.7,
    soundEnabled: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  // Detect collection mood based on tool composition
  const detectCollectionMood = (): CollectionMood => {
    if (favorites.length === 0) return 'productive';
    
    // In a real implementation, this would analyze the actual tools
    const aiTools = favorites.filter(() => Math.random() > 0.6).length;
    const designTools = favorites.filter(() => Math.random() > 0.7).length;
    const devTools = favorites.filter(() => Math.random() > 0.5).length;
    
    if (aiTools > designTools && aiTools > devTools) return 'research';
    if (designTools > aiTools && designTools > devTools) return 'creative';
    return 'productive';
  };

  // Auto-detect mood when collection changes
  useEffect(() => {
    const detectedMood = detectCollectionMood();
    setSettings(prev => ({ ...prev, mood: detectedMood }));
  }, [favorites]);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (favorites.length === 0) {
        setShowWelcome(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [favorites]);

  // Loading screen
  if (isLoading) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Generating Your Universe</h2>
          <p className="text-purple-200">Creating your personal digital sanctuary...</p>
        </div>
      </div>
    );
  }

  // Welcome overlay for new users
  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 max-w-2xl w-full p-8 text-white">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Welcome to Your Sanctuary</h1>
            <p className="text-purple-200 mb-8">
              Your personal digital universe awaits. This is where your favorite tools become living stars in your constellation of productivity.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Explore Your Universe</h3>
                <p className="text-sm text-purple-200">Navigate your 3D space and watch your tools orbit in beautiful constellations</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Meet Your Digital Gardener</h3>
                <p className="text-sm text-purple-200">Your AI assistant will help optimize and organize your collection</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Travel Through Time</h3>
                <p className="text-sm text-purple-200">Watch your sanctuary evolve and grow over time</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowWelcome(false)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-medium"
            >
              Enter Sanctuary
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all font-medium"
            >
              Explore Tools First
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 3D Universe Canvas */}
      <UniverseCanvas />
      
      {/* Focus Crystal - Central Control */}
      <FocusCrystal />
      
      {/* Digital Gardener AI Assistant */}
      <DigitalGardener />
      
      {/* Temporal View - Timeline Navigation */}
      <TemporalView />
      
      {/* Settings Panel */}
      <div className="fixed top-4 right-4 z-30">
        <button
          onClick={() => {/* Open settings */}}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Focus Mode Indicator */}
      <div className="fixed top-4 left-4 z-30">
        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 px-4 py-2 text-white">
          <div className="flex items-center gap-2">
            <div className={`
              w-2 h-2 rounded-full
              ${settings.focusMode === 'exploration' ? 'bg-blue-400' : ''}
              ${settings.focusMode === 'analysis' ? 'bg-purple-400' : ''}
              ${settings.focusMode === 'presentation' ? 'bg-green-400' : ''}
              ${settings.focusMode === 'zen' ? 'bg-gray-400' : ''}
            `} />
            <span className="text-sm font-medium capitalize">{settings.focusMode} Mode</span>
          </div>
        </div>
      </div>

      {/* Collection Mood Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 px-6 py-2 text-white">
          <div className="flex items-center gap-2">
            <span className="text-sm capitalize">{settings.mood} Atmosphere</span>
            <div className="flex gap-1">
              {['productive', 'creative', 'research'].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSettings(prev => ({ ...prev, mood: mood as CollectionMood }))}
                  className={`
                    w-2 h-2 rounded-full transition-all
                    ${settings.mood === mood ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent' : ''}
                    ${mood === 'productive' ? 'bg-blue-400' : ''}
                    ${mood === 'creative' ? 'bg-pink-400' : ''}
                    ${mood === 'research' ? 'bg-cyan-400' : ''}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={() => {/* Show shortcuts */}}
          className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          title="Keyboard Shortcuts (Press ?)"
        >
          <span className="text-sm font-medium">?</span>
        </button>
      </div>
    </div>
  );
}
