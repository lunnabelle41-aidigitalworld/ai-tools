import { useState } from 'react';
import Head from 'next/head';

export default function PrivacyPolicy() {
  const [lastUpdated] = useState('November 22, 2025');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Head>
        <title>Privacy Policy - AI Tools Directory</title>
        <meta name="description" content="Privacy Policy for AI Tools Directory" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <div className="text-gray-300 mb-8">
            <p className="mb-4">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose prose-invert max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Personal Information</h3>
              <p className="mb-4 text-gray-300">
                We may collect personal information that you provide to us directly, such as when you create an account, subscribe to our newsletter, or contact us for support. This information may include your name, email address, and any other information you choose to provide.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Usage Information</h3>
              <p className="mb-4 text-gray-300">
                We automatically collect certain information about your interaction with our website, including:
              </p>
              <ul className="list-disc pl-8 mb-4 text-gray-300">
                <li>Your IP address</li>
                <li>Browser type and version</li>
                <li>Pages you visit on our site</li>
                <li>Time and date of your visit</li>
                <li>Time spent on each page</li>
                <li>Referring website</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Cookies and Tracking Technologies</h3>
              <p className="mb-4 text-gray-300">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">2. How We Use Your Information</h2>
              <p className="mb-4 text-gray-300">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-8 mb-4 text-gray-300">
                <li>Provide, maintain, and improve our services</li>
                <li>Personalize your experience on our website</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">3. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Third-Party Service Providers</h3>
              <p className="mb-4 text-gray-300">
                We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Analytics</h3>
              <p className="mb-4 text-gray-300">
                We may use third-party service providers to monitor and analyze the use of our website. These third-party vendors may use cookies, web beacons, and other technologies to collect information about your use of the services and other websites.
              </p>
              
              <h3 className="text-xl font-semibold mb-2 text-white">Legal Requirements</h3>
              <p className="mb-4 text-gray-300">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">4. Data Security</h2>
              <p className="mb-4 text-gray-300">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">5. Your Data Protection Rights</h2>
              <p className="mb-4 text-gray-300">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-8 mb-4 text-gray-300">
                <li>The right to access, update, or delete the information we have on you</li>
                <li>The right of rectification</li>
                <li>The right to object</li>
                <li>The right of restriction</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">6. Children's Privacy</h2>
              <p className="mb-4 text-gray-300">
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">7. Changes to This Privacy Policy</h2>
              <p className="mb-4 text-gray-300">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-white">8. Contact Us</h2>
              <p className="mb-4 text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at: privacy@aitoolsdirectory.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}