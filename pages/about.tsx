import { useState } from 'react';
import Head from 'next/head';

export default function About() {
  const [lastUpdated] = useState('November 22, 2025');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>About Us - AI Tools Directory</title>
        <meta name="description" content="Learn more about AI Tools Directory and our mission" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About AI Tools Directory
          </h1>
          
          <div className="text-gray-300 mb-8">
            <p className="mb-4">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="mb-4 text-gray-300">
                At AI Tools Directory, we're on a mission to democratize access to artificial intelligence tools and make cutting-edge AI technology accessible to everyone. We believe that AI should empower individuals and businesses to achieve more, create better, and solve complex problems.
              </p>
              <p className="mb-4 text-gray-300">
                Our platform serves as a comprehensive directory of AI tools across various categories, helping users discover, compare, and select the perfect tools for their specific needs.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">What We Do</h2>
              <p className="mb-4 text-gray-300">
                We meticulously curate and organize thousands of AI tools from around the web, categorizing them by function, industry, and use case. Our team of AI enthusiasts and experts continuously researches and evaluates new tools to ensure our directory remains up-to-date and relevant.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3 text-blue-400">Comprehensive Directory</h3>
                  <p className="text-gray-300">
                    Over 1,000+ AI tools organized across 300+ categories to help you find exactly what you need.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3 text-purple-400">Expert Reviews</h3>
                  <p className="text-gray-300">
                    Detailed reviews and ratings from our team of AI specialists to help you make informed decisions.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3 text-green-400">Smart Search</h3>
                  <p className="text-gray-300">
                    Advanced search and filtering capabilities to quickly find tools that match your requirements.
                  </p>
                </div>
                
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h3 className="text-xl font-bold mb-3 text-yellow-400">Regular Updates</h3>
                  <p className="text-gray-300">
                    New tools and updates added daily to keep our directory fresh and current with AI advancements.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Values</h2>
              
              <div className="space-y-6 mt-6">
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🔍</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Transparency</h3>
                    <p className="text-gray-300">
                      We provide honest, unbiased reviews and clearly disclose our relationships with tool providers.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🚀</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Innovation</h3>
                    <p className="text-gray-300">
                      We're constantly exploring new AI technologies and trends to keep our users at the forefront of innovation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-4">🤝</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Community</h3>
                    <p className="text-gray-300">
                      We foster a community of AI enthusiasts, professionals, and creators to share knowledge and experiences.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-2xl mr-4">💡</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Empowerment</h3>
                    <p className="text-gray-300">
                      We believe in empowering individuals and businesses with the tools they need to succeed in the AI era.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Team</h2>
              <p className="mb-4 text-gray-300">
                Our team consists of AI researchers, developers, content creators, and industry experts who are passionate about artificial intelligence and its potential to transform the world. We bring together diverse backgrounds and expertise to provide the most comprehensive and valuable AI tool directory on the web.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">Get In Touch</h2>
              <p className="mb-4 text-gray-300">
                Have questions, suggestions, or want to partner with us? We'd love to hear from you!
              </p>
              <p className="text-gray-300">
                Email us at: contact@aitoolsdirectory.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}