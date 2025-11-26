import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const MLModelVersioning = () => {
  // Versioning Strategies
  const versioningStrategies = [
    {
      name: 'Semantic Versioning (SemVer)',
      format: 'MAJOR.MINOR.PATCH',
      description: 'Standard versioning scheme for software',
      whenToUse: 'Stable model releases, production deployments',
      example: '2.1.0',
      pros: [
        'Widely understood',
        'Clear compatibility rules',
        'Works well with dependency management'
      ],
      cons: [
        'May not capture ML-specific changes',
        'Can be ambiguous for experimental models'
      ]
    },
    {
      name: 'Date-Based Versioning',
      format: 'YYYY.MM.DD[.REVISION]',
      description: 'Version based on release date',
      whenToUse: 'Frequently updated models, time-sensitive applications',
      example: '2025.04.11.2',
      pros: [
        'Intuitive timeline',
        'Easy to find latest version',
        'Works well for scheduled updates'
      ],
      cons: [
        'No built-in compatibility info',
        'Can be confusing with multiple daily releases'
      ]
    },
    {
      name: 'Hash-Based Versioning',
      format: 'GIT_COMMIT_HASH',
      description: 'Version tied to source control commit',
      whenToUse: 'Development, CI/CD pipelines, research',
      example: 'a1b2c3d',
      pros: [
        'Direct link to source code',
        'Guaranteed uniqueness',
        'Reproducibility'
      ],
      cons: [
        'Not human-readable',
        'No semantic meaning'
      ]
    },
    {
      name: 'Hybrid Approach',
      format: 'SEMVER+HASH or DATE+HASH',
      description: 'Combines semantic/date with hash',
      whenToUse: 'Balancing traceability and semantics',
      example: '2.1.0+a1b2c3d',
      pros: [
        'Best of both worlds',
        'Traceable to source',
        'Human-friendly with technical details'
      ],
      cons: [
        'Slightly more complex',
        'Longer version strings'
      ]
    }
  ];

  // Metadata Standards
  const metadataStandards = {
    required: [
      'model_id',
      'version',
      'created_date',
      'author',
      'framework',
      'framework_version',
      'training_dataset',
      'metrics',
      'hyperparameters',
      'signature'
    ],
    recommended: [
      'description',
      'tags',
      'training_metrics',
      'validation_metrics',
      'test_metrics',
      'dependencies',
      'environment',
      'license',
      'references',
      'model_card'
    ],
    custom: [
      'business_impact',
      'fairness_metrics',
      'explainability_info',
      'deployment_instructions',
      'monitoring_setup',
      'retraining_policy'
    ]
  };

  // Experiment Tracking Components
  const experimentTracking = {
    dataVersioning: [
      'Raw data hashes',
      'Preprocessing code and parameters',
      'Feature engineering pipelines',
      'Train/validation/test splits',
      'Data augmentation details'
    ],
    modelTraining: [
      'Code version',
      'Hyperparameters',
      'Random seeds',
      'Training metrics over time',
      'Hardware configuration',
      'Training duration',
      'Early stopping criteria',
      'Checkpoints'
    ],
    evaluation: [
      'Evaluation metrics',
      'Confusion matrices',
      'ROC/AUC curves',
      'Error analysis',
      'Bias/fairness metrics',
      'Explainability reports'
    ],
    environment: [
      'Docker images',
      'Package versions',
      'System libraries',
      'GPU/CPU info',
      'Environment variables'
    ]
  };

  // Tools Comparison
  const toolsComparison = [
    {
      name: 'MLflow',
      type: 'Open Source',
      features: [
        'Experiment tracking',
        'Model registry',
        'Model packaging',
        'Deployment'
      ],
      strengths: 'Comprehensive, framework-agnostic',
      limitations: 'Basic UI, requires additional setup for teams'
    },
    {
      name: 'Weights & Biases',
      type: 'SaaS/On-prem',
      features: [
        'Experiment tracking',
        'Model registry',
        'Visualization',
        'Collaboration tools'
      ],
      strengths: 'Beautiful UI, powerful visualization',
      limitations: 'Pricing can scale with usage'
    },
    {
      name: 'DVC (Data Version Control)',
      type: 'Open Source',
      features: [
        'Data versioning',
        'Pipeline management',
        'Experiment management',
        'Git integration'
      ],
      strengths: 'Great for data versioning',
      limitations: 'Steeper learning curve'
    },
    {
      name: 'Neptune.ai',
      type: 'SaaS/On-prem',
      features: [
        'Experiment tracking',
        'Model registry',
        'Metadata store',
        'Team collaboration'
      ],
      strengths: 'Flexible metadata structure',
      limitations: 'Cost at scale'
    },
    {
      name: 'Custom Solution',
      type: 'Self-built',
      features: [
        'Fully customizable',
        'Tailored to needs',
        'No vendor lock-in',
        'Direct integration'
      ],
      strengths: 'Complete control',
      limitations: 'Maintenance overhead'
    }
  ];

  // Implementation Patterns
  const implementationPatterns = [
    {
      pattern: 'Centralized Model Registry',
      description: 'Single source of truth for all models',
      components: [
        'Versioned model storage',
        'Metadata database',
        'Access control',
        'API for model serving'
      ],
      useWhen: 'Multiple teams, production environment'
    },
    {
      pattern: 'Git-based Versioning',
      description: 'Leverage Git for version control',
      components: [
        'Git LFS for large files',
        'Git tags for releases',
        'GitHub/GitLab CI/CD integration',
        'Pull request workflows'
      ],
      useWhen: 'Small teams, open-source projects'
    },
    {
      pattern: 'Feature Store Integration',
      description: 'Tight coupling with feature pipelines',
      components: [
        'Feature versioning',
        'Model-feature lineage',
        'Point-in-time correctness',
        'Training-serving consistency'
      ],
      useWhen: 'Feature-heavy ML systems'
    },
    {
      pattern: 'Container-based Deployment',
      description: 'Versioned containers for deployment',
      components: [
        'Docker images',
        'Container registry',
        'Orchestration (Kubernetes)',
        'Canary deployments'
      ],
      useWhen: 'Microservices architecture, cloud-native'
    }
  ];

  // Case Study
  const caseStudy = {
    company: 'Enterprise AI Platform (2025)',
    challenge: 'Managing thousands of model versions across multiple teams',
    solution: 'Implemented a unified model versioning and experiment tracking system',
    implementation: {
      architecture: [
        'Centralized model registry',
        'GitOps workflow',
        'Automated versioning',
        'Metadata catalog',
        'Access controls'
      ],
      metrics: [
        'Model performance over versions',
        'Deployment frequency',
        'Rollback rate',
        'Time to production',
        'Experiment success rate'
      ],
      automation: [
        'CI/CD integration',
        'Automated testing',
        'Model validation',
        'Documentation generation'
      ]
    },
    results: [
      '75% reduction in model deployment time',
      '90% reduction in versioning errors',
      'Full audit trail for compliance',
      'Improved collaboration across teams',
      'Faster incident resolution'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>ML Model Versioning and Experiment Tracking: Best Practices for 2025 | AI Vault</title>
        <meta name="description" content="Comprehensive guide to ML model versioning and experiment tracking. Learn best practices, tools, and implementation patterns for managing ML model lifecycle in production." />
        <meta name="keywords" content="ML model versioning, experiment tracking, MLOps, model registry, ML metadata, model management, AI version control, ML reproducibility" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="ML Model Versioning and Experiment Tracking: Best Practices for 2025" />
        <meta property="og:description" content="Learn how to effectively version ML models and track experiments to ensure reproducibility, traceability, and collaboration in your ML projects." />
        <meta property="og:url" content="https://aivault.ai/blog/ml-model-versioning-2025" />
        <meta property="og:image" content="https://aivault.ai/images/ml-model-versioning-2025.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ML Model Versioning and Experiment Tracking" />
        <meta name="twitter:description" content="Best practices for versioning ML models and tracking experiments in 2025. Ensure reproducibility and collaboration in your ML projects." />
        <meta name="twitter:image" content="https://aivault.ai/images/ml-model-versioning-2025-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://aivault.ai/blog/ml-model-versioning-2025" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "ML Model Versioning and Experiment Tracking: Best Practices for 2025",
            "description": "Comprehensive guide to ML model versioning and experiment tracking. Learn best practices, tools, and implementation patterns for managing ML model lifecycle in production.",
            "author": {
              "@type": "Organization",
              "name": "AI Vault",
              "url": "https://aivault.ai"
            },
            "datePublished": "2025-04-11",
            "image": "https://aivault.ai/images/ml-model-versioning-2025.jpg",
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
              "@id": "https://aivault.ai/blog/ml-model-versioning-2025"
            }
          })}
        </script>
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose lg:prose-xl max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              ML Model Versioning and Experiment Tracking: Best Practices for 2025
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>By AI Vault MLOps Team</span>
              <span className="mx-2">•</span>
              <time dateTime="2025-04-11">April 11, 2025</time>
              <span className="mx-2">•</span>
              <span>28 min read</span>
            </div>
          </header>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
            <div className="px-4 py-5 sm:px-6 bg-indigo-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Executive Summary</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-600">
                Key insights into ML model versioning and experiment tracking
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Key Challenge</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Managing model versions and experiments at scale
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Solution</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Comprehensive versioning strategy with experiment tracking
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Key Benefit</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Reproducibility, traceability, and collaboration in ML projects
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Versioning Strategies</h2>
            <p className="text-gray-700 mb-6">
              Choosing the right versioning strategy is crucial for managing ML models effectively. 
              Here are the most common approaches used in 2025:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {versioningStrategies.map((strategy, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{strategy.name}</h3>
                  <div className="mb-4">
                    <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                      {strategy.format}
                    </span>
                    <span className="text-sm text-gray-500">Example: {strategy.example}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">When to use:</h4>
                    <p className="text-sm text-gray-700">{strategy.whenToUse}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Pros</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {strategy.pros.map((pro, i) => (
                          <li key={`pro-${index}-${i}`} className="text-green-600">{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Cons</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {strategy.cons.map((con, i) => (
                          <li key={`con-${index}-${i}`} className="text-red-600">{con}</li>
                        ))}
                      </ul>
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
                    <span className="font-medium">Pro Tip:</span> Consider using a hybrid approach that combines 
                    semantic versioning with commit hashes (e.g., <code>1.0.0+a1b2c3d</code>) to get the best of 
                    both human-readable versions and precise commit references.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Metadata Standards</h2>
            <p className="text-gray-700 mb-6">
              Comprehensive metadata is essential for model versioning. Here's what to track for each model version:
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Required Metadata</h3>
                  <ul className="space-y-2">
                    {metadataStandards.required.map((item, i) => (
                      <li key={`req-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Metadata</h3>
                  <ul className="space-y-2">
                    {metadataStandards.recommended.map((item, i) => (
                      <li key={`rec-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Custom Metadata</h3>
                  <ul className="space-y-2">
                    {metadataStandards.custom.map((item, i) => (
                      <li key={`custom-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
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
                      <span className="font-medium">Metadata Tip:</span> Use a consistent schema for your metadata 
                      and validate it automatically as part of your CI/CD pipeline. Consider using JSON Schema 
                      or Protobuf for defining and validating your metadata structure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Experiment Tracking</h2>
            <p className="text-gray-700 mb-6">
              Effective experiment tracking goes beyond just versioning models. Here's what to track for 
              complete experiment reproducibility:
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Versioning</h3>
                  <ul className="space-y-2">
                    {experimentTracking.dataVersioning.map((item, i) => (
                      <li key={`data-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Model Training</h3>
                  <ul className="space-y-2">
                    {experimentTracking.modelTraining.map((item, i) => (
                      <li key={`train-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Evaluation</h3>
                  <ul className="space-y-2">
                    {experimentTracking.evaluation.map((item, i) => (
                      <li key={`eval-${i}`} className="flex items-start">
                        <svg className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Environment</h3>
                  <ul className="space-y-2">
                    {experimentTracking.environment.map((item, i) => (
                      <li key="env-${i}" className="flex items-start">
                        <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-md border-l-4 border-indigo-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-indigo-700">
                    <span className="font-medium">Experiment Tracking Tip:</span> Automate as much of the 
                    experiment tracking as possible. Use decorators or context managers to automatically 
                    capture parameters, metrics, and artifacts. This reduces manual errors and ensures 
                    consistent tracking across all experiments.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Tools Comparison</h2>
            <p className="text-gray-700 mb-6">
              The ML tooling landscape has evolved significantly. Here's how the top tools for model 
              versioning and experiment tracking compare in 2025:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tool</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Features</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strengths</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Limitations</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {toolsComparison.map((tool, i) => (
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
                      <td className="px-6 py-4 text-sm text-gray-500">{tool.strengths}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{tool.limitations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 bg-green-50 p-4 rounded-md border-l-4 border-green-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Tool Selection Tip:</span> Choose tools that integrate well with your 
                    existing stack. For small teams, start with MLflow or Weights & Biases. For larger organizations, 
                    consider enterprise solutions with advanced access controls and compliance features.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Implementation Patterns</h2>
            <p className="text-gray-700 mb-6">
              Different organizations have different needs. Here are common implementation patterns 
              for model versioning and experiment tracking:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {implementationPatterns.map((pattern, i) => (
                <div key={`pattern-${i}`} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{pattern.pattern}</h3>
                  <p className="text-gray-600 mb-4">{pattern.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Key Components:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {pattern.components.map((component, j) => (
                        <li key={`comp-${i}-${j}`}>{component}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Use when: {pattern.useWhen}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Case Study: Enterprise AI Platform</h2>
            
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
                          <h4 className="font-medium text-gray-800 mb-2">Architecture</h4>
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.implementation.architecture.map((component, i) => (
                              <span key={`arch-${i}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {component}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Metrics Tracked</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {caseStudy.implementation.metrics.map((metric, i) => (
                              <li key={`metric-${i}`} className="text-sm text-gray-700">{metric}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-800 mb-2">Automation</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {caseStudy.implementation.automation.map((item, i) => (
                              <li key={`auto-${i}`} className="text-sm text-gray-700">{item}</li>
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
                  <h4 className="font-medium text-gray-800 mb-2">1. Start Simple, Scale Gradually</h4>
                  <p className="text-gray-700 text-sm">
                    Begin with basic versioning and add complexity as needed. Over-engineering 
                    early can slow down development without providing immediate value.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">2. Automate Everything</h4>
                  <p className="text-gray-700 text-sm">
                    Manual processes don't scale. Automate versioning, testing, and deployment 
                    to reduce errors and save time.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">3. Build for Collaboration</h4>
                  <p className="text-gray-700 text-sm">
                    Design your versioning system with team collaboration in mind. Clear naming 
                    conventions and access controls are essential.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">4. Plan for the Future</h4>
                  <p className="text-gray-700 text-sm">
                    Choose solutions that can grow with your needs. Consider scalability, 
                    performance, and extensibility from the start.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Best Practices for 2025</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Implement Git-like Workflows</h3>
                  <p className="text-gray-700">
                    Adapt software engineering best practices for ML:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Use branches for experiments and features</li>
                    <li>Implement pull/merge requests for model changes</li>
                    <li>Require code reviews for production models</li>
                    <li>Use tags for releases and important versions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Automate Model Packaging</h3>
                  <p className="text-gray-700">
                    Create consistent, reproducible model packages:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Include all dependencies (code, data, environment)</li>
                    <li>Use containerization (Docker) for environment consistency</li>
                    <li>Generate model cards and documentation automatically</li>
                    <li>Sign model artifacts for security</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Monitor Model Performance</h3>
                  <p className="text-gray-700">
                    Track how models perform in production:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Set up automated monitoring for data drift and model decay</li>
                    <li>Track business metrics alongside model metrics</li>
                    <li>Implement A/B testing for model updates</li>
                    <li>Set up alerts for performance degradation</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Enforce Governance and Compliance</h3>
                  <p className="text-gray-700">
                    Ensure models meet organizational and regulatory requirements:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Implement access controls and audit logs</li>
                    <li>Document model decisions and limitations</li>
                    <li>Track data lineage and model provenance</li>
                    <li>Support model explainability and interpretability</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Plan for Model Retirement</h3>
                  <p className="text-gray-700">
                    Have a strategy for end-of-life models:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Define retention policies for models and artifacts</li>
                    <li>Archive deprecated models with proper documentation</li>
                    <li>Monitor for dependencies on retired models</li>
                    <li>Plan for data retention and privacy requirements</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 bg-purple-50 p-4 rounded-md border-l-4 border-purple-400">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 01.287.404 1 1 0 00.658.566l2.42.647a1 1 0 11-.525 1.924l-2.42-.647a3 3 0 01-1.972-1.697l-1.037-2.446-3.306 1.416a1 1 0 01-.788-1.838l7-3z" />
                      <path d="M5.89 14.25l3.5-1.5a1 1 0 01.64-.2l3.8.38-4.22-1.25a1 1 0 01-.28-1.831l5.5-2.5a1 1 0 011.33.5l1.5 3.5a1 1 0 11-1.84.79l-1.07-2.5-4.28 1.945 1.13 2.664a1 1 0 11-.92 1.39l-3.5-.5a1 1 0 01-.83-1.148l.5-3.5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      <span className="font-medium">Pro Tip:</span> Implement a "model card" for each version that 
                      documents its purpose, training data, intended use, limitations, and performance characteristics. 
                      This practice improves model transparency and makes it easier for team members to understand 
                      and work with different model versions.
                    </p>
                  </div>
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

export default MLModelVersioning;
