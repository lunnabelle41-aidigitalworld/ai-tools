// components/ToolNexus/ReviewIntelligence.tsx
import { useState, useEffect, useMemo } from 'react';
import { 
  ReviewIntelligence as ReviewIntelligenceType,
  ToolNexus,
  UserPersona,
  Review,
  SentimentAnalysis,
  TopicAnalysis,
  ReviewSummary
} from '../../types/tool-nexus';

interface ReviewIntelligenceProps {
  reviewData: ReviewIntelligenceType;
  tool: ToolNexus;
  userPersona: UserPersona;
}

const ReviewIntelligence: React.FC<ReviewIntelligenceProps> = ({
  reviewData,
  tool,
  userPersona
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'topics' | 'sentiment' | 'reviews'>('summary');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sentimentFilter, setSentimentFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');

  // Calculate filtered reviews based on filters
  const filteredReviews = useMemo(() => {
    let reviews = reviewData.reviews;

    // Filter by time range
    const daysAgo = parseInt(selectedTimeRange.replace('d', ''));
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysAgo);
    
    reviews = reviews.filter(review => new Date(review.date) >= cutoffDate);

    // Filter by sentiment
    if (sentimentFilter !== 'all') {
      reviews = reviews.filter(review => review.sentiment === sentimentFilter);
    }

    // Filter by topic
    if (selectedTopic) {
      reviews = reviews.filter(review => 
        review.topics.some(topic => topic.name === selectedTopic)
      );
    }

    return reviews;
  }, [reviewData.reviews, selectedTimeRange, sentimentFilter, selectedTopic]);

  // Calculate sentiment distribution
  const sentimentDistribution = useMemo(() => {
    const distribution = { positive: 0, negative: 0, neutral: 0 };
    filteredReviews.forEach(review => {
      distribution[review.sentiment]++;
    });
    return distribution;
  }, [filteredReviews]);

  // Get relevant topics based on user persona
  const getRelevantTopics = () => {
    const personaTopicMap: Record<string, string[]> = {
      developer: ['api', 'performance', 'documentation', 'integration'],
      designer: ['ui', 'design', 'templates', 'customization'],
      executive: ['pricing', 'roi', 'support', 'security'],
      team_lead: ['collaboration', 'team_features', 'management', 'onboarding'],
      freelancer: ['pricing', 'ease_of_use', 'features', 'support'],
      student: ['learning_curve', 'documentation', 'free_tier', 'tutorials']
    };

    const relevantTopics = personaTopicMap[userPersona.primary_persona] || [];
    return reviewData.topic_analysis.topics
      .filter(topic => relevantTopics.some(relevant => topic.name.includes(relevant)))
      .sort((a, b) => b.mention_count - a.mention_count);
  };

  const TabNavigation: React.FC = () => (
    <div className="flex border-b border-white/20 mb-6">
      {[
        { id: 'summary', label: 'Intelligent Summary', icon: '📊' },
        { id: 'topics', label: 'Topic Analysis', icon: '🏷️' },
        { id: 'sentiment', label: 'Sentiment Trends', icon: '😊' },
        { id: 'reviews', label: 'Smart Reviews', icon: '💬' }
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as any)}
          className={`px-6 py-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === tab.id
              ? 'border-purple-500 text-white'
              : 'border-transparent text-white/60 hover:text-white hover:border-white/20'
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );

  const FilterControls: React.FC = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-sm">Time Range:</span>
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="365d">Last year</option>
        </select>
      </div>

      {activeTab === 'reviews' && (
        <>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Sentiment:</span>
            <select
              value={sentimentFilter}
              onChange={(e) => setSentimentFilter(e.target.value as any)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
            >
              <option value="all">All</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="neutral">Neutral</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/60 text-sm">Topic:</span>
            <select
              value={selectedTopic || ''}
              onChange={(e) => setSelectedTopic(e.target.value || null)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
            >
              <option value="">All topics</option>
              {reviewData.topic_analysis.topics.map((topic, index) => (
                <option key={index} value={topic.name}>
                  {topic.name} ({topic.mention_count})
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );

  const SummaryView: React.FC = () => {
    const summary = reviewData.summary;
    const relevantTopics = getRelevantTopics();

    return (
      <div className="space-y-6">
        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Overall Rating</h5>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl font-bold text-yellow-400">
                {summary.overall_rating.toFixed(1)}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < Math.floor(summary.overall_rating) 
                          ? 'bg-yellow-400' 
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-white/60">
                  {filteredReviews.length} reviews
                </div>
              </div>
            </div>
            <div className="text-sm text-white/70">
              {summary.total_reviews} total reviews • {summary.rating_distribution.length} ratings
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Sentiment Score</h5>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl font-bold text-green-400">
                {summary.sentiment_score.toFixed(1)}
              </div>
              <div className="text-sm text-white/70">/ 10</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-green-400">Positive: {sentimentDistribution.positive}</span>
                <span className="text-red-400">Negative: {sentimentDistribution.negative}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Neutral: {sentimentDistribution.neutral}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Review Trend</h5>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl font-bold text-blue-400">
                {summary.review_trend === 'increasing' ? '↑' : 
                 summary.review_trend === 'decreasing' ? '↓' : '→'}
              </div>
              <div className="text-sm text-white/70 capitalize">
                {summary.review_trend} velocity
              </div>
            </div>
            <div className="text-sm text-white/60">
              {filteredReviews.length} reviews in {selectedTimeRange}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">AI-Generated Insights</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summary.key_insights.map((insight, index) => (
              <div key={index} className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="text-white mb-1">{insight.insight}</div>
                    <div className="text-xs text-white/60">
                      Confidence: {(insight.confidence * 100).toFixed(0)}% • 
                      Based on {insight.supporting_data_points} data points
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant Topics for Persona */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">
            Topics Relevant to {userPersona.primary_persona}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relevantTopics.slice(0, 6).map((topic, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{topic.name}</span>
                  <span className="text-sm text-white/60">{topic.mention_count} mentions</span>
                </div>
                <div className="text-sm text-white/70">
                  Avg. sentiment: {topic.sentiment_score.toFixed(1)}/10
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const TopicsView: React.FC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Cloud */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Topic Cloud</h5>
          <div className="flex flex-wrap gap-3">
            {reviewData.topic_analysis.topics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setSelectedTopic(topic.name)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedTopic === topic.name
                    ? 'bg-purple-500/20 border-purple-500/30 text-purple-300'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
                style={{
                  fontSize: `${Math.max(0.8, Math.min(1.2, topic.mention_count / 20))}rem`
                }}
              >
                {topic.name} ({topic.mention_count})
              </button>
            ))}
          </div>
        </div>

        {/* Topic Details */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Topic Analysis</h5>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reviewData.topic_analysis.topics
              .sort((a, b) => b.mention_count - a.mention_count)
              .map((topic, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{topic.name}</span>
                    <span className="text-sm text-white/60">{topic.mention_count} mentions</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-white/60">Sentiment:</span>
                      <div className={`px-2 py-1 rounded text-xs ${
                        topic.sentiment_score >= 7 ? 'bg-green-500/20 text-green-300' :
                        topic.sentiment_score >= 4 ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {topic.sentiment_score.toFixed(1)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/60">Trend:</span>
                      <span className="text-white">
                        {topic.trend === 'increasing' ? '↑' : 
                         topic.trend === 'decreasing' ? '↓' : '→'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Topic Evolution */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <h5 className="font-medium text-white mb-4">Topic Evolution Over Time</h5>
        <div className="text-center py-8 text-white/60">
          Topic evolution chart would be rendered here showing how different topics
          have trended over the selected time period.
        </div>
      </div>
    </div>
  );

  const SentimentView: React.FC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sentiment Distribution */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Sentiment Distribution</h5>
          <div className="space-y-3">
            {[
              { sentiment: 'positive', count: sentimentDistribution.positive, color: 'green' },
              { sentiment: 'neutral', count: sentimentDistribution.neutral, color: 'gray' },
              { sentiment: 'negative', count: sentimentDistribution.negative, color: 'red' }
            ].map((item) => (
              <div key={item.sentiment} className="flex items-center gap-3">
                <span className="text-white capitalize text-sm w-20">{item.sentiment}</span>
                <div className="flex-1 bg-white/10 rounded-full h-4 overflow-hidden">
                  <div
                    className={`bg-${item.color}-500 h-full transition-all duration-300`}
                    style={{ width: `${(item.count / filteredReviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-white text-sm w-12 text-right">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Trends */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Sentiment Trends</h5>
          <div className="text-center py-8 text-white/60">
            Sentiment trend chart would be rendered here showing
            how sentiment has changed over time.
          </div>
        </div>

        {/* Sentiment by Topic */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h5 className="font-medium text-white mb-4">Sentiment by Topic</h5>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {reviewData.topic_analysis.topics.slice(0, 8).map((topic, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-white/70">{topic.name}</span>
                <div className={`px-2 py-1 rounded text-xs ${
                  topic.sentiment_score >= 7 ? 'bg-green-500/20 text-green-300' :
                  topic.sentiment_score >= 4 ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {topic.sentiment_score.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentiment Analysis Details */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <h5 className="font-medium text-white mb-4">Detailed Sentiment Analysis</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h6 className="text-white mb-3">Positive Drivers</h6>
            <div className="space-y-2">
              {reviewData.sentiment_analysis.positive_keywords.slice(0, 5).map((keyword, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-white/70">{keyword}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h6 className="text-white mb-3">Negative Drivers</h6>
            <div className="space-y-2">
              {reviewData.sentiment_analysis.negative_keywords.slice(0, 5).map((keyword, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span className="text-white/70">{keyword}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ReviewsView: React.FC = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Review Stats */}
        <div className="lg:col-span-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h5 className="font-medium text-white mb-4">Review Statistics</h5>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">Total Reviews</span>
                <span className="font-medium text-white">{filteredReviews.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Avg. Rating</span>
                <span className="font-medium text-white">
                  {filteredReviews.length > 0 
                    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1)
                    : '0.0'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Avg. Helpfulness</span>
                <span className="font-medium text-white">
                  {filteredReviews.length > 0 
                    ? (filteredReviews.reduce((sum, r) => sum + r.helpfulness_score, 0) / filteredReviews.length).toFixed(1)
                    : '0.0'
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4 max-h-96 overflow-y-auto">
          {filteredReviews.map((review, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-300 font-medium">
                      {review.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">{review.author}</div>
                    <div className="text-sm text-white/60">
                      {new Date(review.date).toLocaleDateString()} • {review.verified_purchase ? '✓ Verified' : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < review.rating ? 'bg-yellow-400' : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${
                    review.sentiment === 'positive' ? 'bg-green-500/20 text-green-300' :
                    review.sentiment === 'negative' ? 'bg-red-500/20 text-red-300' :
                    'bg-gray-500/20 text-gray-300'
                  }`}>
                    {review.sentiment}
                  </div>
                </div>
              </div>

              <p className="text-white/80 mb-3">{review.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {review.topics.map((topic, i) => (
                    <span key={i} className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
                      {topic.name}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <span>👍 {review.helpful_votes}</span>
                  <span>Helpfulness: {review.helpfulness_score.toFixed(1)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-white mb-2">Review Intelligence</h3>
        <p className="text-white/60">
          AI-powered analysis of user reviews with persona-relevant insights
        </p>
      </div>

      <TabNavigation />
      <FilterControls />

      <div className="mt-6">
        {activeTab === 'summary' && <SummaryView />}
        {activeTab === 'topics' && <TopicsView />}
        {activeTab === 'sentiment' && <SentimentView />}
        {activeTab === 'reviews' && <ReviewsView />}
      </div>
    </div>
  );
};

export default ReviewIntelligence;
