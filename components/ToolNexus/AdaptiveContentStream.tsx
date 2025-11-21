// components/ToolNexus/AdaptiveContentStream.tsx
import { useState, useEffect, useMemo } from 'react';
import { 
  AdaptiveContentStreamProps,
  IntelligentSectionProps,
  UserPersona,
  ToolNexus
} from '../../types/tool-nexus';

// Persona-based content priority calculator
const calculateContentPriorities = (persona: UserPersona, tool: ToolNexus) => {
  const priorities: Record<string, number> = {
    // Base priorities
    'feature_explorer': 7,
    'pricing_intelligence': 6,
    'implementation_simulator': 5,
    'community_consciousness': 4,
    'adoption_radar': 4,
    'review_intelligence': 3,
    'comparison_portal': 5,
    'api_playground': 3,
    'template_gallery': 3,
    'roadmap_explorer': 2
  };

  // Adjust based on persona
  switch (persona.primary_persona) {
    case 'developer':
      priorities.api_playground = 9;
      priorities.feature_explorer = 8;
      priorities.implementation_simulator = 7;
      priorities.template_gallery = 6;
      priorities.pricing_intelligence = 4;
      break;
    
    case 'designer':
      priorities.feature_explorer = 9;
      priorities.template_gallery = 8;
      priorities.implementation_simulator = 6;
      priorities.review_intelligence = 5;
      priorities.api_playground = 2;
      break;
    
    case 'executive':
      priorities.pricing_intelligence = 9;
      priorities.adoption_radar = 8;
      priorities.review_intelligence = 7;
      priorities.implementation_simulator = 6;
      priorities.feature_explorer = 4;
      break;
    
    case 'team_lead':
      priorities.implementation_simulator = 9;
      priorities.pricing_intelligence = 8;
      priorities.adoption_radar = 7;
      priorities.community_consciousness = 6;
      priorities.feature_explorer = 5;
      break;
    
    case 'freelancer':
      priorities.pricing_intelligence = 9;
      priorities.feature_explorer = 8;
      priorities.review_intelligence = 7;
      priorities.template_gallery = 6;
      priorities.implementation_simulator = 5;
      break;
    
    case 'student':
      priorities.feature_explorer = 9;
      priorities.template_gallery = 8;
      priorities.implementation_simulator = 5;
      priorities.review_intelligence = 4;
      priorities.pricing_intelligence = 3;
      break;
  }

  // Adjust based on company size
  if (persona.company_size === 'enterprise') {
    priorities.pricing_intelligence += 2;
    priorities.implementation_simulator += 2;
    priorities.adoption_radar += 1;
  } else if (persona.company_size === 'solo' || persona.company_size === 'small') {
    priorities.pricing_intelligence += 1;
    priorities.template_gallery += 1;
  }

  // Adjust based on technical expertise
  if (persona.technical_expertise >= 7) {
    priorities.api_playground += 2;
    priorities.implementation_simulator += 1;
  } else if (persona.technical_expertise <= 3) {
    priorities.feature_explorer += 2;
    priorities.template_gallery += 2;
    priorities.implementation_simulator -= 1;
  }

  // Adjust based on budget sensitivity
  if (persona.budget_sensitivity >= 7) {
    priorities.pricing_intelligence += 2;
    priorities.review_intelligence += 1;
  }

  return priorities;
};

// Section definitions
const createSections = (tool: ToolNexus, priorities: Record<string, number>) => {
  const sections = [
    {
      id: 'feature_explorer',
      title: 'Interactive Feature Explorer',
      component: 'FeatureExplorer',
      priority: priorities.feature_explorer || 5,
      estimated_time: 15,
      description: 'Experience features through interactive demos and sandbox environments',
      icon: '🚀'
    },
    {
      id: 'pricing_intelligence',
      title: 'Pricing Intelligence Engine',
      component: 'PricingIntelligence',
      priority: priorities.pricing_intelligence || 5,
      estimated_time: 10,
      description: 'Multi-dimensional cost analysis with ROI calculations and scenario modeling',
      icon: '💰'
    },
    {
      id: 'implementation_simulator',
      title: 'Implementation Simulator',
      component: 'ImplementationSimulator',
      priority: priorities.implementation_simulator || 5,
      estimated_time: 20,
      description: 'Preview setup process and test configuration options in real-time',
      icon: '⚙️'
    },
    {
      id: 'community_consciousness',
      title: 'Community Consciousness',
      component: 'CommunityConsciousness',
      priority: priorities.community_consciousness || 5,
      estimated_time: 8,
      description: 'Live sentiment analysis and user insights from the community',
      icon: '👥'
    },
    {
      id: 'adoption_radar',
      title: 'Adoption Radar',
      component: 'AdoptionRadar',
      priority: priorities.adoption_radar || 5,
      estimated_time: 12,
      description: 'Market position visualization and growth trajectory analysis',
      icon: '📊'
    },
    {
      id: 'review_intelligence',
      title: 'Review Intelligence',
      component: 'ReviewIntelligence',
      priority: priorities.review_intelligence || 5,
      estimated_time: 10,
      description: 'AI-powered review analysis with authenticity scoring',
      icon: '⭐'
    },
    {
      id: 'comparison_portal',
      title: 'Comparison Portal',
      component: 'ComparisonPortal',
      priority: priorities.comparison_portal || 5,
      estimated_time: 15,
      description: 'Side-by-side analysis with alternative tools',
      icon: '⚖️'
    },
    {
      id: 'api_playground',
      title: 'API Playground',
      component: 'APIPlayground',
      priority: priorities.api_playground || 5,
      estimated_time: 25,
      description: 'Interactive API testing with live code execution',
      icon: '🔧'
    },
    {
      id: 'template_gallery',
      title: 'Template Gallery',
      component: 'TemplateGallery',
      priority: priorities.template_gallery || 5,
      estimated_time: 12,
      description: 'Browse and instantly copy templates with AI suggestions',
      icon: '📋'
    },
    {
      id: 'roadmap_explorer',
      title: 'Roadmap Explorer',
      component: 'RoadmapExplorer',
      priority: priorities.roadmap_explorer || 5,
      estimated_time: 8,
      description: 'Interactive product roadmap with voting and feedback',
      icon: '🗺️'
    }
  ];

  // Filter sections based on tool's interactive zones
  const availableSections = sections.filter(section => {
    if (section.id === 'api_playground') return tool.interactive_zones.api_playground;
    if (section.id === 'implementation_simulator') return tool.interactive_zones.implementation_simulator;
    if (section.id === 'comparison_portal') return tool.interactive_zones.comparison_portal;
    if (section.id === 'template_gallery') return tool.interactive_zones.template_gallery;
    if (section.id === 'roadmap_explorer') return tool.interactive_zones.roadmap_explorer;
    return true; // Always include core sections
  });

  // Sort by priority
  return availableSections.sort((a, b) => b.priority - a.priority);
};

// Intelligent Section Navigator
const IntelligentSectionNavigator: React.FC<{
  sections: any[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  completionStatus: Record<string, number>;
  userPersona: UserPersona;
}> = ({ sections, activeSection, onSectionChange, completionStatus, userPersona }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const getSectionLabel = (section: any) => {
    // Adapt labels based on user expertise
    if (userPersona.expertise_level === 'beginner') {
      if (section.id === 'api_playground') return 'API Basics';
      if (section.id === 'implementation_simulator') return 'Getting Started';
    } else if (userPersona.expertise_level === 'expert') {
      if (section.id === 'api_playground') return 'Advanced API';
      if (section.id === 'feature_explorer') return 'Deep Dive';
    }
    return section.title;
  };

  const getCompletionColor = (completion: number) => {
    if (completion >= 80) return 'bg-green-500';
    if (completion >= 50) return 'bg-yellow-500';
    if (completion >= 20) return 'bg-blue-500';
    return 'bg-gray-500';
  };

  return (
    <div className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Intelligent Navigator</h3>
      
      <div className="space-y-2">
        {sections.map((section) => {
          const completion = completionStatus[section.id] || 0;
          const isActive = activeSection === section.id;
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <div key={section.id} className="border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => {
                  onSectionChange(section.id);
                  if (!expandedSections.includes(section.id)) {
                    setExpandedSections([...expandedSections, section.id]);
                  }
                }}
                className={`w-full px-4 py-3 text-left transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{section.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{getSectionLabel(section)}</div>
                    <div className="text-xs text-white/50">
                      {section.estimated_time} min • Priority: {section.priority}/10
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {completion > 0 && (
                      <div className={`w-2 h-2 rounded-full ${getCompletionColor(completion)}`} />
                    )}
                    <div className="text-xs text-white/50">
                      {completion}%
                    </div>
                  </div>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-4 py-3 bg-black/20 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-2">{section.description}</p>
                  {completion > 0 && (
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getCompletionColor(completion)}`}
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Persona Indicator */}
      <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-white/70">Your Profile:</span>
        </div>
        <div className="text-xs text-white/50 space-y-1">
          <div>• {userPersona.primary_persona}</div>
          <div>• {userPersona.company_size} company</div>
          <div>• Expertise: {userPersona.expertise_level}</div>
        </div>
      </div>
    </div>
  );
};

// Living Documentation System
const LivingDocumentation: React.FC<{
  tool: ToolNexus;
  activeSection: string;
  userPersona: UserPersona;
  onSectionComplete: (sectionId: string, completion: number) => void;
}> = ({ tool, activeSection, userPersona, onSectionComplete }) => {
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'feature_explorer':
        return <FeatureExplorer tool={tool} userPersona={userPersona} onComplete={(completion) => {
          setSectionProgress(prev => ({ ...prev, [activeSection]: completion }));
          onSectionComplete(activeSection, completion);
        }} />;
      case 'pricing_intelligence':
        return <PricingIntelligence engine={tool.intelligence_modules.pricing_engine} userPersona={userPersona} />;
      case 'implementation_simulator':
        return <ImplementationSimulator simulator={tool.intelligence_modules.implementation_simulator} userPersona={userPersona} />;
      case 'community_consciousness':
        return <CommunityConsciousness consciousness={tool.intelligence_modules.community_consciousness} userPersona={userPersona} />;
      case 'adoption_radar':
        return <AdoptionRadar radar={tool.intelligence_modules.adoption_radar} />;
      case 'review_intelligence':
        return <ReviewIntelligence reviews={tool.intelligence_modules.review_intelligence} userPersona={userPersona} />;
      case 'comparison_portal':
        return <ComparisonPortal tool={tool} userPersona={userPersona} />;
      case 'api_playground':
        return <APIPlayground tool={tool} userPersona={userPersona} />;
      case 'template_gallery':
        return <TemplateGallery tool={tool} userPersona={userPersona} />;
      case 'roadmap_explorer':
        return <RoadmapExplorer tool={tool} />;
      default:
        return <FeatureExplorer tool={tool} userPersona={userPersona} onComplete={(completion) => {
          setSectionProgress(prev => ({ ...prev, [activeSection]: completion }));
          onSectionComplete(activeSection, completion);
        }} />;
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {renderActiveSection()}
    </div>
  );
};

// Individual Section Components (placeholders for now)
const FeatureExplorer: React.FC<{
  tool: ToolNexus;
  userPersona: UserPersona;
  onComplete: (completion: number) => void;
}> = ({ tool, userPersona, onComplete }) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [progress, setProgress] = useState(0);

  const features = [
    { name: 'AI-Powered Analysis', description: 'Advanced machine learning algorithms', demo: 'ai_demo' },
    { name: 'Real-time Collaboration', description: 'Work together with your team instantly', demo: 'collab_demo' },
    { name: 'Advanced Analytics', description: 'Deep insights and reporting', demo: 'analytics_demo' },
    { name: 'Custom Workflows', description: 'Tailor the tool to your needs', demo: 'workflow_demo' }
  ];

  useEffect(() => {
    const newProgress = ((activeFeature + 1) / features.length) * 100;
    setProgress(newProgress);
    onComplete(newProgress);
  }, [activeFeature, features.length, onComplete]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Interactive Feature Explorer</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`w-full p-4 rounded-lg border transition-all duration-200 text-left ${
                activeFeature === index
                  ? 'bg-white/20 border-white/30 text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <h3 className="font-semibold mb-1">{feature.name}</h3>
              <p className="text-sm text-white/60">{feature.description}</p>
            </button>
          ))}
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="aspect-video bg-black/30 rounded-lg flex items-center justify-center mb-4">
            <div className="text-center text-white/50">
              <div className="text-4xl mb-2">🎬</div>
              <div>Interactive Demo: {features[activeFeature].name}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/70">Progress</span>
            <span className="text-sm text-white">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingIntelligence: React.FC<{
  engine: any;
  userPersona: UserPersona;
}> = ({ engine, userPersona }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Pricing Intelligence Engine</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Pricing analysis coming soon...</div>
      </div>
    </div>
  );
};

const ImplementationSimulator: React.FC<{
  simulator: any;
  userPersona: UserPersona;
}> = ({ simulator, userPersona }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Implementation Simulator</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Implementation simulator coming soon...</div>
      </div>
    </div>
  );
};

const CommunityConsciousness: React.FC<{
  consciousness: any;
  userPersona: UserPersona;
}> = ({ consciousness, userPersona }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Community Consciousness</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Community insights coming soon...</div>
      </div>
    </div>
  );
};

const AdoptionRadar: React.FC<{ radar: any }> = ({ radar }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Adoption Radar</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Market analysis coming soon...</div>
      </div>
    </div>
  );
};

const ReviewIntelligence: React.FC<{
  reviews: any;
  userPersona: UserPersona;
}> = ({ reviews, userPersona }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Review Intelligence</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Review analysis coming soon...</div>
      </div>
    </div>
  );
};

const ComparisonPortal: React.FC<{
  tool: ToolNexus;
  userPersona: UserPersona;
}> = ({ tool, userPersona }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Comparison Portal</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Comparison tools coming soon...</div>
      </div>
    </div>
  );
};

const APIPlayground: React.FC<{
  tool: ToolNexus;
  userPersona: UserPersona;
}> = ({ tool, userPersona }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">API Playground</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">API playground coming soon...</div>
      </div>
    </div>
  );
};

const TemplateGallery: React.FC<{
  tool: ToolNexus;
  userPersona: UserPersona;
}> = ({ tool, userPersona }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Template Gallery</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Template gallery coming soon...</div>
      </div>
    </div>
  );
};

const RoadmapExplorer: React.FC<{ tool: ToolNexus }> = ({ tool }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-6">Roadmap Explorer</h2>
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <div className="text-white/70">Roadmap coming soon...</div>
      </div>
    </div>
  );
};

export const AdaptiveContentStream: React.FC<AdaptiveContentStreamProps> = ({
  tool,
  userPersona,
  onSectionComplete
}) => {
  const [activeSection, setActiveSection] = useState('feature_explorer');
  const [completionStatus, setCompletionStatus] = useState<Record<string, number>>({});

  // Calculate content priorities based on persona
  const contentPriorities = useMemo(() => 
    calculateContentPriorities(userPersona, tool),
    [userPersona, tool]
  );

  // Create sections based on priorities
  const sections = useMemo(() => 
    createSections(tool, contentPriorities),
    [tool, contentPriorities]
  );

  // Set initial active section to highest priority
  useEffect(() => {
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0].id);
    }
  }, [sections, activeSection]);

  const handleSectionComplete = (sectionId: string, completion: number) => {
    setCompletionStatus(prev => ({ ...prev, [sectionId]: completion }));
    onSectionComplete(sectionId, completion);
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-black/20">
      {/* Intelligent Section Navigator */}
      <IntelligentSectionNavigator
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        completionStatus={completionStatus}
        userPersona={userPersona}
      />
      
      {/* Living Documentation */}
      <LivingDocumentation
        tool={tool}
        activeSection={activeSection}
        userPersona={userPersona}
        onSectionComplete={handleSectionComplete}
      />
    </div>
  );
};

export default AdaptiveContentStream;
