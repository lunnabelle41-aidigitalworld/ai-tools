// types/tool-nexus.ts

// Pricing related interfaces
export interface FreeTier {
  available: boolean;
  features: string[];
  limitations?: string[];
}

export interface PricingTier {
  name: string;
  price: number;
  billing_cycle: 'monthly' | 'annual';
  features: string[];
  most_popular?: boolean;
  cta_text?: string;
}

export interface PricingModel {
  free_tier: FreeTier;
  tiers: PricingTier[];
  currency?: string;
  billing_options?: {
    monthly: boolean;
    annual: boolean;
    enterprise: boolean;
  };
}

export interface ToolNexus {
  tool_id: string;
  name: string;
  category: string;
  description: string;
  version: string;
  developer: string;
  icon?: string;
  color?: string;
  pricing: PricingModel;
  adoption_metrics?: {
    market_share: number;
    growth_rate: number;
    user_satisfaction: number;
    competitor_comparison: Array<{
      name: string;
      market_share: number;
      growth_rate: number;
    }>;
    industry_adoption: Record<string, number>;
  };
  immersive_data: ImmersiveData;
  intelligence_modules: IntelligenceModules;
  interactive_zones: InteractiveZones;
  real_time_data: RealTimeData;
  personalization: PersonalizationData;
  review_intelligence?: ReviewIntelligence;
  features: ToolFeature[];
  reviews: ToolReview[];
}

export interface ImmersiveData {
  visual_seed: string;
  color_palette: string[];
  background_animation: 'neural_network' | 'color_spectrum' | 'code_streams' | 'shape_morphing';
  interactive_elements: string[];
  tool_aura: {
    primary_color: string;
    secondary_color: string;
    intensity: number;
  };
  contextual_particles: ContextualParticle[];
}

export interface ContextualParticle {
  id: string;
  type: 'api_icon' | 'collaboration_symbol' | 'feature_badge' | 'metric_indicator';
  position: { x: number; y: number; z: number };
  animation: 'float' | 'pulse' | 'orbit' | 'stream';
  metadata: Record<string, any>;
}

export interface IntelligenceModules {
  pricing_engine: PricingEngine;
  adoption_radar: AdoptionRadar;
  community_consciousness: CommunityConsciousness;
  review_intelligence: ReviewIntelligence;
  implementation_simulator: ImplementationSimulator;
}

export interface PricingEngine {
  scenarios: PricingScenario[];
  hidden_costs: HiddenCost[];
  roi_calculators: ROICalculator[];
  price_history: PricePoint[];
  competitive_analysis: CompetitivePricing[];
}

export interface PricingScenario {
  id: string;
  name: string;
  description: string;
  team_size: number;
  usage_level: 'light' | 'moderate' | 'heavy';
  monthly_cost: number;
  annual_cost: number;
  setup_fees: number;
  training_costs: number;
}

export interface HiddenCost {
  type: 'setup' | 'training' | 'migration' | 'integration' | 'maintenance';
  estimated_cost: number;
  description: string;
  frequency: 'one_time' | 'monthly' | 'annual';
}

export interface ROICalculator {
  metric: 'time_savings' | 'productivity' | 'cost_reduction' | 'revenue_increase';
  calculation_method: string;
  estimated_value: number;
  time_to_roi: number; // in months
  confidence_level: number; // 0-1
}

export interface PricePoint {
  date: string;
  price: number;
  plan_type: string;
  change_reason?: string;
}

export interface CompetitivePricing {
  competitor_id: string;
  competitor_name: string;
  price_difference: number;
  value_score: number;
  feature_comparison: Record<string, 'better' | 'equal' | 'worse'>;
}

export interface ToolFeature {
  id: string;
  name: string;
  description: string;
  icon?: string;
  status?: 'new' | 'beta' | 'popular';
  documentation_url?: string;
}

export interface ToolReview {
  id: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
  verified: boolean;
  version_used?: string;
  pros?: string[];
  cons?: string[];
}

export interface UserPersona {
  id: string;
  name: string;
  role: string;
  company: string;
  experience_level: 'beginner' | 'intermediate' | 'expert';
  team_size: number;
  industry: string;
  tools: string[];
  goals: string[];
  pain_points: string[];
  preferences?: UserPreferences;
  behavior_patterns?: UserBehavior[];
  engagement_metrics?: EngagementMetrics;
  feedback?: UserFeedback[];
  learning_style?: 'visual' | 'textual' | 'interactive' | 'experimental';
  preferred_features?: string[];
  usage_frequency?: 'daily' | 'weekly' | 'monthly' | 'rarely';
  avatar_color?: string;
  last_active?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CompetitiveInsight {
  insight: string;
  confidence: number; // 0-1
  data_source: string;
}

export interface MarketPosition {
  tool_name: string;
  market_share: number; // percentage
  growth_rate: number; // percentage per year
  quadrant: 'market_leaders' | 'innovators' | 'niche_players' | 'emerging_tools';
  confidence_level: number; // 0-1
  is_current_tool: boolean;
}

export interface GrowthTrajectory {
  tool_name: string;
  trajectory_type: 'accelerating' | 'steady' | 'declining' | 'explosive';
  current_growth: number; // percentage
  projected_growth: number; // percentage
  market_share_projection: number; // percentage in 1 year
  historical_data: Array<{
    value: number; // monthly growth data point
    date?: string; // optional date for the data point
  }> | number[]; // support both formats for backward compatibility
}

export interface AdoptionRadar {
  current_users: number;
  growth_rate: number;
  user_segments: UserSegment[];
  adoption_barriers: AdoptionBarrier[];
  adoption_drivers: string[];
  market_penetration: number;
  competitor_adoption: CompetitorAdoption[];
  industry_adoption: Record<string, number>;
  user_retention_rate: number;
  feature_adoption: Record<string, number>;
  sentiment_analysis: {
    positive: number;
    neutral: number;
    negative: number;
  };
  nps_score: number;
  churn_rate: number;
  expansion_rate: number;
  market_position: MarketPosition[];
  growth_trajectory: GrowthTrajectory[];
  competitive_insights: CompetitiveInsight[];
  summary: {
    key_metrics: {
      total_users: number;
      growth_rate: number;
      market_share: number;
      user_satisfaction: number;
    };
    market_position: {
      current: string;
      trend: 'improving' | 'stable' | 'declining';
      competitors: string[];
    };
    growth_outlook: {
      rating: 'strong' | 'moderate' | 'weak';
      factors: string[];
      projected_growth: number; // percentage
    };
    competitive_threat: {
      level: 'high' | 'medium' | 'low';
      main_competitors: string[];
      key_risks: string[];
    };
    trend_analysis: string;
    recommendations: string[];
    last_updated: string;
  };
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  size: number;
  growth_rate: number;
}

export interface AdoptionBarrier {
  id: string;
  name: string;
  description: string;
  impact: number;
}

export interface CompetitorAdoption {
  competitor_id: string;
  competitor_name: string;
  market_share: number;
  growth_rate: number;
}

export interface CommunityConsciousness {
  sentiment_trend: 'declining' | 'stable' | 'improving' | 'excellent';
  key_themes: Record<string, number>; // theme -> sentiment score
  expert_opinions: ExpertOpinion[];
  user_stories: UserStory[];
  social_mentions: SocialMention[];
  support_forum_analysis: SupportForumAnalysis;
}

export interface ExpertOpinion {
  expert_id: string;
  expert_name: string;
  expertise: string;
  opinion: string;
  rating: number;
  date: string;
  credibility_score: number;
}

export interface UserStory {
  story_id: string;
  user_profile: string;
  use_case: string;
  outcome: string;
  metrics: Record<string, number>;
  date: string;
  verified: boolean;
}

export interface SocialMention {
  platform: 'twitter' | 'linkedin' | 'reddit' | 'hackernews';
  sentiment: 'positive' | 'neutral' | 'negative';
  engagement: number;
  content: string;
  date: string;
}

export interface SupportForumAnalysis {
  response_time_avg: number; // in hours
  resolution_rate: number; // 0-1
  common_issues: CommonIssue[];
  community_helpfulness: number; // 0-1
}

export interface CommonIssue {
  issue: string;
  frequency: number;
  resolution_status: 'resolved' | 'ongoing' | 'acknowledged';
  user_impact: 'low' | 'medium' | 'high';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  content: string;
  date: string;
  helpful_votes: number;
  helpfulness_score: number;
  verified_purchase: boolean;
  topics: ReviewTopic[];
}

export interface ReviewTopic {
  name: string;
  relevance_score: number;
  sentiment_score: number;
}

export interface SentimentAnalysis {
  overall_sentiment: 'positive' | 'negative' | 'neutral';
  sentiment_score: number; // 0-10
  positive_keywords: string[];
  negative_keywords: string[];
  neutral_keywords: string[];
  sentiment_distribution: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

export interface TopicAnalysis {
  topics: Topic[];
  topic_trends: TopicTrend[];
  emerging_topics: string[];
  declining_topics: string[];
}

export interface Topic {
  name: string;
  mention_count: number;
  sentiment_score: number; // 0-10
  trend: 'increasing' | 'decreasing' | 'stable';
  related_topics: string[];
}

export interface TopicTrend {
  topic: string;
  trend_data: {
    date: string;
    mention_count: number;
    sentiment_score: number;
  }[];
}

export interface ReviewSummary {
  overall_rating: number;
  total_reviews: number;
  rating_distribution: number[]; // 5-star distribution
  sentiment_score: number;
  review_trend: 'increasing' | 'decreasing' | 'stable';
  key_insights: ReviewInsight[];
  top_positive_themes: string[];
  top_negative_themes: string[];
}

export interface ReviewInsight {
  insight: string;
  confidence: number; // 0-1
  supporting_data_points: number;
  category: 'performance' | 'features' | 'support' | 'pricing' | 'ui' | 'other';
}

export interface ReviewIntelligence {
  reviews: Review[];
  sentiment_analysis: SentimentAnalysis;
  topic_analysis: TopicAnalysis;
  summary: ReviewSummary;
  review_clusters: ReviewCluster[];
  authenticity_scores: AuthenticityScore[];
  contextual_insights: ContextualInsight[];
  video_reviews: VideoReview[];
  review_trends: ReviewTrend[];
}

export interface ReviewCluster {
  cluster_id: string;
  theme: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  review_count: number;
  key_points: string[];
  representative_quotes: string[];
}

export interface AuthenticityScore {
  review_id: string;
  authenticity_score: number; // 0-1
  expertise_level: 'beginner' | 'intermediate' | 'expert' | 'vendor';
  verification_status: 'verified' | 'unverified' | 'suspicious';
}

export interface ContextualInsight {
  user_segment: string;
  average_rating: number;
  common_praises: string[];
  common_complaints: string[];
  recommendation_rate: number;
}

export interface VideoReview {
  video_id: string;
  title: string;
  reviewer: string;
  duration: number; // in seconds
  transcript: string;
  key_timestamps: KeyTimestamp[];
  engagement_metrics: EngagementMetrics;
}

export interface KeyTimestamp {
  time: number; // in seconds
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  importance: number; // 0-1
}

export interface EngagementMetrics {
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watch_time_avg: number; // in seconds
}

export interface ReviewTrend {
  date: string;
  average_rating: number;
  review_count: number;
  sentiment_distribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

export interface ImplementationSimulator {
  setup_steps: ImplementationSimulatorStep[];
  workflow_integrations: WorkflowIntegration[];
  onboarding_steps: OnboardingStep[];
  customization_options: CustomizationOption[];
  migration_complexity: MigrationComplexity;
}

export interface ImplementationSimulatorStep {
  id: string;
  title: string;
  description: string;
  type: 'input' | 'select' | 'checkbox' | 'info';
  options?: ImplementationSimulatorOption[];
  required: boolean;
  estimated_time?: number; // in minutes
  configuration_options?: any[];
}

export interface ImplementationSimulatorOption {
  id: string;
  name: string;
  value: string;
  default_value?: string;
  description?: string;
}

export interface APIPlayground {
  endpoints: APIEndpoint[];
  authentication: AuthenticationMethod[];
  rate_limits: RateLimit[];
  sandbox_available: boolean;
}

export interface APIEndpoint {
  method: string;
  path: string;
  description: string;
  parameters: APIParameter[];
  responses: APIResponse[];
}

export interface APIParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface APIResponse {
  status_code: number;
  description: string;
  example: any;
}

export interface AuthenticationMethod {
  type: 'api_key' | 'oauth' | 'bearer' | 'basic';
  description: string;
  setup_complexity: 'simple' | 'moderate' | 'complex';
}

export interface RateLimit {
  endpoint: string;
  requests_per_minute: number;
  requests_per_hour: number;
  requests_per_day: number;
}

export interface ComparisonPortal {
  competitors: Competitor[];
  comparison_categories: ComparisonCategory[];
  feature_matrix: FeatureMatrix;
  pricing_comparison: PricingComparison;
}

export interface Competitor {
  name: string;
  market_share: number;
  strengths: string[];
  weaknesses: string[];
  pricing_tier: string;
}

export interface ComparisonCategory {
  name: string;
  weight: number;
  features: string[];
}

export interface FeatureMatrix {
  features: FeatureComparison[];
}

export interface FeatureComparison {
  feature: string;
  tool_score: number;
  competitor_scores: Record<string, number>;
}

export interface PricingComparison {
  tiers: PricingTierComparison[];
}

export interface PricingTierComparison {
  tier_name: string;
  tool_price: number;
  competitor_prices: Record<string, number>;
}

export interface TemplateGallery {
  templates: Template[];
  categories: string[];
  featured_templates: Template[];
  community_contributions: Template[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  download_count: number;
  rating: number;
  preview_url?: string;
  download_url: string;
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface RoadmapExplorer {
  quarters: string[];
  features: Feature[];
  voting_enabled: boolean;
  release_timeline: ReleaseTimeline;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  quarter: string;
  status: 'planned' | 'in_progress' | 'released';
  priority: number;
  votes: number;
  category: string;
}

export interface ReleaseTimeline {
  current_quarter: string;
  next_release: string;
  upcoming_features: string[];
}

export interface TemplateType {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  download_count: number;
  rating: number;
}

export interface FeatureType {
  id: string;
  title: string;
  description: string;
  quarter: string;
  status: 'planned' | 'in_progress' | 'released';
  priority: number;
  votes: number;
  category: string;
}

export interface ImplementationSimulatorStepType {
  id: string;
  title: string;
  description: string;
  type: 'input' | 'select' | 'checkbox' | 'info';
  options?: ImplementationSimulatorOptionType[];
  required: boolean;
}

export interface ImplementationSimulatorOptionType {
  id: string;
  name: string;
  value: string;
  default_value?: string;
  description?: string;
}

export interface APIPlaygroundType {
  endpoints: APIEndpoint[];
  authentication: AuthenticationMethod[];
  rate_limits: RateLimit[];
  sandbox_available: boolean;
}

export interface ComparisonPortalType {
  competitors: Competitor[];
  comparison_categories: ComparisonCategory[];
  feature_matrix: FeatureMatrix;
  pricing_comparison: PricingComparison;
}

export interface TemplateGalleryType {
  templates: Template[];
  categories: string[];
  featured_templates: Template[];
  community_contributions: Template[];
}

export interface RoadmapExplorerType {
  quarters: string[];
  features: Feature[];
  voting_enabled: boolean;
  release_timeline: ReleaseTimeline;
}

export interface ImplementationSimulatorType {
  setup_steps: ImplementationSimulatorStep[];
  workflow_integrations: WorkflowIntegration[];
  onboarding_steps: OnboardingStep[];
  customization_options: CustomizationOption[];
  migration_complexity: MigrationComplexity;
}

export interface WorkflowIntegration {
  workflow_type: string;
  integration_points: string[];
  setup_time: number; // in hours
  learning_curve: 'minimal' | 'moderate' | 'steep';
  automation_potential: number; // 0-1
}

export interface OnboardingStep {
  step_id: string;
  title: string;
  description: string;
  estimated_time: number; // in minutes
  difficulty: 'easy' | 'moderate' | 'complex';
  prerequisites: string[];
  resources: OnboardingResource[];
}

export interface OnboardingResource {
  type: 'video' | 'documentation' | 'tutorial' | 'template';
  title: string;
  url: string;
  duration?: number; // for videos in minutes
}

export interface CustomizationOption {
  option_id: string;
  category: string;
  name: string;
  description: string;
  options: CustomizationChoice[];
  impact_on_workflow: string;
}

export interface CustomizationChoice {
  value: string;
  label: string;
  description: string;
  recommended_for: string[];
}

export interface MigrationComplexity {
  complexity_score: number; // 0-10
  estimated_time: number; // in days
  required_resources: string[];
  potential_roadblocks: string[];
  cost_estimate: number;
}

export interface InteractiveZones {
  implementation_simulator: boolean;
  api_playground: boolean;
  comparison_portal: boolean;
  feature_sandbox: boolean;
  template_gallery: boolean;
  roadmap_explorer: boolean;
}

export interface LiveDataPoint {
  timestamp: Date;
  value: any;
  metadata: Record<string, any>;
  source: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  metadata?: Record<string, any>;
}

export interface WebSocketConnection {
  connection_id: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  last_activity: Date;
  message_count: number;
  error_count: number;
}

export interface RealTimeData {
  tool_id: string;
  last_updated: Date;
  connections: WebSocketConnection[];
  data_streams: {
    performance_metrics: LiveDataPoint[];
    user_activity: LiveDataPoint[];
    system_health: LiveDataPoint[];
    pricing_updates: LiveDataPoint[];
    feature_usage: LiveDataPoint[];
    error_tracking: LiveDataPoint[];
  };
  alerts: Alert[];
  processing_queue: any[];
  cache_status: {
    size: number;
    hit_rate: number;
    last_cleanup: Date;
  };
  live_metrics: LiveMetrics;
  recent_activity: RecentActivity[];
  system_status: SystemStatus;
  trending_indicators: TrendingIndicator[];
}

export interface LiveMetrics {
  current_visitors: number;
  trial_starters_today: number;
  active_users: number;
  api_calls_per_minute: number;
  server_response_time: number; // in ms
  uptime_percentage: number; // 0-100
}

export interface RecentActivity {
  activity_id: string;
  type: 'trial_started' | 'subscription_upgraded' | 'feature_used' | 'company_switched' | 'version_released';
  description: string;
  timestamp: string;
  visibility: 'public' | 'semi_public' | 'private';
  metadata: Record<string, any>;
}

export interface SystemStatus {
  overall_status: 'operational' | 'degraded_performance' | 'partial_outage' | 'major_outage';
  services: ServiceStatus[];
  last_updated: string;
}

export interface ServiceStatus {
  service_name: string;
  status: 'operational' | 'degraded_performance' | 'partial_outage' | 'major_outage';
  response_time?: number; // in ms
  error_rate?: number; // 0-1
}

export interface TrendingIndicator {
  indicator_id: string;
  type: 'social_trend' | 'github_activity' | 'user_growth' | 'feature_adoption';
  title: string;
  value: string;
  change: number; // percentage change
  timeframe: string;
  source: string;
}

export interface PersonalizationData {
  user_persona: UserPersona;
  content_priorities: ContentPriority[];
  section_completion: Record<string, number>; // section_id -> completion_percentage
  behavior_patterns: BehaviorPattern[];
  expertise_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface UserPersona {
  user_id: string;
  primary_persona: 'developer' | 'designer' | 'executive' | 'team_lead' | 'freelancer' | 'student';
  secondary_persona?: string;
  company_size: 'solo' | 'small' | 'medium' | 'large' | 'enterprise';
  industry: string;
  technical_expertise: number; // 0-10
  budget_sensitivity: number; // 0-10
  expertise_level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  persona_strengths?: string[];
}

export interface ContentPriority {
  section_id: string;
  priority: number; // 0-10
  reasoning: string;
}

export interface BehaviorPattern {
  pattern_type: 'content_consumption' | 'feature_interest' | 'comparison_behavior' | 'price_sensitivity';
  pattern_data: Record<string, any>;
  confidence: number; // 0-1
}

// Component Props Interfaces
export interface ToolNexusProps {
  tool: ToolNexus;
  userPersona?: UserPersona;
  onPersonaChange?: (persona: UserPersona) => void;
  onSectionComplete?: (sectionId: string, completion: number) => void;
}

export interface ImmersiveHeaderProps {
  immersiveData: ImmersiveData;
  tool: Pick<ToolNexus, 'tool_id' | 'real_time_data'>;
  onAction: (action: string) => void;
}

export interface DynamicToolCanvasProps {
  visualSeed: string;
  animation: ImmersiveData['background_animation'];
  colorPalette: string[];
  interactiveElements: string[];
}

export interface HeroIntelligencePanelProps {
  tool: Pick<ToolNexus, 'tool_id' | 'real_time_data'>;
  stats: LiveMetrics;
  actions: PrimaryAction[];
}

export interface PrimaryAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'tertiary';
  action: () => void;
  icon?: string;
  loading?: boolean;
}

export interface AdaptiveContentStreamProps {
  tool: ToolNexus;
  userPersona: UserPersona;
  onSectionComplete: (sectionId: string, completion: number) => void;
}

export interface IntelligentSectionProps {
  section: {
    id: string;
    title: string;
    component: React.ComponentType<any>;
    priority: number;
    estimated_time: number;
  };
  isActive: boolean;
  onActivate: () => void;
}

export interface PricingIntelligenceProps {
  engine: PricingEngine;
  userPersona: UserPersona;
  onScenarioChange?: (scenario: PricingScenario) => void;
}

export interface AdoptionRadarProps {
  radar: AdoptionRadar;
  interactive?: boolean;
}

export interface CommunityConsciousnessProps {
  consciousness: CommunityConsciousness;
  userPersona: UserPersona;
}

export interface ReviewIntelligenceProps {
  reviews: ReviewIntelligence;
  userPersona: UserPersona;
  onReviewFilter?: (filter: ReviewFilter) => void;
}

export interface ReviewFilter {
  sentiment?: 'positive' | 'neutral' | 'negative';
  user_segment?: string;
  date_range?: [string, string];
  expertise_level?: string[];
}

export interface InteractiveExperienceZoneProps {
  zone: keyof InteractiveZones;
  tool: ToolNexus;
  userPersona: UserPersona;
}

// User-related interfaces
export interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  notifications?: {
    email?: boolean;
    push?: boolean;
    in_app?: boolean;
  };
  language?: string;
  timezone?: string;
  accessibility?: {
    high_contrast?: boolean;
    text_size?: 'small' | 'medium' | 'large';
    reduce_animations?: boolean;
  };
}

export interface UserBehavior {
  last_active?: string;
  feature_usage: Record<string, number>; // feature_name: usage_count
  preferred_features: string[];
  common_workflows: string[];
  interaction_patterns: {
    time_spent: Record<string, number>; // section: minutes
    frequent_actions: string[];
  };
}

export interface UserFeedback {
  id: string;
  type: 'bug' | 'feature' | 'general';
  content: string;
  status: 'new' | 'in_review' | 'planned' | 'in_progress' | 'completed' | 'declined';
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

// Utility Types
export type ToolCategory = 'AI Tools' | 'Design' | 'Development' | 'Marketing' | 'Productivity';
export type PricingTierName = 'Free' | 'Freemium' | 'Paid' | 'Enterprise';
export type SentimentScore = -1 | 0 | 1;
export type ConfidenceLevel = number; // 0-1
export type Percentage = number; // 0-100
