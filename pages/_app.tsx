import type { AppProps } from 'next/app';
import { MockAuthProvider } from '../contexts/MockAuthContext';
import { ComparisonProvider } from '../contexts/ComparisonContext';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <MockAuthProvider>
        <ComparisonProvider>
          <Layout>
            <Component {...pageProps} />
            <Analytics />
            <SpeedInsights />
          </Layout>
        </ComparisonProvider>
        </MockAuthProvider>
    </>
  );
}

export default MyApp;