import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const BeyondRAG = () => {
  // Agentic search tools data
  const agenticTools = [
    {
      name: 'LangGraph',
      category: 'Agent Orchestration',
      description: 'Framework for building stateful, multi-actor applications with LLMs',
      features: [
        'Stateful agent workflows',
        'Multi-agent collaboration',
        'Built-in memory and tools',
        'Visual debugging'
      ],
      pricing: 'Open-source (Apache 2.0)',
      bestFor: 'Complex, multi-step agent systems',
      link: 'https://github.com/langchain-ai/langgraph'
    },
    {
      name: 'CrewAI',
      category: 'Multi-Agent Framework',
      description: 'Framework for orchestrating role-playing, autonomous AI agents',
      features: [
        'Role-based agent definitions',
        'Task delegation',
        'Built-in tools',
        'Process automation'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Business process automation',
      link: 'https://github.com/joaomdmoura/crewAI'
    },
    {
      name: 'AutoGen',
      category: 'Multi-Agent Framework',
      description: 'Microsoft\'s framework for creating multi-agent conversations',
      features: [
        'Customizable agents',
        'Seamless human participation',
        'Built-in agent capabilities',
        'Web UI for monitoring'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Research and enterprise applications',
      link: 'https://github.com/microsoft/autogen'
    },
    {
      name: 'Semantic Kernel',
      category: 'AI Orchestration',
      description: 'Microsoft\'s lightweight SDK for integrating LLMs',
      features: [
        'Planner for complex tasks',
        'Memory and context management',
        'Extensible architecture',
        '.NET and Python support'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Enterprise AI applications',
      link: 'https://github.com/microsoft/semantic-kernel'
    },
    {
      name: 'LangChain',
      category: 'LLM Application Framework',
      description: 'Framework for developing applications with LLMs',
      features: [
        'Chains and agents',
        'Document loaders',
        'Memory management',
        'Tool integration'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Rapid LLM application development',
      link: 'https://python.langchain.com/'
    }
  ];

  // RAG vs. Agentic comparison
  const comparison = [
    {
      aspect: 'Query Understanding',
      rag: 'Keyword and semantic matching',
      agentic: 'Contextual understanding with reasoning',
      advantage: 'Agents understand intent and context better'
    },
    {
      aspect: 'Response Generation',
      rag: 'Direct retrieval and reformulation',
      agentic: 'Dynamic response construction with reasoning',
      advantage: 'Agents can explain their reasoning'
    },
    {
      aspect: 'Multi-step Tasks',
      rag: 'Limited to single retrieval step',
      agentic: 'Can break down and solve multi-step problems',
      advantage: 'Agents can handle complex workflows'
    },
    {
      aspect: 'Tool Usage',
      rag: 'No tool usage',
      agentic: 'Can use external tools and APIs',
      advantage: 'Agents can perform actions'
    },
    {
      aspect: 'Learning & Adaptation',
      rag: 'Static knowledge base',
      agentic: 'Can learn from interactions',
      advantage: 'Agents improve over time'
    }
  ];

  // Implementation roadmap
  const roadmap = [
    {
      phase: '1. Foundation',
      steps: [
        'Set up basic RAG pipeline',
        'Implement document processing',
        'Create vector database',
        'Build simple retrieval system'
      ],
      duration: '2-4 weeks'
    },
    {
      phase: '2. Enhancement',
      steps: [
        'Add query understanding',
        'Implement response generation',
        'Add basic tool usage',
        'Set up evaluation metrics'
      ],
      duration: '4-6 weeks'
    },
    {
      phase: '3. Agentic',
      steps: [
        'Implement agent framework',
        'Add multi-step reasoning',
        'Integrate external tools',
        'Set up feedback loop'
      ],
      duration: '6-8 weeks'
    },
    {
      phase: '4. Optimization',
      steps: [
        'Performance tuning',
        'Cost optimization',
        'Scalability improvements',
        'Advanced monitoring'
      ],
      duration: 'Ongoing'
    }
  ];

  return (
    <>
      <Head>
        <title>Beyond RAG: The Agentic Search Stack for Intelligent Chatbots - AI Vault</title>
        <meta name="description" content="Discover how agentic search is transforming enterprise chatbots beyond traditional RAG. Learn about LangGraph, CrewAI, and other tools for building intelligent, action-taking AI agents in 2025." />
        <meta name="keywords" content="agentic search, RAG, LangGraph, CrewAI, AutoGen, AI agents, enterprise chatbots, multi-agent systems" />
        <meta property="og:title" content="Beyond RAG: The Agentic Search Stack for Truly Intelligent Enterprise Chatbots" />
        <meta property="og:description" content="Discover how agentic search is transforming enterprise chatbots beyond traditional RAG. Learn about the tools and architectures powering the next generation of AI assistants." />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Beyond RAG: The Agentic Search Stack in 2025" />
        <meta name="twitter:description" content="How agentic search is enabling chatbots to go beyond simple Q&A to perform complex tasks and reasoning." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Beyond RAG: The Agentic Search Stack for Truly Intelligent Enterprise Chatbots",
            "description": "Discover how agentic search is transforming enterprise chatbots beyond traditional RAG. Learn about the tools and architectures powering the next generation of AI assistants.",
            "author": {
              "@type": "Organization",
              "name": "AI Vault AI Team"
            },
            "datePublished": "2025-03-01",
            "image": "https://aivault.ai/images/beyond-rag-agentic-search.jpg"
          })}
        </script>
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-4xl mx-auto">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Blog
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">Beyond RAG: The Agentic Search Stack for Truly Intelligent Enterprise Chatbots</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <span className="mr-4">March 1, 2025</span>
            <span>•</span>
            <span className="mx-4">22 min read</span>
            <span>•</span>
            <span className="ml-4">Updated for 2025</span>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="font-medium text-blue-800 mb-2">Key Takeaways:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Agentic search enables chatbots to perform actions, not just answer questions</li>
              <li>New frameworks like LangGraph and CrewAI make it easier to build agentic systems</li>
              <li>Agentic search can handle complex, multi-step workflows that RAG alone cannot</li>
              <li>Implementation requires careful planning around tooling, memory, and orchestration</li>
            </ul>
          </div>

          <section className="mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The limitations of traditional Retrieval-Augmented Generation (RAG) systems are becoming increasingly apparent as enterprises demand more capable AI assistants. While RAG excels at retrieving and reformulating information, it falls short when it comes to performing actions, reasoning through complex problems, or adapting to new situations. Enter agentic search - a new paradigm that combines the strengths of RAG with the power of autonomous agents that can plan, reason, and take action.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">The Evolution from RAG to Agentic Search</h2>
            
            <div className="relative my-8">
              <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              <div className="space-y-12 pl-12">
                <div className="relative">
                  <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
                  <h3 className="text-xl font-semibold mb-2">Traditional Search (Pre-2023)</h3>
                  <p className="text-gray-700">Keyword-based retrieval with limited understanding of context or intent. Systems like Elasticsearch and Solr dominated this era, providing fast but often imprecise results.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">2</div>
                  <h3 className="text-xl font-semibold mb-2">RAG Systems (2023-2024)</h3>
                  <p className="text-gray-700">Combined retrieval with large language models to provide more accurate, context-aware responses. Marked a significant improvement but still limited to information retrieval and reformulation.</p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-12 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">3</div>
                  <h3 className="text-xl font-semibold mb-2">Agentic Search (2024-2025)</h3>
                  <p className="text-gray-700">AI agents that can understand intent, plan actions, use tools, and reason through complex problems. These systems don't just retrieve information - they can perform tasks and solve problems.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
              <p className="text-yellow-700">
                <span className="font-semibold">Note:</span> While RAG remains a critical component, agentic search represents a fundamental shift in how we think about AI assistants - from information retrieval systems to autonomous problem solvers.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">RAG vs. Agentic Search: Key Differences</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RAG</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agentic Search</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Advantage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparison.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.aspect}</td>
                      <td className="px-6 py-4">{row.rag}</td>
                      <td className="px-6 py-4">{row.agentic}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {row.advantage}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">The Agentic Search Stack: Key Components</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">1. Core Agent Framework</h3>
                <p className="text-gray-700 mb-4">The foundation that defines how agents operate, make decisions, and interact with other components.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Example:</span> LangGraph for complex agent workflows, CrewAI for role-based agents.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">2. Tool Integration</h3>
                <p className="text-gray-700 mb-4">Enables agents to interact with external systems, APIs, and services to perform actions.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Example:</span> Function calling, API tools, code execution environments.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">3. Memory Systems</h3>
                <p className="text-gray-700 mb-4">Short-term and long-term memory to maintain context and learn from interactions.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Example:</span> Vector databases, SQL, knowledge graphs.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">4. Planning & Reasoning</h3>
                <p className="text-gray-700 mb-4">Capabilities for breaking down complex tasks, generating plans, and reasoning through problems.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Example:</span> Chain-of-thought, tree-of-thought, ReAct framework.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">5. Evaluation & Monitoring</h3>
                <p className="text-gray-700 mb-4">Tools to assess performance, track metrics, and ensure reliability in production.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Example:</span> LangSmith, Arize, custom evaluation frameworks.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">6. Orchestration</h3>
                <p className="text-gray-700 mb-4">Manages the flow of information and control between different agents and components.</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Example:</span> LangGraph, Temporal, Airflow for agents.</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Top Agentic Search Tools in 2025</h2>
            
            <div className="space-y-6">
              {agenticTools.map((tool, index) => (
                <div key={tool.name} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-2xl font-bold text-gray-900">{tool.name}</h3>
                        <span className="ml-3 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-1">{tool.description}</p>
                    </div>
                    <a 
                      href={tool.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Visit {tool.name}
                    </a>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Features</h4>
                      <ul className="space-y-2">
                        {tool.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Pricing</h4>
                        <p className="text-gray-700">{tool.pricing}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Best For</h4>
                        <p className="text-gray-700">{tool.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Implementation Roadmap</h2>
            <p className="mb-6">
              Transitioning from RAG to agentic search is a journey. Here's a phased approach to implementation:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roadmap.map((phase, index) => (
                <div key={phase.phase} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold">{phase.phase}</h3>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {phase.steps.map((step, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-100">
                    <span className="font-medium">Timeline:</span> {phase.duration}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Real-World Use Cases</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Enterprise Customer Support</h3>
                <p className="text-gray-700 mb-4">Agentic systems can handle complex customer service scenarios that require accessing multiple systems, making decisions, and performing actions like processing returns or scheduling appointments.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Multi-step workflows</span>
                  <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">System integration</span>
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Action execution</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Research & Analysis</h3>
                <p className="text-gray-700 mb-4">Agents can conduct comprehensive research by gathering information from multiple sources, analyzing data, and synthesizing findings into actionable insights.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">Information gathering</span>
                  <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-800">Data analysis</span>
                  <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">Insight generation</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Business Process Automation</h3>
                <p className="text-gray-700 mb-4">Automating complex business processes that involve multiple steps, decisions, and system interactions, such as employee onboarding or invoice processing.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">Workflow automation</span>
                  <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-800">Decision making</span>
                  <span className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-800">System integration</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Personal AI Assistants</h3>
                <p className="text-gray-700 mb-4">Advanced personal assistants that can manage schedules, make reservations, handle communications, and perform tasks across multiple applications.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-xs rounded bg-pink-100 text-pink-800">Task management</span>
                  <span className="px-2 py-1 text-xs rounded bg-teal-100 text-teal-800">Calendar integration</span>
                  <span className="px-2 py-1 text-xs rounded bg-amber-100 text-amber-800">Multi-app workflow</span>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Challenges and Considerations</h2>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
              <p className="text-red-700">
                <span className="font-semibold">Important:</span> While agentic search offers significant advantages, it also introduces new challenges that must be carefully managed.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-red-600">1. Complexity Management</h3>
                <p className="text-gray-700 mb-4">Agentic systems are inherently more complex than traditional RAG implementations. This complexity can lead to:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Harder debugging and testing</li>
                  <li>Increased development and maintenance costs</li>
                  <li>More potential points of failure</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-red-600">2. Cost Considerations</h3>
                <p className="text-gray-700 mb-4">Agentic systems typically have higher operational costs due to:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Longer context windows</li>
                  <li>More API calls for tool usage</li>
                  <li>Increased compute requirements</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-red-600">3. Reliability & Safety</h3>
                <p className="text-gray-700 mb-4">Autonomous agents can take unexpected actions, leading to:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Unintended consequences from tool usage</li>
                  <li>Potential security vulnerabilities</li>
                  <li>Regulatory and compliance risks</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-red-600">4. Evaluation & Monitoring</h3>
                <p className="text-gray-700 mb-4">Assessing agent performance is challenging because:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Traditional metrics may not capture success</li>
                  <li>Agents can take many paths to a solution</li>
                  <li>Human evaluation is often required</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Mitigation Strategies</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li><span className="font-medium">Start small:</span> Begin with limited-scope agents and gradually expand capabilities</li>
                <li><span className="font-medium">Implement guardrails:</span> Set clear boundaries on agent actions and tool usage</li>
                <li><span className="font-medium">Human-in-the-loop:</span> Keep humans involved for critical decisions and oversight</li>
                <li><span className="font-medium">Robust testing:</span> Develop comprehensive testing frameworks for agent behavior</li>
                <li><span className="font-medium">Cost monitoring:</span> Implement usage tracking and cost controls</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">Is agentic search right for my use case?</h3>
                <p className="text-gray-700">
                  Agentic search is particularly valuable when:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Your tasks require multi-step reasoning or problem-solving</li>
                    <li>You need to integrate with multiple systems or tools</li>
                    <li>Your users need help with complex, open-ended questions</li>
                    <li>You want your system to take actions, not just provide information</li>
                  </ul>
                  For simpler Q&A or document retrieval, traditional RAG might be more appropriate and cost-effective.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">How much does it cost to implement agentic search?</h3>
                <p className="text-gray-700">
                  Costs can vary widely based on your requirements:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><span className="font-medium">Basic implementation:</span> $0-500/month (open-source tools, small scale)</li>
                    <li><span className="font-medium">Mid-range deployment:</span> $500-5,000/month (premium features, moderate usage)</li>
                    <li><span className="font-medium">Enterprise solution:</span> $5,000+/month (custom development, high volume)</li>
                  </ul>
                  The main cost drivers are API usage (for LLM calls), compute resources, and development time.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">What skills does my team need to implement agentic search?</h3>
                <p className="text-gray-700">
                  A successful implementation typically requires:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><span className="font-medium">Machine Learning/LLM expertise:</span> Understanding of language models and prompt engineering</li>
                    <li><span className="font-medium">Software engineering:</span> Strong programming skills (Python, JavaScript, etc.)</li>
                    <li><span className="font-medium">DevOps:</span> Experience with containerization, cloud services, and MLOps</li>
                    <li><span className="font-medium">Domain knowledge:</span> Understanding of your specific use case and requirements</li>
                  </ul>
                  Many teams find success by upskilling existing team members rather than hiring specialized "agent engineers."
                </p>
              </div>
            </div>
          </section>

          <div className="bg-gray-50 p-6 rounded-lg mt-12">
            <h3 className="text-xl font-semibold mb-3">Explore More AI & ML Content</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/gpu-poor-guide-ai-training" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-600">The GPU Poor's Guide to AI: Training Models on a Budget in 2025</h4>
                <p className="text-sm text-gray-600 mt-1">Learn how to train AI models without breaking the bank with our comprehensive guide to affordable cloud GPUs and optimization techniques.</p>
              </Link>
              <Link href="/blog/llm-ops-stack-guide" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-600">The "LLM Ops" Stack: Taming the Chaos of Production Large Language Models</h4>
                <p className="text-sm text-gray-600 mt-1">Comprehensive guide to LLM Ops tools and best practices for managing large language models in production.</p>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default BeyondRAG;
