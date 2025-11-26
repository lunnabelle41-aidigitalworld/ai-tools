import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { KnowledgeNode } from '../lib/adaptive-stream';
import StructuredDataFabric from '../lib/structured-data-fabric';
import SEOAutomationEngine from '../lib/seo-automation';

interface SEOArticleWrapperProps {
  node?: KnowledgeNode;
  blogPost?: KnowledgeNode;
  children: React.ReactNode;
  instance?: 'founder' | 'developer' | 'designer' | 'analyst' | 'case-study';
}

const SEOArticleWrapper: React.FC<SEOArticleWrapperProps> = ({ 
  node, 
  blogPost,
  children, 
  instance = 'developer' 
}) => {
  // Support both node and blogPost props for backward compatibility
  const knowledgeNode = node || blogPost;
  const structuredDataFabric = new StructuredDataFabric();
  const seoEngine = new SEOAutomationEngine();
  
  // Generate all structured data
  const structuredDataList = knowledgeNode ? structuredDataFabric.generateAllStructuredData(knowledgeNode) : [];
  
  // Generate optimized meta tags
  const metaTags = React.useMemo(() => {
    // In production, this would be generated dynamically
    return {
      title: knowledgeNode?.title || '',
      description: knowledgeNode?.excerpt || '',
      ogTitle: knowledgeNode?.title || '',
      ogDescription: knowledgeNode?.excerpt || '',
      ogImage: knowledgeNode?.images?.[0] || '/api/og/default',
      twitterTitle: knowledgeNode?.title || '',
      twitterDescription: knowledgeNode?.excerpt || '',
      twitterImage: knowledgeNode?.images?.[0] || '/api/og/default',
      canonical: `https://ai-vault.com/blog/${knowledgeNode?.slug}`,
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
      keywords: knowledgeNode?.tags?.join(', ') || '',
    };
  }, [knowledgeNode]);

  // Generate breadcrumbs
  const breadcrumbs = [
    { name: 'Home', url: 'https://ai-vault.com' },
    { name: 'Blog', url: 'https://ai-vault.com/blog' },
    ...(knowledgeNode ? [
      { name: knowledgeNode.category, url: `https://ai-vault.com/blog/category/${knowledgeNode.category}` },
      { name: knowledgeNode.title, url: `https://ai-vault.com/blog/${knowledgeNode.slug}` }
    ] : [])
  ];

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={metaTags.canonical} />
        
        {/* Robots */}
        <meta name="robots" content={metaTags.robots} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTags.ogTitle} />
        <meta property="og:description" content={metaTags.ogDescription} />
        <meta property="og:image" content={metaTags.ogImage} />
        <meta property="og:url" content={metaTags.canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="AI Vault" />
        <meta property="article:published_time" content={knowledgeNode?.publishedAt} />
        <meta property="article:modified_time" content={knowledgeNode?.updatedAt || knowledgeNode?.publishedAt} />
        <meta property="article:author" content={knowledgeNode?.author} />
        <meta property="article:section" content={knowledgeNode?.category} />
        {knowledgeNode?.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@aivault" />
        <meta name="twitter:creator" content="@aivault" />
        <meta name="twitter:title" content={metaTags.twitterTitle} />
        <meta name="twitter:description" content={metaTags.twitterDescription} />
        <meta name="twitter:image" content={metaTags.twitterImage} />
        
        {/* Additional Meta Tags */}
        <meta name="author" content={knowledgeNode?.author} />
        <meta name="publisher" content="AI Vault" />
        <meta name="theme-color" content="#0066CC" />
        <meta name="msapplication-TileColor" content="#0066CC" />
        
        {/* Language and Region */}
        <meta name="language" content="English" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        
        {/* Content Classification */}
        <meta name="content-type" content="article" />
        <meta name="content-category" content={knowledgeNode?.category} />
        <meta name="difficulty" content={knowledgeNode?.difficulty} />
        <meta name="read-time" content={`${knowledgeNode?.readTime} minutes`} />
        
        {/* Structured Data */}
        {structuredDataList.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        ))}
        
        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/api/og/${knowledgeNode?.slug}" as="image" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en" href={metaTags.canonical} />
        <link rel="alternate" hrefLang="x-default" href={metaTags.canonical} />
      </Head>

      {/* Hidden SEO Content (Invisible-to-Visible Strategy) */}
      <div className="sr-only" aria-hidden="true">
        {/* Standard HTML fallback for crawlers */}
        <article>
          <h1>{knowledgeNode?.title}</h1>
          <p>{knowledgeNode?.excerpt}</p>
          
          {/* Author information */}
          <div className="author-info">
            <span>By {knowledgeNode?.author}</span>
            <time dateTime={knowledgeNode?.publishedAt}>{knowledgeNode?.publishedAt}</time>
          </div>
          
          {/* Category and tags */}
          <div className="taxonomy">
            <span>Category: {knowledgeNode?.category}</span>
            <div className="tags">
              {knowledgeNode?.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          
          {/* FAQ Section for SEO */}
          {knowledgeNode?.faqs && knowledgeNode?.faqs.length > 0 && (
            <section className="faq-section">
              <h2>Frequently Asked Questions</h2>
              {knowledgeNode?.faqs.map((faq, index) => (
                <div key={index}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </section>
          )}
          
          {/* Standard comparison table */}
          {knowledgeNode?.comparisonTools && knowledgeNode?.comparisonTools.length > 0 && (
            <section className="comparison-table">
              <h2>Tool Comparison</h2>
              <table>
                <thead>
                  <tr>
                    <th>Tool</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Platform</th>
                    <th>Pricing</th>
                  </tr>
                </thead>
                <tbody>
                  {knowledgeNode?.comparisonTools.map((tool, index) => (
                    <tr key={index}>
                      <td>{tool.name}</td>
                      <td>{tool.description}</td>
                      <td>{tool.category}</td>
                      <td>{tool.platform}</td>
                      <td>{tool.pricing || 'Free'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
          
          {/* How-to steps */}
          {knowledgeNode?.howToSteps && knowledgeNode?.howToSteps.length > 0 && (
            <section className="how-to-steps">
              <h2>How to Guide</h2>
              {knowledgeNode?.howToSteps.map((step, index) => (
                <div key={index}>
                  <h3>Step {index + 1}: {step.name}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </section>
          )}
        </article>
      </div>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900 font-medium">{crumb.name}</span>
              ) : (
                <Link href={crumb.url} className="hover:text-blue-600 transition-colors">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Main Article Content */}
      <article className="prose prose-lg max-w-none">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {knowledgeNode?.category}
            </span>
            <span>•</span>
            <time dateTime={knowledgeNode?.publishedAt}>
              {knowledgeNode?.publishedAt ? new Date(knowledgeNode.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Unknown date'}
            </time>
            <span>•</span>
            <span>{knowledgeNode?.readTime} min read</span>
            <span>•</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {knowledgeNode?.difficulty}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{knowledgeNode?.title}</h1>
          
          <p className="text-xl text-gray-600 mb-6">{knowledgeNode?.excerpt}</p>
          
          {/* Author Badge */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              {knowledgeNode?.author ? knowledgeNode.author.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <p className="font-medium text-gray-900">{knowledgeNode?.author}</p>
              <p className="text-sm text-gray-600">AI Expert</p>
            </div>
          </div>
        </header>

        {/* Instance Switcher */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-2">View this article as:</p>
          <div className="flex flex-wrap gap-2">
            {['founder', 'developer', 'designer', 'analyst', 'case-study'].map((inst) => (
              <button
                key={inst}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  inst === instance
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {inst.charAt(0).toUpperCase() + inst.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Answer Summary for Featured Snippets */}
        <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">Key Takeaways</h2>
          <div className="text-blue-800">
            {knowledgeNode?.content ? knowledgeNode.content.split('.').slice(0, 3).join('.').trim() : 'No content available.'}.
          </div>
        </div>

        {/* Main Content */}
        <div className="article-content">
          {children}
        </div>

        {/* FAQ Section */}
        {knowledgeNode?.faqs && knowledgeNode?.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {knowledgeNode?.faqs.map((faq, index) => (
                <details key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <summary className="font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-gray-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools */}
        {knowledgeNode?.linkedTools && knowledgeNode?.linkedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {knowledgeNode?.linkedTools.map((tool, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">AI-powered tool for enhanced productivity</p>
                  <Link 
                    href={tool.url || `/tools/${tool.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Learn more →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Schema.org Microdata */}
      <div itemScope itemType="https://schema.org/TechArticle" className="hidden">
        <meta itemProp="headline" content={knowledgeNode?.title} />
        <meta itemProp="description" content={knowledgeNode?.excerpt} />
        <meta itemProp="datePublished" content={knowledgeNode?.publishedAt} />
        <meta itemProp="author" content={knowledgeNode?.author} />
        <meta itemProp="publisher" content="AI Vault" />
        <meta itemProp="image" content={knowledgeNode?.images?.[0] || '/api/og/default'} />
      </div>
    </>
  );
};

export default SEOArticleWrapper;
