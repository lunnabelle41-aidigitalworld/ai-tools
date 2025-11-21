// pages/ToolPage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToolNexus, UserPersona } from '../types/tool-nexus';
import { VectorCanvas } from '../components/UI/VectorCanvas';
import SVGIcon, { IconNames } from '../components/UI/SVGIcon';
import CSSHeroSection from '../components/UI/CSSHeroSection';
import InitialAvatar from '../components/UI/InitialAvatar';
import CodePlayground from '../components/UI/CodePlayground';

type IconName = keyof typeof IconNames;

interface ToolPageProps {
  toolId: string;
}

// Mock data generation functions
const generateMockTool = (toolId: string): ToolNexus => {
  const isFigma = toolId === 'figma';
  const isNotion = toolId === 'notion';
  
  return {
    tool_id: toolId,
    name: isFigma ? 'Figma' : isNotion ? 'Notion' : 'GitHub Copilot',
    category: isFigma ? 'Design' : isNotion ? 'Productivity' : 'Development',
    description: `Advanced ${isFigma ? 'collaborative design' : isNotion ? 'workspace management' : 'AI-powered coding'} platform`,
    version: '3.2.1',
    developer: isFigma ? 'Figma Inc.' : isNotion ? 'Notion Labs' : 'GitHub',
    icon: isFigma ? 'figma' : isNotion ? 'notion' : 'github',
    color: isFigma ? '#F24E1E' : isNotion ? '#000000' : '#4078C0',
    pricing: {
      free_tier: {
        available: true,
        features: ['Basic features', 'Limited storage', 'Community support'],
        limitations: ['3 projects', '2GB storage']
      },
      tiers: [
        {
          name: 'Starter',
          price: 12,
          billing_cycle: 'monthly',
          features: ['Advanced features', 'Unlimited projects', 'Priority support'],
          most_popular: true
        },
        {
          name: 'Professional',
          price: 25,
          billing_cycle: 'monthly',
          features: ['All features', 'Advanced analytics', 'Dedicated support', 'API access'],
          most_popular: false
        },
        {
          name: 'Enterprise',
          price: 49,
          billing_cycle: 'monthly',
          features: ['Custom solutions', 'SLA guarantee', 'White-label options', 'Advanced security'],
          most_popular: false
        }
      ],
      currency: 'USD',
      billing_options: {
        monthly: true,
        annual: true,
        enterprise: true
      }
    },
    adoption_metrics: {
      market_share: isFigma ? 0.34 : isNotion ? 0.28 : 0.45,
      growth_rate: 0.23,
      user_satisfaction: 4.6,
      competitor_comparison: [
        { name: 'Sketch', market_share: 0.12, growth_rate: -0.05 },
        { name: 'Adobe XD', market_share: 0.18, growth_rate: 0.08 },
        { name: 'Canva', market_share: 0.28, growth_rate: 0.31 }
      ],
      industry_adoption: {
        'Tech': 0.67,
        'Design': 0.82,
        'Education': 0.45,
        'Finance': 0.38,
        'Healthcare': 0.29
      }
    },
    features: [
      {
        id: 'feat-1',
        name: 'Real-time Collaboration',
        description: 'Work together with your team in real-time',
        icon: 'users',
        status: 'popular'
      },
      {
        id: 'feat-2',
        name: 'Version History',
        description: 'Track changes and revert to previous versions',
        icon: 'history',
        status: 'new'
      },
      {
        id: 'feat-3',
        name: 'Plugins & Integrations',
        description: 'Extend functionality with a rich ecosystem of plugins',
        icon: 'puzzle',
        status: 'popular'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Alex Johnson',
        role: 'Product Designer',
        company: 'DesignCo',
        rating: 5,
        content: 'This tool has completely transformed our design workflow. The collaboration features are unmatched.',
        date: '2023-10-15',
        likes: 24,
        verified: true,
        version_used: '3.2.0',
        pros: ['Great collaboration', 'Intuitive interface'],
        cons: ['Steep learning curve']
      },
      {
        id: 'rev-2',
        author: 'Sam Wilson',
        role: 'Frontend Developer',
        company: 'DevTeam Inc',
        rating: 4,
        content: 'Great for developer handoff. The code export is clean and well-structured.',
        date: '2023-11-02',
        likes: 12,
        verified: true,
        version_used: '3.1.5',
        pros: ['Clean code export', 'Good API'],
        cons: ['Documentation could be better']
      }
    ],
    // Add required interfaces with mock data
    immersive_data: {
      visual_seed: 'design-tool',
      color_palette: ['#F24E1E', '#FF7262', '#A259FF', '#1ABCFE', '#0ACF83'],
      background_animation: 'neural_network',
      interactive_elements: ['code_editor', 'design_canvas'],
      tool_aura: {
        primary_color: '#F24E1E',
        secondary_color: '#1ABCFE',
        intensity: 0.8
      },
      contextual_particles: [
        {
          id: 'part-1',
          type: 'api_icon',
          position: { x: 10, y: 20, z: 5 },
          animation: 'float',
          metadata: { name: 'API' }
        }
      ]
    },
    intelligence_modules: {
      // Add required sub-interfaces with mock data
      pricing_engine: {
        scenarios: [],
        hidden_costs: [],
        roi_calculators: [],
        price_history: [],
        competitive_analysis: []
      },
      adoption_radar: {
        current_users: 10000,
        growth_rate: 0.23,
        user_segments: [],
        adoption_barriers: [],
        adoption_drivers: [],
        market_penetration: 0.5,
        competitor_adoption: [],
        industry_adoption: {},
        user_retention_rate: 0.85,
        feature_adoption: {},
        nps_score: 8.2,
        churn_rate: 0.05,
        expansion_rate: 0.15,
        sentiment_analysis: {
          positive: 0.7,
          neutral: 0.2,
          negative: 0.1
        }
      },
      community_consciousness: {
        sentiment_trend: 'improving',
        key_themes: {},
        expert_opinions: [],
        user_stories: [],
        social_mentions: [],
        support_forum_analysis: {
          response_time_avg: 2.5,
          resolution_rate: 0.9,
          common_issues: [],
          community_helpfulness: 0.8
        }
      },
      review_intelligence: {
        reviews: [],
        sentiment_analysis: {
          overall_sentiment: 'positive',
          sentiment_score: 0.85,
          positive_keywords: [],
          negative_keywords: [],
          neutral_keywords: [],
          sentiment_distribution: {
            positive: 0.7,
            neutral: 0.2,
            negative: 0.1
          }
        },
        topic_analysis: {
          topics: [],
          topic_trends: [],
          emerging_topics: [],
          declining_topics: []
        },
        summary: {
          overall_rating: 4.5,
          total_reviews: 100,
          rating_distribution: [5, 10, 20, 40, 25],
          sentiment_score: 0.85,
          review_trend: 'increasing',
          key_insights: [],
          top_positive_themes: [],
          top_negative_themes: []
        },
        review_clusters: [],
        authenticity_scores: [],
        contextual_insights: [],
        video_reviews: [],
        review_trends: []
      },
      implementation_simulator: {
        setup_steps: [],
        workflow_integrations: [],
        onboarding_steps: [],
        customization_options: [],
        migration_complexity: {
          complexity_score: 0.5,
          estimated_time: 10,
          required_resources: [],
          potential_roadblocks: [],
          cost_estimate: 5000
        }
      }
    },
    interactive_zones: {
      api_playground: true,
      comparison_portal: true,
      template_gallery: true,
      roadmap_explorer: true,
      implementation_simulator: false,
      feature_sandbox: true
    },
    real_time_data: {
      tool_id: 'figma',
      last_updated: new Date(),
      connections: [
        {
          connection_id: 'conn-1',
          status: 'connected',
          last_activity: new Date(),
          message_count: 42,
          error_count: 2
        }
      ],
      data_streams: {
        performance_metrics: [
          { timestamp: new Date(), value: 95, metadata: { metric: 'cpu', unit: '%' }, source: 'system' },
          { timestamp: new Date(), value: 45, metadata: { metric: 'memory', unit: '%' }, source: 'system' }
        ],
        user_activity: [
          { timestamp: new Date(), value: 1, metadata: { action: 'login', user: 'user123' }, source: 'auth' },
          { timestamp: new Date(), value: 1, metadata: { action: 'document_edit', user: 'user123' }, source: 'editor' }
        ],
        system_health: [
          { timestamp: new Date(), value: 'operational', metadata: { component: 'api' }, source: 'monitoring' },
          { timestamp: new Date(), value: 'operational', metadata: { component: 'database' }, source: 'monitoring' }
        ],
        pricing_updates: [],
        feature_usage: [
          { timestamp: new Date(), value: 1, metadata: { feature: 'real_time_collaboration', user: 'user123' }, source: 'analytics' }
        ],
        error_tracking: []
      },
      alerts: [
        {
          id: 'alert-1',
          type: 'info',
          severity: 'low',
          title: 'New feature available',
          message: 'Check out our latest update!',
          timestamp: new Date(),
          acknowledged: false
        }
      ],
      processing_queue: [],
      cache_status: {
        size: 2500000,
        hit_rate: 0.95,
        last_cleanup: new Date()
      },
      live_metrics: {
        current_visitors: 1250,
        trial_starters_today: 42,
        active_users: 8500,
        api_calls_per_minute: 1250,
        server_response_time: 120,
        uptime_percentage: 99.99
      },
      recent_activity: [
        {
          activity_id: 'act-1',
          type: 'feature_used',
          description: 'User completed onboarding',
          timestamp: new Date().toISOString(),
          visibility: 'public',
          metadata: { user_id: 'user123', feature: 'onboarding' }
        },
        {
          activity_id: 'act-2',
          type: 'trial_started',
          description: 'New trial started',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          visibility: 'semi_public',
          metadata: { user_id: 'user456', plan: 'pro' }
        }
      ],
      system_status: {
        overall_status: 'operational',
        services: [
          {
            service_name: 'API',
            status: 'operational',
            response_time: 120,
            error_rate: 0.01
          },
          {
            service_name: 'Database',
            status: 'operational',
            response_time: 45,
            error_rate: 0.005
          }
        ],
        last_updated: new Date().toISOString()
      },
      trending_indicators: [
        {
          indicator_id: 'trend-1',
          type: 'social_trend',
          title: 'Feature X trending on Twitter',
          value: '+24%',
          change: 24,
          timeframe: '24h',
          source: 'twitter'
        },
        {
          indicator_id: 'trend-2',
          type: 'github_activity',
          title: 'GitHub stars increasing',
          value: '1.2k',
          change: 5,
          timeframe: '7d',
          source: 'github'
        }
      ]
    },
    personalization: {
      user_persona: {
        id: 'user-123',
        user_id: 'user-123',
        primary_persona: 'designer',
        secondary_persona: 'team_lead',
        name: 'Taylor Smith',
        role: 'Senior Product Designer',
        company: 'TechCorp',
        company_size: 'enterprise',
        industry: 'SaaS',
        technical_expertise: 8.5,
        budget_sensitivity: 6,
        expertise_level: 'expert',
        experience_level: 'expert',
        team_size: 30,
        tools: ['Figma', 'Sketch', 'Adobe XD'],
        goals: ['Improve design workflow', 'Enhance team collaboration', 'Streamline handoff'],
        pain_points: ['Version control', 'Real-time collaboration', 'Design system management'],
        created_at: new Date('2023-01-15').toISOString()
      },
      content_priorities: [
        {
          section_id: 'design-system',
          priority: 9,
          reasoning: 'Critical for maintaining design consistency across products'
        },
        {
          section_id: 'prototyping',
          priority: 8,
          reasoning: 'Essential for rapid iteration and user testing'
        },
        {
          section_id: 'collaboration',
          priority: 7,
          reasoning: 'Important for team workflows and handoffs'
        }
      ],
      section_completion: {
        'getting-started': 100,
        'design-system': 75,
        'prototyping': 50,
        'collaboration': 25
      }
    },
    review_intelligence: {
      reviews: [],
      sentiment_analysis: {
        overall_sentiment: 'positive',
        sentiment_score: 0.0,
        positive_keywords: [],
        negative_keywords: [],
        neutral_keywords: [],
        sentiment_distribution: {
          positive: 0.0,
          neutral: 0.0,
          negative: 0.0
        }
      },
      topic_analysis: {
        topics: [],
        topic_trends: [],
        emerging_topics: [],
        declining_topics: []
      },
      summary: {
        overall_rating: 0,
        total_reviews: 0,
        rating_distribution: [0, 0, 0, 0, 0],
        sentiment_score: 0,
        review_trend: 'stable',
        key_insights: [],
        top_positive_themes: [],
        top_negative_themes: []
      },
      review_clusters: [],
      authenticity_scores: [],
      contextual_insights: [],
      video_reviews: [],
      review_trends: []
    }
  };
};

const generateMockPersona = (): UserPersona => ({
  id: 'user-123',
  user_id: 'user-123',
  primary_persona: 'designer',
  secondary_persona: 'team_lead',
  company_size: 'enterprise',
  industry: 'SaaS',
  technical_expertise: 8.5,
  budget_sensitivity: 6,
  name: 'Taylor Smith',
  role: 'Senior Product Designer',
  company: 'TechCorp',
  expertise_level: 'expert',
  experience_level: 'expert',
  team_size: 30,
  tools: ['Figma', 'Sketch', 'Adobe XD'],
  goals: ['Improve design workflow', 'Enhance team collaboration', 'Streamline handoff'],
  pain_points: ['Version control', 'Real-time collaboration', 'Design system management'],
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      push: false,
      in_app: true
    },
    language: 'en-US',
    timezone: 'America/New_York',
    accessibility: {
      high_contrast: false,
      text_size: 'medium',
      reduce_animations: false
    }
  },
  behavior_patterns: [{
    last_active: new Date().toISOString(),
    feature_usage: {
      'real-time-collaboration': 45,
      'version-history': 23,
      'plugins': 12
    },
    preferred_features: ['real-time-collaboration', 'version-history'],
    common_workflows: ['design-review', 'prototype-iteration'],
    interaction_patterns: {
      time_spent: {
        'design-editor': 120,
        'prototype-builder': 85,
        'assets-library': 45
      },
      frequent_actions: ['save-version', 'share-link', 'add-comment']
    }
  }],
  engagement_metrics: {
    views: 1250,
    likes: 420,
    comments: 87,
    shares: 56,
    watch_time_avg: 8.5
  },
  feedback: [
    {
      id: 'fb-1',
      type: 'feature',
      content: 'Would love to see more advanced prototyping features',
      status: 'new',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  learning_style: 'visual',
  preferred_features: ['real-time-collaboration', 'version-control'],
  usage_frequency: 'daily',
  avatar_color: '#4F46E5',
  created_at: '2023-01-15T10:30:00Z',
  updated_at: new Date().toISOString()
});

const ToolPage: React.FC<ToolPageProps> = ({ toolId }) => {
  const [tool, setTool] = useState<ToolNexus | null>(null);
  const [userPersona, setUserPersona] = useState<UserPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pricing' | 'reviews'>('overview');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTool(generateMockTool(toolId));
      setUserPersona(generateMockPersona());
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [toolId]);

  if (loading || !tool || !userPersona) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading tool data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Vector Background */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <VectorCanvas 
          config={{ 
            fov: 60, 
            position: [0, 0, 5],
            autoRotate: true,
            rotationSpeed: 0.5,
            backgroundColor: 'transparent'
          }}
          className="absolute inset-0 z-0"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <mesh>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshStandardMaterial 
              color={tool.color} 
              roughness={0.1} 
              metalness={0.8} 
              wireframe 
            />
          </mesh>
        </VectorCanvas>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10" />

        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-4xl">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white backdrop-blur-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
              {tool.category} Tool
            </span>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              {tool.name}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              {tool.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Get Started
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 -mt-20 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Navigation Tabs */}
          <nav className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {['overview', 'features', 'pricing', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-4 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </nav>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && <OverviewTab tool={tool} />}
                {activeTab === 'features' && <FeaturesTab tool={tool} />}
                {activeTab === 'pricing' && <PricingTab tool={tool} />}
                {activeTab === 'reviews' && <ReviewsTab tool={tool} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* User Persona Card */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Perfect for {userPersona.role}s</h3>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <InitialAvatar name={userPersona.name} size={80} className="ring-4 ring-white/20" />
            <div>
              <h4 className="text-xl font-semibold">{userPersona.name}</h4>
              <p className="text-blue-100 mb-3">{userPersona.role} at {userPersona.company}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {userPersona.goals.map((goal, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    {goal}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab Components
const OverviewTab: React.FC<{ tool: ToolNexus }> = ({ tool }) => {
  const codeExample = `// Example usage of ${tool.name} API\nconst ${tool.name.toLowerCase().replace(/\\s+/g, '')} = new ${tool.name.replace(/\\s+/g, '')}Client({\n  apiKey: 'your-api-key',\n  environment: 'production'\n});\n\n// Make a request\nconst response = await ${tool.name.toLowerCase().replace(/\\s+/g, '')}.getData({\n  query: 'example',\n  limit: 10\n});`;

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                <SVGIcon name="check" size={24} />
              </div>
              <span>Real-time collaboration with your team</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                <SVGIcon name="check" size={24} />
              </div>
              <span>Intuitive interface with powerful features</span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-3">
                <SVGIcon name="check" size={24} />
              </div>
              <span>Seamless integration with your favorite tools</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>User Satisfaction</span>
              <span className="font-medium">
                {tool.adoption_metrics ? tool.adoption_metrics.user_satisfaction.toFixed(1) + '/5' : 'N/A'}
              </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ 
                    width: `${tool.adoption_metrics ? (tool.adoption_metrics.user_satisfaction / 5) * 100 : 0}%` 
                  }} 
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Market Adoption</span>
              <span className="font-medium">
                {tool.adoption_metrics ? (tool.adoption_metrics.market_share * 100).toFixed(1) + '%' : 'N/A'}
              </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ 
                    width: `${tool.adoption_metrics ? Math.round((tool.adoption_metrics.market_share || 0) * 100) : 0}%` 
                  }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Code Example</h3>
        <CodePlayground
          code={codeExample}
          language="typescript"
          height="300px"
          showRunButton={false}
          showCopyButton={true}
          theme="vs-dark"
          className="rounded-lg overflow-hidden border border-gray-200"
        />
      </div>
    </div>
  );
};

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  status?: string;
}

const FeaturesTab: React.FC<{ tool: ToolNexus }> = ({ tool }) => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tool.features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            whileHover={{ y: -5 }}
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${tool.color}10` }}
            >
              <SVGIcon 
                name={feature.icon} 
                size={24} 
                color={tool.color} 
              />
            </div>
            <h4 className="text-lg font-semibold mb-2">{feature.name}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PricingTab: React.FC<{ tool: ToolNexus }> = ({ tool }) => {
  const plans = Object.entries(tool.pricing).filter(([key]) => key !== 'free_tier');
  
  return (
    <div className="space-y-8">
      {/* Free Tier */}
      {tool.pricing.free_tier.available && (
        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Free Plan</h3>
              <p className="text-gray-600 mt-1">Perfect for individuals getting started</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-gray-500">/month</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">What's included:</h4>
            <ul className="space-y-2">
              {tool.pricing.free_tier.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <SVGIcon name="check" size={16} className="text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            {tool.pricing.free_tier.limitations && (
              <p className="text-sm text-gray-500 mt-3">
                <strong>Limitations:</strong> {tool.pricing.free_tier.limitations}
              </p>
            )}
          </div>
          
          <button className="w-full mt-6 py-2 px-4 border-2 border-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors">
            Get Started for Free
          </button>
        </div>
      )}

      {/* Paid Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map(([planKey, plan]) => (
          <motion.div
            key={planKey}
            className={`border rounded-xl p-6 ${
              plan.popular 
                ? 'border-blue-500 ring-2 ring-blue-500/20 transform scale-105' 
                : 'border-gray-200'
            }`}
            whileHover={{ y: -5 }}
          >
            {plan.popular && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">
                Most Popular
              </span>
            )}
            
            <h3 className="text-xl font-bold capitalize">{planKey}</h3>
            <div className="my-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-gray-500">/{plan.billing_cycle}</span>
            </div>
            
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-start">
                  <SVGIcon name="check" size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={`w-full py-2 px-4 rounded-lg font-medium ${
                plan.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              } transition-colors`}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ReviewsTab: React.FC<{ tool: ToolNexus }> = ({ tool }) => {
  const adoptionRate = tool.adoption_metrics
    ? Math.round((tool.adoption_metrics.market_share || 0) * 100)
    : 0;

  const satisfactionRate = tool.adoption_metrics
    ? (tool.adoption_metrics.user_satisfaction || 0) * 20
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <SVGIcon 
              key={star} 
              name={tool.adoption_metrics ? (star <= Math.round(tool.adoption_metrics.user_satisfaction) ? 'star' : 'star-outline') : 'star-outline'} 
              size={24} 
              className="text-yellow-400" 
            />
          ))}
        </div>
        <span className="text-gray-700">
          {tool.adoption_metrics ? tool.adoption_metrics.user_satisfaction : 'N/A'} out of 5 ({tool.reviews.length} reviews)
        </span>
      </div>

      <div className="space-y-6">
        {tool.reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <InitialAvatar name={review.author} size={40} className="mr-3" />
                <div>
                  <h4 className="font-medium">{review.author}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              <div className="text-sm text-gray-500">{review.date}</div>
            </div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <SVGIcon 
                  key={star} 
                  name={star <= review.rating ? 'star' : 'star-outline'} 
                  size={16} 
                  className="text-yellow-400" 
                />
              ))}
            </div>
            <p className="text-gray-700">{review.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-medium mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Your Rating
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="text-gray-300 hover:text-yellow-400 focus:outline-none"
                >
                  <SVGIcon name="star" size={24} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              id="review"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your experience with this tool..."
            ></textarea>
          </div>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;