import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AiEthics2024 = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>AI Ethics in 2024: Navigating the Moral Landscape - AI Vault</title>
        <meta name="description" content="As AI becomes more integrated into our daily lives, understanding the ethical implications and establishing guidelines for responsible AI use is crucial." />
        <meta name="keywords" content="AI ethics, artificial intelligence ethics, responsible AI, AI governance" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Back Button */}
          <Link href="/blog">
            <div className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors cursor-pointer">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </div>
          </Link>

          {/* Article Header */}
          <article className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="mb-6">
              <span className="px-4 py-2 bg-purple-600/30 rounded-full text-sm text-purple-300">AI Ethics</span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-6">
              AI Ethics in 2024: Navigating the Moral Landscape
            </h1>
            
            <div className="flex items-center text-gray-300 mb-8">
              <div className="flex items-center mr-6">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">EC</span>
                </div>
                <span>Ethics Committee</span>
              </div>
              <span className="mr-6">•</span>
              <span>November 11, 2024</span>
              <span className="mr-6">•</span>
              <span>10 min read</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                As AI becomes more integrated into our daily lives, understanding the ethical implications and establishing guidelines for responsible AI use is crucial.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Growing Importance of AI Ethics</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                With AI systems making decisions that affect millions of people, from loan applications to medical diagnoses, the need for ethical guidelines has never been more pressing. Organizations must balance innovation with responsibility.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Key Ethical Challenges</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Bias in AI algorithms and training data</li>
                <li>Privacy concerns with data collection and usage</li>
                <li>Transparency in AI decision-making processes</li>
                <li>Accountability for AI-driven outcomes</li>
                <li>Job displacement and economic impact</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Regulatory Frameworks</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Governments worldwide are developing AI regulations. The EU's AI Act, China's AI governance principles, and the US's AI Bill of Rights represent different approaches to ensuring responsible AI development and deployment.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Corporate Responsibility</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Companies must establish internal AI ethics boards, conduct regular bias audits, and implement transparent AI governance frameworks. This includes diverse development teams and ongoing ethical training.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">The Role of Individuals</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                As users and citizens, we have a responsibility to understand AI systems we interact with, question their decisions, and advocate for ethical AI practices in our communities and workplaces.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Future Considerations</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Looking ahead, we must address emerging challenges like AGI safety, AI consciousness, and the long-term societal impacts of increasingly autonomous systems. International cooperation will be essential.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">Conclusion</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                AI ethics is not just a technical challenge but a societal one. By working together across disciplines and borders, we can harness AI's benefits while minimizing its risks and ensuring it serves humanity's best interests.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/20">
              <span className="px-3 py-1 bg-purple-600/30 rounded-full text-sm text-purple-300">AI Ethics</span>
              <span className="px-3 py-1 bg-blue-600/30 rounded-full text-sm text-blue-300">Responsible AI</span>
              <span className="px-3 py-1 bg-green-600/30 rounded-full text-sm text-green-300">Governance</span>
              <span className="px-3 py-1 bg-yellow-600/30 rounded-full text-sm text-yellow-300">Policy</span>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default AiEthics2024;
