// components/ToolNexus/InteractiveExperienceZones.tsx
import { useState, useEffect, useRef } from 'react';
import { 
  InteractiveZones, 
  ToolNexus, 
  UserPersona,
  APIPlaygroundType,
  ImplementationSimulatorType,
  ComparisonPortalType,
  TemplateGalleryType,
  RoadmapExplorerType,
  ImplementationSimulatorStepType,
  ImplementationSimulatorOptionType,
  TemplateType,
  FeatureType
} from '../../types/tool-nexus';

interface InteractiveExperienceZonesProps {
  tool: ToolNexus;
  userPersona: UserPersona;
}

const InteractiveExperienceZones: React.FC<InteractiveExperienceZonesProps> = ({
  tool,
  userPersona
}) => {
  const [activeZone, setActiveZone] = useState<string>('api_playground');
  const [zoneStates, setZoneStates] = useState<Record<string, any>>({});

  // Mock data for zones
  const mockZones = {
    api_playground: {
      endpoints: [
        { method: 'GET', path: '/api/tools', description: 'Get all tools', parameters: [], responses: [{ status_code: 200, description: 'Success', example: { tools: [] } }] },
        { method: 'POST', path: '/api/tools', description: 'Create tool', parameters: [], responses: [{ status_code: 201, description: 'Created', example: { id: '123' } }] }
      ],
      authentication: [{ type: 'api_key' as const, description: 'API Key authentication', setup_complexity: 'simple' as const }],
      rate_limits: [{ endpoint: '*', requests_per_minute: 100, requests_per_hour: 6000, requests_per_day: 100000 }],
      sandbox_available: true
    } as APIPlaygroundType,
    implementation_simulator: {
      setup_steps: [
        { id: '1', title: 'Account Setup', description: 'Create your account', type: 'info' as const, required: true, estimated_time: 5, configuration_options: [] },
        { id: '2', title: 'API Configuration', description: 'Configure API keys', type: 'input' as const, required: true, estimated_time: 10, configuration_options: [] }
      ],
      workflow_integrations: [],
      onboarding_steps: [],
      customization_options: [],
      migration_complexity: { 
        complexity_score: 3, 
        estimated_time: 2, 
        required_resources: [], 
        potential_roadblocks: [],
        cost_estimate: 500
      }
    } as ImplementationSimulatorType,
    comparison_portal: {
      competitors: [
        { name: 'Competitor A', market_share: 0.2, strengths: ['Feature A'], weaknesses: ['Feature B'], pricing_tier: 'Pro' },
        { name: 'Competitor B', market_share: 0.15, strengths: ['Feature C'], weaknesses: ['Feature D'], pricing_tier: 'Free' }
      ],
      comparison_categories: [],
      feature_matrix: { features: [] },
      pricing_comparison: { tiers: [] }
    } as ComparisonPortalType,
    template_gallery: {
      templates: [
        { id: '1', name: 'Template 1', description: 'Description', category: 'Category', author: 'Author', download_count: 100, rating: 4.5, preview_url: '', download_url: '', tags: [], difficulty: 'beginner' as const }
      ],
      categories: ['Category 1', 'Category 2'],
      featured_templates: [],
      community_contributions: []
    } as TemplateGalleryType,
    roadmap_explorer: {
      quarters: ['Q1 2024', 'Q2 2024'],
      features: [
        { id: '1', title: 'New Feature', description: 'Description', quarter: 'Q1 2024', status: 'planned' as const, priority: 5, votes: 10, category: 'Core' }
      ],
      voting_enabled: true,
      release_timeline: { current_quarter: 'Q1 2024', next_release: '2024-02-01', upcoming_features: [] }
    } as RoadmapExplorerType
  };

  // Zone priority based on user persona
  const getZonePriority = (zoneId: string): number => {
    const priorities: Record<string, Record<string, number>> = {
      developer: {
        api_playground: 10,
        implementation_simulator: 9,
        comparison_portal: 7,
        template_gallery: 6,
        roadmap_explorer: 4
      },
      designer: {
        template_gallery: 10,
        implementation_simulator: 8,
        comparison_portal: 7,
        api_playground: 3,
        roadmap_explorer: 5
      },
      executive: {
        comparison_portal: 10,
        implementation_simulator: 9,
        roadmap_explorer: 8,
        api_playground: 2,
        template_gallery: 4
      },
      team_lead: {
        implementation_simulator: 10,
        comparison_portal: 9,
        api_playground: 7,
        template_gallery: 6,
        roadmap_explorer: 5
      },
      freelancer: {
        comparison_portal: 10,
        template_gallery: 9,
        implementation_simulator: 7,
        api_playground: 5,
        roadmap_explorer: 4
      },
      student: {
        template_gallery: 10,
        api_playground: 8,
        implementation_simulator: 6,
        comparison_portal: 5,
        roadmap_explorer: 4
      }
    };

    return priorities[userPersona.primary_persona]?.[zoneId] || 5;
  };

  const availableZones = [
    {
      id: 'api_playground',
      title: 'API Playground',
      description: 'Interactive API testing with live code execution',
      icon: '🔧',
      priority: getZonePriority('api_playground'),
      available: mockZones.api_playground,
      estimatedTime: '25 min'
    },
    {
      id: 'implementation_simulator',
      title: 'Implementation Simulator',
      description: 'Preview setup process and test configurations',
      icon: '⚙️',
      priority: getZonePriority('implementation_simulator'),
      available: mockZones.implementation_simulator,
      estimatedTime: '20 min'
    },
    {
      id: 'comparison_portal',
      title: 'Comparison Portal',
      description: 'Side-by-side analysis with alternative tools',
      icon: '⚖️',
      priority: getZonePriority('comparison_portal'),
      available: mockZones.comparison_portal,
      estimatedTime: '15 min'
    },
    {
      id: 'template_gallery',
      title: 'Template Gallery',
      description: 'Browse and instantly copy templates with AI suggestions',
      icon: '📋',
      priority: getZonePriority('template_gallery'),
      available: mockZones.template_gallery,
      estimatedTime: '12 min'
    },
    {
      id: 'roadmap_explorer',
      title: 'Roadmap Explorer',
      description: 'Interactive product roadmap with voting and feedback',
      icon: '🗺️',
      priority: getZonePriority('roadmap_explorer'),
      available: mockZones.roadmap_explorer,
      estimatedTime: '8 min'
    }
  ].filter(zone => zone.available);

  // Sort zones by priority
  const sortedZones = [...availableZones].sort((a, b) => b.priority - a.priority);

  const ZoneSelector: React.FC = () => (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold text-white mb-6">Interactive Experience Zones</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedZones.map((zone) => {
          const isActive = activeZone === zone.id;
          const progress = zoneStates[zone.id]?.progress || 0;
          
          return (
            <button
              key={zone.id}
              onClick={() => setActiveZone(zone.id)}
              className={`p-6 rounded-lg border transition-all duration-200 text-left ${
                isActive 
                  ? 'bg-white/20 border-white/40 text-white transform scale-105' 
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:transform hover:scale-102'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{zone.icon}</div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    zone.priority >= 8 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : zone.priority >= 5
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    Priority {zone.priority}/10
                  </span>
                  <span className="text-xs text-white/50">{zone.estimatedTime}</span>
                </div>
              </div>
              
              <h4 className="font-semibold text-lg mb-2">{zone.title}</h4>
              <p className="text-sm text-white/60 mb-4">{zone.description}</p>
              
              {progress > 0 && (
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-white/50">Progress</span>
                    <span className="text-xs text-white">{progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const APIPlayground: React.FC<{ playground: APIPlaygroundType }> = ({ playground }) => {
    const [activeEndpoint, setActiveEndpoint] = useState(playground.endpoints[0]);
    const [requestBody, setRequestBody] = useState<string>('');
    const [response, setResponse] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTemplateSelect = (template: APIPlaygroundType) => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setResponse({
          status: 200,
          data: { message: "Success", timestamp: new Date().toISOString() },
          headers: { "content-type": "application/json" }
        });
        setIsLoading(false);
        
        // Update progress
        setZoneStates(prev => ({
          ...prev,
          api_playground: { ...prev.api_playground, progress: 50 }
        }));
      }, 1500);
    };

    return (
      <div className="max-w-4xl mx-auto">
        <h4 className="text-xl font-semibold text-white mb-6">API Playground</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Endpoint Selector */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Available Endpoints</h5>
            <div className="space-y-2">
              {playground.endpoints.map((endpoint, index) => (
                <button
                  key={index}
                  onClick={() => setActiveEndpoint(endpoint)}
                  className={`w-full p-3 rounded-lg border text-left transition-all ${
                    activeEndpoint === endpoint
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{endpoint.method} {endpoint.path}</div>
                      <div className="text-sm text-white/60">{endpoint.description}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      endpoint.method === 'GET' ? 'bg-green-500/20 text-green-300' :
                      endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Request Builder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Request Builder</h5>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/70 mb-2">Request Body (JSON)</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full h-32 p-3 bg-black/30 border border-white/10 rounded-lg text-white font-mono text-sm"
                  placeholder='{"key": "value"}'
                />
              </div>
              
              <button
                onClick={() => handleTemplateSelect(playground)}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Executing...' : 'Execute Request'}
              </button>
            </div>
          </div>
        </div>

        {/* Response Display */}
        {response && (
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Response</h5>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  response.status >= 200 && response.status < 300 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  Status: {response.status}
                </span>
                <span className="text-white/60 text-sm">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <pre className="p-4 bg-black/30 rounded-lg text-green-400 font-mono text-sm overflow-x-auto">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ImplementationSimulator: React.FC<{ simulator: ImplementationSimulatorType }> = ({ simulator }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

    const handleSetupStep = (step: ImplementationSimulatorStepType, index: number) => {
      if (currentStep < simulator.setup_steps.length - 1) {
        setCurrentStep(currentStep + 1);
        // Update progress
        const progress = ((currentStep + 1) / simulator.setup_steps.length) * 100;
        setZoneStates(prev => ({
          ...prev,
          implementation_simulator: { ...prev.implementation_simulator, progress }
        }));
      }
    };

    const handleOptionSelect = (option: ImplementationSimulatorOptionType, index: number) => {
      setSelectedOptions(prev => ({
        ...prev,
        [option.name]: option.default_value || ''
      }));
    };

    const prevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    const nextStep = () => {
      if (currentStep < simulator.setup_steps.length - 1) {
        setCurrentStep(currentStep + 1);
        // Update progress
        const progress = ((currentStep + 1) / simulator.setup_steps.length) * 100;
        setZoneStates(prev => ({
          ...prev,
          implementation_simulator: { ...prev.implementation_simulator, progress }
        }));
      }
    };

    const step = simulator.setup_steps[currentStep];

    return (
      <div className="max-w-4xl mx-auto">
        <h4 className="text-xl font-semibold text-white mb-6">Implementation Simulator</h4>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-white/70">Step {currentStep + 1} of {simulator.setup_steps.length}</span>
            <span className="text-sm text-purple-400">{Math.round(((currentStep + 1) / simulator.setup_steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / simulator.setup_steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center">
              <span className="text-blue-300 font-medium">{currentStep + 1}</span>
            </div>
            <h5 className="text-lg font-medium text-white">{step.title}</h5>
          </div>
          
          <p className="text-white/70 mb-6">{step.description}</p>
          
          {step.configuration_options && (
            <div className="space-y-4">
              <h6 className="font-medium text-white">Configuration Options</h6>
              {step.configuration_options.map((option, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{option.name}</span>
                    <span className="text-sm text-white/60 capitalize">{option.type}</span>
                  </div>
                  <p className="text-sm text-white/50 mb-3">{option.description}</p>
                  
                  {option.type === 'select' && (
                    <select
                      value={selectedOptions[option.name] || option.default_value}
                      onChange={(e) => setSelectedOptions(prev => ({
                        ...prev,
                        [option.name]: e.target.value
                      }))}
                      className="w-full p-2 bg-white/10 border border-white/20 rounded text-white"
                    >
                      {option.options?.map((opt: string, i: number) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                  
                  {option.type === 'boolean' && (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedOptions[option.name] === 'true'}
                        onChange={(e) => setSelectedOptions(prev => ({
                          ...prev,
                          [option.name]: e.target.checked ? 'true' : 'false'
                        }))}
                        className="rounded"
                      />
                      <span className="text-white">Enable {option.name}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>
          )}

          {step.estimated_time && (
            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-sm text-blue-300">
                ⏱️ Estimated time: {step.estimated_time}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous Step
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === simulator.setup_steps.length - 1}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === simulator.setup_steps.length - 1 ? 'Complete Setup' : 'Next Step'}
          </button>
        </div>
      </div>
    );
  };

  const ComparisonPortal: React.FC<{ portal: ComparisonPortalType }> = ({ portal }) => {
    const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>([]);
    const [comparisonView, setComparisonView] = useState<'features' | 'pricing' | 'performance'>('features');

    const handleCompetitorSelect = (competitor: string, index: number) => {
      if (selectedCompetitors.includes(competitor)) {
        setSelectedCompetitors(selectedCompetitors.filter(c => c !== competitor));
      } else {
        setSelectedCompetitors([...selectedCompetitors, competitor]);
      }
    };

    return (
      <div className="max-w-6xl mx-auto">
        <h4 className="text-xl font-semibold text-white mb-6">Comparison Portal</h4>
        
        {/* Competitor Selection */}
        <div className="mb-6 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Select Competitors to Compare</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {portal.competitors.map((competitor, index) => (
              <label key={index} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                <input
                  type="checkbox"
                  checked={selectedCompetitors.includes(competitor.name)}
                  onChange={(e) => handleCompetitorSelect(competitor.name, index)}
                  className="rounded"
                />
                <span className="text-white">{competitor.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* View Selector */}
        <div className="mb-6 flex gap-2">
          {(['features', 'pricing', 'performance'] as const).map((view) => (
            <button
              key={view}
              onClick={() => setComparisonView(view)}
              className={`px-4 py-2 rounded-lg capitalize transition-all ${
                comparisonView === view
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {view} Comparison
            </button>
          ))}
        </div>

        {/* Comparison Results */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          {selectedCompetitors.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">⚖️</div>
              <div className="text-white/60">Select competitors to start comparing</div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h6 className="font-medium text-purple-300 mb-2">Current Tool</h6>
                  <div className="text-white">{tool.tool_id}</div>
                </div>
                {selectedCompetitors.map((competitor, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <h6 className="font-medium text-white mb-2">{competitor}</h6>
                    <div className="text-white/60">Competitor {index + 1}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="text-blue-300">
                  Detailed comparison analysis would appear here based on the selected view.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const TemplateGallery: React.FC<{ gallery: TemplateGalleryType }> = ({ gallery }) => {
    const [selectedCategory, setSelectedCategory] = useState(gallery.categories[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTemplates = gallery.templates.filter(template => 
      template.category === selectedCategory &&
      template.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCategoryFilter = (category: string, index: number) => {
      setSelectedCategory(category);
    };

    const handleTemplatePreview = (template: TemplateType, index: number) => {
      // Handle template preview
    };

    return (
      <div className="max-w-6xl mx-auto">
        <h4 className="text-xl font-semibold text-white mb-6">Template Gallery</h4>
        
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
          />
          
          <div className="flex gap-2">
            {gallery.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryFilter(category, index)}
                className={`px-4 py-3 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="flex items-start justify-between mb-4">
                <h5 className="font-medium text-white">{template.name}</h5>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  {template.difficulty}
                </span>
              </div>
              
              <p className="text-white/60 text-sm mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">{template.category}</span>
                <span className="text-white/50">{template.download_count} downloads</span>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleTemplatePreview(template, index)}
                  className="flex-1 py-2 bg-white/10 border border-white/20 rounded text-white hover:bg-white/20 transition-all"
                >
                  Preview
                </button>
                <button
                  className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded font-medium"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RoadmapExplorer: React.FC<{ roadmap: RoadmapExplorerType }> = ({ roadmap }) => {
    const [selectedQuarter, setSelectedQuarter] = useState(roadmap.quarters[0]);
    const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());

    const handleQuarterSelect = (quarter: string, index: number) => {
      setSelectedQuarter(quarter);
    };

    const handleFeatureDetail = (feature: FeatureType, index: number) => {
      const hasVoted = votedFeatures.has(feature.id);
      
      return (
        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h5 className="font-medium text-white mb-2">{feature.title}</h5>
              <p className="text-white/60">{feature.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              feature.status === 'planned' ? 'bg-blue-500/20 text-blue-300' :
              feature.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-green-500/20 text-green-300'
            }`}>
              {feature.status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-white/60">Votes:</span>
                <span className="font-medium text-white">{feature.votes}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60">Priority:</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < feature.priority ? 'bg-purple-500' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => {
                if (!hasVoted) {
                  setVotedFeatures(new Set([...votedFeatures, feature.id]));
                  feature.votes++;
                }
              }}
              disabled={hasVoted}
              className={`px-4 py-2 rounded-lg transition-all ${
                hasVoted
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {hasVoted ? '✓ Voted' : 'Vote'}
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="max-w-6xl mx-auto">
        <h4 className="text-xl font-semibold text-white mb-6">Roadmap Explorer</h4>
        
        {/* Quarter Selector */}
        <div className="mb-6 flex gap-2">
          {roadmap.quarters.map((quarter, index) => (
            <button
              key={index}
              onClick={() => handleQuarterSelect(quarter, index)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedQuarter === quarter
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {quarter}
            </button>
          ))}
        </div>

        {/* Features for Selected Quarter */}
        <div className="space-y-4">
          {roadmap.features
            .filter(feature => feature.quarter === selectedQuarter)
            .map((feature, index) => handleFeatureDetail(feature, index))}
        </div>
      </div>
    );
  };

  const renderActiveZone = () => {
    switch (activeZone) {
      case 'api_playground':
        return <APIPlayground playground={mockZones.api_playground} />;
      case 'implementation_simulator':
        return <ImplementationSimulator simulator={mockZones.implementation_simulator} />;
      case 'comparison_portal':
        return <ComparisonPortal portal={mockZones.comparison_portal} />;
      case 'template_gallery':
        return <TemplateGallery gallery={mockZones.template_gallery} />;
      case 'roadmap_explorer':
        return <RoadmapExplorer roadmap={mockZones.roadmap_explorer} />;
      default:
        return <div className="text-white/60">Zone not available</div>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <ZoneSelector />
      {renderActiveZone()}
    </div>
  );
};

export default InteractiveExperienceZones;
