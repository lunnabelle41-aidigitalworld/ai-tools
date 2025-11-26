import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AIHardwareShowdown = () => {
  // Hardware Comparison Data
  const hardwareComparison = {
    'GPUs': {
      vendors: ['NVIDIA', 'AMD', 'Intel'],
      examples: [
        { name: 'NVIDIA H100', tflops: 120, memory: '80GB HBM3', power: '700W', bestFor: 'General DL training, CV, NLP' },
        { name: 'AMD MI300', tflops: 110, memory: '128GB HBM3', power: '750W', bestFor: 'HPC, Large models' },
        { name: 'Intel Gaudi3', tflops: 95, memory: '64GB HBM2e', power: '600W', bestFor: 'Enterprise AI workloads' }
      ],
      pros: [
        'Wide software support (CUDA, ROCm, oneAPI)',
        'Flexible for various workloads',
        'Large developer community',
        'Mature tooling and libraries'
      ],
      cons: [
        'Higher power consumption',
        'General-purpose architecture',
        'Can be expensive at scale'
      ]
    },
    'TPUs': {
      vendors: ['Google'],
      examples: [
        { name: 'TPU v5', tflops: 180, memory: '128GB HBM', power: '450W', bestFor: 'Large-scale Transformer models' },
        { name: 'TPU v4', tflops: 120, memory: '64GB HBM', power: '300W', bestFor: 'Production ML workloads' }
      ],
      pros: [
        'Optimized for matrix operations',
        'Lower power consumption',
        'Tight integration with Google Cloud',
        'Excellent for large batch sizes'
      ],
      cons: [
        'Limited to Google Cloud',
        'Less flexible for non-ML workloads',
        'Smaller developer community'
      ]
    },
    'Custom AI Chips': {
      vendors: ['Cerebras', 'Graphcore', 'SambaNova', 'Groq'],
      examples: [
        { name: 'Cerebras CS-3', tflops: 125, memory: '44GB On-chip', power: '23kW', bestFor: 'Extremely large models' },
        { name: 'Graphcore Bow', tflops: 350, memory: '900GB/s', power: '900W', bestFor: 'Sparse models, IPU-specific workloads' },
        { name: 'GroqChip', tflops: 1000, memory: '230GB/s', power: '300W', bestFor: 'Low-latency inference' }
      ],
      pros: [
        'Specialized for specific workloads',
        'Potential for better performance/Watt',
        'Innovative architectures',
        'Designed for future ML workloads'
      ],
      cons: [
        'Limited software ecosystem',
        'Higher risk of vendor lock-in',
        'Smaller community and resources'
      ]
    }
  };

  // Performance Benchmarks
  const benchmarks: Record<string, Record<string, number>> = {
    'ResNet-50 Training (images/sec)': {
      'NVIDIA H100': 3500,
      'AMD MI300': 3200,
      'TPU v5': 3800,
      'Cerebras CS-3': 4100,
      'Graphcore Bow': 2800
    },
    'GPT-3 175B Training (tokens/sec)': {
      'NVIDIA H100': 1200,
      'AMD MI300': 950,
      'TPU v5': 1800,
      'Cerebras CS-3': 2200,
      'Graphcore Bow': 1500
    },
    'Power Efficiency (samples/Joule)': {
      'NVIDIA H100': 5.0,
      'AMD MI300': 4.8,
      'TPU v5': 8.4,
      'Cerebras CS-3': 7.2,
      'Graphcore Bow': 6.5
    },
    'Cost per 1M Training Tokens ($)': {
      'NVIDIA H100': 0.85,
      'AMD MI300': 0.78,
      'TPU v5': 0.65,
      'Cerebras CS-3': 0.72,
      'Graphcore Bow': 0.82
    }
  };

  // Selection Guide
  const selectionGuide = [
    {
      useCase: 'Startups & Researchers',
      recommendation: 'Cloud GPUs (NVIDIA A100/H100)',
      reasoning: 'Best balance of flexibility, availability, and ecosystem support',
      cost: '$$',
      examples: ['Startup training medium models', 'Academic research', 'Prototyping']
    },
    {
      useCase: 'Enterprise Production',
      recommendation: 'TPUs or Cloud GPUs',
      reasoning: 'Reliable performance, good support, and predictable costs at scale',
      cost: '$$$',
      examples: ['Large-scale model training', 'Production inference', 'Enterprise AI services']
    },
    {
      useCase: 'Cutting-Edge Research',
      recommendation: 'Custom AI Chips (Cerebras, Graphcore)',
      reasoning: 'Specialized architectures for novel model architectures',
      cost: '$$$$',
      examples: ['Novel model architectures', 'Extremely large models', 'Specialized workloads']
    },
    {
      useCase: 'Edge & On-Device AI',
      recommendation: 'Specialized Edge Chips',
      reasoning: 'Power efficiency and low-latency requirements',
      cost: '$-$$',
      examples: ['Smartphones', 'IoT devices', 'Autonomous vehicles']
    }
  ];

  // Future Trends
  const futureTrends = [
    {
      trend: 'Chiplet Architectures',
      description: 'Modular designs combining specialized chiplets for different ML operations',
      impact: 'Better performance, lower costs, and more flexibility',
      timeline: '2025-2026'
    },
    {
      trend: 'Photonic Computing',
      description: 'Using light instead of electricity for faster, cooler computation',
      impact: 'Potential 100x speedup for specific workloads',
      timeline: '2026+'
    },
    {
      trend: 'Neuromorphic Chips',
      description: 'Hardware that mimics the human brain\'s neural structure',
      impact: 'Dramatically lower power consumption for AI workloads',
      timeline: '2025-2027'
    },
    {
      trend: 'Quantum AI Accelerators',
      description: 'Quantum processors for specific ML tasks',
      impact: 'Potential exponential speedup for optimization problems',
      timeline: '2027+'
    }
  ];

  // Case Study
  const caseStudy = {
    company: 'Leading AI Research Lab',
    challenge: 'Training foundation models with 1T+ parameters cost-effectively',
    solution: 'Hybrid approach using Cerebras CS-3 for pre-training and NVIDIA H100 for fine-tuning',
    results: [
      '50% reduction in training time compared to GPU-only approach',
      '40% lower cloud compute costs',
      'Enabled training of larger models with same budget',
      'Improved researcher productivity with faster iteration cycles'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>The AI Hardware Showdown: GPUs, TPUs, and Custom Chips for Deep Learning (2025) | AI Vault</title>
        <meta name="description" content="Comprehensive comparison of AI hardware in 2025. Learn about GPUs, TPUs, and custom AI chips for deep learning, with performance benchmarks, cost analysis, and selection guide." />
        <meta name="keywords" content="AI hardware, GPUs, TPUs, AI accelerators, deep learning hardware, NVIDIA, AMD, Google TPU, Cerebras, Graphcore, AI chip comparison, 2025" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="The AI Hardware Showdown 2025: GPUs vs TPUs vs Custom Chips" />
        <meta property="og:description" content="Comprehensive comparison of AI hardware options in 2025. Performance benchmarks, cost analysis, and selection guide for deep learning workloads." />
        <meta property="og:url" content="https://aivault.ai/blog/ai-hardware-showdown-2025" />
        <meta property="og:image" content="https://aivault.ai/images/ai-hardware-showdown-2025.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Hardware Showdown 2025: GPUs, TPUs & Custom Chips" />
        <meta name="twitter:description" content="Complete guide to AI hardware in 2025. Compare GPUs, TPUs, and custom AI chips with performance benchmarks and cost analysis for deep learning workloads." />
        <meta name="twitter:image" content="https://aivault.ai/images/ai-hardware-showdown-2025-twitter.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://aivault.ai/blog/ai-hardware-showdown-2025" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The AI Hardware Showdown: GPUs, TPUs, and Custom Chips for Deep Learning (2025)",
            "description": "Comprehensive comparison of AI hardware options in 2025. Performance benchmarks, cost analysis, and selection guide for deep learning workloads.",
            "author": {
              "@type": "Organization",
              "name": "AI Vault",
              "url": "https://aivault.ai"
            },
            "datePublished": "2025-04-05",
            "image": "https://aivault.ai/images/ai-hardware-showdown-2025.jpg",
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
              "@id": "https://aivault.ai/blog/ai-hardware-showdown-2025"
            }
          })}
        </script>
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose lg:prose-xl max-w-none">
          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              The AI Hardware Showdown: GPUs, TPUs, and Custom Chips for Deep Learning (2025)
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>By AI Vault Hardware Team</span>
              <span className="mx-2">•</span>
              <time dateTime="2025-04-05">April 5, 2025</time>
              <span className="mx-2">•</span>
              <span>25 min read</span>
            </div>
          </header>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
            <div className="px-4 py-5 sm:px-6 bg-indigo-50">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Executive Summary</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-600">
                Key insights for choosing AI hardware in 2025
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Best for General Use</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    NVIDIA H100 / AMD MI300 GPUs
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Best for Large-Scale Training</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Google TPU v5 / Cerebras CS-3
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Cost-Effective Choice</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                    Cloud-based TPUs for most workloads
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. AI Hardware Landscape in 2025</h2>
            
            <p className="mb-6">
              The AI hardware market has evolved significantly, with specialized architectures emerging for different 
              machine learning workloads. Here's an overview of the current landscape.
            </p>

            <div className="space-y-8">
              {Object.entries(hardwareComparison).map(([type, data]) => (
                <div key={type} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{type}</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Key Vendors</h4>
                    <div className="flex flex-wrap gap-2">
                      {data.vendors.map((vendor, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {vendor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6 overflow-x-auto">
                    <h4 className="font-medium text-gray-800 mb-3">Example Chips (2025)</h4>
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TFLOPS</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Power</th>
                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best For</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {data.examples.map((chip, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chip.name}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{chip.tflops} TFLOPS</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{chip.memory}</td>
                              <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{chip.power}</td>
                              <td className="px-3 py-4 text-sm text-gray-500">{chip.bestFor}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Advantages</h4>
                      <ul className="space-y-2">
                        {data.pros.map((pro, i) => (
                          <li key={`pro-${i}`} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Limitations</h4>
                      <ul className="space-y-2">
                        {data.cons.map((con, i) => (
                          <li key={`con-${i}`} className="flex items-start">
                            <svg className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="text-gray-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Performance Benchmarks</h2>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Comparative Performance (2025)</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  Performance metrics across different hardware platforms
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benchmark</th>
                        {Object.keys(benchmarks).length > 0 && Object.keys(benchmarks[Object.keys(benchmarks)[0]]).map((hardware) => (
                          <th key={hardware} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {hardware}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(benchmarks).map(([benchmark, results]) => (
                        <tr key={benchmark}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{benchmark}</td>
                          {Object.values(results).map((value, i) => (
                            <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {typeof value === 'number' 
                                ? value >= 1000 
                                  ? value.toLocaleString() 
                                  : value.toFixed(1)
                                : value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Benchmarking Notes</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>All benchmarks conducted with latest software stacks as of Q1 2025</li>
                      <li>Results may vary based on workload characteristics and optimizations</li>
                      <li>Power efficiency measured at full load</li>
                      <li>Cost estimates based on major cloud provider pricing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Hardware Selection Guide</h2>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Choosing the Right AI Hardware</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  Recommendations based on use case and requirements
                </p>
              </div>
              <div className="border-t border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Use Case</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reasoning</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectionGuide.map((item, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{item.useCase}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {item.examples.join(' • ')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                            {item.recommendation}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.reasoning}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              bg-green-100 text-green-800">
                              {item.cost}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Future Trends in AI Hardware</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {futureTrends.map((trend, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {trend.timeline}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{trend.trend}</h3>
                  <p className="text-gray-600 mb-3">{trend.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="font-medium">Impact:</span>
                    <span className="ml-2 text-gray-700">{trend.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Case Study: Large-Scale Model Training</h2>
            
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 bg-indigo-50">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{caseStudy.company}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-600">
                  {caseStudy.challenge}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Challenge</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {caseStudy.challenge}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Solution</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {caseStudy.solution}
                    </dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Results</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="list-disc pl-5 space-y-1">
                        {caseStudy.results.map((result, i) => (
                          <li key={i} className="text-gray-700">{result}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
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

export default AIHardwareShowdown;
