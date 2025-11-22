import { useState } from 'react';
import Head from 'next/head';

export default function TermsOfService() {
  const [lastUpdated] = useState('November 22, 2025');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>Terms of Service - AI Tools Directory</title>
        <meta name="description" content="Terms of Service for AI Tools Directory" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <div className="text-gray-300 mb-8">
            <p className="mb-4">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
              <p className="mb-4 text-gray-300">
                By accessing or using the AI Tools Directory website ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">2. Description of Service</h2>
              <p className="mb-4 text-gray-300">
                AI Tools Directory provides a directory of artificial intelligence tools and resources for informational purposes. We do not operate or control the tools listed on our platform. We are not responsible for the content, functionality, or performance of any third-party tools.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">3. Intellectual Property</h2>
              <p className="mb-4 text-gray-300">
                The Service and its original content, features, and functionality are and will remain the exclusive property of AI Tools Directory and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of AI Tools Directory.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">4. User Accounts</h2>
              <p className="mb-4 text-gray-300">
                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              <p className="mb-4 text-gray-300">
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">5. Links To Other Web Sites</h2>
              <p className="mb-4 text-gray-300">
                Our Service may contain links to third-party web sites or services that are not owned or controlled by AI Tools Directory.
              </p>
              <p className="mb-4 text-gray-300">
                AI Tools Directory has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that AI Tools Directory shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">6. Termination</h2>
              <p className="mb-4 text-gray-300">
                We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              <p className="mb-4 text-gray-300">
                All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">7. Disclaimer</h2>
              <p className="mb-4 text-gray-300">
                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">8. Limitation of Liability</h2>
              <p className="mb-4 text-gray-300">
                In no event shall AI Tools Directory, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">9. Governing Law</h2>
              <p className="mb-4 text-gray-300">
                These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">10. Changes</h2>
              <p className="mb-4 text-gray-300">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">11. Contact Us</h2>
              <p className="mb-4 text-gray-300">
                If you have any questions about these Terms, please contact us at: contact@aitoolsdirectory.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}