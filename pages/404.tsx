import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center p-4">
      <Head>
        <title>Page Not Found - AI Tools Directory</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>

      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-center">
        <div className="text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          404
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Page Not Found</h1>
        
        <p className="text-xl text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="mb-8">
          <p className="text-lg text-gray-300">
            You'll be redirected to the homepage in <span className="font-bold text-blue-400">{countdown}</span> seconds.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all">
            Go to Homepage
          </Link>
          
          <Link href="/contact" className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all">
            Report Issue
          </Link>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Popular Pages</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/terms-of-service" className="text-blue-400 hover:text-blue-300 transition-colors">
              Terms of Service
            </Link>
            <span className="text-gray-500">•</span>
            <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-500">•</span>
            <Link href="/about" className="text-blue-400 hover:text-blue-300 transition-colors">
              About Us
            </Link>
            <span className="text-gray-500">•</span>
            <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}