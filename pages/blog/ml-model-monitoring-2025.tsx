import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const MLModelMonitoring = () => {
  // Types of Drift
  const driftTypes = [
    {
      type: 'Data Drift',
      description: 'Change in the distribution of input features',
      causes: [
        'Changes in data collection',
        'Seasonal variations',
        'Upstream data pipeline changes',
        'Population shifts'
      ],
      detection: 'Statistical tests (KS, PSI), Distribution monitoring',
      impact: 'Degraded model performance over time'
    },
    {
      type: 'Concept Drift',
      description: 'Change in the relationship between features and target',
      causes: [
        'Changes in user behavior',
        'Market conditions',
        'External events',
        'Policy changes'
      ],
      detection: 'Performance metrics, Error rate monitoring, Concept similarity',
      impact: 'Model becomes less accurate or relevant'
    },
    {
      type: 'Label Drift',
      description: 'Change in the distribution of target variables',
      causes: [
        'Changes in labeling criteria',
        'Shifts in ground truth',
        'Annotation errors',
        'Data sampling changes'
      ],
      detection: 'Target distribution monitoring, Label consistency checks',
      impact: 'Biased predictions, Incorrect model updates'
    },
    {
      type: 'Upstream Data Issues',
      description: 'Problems with input data quality',
      causes: [
        'Sensor failures',
        'Data pipeline bugs',
        'Schema changes',
        'Missing values'
      ],
      detection: 'Data quality checks, Schema validation, Missing value monitoring',
      impact: 'Model failures, Incorrect predictions'
    }
  ];

  // Monitoring Metrics
  const monitoringMetrics = {
    dataQuality: [
      'Missing values',
      'Data type consistency',
      'Value ranges',
      'Cardinality changes',
      'Schema validation'
    ],
    performance: [
      'Accuracy/Precision/Recall',
      'F1 Score/AUC-ROC',
      'Prediction latency',
      'Throughput',
      'Error rates'
    ],
    statistical: [
      'Feature distributions',
      'Covariate shift',
      'PSI (Population Stability Index)',
      'KS Test',
      'KL Divergence'
    ],
    business: [
      'Business KPIs',
      'User engagement',
      'Conversion rates',
      'Customer feedback',
      'A/B test results'
    ]
  };

  // Monitoring Tools
  const monitoringTools = [
    {
      name: 'Evidently AI',
      type: 'Open Source',
      features: ['Data drift', 'Data quality', 'Target drift', 'Performance'],
      integrations: ['MLflow', 'Airflow', 'Kubeflow'],
      bestFor: 'Teams needing comprehensive drift detection'
    },
    {
      name: 'Aporia',
      type: 'SaaS',
      features: ['Real-time monitoring', 'Root cause analysis', 'Custom metrics'],
      integrations: ['AWS SageMaker', 'Azure ML', 'GCP Vertex AI'],
      bestFor: 'Enterprise ML monitoring'
    },
    {
      name: 'Arize',
      type: 'SaaS',
      features: ['Embedding analysis', 'NLP monitoring', 'Computer vision'],
      integrations: ['PyTorch', 'TensorFlow', 'Hugging Face'],
      bestFor: 'Deep learning models'
    },
    {
      name: 'Fiddler',
      type: 'SaaS',
      features: ['Model explainability', 'Bias detection', 'Drift analysis'],
      integrations: ['Kubernetes', 'AWS', 'Azure', 'GCP'],
      bestFor: 'Governance and compliance'
    },
    {
      name: 'Custom Solution',
      type: 'Self-built',
      features: ['Fully customizable', 'Tailored to needs', 'No vendor lock-in'],
      components: ['Prometheus', 'Grafana', 'ELK Stack', 'Custom scripts'],
      bestFor: 'Teams with specific requirements'
    }
  ];

  // Alerting Strategy
  const alertingStrategy = {
    severityLevels: [
      {
        level: 'Critical',
        condition: 'Model failure or severe degradation',
        response: 'Immediate rollback, Team paged',
        examples: ['Model API down', 'Prediction errors > 10%']
      },
      {
        level: 'High',
        condition: 'Significant performance drop',
        response: 'Investigate within 1 hour',
        examples: ['Accuracy drop > 5%', 'High drift detected']
      },
      {
        level: 'Medium',
        condition: 'Moderate drift or degradation',
        response: 'Review during business hours',
        examples: ['Feature drift detected', 'Slight performance decrease']
      },
      {
        level: 'Low',
        condition: 'Informational or minor issues',
        response: 'Weekly review',
        examples: ['New category in categorical feature', 'Minor data quality issues']
      }
    ],
    notificationChannels: ['Email', 'Slack', 'PagerDuty', 'Microsoft Teams'],
    alertSuppression: {
      timeWindows: 'Non-business hours',
      maintenanceWindows: 'Scheduled updates',
      rateLimiting: 'Prevent alert storms'
    }
  };

  // Case Study
  const caseStudy = {
    company: 'Global FinTech Platform (2025)',
    challenge: 'Detecting and responding to model drift in real-time for fraud detection',
    solution: 'Implemented a comprehensive ML monitoring system with automated retraining',
    implementation: {
      architecture: [
        'Real-time feature store',
        'Model serving layer',
        'Monitoring service',
        'Automated retraining pipeline',
        'Human-in-the-loop validation'
      ],
      metrics: [
        'Transaction patterns (mean, std dev)',
        'Feature importance shifts',
        'Prediction confidence scores',
        'False positive/negative rates',
        'Business metrics (fraud capture rate)'
      ],
      alerting: [
        'Real-time alerts for significant drift',
        'Daily digest reports',
        'Automated root cause analysis',
        'Retraining triggers'
      ]
    },
    results: [
      '40% reduction in fraud losses',
      '60% faster detection of model degradation',
      '80% reduction in false positives',
      'Automated retraining reduced manual effort by 70%',
      '99.99% system availability'
    ]
  };

  // Implementation Checklist
  const implementationChecklist = [
    {
      phase: 'Planning',
      items: [
        'Define key metrics and thresholds',
        'Establish baseline performance',
        'Set up monitoring infrastructure',
        'Define alerting strategy'
      ]
    },
    {
      phase: 'Implementation',
      items: [
        'Instrument model with monitoring',
        'Set up data quality checks',
        'Configure drift detection',
        'Implement logging and tracing'
      ]
    },
    {
      phase: 'Deployment',
      items: [
        'Deploy monitoring dashboards',
        'Set up alerting channels',
        'Test alerting workflow',
        'Document runbooks'
      ]
    },
    {
      phase: 'Operations',
      items: [
        'Regularly review alerts',
        'Update baseline as needed',
        'Refine thresholds',
        'Continuously improve monitoring'
      ]
    }
  ];

  // Future Trends
  const futureTrends = [
    {
      trend: 'Automated Root Cause Analysis',
      description: 'AI-powered diagnosis of model issues',
      impact: 'Faster resolution of production issues',
      timeline: '2025-2026'
    },
    {
      trend: 'Causal Inference for Drift',
      description: 'Understanding why drift occurs',
      impact: 'More targeted model updates',
      timeline: '2026-2027'
    },
    {
      trend: 'Federated Monitoring',
      description: 'Privacy-preserving monitoring across organizations',
      impact: 'Better benchmarks and early warnings',
      timeline: '2026-2028'
    },
    {
      trend: 'Self-Healing Models',
      description: 'Automatic adaptation to drift',
      impact: 'Reduced manual intervention',
      timeline: '2027-2028'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>ML Model Monitoring and Drift Detection in Production | AI Vault</title>
        <meta name="description" content="Comprehensive guide to monitoring machine learning models in production. Learn about drift detection, monitoring strategies, alerting, and automated remediation for reliable ML systems." />
        <meta name="keywords" content="ML monitoring, model drift, data drift, concept drift, model performance, ML observability, model deployment, MLOps, AI monitoring, production ML" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ML Model Monitoring and Drift Detection in Production" />
        <meta property="og:description" content="Learn how to effectively monitor machine learning models in production, detect drift, and maintain model performance over time with modern MLOps practices." />
        <meta property="og:url" content="https://aivault.ai/blog/ml-model-monitoring-2025" />
        <meta property="og:image" content="https://aivault.ai/images/ml-model-monitoring-2025.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ML Model Monitoring and Drift Detection" />
        <meta name="twitter:description" content="Comprehensive guide to monitoring ML models in production. Learn about drift detection, monitoring strategies, and maintaining model performance." />
        <meta name="twitter:image" content="https://aivault.ai/images/ml-model-monitoring-2025-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://aivault.ai/blog/ml-model-monitoring-2025" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "ML Model Monitoring and Drift Detection in Production",
            "description": "Comprehensive guide to monitoring machine learning models in production. Learn about drift detection, monitoring strategies, alerting, and automated remediation for reliable ML systems.",
            "author": {
              "@type": "Organization",
              "name": "AI Vault",
              "url": "https://aivault.ai"
            },
            "datePublished": "2025-04-10",
            "image": "https://aivault.ai/images/ml-model-monitoring-2025.jpg",
            "publisher": {
              "@type": "Organization",
              "name": "AI Vault",
              "logo": {
                "@type": "ImageObject",
                "url": "https://aivault.ai/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://aivault.ai/blog/ml-model-monitoring-2025"
            }
          })}
        </script>
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose lg:prose-xl max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              ML Model Monitoring and Drift Detection in Production
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>By AI Vault MLOps Team</span>
              <span className="mx-2">•</span>
              <time dateTime="2025-04-10">April 10, 2025</time>
              <span className="mx-2">•</span>
              <span>30 min read</span>
            </div>
          </header>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
            <div className="px-4 py-5 sm:px-6 bg-indigo-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Executive Summary</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-600">
                Key insights into ML model monitoring and drift detection
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Key Challenge</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Detecting and responding to model degradation in production
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Solution</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Comprehensive monitoring and automated drift detection
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Key Benefit</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Maintain model performance and reliability in production
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Understanding Model Drift</h2>
            <p className="text-gray-700 mb-6">
              Model drift occurs when the statistical properties of the target variable, the input data, 
              or the relationships between inputs and outputs change over time. Understanding the different 
              types of drift is essential for effective monitoring.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {driftTypes.map((drift, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{drift.type}</h3>
                  <p className="text-gray-600 mb-4">{drift.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Common Causes</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {drift.causes.map((cause, i) => (
                        <li key={`cause-${i}`} className="text-gray-700">{cause}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Detection</h4>
                      <p className="text-sm text-gray-700">{drift.detection}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Impact</h4>
                      <p className="text-sm text-gray-700">{drift.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">Pro Tip:</span> Not all drift requires immediate action. 
                    Focus on drift that impacts model performance or business outcomes. Implement a 
                    severity-based alerting system to prioritize responses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Monitoring Metrics and Signals</h2>
            <p className="text-gray-700 mb-6">
              Effective model monitoring requires tracking multiple dimensions of model behavior and performance. 
              Here are the key metrics and signals to monitor in production ML systems:
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Quality Metrics</h3>
                  <ul className="space-y-2">
                    {monitoringMetrics.dataQuality.map((metric, i) => (
                      <li key={`quality-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics</h3>
                  <ul className="space-y-2">
                    {monitoringMetrics.performance.map((metric, i) => (
                      <li key={`perf-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Statistical Metrics</h3>
                  <ul className="space-y-2">
                    {monitoringMetrics.statistical.map((metric, i) => (
                      <li key="stat-${i}" className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Metrics</h3>
                  <ul className="space-y-2">
                    {monitoringMetrics.business.map((metric, i) => (
                      <li key={`biz-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-md border-l-4 border-blue-400">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <span className="font-medium">Monitoring Tip:</span> Establish baseline metrics during model validation 
                      and set appropriate thresholds for alerts. Use moving windows (e.g., 1h, 24h, 7d) to detect both 
                      sudden and gradual changes in model behavior.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Monitoring Tools and Platforms</h2>
            <p className="text-gray-700 mb-6">
              The ML monitoring landscape has evolved significantly, with both open-source and commercial solutions 
              available. Here's a comparison of popular monitoring tools in 2025:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Features</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {monitoringTools.map((tool, i) => (
                    <tr key={`tool-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tool.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tool.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <ul className="list-disc pl-5 space-y-1">
                          {tool.features.map((feature, j) => (
                            <li key={`feature-${i}-${j}`}>{feature}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{tool.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h2a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-indigo-700">
                    <span className="font-medium">Tool Selection Tip:</span> Start with your specific needs. For small teams, 
                    begin with open-source solutions like Evidently or build a custom solution. As your ML operations grow, 
                    consider commercial platforms that offer more advanced features and support.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Alerting Strategy</h2>
            <p className="text-gray-700 mb-6">
              An effective alerting strategy ensures that the right people are notified about the right issues 
              at the right time, without causing alert fatigue. Here's a comprehensive approach to ML alerting:
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Severity Levels and Response</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Examples</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {alertingStrategy.severityLevels.map((level, i) => (
                      <tr key={`level-${i}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            level.level === 'Critical' ? 'bg-red-100 text-red-800' :
                            level.level === 'High' ? 'bg-orange-100 text-orange-800' :
                            level.level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {level.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{level.condition}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{level.response}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          <ul className="list-disc pl-5 space-y-1">
                            {Array.isArray(level.examples) ? (
                              level.examples.map((example, j) => (
                                <li key={`example-${i}-${j}`} className="text-xs">{example}</li>
                              ))
                            ) : (
                              <li className="text-xs">{level.examples}</li>
                            )}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Notification Channels</h3>
                  <div className="flex flex-wrap gap-2">
                    {alertingStrategy.notificationChannels.map((channel, i) => (
                      <span key={`channel-${i}`} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {channel}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Alert Suppression</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Time Windows:</strong> {alertingStrategy.alertSuppression.timeWindows}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span><strong>Maintenance Windows:</strong> {alertingStrategy.alertSuppression.maintenanceWindows}</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span><strong>Rate Limiting:</strong> {alertingStrategy.alertSuppression.rateLimiting}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    <span className="font-medium">Alerting Best Practice:</span> Start with conservative alerting thresholds 
                    and gradually refine them based on false positive rates. Use composite alerts that trigger only when 
                    multiple conditions are met to reduce noise. Regularly review and update alerting rules as your 
                    understanding of normal model behavior evolves.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Case Study: Real-time Fraud Detection</h2>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
              <div className="px-4 py-5 sm:px-6 bg-indigo-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{caseStudy.company}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  {caseStudy.challenge}
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Solution</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {caseStudy.solution}
                    </dd>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Implementation</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Architecture Components</h4>
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.implementation.architecture.map((component, i) => (
                              <span key={`arch-${i}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {component}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Monitored Metrics</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {caseStudy.implementation.metrics.map((metric, i) => (
                              <li key={`metric-${i}`} className="text-sm text-gray-700">{metric}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Alerting Strategy</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {caseStudy.implementation.alerting.map((alert, i) => (
                              <li key={`alert-${i}`} className="text-sm text-gray-700">{alert}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </dd>
                  </div>
                  
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Results</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="list-disc pl-5 space-y-2">
                        {caseStudy.results.map((result, i) => (
                          <li key={`result-${i}`} className="text-gray-700">
                            <span className="font-medium">{result.split(':')[0]}:</span> 
                            {result.split(':').slice(1).join(':')}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Learnings</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">1. Baseline Establishment</h4>
                  <p className="text-gray-700 text-sm">
                    Establishing accurate baselines during model validation was crucial. We learned to use 
                    multiple time windows (day, week, month) to account for different patterns in the data.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">2. Feature Importance Monitoring</h4>
                  <p className="text-gray-700 text-sm">
                    Monitoring changes in feature importance helped detect concept drift earlier than 
                    performance metrics alone. We implemented SHAP value tracking to identify which 
                    features were driving predictions over time.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">3. Automated Remediation</h4>
                  <p className="text-gray-700 text-sm">
                    For certain types of drift, we implemented automated remediation workflows that 
                    could trigger model retraining or fallback to previous model versions without 
                    human intervention.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">4. False Positive Reduction</h4>
                  <p className="text-gray-700 text-sm">
                    We significantly reduced false positives by implementing cooldown periods for alerts 
                    and requiring multiple signals to trigger critical alerts, which improved team 
                    responsiveness to real issues.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Implementation Checklist</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {implementationChecklist.map((phase, i) => (
                <div key={`phase-${i}`} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{phase.phase}</h3>
                  <ul className="space-y-3">
                    {phase.items.map((item, j) => (
                      <li key={`item-${i}-${j}`} className="flex items-start">
                        <input 
                          type="checkbox" 
                          id={`item-${i}-${j}`}
                          className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`item-${i}-${j}`} className="ml-3 block text-sm text-gray-700">
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Future Trends in ML Monitoring</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {futureTrends.map((trend, i) => (
                <div key={`trend-${i}`} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {trend.timeline}
                    </span>
                    <span className="text-sm text-gray-500">{trend.impact}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{trend.trend}</h3>
                  <p className="text-gray-700">{trend.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-green-50 p-4 rounded-md border-l-4 border-green-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Looking Ahead:</span> As ML systems become more complex and 
                    autonomous, monitoring will shift from detecting issues to predicting and preventing them. 
                    The integration of causal inference and automated root cause analysis will enable more 
                    proactive model maintenance and higher system reliability.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 AI Vault. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MLModelMonitoring;
