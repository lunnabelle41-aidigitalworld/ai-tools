import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Web3DeveloperKit = () => {
  // Web3 development tools data
  const developmentTools = [
    {
      name: 'Hardhat',
      category: 'Development Environment',
      description: 'Ethereum development environment for professionals',
      features: [
        'Local Ethereum network',
        'Testing framework',
        'Plugin system',
        'TypeScript support'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Smart contract development & testing',
      link: 'https://hardhat.org/'
    },
    {
      name: 'Foundry',
      category: 'Smart Contract Development',
      description: 'Blazing fast, portable and modular toolkit',
      features: [
        'Written in Rust',
        'Fuzz testing',
        'Scripting',
        'EVM assembly'
      ],
      pricing: 'Open-source (Apache-2.0)',
      bestFor: 'High-performance smart contract development',
      link: 'https://getfoundry.sh/'
    },
    {
      name: 'The Graph',
      category: 'Indexing Protocol',
      description: 'Indexing protocol for querying blockchains',
      features: [
        'Decentralized indexing',
        'GraphQL API',
        'Multi-chain support',
        'Query optimization'
      ],
      pricing: 'Usage-based + GRT staking',
      bestFor: 'Efficient blockchain data querying',
      link: 'https://thegraph.com/'
    },
    {
      name: 'Alchemy',
      category: 'Blockchain Development Platform',
      description: 'Complete Web3 development platform',
      features: [
        'Supernode infrastructure',
        'Enhanced APIs',
        'Debug tools',
        'Analytics dashboard'
      ],
      pricing: 'Free tier + pay-as-you-go',
      bestFor: 'Production-grade dApp infrastructure',
      link: 'https://www.alchemy.com/'
    },
    {
      name: 'Wagmi',
      category: 'React Hooks',
      description: 'Collection of React Hooks for Web3',
      features: [
        'Auto-refresh data',
        'Type-safe',
        'Modular connectors',
        'Ethereum provider'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Building React dApp frontends',
      link: 'https://wagmi.sh/'
    },
    {
      name: 'OpenZeppelin',
      category: 'Smart Contract Framework',
      description: 'Library for secure smart contracts',
      features: [
        'Audited contracts',
        'Upgradeable contracts',
        'Access control',
        'Token standards'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Secure contract development',
      link: 'https://openzeppelin.com/'
    },
    {
      name: 'Ethers.js',
      category: 'Ethereum Library',
      description: 'Complete Ethereum wallet implementation',
      features: [
        'Small bundle size',
        'TypeScript ready',
        'Extensive documentation',
        'EIP-1193 support'
      ],
      pricing: 'Open-source (MIT)',
      bestFor: 'Ethereum interaction',
      link: 'https://docs.ethers.org/'
    },
    {
      name: 'Tenderly',
      category: 'DevOps & Monitoring',
      description: 'Web3 development platform',
      features: [
        'Simulation & debugging',
        'Alerting',
        'Analytics',
        'Gas optimization'
      ],
      pricing: 'Free tier + paid plans',
      bestFor: 'Smart contract monitoring',
      link: 'https://tenderly.co/'
    }
  ];

  // Learning resources
  const learningResources = [
    {
      name: 'Ethereum Developer Portal',
      type: 'Documentation',
      link: 'https://ethereum.org/developers/'
    },
    {
      name: 'Solidity by Example',
      type: 'Tutorial',
      link: 'https://solidity-by-example.org/'
    },
    {
      name: 'CryptoZombies',
      type: 'Interactive Course',
      link: 'https://cryptozombies.io/'
    },
    {
      name: 'Ethereum Stack Exchange',
      type: 'Q&A',
      link: 'https://ethereum.stackexchange.com/'
    },
    {
      name: 'Week in Ethereum News',
      type: 'Newsletter',
      link: 'https://weekinethereum.com/'
    }
  ];

  // Development workflow
  const workflow = [
    {
      step: 1,
      title: 'Local Development',
      tools: ['Hardhat', 'Foundry', 'Ganache'],
      description: 'Set up your development environment and write smart contracts'
    },
    {
      step: 2,
      title: 'Testing',
      tools: ['Waffle', 'Hardhat', 'Foundry'],
      description: 'Write and run tests for your smart contracts'
    },
    {
      step: 3,
      title: 'Frontend Development',
      tools: ['Wagmi', 'Ethers.js', 'Web3.js'],
      description: 'Build the user interface for your dApp'
    },
    {
      step: 4,
      title: 'Deployment',
      tools: ['Hardhat', 'Foundry', 'Truffle'],
      description: 'Deploy your smart contracts to testnet and mainnet'
    },
    {
      step: 5,
      title: 'Monitoring & Maintenance',
      tools: ['Tenderly', 'The Graph', 'Alchemy'],
      description: 'Monitor your dApp and maintain its functionality'
    }
  ];

  return (
    <>
      <Head>
        <title>The Full-Stack Web3 Developer's Kit: Building the Next Generation of Decentralized Applications in 2025 - AI Vault</title>
        <meta name="description" content="Comprehensive guide to the essential tools, frameworks, and best practices for full-stack Web3 development in 2025. Learn about Hardhat, Foundry, The Graph, and more." />
        <meta name="keywords" content="web3 development, blockchain, ethereum, smart contracts, hardhat, foundry, the graph, alchemy, wagmi, web3 tools" />
        <meta property="og:title" content="The Full-Stack Web3 Developer's Kit: Building the Next Generation of Decentralized Applications in 2025" />
        <meta property="og:description" content="Discover the essential tools, frameworks, and best practices for full-stack Web3 development in 2025. Learn how to build, test, and deploy decentralized applications with the latest technologies." />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Full-Stack Web3 Developer's Kit 2025" />
        <meta name="twitter:description" content="Everything you need to know to become a proficient Web3 developer in 2025. Tools, frameworks, and best practices for building decentralized applications." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "The Full-Stack Web3 Developer's Kit: Building the Next Generation of Decentralized Applications in 2025",
            "description": "Comprehensive guide to the essential tools, frameworks, and best practices for full-stack Web3 development in 2025.",
            "author": {
              "@type": "Organization",
              "name": "AI Vault Blockchain Team"
            },
            "datePublished": "2025-03-05",
            "image": "https://aivault.ai/images/web3-developer-kit-2025.jpg"
          })}
        </script>
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <article className="prose prose-lg max-w-4xl mx-auto">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to Blog
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">The Full-Stack Web3 Developer's Kit: Building the Next Generation of Decentralized Applications in 2025</h1>
          
          <div className="flex items-center text-gray-600 mb-8">
            <span className="mr-4">March 5, 2025</span>
            <span>•</span>
            <span className="mx-4">25 min read</span>
            <span>•</span>
            <span className="ml-4">Updated for 2025</span>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <p className="font-medium text-blue-800 mb-2">Key Takeaways:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Web3 development has matured with powerful new tools and frameworks</li>
              <li>Modern development stacks prioritize security, efficiency, and developer experience</li>
              <li>Modular architecture is key to building scalable dApps</li>
              <li>Testing and security should be integrated throughout the development lifecycle</li>
            </ul>
          </div>

          <section className="mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              The Web3 ecosystem has evolved dramatically since its early days, with 2025 bringing a mature set of tools and best practices for building decentralized applications. This guide covers the essential components of a modern Web3 developer's toolkit, from smart contract development to frontend integration and beyond. Whether you're a seasoned blockchain developer or just starting your Web3 journey, this comprehensive overview will help you navigate the current landscape.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Essential Web3 Development Tools</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {developmentTools.map((tool, index) => (
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
                  
                  <div className="mt-4">
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
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600"><span className="font-medium">Best for:</span> {tool.bestFor}</span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {tool.pricing}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">The Modern Web3 Development Workflow</h2>
            
            <div className="relative my-8">
              <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              <div className="space-y-12 pl-12">
                {workflow.map((item) => (
                  <div key={item.step} className="relative">
                    <div className="absolute -left-12 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tools.map(tool => (
                        <span key={tool} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Learning Resources</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Essential Learning Path</h3>
              <ul className="space-y-3">
                {learningResources.map((resource, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                      {index + 1}
                    </span>
                    <div>
                      <a 
                        href={resource.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-medium"
                      >
                        {resource.name}
                      </a>
                      <span className="ml-2 text-sm text-gray-500">({resource.type})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Best Practices for 2025</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Security First</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Use established libraries like OpenZeppelin</li>
                  <li>• Implement comprehensive test coverage</li>
                  <li>• Regular security audits</li>
                  <li>• Follow the principle of least privilege</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Gas Optimization</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Minimize storage operations</li>
                  <li>• Use events for off-chain data</li>
                  <li>• Batch transactions when possible</li>
                  <li>• Leverage Layer 2 solutions</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">User Experience</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Abstract away blockchain complexity</li>
                  <li>• Provide clear transaction feedback</li>
                  <li>• Handle network changes gracefully</li>
                  <li>• Support multiple wallets</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3">Testing Strategy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Unit tests for all smart contracts</li>
                  <li>• Integration tests for contract interactions</li>
                  <li>• Fork testing against mainnet state</li>
                  <li>• Fuzz testing for edge cases</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">What's the best programming language for Web3 development?</h3>
                <p className="text-gray-700">
                  Solidity remains the most widely used language for Ethereum smart contract development, with Vyper as a Pythonic alternative. For full-stack development, JavaScript/TypeScript is essential for frontend work, while Rust is gaining popularity for performance-critical components and alternative blockchains.
                </p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-xl font-semibold mb-2">How do I get started with Web3 development?</h3>
                <p className="text-gray-700">
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Learn the fundamentals of blockchain and Ethereum</li>
                    <li>Set up your development environment (Node.js, Git, code editor)</li>
                    <li>Learn Solidity and smart contract development</li>
                    <li>Practice with tutorials and build small projects</li>
                    <li>Contribute to open-source Web3 projects</li>
                    <li>Join Web3 developer communities</li>
                  </ol>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">What are the biggest challenges in Web3 development?</h3>
                <p className="text-gray-700 mb-4">Common challenges include:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><span className="font-medium">Security:</span> Smart contracts are immutable once deployed, making security critical</li>
                  <li><span className="font-medium">User Experience:</span> Managing wallets, gas fees, and transaction confirmations</li>
                  <li><span className="font-medium">Scalability:</span> High gas fees and network congestion during peak times</li>
                  <li><span className="font-medium">Tooling Maturity:</span> Rapidly evolving ecosystem with frequent changes</li>
                  <li><span className="font-medium">Regulatory Uncertainty:</span> Changing legal landscape for blockchain applications</li>
                </ul>
              </div>
            </div>
          </section>

          <div className="bg-gray-50 p-6 rounded-lg mt-12">
            <h3 className="text-xl font-semibold mb-3">Explore More Blockchain & Web3 Content</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/beyond-rag-agentic-search-stack" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-600">Beyond RAG: The Agentic Search Stack for Truly Intelligent Enterprise Chatbots</h4>
                <p className="text-sm text-gray-600 mt-1">Discover how agentic search is transforming enterprise chatbots beyond traditional RAG with the latest AI agent frameworks.</p>
              </Link>
              <Link href="/blog/gpu-poor-guide-ai-training" className="block p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
                <h4 className="font-medium text-blue-600">The GPU Poor's Guide to AI: Training Models on a Budget in 2025</h4>
                <p className="text-sm text-gray-600 mt-1">Learn how to train AI models without breaking the bank with our comprehensive guide to affordable cloud GPUs and optimization techniques.</p>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
};

export default Web3DeveloperKit;
