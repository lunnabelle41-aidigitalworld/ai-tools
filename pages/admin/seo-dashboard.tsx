import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import SEOAutomationEngine from '../../lib/seo-automation';
import { VoiceSearchOptimizer } from '../../lib/voice-search-optimization';
import { EEATEnhancer } from '../../lib/eeat-enhancement';
import { KnowledgeNode } from '../../lib/adaptive-stream';

interface SEOMetrics {
  overallScore: number;
  readabilityScore: number;
  keywordDensity: number;
  semanticRelevance: number;
  competitorGap: number;
  answerIntent: number;
  technicalSEO: number;
  voiceSearchScore: number;
  eeatScore: number;
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
  searchVisibility: {
    organic: number;
    featuredSnippets: number;
    peopleAlsoAsk: number;
    voiceSearch: number;
  };
  contentPerformance: {
    pageViews: number;
    avgTimeOnPage: number;
    bounceRate: number;
    conversionRate: number;
  };
}

interface ContentAudit {
  id: string;
  title: string;
  url: string;
  lastUpdated: string;
  seoScore: number;
  issues: string[];
  recommendations: string[];
  status: 'optimal' | 'needs-improvement' | 'critical';
}

interface KeywordTracking {
  keyword: string;
  position: number;
  previousPosition: number;
  searchVolume: number;
  difficulty: number;
  url: string;
  trend: 'up' | 'down' | 'stable';
}

const SEODashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<SEOMetrics | null>(null);
  const [contentAudit, setContentAudit] = useState<ContentAudit[]>([]);
  const [keywordTracking, setKeywordTracking] = useState<KeywordTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'content' | 'keywords' | 'technical'>('overview');

  const seoEngine = new SEOAutomationEngine();
  const voiceOptimizer = new VoiceSearchOptimizer();
  const eeatEnhancer = new EEATEnhancer();

  useEffect(() => {
    fetchSEOMetrics();
    fetchContentAudit();
    fetchKeywordTracking();
  }, []);

  const fetchSEOMetrics = async () => {
    try {
      // Mock data - in production, this would come from your analytics API
      const mockMetrics: SEOMetrics = {
        overallScore: 87,
        readabilityScore: 92,
        keywordDensity: 78,
        semanticRelevance: 85,
        competitorGap: 73,
        answerIntent: 89,
        technicalSEO: 94,
        voiceSearchScore: 82,
        eeatScore: 91,
        coreWebVitals: {
          lcp: 2.1,
          fid: 45,
          cls: 0.08
        },
        searchVisibility: {
          organic: 68,
          featuredSnippets: 12,
          peopleAlsoAsk: 8,
          voiceSearch: 5
        },
        contentPerformance: {
          pageViews: 45230,
          avgTimeOnPage: 4.5,
          bounceRate: 32,
          conversionRate: 3.2
        }
      };
      setMetrics(mockMetrics);
    } catch (error) {
      console.error('Error fetching SEO metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContentAudit = async () => {
    try {
      // Mock data - in production, this would come from your CMS API
      const mockAudit: ContentAudit[] = [
        {
          id: '1',
          title: 'The Future of AI-Driven Development',
          url: '/blog/future-ai-driven-development',
          lastUpdated: '2024-01-15',
          seoScore: 87,
          issues: [
            'Meta description could be more compelling',
            'Missing internal links to related content',
            'Image alt tags need optimization'
          ],
          recommendations: [
            'Update meta description to include target keywords',
            'Add 3-5 internal links to relevant articles',
            'Optimize all images with descriptive alt text'
          ],
          status: 'needs-improvement'
        },
        {
          id: '2',
          title: 'Top 10 AI Tools for Content Creation',
          url: '/blog/top-10-ai-tools-content-creation',
          lastUpdated: '2024-01-10',
          seoScore: 94,
          issues: [],
          recommendations: [
            'Consider adding a video summary',
            'Expand FAQ section for more featured snippet opportunities'
          ],
          status: 'optimal'
        },
        {
          id: '3',
          title: 'AI in Healthcare: Opportunities and Challenges',
          url: '/blog/ai-healthcare-opportunities',
          lastUpdated: '2023-12-20',
          seoScore: 65,
          issues: [
            'Content is outdated',
            'Missing E-E-A-T signals',
            'No structured data for medical claims',
            'Low readability score'
          ],
          recommendations: [
            'Update content with latest research',
            'Add author credentials and fact-checking',
            'Implement medical claim schema',
            'Simplify language for better readability'
          ],
          status: 'critical'
        }
      ];
      setContentAudit(mockAudit);
    } catch (error) {
      console.error('Error fetching content audit:', error);
    }
  };

  const fetchKeywordTracking = async () => {
    try {
      // Mock data - in production, this would come from your SEO tool API
      const mockKeywords: KeywordTracking[] = [
        {
          keyword: 'AI tools for developers',
          position: 3,
          previousPosition: 5,
          searchVolume: 12400,
          difficulty: 68,
          url: '/blog/ai-tools-developers',
          trend: 'up'
        },
        {
          keyword: 'best AI writing tools',
          position: 7,
          previousPosition: 6,
          searchVolume: 8900,
          difficulty: 72,
          url: '/blog/best-ai-writing-tools',
          trend: 'down'
        },
        {
          keyword: 'AI content creation software',
          position: 12,
          previousPosition: 12,
          searchVolume: 5600,
          difficulty: 65,
          url: '/blog/ai-content-creation-software',
          trend: 'stable'
        },
        {
          keyword: 'machine learning tools comparison',
          position: 5,
          previousPosition: 8,
          searchVolume: 7800,
          difficulty: 70,
          url: '/blog/machine-learning-tools-comparison',
          trend: 'up'
        },
        {
          keyword: 'AI automation for business',
          position: 9,
          previousPosition: 11,
          searchVolume: 10200,
          difficulty: 75,
          url: '/blog/ai-automation-business',
          trend: 'up'
        }
      ];
      setKeywordTracking(mockKeywords);
    } catch (error) {
      console.error('Error fetching keyword tracking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'text-green-600 bg-green-100';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>SEO Dashboard - AI Vault</title>
        <meta name="description" content="Comprehensive SEO monitoring and optimization dashboard" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
            <p className="mt-2 text-gray-600">Monitor and optimize your SEO performance in real-time</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {(['overview', 'content', 'keywords', 'technical'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    selectedTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Overview Tab */}
          {selectedTab === 'overview' && metrics && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Overall SEO Score</h3>
                  <p className={`text-3xl font-bold ${getScoreColor(metrics.overallScore)}`}>
                    {metrics.overallScore}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Overall performance</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Organic Visibility</h3>
                  <p className="text-3xl font-bold text-blue-600">{metrics.searchVisibility.organic}%</p>
                  <p className="text-sm text-gray-600 mt-1">Search visibility score</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Featured Snippets</h3>
                  <p className="text-3xl font-bold text-green-600">{metrics.searchVisibility.featuredSnippets}</p>
                  <p className="text-sm text-gray-600 mt-1">Active snippets</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Page Views</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {metrics.contentPerformance.pageViews.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Total page views</p>
                </div>
              </div>

              {/* SEO Scores Breakdown */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Scores Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Readability', score: metrics.readabilityScore },
                    { label: 'Keyword Density', score: metrics.keywordDensity },
                    { label: 'Semantic Relevance', score: metrics.semanticRelevance },
                    { label: 'Answer Intent', score: metrics.answerIntent },
                    { label: 'Technical SEO', score: metrics.technicalSEO },
                    { label: 'Voice Search', score: metrics.voiceSearchScore },
                    { label: 'E-E-A-T', score: metrics.eeatScore }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{item.label}</span>
                          <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>
                            {item.score}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.score >= 90 ? 'bg-green-500' : item.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${item.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Web Vitals */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Largest Contentful Paint</h4>
                    <p className={`text-2xl font-bold ${metrics.coreWebVitals.lcp <= 2.5 ? 'text-green-600' : 'text-red-600'}`}>
                      {metrics.coreWebVitals.lcp}s
                    </p>
                    <p className="text-sm text-gray-600">Target: &lt;2.5s</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">First Input Delay</h4>
                    <p className={`text-2xl font-bold ${metrics.coreWebVitals.fid <= 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {metrics.coreWebVitals.fid}ms
                    </p>
                    <p className="text-sm text-gray-600">Target: &lt;100ms</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Cumulative Layout Shift</h4>
                    <p className={`text-2xl font-bold ${metrics.coreWebVitals.cls <= 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                      {metrics.coreWebVitals.cls}
                    </p>
                    <p className="text-sm text-gray-600">Target: &lt;0.1</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Audit Tab */}
          {selectedTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Content Audit</h3>
                  <p className="text-sm text-gray-600">Review and optimize your content for better SEO performance</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Content
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          SEO Score
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contentAudit.map((content) => (
                        <tr key={content.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{content.title}</div>
                              <div className="text-sm text-gray-500">{content.url}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`text-lg font-bold ${getScoreColor(content.seoScore)}`}>
                                {content.seoScore}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(content.status)}`}>
                              {content.status.replace('-', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(content.lastUpdated).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-green-600 hover:text-green-900">Optimize</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Content Issues */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {contentAudit.filter(c => c.issues.length > 0).map((content) => (
                  <div key={content.id} className="bg-white p-6 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900 mb-3">{content.title}</h4>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-red-600">Issues:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {content.issues.map((issue, index) => (
                          <li key={index} className="text-sm text-gray-600">{issue}</li>
                        ))}
                      </ul>
                      <h5 className="text-sm font-medium text-green-600 mt-3">Recommendations:</h5>
                      <ul className="list-disc list-inside space-y-1">
                        {content.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords Tab */}
          {selectedTab === 'keywords' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Keyword Tracking</h3>
                  <p className="text-sm text-gray-600">Monitor your keyword rankings and performance</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Keyword
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Position
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trend
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Search Volume
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Difficulty
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          URL
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {keywordTracking.map((keyword, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {keyword.keyword}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-lg font-bold text-gray-900">{keyword.position}</span>
                              {keyword.previousPosition !== keyword.position && (
                                <span className="ml-2 text-sm text-gray-500">
                                  ({keyword.previousPosition})
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-lg font-bold ${getTrendColor(keyword.trend)}`}>
                              {getTrendIcon(keyword.trend)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {keyword.searchVolume.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-1 mr-2">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      keyword.difficulty <= 30 ? 'bg-green-500' : 
                                      keyword.difficulty <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${keyword.difficulty}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="text-sm text-gray-900">{keyword.difficulty}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                            {keyword.url}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Technical SEO Tab */}
          {selectedTab === 'technical' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sitemap Status */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sitemap Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Main Sitemap</span>
                      <span className="text-sm font-medium text-green-600">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Image Sitemap</span>
                      <span className="text-sm font-medium text-green-600">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">News Sitemap</span>
                      <span className="text-sm font-medium text-green-600">✓ Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Submitted</span>
                      <span className="text-sm text-gray-900">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">URLs Indexed</span>
                      <span className="text-sm text-gray-900">1,247 / 1,250</span>
                    </div>
                  </div>
                </div>

                {/* IndexNow Status */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">IndexNow Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">API Key</span>
                      <span className="text-sm font-medium text-green-600">✓ Configured</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Last Notification</span>
                      <span className="text-sm text-gray-900">30 minutes ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="text-sm text-gray-900">98%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Search Engines</span>
                      <span className="text-sm text-gray-900">5 connected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Notifications Sent</span>
                      <span className="text-sm text-gray-900">247 today</span>
                    </div>
                  </div>
                </div>

                {/* Structured Data */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Structured Data</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Article Schema</span>
                      <span className="text-sm font-medium text-green-600">✓ Valid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">FAQ Schema</span>
                      <span className="text-sm font-medium text-green-600">✓ Valid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Breadcrumb Schema</span>
                      <span className="text-sm font-medium text-green-600">✓ Valid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Organization Schema</span>
                      <span className="text-sm font-medium text-green-600">✓ Valid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Schemas</span>
                      <span className="text-sm text-gray-900">12 active</span>
                    </div>
                  </div>
                </div>

                {/* Crawl Budget */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Crawl Budget</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Daily Crawl Limit</span>
                      <span className="text-sm text-gray-900">500 pages</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Crawled Today</span>
                      <span className="text-sm text-gray-900">342 pages</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Crawl Success Rate</span>
                      <span className="text-sm text-gray-900">99.2%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Avg Response Time</span>
                      <span className="text-sm text-gray-900">245ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Crawl Errors</span>
                      <span className="text-sm text-red-600">2 pages</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SEODashboard;
